"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollReveal — глобальний ініціатор анімацій.
 * Знаходить всі елементи з .reveal або .reveal-stagger
 * і додає клас .revealed коли вони входять у viewport.
 * Монтується один раз у layout.tsx.
 */
export default function ScrollReveal() {
    const pathname = usePathname();

    useEffect(() => {
        const selectors = ".reveal, .reveal-stagger";
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

        const revealElements = () => {
            document.querySelectorAll<HTMLElement>(selectors).forEach((el) => {
                if (!el.classList.contains("revealed")) {
                    observer.observe(el);
                }
            });
        };

        const frame = window.requestAnimationFrame(revealElements);
        const fallbackFrame = window.requestAnimationFrame(() => {
            document.querySelectorAll<HTMLElement>(selectors).forEach((el) => {
                el.classList.add("revealed");
            });
        });

        const mutationObserver = new MutationObserver(revealElements);
        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => {
            window.cancelAnimationFrame(frame);
            window.cancelAnimationFrame(fallbackFrame);
            observer.disconnect();
            mutationObserver.disconnect();
        };
    }, [pathname]);

    return null;
}
