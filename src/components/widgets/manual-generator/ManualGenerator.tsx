"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Input from "@mui/joy/Input";
import ButtonUI from "@/components/ui/button/ButtonUI";
import styles from "./ManualGenerator.module.scss";
import { useAlert } from "@/context/AlertContext";
import { useUser } from "@/context/UserContext";

const PACKAGE_TIERS = [
    { id: "basic", label: "Basic", base: 20, description: "Simple 1-week plan, minimal details" },
    { id: "standard", label: "Standard", base: 35, description: "1–2 weeks with recipes and shopping list" },
    { id: "premium", label: "Premium", base: 60, description: "3–4 weeks, recipes, shopping list, calorie breakdown" },
    { id: "pro", label: "Pro", base: 100, description: "Nutrition expert review + extended materials" },
];

const BASE_COST = 20; // fallback base cost

const LANGUAGES = [
    { value: "English", label: "English (default)", cost: 0 },
    { value: "Ukrainian", label: "Ukrainian", cost: 5 },
    { value: "German", label: "German", cost: 5 },
    { value: "French", label: "French", cost: 5 },
];

const EXTRA_CATEGORIES = {
    core: [
        { name: "weeklyMenu", label: "Weekly Menu (structured)", cost: 15 },
        { name: "recipes", label: "Detailed Recipes (step-by-step)", cost: 12 },
        { name: "shoppingList", label: "Shopping List (grouped)", cost: 10 },
        { name: "calorieBreakdown", label: "Calorie & Macro Breakdown", cost: 12 },
        { name: "mealPrepGuide", label: "Meal Prep Guide & Schedule", cost: 10 },
        { name: "snackPlans", label: "Healthy snacks & alternatives", cost: 6 },
    ],
    personalization: [
        { name: "customAllergies", label: "Allergy-safe customization", cost: 8 },
        { name: "portionSizing", label: "Custom portion sizing", cost: 6 },
        { name: "tasteProfile", label: "Taste preferences tuning", cost: 6 },
        { name: "familyFriendly", label: "Family-friendly variations", cost: 7 },
        { name: "kidFriendly", label: "Kid-friendly recipes", cost: 6 },
    ],
    services: [
        { name: "groceryListLocalized", label: "Localized grocery list (store mapping)", cost: 8 },
        { name: "leftoversPlan", label: "Leftovers & reuse plan", cost: 5 },
        { name: "shoppingBudgeting", label: "Budget optimization", cost: 7 },
        { name: "seasonalAdjustments", label: "Seasonal ingredient adjustments", cost: 6 },
    ],
    expert: [
        { name: "nutritionistReview", label: "Nutritionist review & notes", cost: 30 },
        { name: "1on1Consult", label: "1:1 consultation (30 min)", cost: 50 },
        { name: "followupWeek", label: "Follow-up week plan", cost: 25 },
    ],
};

const schema = Yup.object().shape({
    fullName: Yup.string().required("Required"),
    goal: Yup.string().required("Required"),
    dietaryPreference: Yup.string().required("Required"),
    days: Yup.number().min(1).required("Required"),
    planType: Yup.string().oneOf(["coach", "ai"]).required("Required"),
    language: Yup.string().oneOf(LANGUAGES.map((l) => l.value)),
});

export interface FormValues {
    fullName: string;
    goal: string; // dietary goal, e.g., weight loss, muscle gain, maintain
    dietaryPreference: string;
    packageId?: string;
    days: number;
    planType: "coach" | "ai";
    language: string;
    extras: string[];
}

