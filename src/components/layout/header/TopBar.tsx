"use client";

import React from "react";
import styles from "./TopBar.module.scss";

const MESSAGES = [
    "🌿 Certified Personal Chefs & Smart AI Planning",
    "👩‍🍳 Over 100 certified chefs & nutritionists worldwide",
    "🔒 100% Secure Checkout — PCI DSS Compliant",
    "⚡ AI meal plans ready in minutes",
    "🥗 Allergy & dietary preferences always respected",
];

const TopBar: React.FC = () => {
    return (
        <div className={styles.topBar}>
            <div className={styles.ticker}>
                <div className={styles.track}>
                    {[...MESSAGES, ...MESSAGES].map((msg, i) => (
                        <span key={i} className={styles.item}>
                            {msg}
                            <span className={styles.sep}>·</span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopBar;
