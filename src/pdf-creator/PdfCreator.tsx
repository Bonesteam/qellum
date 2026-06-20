"use client";
import React from "react";
import { Document, Page, Text, View, pdf } from "@react-pdf/renderer";
import { UniversalOrderType } from "@/backend/types/universal.types";
import { pdfStylesAI, pdfStylesCoach } from "./pdfTheme";
import { COMPANY_NAME, COMPANY_PHONE } from "@/resources/constants";

// локальний тип для об'єкта стилів (спрощений)
type PDFStyles = any;

// 🧼 Очистка текста от невидимых символов, эмодзи и markdown
function cleanText(raw: string) {
    if (!raw) return "";

    return String(raw)
        // убрать суррогатные пары (в т.ч. эмодзи и символы вне BMP)
        .replace(/[\uD800-\uDFFF]/g, "")
        // variation selectors (часто остаются от эмодзи)
        .replace(/[\uFE00-\uFE0F]/g, "")
        // управляющие символы
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
        // невидимые zero-width и подобные
        .replace(/[\u200B-\u200D\u2060]/g, "")
        // неразрывный пробел -> обычный пробел
        .replace(/\u00A0/g, " ")
        // лишние символы разметки/разделители
        .replace(/[•·¨|=<>_#]/g, "")
        // жирный markdown **text** -> text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        // нормализация тире
        .replace(/---+/g, "—")
        // перевод строк к \n
        .replace(/(\r\n|\r|\n)/g, "\n")
        // убрать повторяющиеся пробелы и пустые строки
        .replace(/\s{2,}/g, " ")
        .replace(/\n{2,}/g, "\n")
        .trim();
}

// 🧩 Таблиця (універсальна)
const Table = ({ headers, rows, styles }: { headers: string[]; rows: string[][]; styles: PDFStyles }) => (
    <View style={styles.table}>
        <View style={styles.tableRow}>
            {headers.map((h, i) => (
                <Text key={i} style={styles.tableCellHeader}>
                    {cleanText(h)}
                </Text>
            ))}
        </View>
        {rows.map((row, i) => (
            <View key={i} style={styles.tableRow}>
                {row.map((cell, j) => (
                    <Text key={j} style={styles.tableCell}>
                        {cleanText(cell)}
                    </Text>
                ))}
            </View>
        ))}
    </View>
);

// 🛠️ Попытка извлечь JSON из произвольного текста (кодовые блоки, префиксы типа "json", или окружающий текст)
function extractJSONFromText(raw: string) {
    if (!raw) return null;
    let t = String(raw).trim();

    // 1) Если есть кодовый блок ```json ... ``` или ``` ... ``` — взять внутренность
    const codeBlock = t.match(/```(?:\w+)?\s*([\s\S]*?)\s*```/i);
    if (codeBlock && codeBlock[1]) {
        t = codeBlock[1].trim();
    }

    // 2) Убрать возможный префикс вида "json" или "json:" перед объектом
    t = t.replace(/^[`"'\s]*json[:\s]*/i, "").trim();

    // 3) Найти первый {...} или [...]
    const firstBrace = t.indexOf("{");
    const lastBrace = t.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        const candidate = t.slice(firstBrace, lastBrace + 1);
        try {
            return JSON.parse(candidate);
        } catch (e) {
            // fallthrough
        }
    }

    const firstArr = t.indexOf("[");
    const lastArr = t.lastIndexOf("]");
    if (firstArr !== -1 && lastArr !== -1 && lastArr > firstArr) {
        const candidate = t.slice(firstArr, lastArr + 1);
        try {
            return JSON.parse(candidate);
        } catch (e) {
            // fallthrough
        }
    }

    // 4) Последняя попытка: попробовать распарсить весь текст
    try {
        return JSON.parse(t);
    } catch (e) {
        return null;
    }
}

// ===== РЕНДЕР ДНІВ: AI =====
function renderTrainingDaysAI(text: string, styles: PDFStyles) {
    const cleaned = cleanText(text);
    const sections = cleaned.split(/Day\s*\d+:/i);
    const days = cleaned.match(/Day\s*\d+:/gi) || [];

    if (!days.length) return <Text style={styles.paragraph}>{cleaned}</Text>;

    return sections.map((content, i) => {
        if (i === 0) return null;
        const title = cleanText(days[i - 1].trim());
        return (
            <View key={i} style={styles.dayBlock}>
                <Text style={styles.dayTitle}>{title}</Text>
                {content
                    .split(/\n+/)
                    .filter((line) => line.trim())
                    .map((line, idx) => {
                        const l = cleanText(line);
                        if (l.startsWith("- Focus:"))
                            return (
                                <Text key={idx} style={styles.focus}>
                                    {l.replace("- Focus:", "Focus:").trim()}
                                </Text>
                            );
                        if (l.startsWith("- Tip:"))
                            return (
                                <Text key={idx} style={styles.tip}>
                                    {l.replace("- Tip:", "Tip:").trim()}
                                </Text>
                            );
                        return (
                            <Text key={idx} style={styles.paragraph}>
                                {l.trim()}
                            </Text>
                        );
                    })}
            </View>
        );
    });
}

// ===== РЕНДЕР ДНІВ: COACH (нова структура) =====
function renderTrainingDaysCoach(text: string, styles: PDFStyles) {
    const cleaned = cleanText(text);
    const sections = cleaned.split(/Day\s*\d+:/i);
    const dayTokens = cleaned.match(/Day\s*\d+:/gi) || [];

    if (!dayTokens.length) return <Text style={styles.paragraph}>{cleaned}</Text>;

    return sections.map((content, i) => {
        if (i === 0) return null;
        const token = dayTokens[i - 1];
        const dayIndex = (token.match(/\d+/)?.[0] || String(i));
        const lines = content.split(/\n+/).map((l) => cleanText(l)).filter((l) => l.trim());

        const focusLines = lines.filter((l) => l.toLowerCase().startsWith("- focus:"));
        const tipLines = lines.filter((l) => l.toLowerCase().startsWith("- tip:"));
        const bulletLines = lines.filter((l) => !l.toLowerCase().startsWith("- focus:") && !l.toLowerCase().startsWith("- tip:"));

        // розкладемо пункти у 2 колонки
        const mid = Math.ceil(bulletLines.length / 2);
        const colLeft = bulletLines.slice(0, mid);
        const colRight = bulletLines.slice(mid);

        return (
            <View key={i} style={styles.dayCard}>
                <View style={styles.dayHeader}>
                    <Text style={styles.dayIndex}>Day {dayIndex}</Text>
                    <Text style={styles.dayTitle}>Meal</Text>
                </View>
                <View style={styles.dayBody}>
                    {focusLines.map((f, idx) => (
                        <Text key={`f-${idx}`} style={styles.bullet}>{f.replace(/^-\s*focus:/i, "Focus:").trim()}</Text>
                    ))}

                    <View style={styles.dayRow}>
                        <View style={styles.dayCol}>
                            {colLeft.map((b, idx) => (
                                <Text key={`l-${idx}`} style={styles.bullet}>{b.replace(/^-/,'•').trim()}</Text>
                            ))}
                        </View>
                        <View style={styles.dayCol}>
                            {colRight.map((b, idx) => (
                                <Text key={`r-${idx}`} style={styles.bullet}>{b.replace(/^-/,'•').trim()}</Text>
                            ))}
                        </View>
                    </View>

                    {tipLines.length > 0 && (
                        <View style={styles.noteBox}>
                            {tipLines.map((t, idx) => (
                                <Text key={`t-${idx}`} style={styles.paragraph}>{t.replace(/^-\s*tip:/i, "Tip:").trim()}</Text>
                            ))}
                        </View>
                    )}
                </View>
            </View>
        );
    });
}

// ===== EXTRAS: AI =====
function renderExtrasAI(extras: Record<string, string>, styles: PDFStyles) {
    const entries = Object.entries(extras);
    if (entries.length === 0) return null;

    return (
        <>
            {entries.map(([key, val]) => {
                const preparedTitle =
                    key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()) ||
                    "Extra Section";
                const title = cleanText(preparedTitle);
                const cleaned = cleanText(val);

                if (key === "tracking") {
                    return (
                        <Page key={key} style={styles.extrasPage}>
                            <Text style={styles.extrasTitle}>Progress Tracking</Text>
                            <View style={styles.extrasContent}>
                                <Text style={styles.extrasParagraph}>
                                    {cleanText("Keep track of your workouts, nutrition, and progress daily.")}
                                </Text>
                                <Table
                                    styles={styles}
                                    headers={["Day", "Workout Type", "Duration", "Notes"]}
                                    rows={Array.from({ length: 7 }).map((_, i) => [
                                        `${i + 1}`,
                                        "",
                                        "",
                                        "",
                                    ])}
                                />
                            </View>
                        </Page>
                    );
                }

                // === Structured: Custom Allergies ===
                if (key === "customAllergies" || key.toLowerCase().includes("allerg")) {
                    let parsed: any = null;
                    try {
                        parsed = JSON.parse(cleaned);
                    } catch (e) {
                        parsed = null;
                    }

                    if (parsed && (Array.isArray(parsed.allergies) || Array.isArray(parsed.allergy))) {
                        const list = parsed.allergies || parsed.allergy;
                        const rows = list.map((a: any) => [a.foodItem || a.food || "", a.reaction || "", a.recommendations || ""]);
                        return (
                            <Page key={key} style={styles.extrasPage}>
                                <Text style={styles.extrasTitle}>{title}</Text>
                                <View style={styles.extrasContent}>
                                    <Table styles={styles} headers={["Food Item", "Reaction", "Recommendations"]} rows={rows} />
                                </View>
                            </Page>
                        );
                    }

                    const lines = cleaned.split(/\n+/).filter((l) => l.trim());
                    return (
                        <Page key={key} style={styles.extrasPage}>
                            <Text style={styles.extrasTitle}>{title}</Text>
                            <View style={styles.extrasContent}>
                                {lines.map((line, i) => (
                                    <Text key={i} style={styles.extrasParagraph}>{cleanText(line.trim())}</Text>
                                ))}
                            </View>
                        </Page>
                    );
                }

                // === Structured: Taste Profile ===
                if (key === "tasteProfile" || key.toLowerCase().includes("taste")) {
                    let parsed: any = null;
                    try {
                        parsed = JSON.parse(cleaned);
                    } catch (e) {
                        parsed = null;
                    }

                    if (parsed && typeof parsed === "object") {
                        const tp = parsed.tasteProfile || parsed;
                        return (
                            <Page key={key} style={styles.extrasPage}>
                                <Text style={styles.extrasTitle}>Taste Profile</Text>
                                <View style={styles.extrasContent}>
                                    <Text style={styles.extrasParagraph}><Text style={{fontWeight: 'bold'}}>Name: </Text>{cleanText(tp.fullName || "")}</Text>
                                    <Text style={styles.extrasParagraph}><Text style={{fontWeight: 'bold'}}>Goal: </Text>{cleanText(tp.goal || "")}</Text>
                                    <Text style={styles.extrasParagraph}><Text style={{fontWeight: 'bold'}}>Dietary Preference: </Text>{cleanText(tp.dietaryPreference || "")}</Text>

                                    <Text style={styles.extrasSubtitle}>Flavors</Text>
                                    <Text style={styles.extrasParagraph}>Preferred: {Array.isArray(tp.flavors?.preferred) ? tp.flavors.preferred.join(', ') : ''}</Text>
                                    <Text style={styles.extrasParagraph}>Disliked: {Array.isArray(tp.flavors?.disliked) ? tp.flavors.disliked.join(', ') : ''}</Text>

                                    <Text style={styles.extrasSubtitle}>Cuisines</Text>
                                    <Text style={styles.extrasParagraph}>{Array.isArray(tp.cuisines) ? tp.cuisines.join(', ') : ''}</Text>

                                    <Text style={styles.extrasSubtitle}>Ingredients</Text>
                                    <Text style={styles.extrasParagraph}>Likes: {Array.isArray(tp.ingredients?.likes) ? tp.ingredients.likes.join(', ') : ''}</Text>
                                    <Text style={styles.extrasParagraph}>Dislikes: {Array.isArray(tp.ingredients?.dislikes) ? tp.ingredients.dislikes.join(', ') : ''}</Text>

                                    <Text style={styles.extrasSubtitle}>Meal Preferences</Text>
                                    <Text style={styles.extrasParagraph}>Breakfast: {Array.isArray(tp.mealPreferences?.breakfast) ? tp.mealPreferences.breakfast.join(', ') : ''}</Text>
                                    <Text style={styles.extrasParagraph}>Lunch: {Array.isArray(tp.mealPreferences?.lunch) ? tp.mealPreferences.lunch.join(', ') : ''}</Text>
                                    <Text style={styles.extrasParagraph}>Dinner: {Array.isArray(tp.mealPreferences?.dinner) ? tp.mealPreferences.dinner.join(', ') : ''}</Text>
                                    <Text style={styles.extrasParagraph}>Snacks: {Array.isArray(tp.mealPreferences?.snacks) ? tp.mealPreferences.snacks.join(', ') : ''}</Text>

                                    <Text style={styles.extrasSubtitle}>Cooking Style</Text>
                                    <Text style={styles.extrasParagraph}>{Array.isArray(tp.cookingStyle) ? tp.cookingStyle.join(', ') : ''}</Text>

                                    <Text style={styles.extrasSubtitle}>Allergies</Text>
                                    <Text style={styles.extrasParagraph}>{Array.isArray(tp.allergies) ? tp.allergies.join(', ') : 'None'}</Text>

                                    <Text style={styles.extrasSubtitle}>Special Requests</Text>
                                    <Text style={styles.extrasParagraph}>{cleanText(tp.specialRequests || '')}</Text>
                                </View>
                            </Page>
                        );
                    }
                }

                // === Structured: Grocery List Localized ===
                if (key === "groceryListLocalized" || key.toLowerCase().includes("grocery")) {
                    // Try to extract JSON even if wrapped in fences or mixed with text
                    const parsed = extractJSONFromText(val) || extractJSONFromText(cleaned);
                    if (parsed && typeof parsed === "object") {
                        const obj = parsed.groceryListLocalized || parsed;
                        return (
                            <Page key={key} style={styles.extrasPage}>
                                <Text style={styles.extrasTitle}>{title}</Text>
                                <View style={styles.extrasContent}>
                                    {Object.entries(obj).map(([cat, items]: any, idx) => (
                                        <View key={idx} style={styles.extrasSection}>
                                            <Text style={styles.extrasSubtitle}>{cleanText(cat.charAt(0).toUpperCase() + cat.slice(1))}</Text>
                                            {Array.isArray(items) ? (
                                                items.map((it: string, i2: number) => (
                                                    <Text key={i2} style={styles.extrasParagraph}>• {cleanText(String(it))}</Text>
                                                ))
                                            ) : (
                                                <Text style={styles.extrasParagraph}>{cleanText(String(items))}</Text>
                                            )}
                                        </View>
                                    ))}
                                </View>
                            </Page>
                        );
                    }

                    // Fallback: support checklist-style lines like "- [ ] Item" or "- Item"
                    const lines = cleaned.split(/\n+/).map(l => l.trim()).filter(l => l);
                    // Group lines under categories if headings like "- Produce:" or "Produce:" are present
                    const groups: Record<string, string[]> = {};
                    let currentCat = "General";
                    for (const line of lines) {
                        // category header patterns: "Produce:", "- Produce:", or just "Produce" on its own line
                        const catMatch = line.match(/^[-\s]*([A-Za-z\s]+):\s*$/);
                        if (catMatch) {
                            currentCat = catMatch[1].trim();
                            groups[currentCat] = groups[currentCat] || [];
                            continue;
                        }

                        // checklist items: "- [ ] Item", "- Item", "• Item"
                        const itemMatch = line.match(/^(?:[-•]\s*\[?\s*\]?\s*)?(.*)$/);
                        if (itemMatch) {
                            const item = itemMatch[1].trim();
                            if (!groups[currentCat]) groups[currentCat] = [];
                            groups[currentCat].push(item);
                        }
                    }

                    if (Object.keys(groups).length > 0) {
                        return (
                            <Page key={key} style={styles.extrasPage}>
                                <Text style={styles.extrasTitle}>{title}</Text>
                                <View style={styles.extrasContent}>
                                    {Object.entries(groups).map(([cat, items], idx) => (
                                        <View key={idx} style={styles.extrasSection}>
                                            <Text style={styles.extrasSubtitle}>{cleanText(cat)}</Text>
                                            {items.map((it, i2) => (
                                                <Text key={i2} style={styles.extrasParagraph}>☐ {cleanText(it)}</Text>
                                            ))}
                                        </View>
                                    ))}
                                </View>
                            </Page>
                        );
                    }
                    // otherwise just print the cleaned lines
                    return (
                        <Page key={key} style={styles.extrasPage}>
                            <Text style={styles.extrasTitle}>{title}</Text>
                            <View style={styles.extrasContent}>
                                {lines.map((line, i) => (
                                    <Text key={i} style={styles.extrasParagraph}>{cleanText(line)}</Text>
                                ))}
                            </View>
                        </Page>
                    );
                }

                // === Structured: Grocery Cost Estimates ===
                if (key === "groceryCostEstimates" || key.toLowerCase().includes("cost")) {
                    // попытка извлечь JSON даже если модель вернула его в кодовом блоке или с префиксом
                    const parsed = extractJSONFromText(val) || extractJSONFromText(cleaned);
                    if (parsed && typeof parsed === "object") {
                        const rows = Object.entries(parsed).map(([k, v]) => [k, String(v)]);
                        return (
                            <Page key={key} style={styles.extrasPage}>
                                <Text style={styles.extrasTitle}>{title}</Text>
                                <View style={styles.extrasContent}>
                                    <Table styles={styles} headers={["Category", "Estimated Cost"]} rows={rows} />
                                </View>
                            </Page>
                        );
                    }

                    // Fallback: попытаться вытянуть пары "ключ: значение" из текста
                    const lines = cleaned.split(/\n+/).map(l => l.trim()).filter(l => l);
                    const kvRows: string[][] = [];
                    for (const line of lines) {
                        const m = line.match(/([A-Za-z\s]+)[:\-–]\s*\$?\s*(\d+[\d,.]*)/);
                        if (m) {
                            kvRows.push([m[1].trim(), m[2].trim()]);
                        }
                    }

                    if (kvRows.length > 0) {
                        return (
                            <Page key={key} style={styles.extrasPage}>
                                <Text style={styles.extrasTitle}>{title}</Text>
                                <View style={styles.extrasContent}>
                                    <Table styles={styles} headers={["Category", "Estimated Cost"]} rows={kvRows} />
                                </View>
                            </Page>
                        );
                    }

                    // последний падение: просто отобразить очищенный текст
                    const fallbackLines = cleaned.split(/\n+/).filter(l => l.trim());
                    return (
                        <Page key={key} style={styles.extrasPage}>
                            <Text style={styles.extrasTitle}>{title}</Text>
                            <View style={styles.extrasContent}>
                                {fallbackLines.map((line, i) => (
                                    <Text key={i} style={styles.extrasParagraph}>{cleanText(line)}</Text>
                                ))}
                            </View>
                        </Page>
                    );
                }

                // === Structured: Variation Swaps ===
                if (key === "variationSwaps" || key.toLowerCase().includes("variation")) {
                    let parsed: any = null;
                    try {
                        parsed = JSON.parse(cleaned);
                    } catch (e) {
                        parsed = null;
                    }
                    if (Array.isArray(parsed)) {
                        const rows = parsed.map((p: any) => [p.recipe || "", (p.variations || []).join(", ")]);
                        return (
                            <Page key={key} style={styles.extrasPage}>
                                <Text style={styles.extrasTitle}>{title}</Text>
                                <View style={styles.extrasContent}>
                                    <Table styles={styles} headers={["Recipe", "Variations"]} rows={rows} />
                                </View>
                            </Page>
                        );
                    }
                }

                // === Structured: Ingredient Prep Tips ===
                if (key === "ingredientPrepTips" || key.toLowerCase().includes("prep")) {
                    let parsed: any = null;
                    try {
                        parsed = JSON.parse(cleaned);
                    } catch (e) {
                        parsed = null;
                    }
                    if (parsed && typeof parsed === "object") {
                        const rows = Object.entries(parsed).map(([k, v]) => [k, String(v)]);
                        return (
                            <Page key={key} style={styles.extrasPage}>
                                <Text style={styles.extrasTitle}>{title}</Text>
                                <View style={styles.extrasContent}>
                                    <Table styles={styles} headers={["Ingredient", "Tip"]} rows={rows} />
                                </View>
                            </Page>
                        );
                    }
                }

                // === Structured: Hydration Schedule ===
                if (key === "hydrationSchedule" || key.toLowerCase().includes("hydrate")) {
                    const lines = cleaned.split(/\n+/).filter((l) => l.trim());
                    return (
                        <Page key={key} style={styles.extrasPage}>
                            <Text style={styles.extrasTitle}>{title}</Text>
                            <View style={styles.extrasContent}>
                                {lines.map((line, i) => (
                                    <Text key={i} style={styles.extrasParagraph}>{cleanText(line)}</Text>
                                ))}
                            </View>
                        </Page>
                    );
                }

                // === Structured: Grocery List Localized ===
                if (key === "groceryListLocalized" || key.toLowerCase().includes("grocery")) {
                    let parsed: any = null;
                    try {
                        parsed = JSON.parse(cleaned);
                    } catch (e) {
                        parsed = null;
                    }

                    if (parsed && typeof parsed === "object") {
                        const obj = parsed.groceryListLocalized || parsed;
                        return (
                            <Page key={key} style={styles.extrasPage}>
                                <Text style={styles.extrasTitle}>{title}</Text>
                                <View style={styles.extrasContent}>
                                    {Object.entries(obj).map(([cat, items]: any, idx) => (
                                        <View key={idx} style={styles.extrasSection}>
                                            <Text style={styles.extrasSubtitle}>{cleanText(cat.charAt(0).toUpperCase() + cat.slice(1))}</Text>
                                            {Array.isArray(items) ? (
                                                items.map((it: string, i2: number) => (
                                                    <Text key={i2} style={styles.extrasParagraph}>• {cleanText(String(it))}</Text>
                                                ))
                                            ) : (
                                                <Text style={styles.extrasParagraph}>{cleanText(String(items))}</Text>
                                            )}
                                        </View>
                                    ))}
                                </View>
                            </Page>
                        );
                    }

                    const lines = cleaned.split(/\n+/).filter((l) => l.trim());
                    return (
                        <Page key={key} style={styles.extrasPage}>
                            <Text style={styles.extrasTitle}>{title}</Text>
                            <View style={styles.extrasContent}>
                                {lines.map((line, i) => (
                                    <Text key={i} style={styles.extrasParagraph}>{cleanText(line.trim())}</Text>
                                ))}
                            </View>
                        </Page>
                    );
                }

                // === Structured: Custom Allergies (JSON or plain text) ===
                if (key === "customAllergies" || key.toLowerCase().includes("allerg")) {
                    let parsed: any = null;
                    try {
                        parsed = JSON.parse(cleaned);
                    } catch (e) {
                        // try to parse if extra wrapper present
                        try {
                            const maybe = cleaned.replace(/^[`\s]*json/i, "").trim();
                            parsed = JSON.parse(maybe);
                        } catch (_e) {
                            parsed = null;
                        }
                    }

                    // if parsed and has allergies array, render table
                    if (parsed && (Array.isArray(parsed.allergies) || Array.isArray(parsed.allergy))) {
                        const list = parsed.allergies || parsed.allergy;
                        const rows = list.map((a: any) => [a.foodItem || a.food || "", a.reaction || "", a.recommendations || ""]);
                        return (
                            <Page key={key} style={styles.extrasPage}>
                                <Text style={styles.extrasTitle}>{title}</Text>
                                <View style={styles.extrasContent}>
                                    <Table styles={styles} headers={["Food Item", "Reaction", "Recommendations"]} rows={rows} />
                                </View>
                            </Page>
                        );
                    }

                    // fallback: print cleaned lines
                    const lines = cleaned.split(/\n+/).filter((l) => l.trim());
                    return (
                        <Page key={key} style={styles.extrasPage}>
                            <Text style={styles.extrasTitle}>{title}</Text>
                            <View style={styles.extrasContent}>
                                {lines.map((line, i) => (
                                    <Text key={i} style={styles.extrasParagraph}>{cleanText(line.trim())}</Text>
                                ))}
                            </View>
                        </Page>
                    );
                }

                // === Structured: Grocery List Localized ===
                if (key === "groceryListLocalized" || key.toLowerCase().includes("grocery")) {
                    let parsed: any = null;
                    try {
                        parsed = JSON.parse(cleaned);
                    } catch (e) {
                        parsed = null;
                    }

                    if (parsed && typeof parsed === "object") {
                        const obj = parsed.groceryListLocalized || parsed;
                        return (
                            <Page key={key} style={styles.extrasPage}>
                                <Text style={styles.extrasTitle}>{title}</Text>
                                <View style={styles.extrasContent}>
                                    {Object.entries(obj).map(([cat, items]: any, idx) => (
                                        <View key={idx} style={styles.extrasSection}>
                                            <Text style={styles.extrasSubtitle}>{cleanText(cat.charAt(0).toUpperCase() + cat.slice(1))}</Text>
                                            {Array.isArray(items) ? (
                                                items.map((it: string, i2: number) => (
                                                    <Text key={i2} style={styles.extrasParagraph}>• {cleanText(String(it))}</Text>
                                                ))
                                            ) : (
                                                <Text style={styles.extrasParagraph}>{cleanText(String(items))}</Text>
                                            )}
                                        </View>
                                    ))}
                                </View>
                            </Page>
                        );
                    }
                    // fallback
                    const lines = cleaned.split(/\n+/).filter((l) => l.trim());
                    return (
                        <Page key={key} style={styles.extrasPage}>
                            <Text style={styles.extrasTitle}>{title}</Text>
                            <View style={styles.extrasContent}>
                                {lines.map((line, i) => (
                                    <Text key={i} style={styles.extrasParagraph}>{cleanText(line.trim())}</Text>
                                ))}
                            </View>
                        </Page>
                    );
                }

                if (key === "disciplineTracker") {
                    return (
                        <Page key={key} style={styles.extrasPage}>
                            <Text style={styles.extrasTitle}>Discipline Tracker</Text>
                            <View style={styles.extrasContent}>
                                <Table
                                    styles={styles}
                                    headers={["Day", "Activity", "Duration", "Comment"]}
                                    rows={Array.from({ length: 14 }).map((_, i) => [
                                        `${i + 1}`,
                                        "",
                                        "",
                                        "",
                                    ])}
                                />
                                <Text style={styles.extrasParagraph}>
                                    {cleanText("Stay consistent — mark every completed workout here.")}
                                </Text>
                            </View>
                        </Page>
                    );
                }

                const lines = cleaned.split(/\n+/).filter((l) => l.trim());
                return (
                    <Page key={key} style={styles.extrasPage}>
                        <Text style={styles.extrasTitle}>{title}</Text>
                        <View style={styles.extrasContent}>
                            {lines.map((line, i) => (
                                <Text key={i} style={styles.extrasParagraph}>
                                    {cleanText(line.trim())}
                                </Text>
                            ))}
                        </View>
                    </Page>
                );
            })}
        </>
    );
}

