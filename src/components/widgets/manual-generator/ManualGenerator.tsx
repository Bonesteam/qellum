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
import { useAllOrders } from "@/context/AllOrdersContext";

const PACKAGE_TIERS = [
    { id: "basic",    label: "Basic",    base: 20,  description: "Simple 1-week plan, minimal details" },
    { id: "standard", label: "Standard", base: 35,  description: "1–2 weeks with recipes and shopping list" },
    { id: "premium",  label: "Premium",  base: 60,  description: "3–4 weeks, recipes, shopping list, calorie breakdown" },
    { id: "pro",      label: "Pro",      base: 100, description: "Nutrition expert review + extended materials" },
];

const LANGUAGES = [
    { value: "English",   label: "English (default)",  cost: 0 },
    { value: "Swedish",   label: "Swedish",             cost: 5 },
    { value: "German",    label: "German",              cost: 5 },
    { value: "French",    label: "French",              cost: 5 },
];

const EXTRA_CATEGORIES = {
    core: [
        { name: "weeklyMenu",       label: "Weekly Menu (structured)",        cost: 15 },
        { name: "recipes",          label: "Detailed Recipes (step-by-step)", cost: 12 },
        { name: "shoppingList",     label: "Shopping List (grouped)",         cost: 10 },
        { name: "calorieBreakdown", label: "Calorie & Macro Breakdown",       cost: 12 },
        { name: "mealPrepGuide",    label: "Meal Prep Guide & Schedule",      cost: 10 },
        { name: "snackPlans",       label: "Healthy snacks & alternatives",   cost: 6  },
    ],
    personalization: [
        { name: "customAllergies", label: "Allergy-safe customization",  cost: 8 },
        { name: "portionSizing",   label: "Custom portion sizing",        cost: 6 },
        { name: "tasteProfile",    label: "Taste preferences tuning",     cost: 6 },
        { name: "familyFriendly",  label: "Family-friendly variations",   cost: 7 },
        { name: "kidFriendly",     label: "Kid-friendly recipes",         cost: 6 },
    ],
    services: [
        { name: "groceryListLocalized", label: "Localized grocery list (store mapping)", cost: 8 },
        { name: "leftoversPlan",        label: "Leftovers & reuse plan",                cost: 5 },
        { name: "shoppingBudgeting",    label: "Budget optimization",                   cost: 7 },
        { name: "seasonalAdjustments",  label: "Seasonal ingredient adjustments",       cost: 6 },
        { name: "groceryCostEstimates", label: "Grocery cost estimates per week",       cost: 6 },
        { name: "variationSwaps",       label: "Recipe variations & swaps",             cost: 5 },
        { name: "mealTiming",           label: "Meal timing & schedule",                cost: 4 },
        { name: "hydrationSchedule",    label: "Hydration schedule & tips",             cost: 3 },
        { name: "ingredientPrepTips",   label: "Ingredient prep & storage tips",        cost: 4 },
    ],
    expert: [
        { name: "nutritionistReview", label: "Nutritionist review & notes",  cost: 30 },
        { name: "1on1Consult",        label: "1:1 consultation (30 min)",     cost: 50 },
        { name: "followupWeek",       label: "Follow-up week plan",           cost: 25 },
        { name: "specialOccasionMenu",label: "Special occasion menu (1-day)", cost: 12 },
    ],
};

const schema = Yup.object().shape({
    fullName:          Yup.string().required("Required"),
    goal:              Yup.string().required("Required"),
    dietaryPreference: Yup.string().required("Required"),
    days:              Yup.number().min(1).required("Required"),
    planType:          Yup.string().oneOf(["coach", "ai"]).required("Required"),
    language:          Yup.string().oneOf(LANGUAGES.map((l) => l.value)),
});

export interface FormValues {
    fullName: string;
    goal: string;
    dietaryPreference: string;
    packageId?: string;
    days: number;
    planType: "coach" | "ai";
    language: string;
    extras: string[];
}

/*
 * ✅ ВИПРАВЛЕНА функція розрахунку токенів
 * Єдине місце розрахунку — використовується і в UI і в onSubmit
 * ❌ БУЛО: BASE_COST (hardcoded 20) в UI і packageObj.base в onSubmit → різні числа
 * ❌ БУЛО: durationCost = Math.floor(days/7)*10 — рахував +10 навіть за перший тиждень
 * ✅ ТЕПЕР: (weeks - 1)*10 — перший тиждень вже включений у пакет
 */
