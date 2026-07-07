"use client";
import React, { useState } from "react";
import styles from "./SeasonalMenuPreview.module.scss";
import Link from "next/link";

export interface SeasonalDish {
    name: string;
    description: string;
    tags?: string[];      // e.g. ["Vegetarian", "High Protein"]
    kcal?: number;
}

export interface SeasonalMenuPreviewProps {
    title?: string;
    description?: string;
    seasons?: {
        label: string;          // "Spring", "Summer", etc.
        icon: string;           // emoji
        color: string;          // accent color for this season
        dishes: SeasonalDish[];
    }[];
    ctaText?: string;
    ctaLink?: string;
}

const DEFAULT_SEASONS: SeasonalMenuPreviewProps["seasons"] = [
    {
        label: "Spring",
        icon: "🌱",
        color: "#4A7C59",
        dishes: [
            { name: "Asparagus & Lemon Risotto", description: "Creamy arborio with fresh asparagus, lemon zest and aged Parmesan.", tags: ["Vegetarian"], kcal: 480 },
            { name: "Spring Pea & Mint Soup", description: "Silky blended peas with fresh mint, crème fraîche and toasted seeds.", tags: ["Vegan"], kcal: 210 },
            { name: "Pan-Seared Trout", description: "Fillet with herb butter, capers and a watercress salad.", tags: ["High Protein"], kcal: 390 },
        ],
    },
    {
        label: "Summer",
        icon: "☀️",
        color: "#C25E3A",
        dishes: [
            { name: "Grilled Peach & Burrata", description: "Char-grilled peaches, fresh burrata, basil oil and toasted pine nuts.", tags: ["Vegetarian"], kcal: 310 },
            { name: "Herb-Marinated Chicken Skewers", description: "Free-range chicken with chimichurri, sweet peppers and grilled corn.", tags: ["High Protein", "Gluten-Free"], kcal: 420 },
            { name: "Chilled Gazpacho", description: "Classic Andalusian tomato-based chilled soup with crusty croutons.", tags: ["Vegan"], kcal: 180 },
        ],
    },
    {
        label: "Autumn",
        icon: "🍂",
        color: "#9E6B3A",
        dishes: [
            { name: "Butternut Squash & Sage Pasta", description: "Brown butter, roasted squash and crispy sage over handmade pappardelle.", tags: ["Vegetarian"], kcal: 520 },
            { name: "Slow-Braised Beef Shin", description: "8-hour braise with red wine, root vegetables and creamy polenta.", tags: ["High Protein"], kcal: 610 },
            { name: "Wild Mushroom Tart", description: "Porcini, chestnut and truffle oil in a buttery shortcrust pastry shell.", tags: ["Vegetarian"], kcal: 440 },
        ],
    },
    {
        label: "Winter",
        icon: "❄️",
        color: "#2A5F8A",
        dishes: [
            { name: "Venison & Juniper Stew", description: "Rich slow-cooked venison with juniper berries, port wine and root veg.", tags: ["High Protein", "Gluten-Free"], kcal: 580 },
            { name: "Roasted Celeriac Soup", description: "Velvety celeriac with truffle crème and toasted hazelnuts.", tags: ["Vegetarian"], kcal: 240 },
            { name: "Spiced Lamb Shanks", description: "Slow-roasted with ras el hanout, preserved lemon and couscous.", tags: ["High Protein"], kcal: 650 },
        ],
    },
];

const SeasonalMenuPreview: React.FC<SeasonalMenuPreviewProps> = ({
    title = "Seasonal Menus — Always Fresh",
    description = "Our chefs craft menus around the finest seasonal produce. Every dish is created fresh, nutritionally balanced, and tailored to your preferences.",
    seasons = DEFAULT_SEASONS,
    ctaText = "Get My Personal Menu",
    ctaLink = "/get-started",
}) => {
    const [active, setActive] = useState(0);
    const current = seasons[active];

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>
            </div>

            {/* Season tabs */}
            <div className={styles.tabs}>
                {seasons.map((s, i) => (
                    <button
                        key={s.label}
                        className={`${styles.tab} ${i === active ? styles.tabActive : ""}`}
                        style={i === active ? { "--season-color": s.color } as React.CSSProperties : {}}
                        onClick={() => setActive(i)}
                        aria-pressed={i === active}
                    >
                        <span className={styles.tabIcon}>{s.icon}</span>
                        <span className={styles.tabLabel}>{s.label}</span>
                    </button>
                ))}
            </div>

            {/* Dishes grid */}
            <div className={styles.grid} key={current.label}>
                {current.dishes.map((dish, i) => (
                    <article
                        key={dish.name}
                        className={styles.card}
                        style={{ "--idx": i, "--season-color": current.color } as React.CSSProperties}
                    >
                        <div className={styles.cardAccent} />
                        <div className={styles.cardBody}>
                            <h3 className={styles.dishName}>{dish.name}</h3>
                            <p className={styles.dishDesc}>{dish.description}</p>
                            <div className={styles.cardMeta}>
                                <div className={styles.tags}>
                                    {dish.tags?.map(tag => (
                                        <span key={tag} className={styles.tag}>{tag}</span>
                                    ))}
                                </div>
                                {dish.kcal && (
                                    <span className={styles.kcal}>{dish.kcal} kcal</span>
                                )}
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            <div className={styles.cta}>
                <Link href={ctaLink} className={styles.ctaBtn}>
                    {ctaText}
                </Link>
                <p className={styles.ctaNote}>
                    All menus are 100% personalised by your assigned chef — this is just a taste.
                </p>
            </div>
        </section>
    );
};

export default SeasonalMenuPreview;
