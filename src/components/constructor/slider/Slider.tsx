"use client";
/*
 * Slider.tsx — ФІКС
 * ❌ ПРИБРАНО: ButtonUI стрілки (height:150px масивні зелені блоки)
 * ❌ ПРИБРАНО: gap:15px на .track (ламало translateX розрахунок → фото вилазили за межі)
 * ❌ ПРИБРАНО: border-radius:12px на фото
 * ✅ Прості SVG стрілки поверх фото (position:absolute)
 * ✅ Dot indicators внизу
 * ✅ Правильний overflow:hidden — тільки на .slider
 */
"use client";
import React, { useState } from "react";
import styles from "./Slider.module.scss";
import { StaticImageData } from "next/image";
import Image from "next/image";

interface SliderProps {
    images: (StaticImageData | string)[];
    height?: string | number;
}

const Slider: React.FC<SliderProps> = ({ images, height = "460px" }) => {
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((current - 1 + images.length) % images.length);
    const next = () => setCurrent((current + 1) % images.length);

    return (
        <div className={styles.slider} style={{ height }}>

            {/* ── Track ── */}
            <div
                className={styles.track}
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {images.map((img, idx) => (
                    <div className={styles.slide} key={idx}>
                        <Image
                            src={img as StaticImageData}
                            alt={`Slide ${idx + 1}`}
                            fill
                            className={styles.image}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority={idx === 0}
                        />
                    </div>
                ))}
            </div>

            {/* ── Стрілки — мінімальні SVG кнопки ── */}
            {images.length > 1 && (
                <>
                    <button
                        className={`${styles.arrow} ${styles.arrowLeft}`}
                        onClick={prev}
                        aria-label="Previous slide"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                    <button
                        className={`${styles.arrow} ${styles.arrowRight}`}
                        onClick={next}
                        aria-label="Next slide"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </>
            )}

            {/* ── Dot indicators ── */}
            {images.length > 1 && (
                <div className={styles.dots}>
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            className={`${styles.dot} ${idx === current ? styles.dotActive : ""}`}
                            onClick={() => setCurrent(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Slider;