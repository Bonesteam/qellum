import type {CSSProperties} from "react";

export type TextBlock = {
    type: "text";
    title?: string;
    description?: string;
    bullets?: string[];
    centerTitle?: boolean;
    centerDescription?: boolean;
    centerBullets?: boolean;
};

export type ContactFormBlock = {
    type: "custom";
    component: "ContactForm";
    title?: string;
    description?: string;
};

export type OgImageInput =
    | string
    | { title?: string; description?: string; bg?: string; color?: string };

export type MetaSchema = {
    title: string;
    description?: string;
    keywords?: string[];
    canonical?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: OgImageInput;
};

export type MediaBlock = {
    type: "media";
    mediaType: "image" | "video";
    src: string;
    width?: string;
    height?: string;
    alt?: string;
    controls?: boolean;
    loop?: boolean;
    autoPlay?: boolean;
    muted?: boolean;
};

export type SliderBlock = {
    type: "slider";
    images: string[];
};

export type FaqBlock = {
    type: "faq";
    image?: string;
    items: { question: string; answer: string }[];
};

export type CardBlock = {
    type: "card";
    image: string;
    title: string;
    description: string;
    buttonLink: string;
    buttonText: string;
};

export type AlignInput = "left" | "right" | "center" | "start" | "end";

export type SectionBlock = {
    type: "section";
    title?: string;
    description?: string;
    align?: AlignInput;
    gap?: string;
    left?: PageBlock;
    right?: PageBlock;
};

export type GridItem = {
    block: PageBlock;
    colSpan?: number;
    key?: string;
};

export type LegacyCard = {
    type?: "card" | "pricing";
    image?: string;
    title: string;
    description: string;
    buttonLink?: string;
    buttonText?: string;
    variant?: "starter" | "pro" | "premium" | "custom";
    price?: string;
    tokens?: number;
    features?: string[];
    badgeTop?: string;
    badgeBottom?: string;
};

export type GridBlock = {
    type: "grid";
    columns: number;
    gap?: string;
    style?: CSSProperties;
    items?: GridItem[];
    cards?: LegacyCard[];
};

export type PricingBlock = {
    type: "pricing";
    variant?: "starter" | "pro" | "premium" | "custom";
    title: string;
    price: string;
    tokens: number;
    description: string;
    features: string[];
    buttonText: string;
    buttonLink: string;
    badgeTop?: string;
    badgeBottom?: string;
};

// ---------------- Custom Blocks ----------------

export type MissionBannerBlock = {
    type: "custom";
    component: "MissionBanner";
    title: string;
    description: string;
    image?: string;
};

export type InfoBlock = {
    type: "custom";
    component: "InfoBlock";
    title?: string;
    description?: string;
    icon?: string;       // emoji або svg-клас
    image?: string;      // ключ з media
    bullets?: string[];
    align?: "left" | "center" | "right";
};

export type ValuesIconsBlock = {
    type: "custom";
    component: "ValuesIcons";
    title?: string;
    description?: string; // ✅ тепер можна передавати опис секції
    values: {
        icon: string;
        title: string;
        text?: string;
        description?: string; // ✅ дозволяємо description для item
    }[];
};


export type StoryTimelineBlock = {
    type: "custom";
    component: "StoryTimeline";
    steps: { year?: string; title: string; description: string }[];
};

export type TeamGridBlock = {
    type: "custom";
    component: "TeamGrid";
    title?: string;
    description?: string;
    members: {
        name: string;
        role: string;
        bio: string;
        image: string
    }[];
};


export type CardSliderBlock = {
    type: "custom";
    component: "CardSlider";
    cards: {
        image: string;
        title: string;
        description: string;
        buttonText?: string;
        buttonLink?: string;
    }[];
};

export type HighlightStripBlock = {
    type: "custom";
    component: "HighlightStrip";
    items?: {
        icon: string;
        text: string;
        color?: string;
    }[];
    messages?: string[];
};

export type MarqueeBlock = {
    type: "custom";
    component: "Marquee";
    items: { text: string }[];
};

export type VideoDemoBlock = {
    type: "custom";
    component: "VideoDemo";
    title?: string;
    description?: string;
    video: string;
};


export type TimelineBlock = {
    type: "custom";
    component: "Timeline";
    title?: string;
    steps: { title: string; description: string }[];
};


export type LogoBlock = {
    type: "custom";
    component: "LogoBlock";
    width?: number;
    height?: number;
};

export type HeroSectionBlock = {
    type: "custom";
    component: "HeroSection";
    title: string;
    highlight?: string;
    description: string;
    primaryCta?: { text: string; link: string };
    secondaryCta?: { text: string; link: string };
    image?: string;
    mediaType?: "image" | "video";
    align?: "left" | "right";
};

export type TestimonialsSliderBlock = {
    type: "custom";
    component: "TestimonialsSlider";
    title?: string;
    description?: string;
    testimonials: {
        name: string;
        role?: string;
        image?: string;
        text: string;
        rating?: number;
    }[];
};

export type CalorieCalculatorBlock = {
    type: "custom";
    component: "CalorieCalculator";
};

export type NutritionFactsTickerBlock = {
    type: "custom";
    component: "NutritionFactsTicker";
};

export type SeasonalMenuPreviewBlock = {
    type: "custom";
    component: "SeasonalMenuPreview";
    title?: string;
    description?: string;
    ctaText?: string;
    ctaLink?: string;
    seasons?: {
        label: string;
        icon: string;
        color: string;
        dishes: {
            name: string;
            description: string;
            tags?: string[];
            kcal?: number;
        }[];
    }[];
};

export type ChefMatchTeaserBlock = {
    type: "custom";
    component: "ChefMatchTeaser";
    title?: string;
    description?: string;
    ctaLink?: string;
};

// ---------------- Union Types ----------------

export type CustomBlock =
    | MissionBannerBlock
    | ValuesIconsBlock
    | StoryTimelineBlock
    | TeamGridBlock
    | CardSliderBlock
    | HighlightStripBlock
    | MarqueeBlock
    | ContactFormBlock
    | TimelineBlock
    | LogoBlock
    | HeroSectionBlock
    | TestimonialsSliderBlock
    | VideoDemoBlock
    | CalorieCalculatorBlock
    | NutritionFactsTickerBlock
    | SeasonalMenuPreviewBlock
    | ChefMatchTeaserBlock
    | InfoBlock;

export type PageBlock =
    | TextBlock
    | MediaBlock
    | SliderBlock
    | FaqBlock
    | CardBlock
    | SectionBlock
    | PricingBlock
    | GridBlock
    | CustomBlock;

export type PageSchema = {
    meta: MetaSchema;
    blocks: PageBlock[];
};
