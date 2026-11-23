import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/backend/config/db";
import { CorefyPayment } from "@/backend/models/payment.model";
import { corefyService } from "@/backend/services/corefy.service";
import { getCorefyConfig, getCorefyBasicAuthHeader } from "@/backend/config/corefy";

function isAuthorized(req: NextRequest) {
    if (req.headers.get("x-vercel-cron") === "1") return true;

    const secret = process.env.CRON_SECRET?.trim();
    if (!secret) return false;

    const authorization = req.headers.get("authorization") || "";
    return authorization === `Bearer ${secret}`;
}

export async function GET(req: NextRequest) {
    if (!isAuthorized(req)) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        await connectDB();

        const staleBefore = new Date(Date.now() - 10 * 60 * 1000);
        await CorefyPayment.updateMany(
            { creditStatus: "crediting", updatedAt: { $lt: staleBefore } },
            { $set: { creditStatus: "pending", lastError: "Reconciliation retry after stuck crediting state" } }
        );

        const payments = await CorefyPayment.find({
            creditStatus: { $in: ["pending", "crediting"] },
            createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        })
            .sort({ updatedAt: 1 })
            .limit(100)
            .lean();

        const config = getCorefyConfig();
        const basicAuth = getCorefyBasicAuthHeader();

        const summary = {
            checked: 0,
            credited: 0,
            pending: 0,
            failed: 0,
            invalid: 0,
            errors: 0,
        };

        for (const payment of payments) {
            summary.checked += 1;

            if (payment.cpi?.startsWith("test-")) continue;

            try {
                const response = await fetch(
                    `${config.baseUrl}/payment-invoices/${encodeURIComponent(payment.cpi)}`,
                    {
                        method: "GET",
                        headers: {
                            Accept: "application/vnd.api+json, application/json",
                            Authorization: basicAuth,
                        },
                        cache: "no-store",
                    }
                );

                const text = await response.text();
                if (!response.ok) {
                    summary.errors += 1;
                    continue;
                }

                const json = JSON.parse(text);
                const attrs = json?.data?.attributes ?? {};
                const metadata = attrs?.metadata ?? {};

                const result = await corefyService.processInvoice({
                    cpi: payment.cpi,
                    referenceId: String(attrs?.reference_id || payment.referenceId),
                    userId: String(metadata?.user_id || payment.userId),
                    tokens: Number(metadata?.tokens ?? payment.tokens ?? NaN),
                    requestedCurrency: String(
                        metadata?.ui_currency || payment.requestedCurrency || attrs?.currency || "GBP"
                    ) as "GBP" | "EUR" | "USD",
                    requestedAmount: Number(metadata?.ui_amount ?? payment.requestedAmount ?? attrs?.amount ?? NaN),
                    chargedCurrency: String(attrs?.currency || payment.chargedCurrency || "GBP") as "GBP" | "EUR" | "USD",
                    chargedAmount: Number(attrs?.amount ?? payment.chargedAmount ?? NaN),
                    status: String(attrs?.status || payment.status || "created"),
                    resolution: attrs?.resolution ? String(attrs.resolution) : payment.resolution,
                    providerUpdatedAt: Number.isFinite(Number(attrs?.updated))
                        ? Number(attrs.updated)
                        : payment.providerUpdatedAt,
                });

                if (result.state === "credited") summary.credited += 1;
                else if (result.state === "pending") summary.pending += 1;
                else if (result.state === "failed") summary.failed += 1;
                else summary.invalid += 1;
            } catch {
                summary.errors += 1;
            }
        }

        return NextResponse.json({ ok: true, summary });
    } catch (error) {
        return NextResponse.json(
            {
                message: error instanceof Error ? error.message : "Reconciliation failed",
            },
            { status: 500 }
        );
    }
}
