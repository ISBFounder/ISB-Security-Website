import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} | Enterprise Security Operations Software` },
  description:
    "ISB Security Solutions develops ISB Security Platform, a modular security operations platform for reporting, objects, personnel, operational workflows, compliance and AI-assisted reporting.",
  alternates: { canonical: SITE.url },
  openGraph: {
    title: `${SITE.name} | Enterprise Security Operations Software`,
    description:
      "Modular security operations platform under active development for professional security organizations across Europe.",
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Enterprise Security Operations Software`,
    description:
      "Modular security operations platform under active development for professional security organizations.",
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

      {/* Fragmentation architecture */}
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

      {/* Platform pillars explorer */}
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

      {/* Operational capability explorer */}
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
          <div className="mt-8 text-center">
            <Button href="/features" variant="secondary">
              Full feature catalogue
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* AI Report Assistant showcase */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            eyebrow="AI Report Assistant"
            title="AI that supports the report. Not the decision."
            description="ISB AI assists with structure, clarity and completeness while keeping the officer and supervisor responsible for the final operational record."
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

      {/* Security & Trust architecture */}
      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            eyebrow="Security & trust"
            title="Trust starts with architecture."
            description="ISB is being designed around identity, role-based access, tenant boundaries, traceability and controlled operational data flows. Production controls remain subject to deployment and infrastructure validation."
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

      {/* Industry solutions explorer */}
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

      {/* Roadmap preview */}
      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            eyebrow="Roadmap"
            title="Transparent product direction"
            description="Stages describe intent — not delivery dates or contractual commitments."
          />
          <div className="mt-12 md:mt-14">
            <HomeRoadmap />
          </div>
        </div>
      </section>

      {/* About / company story */}
      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <HomeAbout />
        </div>
      </section>

      <HomeEnterpriseCTA />
</>
  );
}
