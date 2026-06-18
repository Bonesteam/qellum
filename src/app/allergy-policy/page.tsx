import type { Metadata } from "next";
import allergyPolicy from "@/pageSchemas/allergy-policy/allergyPolicy";
import PageCreator from "@/components/features/page-creator/PageCreator";
import { metadataFromSchema } from "@/utils/fromSchema";

export async function generateMetadata(): Promise<Metadata> {
    return await metadataFromSchema(allergyPolicy.meta);
}

export default function Page() {
    return <PageCreator schemaMap={{ sv: allergyPolicy, en: allergyPolicy }} />;
}
