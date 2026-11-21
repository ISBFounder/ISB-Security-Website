import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { EnvironmentExplorer } from "@/components/solutions/EnvironmentExplorer";
import { SolutionContextSwitcher } from "@/components/solutions/SolutionContextSwitcher";
import { OsContinuity } from "@/components/os/OsContinuity";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd, routeMetadata } from "@/lib/seo";
import { isLocale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "solutions" });
  return routeMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/solutions",
  });
}

export default async function SolutionsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  setRequestLocale(locale);
  const t = await getTranslations("solutions");

  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd(locale, [
          { name: t("breadcrumbHome"), path: "/" },
          { name: t("breadcrumb"), path: "/solutions" },
        ])}
      />
      <section className="section !pb-10">
        <div className="container-site">
          <div className="max-w-3xl">
            <OsContinuity
              steps={[
                { label: t("continuityHome"), href: "/" },
                { label: t("continuitySolutions") },
                { label: t("continuityPlatform"), href: "/platform" },
              ]}
            />
            <p className="label mt-3">{t("eyebrow")}</p>
            <h1 className="heading-xl mt-3">{t("title")}</h1>
            <p className="body-lg mt-6 max-w-2xl">{t("intro")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/request-demo">
                {t("requestDemo")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/platform" variant="secondary">
                {t("explorePlatform")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section divider os-layer">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow={t("contextEyebrow")}
            title={t("contextTitle")}
            description={t("contextDescription")}
          />
          <div className="mt-10">
            <SolutionContextSwitcher />
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow={t("envEyebrow")}
            title={t("envTitle")}
            description={t("envDescription")}
          />
          <div className="mt-10">
            <EnvironmentExplorer />
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <div className="border border-border bg-surface/40 p-8 md:p-10">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="heading-lg">{t("ctaTitle")}</h2>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="/request-demo">
                  {t("requestDemo")}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
                <Button href="/contact" variant="secondary">
                  {t("contactIsb")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
