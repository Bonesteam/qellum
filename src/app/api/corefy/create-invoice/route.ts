import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { connectDB } from "@/backend/config/db";
import { User } from "@/backend/models/user.model";
import { corefyService } from "@/backend/services/corefy.service";
import { ENV } from "@/backend/config/env";
import { userController } from "@/backend/controllers/user.controller";
import { isTestMode } from "@/backend/config/features";
import { displayToGbp, minTopUpForCurrency, round2, syncLegacyTokens, TOKENS_PER_GBP, RATES_FROM_GBP } from "@/utils/wallet";
import {
    getCorefyConfig,
    getCorefyBasicAuthHeader,
    getCorefyServiceForCurrency,
    formatCorefyCustomer,
    SupportedPaymentCurrency,
} from "@/backend/config/corefy";

function compactObject<T extends Record<string, unknown>>(value: T) {
    return Object.fromEntries(
        Object.entries(value).filter(([, item]) => item !== undefined && item !== null && item !== "")
    );
}

function buildReturnUrl(publicBaseUrl: string, pathname: string, referenceId: string, result: string) {
    const url = new URL(pathname, publicBaseUrl);
    url.searchParams.set("reference", referenceId);
    url.searchParams.set("result", result);
    return url.toString();
}

export async function POST(req: NextRequest) {
    try {
        const auth = await requireAuth(req);
        const body = await req.json().catch(() => ({}));

        const requestedCurrency = (String(body.currency || "EUR").toUpperCase()) as SupportedPaymentCurrency;
        if (!["EUR", "USD", "GBP"].includes(requestedCurrency)) {
            return NextResponse.json({ message: "Supported currencies: EUR, USD" }, { status: 400 });
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
            const rate = RATES_FROM_GBP[requestedCurrency] || 1;
            amount = round2((tokens / TOKENS_PER_GBP) * rate);
        }

        if (!Number.isFinite(amount) || amount <= 0) {
            return NextResponse.json({ message: "Invalid amount" }, { status: 400 });
        }

        const referenceId = crypto.randomUUID();
        const gbpAmount = displayToGbp(amount, requestedCurrency);

        // Test mode bypass
        if (isTestMode()) {
            await connectDB();
            await corefyService.upsertCreatedInvoice({
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

        const config = getCorefyConfig();
        const basicAuth = getCorefyBasicAuthHeader();
        const callbackUrl = process.env.COREFY_CALLBACK_URL?.trim() ||
            process.env.SPOYNT_CALLBACK_URL?.trim() ||
            new URL("/api/corefy/webhook", config.publicAppUrl).toString();

        await connectDB();
        const user = await User.findById(auth.sub).lean();

        const formattedCustomer = formatCorefyCustomer({
            referenceId: auth.sub,
            email: auth.email || user?.email || "",
            firstName: user?.firstName,
            lastName: user?.lastName,
            phone: user?.phone,
            street: user?.address?.street,
            city: user?.address?.city,
            country: user?.address?.country,
            postalCode: user?.address?.postalCode,
            dateOfBirth: user?.dateOfBirth,
        });

        const service = getCorefyServiceForCurrency(requestedCurrency);

        const attributes = compactObject({
            reference_id: referenceId,
            amount,
            currency: requestedCurrency,
            service,
            flow: "charge",
            description: `Qellum tokens: ${tokens}`,
            callback_url: callbackUrl,
            return_urls: {
                success: buildReturnUrl(config.publicAppUrl, "/payment-status", referenceId, "success"),
                fail: buildReturnUrl(config.publicAppUrl, "/payment-status", referenceId, "fail"),
                pending: buildReturnUrl(config.publicAppUrl, "/payment-status", referenceId, "pending"),
            },
            customer: formattedCustomer,
            metadata: {
                user_id: auth.sub,
                tokens: String(tokens),
                top_up_gbp: String(gbpAmount),
                ui_currency: requestedCurrency,
                ui_amount: String(amount),
            },
        });

        const endpoint = `${config.baseUrl}/payment-invoices`;
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/vnd.api+json",
                Accept: "application/vnd.api+json, application/json",
                Authorization: basicAuth,
            },
            body: JSON.stringify({
                data: {
                    type: "payment-invoices",
                    attributes,
                },
            }),
        });

        const text = await response.text();
        let json: any = null;
        try {
            json = text ? JSON.parse(text) : null;
        } catch {
            json = null;
        }

        if (!response.ok || (response.status !== 201 && response.status !== 200)) {
            const errorDetail =
                json?.errors?.map((e: any) => e.detail || e.title).filter(Boolean).join("; ") ||
                json?.message ||
                text ||
                `HTTP ${response.status} ${response.statusText}`;

            console.error("Corefy invoice creation failed:", {
                status: response.status,
                endpoint,
                errorDetail,
            });

            return NextResponse.json(
                { message: "Corefy create invoice failed", details: errorDetail },
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
                { message: "Corefy response missing redirect data", raw: json },
                { status: 502 }
            );
        }

        await corefyService.upsertCreatedInvoice({
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
        console.error("Corefy create-invoice error:", error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Unable to create invoice" },
            { status: 400 }
        );
    }
}
