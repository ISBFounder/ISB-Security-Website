import Link from "next/link";
import { ArrowRight } from "lucide-react";

const THEMES = [
  {
    label: "Origin",
    text: "Direct operational experience inside professional security environments.",
  },
  {
    label: "Problem",
    text: "Fragmented software, repeated administration and disconnected operational context.",
  },
  {
    label: "Direction",
    text: "One modular platform capable of growing across security disciplines and, later, adjacent operational sectors.",
  },
] as const;

const PRINCIPLES = [
  "Innovation",
  "Reliability",
  "Security",
  "Efficiency",
  "Trust",
  "Professionalism",
] as const;

export function HomeAbout() {
  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="label">About ISB</p>
        <h2 className="heading-lg mt-3">Built from inside security operations.</h2>
        <p className="body-lg mt-5 max-w-prose">
          ISB Security Solutions was founded from direct operational experience
          with security environments where reporting, planning, object
          information, communication and compliance are frequently spread across
          different tools.
        </p>
        <p className="body mt-4 max-w-prose">
          The goal is not to create another isolated security application. The
          goal is to create one modular operational platform capable of supporting
          the broader security workflow.
        </p>

        {/* Origin / Problem / Direction */}
        <div className="mt-8 space-y-0 border-t border-border">
          {THEMES.map((t) => (
            <div
              key={t.label}
              className="grid gap-2 border-b border-border-subtle py-4 sm:grid-cols-[120px_1fr]"
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-gold">
                {t.label}
              </p>
              <p className="text-[14px] text-ink-secondary">{t.text}</p>
            </div>
          ))}
        </div>

        <Link
          href="/about"
          className="mt-8 inline-flex items-center gap-2 text-[13px] font-medium text-ink-secondary transition-colors hover:text-gold"
        >
          About ISB
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      <div className="space-y-6">
        {/* Mission / Vision */}
        <div className="border border-border bg-surface/30 p-5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
            Mission
          </p>
          <p className="mt-2 text-[14px] text-ink-secondary">
            Transform the European security industry through one intelligent
            operational platform.
          </p>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-wider text-ink-faint">
            Vision
          </p>
          <p className="mt-2 text-[14px] text-ink-secondary">
            Replace fragmented operational systems with a secure, modular and
            AI-assisted ecosystem.
          </p>
        </div>

        {/* Principles */}
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
            Principles
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {PRINCIPLES.map((p) => (
              <span
                key={p}
                className="border border-border-subtle bg-bg/40 px-2.5 py-1.5 text-[12px] text-ink-secondary"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* European positioning + metadata */}
        <div className="border-t border-border-subtle pt-5 font-mono text-[11px] leading-relaxed text-ink-muted">
          <p>Developed in the Netherlands</p>
          <p>European security industry focus</p>
          <p>Designed with European operating environments in mind</p>
          <p className="text-ink-faint">Future international ambition</p>
          <p className="mt-4 text-ink-faint">
            ISB Security Solutions · Tilburg, The Netherlands · KVK 42099495
          </p>
          <p className="text-ink-faint">Enterprise Security Operations Software</p>
        </div>
      </div>
    </div>
  );
}
