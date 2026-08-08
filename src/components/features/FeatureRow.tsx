import { FeatureStatus, type FeatureStage } from "./FeatureStatus";

type Props = {
  name: string;
  purpose: string;
  stage: FeatureStage;
  workflow?: string;
  connected?: string;
  note?: string;
};

export function FeatureRow({
  name,
  purpose,
  stage,
  workflow,
  connected,
  note,
}: Props) {
  return (
    <div className="grid gap-2 border-b border-border-subtle py-3 last:border-0 sm:grid-cols-[1fr_auto] sm:items-start">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-[14px] font-semibold text-ink">{name}</h3>
          <FeatureStatus stage={stage} />
        </div>
        <p className="mt-1 text-[13px] text-ink-secondary">{purpose}</p>
        {(workflow || connected || note) && (
          <p className="mt-1.5 font-mono text-[11px] text-ink-faint">
            {[workflow && `Workflow · ${workflow}`, connected && `Connected · ${connected}`, note]
              .filter(Boolean)
              .join(" · ")}
          </p>
        )}
      </div>
    </div>
  );
}
