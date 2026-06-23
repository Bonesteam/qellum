"use client";
/*
 * MissionBanner.tsx — НОВИЙ ДИЗАЙН
 * ❌ Прибрано: просто <Section>+<Text> — нічим не відрізнявся від решти сторінки
 * ✅ Новий: повноширинний кольоровий банер з великим текстом і CTA
 */
import React from "react";
import Link from "next/link";
import styles from "./MissionBanner.module.scss";

interface MissionBannerProps {
    title: string;
    description: string;
    image?: string;
    ctaText?: string;
    ctaHref?: string;
}

const MissionBanner: React.FC<MissionBannerProps> = ({
    title,
    description,
    ctaText = "Get Your Meal Plan",
    ctaHref = "/get-started",
}) => {
    return (
        <section className={styles.banner}>
            <div className={styles.inner}>
                <div className={styles.content}>
                    <p className={styles.eyebrow}>Start Today</p>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.desc}>{description}</p>
                    <Link href={ctaHref} className={styles.cta}>
                        {ctaText}
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Link>
                </div>
                <div className={styles.decoration} aria-hidden="true">
                    <span>🍽️</span>
                    <span>👨‍🍳</span>
                    <span>🌿</span>
                </div>
            </div>
        </section>
    );
};

export default MissionBanner;