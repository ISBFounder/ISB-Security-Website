"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type ViewId = "organization" | "people" | "workflows" | "engines";

const VIEWS: { id: ViewId; labelKey: string }[] = [
  { id: "organization", labelKey: "model.views.organization" },
  { id: "people", labelKey: "model.views.people" },
  { id: "workflows", labelKey: "model.views.workflows" },
  { id: "engines", labelKey: "model.views.engines" },
];

export function PlatformArchitecture() {
  const t = useTranslations("platform");
  const [view, setView] = useState<ViewId>("organization");
  const orgTree = t.raw("model.orgTree") as string[];
  const peopleTree = t.raw("model.peopleTree") as string[];
  const whyPoints = t.raw("model.whyPoints") as string[];
  const roles = t.raw("model.roles") as { name: string; scope: string }[];
  const workflow = t.raw("model.workflow") as string[];
  const engines = t.raw("model.engines") as string[];

  return (
    <div className="border border-border">
      <div
        role="tablist"
        aria-label={t("model.viewsAria")}
        className="flex gap-0 overflow-x-auto border-b border-border"
      >
        {VIEWS.map((v) => (
          <button
            key={v.id}
            type="button"
            role="tab"
            aria-selected={view === v.id}
            onClick={() => setView(v.id)}
            className={cn(
              "shrink-0 border-b-2 px-4 py-3 text-[13px] font-medium transition-colors",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold",
              view === v.id
                ? "border-gold text-ink"
                : "border-transparent text-ink-muted hover:text-ink-secondary"
            )}
          >
            {t(v.labelKey)}
          </button>
        ))}
      </div>

      <div className="bg-surface/15 p-5 md:p-6" role="tabpanel">
        {view === "organization" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <p className="label mb-3">{t("model.locationHierarchy")}</p>
              <ol className="border border-border-subtle bg-bg/40 p-4 font-mono text-[12px] leading-7 text-ink-secondary">
                {orgTree.map((n, i) => (
                  <li key={n} style={{ paddingLeft: `${Math.min(i, 6) * 0.75}rem` }}>
                    {i > 0 && <span className="text-ink-faint">└ </span>}
                    <span className={i === 0 || i === 2 ? "text-gold" : ""}>{n}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className="label mb-3">{t("model.why")}</p>
              <p className="text-[13px] text-ink-secondary">
                {t("model.whyBody")}
              </p>
              <ul className="mt-4 space-y-2 text-[12px] text-ink-muted">
                {whyPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {view === "people" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <p className="label mb-3">{t("model.accessModel")}</p>
              <ol className="border border-border-subtle bg-bg/40 p-4 font-mono text-[12px] leading-7 text-ink-secondary">
                {peopleTree.map((n, i) => (
                  <li key={n} style={{ paddingLeft: `${i * 0.75}rem` }}>
                    {i > 0 && <span className="text-ink-faint">└ </span>}
                    <span className={i === 0 || i === 1 ? "text-gold" : ""}>{n}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className="label mb-3">{t("model.roleExamples")}</p>
              <div className="space-y-2 text-[12px]">
                {roles.map((role) => (
                  <div key={role.name} className="border border-border-subtle bg-bg/30 px-3 py-2">
                    <p className="font-medium text-ink">{role.name}</p>
                    <p className="text-ink-muted">{role.scope}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === "workflows" && (
          <div>
            <p className="label mb-3">{t("model.intersection")}</p>
            <ol className="border border-border-subtle bg-bg/40 p-4 text-[13px] text-ink-secondary">
              {workflow.map((s, i) => (
                <li key={s} className="flex gap-3 py-1">
                  <span className="font-mono text-[10px] text-ink-faint">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
            <p className="mt-3 text-[11px] text-ink-faint">
              {t("model.workflowNote")}
            </p>
          </div>
        )}

        {view === "engines" && (
          <div>
            <p className="label mb-3">{t("model.enginesLabel")}</p>
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
              {engines.map((e) => (
                <div
                  key={e}
                  className="border border-border-subtle bg-bg/40 px-3 py-3 text-center text-[11px] text-ink-secondary"
                >
                  {e}
                </div>
              ))}
            </div>
            <p className="mt-4 text-[12px] text-ink-muted">
              {t("model.enginesNote")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
