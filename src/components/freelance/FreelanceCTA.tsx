import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function FreelanceCTA() {
  return (
    <>
      <section className="section divider">
        <div className="container-site">
          <div className="max-w-2xl">
            <SectionHeader
              align="left"
              eyebrow="Availability"
              title="Discussed per collaboration."
            />
            <p className="mt-6 text-[15px] leading-relaxed text-ink-secondary">
              Availability depends on existing commitments, assignment
              requirements and location. Capacity is not guaranteed in advance,
              and no response time or acceptance SLA is promised. Security
              companies interested in collaboration can make contact to discuss
              fit and timing.
            </p>
            <div className="mt-6">
              <Button href="/contact?intent=general" variant="secondary">
                Discuss Availability
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section divider bg-bg-secondary/40">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-lg">
              Discuss a freelance security assignment.
            </h2>
            <p className="body mt-4">
              Security companies and operational partners can contact ISB
              Security Solutions to discuss suitable freelance assignments in
              hospitality, events and related security environments.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/contact?intent=general">
                Discuss Collaboration
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/contact" variant="secondary">
                Contact ISB
              </Button>
            </div>
            <p className="mt-6 text-[12px] text-ink-faint">
              For platform demonstrations, use{" "}
              <Link
                href="/request-demo"
                className="text-gold hover:text-gold-light"
              >
                Request Demo
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
