import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { NotFoundContent } from "@/components/layout/NotFoundContent";
import { routing } from "@/i18n/routing";

// Unknown paths render inside the locale layout. Middleware sets HTTP 404.
// Calling notFound() makes Next.js return an empty error shell without html lang.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "common" });
  return {
    title: t("notFoundMeta"),
    description: t("notFoundBody"),
    robots: { index: false, follow: false },
  };
}

export default async function UnknownPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <NotFoundContent />;
}
