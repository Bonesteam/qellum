export const formSchemaCV = {
    preferences: [
        { name: "likes", label: "Foods you like", type: "text" },
        { name: "dislikes", label: "Foods you dislike", type: "text" },
        { name: "avoid", label: "Foods to avoid (allergies/intolerances)", type: "text" },
        { name: "cookingSkill", label: "Cooking skill level", type: "select", options: ["Beginner", "Intermediate", "Advanced"] },
    ],
};
