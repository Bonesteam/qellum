import type {Metadata} from "next";
import enSchema from "@/pageSchemas/meal-philosophy/mealPhilosophy.en";
import svSchema from "@/pageSchemas/meal-philosophy/mealPhilosophy.sv";

import PageCreator from "@/components/features/page-creator/PageCreator";
import {metadataFromSchema} from "@/utils/fromSchema";

export async function generateMetadata(): Promise<Metadata> {
    return await metadataFromSchema(enSchema.meta);
}

export default function Page() {
    return <PageCreator schemaMap={{ sv: svSchema, en: enSchema }} />;
}
