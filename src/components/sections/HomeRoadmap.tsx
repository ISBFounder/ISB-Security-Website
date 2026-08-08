import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const STAGES = [
  {
    index: "01",
    label: "Current Foundation",
    emphasis: "current" as const,
    items: [
      "Multi-tenant foundations",
      "Role-based access foundations",
      "Audit foundations",
      "Company and user context",
      "Object/location hierarchy foundations",
      "Specific Report workflow",
      "AI-assisted Specific Report workflow",
      "Structured reporting foundations",
    ],
  },
  {
    index: "02",
    label: "Active Development",
    emphasis: "active" as const,
    items: [
      "Broader reporting workflows",
      "Operational notifications",
      "Object management expansion",
      "Personnel context",
      "Workflow coordination",
      "Supervisor review flows",
      "Mobile experience",
      "Operational dashboards",
    ],
  },
  {
    index: "03",
    label: "Planned Expansion",
    emphasis: "planned" as const,
    items: [
      "Scheduling",
      "Patrol workflow expansion",
      "Checkpoint workflows",
      "Customer portals",
      "Offline capabilities",
      "Realtime synchronization expansion",
      "Integration framework",
      "Advanced analytics",
    ],
  },
  {
    index: "04",
    label: "Future Intelligence",
    emphasis: "future" as const,
    items: [
      "Operational pattern analysis",
      "Risk signals",
      "Recommendations",
      "Talent & Operations Intelligence",
      "Team Compatibility Engine",
      "Predictive operational support",
      "Cross-sector modular expansion",
    ],
  },
] as const;

export function HomeRoadmap() {
  return (
    <div>
      {/* Track */}
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
                  stage.emphasis === "planned" && "text-ink-muted",
                  stage.emphasis === "future" && "text-ink-faint"
                )}
              >
                {stage.index}
              </span>
              <p
                className={cn(
                  "text-[13px] font-semibold",
                  stage.emphasis === "current" && "text-ink",
                  stage.emphasis === "active" && "text-gold",
                  stage.emphasis === "planned" && "text-ink-secondary",
                  stage.emphasis === "future" && "text-ink-muted"
                )}
              >
                {stage.label}
              </p>
            </div>
            <ul className="mt-4 space-y-1.5">
              {stage.items.map((item) => (
                <li
                  key={item}
                  className={cn(
                    "text-[12px] leading-snug",
                    stage.emphasis === "future" ? "text-ink-faint" : "text-ink-secondary"
                  )}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-5 text-[12px] text-ink-muted">
        Roadmap items describe current product direction and may change as
        development, validation and customer requirements evolve.
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
