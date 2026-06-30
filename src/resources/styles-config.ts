import {
    GoogleFont, ButtonColor, HeaderType, HeaderScrollMode,
    SideBarDirection, FooterType, FooterLogoAlign,
    HoverEffect, CardVariant, CardLabel,
} from "./types";

/*
 * styles-config.ts — QELLUM НОВИЙ ДИЗАЙН
 *
 * Що змінено:
 * - googleFonts: додано Fraunces + DM Sans, currentFontIndex → DM Sans
 * - layout.tsx треба оновити щоб завантажував обидва шрифти
 */

export const googleFonts: GoogleFont[] = [
    {
        name: "DM Sans",
        css: "'DM Sans', sans-serif",
        url: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap",
    },
    {
        name: "Fraunces",
        css: "'Fraunces', serif",
        url: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&display=swap",
    },
    { name: "Roboto",     css: "'Roboto', sans-serif",     url: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" },
    { name: "Inter",      css: "'Inter', sans-serif",      url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" },
    { name: "Outfit",     css: "'Outfit', sans-serif",     url: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" },
];

// DM Sans як основний body шрифт
export const currentFontIndex = 0;
export const currentFont = googleFonts[currentFontIndex];

// Fraunces для заголовків — підключається окремо в layout.tsx
export const headingFont = googleFonts[1];

export const buttonColors: Record<ButtonColor, string> = {
    primary:         "var(--primary-color)",
    secondary:       "var(--secondary-color)",
    tertiary:        "var(--tertiary-color)",
    quaternary:      "var(--quaternary-color)",
    success:         "var(--success-color)",
    warning:         "var(--warning-color)",
    danger:          "var(--error-color)",
    info:            "var(--info-color)",
    text:            "var(--text-primary)",
    textSecondary:   "var(--text-secondary)",
    muted:           "var(--text-muted)",
    inverse:         "var(--text-inverse)",
    hover:           "var(--button-hover)",
    link:            "var(--text-accent)",
    linkHover:       "var(--link-hover)",
    backgroundLight: "var(--background-light)",
    backgroundDark:  "var(--text-primary)",
    surface:         "var(--surface-color)",
    surfaceMuted:    "var(--surface-muted)",
    border:          "var(--border-color)",
    shadow:          "var(--shadow-color)",
};

export const headerStyles = {
    type:             "sticky" as HeaderType,
    sideBarDirection: "bottom" as SideBarDirection,
    linkColor:        "var(--text-secondary)",
    linkHoverColor:   "var(--text-primary)",
    scrollMode:       "solid" as HeaderScrollMode,
    scrollBackground: "var(--surface-color)",
    scrollBlur:       "0px",
};

export const drawerConfig = {
    anchor:       "left" as SideBarDirection,
    width:        "50%",
    padding:      "20px",
    logoWidth:    150,
    logoHeight:   50,
    contentGap:   "40px",
    navGap:       "20px",
    contentAlign: "center" as "flex-start" | "center" | "space-between" | "flex-end",
};

export const footerStyles = {
    type:             "columns" as FooterType,
    showTopBorder:    true,
    showBottomBorder: true,
    maxWidth:         1400,
    paddings:         { x: 40, y: 10 },
    gap:              30,
    columnsGap:       50,
    logo:             { width: 240, height: 100, align: "center" as FooterLogoAlign },
    colors: {
        bg:           "var(--primary-color)",
        title:        "var(--text-inverse)",
        text:         "var(--quaternary-color)",
        muted:        "var(--tertiary-color)",
        border:       "rgba(255, 255, 255, 0.12)",
        link:         "var(--quaternary-color)",
        linkHover:    "var(--surface-color)",
        contactLabel: "var(--tertiary-color)",
        contactHover: "var(--surface-color)",
        socialHover:  "var(--surface-color)",
    },
    grid:   { colsXL: 1, colsLG: 2, colsMD: 2, colsSM: 1 },
    font:   { size: 18, legalSize: 24 },
    sizes: {
        titles: { xl: 20, lg: 18, md: 18, sm: 16 },
        links:  { xl: 18, lg: 18, md: 18, sm: 16 },
        icons:  { xl: 26, lg: 24, md: 22, sm: 18 },
    },
    radius: "0",
    shadow: "none",
};

export const hoverEffects: Record<HoverEffect, { transform: string; shadow: string }> = {
    none:   { transform: "none",             shadow: "none" },
    shadow: { transform: "translateY(-3px)", shadow: "0 6px 20px rgba(27, 67, 50, 0.08)" },
    lift:   { transform: "translateY(-6px)", shadow: "0 12px 28px rgba(27, 67, 50, 0.11)" },
    glow:   { transform: "translateY(-3px)", shadow: "0 6px 20px rgba(27, 67, 50, 0.08)" },
    tilt:   { transform: "translateY(-3px)", shadow: "0 6px 20px rgba(27, 67, 50, 0.08)" },
};

export const cardVariants: Record<CardVariant, {
    border: string;
    background: string;
    hover: HoverEffect;
    label?: CardLabel;
}> = {
    basic: {
        border:     "1px solid var(--border-color)",
        background: "var(--surface-color)",
        hover:      "shadow",
    },
    highlight: {
        border:     "2px solid var(--primary-color)",
        background: "var(--surface-color)",
        hover:      "lift",
        label: {
            text:  "Most Popular",
            bg:    "var(--primary-color)",
            color: "var(--text-inverse)",
        },
    },
    premium: {
        border:     "2px solid var(--secondary-color)",
        background: "var(--surface-color)",
        hover:      "lift",
        label: {
            text:  "Premium",
            bg:    "var(--secondary-color)",
            color: "var(--text-inverse)",
        },
    },
};