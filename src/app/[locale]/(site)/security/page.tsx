import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { TrustArchitecture } from "@/components/security/TrustArchitecture";
import { AuthorizationFlow } from "@/components/security/AuthorizationFlow";
import { TenantIsolation } from "@/components/security/TenantIsolation";
import { AuditTrailVisual } from "@/components/security/AuditTrailVisual";
import { OsContinuity } from "@/components/os/OsContinuity";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd, routeMetadata } from "@/lib/seo";
import { isLocale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "security" });
  return routeMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/security",
  });
}

export default async function SecurityPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  setRequestLocale(locale);
  const t = await getTranslations("security");

  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd(locale, [
          { name: t("breadcrumbHome"), path: "/" },
          { name: t("breadcrumb"), path: "/security" },
        ])}
      />
      <section className="section !pb-10">
        <div className="container-site">
          <div className="max-w-3xl">
            <OsContinuity
              steps={[
                { label: t("continuityHome"), href: "/" },
                { label: t("continuityPlatform"), href: "/platform" },
                { label: t("continuityTechnology"), href: "/technology" },
                { label: t("continuitySecurity") },
              ]}
            />
            <p className="label mt-3">{t("eyebrow")}</p>
            <h1 className="heading-xl mt-3">{t("title")}</h1>
            <p className="body-lg mt-6 max-w-2xl">{t("intro")}</p>
          </div>
        </div>
      </section>

      <section className="section divider os-layer">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow={t("authEyebrow")}
            title={t("authTitle")}
            description={t("authDescription")}
          />
          <div className="mt-10 grid gap-12 lg:grid-cols-2">
            <AuthorizationFlow />
            <TenantIsolation />
          </div>
          <div className="mt-12 max-w-2xl">
            <AuditTrailVisual />
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow={t("trustEyebrow")}
            title={t("trustTitle")}
            description={t("trustDescription")}
          />
          <div className="mt-10 max-w-2xl">
            <TrustArchitecture />
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-lg">{t("ctaTitle")}</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/request-demo">
                {t("requestDemo")} <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/ai" variant="secondary">
                {t("aiApproach")}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
