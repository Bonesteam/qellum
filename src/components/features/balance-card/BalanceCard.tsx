"use client";

import Link from "next/link";
import { LogoutButton } from "@/components/ui/logout-button/LogoutButton";
import styles from "./BalanceCard.module.scss";
import { GiTwoCoins } from "react-icons/gi";
import ButtonUI from "@/components/ui/button/ButtonUI";
import React from "react";
import { useWalletBalance } from "@/hooks/useWalletBalance";
import { useTranslation } from "@/i18n/useTranslation";

export default function BalanceCard() {
    const { formatted } = useWalletBalance();
    const { t } = useTranslation();

    return (
        <section className={styles.balanceCard}>
            <div className={styles.left}>
                <h3>{t.wallet.yourBalance}</h3>
                <p className={styles.amount}>
                    <GiTwoCoins />
                    {formatted}
                </p>
            </div>

            <div className={styles.right}>
                <Link href="/pricing" className={styles.topUpBtn}>
                    <ButtonUI
                        variant="outlined"
                        color="secondary"
                        textColor="quaternary"
                        size="lg"
                        hoverEffect="shadow"
                        hoverColor="primary"
                        hoverTextColor="text"
                    >
                        {t.wallet.topUpWallet}
                    </ButtonUI>
                </Link>
                <LogoutButton />
            </div>
        </section>
    );
}
