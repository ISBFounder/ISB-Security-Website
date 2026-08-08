import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function FreelanceHero() {
  return (
    <section className="section !pb-10">
      <div className="container-site">
        <div className="max-w-3xl">
          <p className="label">Freelance security</p>
          <h1 className="heading-xl mt-3">Freelance Security Professional</h1>
          <p className="body-lg mt-6 max-w-2xl">
            Professional freelance security services for hospitality, events and
            operational security assignments through established security
            organizations.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact?intent=general">
              Discuss Collaboration
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button href="/contact" variant="secondary">
              Contact ISB
            </Button>
          </div>
          <p className="mt-6 max-w-2xl text-[13px] text-ink-muted">
            This page describes independent freelance security work performed
            personally. It is separate from ISB Security Platform, the software
            product developed by ISB Security Solutions.
          </p>
        </div>
      </div>
    </section>
  );
}
