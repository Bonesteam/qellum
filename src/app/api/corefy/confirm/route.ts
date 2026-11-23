import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { corefyService } from "@/backend/services/corefy.service";
import { getCorefyConfig, getCorefyBasicAuthHeader } from "@/backend/config/corefy";

export async function GET(req: NextRequest) {
    try {
        const auth = await requireAuth(req);
        const cpi = req.nextUrl.searchParams.get("cpi");

        if (!cpi) {
            return NextResponse.json({ message: "Missing cpi" }, { status: 400 });
        }

        const config = getCorefyConfig();
        const basicAuth = getCorefyBasicAuthHeader();

        const endpoint = `${config.baseUrl}/payment-invoices/${encodeURIComponent(cpi)}`;
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
            return NextResponse.json({ message: "Corefy fetch failed", details: text }, { status: 502 });
        }

        const json = JSON.parse(text);
        const attrs = json?.data?.attributes ?? {};
        const metadata = attrs?.metadata ?? {};

        if (String(metadata?.user_id || "") !== auth.sub) {
            return NextResponse.json({ message: "Not your payment" }, { status: 403 });
        }

        const result = await corefyService.processInvoice({
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
