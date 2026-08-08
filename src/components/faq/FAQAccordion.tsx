"use client";

import {
  useState,
  useRef,
  useCallback,
  useMemo,
  type KeyboardEvent as RKEvent,
} from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FAQ_CATEGORIES,
  type FAQItem,
  type FAQCategoryId,
} from "@/data/faq";

type Props = {
  items: FAQItem[];
};

export function FAQAccordion({ items }: Props) {
  const [category, setCategory] = useState<FAQCategoryId | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const catRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const categories = useMemo(
    () => [{ id: "all" as const, label: "All" }, ...FAQ_CATEGORIES],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (!q) return true;
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [items, category, query]);

  const selectCategory = useCallback((id: FAQCategoryId | "all", index: number) => {
    setCategory(id);
    setOpenId(null);
    catRefs.current[index]?.focus();
  }, []);

  function onCatKey(e: RKEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      next = (index + 1) % categories.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      next = (index - 1 + categories.length) % categories.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      next = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      next = categories.length - 1;
    } else return;
    selectCategory(categories[next].id, next);
  }

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.28fr)_minmax(0,0.72fr)]">
      {/* Category rail */}
      <div>
        <p className="label mb-3">Categories</p>
        <div
          role="tablist"
          aria-label="FAQ categories"
          aria-orientation="vertical"
          className="flex gap-0 overflow-x-auto border border-border lg:flex-col lg:overflow-visible"
        >
          {categories.map((c, i) => {
            const selected = category === c.id;
            return (
              <button
                key={c.id}
                ref={(el) => {
                  catRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                onClick={() => selectCategory(c.id, i)}
                onKeyDown={(e) => onCatKey(e, i)}
                className={cn(
                  "shrink-0 px-4 py-2.5 text-left text-[13px] font-medium transition-colors",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold",
                  selected
                    ? "border-b-2 border-gold bg-surface text-ink lg:border-b-0 lg:border-l-2"
                    : "border-b-2 border-transparent text-ink-muted hover:text-ink-secondary lg:border-l-2 lg:border-transparent"
                )}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="mt-4">
          <label htmlFor="faq-search" className="label">
            Search
          </label>
          <div className="relative mt-2">
            <input
              id="faq-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions…"
              className="w-full border border-border bg-bg/50 px-3 py-2 text-[13px] text-ink placeholder:text-ink-faint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold"
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-wide text-ink-muted hover:text-ink"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Accordion */}
      <div>
        <p className="mb-3 font-mono text-[11px] text-ink-faint">
          {filtered.length} question{filtered.length === 1 ? "" : "s"}
        </p>
        {filtered.length === 0 ? (
          <p className="border border-border-subtle bg-bg/40 px-4 py-6 text-[13px] text-ink-muted">
            No questions match this filter.
          </p>
        ) : (
          <div className="border-t border-border">
            {filtered.map((item) => {
              const open = openId === item.id;
              const panelId = `faq-panel-${item.id}`;
              const btnId = `faq-btn-${item.id}`;
              return (
                <div key={item.id} className="border-b border-border">
                  <h3>
                    <button
                      type="button"
                      id={btnId}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => toggle(item.id)}
                      className={cn(
                        "flex w-full items-start justify-between gap-4 py-4 text-left",
                        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold"
                      )}
                    >
                      <span className="text-[15px] font-medium text-ink">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={cn(
                          "mt-1 h-4 w-4 shrink-0 text-ink-muted transition-transform duration-200",
                          open && "rotate-180"
                        )}
                        aria-hidden
                      />
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    hidden={!open}
                    className={cn(
                      "overflow-hidden pb-4 text-[14px] leading-relaxed text-ink-secondary",
                      !open && "hidden"
                    )}
                  >
                    {item.answer}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
