"use client";

import React from "react";
import Text from "@/components/constructor/text/Text";
import ExamplesGrid from "@/components/ui/example-grid/ExamplesGrid";
import InfoBlock from "@/components/constructor/Info-block/InfoBlock";
import ValuesIcons from "@/components/constructor/values-icons/ValuesIcons";
import HighlightStrip from "@/components/constructor/highlight-strip/HighlightStrip";
import FAQ from "@/components/constructor/faq/FAQ";
import { media as mediaMap } from "@/resources/media";
import { useEffect } from "react";
import { COMPANY_NAME } from "@/resources/constants";

function resolveMedia(key?: string) {
    if (!key) return undefined;
    const v = (mediaMap as Record<string, unknown>)[key];
    if (!v && process.env.NODE_ENV !== "production") {
        console.warn(`⚠️ Media not found: ${key}`);
    }
    return v as any;
}

const Page = () => {
    useEffect(() => {
        document.title = `Example Meal Plans — ${COMPANY_NAME || "Qellum"}`;
    }, []);

    return (
        <>
            {/* Intro */}
            <Text
                title="Example Meal Plans"
                description={`Explore sample menus and recipe schedules crafted by our professional chefs and smart AI engine. Download them to see how Qellum structures targets, recipes, and shopping lists.`}
                titleLevel={1}
                centerTitle
                centerDescription
            />

            {/* Highlight Strip */}
            <HighlightStrip
                messages={[
                    "Chef-Approved Recipes 🍳",
                    "Calorie & Macro Breakdown 📊",
                    "Grouped Shopping Lists 🛒",
                ]}
            />

            {/* Основний грід прикладів */}
            <ExamplesGrid />

            {/* InfoBlock */}
            <InfoBlock
                title="Why Choose Qellum Meal Plans?"
                description="Our meal plan examples demonstrate the rigorous balance between professional chef experience and advanced AI calculation. Every plan is tailored to fit individual calorie targets and dietary needs."
                bullets={[
                    "Designed by certified culinary & nutrition experts",
                    "Detailed macro & calorie breakdowns per meal",
                    "Automated shopping lists organized by grocery category",
                ]}
                align="center"
                image={resolveMedia("image2")}
            />

            {/* 🆕 Extras Section */}
            <ValuesIcons
                title="Optional Extras for a Comprehensive Diet Plan"
                description="Enhance your culinary journey with these specialized modules that can be generated alongside your core menu:"
                values={[
                    {
                        icon: "🛒",
                        title: "Grouped Shopping List",
                        text: "A categorized shopping list that maps to sections of your grocery store.",
                    },
                    {
                        icon: "📅",
                        title: "Meal Prep Guide",
                        text: "A step-by-step storage and prep schedule to save cooking time.",
                    },
                    {
                        icon: "🍉",
                        title: "Healthy Snack Options",
                        text: "Calculated alternative snacks to keep cravings at bay without breaking macros.",
                    },
                    {
                        icon: "🥛",
                        title: "Hydration Tracker & Tips",
                        text: "Customized daily water target guidelines to optimize digestion and energy.",
                    },
                    {
                        icon: "🌱",
                        title: "Ingredient Swaps",
                        text: "Allergy-friendly and seasonal alternative suggestions for key recipes.",
                    },
                    {
                        icon: "👨‍🍳",
                        title: "Nutritionist Review",
                        text: "A comprehensive audit of your goals and menu by a certified nutrition advisor.",
                    },
                ]}
            />

            {/* Values Icons */}
            <ValuesIcons
                title="Key Benefits"
                description="When using our meal plans you get:"
                values={[
                    { icon: "⚡", title: "Speed", text: "Get instant AI meal plans in minutes" },
                    { icon: "🥗", title: "Health First", text: "Perfect balance of nutrients tailored to you" },
                    { icon: "🎨", title: "Variety", text: "Exciting, varied recipes that prevent diet fatigue" },
                ]}
            />

            {/* FAQ */}
            <FAQ
                items={[
                    {
                        question: "Can I download the sample meal plans?",
                        answer: "Yes, each example plan can be downloaded as a PDF with sample recipe schedules.",
                    },
                    {
                        question: "Who designs the meal plans?",
                        answer: "Our plans are a combination of advanced nutritional AI and reviews by certified culinary chefs.",
                    },
                    {
                        question: "Can I customize the recipes?",
                        answer: "Yes! Using the plan generator on your dashboard, you can adjust tastes, allergens, and day count.",
                    },
                    {
                        question: "What are 'Extras'?",
                        answer:
                            "Extras are optional modules like detailed recipes, categorized shopping lists, hydration plans, and nutritionist notes to augment your experience.",
                    },
                ]}
            />
        </>
    );
};

export default Page;
