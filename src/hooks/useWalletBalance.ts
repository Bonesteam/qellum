"use client";

import { useMemo } from "react";
import { useUser } from "@/context/UserContext";
import { useCurrency } from "@/context/CurrencyContext";
import { gbpToDisplay, resolveBalanceGBP } from "@/utils/wallet";

export function useWalletBalance() {
    const user = useUser();
    const { currency, sign } = useCurrency();

    return useMemo(() => {
        const balanceGBP = resolveBalanceGBP({ balanceGBP: user?.balanceGBP, tokens: user?.tokens });
        const display = gbpToDisplay(balanceGBP, currency);
        return {
            balanceGBP,
            display,
            formatted: `${sign}${display.toFixed(2)}`,
            currency,
        };
    }, [user?.balanceGBP, user?.tokens, currency, sign]);
}
