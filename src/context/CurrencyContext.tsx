"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Currency = "EUR";

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (val: Currency) => void;
    sign: string;
    rateToGBP: number;
    convertFromGBP: (gbp: number) => number;
    convertToGBP: (val: number) => number;
}

const CURRENCY_SIGNS: Record<Currency, string> = {
    EUR: "€",
};

const RATES: Record<Currency, number> = {
    EUR: 1.17,
};

const CurrencyContext = createContext<CurrencyContextType>({
    currency: "EUR",
    setCurrency: () => {},
    sign: "€",
    rateToGBP: RATES.EUR,
    convertFromGBP: (v) => v * RATES.EUR,
    convertToGBP: (v) => v / RATES.EUR,
});

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
    const [currency, setCurrency] = useState<Currency>("EUR");
    const rateToGBP = RATES[currency];
    const sign = CURRENCY_SIGNS[currency];

    return (
        <CurrencyContext.Provider
            value={{
                currency,
                setCurrency,
                sign,
                rateToGBP,
                convertFromGBP: (gbp) => gbp * rateToGBP,
                convertToGBP: (val) => val / rateToGBP,
            }}
        >
            {children}
        </CurrencyContext.Provider>
    );
};
