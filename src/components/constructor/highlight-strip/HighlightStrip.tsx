"use client";
import React from "react";
import styles from "./HighlightStrip.module.scss";

interface HighlightItem {
    icon: string;     // шлях до іконки або emoji
    text: string;     // текст
    color?: string;   // фон іконки
}

interface HighlightStripProps {
    items: HighlightItem[];
}

const HighlightStrip: React.FC<HighlightStripProps> = ({ items }) => {
    // дублюємо масив для безкінечного скролу
    const repeatedItems = [...items, ...items];

    return (
        <div className={styles.strip}>
            <div className={styles.track}>
                {repeatedItems.map((item, index) => (
                    <div key={index} className={styles.card}>
                        <div
                            className={styles.iconBox}
                            style={{
                                // use warm site palette by default (tertiary -> quaternary)
                                background: item.color || "linear-gradient(135deg, var(--tertiary-color), var(--quaternary-color))",
                            }}
                        >
                            {item.icon.startsWith("/") ? (
                                <img src={item.icon} alt={item.text} className={styles.iconImg} />
                            ) : (
                                <span className={styles.iconEmoji}>{item.icon}</span>
                            )}
                        </div>
                        <p className={styles.text}>{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HighlightStrip;
