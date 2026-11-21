import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { FeatureRow } from "@/components/features/FeatureRow";
import { FeatureStatus, type FeatureStage } from "@/components/features/FeatureStatus";
import { CapabilityNav } from "@/components/features/CapabilityNav";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd, routeMetadata } from "@/lib/seo";
import { isLocale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

const ROWS = {
  reporting: [
    { id: "specificReport", stage: "development" },
    { id: "aiAssisted", stage: "development" },
    { id: "dailyReports", stage: "development" },
    { id: "incidentReports", stage: "development" },
    { id: "damageReports", stage: "development" },
    { id: "accidentReports", stage: "planned" },
    { id: "attachments", stage: "development" },
    { id: "voiceNotes", stage: "planned" },
    { id: "signatures", stage: "planned" },
    { id: "review", stage: "development" },
    { id: "history", stage: "development" },
  ],
  organizations: [
    { id: "company", stage: "foundation" },
    { id: "customer", stage: "development" },
    { id: "multiTenant", stage: "foundation" },
    { id: "clientReporting", stage: "development" },
    { id: "contacts", stage: "development" },
    { id: "serviceRequests", stage: "development" },
  ],
  objects: [
    { id: "buildings", stage: "development" },
    { id: "floors", stage: "development" },
    { id: "posts", stage: "development" },
    { id: "assets", stage: "development" },
    { id: "emergencyContacts", stage: "development" },
    { id: "documents", stage: "development" },
    { id: "history", stage: "development" },
    { id: "requirements", stage: "development" },
    { id: "escalation", stage: "development" },
    { id: "routes", stage: "development" },
    { id: "maps", stage: "planned" },
  ],
  personnel: [
    { id: "users", stage: "foundation" },
    { id: "records", stage: "development" },
    { id: "roles", stage: "foundation" },
    { id: "qualifications", stage: "discovery" },
    { id: "attendance", stage: "foundation" },
    { id: "scheduling", stage: "foundation" },
    { id: "teams", stage: "development" },
    { id: "assignments", stage: "foundation" },
  ],
  operations: [
    { id: "notifications", stage: "development" },
    { id: "tasks", stage: "development" },
    { id: "patrols", stage: "development" },
    { id: "checkpoints", stage: "planned" },
    { id: "escalations", stage: "development" },
    { id: "handovers", stage: "planned" },
    { id: "workOrders", stage: "planned" },
    { id: "cases", stage: "planned" },
    { id: "realtime", stage: "planned" },
    { id: "offline", stage: "foundation" },
    { id: "mobile", stage: "development" },
  ],
  security: [
    { id: "rbac", stage: "foundation" },
    { id: "companyScope", stage: "foundation" },
    { id: "audit", stage: "foundation" },
    { id: "billing", stage: "foundation" },
    { id: "outbox", stage: "foundation" },
    { id: "authentication", stage: "foundation" },
    { id: "connectors", stage: "planned" },
    { id: "alarms", stage: "planned" },
    { id: "exports", stage: "planned" },
    { id: "custody", stage: "discovery" },
    { id: "publication", stage: "discovery" },
    { id: "retention", stage: "discovery" },
  ],
  intelligence: [
    { id: "aiReporting", stage: "development" },
    { id: "analytics", stage: "planned" },
    { id: "predictive", stage: "future" },
    { id: "wearables", stage: "future" },
  ],
} as const satisfies Record<string, readonly { id: string; stage: FeatureStage }[]>;

const STATUS_STAGES = ["foundation", "development", "discovery", "planned", "future"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "features" });
  return routeMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/features",
  });
}

