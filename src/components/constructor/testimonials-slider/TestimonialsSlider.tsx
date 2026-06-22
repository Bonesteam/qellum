"use client";

import React from "react";
import styles from "./TestimonialsSlider.module.scss";
import { media as mediaMap } from "@/resources/media";

interface Testimonial {
    name: string;
    role?: string;
    image?: string;
    text: string;
    rating?: number;
}

interface Props {
    title?: string;
    description?: string;
    testimonials: Testimonial[];
}

function resolveMedia(key?: string): string | undefined {
    if (!key) return undefined;
    const val = (mediaMap as Record<string, any>)[key];
    if (!val) return undefined;
    if (typeof val === "string") return val;
    if (typeof val === "object" && val.src) return val.src;
    return undefined;
}

function initials(name: string): string {
    return name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase();
}

export default function TestimonialsSlider({ title, description, testimonials }: Props) {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <div>
                    <div className={styles.eyebrow}>Reviews</div>
                    {title && <h2 className={styles.title}>{title}</h2>}
                </div>
                {description && <p className={styles.desc}>{description}</p>}
            </div>

            {/* ✅ Горизонтальний CSS скрол — БЕЗ JS-слайдера і arrow buttons */}
            <div className={styles.track}>
                {testimonials.map((t, i) => {
                    const avatar = resolveMedia(t.image);
                    const rating = t.rating ?? 5;

                    return (
                        <div key={i} className={styles.card}>
                            {/* ✅ зірки — просто символи, БЕЗ react-icons */}
                            <div className={styles.stars} aria-label={`${rating} out of 5 stars`}>
                                {"★".repeat(rating)}{"☆".repeat(5 - rating)}
                            </div>

                            <p className={styles.quote}>{t.text}</p>

                            <div className={styles.author}>
                                {avatar ? (
                                    <img
                                        src={avatar}
                                        alt={t.name}
                                        className={styles.avatar}
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className={styles.avatarInitials} aria-hidden="true">
                                        {initials(t.name)}
                                    </div>
                                )}
                                <div className={styles.authorInfo}>
                                    <p className={styles.name}>{t.name}</p>
                                    {t.role && <p className={styles.role}>{t.role}</p>}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className={styles.scrollHint}>Scroll to see more</div>
        </section>
    );
}