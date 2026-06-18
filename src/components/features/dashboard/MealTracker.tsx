"use client";

import React, { useState } from "react";
import styles from "./MealTracker.module.scss";

interface MacroEntry {
    day: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    water: number;
}

const DEMO_DATA: MacroEntry[] = [
    { day: "Mon", calories: 1820, protein: 115, carbs: 195, fat: 58, water: 2.1 },
    { day: "Tue", calories: 2050, protein: 130, carbs: 210, fat: 65, water: 2.4 },
    { day: "Wed", calories: 1760, protein: 108, carbs: 180, fat: 54, water: 1.8 },
    { day: "Thu", calories: 2100, protein: 140, carbs: 220, fat: 70, water: 2.6 },
    { day: "Fri", calories: 1950, protein: 125, carbs: 200, fat: 62, water: 2.3 },
    { day: "Sat", calories: 2200, protein: 135, carbs: 240, fat: 72, water: 2.0 },
    { day: "Sun", calories: 1700, protein: 100, carbs: 175, fat: 52, water: 2.2 },
];

const TARGET_CALORIES = 2000;
const TARGET_PROTEIN = 130;
const TARGET_CARBS = 210;
const TARGET_FAT = 65;
const TARGET_WATER = 2.5;

export default function MealTracker() {
    const [selected, setSelected] = useState<MacroEntry>(DEMO_DATA[4]);

    const pct = (val: number, target: number) => Math.min(Math.round((val / target) * 100), 100);

    return (
        <div className={styles.tracker}>
            <div className={styles.header}>
                <div>
                    <h2 className={styles.title}>🥗 Weekly Nutrition Tracker</h2>
                    <p className={styles.subtitle}>
                        Track your daily calorie and macro targets across the week. Based on your active meal plan.
                    </p>
                </div>
                <div className={styles.weekBadge}>Week 24 · 2026</div>
            </div>

            {/* Day selector */}
            <div className={styles.dayRow}>
                {DEMO_DATA.map((entry) => (
                    <button
                        key={entry.day}
                        className={`${styles.dayBtn} ${selected.day === entry.day ? styles.dayBtnActive : ""}`}
                        onClick={() => setSelected(entry)}
                    >
                        <span className={styles.dayLabel}>{entry.day}</span>
                        <span className={styles.dayCalories}>{entry.calories} kcal</span>
                        <div
                            className={styles.dayBar}
                            style={{
                                height: `${pct(entry.calories, TARGET_CALORIES)}%`,
                                background: entry.calories > TARGET_CALORIES
                                    ? "rgba(198, 40, 40, 0.6)"
                                    : "rgba(45, 90, 39, 0.7)",
                            }}
                        />
                    </button>
                ))}
            </div>

            {/* Stats for selected day */}
            <div className={styles.statsGrid}>
                <div className={styles.calorieCard}>
                    <div className={styles.calorieRing}>
                        <svg viewBox="0 0 100 100" className={styles.ringChart}>
                            <circle cx="50" cy="50" r="42" fill="none" stroke="#DFDAD0" strokeWidth="8" />
                            <circle
                                cx="50" cy="50" r="42" fill="none"
                                stroke={selected.calories > TARGET_CALORIES ? "#C62828" : "#2D5A27"}
                                strokeWidth="8"
                                strokeDasharray={`${pct(selected.calories, TARGET_CALORIES) * 2.64} 264`}
                                strokeLinecap="round"
                                transform="rotate(-90 50 50)"
                                style={{ transition: "stroke-dasharray 0.6s ease" }}
                            />
                        </svg>
                        <div className={styles.ringCenter}>
                            <span className={styles.ringValue}>{selected.calories}</span>
                            <span className={styles.ringLabel}>kcal</span>
                        </div>
                    </div>
                    <div className={styles.calorieInfo}>
                        <div className={styles.calorieStat}>
                            <span>Target</span>
                            <strong>{TARGET_CALORIES} kcal</strong>
                        </div>
                        <div className={styles.calorieStat}>
                            <span>Status</span>
                            <strong style={{ color: selected.calories > TARGET_CALORIES ? "#C62828" : "#2D5A27" }}>
                                {selected.calories > TARGET_CALORIES
                                    ? `+${selected.calories - TARGET_CALORIES} surplus`
                                    : `${TARGET_CALORIES - selected.calories} remaining`}
                            </strong>
                        </div>
                        <div className={styles.calorieStat}>
                            <span>Progress</span>
                            <strong>{pct(selected.calories, TARGET_CALORIES)}%</strong>
                        </div>
                    </div>
                </div>

                <div className={styles.macroCards}>
                    {[
                        { label: "Protein", value: selected.protein, target: TARGET_PROTEIN, unit: "g", color: "#B8860B" },
                        { label: "Carbs", value: selected.carbs, target: TARGET_CARBS, unit: "g", color: "#2D5A27" },
                        { label: "Fat", value: selected.fat, target: TARGET_FAT, unit: "g", color: "#D4A843" },
                        { label: "Water", value: selected.water, target: TARGET_WATER, unit: "L", color: "#5B8FA8" },
                    ].map((macro) => (
                        <div key={macro.label} className={styles.macroCard}>
                            <div className={styles.macroTop}>
                                <span className={styles.macroName}>{macro.label}</span>
                                <span className={styles.macroValue}>
                                    {macro.value}{macro.unit}
                                    <small> / {macro.target}{macro.unit}</small>
                                </span>
                            </div>
                            <div className={styles.macroTrack}>
                                <div
                                    className={styles.macroFill}
                                    style={{
                                        width: `${pct(macro.value, macro.target)}%`,
                                        background: macro.color,
                                        transition: "width 0.5s ease",
                                    }}
                                />
                            </div>
                            <div className={styles.macroPct}>{pct(macro.value, macro.target)}%</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Weekly summary */}
            <div className={styles.summarySection}>
                <h3 className={styles.summaryTitle}>📊 Weekly Averages</h3>
                <div className={styles.summaryGrid}>
                    {[
                        { label: "Avg. Calories", value: `${Math.round(DEMO_DATA.reduce((s, d) => s + d.calories, 0) / 7)} kcal` },
                        { label: "Avg. Protein", value: `${Math.round(DEMO_DATA.reduce((s, d) => s + d.protein, 0) / 7)}g` },
                        { label: "Avg. Carbs", value: `${Math.round(DEMO_DATA.reduce((s, d) => s + d.carbs, 0) / 7)}g` },
                        { label: "Avg. Fat", value: `${Math.round(DEMO_DATA.reduce((s, d) => s + d.fat, 0) / 7)}g` },
                        { label: "Avg. Water", value: `${(DEMO_DATA.reduce((s, d) => s + d.water, 0) / 7).toFixed(1)}L` },
                        { label: "Days on Target", value: `${DEMO_DATA.filter(d => Math.abs(d.calories - TARGET_CALORIES) < 200).length} / 7` },
                    ].map((stat) => (
                        <div key={stat.label} className={styles.summaryCard}>
                            <div className={styles.summaryValue}>{stat.value}</div>
                            <div className={styles.summaryLabel}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.trackerNote}>
                <span>💡</span>
                <p>
                    This tracker reflects your active meal plan targets. Request a <a href="/dashboard">new plan</a> from your chef to update your macro goals based on your current progress.
                </p>
            </div>
        </div>
    );
}
