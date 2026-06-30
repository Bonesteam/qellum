"use client";
/*
 * AuthButtons.tsx — ФІКС
 * ❌ ПРИБРАНО: Sign In = tertiary (жовтий/помаранчевий) + Sign Up = backgroundDark з зеленим текстом
 * ❌ ПРИБРАНО: hoverEffect="scale" на Create Meal
 * ❌ ПРИБРАНО: textColor="text" на Create Meal (dark text на зеленій кнопці — нечитабельно)
 * ✅ Sign In — outline, Sign Up — filled темна, обидві однакового розміру
 * ✅ Create Meal — зелена filled кнопка з білим текстом
 */
import React from "react";
import { useUser } from "@/context/UserContext";
import ButtonUI from "@/components/ui/button/ButtonUI";
import Link from "next/link";
import styles from "./AuthButtons.module.scss";
import { FaUser } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { useWalletBalance } from "@/hooks/useWalletBalance";

const AuthButtons: React.FC = () => {
    const user = useUser();
    const { formatted } = useWalletBalance();

    if (user) {
        return (
            <div className={styles.userContainer}>
                <Link href="/dashboard" className={styles.dashboardButton}>
                    <ButtonUI
                        text="Create Meal"
                        shape="default"
                        color="primary"
                        /* ✅ білий текст на зеленій кнопці */
                        textColor="backgroundLight"
                        hoverColor="hover"
                        /* ❌ ПРИБРАНО: hoverEffect="scale" */
                        hoverEffect="none"
                        fullWidth
                    />
                </Link>

                <Link href="/profile" className={styles.userCard}>
                    <div className={styles.userBalance}>
                        <GrMoney className={styles.tokenIcon} />
                        <span className={styles.balanceText}>{formatted}</span>
                    </div>
                    <div className={styles.userIconWrapper}>
                        <FaUser className={styles.userIcon} />
                    </div>
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.nonAuthedButtons}>
            {/* ✅ Sign In — outline кнопка */}
            <Link href="/sign-in">
                <ButtonUI
                    text="Sign In"
                    variant="outlined"
                    color="primary"
                    shape="default"
                    hoverColor="primary"
                    hoverTextColor="backgroundLight"
                    hoverEffect="none"
                    fullWidth
                />
            </Link>
            {/* ✅ Sign Up — темна filled кнопка */}
            <Link href="/sign-up">
                <ButtonUI
                    text="Sign Up"
                    variant="solid"
                    shape="default"
                    color="text"
                    textColor="backgroundLight"
                    hoverColor="primary"
                    hoverEffect="none"
                    fullWidth
                />
            </Link>
        </div>
    );
};

export default AuthButtons;