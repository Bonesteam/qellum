import { FormValues } from "./ManualGenerator";

export const mockCVData: FormValues = {
    fullName: "Olena Kovalenko",
    goal: "Lose 5 kg in a healthy way with emphasis on whole foods and sustainable habits",
    dietaryPreference: "Balanced",
    packageId: "premium",
    days: 7,
    planType: "ai",
    language: "English",
    extras: [
        "weeklyMenu",
        "recipes",
        "shoppingList",
        "calorieBreakdown",
        "mealPrepGuide",
        "groceryListLocalized",
    ],
    // Optional: tasteProfile JSON for testing extras parsing
    // tasteProfileJSON: JSON.stringify({
    //   tasteProfile: {
    //     fullName: "Anna Chef",
    //     goal: "Lose 5 kg in a healthy way with focus on sustainable habits",
    //     dietaryPreference: "Vegetarian",
    //     flavors: { preferred: ["Savory", "Spicy", "Herbaceous"], disliked: ["Bitter", "Overly Sweet", "Greasy"] },
    //     cuisines: ["Mediterranean", "Indian", "Thai", "Mexican"],
    //     ingredients: { likes: ["Quinoa", "Chickpeas", "Spinach", "Sweet Potatoes", "Tofu"], dislikes: ["Mushrooms", "Eggplant", "Asparagus"] },
    //     mealPreferences: { breakfast: ["Smoothies", "Oatmeal with fruits", "Avocado toast"], lunch: ["Grain bowls with vegetables", "Vegetable stir-fry", "Soup"], dinner: ["Stuffed peppers", "Curry dishes", "Pasta with pesto"], snacks: ["Nuts", "Fruit", "Vegetable sticks with hummus"] },
    //     cookingStyle: ["Quick meals", "One-pot dishes", "Meal prepping"],
    //     allergies: [],
    //     specialRequests: "Focus on seasonal produce and minimizing food waste."
    //   }
    // })
};
