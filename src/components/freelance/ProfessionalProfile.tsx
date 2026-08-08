import { SectionHeader } from "@/components/ui/SectionHeader";

export function ProfessionalProfile() {
  return (
    <section className="section divider">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Professional profile"
              title="Operational work alongside platform development."
            />
          </div>
          <div className="space-y-4 text-[15px] leading-relaxed text-ink-secondary">
            <p>
              The founder of ISB Security Solutions works as an independent
              freelance security officer while developing ISB Security Platform.
              Assignments are carried out personally for and through established
              security companies — not as a staffing agency, recruitment service
              or personnel supplier under the ISB brand.
            </p>
            <p>
              ISB Security Solutions remains a software company. Freelance
              security work is a separate professional activity: project-based
              operational support integrated into the commissioning
              organization’s structure, procedures and reporting lines.
            </p>
            <p>
              Work is approached with a professional operational mindset: clear
              communication with supervisors and colleagues, structured
              reporting, and respect for site-specific instructions and
              escalation paths. A technology-oriented method supports accurate
              digital reporting and efficient use of tools already used by the
              commissioning security company.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
