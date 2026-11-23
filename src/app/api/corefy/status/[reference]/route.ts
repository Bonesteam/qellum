import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { corefyService } from "@/backend/services/corefy.service";
import { getCorefyConfig, getCorefyBasicAuthHeader } from "@/backend/config/corefy";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ reference: string }> }
) {
    try {
        const auth = await requireAuth(req);
        const { reference } = await params;

        const payment: any = await corefyService.getPaymentByReference(reference);
        if (!payment) {
            return NextResponse.json({ message: "Payment not found" }, { status: 404 });
        }

        if (String(payment.userId) !== auth.sub) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        // If test mode or already credited, return current state directly
        if (payment.creditStatus === "credited") {
            return NextResponse.json({
                reference,
                state: "credited",
                tokens: payment.tokens,
                balanceAfter: payment.balanceAfter,
                alreadyCredited: true,
                providerStatus: payment.status,
                providerResolution: payment.resolution,
            });
        }

        if (payment.cpi?.startsWith("test-")) {
            return NextResponse.json({
                reference,
                state: payment.creditStatus || "credited",
                tokens: payment.tokens,
                balanceAfter: payment.balanceAfter,
                alreadyCredited: payment.creditStatus === "credited",
                providerStatus: payment.status,
                providerResolution: payment.resolution,
            });
        }

        const config = getCorefyConfig();
        const basicAuth = getCorefyBasicAuthHeader();

        const endpoint = `${config.baseUrl}/payment-invoices/${encodeURIComponent(payment.cpi)}`;
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                Accept: "application/vnd.api+json, application/json",
                Authorization: basicAuth,
            },
            cache: "no-store",
        });

        const text = await response.text();
        if (!response.ok) {
            console.error("Corefy status sync failed:", response.status, text);
            return NextResponse.json({ message: "Corefy status sync failed", details: text }, { status: 502 });
        }

        let json: any = null;
        try {
            json = JSON.parse(text);
        } catch {
            return NextResponse.json({ message: "Invalid JSON from Corefy" }, { status: 502 });
        }

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

        return NextResponse.json({ reference, ...result });
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Unable to load payment status" },
            { status: 400 }
        );
    }
}
