// formSchema.ts

export const formSchema = {
    expectations: [
        {
            name: "goal",
            label: "Dietary Goal",
            description: "Example: weight loss, muscle gain, maintain weight, healthier eating.",
            type: "textarea",
            required: true,
        },
        {
            name: "calorieTarget",
            label: "Daily Calorie Target (optional)",
            description: "Optional daily calorie goal in kcal.",
            type: "text",
        },
        {
            name: "mealsPerDay",
            label: "Meals per Day",
            description: "How many meals do you prefer per day (e.g., 3, 4, 5).",
            type: "text",
            required: true,
        },
    ],

    selectors: [
        {
            name: "dietaryPreference",
            label: "Dietary Preference",
            description: "Choose dietary style.",
            type: "select",
            options: ["Omnivore", "Vegetarian", "Vegan", "Pescatarian", "Balanced"],
        },
        {
            name: "allergies",
            label: "Allergies / Intolerances",
            description: "Any ingredients to avoid.",
            type: "select",
            options: ["None", "Gluten", "Dairy", "Nuts", "Soy", "Other"],
        },
        {
            name: "budget",
            label: "Budget Preference",
            description: "Budget level for ingredients.",
            type: "select",
            options: ["Low", "Medium", "High"],
        },
    ],

    advanced: [
        {
            name: "includeRecipes",
            label: "Include Recipes",
            description: "Provide detailed recipes for each meal.",
            type: "checkbox",
        },
        {
            name: "includeShoppingList",
            label: "Include Shopping List",
            description: "Generate a consolidated shopping list.",
            type: "checkbox",
        },
        {
            name: "includeSubstitutions",
            label: "Include Substitutions",
            description: "Suggest ingredient substitutions for common allergies.",
            type: "checkbox",
        },
        {
            name: "includeMealPrep",
            label: "Include Meal Prep Guide",
            description: "Add meal prep and storage tips.",
            type: "checkbox",
        },
    ],
};

export const buildPrompt = (values: Record<string, any>): string => {
    let prompt = `Create a detailed ${values.days || 7}-day meal plan.`;
    prompt += `\nFormat strictly as separate Day sections:\nDay 1:\n- Breakfast: ...\n- Lunch: ...\n- Dinner: ...\n- Snacks: ...\nInclude recipe steps, approximate calories per meal, portion sizes, and one-line grocery items (category in parentheses).`;

    prompt += `\n\nDietary goal: ${values.goal}`;
    if (values.calorieTarget) prompt += `\nDaily calorie target: ${values.calorieTarget} kcal`;
    if (values.mealsPerDay) prompt += `\nMeals per day: ${values.mealsPerDay}`;
    if (values.dietaryPreference) prompt += `\nDietary preference: ${values.dietaryPreference}`;
    if (values.allergies) prompt += `\nAllergies/intolerances: ${values.allergies}`;
    if (values.budget) prompt += `\nBudget preference: ${values.budget}`;

    if (values.includeRecipes) prompt += `\nInclude clear step-by-step recipes for each meal.`;
    if (values.includeShoppingList) prompt += `\nProvide a consolidated shopping list grouped by category (produce, dairy, pantry, etc.). Also provide a JSON object named "groceryListJSON" mapping categories to arrays of items.`;
    if (values.includeSubstitutions) prompt += `\nSuggest ingredient substitutions for common allergens and alternatives for unavailable items.`;
    if (values.includeMealPrep) prompt += `\nInclude meal-prep tips and storage instructions to make weekly preparation easier.`;

    // Extras: prompt the model to output structured sections for extras when requested
    if (Array.isArray(values.extras) && values.extras.length > 0) {
        prompt += `\n\nAdditionally, include the following extra sections as separate labeled blocks and (where applicable) provide a JSON object for machine parsing:`;
        for (const ex of values.extras) {
            switch (ex) {
                case "customAllergies":
                    prompt += `\n- customAllergies: include an array of allergy entries with fields {foodItem, reaction, recommendations} and also a short human-readable paragraph.`;
                    break;
                case "groceryListLocalized":
                case "groceryListLocalized":
                    prompt += `\n- groceryListLocalized: include a JSON object named groceryListLocalized mapping categories to arrays of item strings AND a human-friendly checklist.`;
                    break;
                case "groceryCostEstimates":
                    prompt += `\n- groceryCostEstimates: provide approximate weekly cost estimates per category and a total estimate. IMPORTANT: output a JSON object named "groceryCostEstimates" with numeric values, for example: { "groceryCostEstimates": { "fruits": 20, "vegetables": 25, "protein": 50, "grains": 15, "dairy": 15, "snacks": 10, "beverages": 10, "condiments": 5, "total": 150 } } . Also include a short human-readable explanation below the JSON.`;
                    break;
                case "variationSwaps":
                    prompt += `\n- variationSwaps: for each main recipe provide 2 quick variations or swaps.`;
                    break;
                case "mealTiming":
                    prompt += `\n- mealTiming: provide suggested meal times and spacing for the day.`;
                    break;
                case "hydrationSchedule":
                    prompt += `\n- hydrationSchedule: give a simple hydration schedule and tips.`;
                    break;
                case "ingredientPrepTips":
                    prompt += `\n- ingredientPrepTips: give prep and storage tips for major ingredients used.`;
                    break;
                default:
                    prompt += `\n- ${ex}: include a short helpful section.`;
            }
        }
    }

    prompt += `\n\nAlso provide: a simple daily calorie and macronutrient breakdown summary, and quick notes for picky eaters or budget options.`;

    return prompt;
};
