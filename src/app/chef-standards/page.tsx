import type { Metadata } from "next";
import chefStandards from "@/pageSchemas/chef-standards/chefStandards";
import PageCreator from "@/components/features/page-creator/PageCreator";
import { metadataFromSchema } from "@/utils/fromSchema";

export async function generateMetadata(): Promise<Metadata> {
    return await metadataFromSchema(chefStandards.meta);
}

export default function Page() {
    return <PageCreator schemaMap={{ sv: chefStandards, en: chefStandards }} />;
}
