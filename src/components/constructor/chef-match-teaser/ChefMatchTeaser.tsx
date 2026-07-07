"use client";
import React, { useState } from "react";
import styles from "./ChefMatchTeaser.module.scss";
import Link from "next/link";

interface ChefMatchTeaserProps {
    title?: string;
    description?: string;
    ctaLink?: string;
}

const QUESTIONS = [
    {
        text: "What's your primary goal?",
        answers: [
            { label: "Lose weight", icon: "⚖️" },
            { label: "Build muscle", icon: "💪" },
            { label: "Eat healthier", icon: "🥗" },
            { label: "Learn to cook", icon: "👨‍🍳" },
        ],
    },
    {
        text: "Any dietary requirements?",
        answers: [
            { label: "None — I eat everything", icon: "🍽️" },
            { label: "Vegetarian", icon: "🌿" },
            { label: "Vegan", icon: "🌱" },
            { label: "Gluten-Free", icon: "🌾" },
        ],
    },
    {
        text: "How much time can you cook per day?",
        answers: [
            { label: "Under 20 minutes", icon: "⚡" },
            { label: "20–45 minutes", icon: "🕐" },
            { label: "1 hour+", icon: "🍲" },
            { label: "I prefer meal prep", icon: "📦" },
        ],
    },
];

const ChefMatchTeaser: React.FC<ChefMatchTeaserProps> = ({
    title = "Find Your Perfect Chef in 3 Questions",
    description = "Answer a few quick questions and we'll match you with the ideal certified chef for your goals, preferences and schedule.",
    ctaLink = "/get-started",
}) => {
    const [step, setStep] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [answers, setAnswers] = useState<string[]>([]);
    const [done, setDone] = useState(false);

    const q = QUESTIONS[step];
    const total = QUESTIONS.length;

    const handleSelect = (idx: number) => {
        setSelected(idx);
        // slight delay so user sees the selection, then advance
        setTimeout(() => {
            const updated = [...answers, q.answers[idx].label];
            setAnswers(updated);
            setSelected(null);
            if (step + 1 >= total) {
                setDone(true);
            } else {
                setStep(step + 1);
            }
        }, 350);
    };

    const handleReset = () => {
        setStep(0);
        setSelected(null);
        setAnswers([]);
        setDone(false);
    };

    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                {/* Left: headline */}
                <div className={styles.left}>
                    <span className={styles.badge}>Chef Matching</span>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.description}>{description}</p>
                    <div className={styles.trust}>
                        <span className={styles.trustItem}>✦ 120+ Certified Chefs</span>
                        <span className={styles.trustItem}>✦ Matched in minutes</span>
                        <span className={styles.trustItem}>✦ No commitment needed</span>
                    </div>
                </div>

                {/* Right: mini quiz */}
                <div className={styles.right}>
                    {done ? (
                        <div className={styles.result}>
                            <div className={styles.resultIcon}>🎉</div>
                            <h3 className={styles.resultTitle}>Great news!</h3>
                            <p className={styles.resultText}>
                                Based on your answers, we have <strong>14 chefs</strong> who are a perfect match for you.
                                Sign up to see your personalised chef recommendations and get your first plan.
                            </p>
                            <Link href={ctaLink} className={styles.resultBtn}>
                                See My Chef Matches
                            </Link>
                            <button className={styles.resetBtn} onClick={handleReset}>
                                Start again
                            </button>
                        </div>
                    ) : (
                        <div className={styles.quiz}>
                            {/* Progress */}
                            <div className={styles.progress}>
                                <div className={styles.progressBar}>
                                    <div
                                        className={styles.progressFill}
                                        style={{ width: `${((step) / total) * 100}%` }}
                                    />
                                </div>
                                <span className={styles.progressLabel}>
                                    Question {step + 1} of {total}
                                </span>
                            </div>

                            <p className={styles.question}>{q.text}</p>

                            <div className={styles.answers}>
                                {q.answers.map((a, i) => (
                                    <button
                                        key={a.label}
                                        className={`${styles.answer} ${selected === i ? styles.answerSelected : ""}`}
                                        onClick={() => handleSelect(i)}
                                        disabled={selected !== null}
                                    >
                                        <span className={styles.answerIcon}>{a.icon}</span>
                                        <span className={styles.answerLabel}>{a.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ChefMatchTeaser;
