"use client";
/*
 * BalanceCard.tsx — ФІКС кнопок
 * ❌ БУЛО: Top Up Wallet — outlined color="secondary" textColor="quaternary"
 *          виглядало як майже прозора кнопка на світлому фоні
 * ✅ ТЕПЕР: Top Up Wallet — solid primary (зелена, чітка)
 *           Log out — через LogoutButton (нейтральний outline)
 */
import Link from "next/link";
import { LogoutButton } from "@/components/ui/logout-button/LogoutButton";
import styles from "./BalanceCard.module.scss";
import ButtonUI from "@/components/ui/button/ButtonUI";
import React from "react";
import { useWalletBalance } from "@/hooks/useWalletBalance";
import { useTranslation } from "@/i18n/useTranslation";
import { GiCoinsPile } from "react-icons/gi";

export default function BalanceCard() {
    const { formatted } = useWalletBalance();
    const { t } = useTranslation();

    return (
        <section className={styles.balanceCard}>
            <div className={styles.left}>
                <h3>{t.wallet.yourBalance}</h3>
                <p className={styles.amount}>
                    <GiCoinsPile />
                    {formatted}
                </p>
            </div>

            <div className={styles.right}>
                {/* ✅ Зелена filled кнопка — добре видно */}
                <Link href="/pricing">
                    <ButtonUI
                        variant="solid"
                        color="primary"
                        textColor="backgroundLight"
                        size="lg"
                        hoverEffect="none"
                        hoverColor="hover"
                    >
                        {t.wallet.topUpWallet}
                    </ButtonUI>
                </Link>

                {/* ✅ Нейтральна outline кнопка — не кричить */}
                <LogoutButton />
            </div>
        </section>
    );
}