import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";
import { Link } from "@/i18n/navigation";
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
    title: t("privacy.metaTitle"),
    description: t("privacy.metaDescription"),
    path: "/privacy",
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  setRequestLocale(locale);
  const t = await getTranslations("legal");

  return (
    <LegalPageLayout title={t("privacy.title")} current="/privacy" updated="2026-08-08">
      {/* LEGAL REVIEW: Confirm legal bases, retention schedule, and international transfer safeguards before production launch. */}
      <p>
        {t.rich("privacy.intro", {
          url: SITE.url,
          site: (chunks) => (
            <a href={SITE.url} className="text-gold hover:text-gold-light">
              {chunks}
            </a>
          ),
        })}
      </p>

      <LegalSection id="about" number="01" title={t("privacy.sections.about.title")}>
        <p>{t("privacy.sections.about.body")}</p>
      </LegalSection>

      <LegalSection
        id="controller"
        number="02"
        title={t("privacy.sections.controller.title")}
      >
        <p>{t("privacy.sections.controller.intro")}</p>
        <p>
          {SITE.name}
          <br />
          {t("privacy.sections.controller.location")}
          <br />
          {t("privacy.sections.controller.kvk", { kvk: SITE.kvk })}
          <br />
          {t("privacy.sections.controller.emailLabel")}{" "}
          <a href={`mailto:${SITE.email}`} className="text-gold hover:text-gold-light">
            {SITE.email}
          </a>
        </p>
      </LegalSection>

      <LegalSection id="collect" number="03" title={t("privacy.sections.collect.title")}>
        <p>{t("privacy.sections.collect.body")}</p>
      </LegalSection>

      <LegalSection
        id="contact-form"
        number="04"
        title={t("privacy.sections.contactForm.title")}
      >
        <p>{t("privacy.sections.contactForm.intro")}</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>{t("privacy.sections.contactForm.items.name")}</li>
          <li>{t("privacy.sections.contactForm.items.company")}</li>
          <li>{t("privacy.sections.contactForm.items.email")}</li>
          <li>{t("privacy.sections.contactForm.items.phone")}</li>
          <li>{t("privacy.sections.contactForm.items.subject")}</li>
          <li>{t("privacy.sections.contactForm.items.message")}</li>
          <li>{t("privacy.sections.contactForm.items.enquiryType")}</li>
        </ul>
      </LegalSection>

      <LegalSection
        id="demo-form"
        number="05"
        title={t("privacy.sections.demoForm.title")}
      >
        <p>{t("privacy.sections.demoForm.intro")}</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>{t("privacy.sections.demoForm.items.companyName")}</li>
          <li>{t("privacy.sections.demoForm.items.contactPerson")}</li>
          <li>{t("privacy.sections.demoForm.items.businessEmail")}</li>
          <li>{t("privacy.sections.demoForm.items.companySize")}</li>
          <li>{t("privacy.sections.demoForm.items.country")}</li>
          <li>{t("privacy.sections.demoForm.items.sectors")}</li>
          <li>{t("privacy.sections.demoForm.items.software")}</li>
          <li>{t("privacy.sections.demoForm.items.context")}</li>
          <li>{t("privacy.sections.demoForm.items.challenges")}</li>
          <li>{t("privacy.sections.demoForm.items.timeline")}</li>
          <li>{t("privacy.sections.demoForm.items.message")}</li>
        </ul>
      </LegalSection>

      <LegalSection
        id="technical"
        number="06"
        title={t("privacy.sections.technical.title")}
      >
        <p>{t("privacy.sections.technical.p1")}</p>
        <p>{t("privacy.sections.technical.p2")}</p>
      </LegalSection>

      <LegalSection
        id="purposes"
        number="07"
        title={t("privacy.sections.purposes.title")}
      >
        <p>{t("privacy.sections.purposes.intro")}</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>{t("privacy.sections.purposes.items.respond")}</li>
          <li>{t("privacy.sections.purposes.items.evaluate")}</li>
          <li>{t("privacy.sections.purposes.items.prepare")}</li>
          <li>{t("privacy.sections.purposes.items.pilot")}</li>
          <li>{t("privacy.sections.purposes.items.disclosure")}</li>
          <li>{t("privacy.sections.purposes.items.protect")}</li>
          <li>{t("privacy.sections.purposes.items.maintain")}</li>
        </ul>
        <p>{t("privacy.sections.purposes.closing")}</p>
      </LegalSection>

      <LegalSection
        id="legal-basis"
        number="08"
        title={t("privacy.sections.legalBasis.title")}
      >
        {/* LEGAL REVIEW: Confirm final GDPR legal bases with counsel before launch. */}
        <p>{t("privacy.sections.legalBasis.p1")}</p>
        <p>{t("privacy.sections.legalBasis.p2")}</p>
      </LegalSection>

      <LegalSection
        id="providers"
        number="09"
        title={t("privacy.sections.providers.title")}
      >
        <p>{t("privacy.sections.providers.intro")}</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            {t.rich("privacy.sections.providers.resend", {
              strong: (chunks) => <strong className="text-ink">{chunks}</strong>,
            })}
          </li>
          <li>
            {t.rich("privacy.sections.providers.upstash", {
              strong: (chunks) => <strong className="text-ink">{chunks}</strong>,
            })}
          </li>
        </ul>
        <p>{t("privacy.sections.providers.closing")}</p>
      </LegalSection>

      <LegalSection
        id="international"
        number="10"
        title={t("privacy.sections.international.title")}
      >
        {/* LEGAL REVIEW: Confirm transfer mechanisms (e.g. SCCs) based on final production configuration. */}
        <p>{t("privacy.sections.international.body")}</p>
      </LegalSection>

      <LegalSection
        id="retention"
        number="11"
        title={t("privacy.sections.retention.title")}
      >
        {/* LEGAL REVIEW: Define final retention schedule before production launch. */}
        <p>{t("privacy.sections.retention.body")}</p>
      </LegalSection>

      <LegalSection
        id="security"
        number="12"
        title={t("privacy.sections.security.title")}
      >
        <p>{t("privacy.sections.security.body")}</p>
      </LegalSection>

      <LegalSection id="cookies" number="13" title={t("privacy.sections.cookies.title")}>
        <p>
          {t.rich("privacy.sections.cookies.body", {
            policy: (chunks) => (
              <Link href="/cookies" className="text-gold hover:text-gold-light">
                {chunks}
              </Link>
            ),
          })}
        </p>
      </LegalSection>

      <LegalSection id="rights" number="14" title={t("privacy.sections.rights.title")}>
        <p>{t("privacy.sections.rights.p1")}</p>
        <p>
          {t.rich("privacy.sections.rights.p2", {
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
        id="children"
        number="15"
        title={t("privacy.sections.children.title")}
      >
        <p>{t("privacy.sections.children.body")}</p>
      </LegalSection>

      <LegalSection id="links" number="16" title={t("privacy.sections.links.title")}>
        <p>{t("privacy.sections.links.body")}</p>
      </LegalSection>

      <LegalSection
        id="changes"
        number="17"
        title={t("privacy.sections.changes.title")}
      >
        <p>{t("privacy.sections.changes.body")}</p>
      </LegalSection>

      <LegalSection
        id="contact"
        number="18"
        title={t("privacy.sections.contact.title")}
      >
        <p>
          {t("privacy.sections.contact.intro")}
          <br />
          {SITE.name}
          <br />
          <a href={`mailto:${SITE.email}`} className="text-gold hover:text-gold-light">
            {SITE.email}
          </a>
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
