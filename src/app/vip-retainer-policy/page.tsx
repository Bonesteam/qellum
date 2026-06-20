import type { Metadata } from "next";
import vipRetainerPolicy from "@/pageSchemas/vip-retainer-policy/vipRetainerPolicy";
import PageCreator from "@/components/features/page-creator/PageCreator";
import { metadataFromSchema } from "@/utils/fromSchema";

export async function generateMetadata(): Promise<Metadata> {
    return await metadataFromSchema(vipRetainerPolicy.meta);
}

export default function Page() {
    return <PageCreator schemaMap={{ sv: vipRetainerPolicy, en: vipRetainerPolicy }} />;
}
