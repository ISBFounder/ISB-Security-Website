import { SectionHeader } from "@/components/ui/SectionHeader";

export function CollaborationModel() {
  return (
    <section className="section divider bg-bg-secondary/40">
      <div className="container-site">
        <SectionHeader
          align="left"
          eyebrow="How collaboration works"
          title="Assignments through security companies."
        />
        <div className="mt-8 max-w-2xl space-y-4 text-[15px] leading-relaxed text-ink-secondary">
          <p>
            Freelance assignments are performed personally. They are accepted
            through established security companies or operational partners. The
            independent professional works under the commissioning
            organization’s contracts, procedures and client relationships.
          </p>
          <ul className="space-y-2 border-t border-border pt-4">
            {[
              "Project-based or shift-based collaboration where appropriate",
              "Scope, planning, tariff and assignment requirements agreed with the contracting organization",
              "Integration into existing briefings, reporting and escalation lines",
              "Professional communication with planners and supervisors",
            ].map((item) => (
              <li key={item} className="flex gap-2 text-[13px]">
                <span
                  className="mt-2 h-1 w-1 shrink-0 bg-gold/70"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-[13px] text-ink-muted">
            This page is not a recruitment or staffing service. ISB Security
            Solutions does not supply additional security personnel. No
            employment offers are made through this page.
          </p>
        </div>
      </div>
    </section>
  );
}
