import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} | Enterprise Security Operations Software` },
  description:
    "ISB Security Solutions develops ISB Security Platform, an enterprise security operations platform with an established multi-tenant foundation, operational object hierarchy and expanding workforce capabilities.",
  alternates: { canonical: SITE.url },
  openGraph: {
    title: `${SITE.name} | Enterprise Security Operations Software`,
    description:
      "Enterprise security operations platform with an established foundation and expanding capabilities for professional security organizations across Europe.",
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Enterprise Security Operations Software`,
    description:
      "Enterprise security operations platform with an established foundation and expanding capabilities for professional security organizations.",
  },
};

import { ArrowRight } from "lucide-react";
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

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            eyebrow="Industry reality"
            title="Security operations were never designed to run across disconnected tools."
            description="Reports, planning, messaging, customer requirements and operational records are often spread across separate systems. Every handover introduces friction, duplication and lost context."
          />
          <div className="mt-12 md:mt-14">
            <FragmentationArchitecture />
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            eyebrow="Platform framework"
            title="One platform. Six operational pillars."
            description="Every pillar shares the same organizational, object, user and audit context — one connected operational system, not a collection of unrelated modules."
          />
          <div className="mt-12 md:mt-14">
            <PlatformPillars />
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            eyebrow="Operational capabilities"
            title="One platform. Hundreds of operational workflows."
            description="Every capability shares the same operational context, security model and organizational structure. Different workflows. One platform foundation."
          />
          <div className="mt-12 md:mt-14">
            <OperationalCapabilityExplorer />
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            eyebrow="AI Report Assistant"
            title="AI that supports the report. Not the decision."
            description="AI capabilities are built on top of structured operational data, secure workflows and validated platform context. ISB AI assists with structure, clarity and completeness while keeping the officer and supervisor responsible for the final operational record."
          />
          <div className="mt-12 md:mt-14">
            <AIReportAssistantShowcase />
          </div>
          <div className="mt-8 text-center">
            <Button href="/ai" variant="secondary">
              AI approach
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            eyebrow="Security & trust"
            title="Trust starts with architecture."
            description="ISB is built around identity, role-based access, tenant isolation, traceability and controlled operational data flows — with an established security and audit foundation and continuously expanding operational capabilities."
          />
          <div className="mt-12 md:mt-14">
            <SecurityTrustArchitecture />
          </div>
          <div className="mt-8 text-center">
            <Button href="/security" variant="secondary">
              Security & trust
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            eyebrow="Industry solutions"
            title="Built around the way security operations actually differ."
            description="Object security, mobile patrol, events, healthcare and government operations do not share the same risk profile or workflow. ISB is designed to adapt without fragmenting the underlying platform."
          />
          <div className="mt-12 md:mt-14">
            <IndustrySolutionsExplorer />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/solutions" variant="secondary">
              Solutions by sector
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/industries" variant="ghost">
              Industries overview
            </Button>
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            eyebrow="Roadmap"
            title="Transparent product direction"
            description="Platform foundation and object hierarchy are completed. Workforce operations are active. AI intelligence is planned — not delivery commitments."
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
