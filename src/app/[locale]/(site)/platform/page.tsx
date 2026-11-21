import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { PlatformArchitecture } from "@/components/platform/PlatformArchitecture";
import { PlatformOsExplorer } from "@/components/platform/PlatformOsExplorer";
import { OsContinuity } from "@/components/os/OsContinuity";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd, routeMetadata } from "@/lib/seo";
import { isLocale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "platform" });
  return routeMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/platform",
  });
}

export default async function PlatformPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  setRequestLocale(locale);
  const t = await getTranslations("platform");
  const intro = t.raw("intro") as string[];

  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd(locale, [
          { name: t("breadcrumbHome"), path: "/" },
          { name: t("breadcrumbCurrent"), path: "/platform" },
        ])}
      />

      <section className="section !pb-10">
        <div className="container-site">
          <div className="max-w-3xl">
            <OsContinuity
              steps={[
                { label: t("continuity.home"), href: "/" },
                { label: t("continuity.platform") },
                { label: t("continuity.technology"), href: "/technology" },
                { label: t("continuity.security"), href: "/security" },
              ]}
            />
            <p className="label mt-3">{t("eyebrow")}</p>
            <h1 className="heading-xl mt-3">
              {t("title")}
            </h1>
            <div className="body-lg mt-6 max-w-2xl space-y-4">
              {intro.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section divider os-layer">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow={t("osSection.eyebrow")}
            title={t("osSection.title")}
            description={t("osSection.description")}
          />
          <div className="mt-10">
            <PlatformOsExplorer />
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow={t("architectureSection.eyebrow")}
            title={t("architectureSection.title")}
            description={t("architectureSection.description")}
          />
          <div className="mt-10">
            <PlatformArchitecture />
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-lg">{t("ctaTitle")}</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/request-demo">
                {t("ctaDemo")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/technology" variant="secondary">{t("ctaTechnology")}</Button>
              <Button href="/security" variant="secondary">{t("ctaSecurity")}</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
