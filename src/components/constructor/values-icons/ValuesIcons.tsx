"use client";
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

// ❌ Прибрано: framer-motion stagger, whileInView, cardVariants
const ValuesIcons: React.FC<Props> = ({ title, description, values }) => {
    return (
        <section className={styles.section}>
            <div className={styles.head}>
                {title && <h2 className={styles.sectionTitle}>{title}</h2>}
                {description && <p className={styles.sectionDesc}>{description}</p>}
            </div>
            <div className={styles.grid}>
                {values.map((v, i) => (
                    <div key={i} className={styles.valueCard}>
                        {/* ❌ БЕЗ gradient кола — просто emoji + номер */}
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