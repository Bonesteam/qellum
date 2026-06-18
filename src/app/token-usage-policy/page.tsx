import type { Metadata } from "next";
import tokenUsagePolicy from "@/pageSchemas/token-usage-policy/tokenUsagePolicy";
import PageCreator from "@/components/features/page-creator/PageCreator";
import { metadataFromSchema } from "@/utils/fromSchema";

export async function generateMetadata(): Promise<Metadata> {
    return await metadataFromSchema(tokenUsagePolicy.meta);
}

export default function Page() {
    return <PageCreator schemaMap={{ sv: tokenUsagePolicy, en: tokenUsagePolicy }} />;
}
