import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { isLocale } from "@/i18n/routing";
import { routeMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HomeHero } from "@/components/sections/HomeHero";
import { FragmentationArchitecture } from "@/components/visuals/FragmentationArchitecture";
import { PlatformPillars } from "@/components/sections/PlatformPillars";
import { OperationalCapabilityExplorer } from "@/components/sections/OperationalCapabilityExplorer";
import { IndustrySolutionsExplorer } from "@/components/sections/IndustrySolutionsExplorer";
import { AIReportAssistantShowcase } from "@/components/sections/AIReportAssistantShowcase";
import { SecurityTrustArchitecture } from "@/components/sections/SecurityTrustArchitecture";
import { HomeRoadmap } from "@/components/sections/HomeRoadmap";
import { HomeAbout } from "@/components/sections/HomeAbout";
import { HomeEnterpriseCTA } from "@/components/sections/HomeEnterpriseCTA";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  return routeMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    ogDescription: t("ogDescription"),
    twitterDescription: t("twitterDescription"),
    path: "/",
    absoluteTitle: true,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <>
      <HomeHero />

      <section className="section divider os-layer">
        <div className="container-site">
          <SectionHeader
            eyebrow={t("page.fragmentation.eyebrow")}
            title={t("page.fragmentation.title")}
            description={t("page.fragmentation.description")}
          />
          <div className="mt-12 md:mt-14">
            <FragmentationArchitecture />
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            eyebrow={t("page.pillars.eyebrow")}
            title={t("page.pillars.title")}
            description={t("page.pillars.description")}
          />
          <div className="mt-12 md:mt-14">
            <PlatformPillars />
          </div>
        </div>
      </section>

      <section className="section divider os-layer">
        <div className="container-site">
          <SectionHeader
            eyebrow={t("page.capabilities.eyebrow")}
            title={t("page.capabilities.title")}
            description={t("page.capabilities.description")}
          />
          <div className="mt-12 md:mt-14">
            <OperationalCapabilityExplorer />
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            eyebrow={t("page.ai.eyebrow")}
            title={t("page.ai.title")}
            description={t("page.ai.description")}
          />
          <div className="mt-12 md:mt-14">
            <AIReportAssistantShowcase />
          </div>
          <div className="mt-8 text-center">
            <Button href="/ai" variant="secondary">
              {t("page.ai.cta")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="section divider os-layer">
        <div className="container-site">
          <SectionHeader
            eyebrow={t("page.trust.eyebrow")}
            title={t("page.trust.title")}
            description={t("page.trust.description")}
          />
          <div className="mt-12 md:mt-14">
            <SecurityTrustArchitecture />
          </div>
          <div className="mt-8 text-center">
            <Button href="/security" variant="secondary">
              {t("page.trust.cta")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            eyebrow={t("page.industries.eyebrow")}
            title={t("page.industries.title")}
            description={t("page.industries.description")}
          />
          <div className="mt-12 md:mt-14">
            <IndustrySolutionsExplorer />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/solutions" variant="secondary">
              {t("page.industries.solutions")}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/industries" variant="ghost">
              {t("page.industries.overview")}
            </Button>
          </div>
        </div>
      </section>

      <section className="section divider os-layer">
        <div className="container-site">
          <SectionHeader
            eyebrow={t("page.roadmap.eyebrow")}
            title={t("page.roadmap.title")}
            description={t("page.roadmap.description")}
          />
          <div className="mt-12 md:mt-14">
            <HomeRoadmap />
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <HomeAbout />
        </div>
      </section>

      <HomeEnterpriseCTA />
    </>
  );
}
