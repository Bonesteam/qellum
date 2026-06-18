import { PageSchema } from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
    COMPANY_ADDRESS,
    COMPANY_EMAIL,
} from "@/resources/constants";

const allergyPolicySchema: PageSchema = {
    meta: {
        title: `Allergy & Dietary Safety Policy – ${COMPANY_NAME}`,
        description: `How ${COMPANY_NAME} handles allergies, dietary restrictions, and food safety across all AI-generated and chef-curated meal plans. Understand your protections.`,
        keywords: [
            "allergy policy",
            "dietary safety",
            "food allergy meal plan",
            "gluten free",
            "nut allergy chef",
            "vegan meal plan",
            "dietary restrictions",
            "Qellum safety",
        ],
        canonical: "/allergy-policy",
        ogImage: {
            title: `${COMPANY_NAME} – Allergy & Dietary Safety`,
            description: "How we protect you from allergens and respect your dietary requirements.",
            bg: "#2D5A27",
            color: "#ffffff",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Allergy & Dietary Safety Policy",
            description: "Effective date: 10 September 2025",
            centerTitle: true,
            centerDescription: true,
        },
        {
            type: "text",
            title: "1. Our Commitment to Your Safety",
            bullets: [
                `${COMPANY_NAME} is committed to making personalised nutrition accessible for everyone — regardless of dietary restrictions or food allergies.`,
                "We understand that food allergies and intolerances are serious health matters. Our platform is designed to capture, store, and act on this information with the utmost care.",
                "This policy outlines how we handle allergy data, what protections are in place, and what responsibility rests with you and our chefs respectively.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "2. Allergen Categories We Track",
            bullets: [
                "🥜 Nuts & Tree Nuts — peanuts, cashews, walnuts, almonds, pistachios, pecans, hazelnuts",
                "🌾 Gluten & Wheat — including wheat, barley, rye, and spelt-based products",
                "🥛 Dairy & Lactose — milk, cheese, butter, cream, whey, and lactose derivatives",
                "🥚 Eggs — whole eggs and egg-derived ingredients",
                "🐟 Fish & Shellfish — all varieties including tuna, salmon, cod, shrimp, crab, lobster",
                "🌱 Soy & Soya — soy sauce, tofu, edamame, and processed soy proteins",
                "🌻 Sesame — sesame seeds, tahini, and sesame oil",
                "🐝 Sulphites & Sulphur Dioxide — commonly found in wine, dried fruits, and preservatives",
                "💊 Other Intolerances — FODMAP, histamine intolerance, fructose malabsorption — captured on request",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "3. How Allergy Data Is Collected",
            bullets: [
                "During the meal plan configuration form, users are prompted to list all relevant allergies, intolerances, and dietary preferences.",
                "Users may select from a standardised list of the 14 major EU/UK allergens and add custom notes for unlisted restrictions.",
                "This data is stored securely and is transmitted to the assigned chef or AI meal planning module before any plan generation begins.",
                "You may update your allergy profile at any time from your dashboard settings.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "4. Chef Responsibility & Crosscheck Process",
            bullets: [
                "All certified chefs on our platform must complete an allergen awareness module before accepting assignments.",
                "Chefs are required to cross-reference your allergy profile against every ingredient in your meal plan before delivery.",
                "If a chef is uncertain about an ingredient's allergen content, they are required to substitute it with a safe alternative.",
                "Final plans are reviewed against our allergen database before being marked as complete and delivered.",
                "In the event of a conflict between your preferences and nutritional requirements, the chef will contact you directly before proceeding.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "5. AI-Generated Plan Safeguards",
            bullets: [
                "Our AI system is trained on ingredient-level allergen data across thousands of recipes.",
                "Before any AI meal plan is generated, your allergy profile is loaded as a hard constraint — ingredients flagged as allergens will be automatically excluded.",
                "AI-generated plans are reviewed by our internal quality team before delivery for premium tiers.",
                "We recommend users verify AI-generated ingredient lists if they have severe or life-threatening allergies, as AI systems may carry residual limitations.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "6. Cross-Contamination Disclaimer",
            bullets: [
                `${COMPANY_NAME} provides meal planning services — we do not prepare, package, or deliver physical food.`,
                "Our plans and recipes are intended for home preparation. Cross-contamination risks in your own kitchen are outside our control.",
                "If you suffer from severe, life-threatening allergies (anaphylaxis risk), we strongly recommend consulting your healthcare provider before following any meal plan.",
                "Recipes may be sourced from general culinary databases where cross-contamination warnings may not always be included. We advise checking individual product labels.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "7. Special Dietary Preferences We Support",
            bullets: [
                "🌿 Vegan — completely plant-based, no animal-derived ingredients",
                "🥗 Vegetarian — excludes meat and fish, allows dairy and eggs",
                "🐟 Pescatarian — includes fish and seafood, excludes other meats",
                "🥩 Carnivore / Ketogenic — high protein, high fat, very low carbohydrate",
                "⚡ FODMAP — for irritable bowel syndrome (IBS) management",
                "🌾 Coeliac-safe — strictly gluten-free, no cross-contamination in ingredients",
                "🏋️ High-protein / Muscle-gain — increased protein macros for athletic goals",
                "🩺 Diabetic-friendly — controlled glycaemic index and low sugar intake",
                "🤰 Pregnancy-safe — excludes high-mercury fish, raw eggs, unpasteurised dairy",
                "Custom profiles for any unlisted requirement are available upon request.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "8. Updating & Removing Allergy Data",
            bullets: [
                "You may update your allergy preferences from your profile settings at any time.",
                "Changes made after a meal plan order is placed may not take effect for that order — please contact support for amendments.",
                "To request deletion of your allergy data, contact us at the email below. Deletion may affect the quality of future plan personalisation.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "9. Our Liability",
            bullets: [
                `${COMPANY_NAME} takes all reasonable steps to ensure allergy data is correctly applied to your meal plans.`,
                "However, we cannot accept liability for adverse reactions arising from: ingredients sourced by the user, restaurant or third-party preparation, or inaccurate allergen declarations by ingredient manufacturers.",
                "Users with medically-diagnosed severe allergies should always consult a registered dietitian alongside using our platform.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "10. Contact Us",
            bullets: [
                `For allergy-related questions, custom dietary requests, or to report an issue with your meal plan, contact our nutrition support team.`,
                `📧 ${COMPANY_EMAIL}`,
                `Company: ${COMPANY_LEGAL_NAME} | No. ${COMPANY_NUMBER}`,
                `Registered at: ${COMPANY_ADDRESS}`,
            ],
            centerTitle: true,
        },
    ],
};

export default allergyPolicySchema;
