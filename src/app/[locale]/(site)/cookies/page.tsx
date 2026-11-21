import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";
import { isLocale } from "@/i18n/routing";
import { SITE } from "@/lib/constants";
import { routeMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  return routeMetadata({
    locale,
    title: t("cookies.metaTitle"),
    description: t("cookies.metaDescription"),
    path: "/cookies",
  });
}

export default async function CookiesPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  setRequestLocale(locale);
  const t = await getTranslations("legal");

  return (
    <LegalPageLayout title={t("cookies.title")} current="/cookies" updated="2026-11-21">
      {/* Source note: If analytics or marketing technology is introduced later, reassess consent requirements and update this policy before deployment. */}
      <p>{t("cookies.intro", { name: SITE.name })}</p>

      <LegalSection id="what" number="01" title={t("cookies.sections.what.title")}>
        <p>{t("cookies.sections.what.body")}</p>
      </LegalSection>

      <LegalSection
        id="approach"
        number="02"
        title={t("cookies.sections.approach.title")}
      >
        <p>{t("cookies.sections.approach.p1")}</p>
        <p>{t("cookies.sections.approach.p2")}</p>
      </LegalSection>

      <LegalSection
        id="necessary"
        number="03"
        title={t("cookies.sections.necessary.title")}
      >
        <p>{t("cookies.sections.necessary.body")}</p>
      </LegalSection>

      <LegalSection
        id="language"
        number="04"
        title={t("cookies.sections.language.title")}
      >
        <p>{t("cookies.sections.language.p1")}</p>
        <p>{t("cookies.sections.language.p2")}</p>
      </LegalSection>

      <LegalSection id="forms" number="05" title={t("cookies.sections.forms.title")}>
        <p>{t("cookies.sections.forms.body")}</p>
      </LegalSection>

      <LegalSection
        id="analytics"
        number="06"
        title={t("cookies.sections.analytics.title")}
      >
        <p>{t("cookies.sections.analytics.body")}</p>
      </LegalSection>

      <LegalSection
        id="marketing"
        number="07"
        title={t("cookies.sections.marketing.title")}
      >
        <p>{t("cookies.sections.marketing.body")}</p>
      </LegalSection>

      <LegalSection
        id="third-party"
        number="08"
        title={t("cookies.sections.thirdParty.title")}
      >
        <p>{t("cookies.sections.thirdParty.body")}</p>
      </LegalSection>

      <LegalSection id="browser" number="09" title={t("cookies.sections.browser.title")}>
        <p>{t("cookies.sections.browser.body")}</p>
      </LegalSection>

      <LegalSection id="changes" number="10" title={t("cookies.sections.changes.title")}>
        <p>{t("cookies.sections.changes.body")}</p>
      </LegalSection>

      <LegalSection id="contact" number="11" title={t("cookies.sections.contact.title")}>
        <p>
          {t.rich("cookies.sections.contact.body", {
            email: SITE.email,
            mail: (chunks) => (
              <a
                href={`mailto:${SITE.email}`}
                className="text-gold hover:text-gold-light"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
