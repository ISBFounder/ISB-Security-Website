import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const STAGES = [
  {
    index: "01",
    label: "Platform Foundation",
    emphasis: "current" as const,
    items: [
      "Multi-tenant SaaS architecture",
      "Authentication & RBAC",
      "Row Level Security",
      "Tenant isolation",
      "Audit framework",
      "Secure storage model",
      "Reporting foundation",
    ],
  },
  {
    index: "02.1",
    label: "Object Hierarchy",
    emphasis: "current" as const,
    items: [
      "Company → Customer → Object hierarchy",
      "Building through checkpoint structure",
      "Instructions, risks, escalations",
      "Document lifecycle",
      "Persona-based authorization",
      "Entity-scoped audit",
    ],
  },
  {
    index: "02.2",
    label: "Workforce Operations",
    emphasis: "active" as const,
    items: [
      "Shift & assignment lifecycle",
      "Service contracts & requests",
      "Scheduling expansion",
      "Dispatch system",
      "Compliance & matching engines",
      "Persona workspaces",
    ],
  },
  {
    index: "03",
    label: "AI Intelligence",
    emphasis: "planned" as const,
    items: [
      "AI reporting assistant expansion",
      "Risk detection",
      "Operational recommendations",
      "Talent intelligence",
      "Team compatibility engine",
    ],
  },
] as const;

export function HomeRoadmap() {
  return (
    <div>
      <div className="grid gap-0 border border-border md:grid-cols-4">
        {STAGES.map((stage, i) => (
          <div
            key={stage.index}
            className={cn(
              "relative p-5",
              i < STAGES.length - 1 && "border-b border-border md:border-b-0 md:border-r"
            )}
          >
            <div className="flex items-baseline gap-2">
              <span
                className={cn(
                  "font-mono text-[11px]",
                  stage.emphasis === "current" && "text-ink",
                  stage.emphasis === "active" && "text-gold",
                  stage.emphasis === "planned" && "text-ink-muted"
                )}
              >
                {stage.index}
              </span>
              <p
                className={cn(
                  "text-[13px] font-semibold",
                  stage.emphasis === "current" && "text-ink",
                  stage.emphasis === "active" && "text-gold",
                  stage.emphasis === "planned" && "text-ink-secondary"
                )}
              >
                {stage.label}
              </p>
            </div>
            <ul className="mt-4 space-y-1.5">
              {stage.items.map((item) => (
                <li key={item} className="text-[12px] leading-snug text-ink-secondary">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-5 text-[12px] text-ink-muted">
        Platform foundation and object hierarchy are completed. Workforce operations are active. AI intelligence is planned — not delivery commitments.
      </p>

      <div className="mt-6">
        <Link
          href="/roadmap"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-secondary transition-colors hover:text-gold"
        >
          View full roadmap
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