function calcTokens(values: FormValues): {
    packageBase: number;
    extraCost: number;
    durationCost: number;
    languageCost: number;
    total: number;
} {
    const allExtras = Object.values(EXTRA_CATEGORIES).flat();

    const packageObj  = PACKAGE_TIERS.find((p) => p.id === values.packageId);
    const packageBase = packageObj?.base ?? 20;

    const extraCost = values.extras.reduce((sum, name) => {
        const opt = allExtras.find((o) => o.name === name);
        return sum + (opt?.cost ?? 0);
    }, 0);

    // Перший тиждень входить у пакет → додатково платимо тільки за 2+
    const weeks       = Math.max(1, Math.floor(values.days / 7));
    const durationCost = (weeks - 1) * 10;

    const languageCost = values.language && values.language !== "English" ? 5 : 0;

    const total = packageBase + extraCost + durationCost + languageCost;

    return { packageBase, extraCost, durationCost, languageCost, total };
}

const MealPlannerForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
    const { showAlert }    = useAlert();
    const user             = useUser();
    const { refreshOrders } = useAllOrders();
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
                    // ✅ Той самий calcTokens що і в UI — числа завжди збігаються
                    const { total: totalTokens, ...breakdown } = calcTokens(values);

                    const payload = {
                        category:    "nutrition",
                        planType:    values.planType === "coach" ? "reviewed" : "instant",
                        language:    values.language || "English",
                        extras:      values.extras,
                        packageId:   values.packageId,
                        totalTokens,
                        breakdown,
                        email:       user?.email,
                        fields: {
                            fullName:          values.fullName,
                            goal:              values.goal,
                            dietaryPreference: values.dietaryPreference,
                            packageId:         values.packageId,
                            days:              values.days,
                            language:          values.language || "English",
                        },
                    };

                    const res = await fetch("/api/universal/create-order", {
                        method:      "POST",
                        headers:     { "Content-Type": "application/json" },
                        credentials: "include",
                        body:        JSON.stringify(payload),
                    });

                    const data = await res.json();
                    if (res.ok) {
                        showAlert(
                            "Success",
                            values.planType === "coach"
                                ? "Your meal plan will be reviewed by a nutrition expert and delivered in PDF within 2–3 hours."
                                : "Your instant meal plan is ready in PDF format.",
                            "success"
                        );
                        await refreshOrders();
                        if (onSuccess) onSuccess();
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
                // ✅ Той самий calcTokens — UI і submit завжди показують однакове число
                const { packageBase, extraCost, durationCost, languageCost, total } = calcTokens(values);

                return (
                    <Form className={styles.form}>
                        <header className={styles.header}>
                            <h2>Meal Plan Configuration</h2>
                            <p>
                                Configure your dietary goals, preferences and custom modules.
                                Use demo data to test the flow.
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
                                    <span className={styles.note}>English is free · other languages +5 tokens</span>
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
                                    <label className={`${styles.radioCard} ${values.planType === "coach" ? styles.active : ""}`}>
                                        <input
                                            type="radio"
                                            name="planType"
                                            value="coach"
                                            checked={values.planType === "coach"}
                                            onChange={() => setFieldValue("planType", "coach")}
                                        />
                                        <div>
                                            <strong>Chef Plan</strong>
                                            <p>Personal chef will review and deliver personalised meal plan within 2–3 hours</p>
                                        </div>
                                    </label>

                                    <label className={`${styles.radioCard} ${values.planType === "ai" ? styles.active : ""}`}>
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
                                        <Option value={7}>1 week (included in package)</Option>
                                        <Option value={14}>2 weeks (+10 tokens)</Option>
                                        <Option value={21}>3 weeks (+20 tokens)</Option>
                                        <Option value={28}>4 weeks (+30 tokens)</Option>
                                    </Select>
                                    {/* ✅ Показуємо реальну вартість тривалості */}
                                    <span className={styles.note}>
                                        1 week included · each additional week +10 tokens
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Extras */}
                        <div className={styles.sectionGroup}>
                            {Object.entries(EXTRA_CATEGORIES).map(([category, options]) => (
                                <div key={category} className={styles.section}>
                                    <h3>{category.charAt(0).toUpperCase() + category.slice(1)} Modules</h3>
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
                                                            setFieldValue("extras", values.extras.filter((x) => x !== opt.name));
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

                        {/* ✅ Summary — горизонтальна смуга */}
                        <div className={styles.summary}>
                            <div className={styles.summaryContent}>
                                <div className={styles.summaryBreakdown}>
                                    <p>Package ({PACKAGE_TIERS.find(p => p.id === values.packageId)?.label}): <strong>{packageBase}</strong></p>
                                    <p>Extras: <strong>+{extraCost}</strong></p>
                                    <p>Duration: <strong>+{durationCost}</strong></p>
                                    <p>Language: <strong>+{languageCost}</strong></p>
                                </div>
                                <div className={styles.summaryTotal}>
                                    <span>Total</span>
                                    <strong>{total}</strong>
                                    <span>tokens</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.actions}>
                            <ButtonUI
                                type="submit"
                                color="primary"
                                variant="solid"
                                textColor="backgroundLight"
                                hoverEffect="shadow"
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