"use client";

import React from "react";
import styles from "./Hero.module.scss";
import Image from "next/image";
import { media } from "@/resources/media";
import type { StaticImageData } from "next/image";
import Link from "next/link";

interface HeroSectionProps {
    title: string;
    highlight?: string;
    description: string;
    primaryCta?: { text: string; link: string };
    secondaryCta?: { text: string; link: string };
    image?: string;
    align?: "left" | "right";
    trustBadge?: string;
    stats?: { value: string; label: string }[];
}

const HeroSection: React.FC<HeroSectionProps> = ({
    title,
    highlight,
    description,
    primaryCta,
    secondaryCta,
    image,
    align = "right",
    trustBadge = "Personalized by real chefs",
    stats = [
        { value: "100+", label: "Certified Chefs" },
        { value: "12k+", label: "Plans Created" },
        { value: "14",   label: "Allergen Filters" },
    ],
}) => {
    const bgImage = image
        ? (media as Record<string, string | StaticImageData>)[image]
        : undefined;

    const imageSrc =
        typeof bgImage === "string"
            ? bgImage
            : (bgImage as StaticImageData)?.src || "";

    const isReverse = align === "left";

    return (
        <section className={`${styles.hero} ${isReverse ? styles.heroReverse : ""}`}>

            {/* ── ЛІВА: контент ── */}
            <div className={styles.content}>

                {trustBadge && (
                    <span className={styles.trustBadge}>{trustBadge}</span>
                )}

                <h1 className={styles.title}>
                    {title}
                    {highlight && (
                        <>
                            {" "}
                            <span className={styles.highlight}>{highlight}</span>
                        </>
                    )}
                </h1>

                <p className={styles.desc}>{description}</p>

                <div className={styles.actions}>
                    {primaryCta && (
                        <Link href={primaryCta.link} className={styles.btnPrimary}>
                            {primaryCta.text}
                            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>
                    )}
                    {secondaryCta && (
                        <Link href={secondaryCta.link} className={styles.btnSecondary}>
                            {secondaryCta.text}
                        </Link>
                    )}
                </div>

                {stats && stats.length > 0 && (
                    <div className={styles.stats}>
                        {stats.map((s, i) => (
                            <div key={i} className={styles.stat}>
                                <span className={styles.statValue}>{s.value}</span>
                                <span className={styles.statLabel}>{s.label}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ── ПРАВА: фото панель ── */}
            <div className={styles.visual}>
                {imageSrc && (
                    <Image
                        src={imageSrc}
                        alt="Qellum chef meal"
                        fill
                        className={styles.image}
                        priority
                    />
                )}
            </div>

        </section>
    );
};

export default HeroSection;