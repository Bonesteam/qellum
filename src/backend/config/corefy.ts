import crypto from "crypto";

export type SupportedPaymentCurrency = "EUR" | "GBP" | "USD";

export interface CorefyCustomerInput {
    referenceId?: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
    street?: string | null;
    city?: string | null;
    country?: string | null;
    postalCode?: string | null;
    dateOfBirth?: string | Date | null;
}

const ISO_COUNTRY_MAP: Record<string, string> = {
    "united kingdom": "GB",
    "great britain": "GB",
    uk: "GB",
    england: "GB",
    scotland: "GB",
    wales: "GB",
    ireland: "IE",
    "united states": "US",
    usa: "US",
    canada: "CA",
    germany: "DE",
    france: "FR",
    spain: "ES",
    italy: "IT",
    netherlands: "NL",
    sweden: "SE",
    norway: "NO",
    denmark: "DK",
    finland: "FI",
    poland: "PL",
    portugal: "PT",
    austria: "AT",
    belgium: "BE",
    switzerland: "CH",
    australia: "AU",
    "new zealand": "NZ",
    japan: "JP",
    "south korea": "KR",
    singapore: "SG",
    "united arab emirates": "AE",
    uae: "AE",
    brazil: "BR",
    mexico: "MX",
    ukraine: "UA",
    cyprus: "CY",
    greece: "GR",
    estonia: "EE",
    latvia: "LV",
    lithuania: "LT",
    czechia: "CZ",
    "czech republic": "CZ",
    hungary: "HU",
    romania: "RO",
    bulgaria: "BG",
    croatia: "HR",
    slovakia: "SK",
    slovenia: "SI",
    malta: "MT",
    luxembourg: "LU",
    iceland: "IS",
};

export function mapCountryToIso2(country?: string | null): string {
    if (!country) return "GB";
    const clean = country.trim().toLowerCase();
    if (clean.length === 2) return clean.toUpperCase();
    return ISO_COUNTRY_MAP[clean] || "GB";
}

export function formatCorefyCustomer(input: CorefyCustomerInput) {
    const firstName = (input.firstName || "Customer").trim();
    const surname = (input.lastName || "User").trim();
    const name = `${firstName} ${surname}`.trim();
    const country = mapCountryToIso2(input.country);
    const street = (input.street || "196 High Road").trim();
    const city = (input.city || "London").trim();
    const postCode = (input.postalCode || "N22 8HH").trim();
    const fullAddress = `${street}, ${city}, ${postCode}`;

    let phone = (input.phone || "").trim();
    if (phone && !phone.startsWith("+")) {
        const digits = phone.replace(/\D/g, "");
        phone = digits ? `+${digits}` : "+447476928624";
    }
    if (!phone) {
        phone = "+447476928624";
    }

    let dobString: string | undefined;
    if (input.dateOfBirth) {
        try {
            dobString = new Date(input.dateOfBirth).toISOString().slice(0, 10);
        } catch {
            dobString = undefined;
        }
    }

    return {
        reference_id: input.referenceId || undefined,
        email: input.email,
        name,
        first_name: firstName,
        surname,
        phone,
        ...(dobString ? { date_of_birth: dobString } : {}),
        address: {
            full_address: fullAddress,
            country,
            city,
            street,
            post_code: postCode,
        },
    };
}

export function getCorefyConfig() {
    const baseUrl = (
        process.env.COREFY_API_URL ||
        process.env.COREFY_BASE_URL ||
        process.env.SPOYNT_BASE_URL ||
        "https://api.spoynt.com"
    ).replace(/\/+$/, "");

    const accountId = (
        process.env.COREFY_ACCOUNT_ID ||
        process.env.SPOYNT_ACCOUNT_ID ||
        ""
    ).trim();

    const apiKey = (
        process.env.COREFY_API_KEY ||
        process.env.SPOYNT_API_KEY ||
        ""
    ).trim();

    const webhookSecret = (
        process.env.COREFY_WEBHOOK_SECRET ||
        process.env.SPOYNT_PRIVATE_KEY ||
        ""
    ).trim();

    const publicAppUrl = getCorefyPublicBaseUrl();

    return {
        baseUrl,
        accountId,
        apiKey,
        webhookSecret,
        publicAppUrl,
    };
}

export function getCorefyPublicBaseUrl(): string {
    const explicitBase =
        process.env.COREFY_PUBLIC_APP_URL?.trim() ||
        process.env.SPOYNT_PUBLIC_APP_URL?.trim() ||
        process.env.NEXT_PUBLIC_APP_ORIGIN?.trim() ||
        process.env.NEXT_PUBLIC_FRONTEND_URL?.trim() ||
        process.env.APP_URL?.trim() ||
        "https://www.qellum.co.uk";

    try {
        const url = new URL(explicitBase);
        return url.origin;
    } catch {
        return "https://www.qellum.co.uk";
    }
}

export function getCorefyServiceForCurrency(currency: SupportedPaymentCurrency): string {
    const key = currency.toUpperCase();
    return (
        process.env[`COREFY_DEFAULT_SERVICE_${key}`]?.trim() ||
        process.env[`SPOYNT_DEFAULT_SERVICE_${key}`]?.trim() ||
        `payment_card_${currency.toLowerCase()}_hpp`
    );
}

export function getCorefyBasicAuthHeader(): string {
    const config = getCorefyConfig();
    if (!config.accountId || !config.apiKey) {
        throw new Error("Corefy credentials missing: accountId or apiKey not configured");
    }
    return `Basic ${Buffer.from(`${config.accountId}:${config.apiKey}`).toString("base64")}`;
}

/**
 * Validates Corefy Webhook signature:
 * Standard Corefy algorithm: base64(sha1(secret + rawBody + secret))
 * Also supports HMAC-SHA256 and HMAC-SHA1 fallback for flexible merchant configurations.
 */
export function verifyCorefyWebhookSignature(
    rawBody: string,
    signatureHeader: string | null
): boolean {
    const config = getCorefyConfig();
    const secret = config.webhookSecret;

    if (!secret) {
        if (process.env.NODE_ENV !== "production") {
            console.warn("⚠️ Webhook secret not configured; bypassing signature check in non-production.");
            return true;
        }
        return false;
    }

    if (!signatureHeader) return false;
    const cleanHeader = signatureHeader.trim();

    try {
        // Standard Corefy SHA-1
        const sha1 = crypto.createHash("sha1");
        sha1.update(secret + rawBody + secret, "utf8");
        const expectedBase64 = Buffer.from(sha1.digest()).toString("base64");

        if (cleanHeader === expectedBase64) return true;

        const leftBuf = Buffer.from(expectedBase64);
        const rightBuf = Buffer.from(cleanHeader);
        if (leftBuf.length === rightBuf.length && crypto.timingSafeEqual(leftBuf, rightBuf)) {
            return true;
        }

        // HMAC-SHA256 fallback
        const hmacSha256Hex = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
        const hmacSha256Base64 = crypto.createHmac("sha256", secret).update(rawBody).digest("base64");
        if (cleanHeader === hmacSha256Hex || cleanHeader === hmacSha256Base64) return true;

        // HMAC-SHA1 fallback
        const hmacSha1Hex = crypto.createHmac("sha1", secret).update(rawBody).digest("hex");
        if (cleanHeader === hmacSha1Hex) return true;

        return false;
    } catch (err) {
        console.error("Signature verification error:", err);
        return false;
    }
}
