import type { Metadata } from "next";
import aiTransparency from "@/pageSchemas/ai-transparency/aiTransparency";
import PageCreator from "@/components/features/page-creator/PageCreator";
import { metadataFromSchema } from "@/utils/fromSchema";

export async function generateMetadata(): Promise<Metadata> {
    return await metadataFromSchema(aiTransparency.meta);
}

export default function Page() {
    return <PageCreator schemaMap={{ sv: aiTransparency, en: aiTransparency }} />;
}
