import type { Currency } from "@/context/CurrencyContext";

/** Superset of the UI-facing Currency type that also includes GBP/USD for server-side routes. */
export type WalletCurrency = "GBP" | "EUR" | "USD";

/** Legacy conversion rate kept for service pricing internally. */
export const TOKENS_PER_GBP = 100;

export const RATES_FROM_GBP: Record<WalletCurrency, number> = {
    GBP: 1,
    EUR: 1.17,
    USD: 1.22,
};

export function round2(value: number): number {
    return Math.round(value * 100) / 100;
}

export function gbpToDisplay(gbp: number, currency: WalletCurrency): number {
    return round2(gbp * RATES_FROM_GBP[currency]);
}

export function displayToGbp(amount: number, currency: WalletCurrency): number {
    return round2(amount / RATES_FROM_GBP[currency]);
}

export function resolveBalanceGBP(user: { balanceGBP?: number | null; tokens?: number | null }): number {
    if (typeof user.balanceGBP === "number" && Number.isFinite(user.balanceGBP)) {
        return round2(user.balanceGBP);
    }
    const tokens = user.tokens ?? 0;
    return round2(tokens / TOKENS_PER_GBP);
}

export function syncLegacyTokens(balanceGBP: number): number {
    return Math.round(balanceGBP * TOKENS_PER_GBP);
}

export const MIN_TOP_UP_GBP = 10;

export function minTopUpForCurrency(currency: WalletCurrency): number {
    return gbpToDisplay(MIN_TOP_UP_GBP, currency);
}

