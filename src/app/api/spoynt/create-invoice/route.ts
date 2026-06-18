import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { connectDB } from "@/backend/config/db";
import { User } from "@/backend/models/user.model";
import { spoyntService } from "@/backend/services/spoynt.service";
import { ENV } from "@/backend/config/env";
import { userController } from "@/backend/controllers/user.controller";
import { isTestMode } from "@/backend/config/features";
import { displayToGbp, minTopUpForCurrency, round2, syncLegacyTokens, TOKENS_PER_GBP } from "@/utils/wallet";

const RATES_TO_GBP = {
    GBP: 1,
    EUR: 1.17,
    USD: 1.22,
} as const;

type SupportedCurrency = keyof typeof RATES_TO_GBP;

function assertEnv(name: string) {
    const value = process.env[name]?.trim();
    if (!value) throw new Error(`Missing env: ${name}`);
    return value;
}

function basicAuthHeader(username: string, password: string) {
    return `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
}

function round2(value: number) {
    return Math.round(value * 100) / 100;
}

function normalizeCountry(value: unknown) {
    if (typeof value !== "string") return undefined;

    const trimmed = value.trim();
    if (!trimmed) return undefined;

    if (/^[A-Z]{2}$/.test(trimmed)) {
        return trimmed;
    }

    const known: Record<string, string> = {
        uk: "GB",
        gb: "GB",
        "great britain": "GB",
        "united kingdom": "GB",
        england: "GB",
        scotland: "GB",
        wales: "GB",
        "northern ireland": "GB",
        ireland: "IE",
        ukraine: "UA",
        usa: "US",
        us: "US",
        "united states": "US",
        germany: "DE",
        france: "FR",
        spain: "ES",
        italy: "IT",
        poland: "PL",
    };

    return known[trimmed.toLowerCase()];
}

function compactObject<T extends Record<string, unknown>>(value: T) {
    return Object.fromEntries(
        Object.entries(value).filter(([, item]) => item !== undefined && item !== null && item !== "")
    );
}

function getServiceForCurrency(currency: SupportedCurrency) {
    return process.env[`SPOYNT_DEFAULT_SERVICE_${currency}`]?.trim() || `payment_card_${currency.toLowerCase()}_hpp`;
}

function buildReturnUrl(pathname: string, referenceId: string, result: string) {
    const publicBaseUrl = getSpoyntPublicBaseUrl();
    const url = new URL(pathname, publicBaseUrl);
    url.searchParams.set("reference", referenceId);
    url.searchParams.set("result", result);
    return url.toString();
}

function getSpoyntPublicBaseUrl() {
    const explicitBase =
        process.env.SPOYNT_PUBLIC_APP_URL?.trim() ||
        process.env.NEXT_PUBLIC_APP_ORIGIN?.trim() ||
        process.env.APP_URL?.trim();

    if (!explicitBase) {
        throw new Error("Missing SPOYNT_PUBLIC_APP_URL for payment return URLs");
    }

    try {
        const url = new URL(explicitBase);
        const invalidHost =
            url.hostname === "localhost" ||
            url.hostname === "127.0.0.1" ||
            url.hostname.endsWith(".local");

        if (url.protocol !== "https:" || invalidHost) {
            throw new Error("SPOYNT_PUBLIC_APP_URL must be a public https URL");
        }

        return url.toString();
    } catch (error) {
        throw new Error(
            error instanceof Error
                ? error.message
                : "Invalid SPOYNT_PUBLIC_APP_URL"
        );
    }
}

function getPublicCallbackUrl() {
    const explicit = process.env.SPOYNT_CALLBACK_URL?.trim();
    if (explicit) {
        return explicit;
    }

    return new URL("/api/spoynt/webhook", getSpoyntPublicBaseUrl()).toString();
}

export async function POST(req: NextRequest) {
    try {
        const auth = await requireAuth(req);
        const body = await req.json().catch(() => ({}));

        const requestedCurrency = String(body.currency || "").toUpperCase() as SupportedCurrency;
        if (!Object.keys(RATES_TO_GBP).includes(requestedCurrency)) {
            return NextResponse.json({ message: "Unsupported currency" }, { status: 400 });
        }

        const minTopUp = minTopUpForCurrency(requestedCurrency);
        let amount: number;
        let tokens: number;

        if (body.amount != null && body.amount !== "") {
            amount = round2(Number(body.amount));
            if (!Number.isFinite(amount) || amount < minTopUp) {
                return NextResponse.json(
                    { message: `Minimum top-up is ${minTopUp.toFixed(2)} ${requestedCurrency}` },
                    { status: 400 }
                );
            }
            const gbpEquivalent = displayToGbp(amount, requestedCurrency);
            tokens = syncLegacyTokens(gbpEquivalent);
        } else {
            const requestedTokens = Number(body.tokens);
            if (!Number.isFinite(requestedTokens) || requestedTokens < syncLegacyTokens(10)) {
                return NextResponse.json(
                    { message: `Minimum top-up is ${minTopUp.toFixed(2)} ${requestedCurrency}` },
                    { status: 400 }
                );
            }
            tokens = Math.floor(requestedTokens);
            amount = round2((tokens / TOKENS_PER_GBP) * RATES_TO_GBP[requestedCurrency]);
        }

        if (!Number.isFinite(amount) || amount <= 0) {
            return NextResponse.json({ message: "Invalid amount" }, { status: 400 });
        }

        const referenceId = crypto.randomUUID();
        const gbpAmount = displayToGbp(amount, requestedCurrency);

        if (isTestMode()) {
            await connectDB();
            await spoyntService.upsertCreatedInvoice({
                cpi: `test-${referenceId}`,
                referenceId,
                userId: auth.sub,
                tokens,
                requestedCurrency,
                requestedAmount: amount,
                chargedCurrency: requestedCurrency,
                chargedAmount: amount,
                status: "processed",
                resolution: "ok",
                providerUpdatedAt: Date.now(),
            });

            await userController.topUpWallet(auth.sub, gbpAmount, {
                chargedAmount: amount,
                chargedCurrency: requestedCurrency,
                referenceId,
            });

            const testReturnUrl = `${ENV.APP_URL}/payment-status?reference=${referenceId}&result=success`;
            return NextResponse.json({
                cpi: `test-${referenceId}`,
                referenceId,
                amount,
                currency: requestedCurrency,
                amountGBP: gbpAmount,
                redirectUrl: testReturnUrl,
                redirectMethod: "GET",
                redirectParams: {},
                testMode: true,
            });
        }

        const SPOYNT_BASE_URL = assertEnv("SPOYNT_BASE_URL");
        const SPOYNT_ACCOUNT_ID = assertEnv("SPOYNT_ACCOUNT_ID");
        const SPOYNT_API_KEY = assertEnv("SPOYNT_API_KEY");
        const callbackUrl = getPublicCallbackUrl();

        await connectDB();
        const user = await User.findById(auth.sub).lean();

        const address = compactObject({
            street: user?.address?.street || undefined,
            city: user?.address?.city || undefined,
            country: normalizeCountry(user?.address?.country),
            post_code: user?.address?.postalCode || undefined,
        });

        const customer = compactObject({
            reference_id: auth.sub,
            email: auth.email,
            name: user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || undefined : undefined,
            first_name: user?.firstName || undefined,
            surname: user?.lastName || undefined,
            phone: user?.phone || undefined,
            date_of_birth: user?.dateOfBirth
                ? new Date(user.dateOfBirth).toISOString().slice(0, 10)
                : undefined,
            address: Object.keys(address).length ? address : undefined,
        });

        const attributes = compactObject({
            reference_id: referenceId,
            amount,
            currency: requestedCurrency,
            service: getServiceForCurrency(requestedCurrency),
            flow: "charge",
            description: `Qellum tokens: ${tokens}`,
            callback_url: callbackUrl,
            return_urls: {
                success: buildReturnUrl("/payment-status", referenceId, "success"),
                fail: buildReturnUrl("/payment-status", referenceId, "fail"),
                pending: buildReturnUrl("/payment-status", referenceId, "pending"),
            },
            customer,
            metadata: {
                user_id: auth.sub,
                tokens: String(tokens),
                top_up_gbp: String(gbpAmount),
                ui_currency: requestedCurrency,
                ui_amount: String(amount),
            },
        });

        const response = await fetch(`${SPOYNT_BASE_URL}/payment-invoices`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: basicAuthHeader(SPOYNT_ACCOUNT_ID, SPOYNT_API_KEY),
            },
            body: JSON.stringify({
                data: {
                    type: "payment-invoices",
                    attributes,
                },
            }),
        });

        const text = await response.text();
        const json = text ? JSON.parse(text) : null;

        if (response.status !== 201) {
            return NextResponse.json(
                { message: "Spoynt create invoice failed", details: text },
                { status: 502 }
            );
        }

        const cpi = json?.data?.id as string | undefined;
        const attrs = json?.data?.attributes;
        const redirectUrl = attrs?.hpp_url || attrs?.flow_data?.action;
        const redirectMethod = attrs?.flow_data?.method?.toUpperCase?.() || "GET";
        const redirectParams = attrs?.flow_data?.params || {};

        if (!cpi || !redirectUrl) {
            return NextResponse.json(
                { message: "Spoynt response missing redirect data", raw: json },
                { status: 502 }
            );
        }

        await spoyntService.upsertCreatedInvoice({
            cpi,
            referenceId,
            userId: auth.sub,
            tokens,
            requestedCurrency,
            requestedAmount: amount,
            chargedCurrency: requestedCurrency,
            chargedAmount: amount,
            status: attrs?.status || "created",
            resolution: attrs?.resolution ?? null,
            providerUpdatedAt: attrs?.updated ?? null,
        });

        return NextResponse.json({
            cpi,
            referenceId,
            tokens,
            amount,
            currency: requestedCurrency,
            redirectUrl,
            redirectMethod,
            redirectParams,
        });
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Unable to create invoice" },
            { status: 400 }
        );
    }
}
