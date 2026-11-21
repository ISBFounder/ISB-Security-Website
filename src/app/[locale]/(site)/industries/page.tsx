import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { IndustryExplorer } from "@/components/industries/IndustryExplorer";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd, routeMetadata } from "@/lib/seo";
import { isLocale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

const ROW_IDS = [
  "object",
  "mobile",
  "event",
  "retail",
  "corporate",
  "healthcare",
  "education",
  "municipal",
  "government",
] as const;

type Rel = "core" | "relevant" | "situational" | "future";

const MATRIX: { id: (typeof ROW_IDS)[number]; cells: Rel[] }[] = [
  {
    id: "object",
    cells: ["core", "core", "core", "core", "relevant", "core", "situational", "relevant", "future"],
  },
  {
    id: "mobile",
    cells: ["core", "core", "relevant", "core", "relevant", "situational", "situational", "relevant", "future"],
  },
  {
    id: "event",
    cells: ["core", "relevant", "core", "situational", "core", "situational", "situational", "relevant", "future"],
  },
  {
    id: "retail",
    cells: ["core", "core", "relevant", "situational", "relevant", "relevant", "relevant", "relevant", "future"],
  },
  {
    id: "corporate",
    cells: ["core", "core", "core", "core", "relevant", "relevant", "situational", "relevant", "future"],
  },
  {
    id: "healthcare",
    cells: ["core", "core", "core", "situational", "core", "relevant", "situational", "relevant", "future"],
  },
  {
    id: "education",
    cells: ["core", "core", "core", "core", "relevant", "relevant", "situational", "relevant", "future"],
  },
  {
    id: "municipal",
    cells: ["core", "core", "core", "situational", "core", "core", "situational", "relevant", "future"],
  },
  {
    id: "government",
    cells: ["core", "core", "core", "situational", "relevant", "core", "core", "relevant", "future"],
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "industries" });
  return routeMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/industries",
  });
}

