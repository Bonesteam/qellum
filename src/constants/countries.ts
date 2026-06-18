export const EUROPEAN_COUNTRIES = [
    { code: "AL", name: "Albania" },
    { code: "AD", name: "Andorra" },
    { code: "AT", name: "Austria" },
    { code: "BE", name: "Belgium" },
    { code: "BA", name: "Bosnia and Herzegovina" },
    { code: "BG", name: "Bulgaria" },
    { code: "HR", name: "Croatia" },
    { code: "CY", name: "Cyprus" },
    { code: "CZ", name: "Czech Republic" },
    { code: "DK", name: "Denmark" },
    { code: "EE", name: "Estonia" },
    { code: "FI", name: "Finland" },
    { code: "FR", name: "France" },
    { code: "DE", name: "Germany" },
    { code: "GR", name: "Greece" },
    { code: "HU", name: "Hungary" },
    { code: "IS", name: "Iceland" },
    { code: "IE", name: "Ireland" },
    { code: "IT", name: "Italy" },
    { code: "XK", name: "Kosovo" },
    { code: "LV", name: "Latvia" },
    { code: "LI", name: "Liechtenstein" },
    { code: "LT", name: "Lithuania" },
    { code: "LU", name: "Luxembourg" },
    { code: "MT", name: "Malta" },
    { code: "MD", name: "Moldova" },
    { code: "MC", name: "Monaco" },
    { code: "ME", name: "Montenegro" },
    { code: "NL", name: "Netherlands" },
    { code: "MK", name: "North Macedonia" },
    { code: "NO", name: "Norway" },
    { code: "PL", name: "Poland" },
    { code: "PT", name: "Portugal" },
    { code: "RO", name: "Romania" },
    { code: "SM", name: "San Marino" },
    { code: "RS", name: "Serbia" },
    { code: "SK", name: "Slovakia" },
    { code: "SI", name: "Slovenia" },
    { code: "ES", name: "Spain" },
    { code: "SE", name: "Sweden" },
    { code: "CH", name: "Switzerland" },
    { code: "UA", name: "Ukraine" },
    { code: "GB", name: "United Kingdom" },
    { code: "VA", name: "Vatican City" },
] as const;

const countryLookup = new Map<string, (typeof EUROPEAN_COUNTRIES)[number]>();

for (const country of EUROPEAN_COUNTRIES) {
    countryLookup.set(country.name.toLowerCase(), country);
    countryLookup.set(country.code.toLowerCase(), country);
}

countryLookup.set("uk", { code: "GB", name: "United Kingdom" });
countryLookup.set("great britain", { code: "GB", name: "United Kingdom" });
countryLookup.set("england", { code: "GB", name: "United Kingdom" });
countryLookup.set("scotland", { code: "GB", name: "United Kingdom" });
countryLookup.set("wales", { code: "GB", name: "United Kingdom" });
countryLookup.set("northern ireland", { code: "GB", name: "United Kingdom" });
countryLookup.set("czechia", { code: "CZ", name: "Czech Republic" });

export function getAllowedCountryNames() {
    return EUROPEAN_COUNTRIES.map((country) => country.name);
}

export function getAllowedCountryCodes() {
    return EUROPEAN_COUNTRIES.map((country) => country.code);
}

export function normalizeAllowedCountry(value: unknown) {
    if (typeof value !== "string") return null;

    const normalized = value.trim().toLowerCase();
    if (!normalized) return null;

    return countryLookup.get(normalized) ?? null;
}

export function isAllowedCountry(value: unknown) {
    return normalizeAllowedCountry(value) !== null;
}
