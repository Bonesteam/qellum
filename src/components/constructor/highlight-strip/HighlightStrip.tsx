"use client";
import React from "react";
import styles from "./HighlightStrip.module.scss";

interface HighlightItem {
    icon: string;   // keyword: "chef" | "plans" | "rating" | "allergy" | "speed" | "countries" | or any emoji/text
    text: string;
    color?: string;
}

interface HighlightStripProps {
    items?: HighlightItem[];
    messages?: string[];
}

// Map icon keyword → stat number or SVG symbol
const STAT_MAP: Record<string, { stat: string; symbol?: string }> = {
    chef:      { stat: "120+",  symbol: "✦" },
    plans:     { stat: "8.4k",  symbol: "✦" },
    rating:    { stat: "4.9",   symbol: "★" },
    allergy:   { stat: "100%",  symbol: "✦" },
    speed:     { stat: "2–3h",  symbol: "✦" },
    countries: { stat: "30+",   symbol: "✦" },
};

const HighlightStrip: React.FC<HighlightStripProps> = ({ items = [], messages }) => {
    const parsedItems: HighlightItem[] = [...items];

    if (messages) {
        for (const msg of messages) {
            const match = msg.match(/^([^\w\s\d,.:;'"?!()\-]{1,3})\s*(.*)$/u);
            parsedItems.push(match
                ? { icon: match[1].trim(), text: match[2].trim() }
                : { icon: "✦", text: msg }
            );
        }
    }

    // duplicate for seamless infinite scroll
    const repeated = [...parsedItems, ...parsedItems];

    return (
        <div className={styles.strip}>
            <div className={styles.track}>
                {repeated.map((item, idx) => {
                    const mapped = STAT_MAP[item.icon];
                    return (
                        <div key={idx} className={styles.card}>
                            {mapped ? (
                                <>
                                    <span className={styles.stat}>{mapped.stat}</span>
                                    <span className={styles.divider}>{mapped.symbol ?? "✦"}</span>
                                    <span className={styles.text}>{item.text}</span>
                                </>
                            ) : (
                                <>
                                    <span className={styles.iconEmoji}>{item.icon}</span>
                                    <span className={styles.text}>{item.text}</span>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HighlightStrip;
