"use client";
/*
 * ProfileHead.tsx — РЕДИЗАЙН
 * ❌ ПРИБРАНО: FaUserCircle (generic іконка 5rem)
 * ✅ Ініціали користувача в колі — персональніше
 */
import { FaUtensils, FaShoppingBasket } from "react-icons/fa";
import styles from "./ProfileHead.module.scss";
import { useUser } from "@/context/UserContext";
import { useAllOrders } from "@/context/AllOrdersContext";
import { useWalletBalance } from "@/hooks/useWalletBalance";

function getInitials(user: { firstName?: string; lastName?: string; name?: string } | null): string {
    if (!user) return "?";
    if (user.firstName && user.lastName) {
        return (user.firstName[0] + user.lastName[0]).toUpperCase();
    }
    if (user.firstName) return user.firstName[0].toUpperCase();
    if (user.name) return user.name[0].toUpperCase();
    return "?";
}

const ProfileHead = () => {
    const user = useUser();
    const { formatted } = useWalletBalance();
    const { aiOrders } = useAllOrders();
    const mealPlansCount = aiOrders?.length ?? 0;

    return (
        <header className={styles.hero}>
            {/* ✅ Ініціали замість generic іконки */}
            <div className={styles.hero__avatar} aria-hidden="true">
                {getInitials(user)}
            </div>

            <div className={styles.hero__text}>
                <h1 className={styles.hero__title}>
                    Welcome back, <span>{user?.firstName || user?.name || "Chef"}</span>
                </h1>
                <p className={styles.hero__subtitle}>
                    Your culinary dashboard — manage your wallet, view your meal plans, and
                    customise preferences for personalised recipes.
                </p>

                <div className={styles.hero__stats}>
                    <div>
                        <FaUtensils />
                        <span>{formatted}</span>
                    </div>
                    <div>
                        <FaShoppingBasket />
                        <span>{mealPlansCount} Active Plans</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ProfileHead;