import { SectionHeader } from "@/components/ui/SectionHeader";

const PRIMARY = [
  {
    title: "Hospitality Security",
    text: "Guest-facing environments where presence, communication and calm incident handling matter as much as procedure. Typical work includes access control, guest-facing security, conflict de-escalation, venue rules, coordination with venue management and accurate incident reporting — within the authority of a security officer and the commissioning company’s instructions.",
  },
  {
    title: "Event Security",
    text: "Temporary, high-density operations with clear briefing, zone awareness and structured incident capture. Typical work includes event access control, crowd observation, incident response, team coordination, visitor communication, escalation and reporting — working within operational instructions set by the event security organization. Event management responsibility is not claimed.",
  },
] as const;

const RELATED = [
  {
    title: "Object Security",
    text: "Fixed-site assignments requiring object knowledge, instruction adherence, patrol discipline and reliable shift handover.",
  },
  {
    title: "Reception & Access Control",
    text: "Front-of-house and access points where identification checks, visitor handling and clear communication form part of the operational role.",
  },
  {
    title: "Municipal / public environments",
    text: "Public-facing locations where professionalism, documentation and escalation discipline are essential.",
  },
  {
    title: "Operational Support",
    text: "Temporary reinforcement for peaks, absences or project periods — integrated into the commissioning company’s existing procedures and reporting lines.",
  },
] as const;

export function FreelanceSpecializations() {
  return (
    <section className="section divider bg-bg-secondary/40">
      <div className="container-site">
        <SectionHeader
          align="left"
          eyebrow="Freelance specializations"
          title="Primary focus: hospitality and events."
          description="Related operational environments may be relevant depending on assignment requirements and the commissioning organization."
        />

        <div className="mt-10 grid gap-0 border border-border lg:grid-cols-2">
          {PRIMARY.map((item, i) => (
            <div
              key={item.title}
              className={`p-6 ${i === 0 ? "border-b border-border lg:border-b-0 lg:border-r" : ""}`}
            >
              <p className="font-mono text-[10px] uppercase tracking-wider text-gold">
                Primary focus
              </p>
              <h3 className="mt-2 text-[16px] font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-ink-secondary">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-0 border border-border sm:grid-cols-2">
          {RELATED.map((item, i) => (
            <div
              key={item.title}
              className={`p-5 ${
                i < RELATED.length - 1 ? "border-b border-border" : ""
              } ${i % 2 === 0 ? "sm:border-r" : "sm:border-r-0"} ${
                i < 2 ? "sm:border-b" : "sm:border-b-0"
              }`}
            >
              <h3 className="text-[14px] font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-secondary">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
