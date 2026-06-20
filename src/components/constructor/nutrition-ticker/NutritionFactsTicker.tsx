"use client";

import React from "react";
import styles from "./NutritionFactsTicker.module.scss";

const FACTS = [
    { emoji: "🥦", text: "Broccoli has more protein per calorie than steak" },
    { emoji: "💧", text: "Most people are chronically underhydrated — aim for 2.5L daily" },
    { emoji: "🫐", text: "Blueberries improve memory and cognitive function" },
    { emoji: "🥑", text: "Avocado contains 20+ essential vitamins and minerals" },
    { emoji: "🌾", text: "Whole grains reduce heart disease risk by up to 22%" },
    { emoji: "🍳", text: "Eggs are the most bioavailable source of protein on earth" },
    { emoji: "🫚", text: "Extra virgin olive oil reduces inflammation better than ibuprofen" },
    { emoji: "🫁", text: "Deep breathing before meals boosts nutrient absorption" },
    { emoji: "🧄", text: "Garlic has been used as medicine for over 5,000 years" },
    { emoji: "🍋", text: "Vitamin C doubles your iron absorption from plant foods" },
    { emoji: "🌿", text: "Eating slowly reduces calorie intake by 10–15%" },
    { emoji: "🫘", text: "Legumes are the world's most affordable complete protein" },
];

export default function NutritionFactsTicker() {
    return (
        <section className={styles.section}>
            <div className={styles.label}>
                <span className={styles.labelDot} />
                Nutrition Facts
            </div>

            <div className={styles.tickerWrapper}>
                <div className={styles.track}>
                    {[...FACTS, ...FACTS].map((fact, i) => (
                        <div key={i} className={styles.fact}>
                            <span className={styles.factEmoji}>{fact.emoji}</span>
                            <span className={styles.factText}>{fact.text}</span>
                            <span className={styles.divider}>—</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
