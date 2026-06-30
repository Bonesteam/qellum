"use client";
/*
 * ❌ ПРИБРАНО: motion.section initial={{opacity:0,y:40}} whileInView
 * ❌ ПРИБРАНО: motion.div x:-50/x:50 на left/right
 * ❌ ПРИБРАНО: viewport once:true amount:0.2/0.3
 * ✅ Контент рендериться одразу без анімацій
 */
import React from "react";
import styles from "./Section.module.scss";

interface SectionProps {
    title?: string;
    description?: string;
    left?: React.ReactNode;
    right?: React.ReactNode;
    reverse?: boolean;
    gap?: string;
    align?: "center" | "start" | "end";
    justify?: "center" | "space-between" | "start" | "end";
}

const Section: React.FC<SectionProps> = ({
    title,
    description,
    left,
    right,
    reverse = false,
    gap = "3rem",
    align = "center",
    justify = "center",
}) => {
    const isSingle = !left || !right;

    return (
        <section className={styles.wrapper}>
            {(title || description) && (
                <div className={styles.header}>
                    {title       && <h2 className={styles.title}>{title}</h2>}
                    {description && <p  className={styles.description}>{description}</p>}
                </div>
            )}

            <div
                className={`${styles.section} ${isSingle ? styles.single : ""}`}
                style={{
                    flexDirection: reverse ? "row-reverse" : "row",
                    gap,
                    alignItems: align,
                    justifyContent: isSingle ? "center" : justify,
                }}
            >
                {left  && <div className={styles.left}>{left}</div>}
                {right && <div className={styles.right}>{right}</div>}
            </div>
        </section>
    );
};

export default Section;