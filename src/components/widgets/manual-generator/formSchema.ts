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
    prompt += `\nFormat: Day — Meal (Breakfast/Lunch/Dinner/snacks) with recipe, calories per meal, and portion sizes.`;

    prompt += `\n\nDietary goal: ${values.goal}`;
    if (values.calorieTarget) prompt += `\nDaily calorie target: ${values.calorieTarget} kcal`;
    if (values.mealsPerDay) prompt += `\nMeals per day: ${values.mealsPerDay}`;
    if (values.dietaryPreference) prompt += `\nDietary preference: ${values.dietaryPreference}`;
    if (values.allergies) prompt += `\nAllergies/intolerances: ${values.allergies}`;
    if (values.budget) prompt += `\nBudget preference: ${values.budget}`;

    if (values.includeRecipes) prompt += `\nInclude clear step-by-step recipes for each meal.`;
    if (values.includeShoppingList) prompt += `\nProvide a consolidated shopping list grouped by category (produce, dairy, pantry, etc.).`;
    if (values.includeSubstitutions) prompt += `\nSuggest ingredient substitutions for common allergens and alternatives for unavailable items.`;
    if (values.includeMealPrep) prompt += `\nInclude meal-prep tips and storage instructions to make weekly preparation easier.`;

    prompt += `\n\nAlso provide: a simple daily calorie and macronutrient breakdown summary, and quick notes for picky eaters or budget options.`;

    return prompt;
};
