"use client";

import { FaUserCircle, FaUtensils, FaShoppingBasket } from "react-icons/fa";
import styles from "./ProfileHead.module.scss";
import { useUser } from "@/context/UserContext";
import { useAllOrders } from "@/context/AllOrdersContext";

const ProfileHead = () => {
    const user = useUser();
    const { aiOrders } = useAllOrders();
    const mealPlansCount = aiOrders?.length ?? 0;

    return (
        <header className={styles.hero}>
            <div className={styles.hero__avatar}>
                <FaUserCircle />
            </div>

            <div className={styles.hero__text}>
                <h1 className={styles.hero__title}>
                    Welcome back, <span>{user?.name || "Chef"}</span> 🍽️
                </h1>
                <p className={styles.hero__subtitle}>
                    Your culinary dashboard — manage tokens, view your meal plans, and
                    customize preferences for personalized recipes.
                </p>

                <div className={styles.hero__stats}>
                        <div>
                            <FaUtensils />
                            <span>{user?.tokens ?? 0} Tokens</span>
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
