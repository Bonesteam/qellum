"use client";

import { useMemo } from "react";
import { useI18n } from "@/context/i18nContext";
import { getDictionary } from "./dictionaries";

export function useTranslation() {
    const { lang, setLang } = useI18n();
    const t = useMemo(() => getDictionary(lang), [lang]);
    return { t, lang, setLang };
}
