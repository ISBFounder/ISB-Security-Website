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
    title: t("terms.metaTitle"),
    description: t("terms.metaDescription"),
    path: "/terms",
  });
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  setRequestLocale(locale);
  const t = await getTranslations("legal");

  return (
    <LegalPageLayout title={t("terms.title")} current="/terms" updated="2026-08-08">
      {/* LEGAL REVIEW: Confirm liability language and governing law with counsel before production launch. */}
      <p>
        {t.rich("terms.intro", {
          name: SITE.name,
          url: SITE.url,
          site: (chunks) => (
            <a href={SITE.url} className="text-gold hover:text-gold-light">
              {chunks}
            </a>
          ),
        })}
      </p>
      <p>
        {t.rich("terms.notice", {
          strong: (chunks) => <strong className="text-ink">{chunks}</strong>,
        })}
      </p>

      <LegalSection id="about" number="01" title={t("terms.sections.about.title")}>
        <p>{t("terms.sections.about.body")}</p>
      </LegalSection>

      <LegalSection id="purpose" number="02" title={t("terms.sections.purpose.title")}>
        <p>{t("terms.sections.purpose.body", { name: SITE.name })}</p>
      </LegalSection>

      <LegalSection
        id="development"
        number="03"
        title={t("terms.sections.development.title")}
      >
        <p>{t("terms.sections.development.body")}</p>
      </LegalSection>

      <LegalSection
        id="non-binding"
        number="04"
        title={t("terms.sections.nonBinding.title")}
      >
        <p>{t("terms.sections.nonBinding.body")}</p>
      </LegalSection>

      <LegalSection
        id="acceptable"
        number="05"
        title={t("terms.sections.acceptable.title")}
      >
        <p>{t("terms.sections.acceptable.intro")}</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>{t("terms.sections.acceptable.items.access")}</li>
          <li>{t("terms.sections.acceptable.items.damage")}</li>
          <li>{t("terms.sections.acceptable.items.automation")}</li>
          <li>{t("terms.sections.acceptable.items.malware")}</li>
          <li>{t("terms.sections.acceptable.items.unlawful")}</li>
          <li>{t("terms.sections.acceptable.items.extract")}</li>
        </ul>
        <p>{t("terms.sections.acceptable.closing")}</p>
      </LegalSection>

      <LegalSection id="ip" number="06" title={t("terms.sections.ip.title")}>
        <p>{t("terms.sections.ip.p1", { name: SITE.name })}</p>
        <p>{t("terms.sections.ip.p2")}</p>
      </LegalSection>

      <LegalSection id="content" number="07" title={t("terms.sections.content.title")}>
        <p>{t("terms.sections.content.body")}</p>
      </LegalSection>

      <LegalSection id="demos" number="08" title={t("terms.sections.demos.title")}>
        <p>{t("terms.sections.demos.body")}</p>
      </LegalSection>

      <LegalSection id="links" number="09" title={t("terms.sections.links.title")}>
        <p>{t("terms.sections.links.body")}</p>
      </LegalSection>

      <LegalSection id="security" number="10" title={t("terms.sections.security.title")}>
        <p>
          {t.rich("terms.sections.security.body", {
            email: SITE.email,
            mail: (chunks) => (
              <a href={`mailto:${SITE.email}`} className="text-gold hover:text-gold-light">
                {chunks}
              </a>
            ),
          })}
        </p>
      </LegalSection>

      <LegalSection
        id="availability"
        number="11"
        title={t("terms.sections.availability.title")}
      >
        <p>{t("terms.sections.availability.body")}</p>
      </LegalSection>

      <LegalSection
        id="liability"
        number="12"
        title={t("terms.sections.liability.title")}
      >
        {/* LEGAL REVIEW: Confirm liability language with counsel before production launch. */}
        <p>{t("terms.sections.liability.body", { name: SITE.name })}</p>
      </LegalSection>

      <LegalSection id="changes" number="13" title={t("terms.sections.changes.title")}>
        <p>{t("terms.sections.changes.body")}</p>
      </LegalSection>

      <LegalSection
        id="governing"
        number="14"
        title={t("terms.sections.governing.title")}
      >
        {/* LEGAL REVIEW: Confirm governing law and forum with counsel before production launch. */}
        <p>{t("terms.sections.governing.body", { name: SITE.name })}</p>
      </LegalSection>

      <LegalSection id="contact" number="15" title={t("terms.sections.contact.title")}>
        <p>
          {SITE.name}
          <br />
          {t("terms.sections.contact.location")}
          <br />
          {t("terms.sections.contact.kvk", { kvk: SITE.kvk })}
          <br />
          <a href={`mailto:${SITE.email}`} className="text-gold hover:text-gold-light">
            {SITE.email}
          </a>
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
