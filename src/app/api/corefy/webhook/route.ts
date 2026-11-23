import { NextRequest, NextResponse } from "next/server";
import { verifyCorefyWebhookSignature } from "@/backend/config/corefy";
import { corefyService } from "@/backend/services/corefy.service";

export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.text();
        const signature =
            req.headers.get("x-signature") ||
            req.headers.get("X-Signature") ||
            req.headers.get("Signature") ||
            req.headers.get("signature") ||
            "";

        if (!signature) {
            console.warn("Corefy webhook received with missing signature header");
            return NextResponse.json({ message: "Missing signature header" }, { status: 400 });
        }

        const isValid = verifyCorefyWebhookSignature(rawBody, signature);
        if (!isValid) {
            console.error("Corefy webhook invalid signature mismatch:", { signature });
            return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
        }

        let payload: any;
        try {
            payload = JSON.parse(rawBody);
        } catch {
            return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
        }

        const attrs = payload?.data?.attributes ?? {};
        const metadata = attrs?.metadata ?? {};

        const cpi = String(payload?.data?.id || "");
        const referenceId = String(metadata?.reference_id || attrs?.reference_id || "");
        const userId = String(metadata?.user_id || "");
        const tokens = Number(metadata?.tokens ?? NaN);
        const requestedCurrency = String(metadata?.ui_currency || attrs?.currency || "GBP") as "GBP" | "EUR" | "USD";
        const requestedAmount = Number(metadata?.ui_amount ?? attrs?.amount ?? NaN);
        const chargedCurrency = String(attrs?.currency || metadata?.ui_currency || "GBP") as "GBP" | "EUR" | "USD";
        const chargedAmount = Number(attrs?.amount ?? metadata?.ui_amount ?? NaN);
        const status = String(attrs?.status || "created");
        const resolution = attrs?.resolution ? String(attrs.resolution) : null;
        const providerUpdatedAt = Number.isFinite(Number(attrs?.updated)) ? Number(attrs.updated) : null;

        console.log("Processing Corefy webhook notification:", {
            cpi,
            referenceId,
            status,
            resolution,
            tokens,
            userId,
        });

        const result = await corefyService.processInvoice({
            cpi,
            referenceId,
            userId,
            tokens,
            requestedCurrency,
            requestedAmount,
            chargedCurrency,
            chargedAmount,
            status,
            resolution,
            providerUpdatedAt,
        });

        return NextResponse.json({ ok: true, result });
    } catch (error) {
        console.error("Corefy webhook handler error:", error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Webhook processing error" },
            { status: 400 }
        );
    }
}
