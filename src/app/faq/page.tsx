import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { FAQ_ITEMS } from "@/data/faq";
import { SITE } from "@/lib/constants";
import { StructuredData } from "@/components/seo/StructuredData";
import { faqPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about ISB Security Platform, development status, architecture, AI-assisted reporting, security, operational use and future availability.",
  alternates: { canonical: `${SITE.url}/faq` },
  openGraph: {
    title: `FAQ | ${SITE.name}`,
    description:
      "Answers about ISB Security Platform, development status, architecture, AI-assisted reporting, security, operational use and future availability.",
    url: `${SITE.url}/faq`,
  },
  twitter: {
    card: "summary_large_image",
    title: `FAQ | ${SITE.name}`,
    description:
      "Answers about ISB Security Platform, development status, architecture, AI-assisted reporting, security, operational use and future availability.",
  },
};

export default function FAQPage() {
  return (
    <>
      <StructuredData
        data={[
          faqPageJsonLd(FAQ_ITEMS.map((i) => ({ question: i.question, answer: i.answer }))),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
        ]}
      />
      <section className="section !pb-10">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="label">FAQ</p>
            <h1 className="heading-xl mt-3">Questions about the platform.</h1>
            <p className="body-lg mt-6 max-w-2xl">
              Clear answers about what ISB Security Platform is, how it is being
              developed and how it is intended to support professional security
              operations.
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-wide text-ink-muted">
              Platform development active
            </p>
          </div>
        </div>
      </section>

      <section className="section divider !pt-0">
        <div className="container-site">
          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-lg">
              Still evaluating whether ISB fits your operation?
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/request-demo">
                Request Demo
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/contact" variant="secondary">
                Contact ISB
              </Button>
              <Button href="/platform" variant="secondary">
                Explore Platform
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
