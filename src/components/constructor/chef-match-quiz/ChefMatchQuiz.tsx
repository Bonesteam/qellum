"use client";

import React, { useState } from "react";
import styles from "./ChefMatchQuiz.module.scss";
import { useRouter } from "next/navigation";

interface Question {
    id: string;
    question: string;
    emoji: string;
    options: { label: string; value: string; emoji: string }[];
}

const QUESTIONS: Question[] = [
    {
        id: "goal",
        question: "What's your main goal?",
        emoji: "🎯",
        options: [
            { label: "Lose weight", value: "loss", emoji: "⚖️" },
            { label: "Build muscle", value: "muscle", emoji: "💪" },
            { label: "Eat healthier", value: "health", emoji: "🥗" },
            { label: "Just explore", value: "explore", emoji: "🌍" },
        ],
    },
    {
        id: "cooking",
        question: "How confident are you in the kitchen?",
        emoji: "🍳",
        options: [
            { label: "Beginner", value: "beginner", emoji: "🥚" },
            { label: "Home cook", value: "home", emoji: "🍲" },
            { label: "Confident cook", value: "confident", emoji: "👨‍🍳" },
            { label: "Almost a chef", value: "advanced", emoji: "⭐" },
        ],
    },
    {
        id: "time",
        question: "How much time do you have to cook per day?",
        emoji: "⏱️",
        options: [
            { label: "Under 20 min", value: "quick", emoji: "⚡" },
            { label: "30–45 min", value: "medium", emoji: "🕐" },
            { label: "1 hour+", value: "long", emoji: "👌" },
            { label: "Weekends only", value: "weekend", emoji: "📅" },
        ],
    },
    {
        id: "preference",
        question: "Any dietary preferences?",
        emoji: "🌿",
        options: [
            { label: "No restrictions", value: "none", emoji: "🍽️" },
            { label: "Vegetarian", value: "vegetarian", emoji: "🥦" },
            { label: "Vegan", value: "vegan", emoji: "🌱" },
            { label: "Gluten-free", value: "gluten-free", emoji: "🌾" },
        ],
    },
];

type Result = { plan: string; badge: string; desc: string; link: string; emoji: string };

function getResult(answers: Record<string, string>): Result {
    const { goal, time } = answers;
    if (goal === "muscle" || goal === "loss") {
        return {
            plan: "Chef Plan",
            badge: "Most Popular",
            emoji: "👨‍🍳",
            desc: "A personalised plan reviewed by a real certified chef — perfect for fitness goals.",
            link: "/checkout?plan=chef",
        };
    }
    if (time === "quick" || time === "weekend") {
        return {
            plan: "AI Starter Plan",
            badge: "Instant Results",
            emoji: "🤖",
            desc: "Get an AI-generated meal plan in minutes — great for busy people.",
            link: "/checkout?plan=ai",
        };
    }
    return {
        plan: "Full Culinary Pack",
        badge: "Complete Experience",
        emoji: "🌟",
        desc: "Chef + AI nutrition tracking — the ultimate personalised meal experience.",
        link: "/checkout?plan=full",
    };
}

export default function ChefMatchQuiz() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [result, setResult] = useState<Result | null>(null);
    const router = useRouter();

    const current = QUESTIONS[step];

    function handleSelect(value: string) {
        const updated = { ...answers, [current.id]: value };
        setAnswers(updated);

        if (step < QUESTIONS.length - 1) {
            setStep(step + 1);
        } else {
            setResult(getResult(updated));
        }
    }

    function handleReset() {
        setStep(0);
        setAnswers({});
        setResult(null);
    }

    const progress = result ? 100 : Math.round((step / QUESTIONS.length) * 100);

    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                {/* Header */}
                <div className={styles.header}>
                    <span className={styles.pill}>✨ Free 2-min Quiz</span>
                    <h2 className={styles.title}>
                        Which Plan Is <span className={styles.highlight}>Right for You?</span>
                    </h2>
                    <p className={styles.subtitle}>
                        Answer 4 quick questions and we'll recommend the perfect Qellum plan.
                    </p>
                </div>

                {/* Quiz card */}
                <div className={styles.card}>
                    {/* Progress bar */}
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                    </div>

                    {!result ? (
                        <div className={styles.questionWrap} key={step}>
                            <div className={styles.stepCount}>
                                Question {step + 1} of {QUESTIONS.length}
                            </div>
                            <div className={styles.questionEmoji}>{current.emoji}</div>
                            <h3 className={styles.question}>{current.question}</h3>

                            <div className={styles.options}>
                                {current.options.map((opt) => (
                                    <button
                                        key={opt.value}
                                        className={styles.option}
                                        onClick={() => handleSelect(opt.value)}
                                    >
                                        <span className={styles.optionEmoji}>{opt.emoji}</span>
                                        <span className={styles.optionLabel}>{opt.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className={styles.result}>
                            <div className={styles.resultEmoji}>{result.emoji}</div>
                            <div className={styles.resultBadge}>{result.badge}</div>
                            <h3 className={styles.resultTitle}>We recommend:<br /><span>{result.plan}</span></h3>
                            <p className={styles.resultDesc}>{result.desc}</p>
                            <div className={styles.resultActions}>
                                <button
                                    className={styles.ctaBtn}
                                    onClick={() => router.push(result.link)}
                                >
                                    Get {result.plan} →
                                </button>
                                <button className={styles.retryBtn} onClick={handleReset}>
                                    Retake Quiz
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
