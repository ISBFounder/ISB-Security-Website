import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { StructuredData } from "@/components/seo/StructuredData";
import { isLocale } from "@/i18n/routing";
import { SITE } from "@/lib/constants";
import { breadcrumbJsonLd, routeMetadata } from "@/lib/seo";

const CONSEQUENCE_IDS = [
  "repeated",
  "handover",
  "versions",
  "traceability",
  "friction",
] as const;

const APPROACH_IDS = [
  "platform",
  "domains",
  "org",
  "object",
  "user",
  "access",
  "audit",
  "modular",
] as const;

const PRINCIPLE_IDS = [
  "innovation",
  "reliability",
  "security",
  "efficiency",
  "trust",
  "professionalism",
] as const;

const PHILOSOPHY_IDS = [
  "use",
  "accountability",
  "staged",
  "validation",
  "modular",
  "scale",
  "ai",
] as const;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  return routeMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/about",
    absoluteTitle: true,
    ogDescription: t("ogDescription"),
    twitterDescription: t("twitterDescription"),
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd(locale, [
          { name: t("breadcrumbHome"), path: "/" },
          { name: t("breadcrumb"), path: "/about" },
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

      <section className="section divider">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="label">{t("whyEyebrow")}</p>
              <h2 className="heading-md mt-3">{t("whyTitle")}</h2>
              <p className="body mt-4">{t("whyBody")}</p>
            </div>
            <div>
              <p className="label">{t("consequenceEyebrow")}</p>
              <ul className="mt-3 space-y-2 text-[14px] text-ink-secondary">
                {CONSEQUENCE_IDS.map((id) => (
                  <li
                    key={id}
                    className="flex gap-2 border-b border-border-subtle py-2 last:border-0"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 bg-gold/70" aria-hidden />
                    {t(`consequences.${id}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow={t("originEyebrow")}
            title={t("originTitle")}
            description={t("originDescription")}
          />
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow={t("genericEyebrow")}
            title={t("genericTitle")}
          />
          <p className="mt-6 max-w-2xl text-[14px] text-ink-secondary">
            {t("genericBody")}
          </p>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow={t("approachEyebrow")}
            title={t("approachTitle")}
          />
          <div className="mt-8 border border-border bg-surface/30 p-5 font-mono text-[12px] leading-7 text-ink-secondary">
            {APPROACH_IDS.map((id) => (
              <p key={id} className={id === "platform" ? "text-gold" : undefined}>
                {t(`approachLines.${id}`)}
              </p>
            ))}
          </div>
          <p className="mt-4 max-w-2xl text-[13px] text-ink-muted">
            {t("approachNote")}
          </p>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="border border-border bg-surface/30 p-6">
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                {t("missionLabel")}
              </p>
              <p className="mt-3 text-[18px] font-semibold leading-snug text-ink">
                {t("missionTitle")}
              </p>
              <p className="mt-4 text-[13px] text-ink-secondary">{t("missionBody")}</p>
            </div>
            <div className="border border-border bg-surface/30 p-6">
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                {t("visionLabel")}
              </p>
              <p className="mt-3 text-[18px] font-semibold leading-snug text-ink">
                {t("visionTitle")}
              </p>
              <p className="mt-4 text-[13px] text-ink-secondary">{t("visionBody")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow={t("principlesEyebrow")}
            title={t("principlesTitle")}
          />
          <div className="mt-10 space-y-0 border-t border-border">
            {PRINCIPLE_IDS.map((id) => (
              <div
                key={id}
                className="grid gap-2 border-b border-border-subtle py-4 sm:grid-cols-[140px_1fr]"
              >
                <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-gold">
                  {t(`principles.${id}.name`)}
                </p>
                <p className="text-[14px] text-ink-secondary">
                  {t(`principles.${id}.text`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow={t("strategyEyebrow")}
            title={t("strategyTitle")}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="border border-border bg-surface/30 p-5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-gold">
                {t("strategyFoundationLabel")}
              </p>
              <p className="mt-3 text-[13px] text-ink-secondary">
                {t("strategyFoundationBody")}
              </p>
            </div>
            <div className="border border-border bg-surface/30 p-5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-gold">
                {t("strategyDevelopmentLabel")}
              </p>
              <p className="mt-3 text-[13px] text-ink-secondary">
                {t("strategyDevelopmentBody")}
              </p>
            </div>
            <div className="border border-border bg-surface/30 p-5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-gold">
                {t("strategyFutureLabel")}
              </p>
              <p className="mt-3 text-[13px] text-ink-secondary">
                {t("strategyFutureBody")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow={t("philosophyEyebrow")}
            title={t("philosophyTitle")}
          />
          <ul className="mt-8 max-w-2xl space-y-2 text-[14px] text-ink-secondary">
            {PHILOSOPHY_IDS.map((id) => (
              <li
                key={id}
                className="flex gap-2 border-b border-border-subtle py-2 last:border-0"
              >
                <span className="mt-2 h-1 w-1 shrink-0 bg-gold/70" aria-hidden />
                {t(`philosophy.${id}`)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="label">{t("europeEyebrow")}</p>
              <h2 className="heading-md mt-3">{t("europeTitle")}</h2>
              <p className="body mt-4">{t("europeBody")}</p>
              <p className="mt-4 text-[13px] text-ink-muted">{t("europeNote")}</p>
            </div>
            <div>
              <p className="label">{t("longTermEyebrow")}</p>
              <h2 className="heading-md mt-3">{t("longTermTitle")}</h2>
              <div className="mt-4 space-y-3 font-mono text-[12px] text-ink-secondary">
                <p>
                  <span className="text-gold">{t("longTermTodayLabel")}</span>
                  {" · "}
                  {t("longTermToday")}
                </p>
                <p>
                  <span className="text-gold">{t("longTermLongLabel")}</span>
                  {" · "}
                  {t("longTermLong")}
                </p>
                <p>
                  <span className="text-gold">{t("longTermFutureLabel")}</span>
                  {" · "}
                  {t("longTermFuture")}
                </p>
              </div>
              <p className="mt-4 text-[12px] text-ink-faint">{t("longTermNote")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow={t("companyEyebrow")}
            title={SITE.name}
          />
          <div className="mt-8 max-w-lg border border-border bg-surface/30 p-6 font-mono text-[13px] leading-relaxed text-ink-secondary">
            <p className="text-ink">{SITE.name}</p>
            <p className="mt-3">{t("location")}</p>
            <p>KVK {SITE.kvk}</p>
            <p className="mt-3">
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
                {t("website")}
              </a>
            </p>
            <p className="mt-3 text-ink-muted">{t("tagline")}</p>
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-lg">{t("ctaTitle")}</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/platform">
                {t("ctaPlatform")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/roadmap" variant="secondary">
                {t("ctaRoadmap")}
              </Button>
              <Button href="/contact" variant="secondary">
                {t("ctaContact")}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
