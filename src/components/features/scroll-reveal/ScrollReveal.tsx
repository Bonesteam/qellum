"use client";
import { useEffect } from "react";

/**
 * ScrollReveal — глобальний ініціатор анімацій.
 * Знаходить всі елементи з .reveal або .reveal-stagger
 * і додає клас .revealed коли вони входять у viewport.
 * Монтується один раз у layout.tsx.
 */
export default function ScrollReveal() {
    useEffect(() => {
        const selectors = ".reveal, .reveal-stagger";
        const elements = document.querySelectorAll<HTMLElement>(selectors);

        if (!elements.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return null;
}
