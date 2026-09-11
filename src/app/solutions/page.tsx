import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { EnvironmentExplorer } from "@/components/solutions/EnvironmentExplorer";
import { SolutionContextSwitcher } from "@/components/solutions/SolutionContextSwitcher";
import { OsContinuity } from "@/components/os/OsContinuity";
import { SITE } from "@/lib/constants";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Security Operations Solutions",
  description:
    "Operational workflows and solution scenarios for object security, mobile patrol, events, retail, corporate, healthcare and public-sector environments.",
  alternates: { canonical: `${SITE.url}/solutions` },
};

export default function SolutionsPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
        ])}
      />
      <section className="section !pb-10">
        <div className="container-site">
          <div className="max-w-3xl">
            <OsContinuity
              steps={[
                { label: "Home", href: "/" },
                { label: "Solutions" },
                { label: "Platform", href: "/platform" },
              ]}
            />
            <p className="label mt-3">Solutions</p>
            <h1 className="heading-xl mt-3">
              Solutions designed around real security operations.
            </h1>
            <p className="body-lg mt-6 max-w-2xl">
              Every operational environment has different requirements, risks and
              stakeholders — while sharing one platform foundation for reporting,
              objects, personnel and audit.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/request-demo">
                Request Demo
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/platform" variant="secondary">
                Explore Platform
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section divider os-layer">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Operational context"
            title="One Security OS. Different configuration."
            description="Select a live operational context. Future specialist domains stay labelled separately."
          />
          <div className="mt-10">
            <SolutionContextSwitcher />
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Operational environments"
            title="Select an environment to explore the operational model."
            description="Each workspace shows context, risks, stakeholders, workflow, controls and how ISB changes the flow — not a feature list."
          />
          <div className="mt-10">
            <EnvironmentExplorer />
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <div className="border border-border bg-surface/40 p-8 md:p-10">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="heading-lg">Discuss how ISB maps to your operation.</h2>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="/request-demo">
                  Request Demo
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
                <Button href="/contact" variant="secondary">Contact ISB</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
