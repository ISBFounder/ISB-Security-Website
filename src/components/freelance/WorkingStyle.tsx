import { SectionHeader } from "@/components/ui/SectionHeader";

const ITEMS = [
  {
    title: "Professionalism",
    text: "Assignments are approached with clear briefing, role clarity and respect for the commissioning company’s procedures.",
  },
  {
    title: "Reliability",
    text: "Agreed shifts and communication channels are treated as operational commitments.",
  },
  {
    title: "Clear communication",
    text: "Supervisors, colleagues and venue contacts receive timely, factual updates without unnecessary noise.",
  },
  {
    title: "Strong reporting",
    text: "Observations and incidents are recorded in a structured, usable form for supervisors and clients of the security company.",
  },
  {
    title: "Operational awareness",
    text: "Work stays grounded in site context, risk notes and escalation paths defined by the commissioning organization.",
  },
  {
    title: "Continuous development",
    text: "Professional standards and operational knowledge are maintained alongside platform development work.",
  },
  {
    title: "Technology mindset",
    text: "Comfortable with digital workflows and operational tools used by modern security organizations.",
  },
] as const;

export function WorkingStyle() {
  return (
    <section className="section divider">
      <div className="container-site">
        <SectionHeader
          align="left"
          eyebrow="Professional working style"
          title="What commissioning companies can expect."
        />
        <div className="mt-10 space-y-0 border-t border-border">
          {ITEMS.map((item, i) => (
            <div
              key={item.title}
              className="grid gap-2 border-b border-border-subtle py-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
            >
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                <span className="text-gold">{String(i + 1).padStart(2, "0")}</span>{" "}
                {item.title}
              </p>
              <p className="text-[13px] leading-relaxed text-ink-secondary">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
