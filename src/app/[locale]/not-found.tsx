import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NotFoundContent } from "@/components/layout/NotFoundContent";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("common");
  return {
    title: t("notFoundMeta"),
    description: t("notFoundBody"),
    robots: { index: false, follow: false },
  };
}

export default function NotFound() {
  return <NotFoundContent />;
}
