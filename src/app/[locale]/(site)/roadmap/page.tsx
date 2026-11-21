import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { StructuredData } from "@/components/seo/StructuredData";
import { isLocale } from "@/i18n/routing";
import { breadcrumbJsonLd, routeMetadata } from "@/lib/seo";

const HORIZONS = ["now", "next", "later"] as const;

const STAGES = [
  {
    id: "now",
    emphasis: "active",
    groups: [
      {
        id: "focus",
        items: ["workflows", "reporting", "workforce", "objects", "offline"],
      },
      {
        id: "active",
        items: [
          "operations",
          "patrols",
          "incidents",
          "personnel",
          "objects",
          "ai",
          "mobile",
          "service",
          "documents",
          "client",
        ],
      },
    ],
  },
  {
    id: "next",
    emphasis: "planned",
    groups: [
      {
        id: "required",
        items: ["integration", "recovery", "environment", "authority"],
      },
      {
        id: "discovery",
        items: ["evidence", "documents", "qualifications", "privacy"],
      },
    ],
  },
  {
    id: "later",
    emphasis: "planned",
    groups: [
      {
        id: "planned",
        items: [
          "analytics",
          "visitors",
          "journal",
          "alarms",
          "maps",
          "cases",
          "orders",
          "voice",
          "exports",
          "connectors",
        ],
      },
      { id: "future", items: ["wearables", "predictive"] },
    ],
  },
] as const;

const STATUS_IDS = [
  "foundation",
  "development",
  "discovery",
  "planned",
  "future",
] as const;

const DEP_IDS = ["ai", "analytics", "predictive", "connectors", "client"] as const;

const BOUNDARY_IDS = [
  "date",
  "commercial",
  "production",
  "certification",
  "offline",
  "ai",
] as const;

const PRIORITY_IDS = [
  "value",
  "security",
  "dependency",
  "workflow",
  "maturity",
  "validation",
  "scale",
] as const;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "roadmap" });
  return routeMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/roadmap",
    twitterDescription: t("twitterDescription"),
  });
}

export default async function RoadmapPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  setRequestLocale(locale);
  const t = await getTranslations("roadmap");

  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd(locale, [
          { name: t("breadcrumbHome"), path: "/" },
          { name: t("breadcrumb"), path: "/roadmap" },
        ])}
      />
      <section className="section !pb-10">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="label">{t("eyebrow")}</p>
            <h1 className="heading-xl mt-3">{t("title")}</h1>
            <p className="body-lg mt-6 max-w-2xl">{t("intro")}</p>
            <div className="mt-6 border border-border-subtle bg-surface/30 px-4 py-3 text-[13px] text-ink-muted">
              {t("disclaimer")}
            </div>
          </div>
        </div>
      </section>

      <section className="section divider !pt-8">
        <div className="container-site">
          <p className="label mb-4">{t("progressionEyebrow")}</p>
          <div className="flex flex-wrap items-center gap-2 font-mono text-[12px] text-ink-secondary">
            {HORIZONS.map((id, i) => (
              <span key={id} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="text-ink-faint" aria-hidden>
                    ↓
                  </span>
                )}
                <span className="border border-border bg-surface/40 px-3 py-2">
                  {t(`horizons.${id}`)}
                </span>
              </span>
            ))}
          </div>
          <p className="mt-3 text-[12px] text-ink-faint">{t("foundationsNote")}</p>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow={t("stagesEyebrow")}
            title={t("stagesTitle")}
          />
          <div className="mt-10 grid gap-px border border-border bg-border-subtle md:grid-cols-3">
            {STAGES.map((stage) => (
              <div key={stage.id} className="bg-bg p-5">
                <div className="flex items-baseline gap-2">
                  <span
                    className={`font-mono text-[11px] ${
                      stage.emphasis === "active" ? "text-gold" : "text-ink-muted"
                    }`}
                  >
                    {t(`stages.${stage.id}.index`)}
                  </span>
                  <h2
                    className={`text-[14px] font-semibold ${
                      stage.emphasis === "active" ? "text-gold" : "text-ink-secondary"
                    }`}
                  >
                    {t(`stages.${stage.id}.label`)}
                  </h2>
                </div>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-ink-faint">
                  {t(`stages.${stage.id}.layer`)}
                </p>
                <div className="mt-5 space-y-4">
                  {stage.groups.map((group) => (
                    <div key={group.id}>
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
                        {t(`stages.${stage.id}.groups.${group.id}.title`)}
                      </p>
                      <ul className="mt-1.5 space-y-1">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="text-[12px] leading-snug text-ink-secondary"
                          >
                            {t(`stages.${stage.id}.groups.${group.id}.items.${item}`)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow={t("statusEyebrow")}
            title={t("statusTitle")}
          />
          <div className="mt-8 grid gap-px border border-border bg-border-subtle sm:grid-cols-2">
            {STATUS_IDS.map((id) => (
              <div key={id} className="bg-bg p-5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-gold">
                  {t(`status.${id}.label`)}
                </p>
                <p className="mt-2 text-[13px] text-ink-secondary">
                  {t(`status.${id}.text`)}
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
            eyebrow={t("dependenciesEyebrow")}
            title={t("dependenciesTitle")}
            description={t("dependenciesDescription")}
          />
          <div className="mt-8 max-w-2xl space-y-0 border-t border-border">
            {DEP_IDS.map((id) => (
              <div
                key={id}
                className="grid gap-1 border-b border-border-subtle py-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4"
              >
                <p className="text-[13px] font-medium text-ink">
                  {t(`dependencies.${id}.capability`)}
                </p>
                <p className="font-mono text-[10px] text-ink-faint sm:text-center">
                  {t("dependsOn")}
                </p>
                <p className="text-[13px] text-ink-secondary">
                  {t(`dependencies.${id}.depends`)}
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
            eyebrow={t("boundariesEyebrow")}
            title={t("boundariesTitle")}
            description={t("boundariesDescription")}
          />
          <div className="mt-8 flex flex-wrap gap-1.5">
            {BOUNDARY_IDS.map((id) => (
              <span
                key={id}
                className="border border-border-subtle bg-bg/50 px-2.5 py-1.5 text-[12px] text-ink-secondary"
              >
                {t(`boundaries.${id}`)}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow={t("prioritiesEyebrow")}
            title={t("prioritiesTitle")}
          />
          <div className="mt-8 flex flex-wrap gap-1.5">
            {PRIORITY_IDS.map((id) => (
              <span
                key={id}
                className="border border-border-subtle bg-bg/50 px-2.5 py-1.5 text-[12px] text-ink-secondary"
              >
                {t(`priorities.${id}`)}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <div className="max-w-2xl border border-border bg-surface/30 p-6">
            <p className="label">{t("policyEyebrow")}</p>
            <p className="mt-3 text-[14px] text-ink-secondary">{t("policyBody")}</p>
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-lg">{t("ctaTitle")}</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/request-demo">
                {t("ctaDemo")} <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/platform" variant="secondary">
                {t("ctaPlatform")}
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
