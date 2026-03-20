"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import styles from "./PricingCard.module.scss";
import ButtonUI from "@/components/ui/button/ButtonUI";
import { useAlert } from "@/context/AlertContext";
import { useUser } from "@/context/UserContext";
import Input from "@mui/joy/Input";
import { useCurrency } from "@/context/CurrencyContext";

const TOKENS_PER_GBP = 100;
const MIN_TOKENS = 1000;
const PURCHASE_CURRENCY = "EUR";

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
  buttonLink,
  badgeTop,
  badgeBottom,
  index = 0,
}) => {
  const { showAlert } = useAlert();
  const user = useUser();
  const { sign, convertFromGBP } = useCurrency();
  // allow user to enter desired tokens for custom top-up
  const [customTokens, setCustomTokens] = useState<number>(MIN_TOKENS);

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
    if (!user) {
      showAlert("Please sign up", "You need to be signed in to purchase", "info");
      setTimeout(() => (window.location.href = "/sign-up"), 1200);
      return;
    }

    try {
      let payload: { currency: "EUR"; tokens: number };

      if (isCustom) {
        const tokensToBuy = Math.max(MIN_TOKENS, Math.floor(customTokens));
        payload = {
          currency: PURCHASE_CURRENCY,
          tokens: tokensToBuy,
        };
      } else {
        payload = {
          currency: PURCHASE_CURRENCY,
          tokens: tokens,
        };
      }

      const response = await fetch("/api/spoynt/create-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.message || "Payment creation failed");
      }

      if (data.redirectMethod === "POST") {
        submitRedirectForm(data.redirectUrl, data.redirectParams || {});
        return;
      }

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }

      throw new Error("Spoynt redirect URL was not returned");
    } catch (err: any) {
      showAlert("Error", err.message || "Something went wrong", "error");
    }
  };

  return (
    <motion.div
      className={`${styles.card} ${styles[variant]}`}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.015, y: -3 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
    >
      {badgeTop && <span className={styles.badgeTop}>{badgeTop}</span>}

      <h3 className={styles.title}>{title}</h3>

      {isCustom ? (
        <>
          <div className={styles.customInput}>
            <Input
              type="number"
              value={customTokens}
              onChange={(e) => setCustomTokens(Number(e.target.value))}
              slotProps={{ input: { min: MIN_TOKENS, step: 100 } }}
              placeholder="Enter tokens"
              size="md"
            />
          </div>
          <p className={styles.dynamicPrice}>
            {sign}
            {(() => {
              const safeTokens = Math.max(MIN_TOKENS, Math.floor(customTokens || 0));
              const gbp = safeTokens / TOKENS_PER_GBP;
              return convertFromGBP(gbp).toFixed(2);
            })()} ≈ {Math.max(MIN_TOKENS, Math.floor(customTokens || 0))} tokens
          </p>
          <p className={styles.description}>Minimum purchase: {MIN_TOKENS} tokens.</p>
        </>
      ) : (
        <p className={styles.price}>
          {sign}
          {convertedPrice.toFixed(2)}{" "}
          <span className={styles.tokens}>/ {tokens} tokens</span>
        </p>
      )}

      <p className={styles.description}>{description}</p>

      <ul className={styles.features}>
        {features.map((f, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: i * 0.04 }}
          >
            {f}
          </motion.li>
        ))}
      </ul>

      <ButtonUI fullWidth onClick={handleBuy}>
        {user ? buttonText : "Sign Up to Buy"}
      </ButtonUI>

      {badgeBottom && <span className={styles.badgeBottom}>{badgeBottom}</span>}
    </motion.div>
  );
};

export default PricingCard;
