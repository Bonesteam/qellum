import { PageSchema } from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
    COMPANY_ADDRESS,
    COMPANY_EMAIL,
} from "@/resources/constants";

const dietaryDisclaimerSchema: PageSchema = {
    meta: {
        title: `Dietary Disclaimer & Medical Nutrition Notice – ${COMPANY_NAME}`,
        description: `Legal and medical disclaimer for ${COMPANY_NAME} meal plans. Qellum is a lifestyle and wellness planning platform, not a medical provider.`,
        keywords: [
            "dietary disclaimer",
            "medical disclaimer",
            "nutrition notice",
            "not medical advice",
            "diet safety",
        ],
        canonical: "/dietary-disclaimer",
        ogImage: {
            title: `${COMPANY_NAME} – Dietary & Medical Disclaimer`,
            description: "Please read our medical disclaimer and dietary notice carefully.",
            bg: "#1A2F22",
            color: "#ffffff",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Dietary Disclaimer & Medical Nutrition Notice",
            description: "Effective date: 10 September 2025",
            centerTitle: true,
            centerDescription: true,
        },
        {
            type: "text",
            title: "1. Not Medical Advice",
            bullets: [
                `All content, recipes, meal plans, nutritional information, and consultation advice provided by ${COMPANY_NAME} are for informational, educational, and general wellness purposes only.`,
                "We do not provide medical advice, diagnosis, treatment, or therapy. The information on this website and in our applications should not be used as a substitute for professional medical advice, diagnosis, or treatment.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "2. Consult Your Doctor",
            bullets: [
                "You should always consult with a qualified medical professional (such as your general practitioner, registered dietitian, or clinical nutritionist) before starting any new diet, fitness program, or changing your current food consumption habits.",
                "If you have preexisting health conditions, are pregnant or breastfeeding, have diabetes, cardiovascular issues, kidney disease, or severe food allergies, it is critical that your primary healthcare provider reviews and approves any meal plan before you begin preparation.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "3. User Responsibility",
            bullets: [
                "It is your sole responsibility to ensure that the food preferences, allergies, and lifestyle factors you enter on our platform are accurate and up-to-date.",
                "You are responsible for reading the packaging labels of all physical ingredients you purchase to verify their allergen status and country of origin.",
                "Listen to your body. If you experience adverse symptoms, severe fatigue, gastrointestinal distress, or allergic reactions, stop following the plan immediately and seek medical attention.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "4. No Guarantees",
            bullets: [
                "Nutritional values, calorie counts, and macro tracking are estimations. They may vary based on ingredient brands, cooking methods, portion sizes, and other natural factors.",
                "We cannot guarantee specific physical outcomes, weight loss milestones, muscle growth targets, or health improvements. Results vary based on individual metabolism, genetics, adherence to plans, and overall health.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "5. Legal Contact",
            bullets: [
                `For any legal or medical questions concerning our meal planning services, contact our compliance officer.`,
                `📧 ${COMPANY_EMAIL}`,
                `Company: ${COMPANY_LEGAL_NAME} | No. ${COMPANY_NUMBER}`,
                `Registered at: ${COMPANY_ADDRESS}`,
            ],
            centerTitle: true,
        },
    ],
};

export default dietaryDisclaimerSchema;