export default async function IndustriesPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  setRequestLocale(locale);
  const t = await getTranslations("industries");
  const landscapeCols = t.raw("landscape.cols") as string[];
  const matrixCols = t.raw("matrix.cols") as string[];
  const foundation = t.raw("foundation.items") as string[];
  const variationSteps = t.raw("variation.steps") as string[];
  const variesItems = t.raw("variation.variesItems") as string[];
  const sharedItems = t.raw("variation.sharedItems") as string[];
  const configItems = t.raw("configuration.items") as string[];

  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd(locale, [
          { name: t("breadcrumbHome"), path: "/" },
          { name: t("breadcrumb"), path: "/industries" },
        ])}
      />
      <section className="section !pb-10">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="label">{t("eyebrow")}</p>
            <h1 className="heading-xl mt-3">{t("title")}</h1>
            <p className="body-lg mt-6 max-w-2xl">{t("intro")}</p>
            <p className="mt-4 text-[13px] text-ink-muted">{t("disclaimer")}</p>
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow={t("landscape.eyebrow")}
            title={t("landscape.title")}
            description={t("landscape.description")}
          />
          <div className="mt-10 hidden overflow-x-auto border border-border md:block">
            <table className="w-full min-w-[900px] text-left text-[11px]">
              <thead>
                <tr className="border-b border-border bg-surface/40 font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                  <th className="px-3 py-3 font-medium">{t("landscape.industry")}</th>
                  {landscapeCols.map((c) => (
                    <th key={c} className="px-2 py-3 font-medium">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-ink-secondary">
                {ROW_IDS.map((id) => {
                  const dims = t.raw(`landscape.${id}`) as string[];
                  return (
                    <tr
                      key={id}
                      className="border-b border-border-subtle last:border-0"
                    >
                      <td className="px-3 py-2.5 font-medium text-ink">
                        {t(`tableNames.${id}`)}
                      </td>
                      {dims.map((d, i) => (
                        <td key={i} className="px-2 py-2.5">
                          {d}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-10 space-y-2 md:hidden">
            {ROW_IDS.map((id) => {
              const dims = t.raw(`landscape.${id}`) as string[];
              return (
                <details
                  key={id}
                  className="border border-border bg-surface/20 px-3 py-2"
                >
                  <summary className="cursor-pointer text-[13px] font-medium text-ink">
                    {t(`tableNames.${id}`)}
                  </summary>
                  <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
                    {landscapeCols.map((c, i) => (
                      <div key={c}>
                        <dt className="font-mono text-[9px] uppercase text-ink-faint">{c}</dt>
                        <dd className="text-ink-secondary">{dims[i]}</dd>
                      </div>
                    ))}
                  </dl>
                </details>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow={t("matrix.eyebrow")}
            title={t("matrix.title")}
            description={t("matrix.description")}
          />
          <div className="mt-10 hidden overflow-x-auto border border-border md:block">
            <table className="w-full min-w-[720px] text-left text-[12px]">
              <thead>
                <tr className="border-b border-border bg-surface/40 font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                  <th className="px-3 py-3 font-medium">{t("matrix.industry")}</th>
                  {matrixCols.map((c) => (
                    <th key={c} className="px-2 py-3 font-medium">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATRIX.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-border-subtle last:border-0"
                  >
                    <td className="px-3 py-2.5 font-medium text-ink">
                      {t(`tableNames.${row.id}`)}
                    </td>
                    {row.cells.map((cell, i) => (
                      <td key={i} className="px-2 py-2.5 text-ink-secondary">
                        <span
                          className={
                            cell === "core"
                              ? "text-ink"
                              : cell === "future"
                                ? "text-ink-faint"
                                : "text-ink-secondary"
                          }
                        >
                          {t(`matrix.rel.${cell}`)}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10 space-y-2 md:hidden">
            {MATRIX.map((row) => (
              <details
                key={row.id}
                className="border border-border bg-surface/20 px-3 py-2"
              >
                <summary className="cursor-pointer text-[13px] font-medium text-ink">
                  {t(`tableNames.${row.id}`)}
                </summary>
                <ul className="mt-2 space-y-1 text-[12px] text-ink-secondary">
                  {matrixCols.map((c, i) => (
                    <li key={c} className="flex justify-between gap-3">
                      <span className="text-ink-muted">{c}</span>
                      <span className={row.cells[i] === "future" ? "text-ink-faint" : "text-ink"}>
                        {t(`matrix.rel.${row.cells[i]}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-ink-faint">{t("matrix.footnote")}</p>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow={t("explorerSection.eyebrow")}
            title={t("explorerSection.title")}
            description={t("explorerSection.description")}
          />
          <div className="mt-10">
            <IndustryExplorer />
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow={t("foundation.eyebrow")}
            title={t("foundation.title")}
          />
          <div className="mt-8 flex flex-wrap gap-1.5">
            {foundation.map((f) => (
              <span
                key={f}
                className="border border-border-subtle bg-bg/50 px-2.5 py-1.5 text-[12px] text-ink-secondary"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow={t("variation.eyebrow")}
            title={t("variation.title")}
          />
          <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-[12px] text-ink-secondary">
            {variationSteps.map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="text-ink-faint" aria-hidden>
                    ↓
                  </span>
                )}
                <span className="border border-border bg-surface/40 px-3 py-2">
                  {s}
                </span>
              </span>
            ))}
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div>
              <p className="label mb-2">{t("variation.varies")}</p>
              <ul className="space-y-1 text-[13px] text-ink-secondary">
                {variesItems.map((x) => (
                  <li key={x}>· {x}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label mb-2">{t("variation.shared")}</p>
              <ul className="space-y-1 text-[13px] text-ink-secondary">
                {sharedItems.map((x) => (
                  <li key={x}>· {x}</li>
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
            eyebrow={t("provider.eyebrow")}
            title={t("provider.title")}
          />
          <div className="mt-8 border border-border bg-surface/30 p-5 font-mono text-[12px] leading-7 text-ink-secondary">
            <p className="text-gold">{t("provider.root")}</p>
            <p className="pl-3">├ {t("provider.object")}</p>
            <p className="pl-3">├ {t("provider.mobile")}</p>
            <p className="pl-3">├ {t("provider.events")}</p>
            <p className="pl-3">└ {t("provider.corporate")}</p>
          </div>
          <p className="mt-4 max-w-2xl text-[13px] text-ink-muted">{t("provider.body")}</p>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow={t("configuration.eyebrow")}
            title={t("configuration.title")}
            description={t("configuration.description")}
          />
          <div className="mt-8 flex flex-wrap gap-1.5">
            {configItems.map((c) => (
              <span
                key={c}
                className="border border-border-subtle bg-surface/40 px-2.5 py-1.5 text-[12px] text-ink-secondary"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-lg">{t("ctaTitle")}</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/solutions" variant="secondary">
                {t("exploreSolutions")}
              </Button>
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
      </section>
    </>
  );
}
