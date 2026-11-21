import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechnologyArchitecture } from "@/components/technology/TechnologyArchitecture";
import { TechnologyStackExplorer } from "@/components/technology/TechnologyStackExplorer";
import { OsContinuity } from "@/components/os/OsContinuity";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd, routeMetadata } from "@/lib/seo";
import { isLocale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "technology" });
  return routeMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/technology",
  });
}

export default async function TechnologyPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  setRequestLocale(locale);
  const t = await getTranslations("technology");

  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd(locale, [
          { name: t("breadcrumbHome"), path: "/" },
          { name: t("breadcrumbCurrent"), path: "/technology" },
        ])}
      />
      <section className="section !pb-10">
        <div className="container-site">
          <div className="max-w-3xl">
            <OsContinuity
              steps={[
                { label: t("continuity.home"), href: "/" },
                { label: t("continuity.platform"), href: "/platform" },
                { label: t("continuity.technology") },
                { label: t("continuity.security"), href: "/security" },
              ]}
            />
            <p className="label mt-3">{t("eyebrow")}</p>
            <h1 className="heading-xl mt-3">
              {t("title")}
            </h1>
            <p className="body-lg mt-6 max-w-2xl">
              {t("intro")}
            </p>
          </div>
        </div>
      </section>

      <section className="section divider os-layer">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow={t("engineSection.eyebrow")}
            title={t("engineSection.title")}
            description={t("engineSection.description")}
          />
          <div className="mt-10 max-w-2xl">
            <TechnologyStackExplorer />
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
            <TechnologyArchitecture />
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-[14px] text-ink-secondary">
              {t("trustNote")}
            </p>
            <Link href="/security" className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-secondary hover:text-gold">
              {t("trustLink")}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
