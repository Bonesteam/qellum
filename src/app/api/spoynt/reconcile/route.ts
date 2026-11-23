import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/backend/config/db";
import { SpoyntPayment } from "@/backend/models/spoyntPayment.model";
import { spoyntService } from "@/backend/services/spoynt.service";

function assertEnv(name: string) {
    const value = process.env[name]?.trim();
    if (!value) throw new Error(`Missing env: ${name}`);
    return value;
}

function basicAuthHeader(username: string, password: string) {
    return `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
}

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
        await SpoyntPayment.updateMany(
            { creditStatus: "crediting", updatedAt: { $lt: staleBefore } },
            { $set: { creditStatus: "pending", lastError: "Reconciliation retry after stuck crediting state" } }
        );

        const payments = await SpoyntPayment.find({
            creditStatus: { $in: ["pending", "crediting"] },
            createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        })
            .sort({ updatedAt: 1 })
            .limit(100)
            .lean();

        const baseUrl = assertEnv("SPOYNT_BASE_URL");
        const accountId = assertEnv("SPOYNT_ACCOUNT_ID");
        const apiKey = assertEnv("SPOYNT_API_KEY");

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

            try {
                const response = await fetch(
                    `${baseUrl}/payment-invoices/${encodeURIComponent(payment.cpi)}`,
                    {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            Authorization: basicAuthHeader(accountId, apiKey),
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

                const result = await spoyntService.processInvoice({
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