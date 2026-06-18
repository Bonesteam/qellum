/** Feature flags driven by environment variables. */

function readBool(name: string, fallback = false): boolean {
    const raw = process.env[name]?.trim().toLowerCase();
    if (!raw) return fallback;
    return raw === "1" || raw === "true" || raw === "yes" || raw === "on";
}

export function isTestMode(): boolean {
    return readBool("TEST_MODE", false);
}

export function getTestAccountEmail(): string {
    return (process.env.TEST_ACCOUNT_EMAIL || "test@qellum.co.uk").trim().toLowerCase();
}

/** GBP balance for the test account (default: £10,000 — former 1M tokens at 100 tokens/GBP). */
export function getTestAccountBalanceGBP(): number {
    const raw = process.env.TEST_ACCOUNT_BALANCE_GBP?.trim();
    if (raw && Number.isFinite(Number(raw))) return Number(raw);
    return 10_000;
}
