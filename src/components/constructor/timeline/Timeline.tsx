"use client";
/*
 * Timeline.tsx — ФІКС
 * ❌ ПРИБРАНО: framer-motion stagger initial/whileInView/transition delay
 */
import React from "react";
import styles from "./Timeline.module.scss";

interface Step {
    title: string;
    description: string;
}

interface TimelineProps {
    title?: string;
    steps: Step[];
}

const Timeline: React.FC<TimelineProps> = ({ title, steps }) => {
    return (
        <section className={styles.timelineSection}>
            {title && <h2 className={styles.title}>{title}</h2>}

            <div className={styles.cardsGrid}>
                {steps.map((step, index) => (
                    /* ❌ ПРИБРАНО: motion.div з delay stagger */
                    <div key={index} className={styles.card}>
                        <div className={styles.number}>{index + 1}</div>
                        <h4 className={styles.cardTitle}>{step.title}</h4>
                        <p className={styles.cardDescription}>{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Timeline;