// ===== EXTRAS: COACH (нова структура сіткою) =====
function renderExtrasCoach(extras: Record<string, string>, styles: PDFStyles) {
    const entries = Object.entries(extras);
    if (entries.length === 0) return null;

    return (
        <>
            {entries.map(([key, val]) => {
                const preparedTitle =
                    key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()) ||
                    "Extra Section";
                const title = cleanText(preparedTitle);
                const cleaned = cleanText(val);

                if (key === "tracking") {
                    return (
                        <Page key={key} style={styles.extrasPage}>
                            <Text style={styles.extrasTitle}>Progress Tracking</Text>
                            <View style={styles.extrasContent}>
                                <Table
                                    styles={styles}
                                    headers={["Day", "Workout Type", "Duration", "Notes"]}
                                    rows={Array.from({ length: 7 }).map((_, i) => [
                                        `${i + 1}`,
                                        "",
                                        "",
                                        "",
                                    ])}
                                />
                            </View>
                        </Page>
                    );
                }

                if (key === "disciplineTracker") {
                    return (
                        <Page key={key} style={styles.extrasPage}>
                            <Text style={styles.extrasTitle}>Discipline Tracker</Text>
                            <View style={styles.extrasContent}>
                                <Table
                                    styles={styles}
                                    headers={["Day", "Activity", "Duration", "Comment"]}
                                    rows={Array.from({ length: 14 }).map((_, i) => [
                                        `${i + 1}`,
                                        "",
                                        "",
                                        "",
                                    ])}
                                />
                            </View>
                        </Page>
                    );
                }

                const lines = cleaned.split(/\n+/).filter((l) => l.trim());
                // перетворюємо в сітку 2xN
                const rows: string[][] = [];
                for (let i = 0; i < lines.length; i += 2) {
                    rows.push([lines[i], lines[i + 1] || ""]);
                }

                return (
                    <Page key={key} style={styles.extrasPage}>
                        <Text style={styles.extrasTitle}>{title}</Text>
                        <View style={styles.extrasContent}>
                            {rows.map((pair, ri) => (
                                <View key={ri} style={styles.extrasGridRow}>
                                    {pair.map((cell, ci) => (
                                        <View key={ci} style={styles.extrasGridCell}>
                                            <Text style={styles.extrasParagraph}>{cell}</Text>
                                        </View>
                                    ))}
                                </View>
                            ))}
                        </View>
                    </Page>
                );
            })}
        </>
    );
}