export default async function FeaturesPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  setRequestLocale(locale);
  const t = await getTranslations("features");

  const rows = (group: keyof typeof ROWS) =>
    ROWS[group].map((row) => {
      const base = `${group}.rows.${row.id}`;
      return (
        <FeatureRow
          key={row.id}
          name={t(`${base}.name`)}
          purpose={t(`${base}.purpose`)}
          stage={row.stage}
          workflow={t.has(`${base}.workflow`) ? t(`${base}.workflow`) : undefined}
          connected={t.has(`${base}.connected`) ? t(`${base}.connected`) : undefined}
          note={t.has(`${base}.note`) ? t(`${base}.note`) : undefined}
        />
      );
    });

  const reportingLifecycle = t.raw("reporting.lifecycle") as string[];
  const personnelModel = t.raw("personnel.model") as string[];
  const operationsFlow = t.raw("operations.flow") as string[];
  const intelligenceChain = t.raw("intelligence.chain") as string[];

  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd(locale, [
          { name: t("breadcrumbHome"), path: "/" },
          { name: t("breadcrumbCurrent"), path: "/features" },
        ])}
      />
      <section className="section !pb-8">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="label">{t("eyebrow")}</p>
            <h1 className="heading-xl mt-3">
              {t("title")}
            </h1>
            <p className="body-lg mt-6 max-w-2xl">
              {t("intro")}
            </p>
            <p className="mt-4 text-[13px] text-ink-muted">
              {t("maturityNote")}
            </p>
          </div>
        </div>
      </section>

      <CapabilityNav />

      <section id="reporting" className="section scroll-mt-28">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="label">{t("reporting.eyebrow")}</p>
              <h2 className="heading-md mt-2">{t("reporting.title")}</h2>
              <p className="body mt-3">
                {t("reporting.body")}
              </p>
              <div className="mt-6 border border-border-subtle bg-bg/40 p-4">
                <p className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                  {t("reporting.lifecycleLabel")}
                </p>
                <ol className="mt-3 space-y-1.5 text-[12px] text-ink-secondary">
                  {reportingLifecycle.map((s, i) => (
                    <li key={s} className="flex gap-2">
                      <span className="font-mono text-[10px] text-ink-faint">{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="border-t border-border">
              {rows("reporting")}
            </div>
          </div>
        </div>
      </section>

      <section id="organizations" className="section divider scroll-mt-28 bg-bg-secondary/40">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="label">{t("organizations.eyebrow")}</p>
              <h2 className="heading-md mt-2">{t("organizations.title")}</h2>
              <p className="body mt-3">
                {t("organizations.body")}
              </p>
              <div className="mt-6 border border-border bg-surface/30 p-4 font-mono text-[12px] leading-7 text-ink-secondary">
                <p className="text-gold">{t("organizations.tree.organization")}</p>
                <p className="pl-3">{t("organizations.tree.customer")}</p>
                <p className="pl-6">{t("organizations.tree.objects")}</p>
                <p className="pl-9">{t("organizations.tree.requirements")}</p>
                <p className="pl-9">{t("organizations.tree.context")}</p>
              </div>
            </div>
            <div className="border-t border-border">
              {rows("organizations")}
            </div>
          </div>
        </div>
      </section>

      <section id="objects" className="section divider scroll-mt-28">
        <div className="container-site">
          <p className="label">{t("objects.eyebrow")}</p>
          <h2 className="heading-md mt-2">{t("objects.title")}</h2>
          <p className="body mt-3 max-w-2xl">
            {t("objects.body")}
          </p>
          <div className="mt-8 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="border border-border-subtle bg-bg/40 p-4 font-mono text-[12px] leading-7 text-ink-secondary">
              <p className="text-gold">{t("objects.tree.customer")}</p>
              <p className="pl-2">{t("objects.tree.object")}</p>
              <p className="pl-4">{t("objects.tree.building")}</p>
              <p className="pl-6">{t("objects.tree.room")}</p>
              <p className="pl-8">{t("objects.tree.checkpoint")}</p>
              <p className="pl-8">{t("objects.tree.asset")}</p>
            </div>
            <div className="border-t border-border">
              {rows("objects")}
            </div>
          </div>
        </div>
      </section>

      <section id="personnel" className="section divider scroll-mt-28 bg-bg-secondary/40">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="label">{t("personnel.eyebrow")}</p>
              <h2 className="heading-md mt-2">{t("personnel.title")}</h2>
              <p className="body mt-3">
                {t("personnel.body")}
              </p>
              <div className="mt-6 border border-border-subtle bg-bg/40 p-4 text-[12px] text-ink-secondary">
                <p className="font-mono text-[9px] uppercase text-ink-faint">{t("personnel.modelLabel")}</p>
                <ol className="mt-2 space-y-1">
                  {personnelModel.map((s, i) => (
                    <li key={s} className="flex gap-2">
                      <span className="font-mono text-[10px] text-ink-faint">{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="border-t border-border">
              {rows("personnel")}
            </div>
          </div>
        </div>
      </section>

      <section id="operations" className="section divider scroll-mt-28">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="label">{t("operations.eyebrow")}</p>
              <h2 className="heading-md mt-2">{t("operations.title")}</h2>
              <p className="body mt-3">
                {t("operations.body")}
              </p>
              <div className="mt-6 border border-border-subtle bg-bg/40 p-4 text-[12px] text-ink-secondary">
                <p className="font-mono text-[9px] uppercase text-ink-faint">{t("operations.flowLabel")}</p>
                <ol className="mt-2 space-y-1">
                  {operationsFlow.map((s, i) => (
                    <li key={s} className="flex gap-2">
                      <span className="font-mono text-[10px] text-ink-faint">{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="border-t border-border">
              {rows("operations")}
            </div>
          </div>
        </div>
      </section>

      <section id="security" className="section divider scroll-mt-28 bg-bg-secondary/40">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="label">{t("security.eyebrow")}</p>
              <h2 className="heading-md mt-2">{t("security.title")}</h2>
              <p className="body mt-3">
                {t("security.body")}
              </p>
              <div className="mt-6 border border-border-subtle bg-bg/40 p-4 font-mono text-[12px] leading-7 text-ink-secondary">
                <p>{t("security.chain")}</p>
              </div>
            </div>
            <div className="border-t border-border">
              {rows("security")}
            </div>
          </div>
        </div>
      </section>

      <section id="intelligence" className="section divider scroll-mt-28">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="label">{t("intelligence.eyebrow")}</p>
              <h2 className="heading-md mt-2">{t("intelligence.title")}</h2>
              <p className="body mt-3">
                {t("intelligence.body")}
              </p>
              <div className="mt-6 border border-border-subtle bg-bg/40 p-4 text-[12px] text-ink-secondary">
                <p className="font-mono text-[9px] uppercase text-ink-faint">{t("intelligence.chainLabel")}</p>
                <ol className="mt-2 space-y-1">
                  {intelligenceChain.map((s, i) => (
                    <li key={s} className="flex gap-2">
                      <span className="font-mono text-[10px] text-ink-faint">{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="border-t border-border">
              {rows("intelligence")}
            </div>
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow={t("statusModel.eyebrow")}
            title={t("statusModel.title")}
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {STATUS_STAGES.map((stage) => (
              <div key={stage} className="border border-border bg-surface/30 p-4">
                <FeatureStatus stage={stage} />
                <p className="mt-2 text-[12px] text-ink-muted">{t(`statusModel.${stage}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-lg">
              {t("ctaTitle")}
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/request-demo">
                {t("ctaDemo")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/platform" variant="secondary">
                {t("ctaPlatform")}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
