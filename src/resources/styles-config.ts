import {
    GoogleFont,
    ButtonColor,
    HeaderType,
    HeaderScrollMode,
    SideBarDirection,
    FooterType,
    FooterLogoAlign,
    HoverEffect,
    CardVariant,
    CardLabel,
} from "./types";

// Шрифти
export const googleFonts: GoogleFont[] = [
    { name: "Roboto", css: "'Roboto', sans-serif", url: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" },
    { name: "Inter", css: "'Inter', sans-serif", url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" },
    { name: "Montserrat", css: "'Montserrat', sans-serif", url: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" },
    { name: "Poppins", css: "'Poppins', sans-serif", url: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" },
    { name: "Outfit", css: "'Outfit', sans-serif", url: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" },
];

export const currentFontIndex = 4;
export const currentFont = googleFonts[currentFontIndex];

// Кольори для кнопок
export const buttonColors: Record<ButtonColor, string> = {
    primary: "var(--primary-color)",
    secondary: "var(--secondary-color)",
    tertiary: "var(--tertiary-color)",
    quaternary: "var(--quaternary-color)",
    success: "var(--success-color)",
    warning: "var(--warning-color)",
    danger: "var(--error-color)",
    info: "var(--info-color)",
    text: "var(--text-primary)",
    textSecondary: "var(--text-secondary)",
    muted: "var(--text-muted)",
    inverse: "var(--text-inverse)",
    hover: "var(--button-hover)",
    link: "var(--text-accent)",
    linkHover: "var(--link-hover)",
    backgroundLight: "var(--background-light)",
    backgroundDark: "var(--text-primary)",
    surface: "var(--surface-color)",
    surfaceMuted: "var(--surface-muted)",
    border: "var(--border-color)",
    shadow: "var(--shadow-color)",
};

// Header
export const headerStyles = {
    type: "sticky-rounded" as HeaderType,
    sideBarDirection: "bottom" as SideBarDirection,
    linkColor: "var(--text-primary)",
    linkHoverColor: "var(--link-hover)",
    scrollMode: "blur" as HeaderScrollMode,
    scrollBackground: "var(--quaternary-color)",
    scrollBlur: "50px",
};

// Drawer
export const drawerConfig = {
    anchor: "left" as SideBarDirection,
    width: "50%",
    padding: "20px",
    logoWidth: 150,
    logoHeight: 50,
    contentGap: "40px",
    navGap: "20px",
    contentAlign: "center" as "flex-start" | "center" | "space-between" | "flex-end",
};

// Footer
export const footerStyles = {
    type: "columns" as FooterType,
    showTopBorder: true,
    showBottomBorder: true,
    maxWidth: 1400,
    paddings: { x: 40, y: 10 },
    gap: 30,
    columnsGap: 50,
    logo: { width: 240, height: 100, align: "center" as FooterLogoAlign },
    colors: {
        bg: "var(--primary-color)",
        title: "var(--text-inverse)",
        text: "var(--quaternary-color)",
        muted: "var(--tertiary-color)",
        border: "rgba(255, 255, 255, 0.15)",
        link: "var(--quaternary-color)",
        linkHover: "var(--tertiary-color)",
        contactLabel: "var(--tertiary-color)",
        contactHover: "var(--surface-color)",
        socialHover: "var(--surface-color)",
    },
    grid: { colsXL: 1, colsLG: 2, colsMD: 2, colsSM: 1 },
    font: { size: 18, legalSize: 24 },
    sizes: {
        titles: { xl: 20, lg: 18, md: 18, sm: 16 },
        links: { xl: 18, lg: 18, md: 18, sm: 16 },
        icons: { xl: 26, lg: 24, md: 22, sm: 18 },
    },
    radius: "0",
    shadow: "none",
};

// Hover effects
export const hoverEffects: Record<HoverEffect, { transform: string; shadow: string }> = {
    none: { transform: "none", shadow: "none" },
    shadow: { transform: "translateY(-6px)", shadow: "0 20px 40px rgba(45, 90, 39, 0.12)" },
    lift: { transform: "translateY(-10px)", shadow: "0 24px 48px rgba(45, 90, 39, 0.16)" },
    glow: { transform: "scale(1.025)", shadow: "0 0 25px rgba(184, 134, 11, 0.35), 0 0 45px rgba(45, 90, 39, 0.15)" },
    tilt: { transform: "rotate3d(1, 1, 0, 4deg) scale(1.02)", shadow: "0 20px 35px rgba(184, 134, 11, 0.2)" },
};

// Card variants
export const cardVariants: Record<CardVariant, {
    border: string;
    background: string;
    hover: HoverEffect;
    label?: CardLabel;
}> = {
    basic: {
        border: "1px solid rgba(223, 218, 208, 0.6)",
        background: "rgba(255, 255, 255, 0.5)",
        hover: "shadow",
    },
    highlight: {
        border: "1px solid rgba(45, 90, 39, 0.3)",
        background: "linear-gradient(145deg, rgba(241, 246, 240, 0.75), rgba(230, 239, 228, 0.8))",
        hover: "lift",
        label: {
            text: "Most Popular",
            bg: "linear-gradient(135deg, var(--primary-color), #558b2f)",
            color: "#fff",
        },
    },
    premium: {
        border: "1px solid rgba(184, 134, 11, 0.3)",
        background: "linear-gradient(145deg, rgba(251, 247, 236, 0.75), rgba(244, 236, 210, 0.8))",
        hover: "glow",
        label: {
            text: "Premium",
            bg: "linear-gradient(135deg, var(--secondary-color), #daa520)",
            color: "#fff",
        },
    },
};

