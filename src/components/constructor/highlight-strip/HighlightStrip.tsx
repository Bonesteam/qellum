"use client";
import React from "react";
import styles from "./HighlightStrip.module.scss";

interface HighlightItem {
    icon: string;     // шлях до іконки або emoji
    text: string;     // текст
    color?: string;   // фон іконки
}

interface HighlightStripProps {
    items?: HighlightItem[];
    messages?: string[];
}

const HighlightStrip: React.FC<HighlightStripProps> = ({ items = [], messages }) => {
    const parsedItems: HighlightItem[] = [...items];

    if (messages) {
        for (const msg of messages) {
            const match = msg.match(/^([^\w\s\d,.:;'"?!()\-]{1,3})\s*(.*)$/u);
            if (match) {
                parsedItems.push({
                    icon: match[1].trim(),
                    text: match[2].trim(),
                });
            } else {
                parsedItems.push({
                    icon: "✨",
                    text: msg,
                });
            }
        }
    }

    // дублюємо масив для безкінечного скролу
    const repeatedItems = [...parsedItems, ...parsedItems];

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
