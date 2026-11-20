import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const STAGES = [
  {
    index: "Now",
    label: "Refine and validate",
    emphasis: "active" as const,
    items: [
      "Operational workflows",
      "Reporting workflows",
      "Workforce and planning",
      "Object management",
      "Selected offline workflows",
    ],
  },
  {
    index: "Next",
    label: "Integrate and validate",
    emphasis: "planned" as const,
    items: [
      "Current integration work",
      "Recovery work",
      "Environment validation",
      "Authority validation",
    ],
  },
  {
    index: "Later",
    label: "Expand and research",
    emphasis: "planned" as const,
    items: [
      "Connected operational capabilities",
      "External integrations",
      "Advanced AI research",
    ],
  },
] as const;

export function HomeRoadmap() {
  return (
    <div>
      <div className="grid gap-0 border border-border md:grid-cols-3">
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
                  stage.emphasis === "active" && "text-gold",
                  stage.emphasis === "planned" && "text-ink-muted"
                )}
              >
                {stage.index}
              </span>
              <p
                className={cn(
                  "text-[13px] font-semibold",
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
        The platform is in active development. It has not been announced as commercially available or production-validated. No public release date has been established.
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
