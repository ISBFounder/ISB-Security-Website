import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { AILifecycleExplorer } from "@/components/ai/AILifecycleExplorer";
import { AIHumanWorkflow } from "@/components/ai/AIHumanWorkflow";
import { AIBeforeAfter } from "@/components/ai/AIBeforeAfter";
import { OsContinuity } from "@/components/os/OsContinuity";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd, routeMetadata } from "@/lib/seo";
import { isLocale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ai" });
  return routeMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/ai",
    ogDescription: t("metaOgDescription"),
    twitterDescription: t("metaTwitterDescription"),
  });
}

export default async function AIPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  setRequestLocale(locale);
  const t = await getTranslations("ai");
  const badges = t.raw("badges") as string[];
  const controlItems = t.raw("controlItems") as { title: string; body: string }[];
  const maturityItems = t.raw("maturityItems") as { stage: string; items: string }[];

  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd(locale, [
          { name: t("breadcrumbHome"), path: "/" },
          { name: t("breadcrumb"), path: "/ai" },
        ])}
      />

      <section className="section !pb-10">
        <div className="container-site">
          <div className="max-w-3xl">
            <OsContinuity
              steps={[
                { label: t("continuityPipeline"), href: "/" },
                { label: t("continuityWorkflow") },
              ]}
            />
            <p className="label mt-3">{t("eyebrow")}</p>
            <h1 className="heading-xl mt-3">{t("title")}</h1>
            <p className="body-lg mt-6 max-w-2xl">{t("intro")}</p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {badges.map((s) => (
                <span
                  key={s}
                  className="border border-border-subtle bg-surface/40 px-2.5 py-1 font-mono text-[10px] text-ink-muted"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow={t("principleEyebrow")}
            title={t("principleTitle")}
          />
          <p className="mt-4 max-w-2xl text-[13px] text-ink-muted">{t("principleBody")}</p>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow={t("assistantEyebrow")}
            title={t("assistantTitle")}
            description={t("assistantDescription")}
          />
          <div className="mt-10">
            <AIHumanWorkflow />
          </div>
          <div className="mt-10">
            <AIBeforeAfter />
          </div>
          <div className="mt-10">
            <AILifecycleExplorer />
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow={t("controlEyebrow")}
            title={t("controlTitle")}
          />
          <div className="mt-8 grid gap-0 border border-border sm:grid-cols-2">
            {controlItems.map((item, i) => (
              <div key={item.title} className={`p-5 ${i < 3 ? "border-b border-border" : ""} ${i % 2 === 0 ? "sm:border-r" : ""} ${i < 2 ? "sm:border-b" : "sm:border-b-0"}`}>
                <p className="font-mono text-[10px] uppercase tracking-wider text-gold">{item.title}</p>
                <p className="mt-2 text-[13px] text-ink-secondary">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow={t("maturityEyebrow")}
            title={t("maturityTitle")}
          />
          <div className="mt-8 grid gap-0 border border-border md:grid-cols-3">
            {maturityItems.map((m, i) => (
              <div key={m.stage} className={`p-5 ${i < 2 ? "border-b border-border md:border-b-0 md:border-r" : ""}`}>
                <p className="font-mono text-[10px] uppercase tracking-wider text-gold">{m.stage}</p>
                <p className="mt-3 text-[13px] text-ink-secondary">{m.items}</p>
              </div>
            ))}
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
              <Button href="/security" variant="secondary">
                {t("exploreSecurity")}
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
