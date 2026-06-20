import type { Metadata } from "next";
import dietaryDisclaimer from "@/pageSchemas/dietary-disclaimer/dietaryDisclaimer";
import PageCreator from "@/components/features/page-creator/PageCreator";
import { metadataFromSchema } from "@/utils/fromSchema";

export async function generateMetadata(): Promise<Metadata> {
    return await metadataFromSchema(dietaryDisclaimer.meta);
}

export default function Page() {
    return <PageCreator schemaMap={{ sv: dietaryDisclaimer, en: dietaryDisclaimer }} />;
}
