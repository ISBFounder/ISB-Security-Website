import { SectionHeader } from "@/components/ui/SectionHeader";

const QUALIFICATIONS = [
  {
    code: "SVPB",
    name: "Security Officer",
    note: "Dutch private security officer qualification",
  },
  {
    code: "BHV",
    name: "Emergency response",
    note: "Company emergency response certified",
  },
  {
    code: "VCA",
    name: "VOL",
    note: "Safety for operational supervisors",
  },
] as const;

export function Qualifications() {
  return (
    <section className="section divider bg-bg-secondary/40">
      <div className="container-site">
        <SectionHeader
          align="left"
          eyebrow="Qualifications"
          title="Formal credentials held."
          description="No additional certifications beyond those listed are claimed."
        />
        <div className="mt-8 max-w-xl space-y-0 border-t border-border">
          {QUALIFICATIONS.map((q) => (
            <div
              key={q.code}
              className="grid grid-cols-[5rem_1fr] gap-4 border-b border-border-subtle py-4 text-[13px]"
            >
              <p className="font-mono text-[12px] font-medium text-gold">
                {q.code}
              </p>
              <div>
                <p className="font-medium text-ink">{q.name}</p>
                <p className="mt-0.5 text-ink-muted">{q.note}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-xl text-[12px] text-ink-faint">
          Where required for assignment, a valid Dutch private security
          identification/pass is used in accordance with applicable rules. No ND
          number, firearms training, police qualification or ISO certification is
          claimed.
        </p>
      </div>
    </section>
  );
}
