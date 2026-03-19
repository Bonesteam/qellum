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

export async function GET(req: NextRequest) {
    try {
        const auth = await requireAuth(req);
        const cpi = req.nextUrl.searchParams.get("cpi");

        if (!cpi) {
            return NextResponse.json({ message: "Missing cpi" }, { status: 400 });
        }

        const response = await fetch(
            `${assertEnv("SPOYNT_BASE_URL")}/payment-invoices/${encodeURIComponent(cpi)}`,
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

        if (String(metadata?.user_id || "") !== auth.sub) {
            return NextResponse.json({ message: "Not your payment" }, { status: 403 });
        }

        const result = await spoyntService.processInvoice({
            cpi,
            referenceId: String(attrs?.reference_id || ""),
            userId: auth.sub,
            tokens: Number(metadata?.tokens ?? NaN),
            requestedCurrency: String(metadata?.ui_currency || attrs?.currency || "GBP") as "GBP" | "EUR" | "USD",
            requestedAmount: Number(metadata?.ui_amount ?? attrs?.amount ?? NaN),
            chargedCurrency: String(attrs?.currency || metadata?.ui_currency || "GBP") as "GBP" | "EUR" | "USD",
            chargedAmount: Number(attrs?.amount ?? metadata?.ui_amount ?? NaN),
            status: String(attrs?.status || "created"),
            resolution: attrs?.resolution ? String(attrs.resolution) : null,
            providerUpdatedAt: Number.isFinite(Number(attrs?.updated)) ? Number(attrs.updated) : null,
        });

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Unable to confirm payment" },
            { status: 400 }
        );
    }
}
