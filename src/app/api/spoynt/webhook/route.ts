import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { spoyntService } from "@/backend/services/spoynt.service";

function assertEnv(name: string) {
    const value = process.env[name]?.trim();
    if (!value) throw new Error(`Missing env: ${name}`);
    return value;
}

function spoyntSignature(secret: string, rawBody: string) {
    const sha1 = crypto.createHash("sha1");
    sha1.update(secret + rawBody + secret, "utf8");
    return Buffer.from(sha1.digest()).toString("base64");
}

export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.text();
        const theirSignature =
            req.headers.get("x-signature") ||
            req.headers.get("X-Signature") ||
            "";

        if (!theirSignature) {
            return NextResponse.json({ message: "Missing X-Signature" }, { status: 400 });
        }

        const ourSignature = spoyntSignature(assertEnv("SPOYNT_PRIVATE_KEY"), rawBody);
        const left = Buffer.from(ourSignature);
        const right = Buffer.from(theirSignature);

        if (left.length !== right.length || !crypto.timingSafeEqual(left, right)) {
            return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
        }

        const payload = JSON.parse(rawBody);
        const attrs = payload?.data?.attributes ?? {};
        const metadata = attrs?.metadata ?? {};

        const result = await spoyntService.processInvoice({
            cpi: String(payload?.data?.id || ""),
            referenceId: String(attrs?.reference_id || ""),
            userId: String(metadata?.user_id || ""),
            tokens: Number(metadata?.tokens ?? NaN),
            requestedCurrency: String(metadata?.ui_currency || attrs?.currency || "GBP") as "GBP" | "EUR" | "USD",
            requestedAmount: Number(metadata?.ui_amount ?? attrs?.amount ?? NaN),
            chargedCurrency: String(attrs?.currency || metadata?.ui_currency || "GBP") as "GBP" | "EUR" | "USD",
            chargedAmount: Number(attrs?.amount ?? metadata?.ui_amount ?? NaN),
            status: String(attrs?.status || "created"),
            resolution: attrs?.resolution ? String(attrs.resolution) : null,
            providerUpdatedAt: Number.isFinite(Number(attrs?.updated)) ? Number(attrs.updated) : null,
        });

        return NextResponse.json({ ok: true, result });
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Webhook error" },
            { status: 400 }
        );
    }
}
