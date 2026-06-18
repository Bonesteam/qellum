"use client";

import React, { useState } from "react";
import styles from "./CalorieCalculator.module.scss";

type Gender = "male" | "female";
type Goal = "maintain" | "lose" | "gain";
type Activity = "sedentary" | "light" | "moderate" | "active";

export default function CalorieCalculator() {
    const [gender, setGender] = useState<Gender>("female");
    const [weight, setWeight] = useState<number>(65);
    const [height, setHeight] = useState<number>(170);
    const [age, setAge] = useState<number>(28);
    const [activity, setActivity] = useState<Activity>("moderate");
    const [goal, setGoal] = useState<Goal>("lose");

    const [results, setResults] = useState<{
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
        recommendation: {
            title: string;
            price: string;
            link: string;
            desc: string;
        };
    } | null>(null);

    const calculate = (e: React.FormEvent) => {
        e.preventDefault();

        // Mifflin-St Jeor Equation
        let bmr = 0;
        if (gender === "male") {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        // Activity multipliers
        const multipliers: Record<Activity, number> = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725,
        };

        let tdee = Math.round(bmr * multipliers[activity]);

        // Adjust for goals
        let targetCalories = tdee;
        let recommendedPlan = {
            title: "AI Starter Plan",
            price: "£10",
            link: "/checkout?plan=ai",
            desc: "Ideal for steady maintenance and automated meal tracking.",
        };

        if (goal === "lose") {
            targetCalories = Math.round(tdee - 450);
            recommendedPlan = {
                title: "Premium Chef Plan",
                price: "€59",
                link: "/checkout?plan=chef",
                desc: "1-on-1 Chef feedback recommended for safe, customized weight loss.",
            };
        } else if (goal === "gain") {
            targetCalories = Math.round(tdee + 350);
            recommendedPlan = {
                title: "Full Culinary Pack",
                price: "€99",
                link: "/checkout?plan=full",
                desc: "High protein recipes and dynamic portion adjustments by professional chefs.",
            };
        }

        // Macronutrient split
        // Protein: 2g per kg of weight (lose/gain) or 1.6g per kg (maintain)
        const proteinMultiplier = goal === "maintain" ? 1.6 : 2.0;
        const proteinGrams = Math.round(weight * proteinMultiplier);
        const proteinCalories = proteinGrams * 4;

        // Fat: 25% of target calories
        const fatCalories = targetCalories * 0.25;
        const fatGrams = Math.round(fatCalories / 9);

        // Carbs: Rest of calories
        const carbCalories = targetCalories - (proteinCalories + fatCalories);
        const carbGrams = Math.round(carbCalories / 4);

        setResults({
            calories: targetCalories,
            protein: proteinGrams,
            carbs: carbGrams,
            fat: fatGrams,
            recommendation: recommendedPlan,
        });
    };

    return (
        <section className={styles.calculatorSection} id="calorie-calculator">
            <div className={styles.container}>
                <div className={styles.info}>
                    <span className={styles.badge}>🌿 Smart Nutrition Assistant</span>
                    <h2>Tailored Meals for Your Body & Goals</h2>
                    <p>
                        Enter your metrics to calculate your daily energy expenditure and macronutrient requirements. 
                        Our AI and Chef networks use these custom levels to hand-craft portions and recipes.
                    </p>
                    <div className={styles.chefTip}>
                        <strong>👨‍🍳 Chef Note:</strong> Portion size is 80% of dietary success. By calculating your numbers, we ensure every recipe fits your profile perfectly.
                    </div>
                </div>

                <div className={styles.calculatorCard}>
                    {!results ? (
                        <form onSubmit={calculate} className={styles.form}>
                            <h3>Calculate Your Custom Needs</h3>

                            <div className={styles.genderSelect}>
                                <button
                                    type="button"
                                    className={gender === "female" ? styles.active : ""}
                                    onClick={() => setGender("female")}
                                >
                                    Female
                                </button>
                                <button
                                    type="button"
                                    className={gender === "male" ? styles.active : ""}
                                    onClick={() => setGender("male")}
                                >
                                    Male
                                </button>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.group}>
                                    <label>Weight (kg)</label>
                                    <input
                                        type="number"
                                        value={weight}
                                        onChange={(e) => setWeight(Number(e.target.value))}
                                        min={30}
                                        max={200}
                                        required
                                    />
                                </div>
                                <div className={styles.group}>
                                    <label>Height (cm)</label>
                                    <input
                                        type="number"
                                        value={height}
                                        onChange={(e) => setHeight(Number(e.target.value))}
                                        min={100}
                                        max={250}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.group}>
                                    <label>Age (years)</label>
                                    <input
                                        type="number"
                                        value={age}
                                        onChange={(e) => setAge(Number(e.target.value))}
                                        min={15}
                                        max={100}
                                        required
                                    />
                                </div>
                                <div className={styles.group}>
                                    <label>Dietary Goal</label>
                                    <select value={goal} onChange={(e) => setGoal(e.target.value as Goal)}>
                                        <option value="lose">Weight Loss</option>
                                        <option value="maintain">Healthy Maintenance</option>
                                        <option value="gain">Muscle Growth</option>
                                    </select>
                                </div>
                            </div>

                            <div className={styles.group}>
                                <label>Activity Level</label>
                                <select value={activity} onChange={(e) => setActivity(e.target.value as Activity)}>
                                    <option value="sedentary">Sedentary (desk job, low exercise)</option>
                                    <option value="light">Lightly Active (light exercise 1-3 days/week)</option>
                                    <option value="moderate">Moderately Active (exercise 3-5 days/week)</option>
                                    <option value="active">Very Active (heavy daily exercise/sports)</option>
                                </select>
                            </div>

                            <button type="submit" className={styles.submitButton}>
                                Calculate Target Macros & Plans
                            </button>
                        </form>
                    ) : (
                        <div className={styles.results}>
                            <h3>Your Custom Nutrition Strategy</h3>

                            <div className={styles.caloriesDisplay}>
                                <div className={styles.caloriesNumber}>{results.calories}</div>
                                <div className={styles.caloriesLabel}>Daily Calorie Target (kcal)</div>
                            </div>

                            <div className={styles.macros}>
                                <div className={styles.macroCol}>
                                    <div className={styles.macroValue}>{results.protein}g</div>
                                    <div className={styles.macroLabel}>Protein</div>
                                    <div className={styles.macroBar} style={{ height: "6px", width: "100%", background: "#b8860b" }} />
                                </div>
                                <div className={styles.macroCol}>
                                    <div className={styles.macroValue}>{results.carbs}g</div>
                                    <div className={styles.macroLabel}>Carbs</div>
                                    <div className={styles.macroBar} style={{ height: "6px", width: "100%", background: "#2d5a27" }} />
                                </div>
                                <div className={styles.macroCol}>
                                    <div className={styles.macroValue}>{results.fat}g</div>
                                    <div className={styles.macroLabel}>Fats</div>
                                    <div className={styles.macroBar} style={{ height: "6px", width: "100%", background: "#d4b254" }} />
                                </div>
                            </div>

                            <div className={styles.recommendedBox}>
                                <span className={styles.recommendationTag}>⚡ Recommended Nutrition Plan</span>
                                <h4>{results.recommendation.title} — {results.recommendation.price}</h4>
                                <p>{results.recommendation.desc}</p>
                                <a href={results.recommendation.link} className={styles.orderBtn}>
                                    Choose Plan & Fill Out Preferences
                                </a>
                            </div>

                            <button
                                type="button"
                                className={styles.resetBtn}
                                onClick={() => setResults(null)}
                            >
                                ← Recalculate
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
