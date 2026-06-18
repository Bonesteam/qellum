import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { spoyntService } from "@/backend/services/spoynt.service";

function assertEnv(name: string) {
    const value = process.env[name]?.trim();
    if (!value) throw new Error(`Missing env: ${name}`);
    return value;
}

function basicAuthHeader(username: string, password: string) {
    return `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ reference: string }> }
) {
    try {
        const auth = await requireAuth(req);
        const { reference } = await params;

        const payment: any = await spoyntService.getPaymentByReference(reference);
        if (!payment) {
            return NextResponse.json({ message: "Payment not found" }, { status: 404 });
        }

        if (String(payment.userId) !== auth.sub) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        const response = await fetch(
            `${assertEnv("SPOYNT_BASE_URL")}/payment-invoices/${encodeURIComponent(payment.cpi)}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: basicAuthHeader(assertEnv("SPOYNT_ACCOUNT_ID"), assertEnv("SPOYNT_API_KEY")),
                },
                cache: "no-store",
            }
        );

        const text = await response.text();
        if (!response.ok) {
            return NextResponse.json({ message: "Spoynt fetch failed", details: text }, { status: 502 });
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

        return NextResponse.json({ reference, ...result });
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Unable to load payment status" },
            { status: 400 }
        );
    }
}
