export interface MealPlanRecipe {
    meal: string;
    name: string;
    prepTime: string;
    calories: number;
    ingredients: string[];
    method: string[];
}

export interface MealPlanExample {
    slug: string;
    title: string;
    description: string;
    preview: string;
    dailySummary: string;
    recipes: MealPlanRecipe[];
}

export const mealPlanExamples: MealPlanExample[] = [
    {
        slug: "weight-loss",
        title: "Weight Loss Plan",
        description: "A customized calorie-deficit menu designed to drop weight safely while retaining muscle.",
        preview: "/images/meal-plan-weight-loss.jpg",
        dailySummary: "About 1,550 kcal | 115 g protein",
        recipes: [
            {
                meal: "Breakfast",
                name: "Berry Greek Yogurt Oats",
                prepTime: "10 minutes",
                calories: 390,
                ingredients: [
                    "50 g rolled oats",
                    "150 g plain Greek yogurt",
                    "100 ml milk",
                    "80 g mixed berries",
                    "1 tsp chia seeds",
                ],
                method: [
                    "Stir the oats and milk together in a bowl.",
                    "Top with Greek yogurt, berries, and chia seeds.",
                    "Serve straight away, or chill overnight for a softer texture.",
                ],
            },
            {
                meal: "Lunch",
                name: "Lemon Chicken Quinoa Bowl",
                prepTime: "25 minutes",
                calories: 540,
                ingredients: [
                    "120 g chicken breast",
                    "60 g dry quinoa",
                    "1/2 cucumber, diced",
                    "100 g cherry tomatoes, halved",
                    "1 tbsp olive oil",
                    "1/2 lemon, juiced",
                ],
                method: [
                    "Cook the quinoa according to the packet instructions.",
                    "Season and pan-cook the chicken until cooked through, then slice.",
                    "Toss the vegetables with olive oil and lemon juice.",
                    "Serve the chicken and vegetables over the quinoa.",
                ],
            },
            {
                meal: "Dinner",
                name: "Salmon with Roasted Vegetables",
                prepTime: "30 minutes",
                calories: 620,
                ingredients: [
                    "130 g salmon fillet",
                    "150 g broccoli florets",
                    "1 medium carrot, sliced",
                    "150 g baby potatoes, halved",
                    "1 tsp olive oil",
                    "1 tsp dried herbs",
                ],
                method: [
                    "Heat the oven to 200 C. Toss the potatoes and carrot with oil and herbs.",
                    "Roast the vegetables for 15 minutes, then add the broccoli and salmon.",
                    "Roast for another 12 to 15 minutes, until the salmon is cooked through.",
                ],
            },
        ],
    },
    {
        slug: "muscle-gain",
        title: "Muscle Gain Plan",
        description: "A clean bulking menu packed with high-protein recipes and meal prep guidelines.",
        preview: "/images/meal-plan-muscle-gain.jpg",
        dailySummary: "About 2,650 kcal | 165 g protein",
        recipes: [
            {
                meal: "Breakfast",
                name: "Banana Peanut Butter Pancakes",
                prepTime: "20 minutes",
                calories: 720,
                ingredients: [
                    "80 g rolled oats",
                    "2 eggs",
                    "1 ripe banana",
                    "100 g cottage cheese",
                    "1 tbsp peanut butter",
                    "1 tsp baking powder",
                ],
                method: [
                    "Blend the oats, eggs, banana, cottage cheese, and baking powder.",
                    "Cook small pancakes in a lightly oiled pan over medium heat.",
                    "Serve with peanut butter spread over the warm pancakes.",
                ],
            },
            {
                meal: "Lunch",
                name: "Chicken and Tomato Pasta",
                prepTime: "25 minutes",
                calories: 850,
                ingredients: [
                    "100 g dry wholewheat pasta",
                    "150 g chicken breast, sliced",
                    "150 g passata",
                    "1 tbsp olive oil",
                    "20 g grated parmesan",
                    "1 handful baby spinach",
                ],
                method: [
                    "Cook the pasta according to the packet instructions.",
                    "Pan-cook the chicken in olive oil until cooked through.",
                    "Add the passata and spinach, then simmer until the spinach wilts.",
                    "Stir in the pasta and serve with parmesan.",
                ],
            },
            {
                meal: "Dinner",
                name: "Beef, Rice and Avocado Bowl",
                prepTime: "25 minutes",
                calories: 1_080,
                ingredients: [
                    "150 g lean beef strips",
                    "100 g dry brown rice",
                    "1/2 avocado, sliced",
                    "100 g red pepper, sliced",
                    "1 tsp olive oil",
                    "1 tbsp low-salt soy sauce",
                ],
                method: [
                    "Cook the rice according to the packet instructions.",
                    "Stir-fry the beef and pepper in olive oil until the beef is cooked to your liking.",
                    "Add the soy sauce and serve over the rice with sliced avocado.",
                ],
            },
        ],
    },
    {
        slug: "keto-diet",
        title: "Keto Diet Plan",
        description: "A low-carb, high-fat ketogenic blueprint with step-by-step recipes.",
        preview: "/images/meal-plan-keto.jpg",
        dailySummary: "About 1,800 kcal | 115 g protein",
        recipes: [
            {
                meal: "Breakfast",
                name: "Spinach and Feta Omelette",
                prepTime: "15 minutes",
                calories: 480,
                ingredients: [
                    "3 eggs",
                    "30 g feta, crumbled",
                    "1 handful baby spinach",
                    "1 tsp butter",
                    "1/4 avocado, sliced",
                ],
                method: [
                    "Whisk the eggs in a bowl.",
                    "Melt the butter in a pan and wilt the spinach.",
                    "Pour in the eggs and cook gently until nearly set.",
                    "Add the feta, fold the omelette, and serve with avocado.",
                ],
            },
            {
                meal: "Lunch",
                name: "Chicken Avocado Salad",
                prepTime: "20 minutes",
                calories: 610,
                ingredients: [
                    "130 g chicken breast",
                    "2 handfuls mixed salad leaves",
                    "1/2 avocado, diced",
                    "80 g cucumber, sliced",
                    "1 tbsp olive oil",
                    "1 tbsp lemon juice",
                ],
                method: [
                    "Season and pan-cook the chicken until cooked through, then slice.",
                    "Arrange the salad leaves, avocado, and cucumber in a bowl.",
                    "Whisk the olive oil with lemon juice and toss through the salad.",
                    "Top with the sliced chicken and serve.",
                ],
            },
            {
                meal: "Dinner",
                name: "Herb Salmon with Creamy Broccoli",
                prepTime: "25 minutes",
                calories: 710,
                ingredients: [
                    "150 g salmon fillet",
                    "180 g broccoli florets",
                    "40 ml double cream",
                    "15 g grated cheddar",
                    "1 tsp olive oil",
                    "1 tsp dried herbs",
                ],
                method: [
                    "Heat the oven to 200 C. Brush the salmon with olive oil and dried herbs.",
                    "Bake the salmon for 12 to 15 minutes, until cooked through.",
                    "Steam the broccoli until tender.",
                    "Warm the cream and cheddar together, then spoon over the broccoli.",
                ],
            },
        ],
    },
];
