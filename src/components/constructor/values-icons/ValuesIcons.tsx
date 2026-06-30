"use client";
/*
 * ❌ ПРИБРАНО: framer-motion whileInView, cardVariants, stagger
 * ✅ getColumns: 4 → 2×2, не 3+1
 */
import React from "react";
import styles from "./ValuesIcons.module.scss";

interface ValueItem {
    icon: string;
    title: string;
    description?: string;
    text?: string;
}

interface Props {
    title?: string;
    description?: string;
    values: ValueItem[];
}

function getColumns(count: number): number {
    if (count === 1) return 1;
    if (count === 2) return 2;
    if (count === 4) return 2;
    if (count <= 3) return 3;
    if (count === 5) return 3;
    return 3;
}

const ValuesIcons: React.FC<Props> = ({ title, description, values }) => {
    const cols = getColumns(values.length);

    return (
        <section className={styles.section}>
            <div className={styles.head}>
                {title       && <h2 className={styles.sectionTitle}>{title}</h2>}
                {description && <p  className={styles.sectionDesc}>{description}</p>}
            </div>
            <div
                className={styles.grid}
                style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
            >
                {values.map((v, i) => (
                    <div key={i} className={styles.valueCard}>
                        <div className={styles.num}>0{i + 1}</div>
                        <div className={styles.icon}>{v.icon}</div>
                        <h3>{v.title}</h3>
                        <p>{v.description ?? v.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ValuesIcons;