// 🧾 Головна функція
export async function downloadTrainingPDF(order: UniversalOrderType) {
    const main = order.response || "";
    const extras = order.extrasData || {};

    const isCoach = order.planType === "reviewed";
    const styles: PDFStyles = isCoach ? pdfStylesCoach : pdfStylesAI;

    const fullName = cleanText(order.fields.fullName || "");
    const goal = cleanText(order.fields.goal || "");
    const fitnessLevel = cleanText(order.fields.fitnessLevel || "");
    const days = String(order.fields.days ?? "");

    const doc = (
        <Document>
            {/* MAIN PLAN */}
            <Page style={styles.page}>
                {/* Header: різний для AI/Coach */}
                {isCoach ? (
                    <View style={styles.header}>
                        {order.totalTokens >= 49000 && (
                            <Text style={{ fontSize: 9, fontWeight: "bold", color: "#B59410", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
                                ★ Qellum VIP Premium Culinary Signature Plan ★
                            </Text>
                        )}
                        <View style={styles.headerRow}>
                            <Text style={styles.title}>Meal Plan — {fullName}</Text>
                        </View>
                        <Text style={styles.meta}>
                            Goal: {goal} | Level: {fitnessLevel} | Duration: {days} days
                        </Text>
                    </View>
                ) : (
                    <View style={styles.header}>
                        <Text style={styles.title}>Meal Plan — {fullName}</Text>
                        <Text style={styles.meta}>
                            Goal: {goal} | Level: {fitnessLevel} | Duration: {days} days
                        </Text>
                    </View>
                )}

                <Text style={styles.sectionTitle}>Main Plan</Text>
                {isCoach ? renderTrainingDaysCoach(main, styles) : renderTrainingDaysAI(main, styles)}

                {/* Footer */}
                <Text style={styles.footer} render={({ pageNumber, totalPages }) => `${COMPANY_NAME || ""} • ${COMPANY_PHONE || ""} — Page ${pageNumber} / ${totalPages}`} />
            </Page>

            {/* EXTRAS */}
            {isCoach ? renderExtrasCoach(extras, styles) : renderExtrasAI(extras, styles)}

            {/* FINAL MOTIVATION */}
            <Page style={styles.page}>
                <View style={styles.motivationBlock}>
                    <Text style={styles.motivationText}>{cleanText("Bon Appétit!")}</Text>
                    <Text style={styles.motivationQuote}>
                        {cleanText("Happy cooking — small, consistent changes make delicious results.")}
                    </Text>
                </View>

                {isCoach && order.totalTokens >= 49000 && (
                    <View style={{ marginTop: 30, borderTopWidth: 1, borderTopColor: "#B59410", borderTopStyle: "solid", paddingTop: 14, textAlign: "center" }}>
                        <Text style={{ fontSize: 11, fontWeight: "bold", color: "#B59410", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
                            Approved & Signed by Qellum Culinary Board
                        </Text>
                        <Text style={{ fontSize: 9, color: "#5B6361", marginBottom: 2 }}>
                            Executive Chef: Jean-Pierre Dubois  |  Senior Dietitian: Sarah Jenkins, MS, RD
                        </Text>
                        <Text style={{ fontSize: 8, color: "#B59410", fontStyle: "italic" }}>
                            Official Certified VIP Nutrition & Retainer Plan
                        </Text>
                    </View>
                )}

                <Text style={styles.footer} render={({ pageNumber, totalPages }) => `${COMPANY_NAME || ""} • ${COMPANY_PHONE || ""} — Page ${pageNumber} / ${totalPages}`} />
            </Page>
        </Document>
    );

    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `meal-plan-${fullName}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
}

export { downloadTrainingPDF as downloadUniversalPDF };
