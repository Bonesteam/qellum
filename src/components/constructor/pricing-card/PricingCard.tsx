"use client";

import React, { useMemo, useState } from "react";
import styles from "./PricingCard.module.scss";
import { useAlert } from "@/context/AlertContext";
import { useUser } from "@/context/UserContext";
import Input from "@mui/joy/Input";
import { useCurrency } from "@/context/CurrencyContext";
import { minTopUpForCurrency } from "@/utils/wallet";
import Link from "next/link";

interface PricingCardProps {
  variant?: "starter" | "pro" | "premium" | "custom";
  title: string;
  price: string;
  tokens: number;
  description: string;
  features: string[];
  buttonText: string;
  buttonLink?: string;
  badgeTop?: string;
  badgeBottom?: string;
  index?: number;
}

const PricingCard: React.FC<PricingCardProps> = ({
  variant = "starter",
  title,
  price,
  tokens,
  description,
  features,
  buttonText,
  badgeTop,
  badgeBottom,
  index = 0,
}) => {
  const { showAlert } = useAlert();
  const user = useUser();
  const { currency, sign, convertFromGBP } = useCurrency();
  const minTopUp = minTopUpForCurrency(currency);
  const [customAmount, setCustomAmount] = useState<number>(minTopUp);
  const [isBuying, setIsBuying] = useState(false);

  const isCustom = price === "dynamic";
  const basePriceGBP = useMemo(
    () => (isCustom ? 0 : parseFloat(price.replace(/[^0-9.]/g, ""))),
    [price, isCustom]
  );
  const convertedPrice = useMemo(
    () => (isCustom ? 0 : convertFromGBP(basePriceGBP)),
    [basePriceGBP, convertFromGBP, isCustom]
  );

  const submitRedirectForm = (url: string, params: Record<string, string>) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = url;
    Object.entries(params).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = String(value);
      form.appendChild(input);
    });
    document.body.appendChild(form);
    form.submit();
  };

  const handleBuy = async () => {
    if (isBuying) return;
    if (!user) {
      showAlert("Please sign up", "You need to be signed in to top up your wallet", "info");
      setTimeout(() => (window.location.href = "/sign-up"), 1200);
      return;
    }
    setIsBuying(true);
    try {
      const amount = isCustom
        ? Math.max(minTopUp, Number(customAmount) || minTopUp)
        : convertedPrice;
      if (amount < minTopUp) throw new Error(`Minimum top-up is ${sign}${minTopUp.toFixed(2)}`);
      const response = await fetch("/api/spoynt/create-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currency, amount }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.details || data.message || "Payment creation failed");
      if (data.redirectMethod === "POST") { submitRedirectForm(data.redirectUrl, data.redirectParams || {}); return; }
      if (data.redirectUrl) { window.location.href = data.redirectUrl; return; }
      throw new Error("Payment redirect URL was not returned");
    } catch (err: unknown) {
      setIsBuying(false);
      showAlert("Error", err instanceof Error ? err.message : "Something went wrong", "error");
    }
  };

  /* ── визначаємо клас кнопки: для .pro — outline (він вже темний), для решти — fill ── */
  const isPro = variant === "pro";

  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      {badgeTop && <span className={styles.badgeTop}>{badgeTop}</span>}

      <h3 className={styles.title}>{title}</h3>

      {isCustom ? (
        <div className={styles.inputWrapper}>
          <Input
            type="number"
            value={customAmount}
            onChange={(e) => setCustomAmount(Number(e.target.value))}
            slotProps={{ input: { min: minTopUp, step: 1 } }}
            placeholder={`Amount in ${currency}`}
            size="md"
          />
          <p className={styles.description}>
            Minimum top-up: {sign}{minTopUp.toFixed(2)}. No upper limit.
          </p>
        </div>
      ) : (
        <>
          <div className={styles.price}>
            <span>{sign}{convertedPrice.toFixed(2)}</span>
            <span className={styles.priceUnit}>/ pack</span>
          </div>
          {tokens > 0 && (
            <span className={styles.tokensBadge}>{tokens.toLocaleString()} tokens</span>
          )}
        </>
      )}

      <p className={styles.description}>{description}</p>

      <div className={styles.divider} />

      <ul className={styles.features}>
        {features.map((f, i) => <li key={i}>{f}</li>)}
      </ul>

      <div className={styles.buttonWrapper}>
        <button
          className={isPro ? styles.buttonOutline : styles.buttonFill}
          onClick={handleBuy}
          disabled={isBuying}
        >
          {isBuying ? "Processing..." : user ? buttonText : "Sign Up to Top Up"}
        </button>
        {badgeBottom && <span className={styles.badgeBottom}>{badgeBottom}</span>}
      </div>
    </div>
  );
};

export default PricingCard;