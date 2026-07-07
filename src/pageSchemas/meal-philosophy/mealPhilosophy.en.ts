import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME } from "@/resources/constants";

const mealPhilosophySchema: PageSchema = {
    meta: {
        title: `Culinary Philosophy – ${COMPANY_NAME}`,
        description: `Learn about Qellum's core nutrition and culinary values. How we combine chef expertise with smart technology to create balanced, sustainable meal plans.`,
        keywords: [
            "culinary philosophy",
            "meal plan philosophy",
            "healthy eating",
            "sustainable nutrition",
            "whole food diet",
            "chef expertise"
        ],
        canonical: "/meal-philosophy",
        ogImage: {
            title: `${COMPANY_NAME} – Culinary Philosophy`,
            description: "How we balance culinary art and nutrition science.",
            bg: "#1B4332",
            color: "#ffffff"
        }
    },
    blocks: [
        {
            type: "text",
            title: "Our Culinary & Meal Philosophy",
            description: "How Qellum balances culinary art, nutritional science, and smart technology.",
            centerTitle: true,
            centerDescription: true
        },
        {
            type: "text",
            title: "1. Real Food First",
            bullets: [
                "1.1. We believe in the power of whole, unprocessed ingredients. A sustainable diet is built on real food, not synthetic shakes or restrictive pills.",
                "1.2. Our chefs focus on high-quality proteins, healthy fats, and nutrient-dense complex carbohydrates to ensure you feel full and energized.",
                "1.3. We minimize refined sugars, excessive sodium, and industrial seed oils in all recommended recipes."
            ],
            centerTitle: true
        },
        {
            type: "text",
            title: "2. The Chef-Led Advantage",
            bullets: [
                "2.1. While AI is great for speed, it lacks the human touch. Food is an sensory experience — it has to smell, look, and taste delicious.",
                "2.2. A certified chef understands how ingredients interact, how spices elevate a dish without adding calories, and how to make healthy food exciting.",
                "2.3. By combining human culinary intuition with smart metrics, we create plans that are both chef-verified and nutritionally precise."
            ],
            centerTitle: true
        },
        {
            type: "text",
            title: "3. Sustainability over Restrictions",
            bullets: [
                "3.1. Extreme diets fail because they are hard to maintain. Our philosophy centers on balance, flexibility, and portion control.",
                "3.2. We encourage mindful eating and building long-term cooking habits rather than short-term caloric starvation.",
                "3.3. Every plan is adaptable to individual cravings, lifestyle, and busy schedules."
            ],
            centerTitle: true
        }
    ]
};

export default mealPhilosophySchema;
