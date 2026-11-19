const fs = require('fs');
const path = require('path');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const LEFT = 52;
const CONTENT_WIDTH = PAGE_WIDTH - LEFT * 2;
const GREEN = rgb(0.18, 0.35, 0.22);
const DARK = rgb(0.12, 0.15, 0.13);
const MUTED = rgb(0.38, 0.42, 0.39);

function drawWrappedText(page, text, font, size, x, y, maxWidth, color = DARK) {
    const words = text.split(/\s+/);
    let line = "";
    let currentY = y;

    for (const word of words) {
        const nextLine = line ? `${line} ${word}` : word;
        if (font.widthOfTextAtSize(nextLine, size) > maxWidth && line) {
            page.drawText(line, { x, y: currentY, size, font, color });
            currentY -= size * 1.5;
            line = word;
        } else {
            line = nextLine;
        }
    }

    if (line) {
        page.drawText(line, { x, y: currentY, size, font, color });
        currentY -= size * 1.5;
    }

    return currentY;
}

const mealPlanExamples = [
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
                calories: 1080,
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

async function generatePdfForPlan(plan) {
    const document = await PDFDocument.create();
    const regular = await document.embedFont(StandardFonts.Helvetica);
    const bold = await document.embedFont(StandardFonts.HelveticaBold);
    const imagePath = path.join(__dirname, "..", "public", plan.preview.replace(/^\/+/, ""));
    const mealPhoto = await document.embedJpg(fs.readFileSync(imagePath));

    document.setTitle(`${plan.title} - Sample Meal Plan`);
    document.setAuthor("Qellum");
    document.setSubject("Sample recipes and meal plan");

    const cover = document.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    cover.drawText("QELLUM | SAMPLE MEAL PLANS", {
        x: LEFT,
        y: PAGE_HEIGHT - 58,
        size: 10,
        font: bold,
        color: GREEN,
    });
    cover.drawLine({
        start: { x: LEFT, y: PAGE_HEIGHT - 72 },
        end: { x: PAGE_WIDTH - LEFT, y: PAGE_HEIGHT - 72 },
        thickness: 1,
        color: GREEN,
    });
    cover.drawText(plan.title, {
        x: LEFT,
        y: PAGE_HEIGHT - 125,
        size: 28,
        font: bold,
        color: DARK,
    });
    drawWrappedText(cover, plan.description, regular, 12, LEFT, PAGE_HEIGHT - 152, CONTENT_WIDTH, MUTED);
    cover.drawText("SAMPLE DAY", {
        x: LEFT,
        y: PAGE_HEIGHT - 220,
        size: 11,
        font: bold,
        color: GREEN,
    });
    cover.drawText(plan.dailySummary, {
        x: LEFT,
        y: PAGE_HEIGHT - 242,
        size: 14,
        font: bold,
        color: DARK,
    });
    cover.drawText("MEALS", {
        x: LEFT,
        y: PAGE_HEIGHT - 300,
        size: 11,
        font: bold,
        color: GREEN,
    });

    let coverY = PAGE_HEIGHT - 332;
    for (const recipe of plan.recipes) {
        cover.drawText(recipe.meal.toUpperCase(), {
            x: LEFT,
            y: coverY,
            size: 10,
            font: bold,
            color: MUTED,
        });
        cover.drawText(`${recipe.name} | ${recipe.calories} kcal`, {
            x: LEFT + 92,
            y: coverY,
            size: 11,
            font: regular,
            color: DARK,
        });
        coverY -= 34;
    }

    const imageSize = mealPhoto.scaleToFit(420, 230);
    cover.drawImage(mealPhoto, {
        x: (PAGE_WIDTH - imageSize.width) / 2,
        y: 145,
        ...imageSize,
    });

    drawWrappedText(
        cover,
        "Nutrition figures are estimates for this example and will vary with ingredients and portions.",
        regular,
        9,
        LEFT,
        92,
        CONTENT_WIDTH,
        MUTED,
    );

    for (const recipe of plan.recipes) {
        const page = document.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
        page.drawText(`${plan.title.toUpperCase()} | ${recipe.meal.toUpperCase()}`, {
            x: LEFT,
            y: PAGE_HEIGHT - 58,
            size: 10,
            font: bold,
            color: GREEN,
        });
        page.drawLine({
            start: { x: LEFT, y: PAGE_HEIGHT - 72 },
            end: { x: PAGE_WIDTH - LEFT, y: PAGE_HEIGHT - 72 },
            thickness: 1,
            color: GREEN,
        });

        page.drawText(recipe.name, {
            x: LEFT,
            y: PAGE_HEIGHT - 120,
            size: 23,
            font: bold,
            color: DARK,
        });
        page.drawText(`${recipe.prepTime} | ${recipe.calories} kcal`, {
            x: LEFT,
            y: PAGE_HEIGHT - 145,
            size: 11,
            font: regular,
            color: MUTED,
        });

        let y = PAGE_HEIGHT - 205;
        page.drawText("INGREDIENTS", { x: LEFT, y, size: 11, font: bold, color: GREEN });
        y -= 28;
        for (const ingredient of recipe.ingredients) {
            y = drawWrappedText(page, `- ${ingredient}`, regular, 11, LEFT + 4, y, CONTENT_WIDTH - 4);
            y -= 4;
        }

        y -= 20;
        page.drawText("METHOD", { x: LEFT, y, size: 11, font: bold, color: GREEN });
        y -= 28;
        recipe.method.forEach((step, index) => {
            y = drawWrappedText(page, `${index + 1}. ${step}`, regular, 11, LEFT + 4, y, CONTENT_WIDTH - 4);
            y -= 9;
        });

        page.drawText("Qellum sample recipe", {
            x: LEFT,
            y: 38,
            size: 9,
            font: regular,
            color: MUTED,
        });
    }

    return await document.save();
}

async function run() {
    const pdfDir = path.join(__dirname, "..", "public", "pdf");
    if (!fs.existsSync(pdfDir)) {
        fs.mkdirSync(pdfDir, { recursive: true });
    }

    const legacyMap = {
        "weight-loss": ["weight-loss-meal-plan.pdf", "classic.pdf"],
        "muscle-gain": ["muscle-gain-meal-plan.pdf", "modern.pdf"],
        "keto-diet": ["keto-diet-meal-plan.pdf", "creative.pdf"],
    };

    for (const plan of mealPlanExamples) {
        console.log(`Generating PDF for ${plan.title}...`);
        const pdfBytes = await generatePdfForPlan(plan);
        const targetFilenames = legacyMap[plan.slug];
        for (const filename of targetFilenames) {
            const destPath = path.join(pdfDir, filename);
            fs.writeFileSync(destPath, pdfBytes);
            console.log(`  Saved -> ${filename} (${pdfBytes.length} bytes)`);
        }
    }

    console.log("All meal plan PDFs generated successfully.");
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