const MealPlannerForm = () => {
    const { showAlert } = useAlert();
    const user = useUser();
    const [loading, setLoading] = useState(false);

    const initialValues: FormValues = {
        fullName: "",
        goal: "",
        dietaryPreference: "Omnivore",
        packageId: "standard",
        days: 7,
        planType: "coach",
        language: "English",
        extras: [],
    };

    // 🧩 Mock data for testing
    const mockData: FormValues = {
        fullName: "Olena Kovalenko",
        goal: "Lose 5 kg in a healthy way with focus on sustainable habits",
        dietaryPreference: "Balanced",
        packageId: "premium",
        days: 7,
        planType: "ai",
        language: "English",
        extras: ["weeklyMenu", "recipes", "shoppingList"],
    };

    return (
        <Formik<FormValues>
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={async (values) => {
                setLoading(true);
                try {
                    const allExtras = Object.values(EXTRA_CATEGORIES).flat();
                    const extraCost = values.extras.reduce((sum, name) => {
                        const opt = allExtras.find((o) => o.name === name);
                        return sum + (opt?.cost || 0);
                    }, 0);

                    const packageObj = PACKAGE_TIERS.find((p) => p.id === values.packageId);
                    const packageBase = packageObj ? packageObj.base : BASE_COST;
                    const durationCost = Math.floor(values.days / 7) * 10;
                    const languageCost = values.language && values.language !== "English" ? 5 : 0;
                    const totalTokens = packageBase + extraCost + durationCost + languageCost;

                    const payload = {
                        category: "nutrition",
                        planType: values.planType === "coach" ? "reviewed" : "instant",
                        language: values.language || "English",
                        extras: values.extras,
                        packageId: values.packageId,
                        totalTokens,
                        email: user?.email,
                        fields: {
                            fullName: values.fullName,
                            goal: values.goal,
                            dietaryPreference: values.dietaryPreference,
                            packageId: values.packageId,
                            days: values.days,
                            language: values.language || "English",
                        },
                    };

                    const res = await fetch("/api/universal/create-order", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify(payload),
                    });

                    const data = await res.json();
                    if (res.ok) {
                        showAlert(
                            "Success",
                            values.planType === "coach"
                                ? "Your meal plan will be reviewed by a nutrition expert and delivered in PDF within 24 hours."
                                : "Your instant meal plan is ready in PDF format.",
                            "success"
                        );
                    } else {
                        showAlert("Error", data.message || "Failed to create plan", "error");
                    }
                } catch {
                    showAlert("Error", "Network or server issue", "error");
                } finally {
                    setLoading(false);
                }
            }}
        >
            {({ values, setFieldValue, setValues }) => {
                const allExtras = Object.values(EXTRA_CATEGORIES).flat();
                const extraCost = values.extras.reduce((sum, name) => {
                    const opt = allExtras.find((o) => o.name === name);
                    return sum + (opt?.cost || 0);
                }, 0);

                const durationCost = Math.floor(values.days / 7) * 10;
                const languageCost = values.language && values.language !== "English" ? 5 : 0;
                const totalTokens = BASE_COST + extraCost + durationCost + languageCost;

                return (
                    <Form className={styles.form}>
                        <header className={styles.header}>
                            <h2>Meal Plan Configuration</h2>
                            <p>
                                Configure your dietary goals, preferences and custom modules for a complete meal
                                plan (recipes, shopping list, calorie breakdown). Use demo data to test the flow.
                            </p>
                        </header>

                        <div className={styles.actionsInline}>
                            <ButtonUI
                                type="button"
                                variant="outlined"
                                color="secondary"
                                onClick={() => setValues(mockData)}
                            >
                                🧪 Fill with Mock Data
                            </ButtonUI>
                        </div>

                        {/* === GRID SECTION === */}
                        <div className={styles.grid}>
                            <div className={styles.block}>
                                <h3>Personal Information</h3>
                                <div className={styles.inputGroup}>
                                    <label>Full Name</label>
                                    <Field name="fullName" as={Input} placeholder="Enter your name" />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Dietary Goal</label>
                                    <Field
                                        name="goal"
                                        as={Input}
                                        placeholder="e.g. Weight loss, muscle gain, maintain weight"
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Dietary Preference</label>
                                    <Select
                                        value={values.dietaryPreference}
                                        onChange={(_, v) => setFieldValue("dietaryPreference", v)}
                                    >
                                        <Option value="Omnivore">Omnivore</Option>
                                        <Option value="Vegetarian">Vegetarian</Option>
                                        <Option value="Vegan">Vegan</Option>
                                        <Option value="Pescatarian">Pescatarian</Option>
                                        <Option value="Balanced">Balanced / Flexible</Option>
                                    </Select>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Language</label>
                                    <Select
                                        value={values.language}
                                        onChange={(_, v) => setFieldValue("language", v || "English")}
                                    >
                                        {LANGUAGES.map((lang) => (
                                            <Option key={lang.value} value={lang.value}>
                                                {lang.label}
                                            </Option>
                                        ))}
                                    </Select>
                                    <span className={styles.note}>
                    English is free, other languages cost +5 tokens
                  </span>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Package</label>
                                    <Select
                                        value={values.packageId}
                                        onChange={(_, v) => setFieldValue("packageId", v)}
                                    >
                                        {PACKAGE_TIERS.map((p) => (
                                            <Option key={p.id} value={p.id}>
                                                {p.label} — {p.description} (+{p.base} tokens)
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>

                            <div className={styles.block}>
                                        <h3>Plan Details</h3>
                                <div className={styles.radioGroup}>
                                    <label
                                        className={`${styles.radioCard} ${
                                            values.planType === "coach" ? styles.active : ""
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="planType"
                                            value="coach"
                                            checked={values.planType === "coach"}
                                            onChange={() => setFieldValue("planType", "coach")}
                                        />
                                        <div>
                                            <strong>Сhef Plan</strong>
                                            <p>Personal chef will review and deliver personalized meal plan within 2–3 hours</p>
                                        </div>
                                    </label>

                                    <label
                                        className={`${styles.radioCard} ${
                                            values.planType === "ai" ? styles.active : ""
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="planType"
                                            value="ai"
                                            checked={values.planType === "ai"}
                                            onChange={() => setFieldValue("planType", "ai")}
                                        />
                                        <div>
                                            <strong>AI Instant Plan</strong>
                                            <p>Auto-generated instantly in PDF format</p>
                                        </div>
                                    </label>
                                </div>

                                    <div className={styles.inputGroup}>
                                    <label>Duration</label>
                                    <Select
                                        value={values.days}
                                        onChange={(_, v) => setFieldValue("days", v)}
                                    >
                                        <Option value={1}>1 day</Option>
                                        <Option value={7}>1 week</Option>
                                        <Option value={14}>2 weeks</Option>
                                        <Option value={21}>3 weeks</Option>
                                        <Option value={28}>4 weeks</Option>
                                    </Select>
                                    <span className={styles.note}>Each week adds +10 tokens</span>
                                </div>
                            </div>
                        </div>

                        {/* === EXTRAS === */}
                        <div className={styles.sectionGroup}>
                            {Object.entries(EXTRA_CATEGORIES).map(([category, options]) => (
                                <div key={category} className={styles.section}>
                                    <h3>
                                        {category.charAt(0).toUpperCase() + category.slice(1)} Modules
                                    </h3>
                                    <div className={styles.optionsGrid}>
                                        {options.map((opt) => (
                                            <label key={opt.name} className={styles.option}>
                                                <input
                                                    type="checkbox"
                                                    checked={values.extras.includes(opt.name)}
                                                    onChange={(e) => {
                                                        if (e.target.checked)
                                                            setFieldValue("extras", [...values.extras, opt.name]);
                                                        else
                                                            setFieldValue(
                                                                "extras",
                                                                values.extras.filter((x) => x !== opt.name)
                                                            );
                                                    }}
                                                />
                                                <span className={styles.optionLabel}>{opt.label}</span>
                                                <span className={styles.optionCost}>+{opt.cost}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.summary}>
                                <div className={styles.summaryContent}>
                                <div>
                                    <p>Package base: {PACKAGE_TIERS.find(p => p.id === values.packageId)?.base ?? BASE_COST} tokens</p>
                                    <p>Extras: +{extraCost}</p>
                                    <p>Duration: +{durationCost}</p>
                                    <p>Language: +{languageCost}</p>
                                </div>
                                <h4>
                                    Total: <span>{totalTokens}</span> tokens
                                </h4>
                            </div>
                        </div>

                        <div className={styles.actions}>
                            <ButtonUI
                                type="submit"
                                color="primary"
                                variant="solid"
                                textColor="backgroundLight"
                                hoverEffect="glow"
                                loading={loading}
                            >
                                Generate Meal Plan
                            </ButtonUI>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default MealPlannerForm;
