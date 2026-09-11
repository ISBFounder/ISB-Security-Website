import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { PlatformArchitecture } from "@/components/platform/PlatformArchitecture";
import { PlatformOsExplorer } from "@/components/platform/PlatformOsExplorer";
import { OsContinuity } from "@/components/os/OsContinuity";
import { SITE } from "@/lib/constants";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Security Operations Platform",
  description:
    "ISB Security Platform — enterprise security operations platform with an established multi-tenant foundation, operational object hierarchy and expanding workforce capabilities.",
  alternates: { canonical: `${SITE.url}/platform` },
};

export default function PlatformPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Platform", path: "/platform" },
        ])}
      />

      <section className="section !pb-10">
        <div className="container-site">
          <div className="max-w-3xl">
            <OsContinuity
              steps={[
                { label: "Home", href: "/" },
                { label: "Platform" },
                { label: "Technology", href: "/technology" },
                { label: "Security", href: "/security" },
              ]}
            />
            <p className="label mt-3">Platform</p>
            <h1 className="heading-xl mt-3">
              Enterprise security operations platform with an established operational foundation.
            </h1>
            <p className="body-lg mt-6 max-w-2xl">
              ISB Security Platform connects organizations, customers, objects, personnel
              and operational workflows on one shared foundation.
            </p>
          </div>
        </div>
      </section>

      <section className="section divider os-layer">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Security OS"
            title="One foundation. Shared context. Operational domains."
            description="Domains inherit identity, permissions and audit. They do not each recreate the operating system."
          />
          <div className="mt-10">
            <PlatformOsExplorer />
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Architecture model"
            title="Structured from organization to checkpoint."
            description="Explore how location hierarchy, people and access, workflows and shared engines form one operating model."
          />
          <div className="mt-10">
            <PlatformArchitecture />
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-lg">Explore how ISB could map to your operation.</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/request-demo">
                Request Demo
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/technology" variant="secondary">Technology</Button>
              <Button href="/security" variant="secondary">Security</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
