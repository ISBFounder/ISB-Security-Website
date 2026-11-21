import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { Button } from "@/components/ui/Button";
import { StructuredData } from "@/components/seo/StructuredData";
import { Link } from "@/i18n/navigation";
import { isLocale } from "@/i18n/routing";
import { SITE } from "@/lib/constants";
import { breadcrumbJsonLd, routeMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const ENGAGEMENT = [
  { id: "platform", href: "/request-demo" },
  { id: "pilot", href: "/contact?intent=pilot" },
  { id: "partnership", href: "/contact?intent=partnership" },
  { id: "security", href: "/contact?intent=security" },
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  return routeMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/contact",
    absoluteTitle: true,
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd(locale, [
          { name: t("breadcrumbHome"), path: "/" },
          { name: t("breadcrumbCurrent"), path: "/contact" },
        ])}
      />
      <section className="section !pb-10">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="label">{t("eyebrow")}</p>
            <h1 className="heading-xl mt-3">{t("title")}</h1>
            <p className="body-lg mt-6 max-w-2xl">{t("intro")}</p>
          </div>
        </div>
      </section>

      <section className="section divider !pt-0">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="heading-md">{t("formTitle")}</h2>
              <p className="mt-2 text-[13px] text-ink-muted">{t("formIntro")}</p>
              <div className="mt-8">
                <Suspense
                  fallback={
                    <p className="text-sm text-ink-muted">{t("loadingForm")}</p>
                  }
                >
                  <ContactForm />
                </Suspense>
              </div>
            </div>

            <aside className="space-y-8">
              <div className="border border-border bg-surface/30 p-5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                  {t("companyLabel")}
                </p>
                <p className="mt-3 text-[15px] font-semibold text-ink">
                  {SITE.name}
                </p>
                <div className="mt-4 space-y-1.5 font-mono text-[12px] leading-relaxed text-ink-secondary">
                  <p>{t("location")}</p>
                  <p>KVK {SITE.kvk}</p>
                  <p>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-gold hover:text-gold-light"
                    >
                      {SITE.email}
                    </a>
                  </p>
                  <p>
                    <a
                      href={SITE.url}
                      className="text-gold hover:text-gold-light"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      isbsecuritysolutions.nl
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <p className="label mb-3">{t("engagementLabel")}</p>
                <ul className="space-y-0 border-t border-border">
                  {ENGAGEMENT.map((item) => (
                    <li
                      key={item.id}
                      className="border-b border-border-subtle py-3"
                    >
                      <p className="text-[13px] font-medium text-ink">
                        {t(`engagement.${item.id}.title`)}
                      </p>
                      <p className="mt-0.5 text-[12px] text-ink-muted">
                        {t(`engagement.${item.id}.copy`)}
                      </p>
                      <Link
                        href={item.href}
                        className="mt-1.5 inline-flex items-center gap-1 text-[12px] font-medium text-ink-secondary hover:text-gold"
                      >
                        {t(`engagement.${item.id}.label`)}
                        <ArrowRight className="h-3 w-3" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-[12px] text-ink-faint">
                {t("privacyBefore")}
                <Link href="/privacy" className="text-gold hover:text-gold-light">
                  {t("privacyLink")}
                </Link>
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-lg">{t("ctaTitle")}</h2>
            <p className="body mt-3">{t("ctaBody")}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
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
    </>
  );
}
