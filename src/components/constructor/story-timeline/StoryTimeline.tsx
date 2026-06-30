"use client";
/*
 * StoryTimeline.tsx — РЕДИЗАЙН
 * ❌ ПРИБРАНО: zigzag left/right (i % 2 === 0 ? styles.left : styles.right)
 * ❌ ПРИБРАНО: .dot span
 * ✅ НОВИЙ: проста нумерована lista — номер зліва, контент справа
 */
import React from "react";
import styles from "./StoryTimeline.module.scss";

interface TimelineStep {
    year?: string;
    title?: string;
    description: string;
}

const StoryTimeline: React.FC<{ steps: TimelineStep[] }> = ({ steps }) => {
    return (
        <div className={styles.timeline}>
            {steps.map((s, i) => (
                <div key={i} className={styles.step}>
                    {/* ❌ ПРИБРАНО: dot, left/right класи */}
                    <div className={styles.num}>
                        {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className={styles.content}>
                        {s.title && (
                            <div className={styles.title}>
                                {s.year ? `${s.year} — ${s.title}` : s.title}
                            </div>
                        )}
                        <div className={styles.text}>{s.description}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StoryTimeline;