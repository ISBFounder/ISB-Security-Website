import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { TrustArchitecture } from "@/components/security/TrustArchitecture";
import { AuthorizationFlow } from "@/components/security/AuthorizationFlow";
import { TenantIsolation } from "@/components/security/TenantIsolation";
import { AuditTrailVisual } from "@/components/security/AuditTrailVisual";
import { OsContinuity } from "@/components/os/OsContinuity";
import { SITE } from "@/lib/constants";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Security & Trust",
  description:
    "Who may perform what, within which context, under which authorization, with what auditability.",
  alternates: { canonical: `${SITE.url}/security` },
};

export default function SecurityPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Security", path: "/security" },
        ])}
      />
      <section className="section !pb-10">
        <div className="container-site">
          <div className="max-w-3xl">
            <OsContinuity
              steps={[
                { label: "Home", href: "/" },
                { label: "Platform", href: "/platform" },
                { label: "Technology", href: "/technology" },
                { label: "Security" },
              ]}
            />
            <p className="label mt-3">Security & Trust</p>
            <h1 className="heading-xl mt-3">
              Who may perform what, in which context, with what record.
            </h1>
            <p className="body-lg mt-6 max-w-2xl">
              Authorization, tenant boundaries and auditability are designed into the
              operating system. Conceptual paths only — no production policy logic is exposed.
            </p>
          </div>
        </div>
      </section>

      <section className="section divider os-layer">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Authorization model"
            title="Authorized path versus rejected path."
            description="Same officer identity. Different tenant context. The boundary holds."
          />
          <div className="mt-10 grid gap-12 lg:grid-cols-2">
            <AuthorizationFlow />
            <TenantIsolation />
          </div>
          <div className="mt-12 max-w-2xl">
            <AuditTrailVisual />
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <SectionHeader
            align="left"
            eyebrow="Trust architecture"
            title="How access narrows through context."
            description="Each layer constrains the next. Deeper than the homepage overview."
          />
          <div className="mt-10 max-w-2xl">
            <TrustArchitecture />
          </div>
        </div>
      </section>

      <section className="section divider">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-lg">Review the control model with ISB.</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/request-demo">Request Demo <ArrowRight className="h-4 w-4" aria-hidden /></Button>
              <Button href="/ai" variant="secondary">AI approach</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
