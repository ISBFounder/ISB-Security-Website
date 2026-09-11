"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

/** Desktop-only, low-amplitude pointer tilt. Off on touch, small viewports, reduced motion. */
export function HeroProductStage({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mqFine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const mqWide = window.matchMedia("(min-width: 1024px)");
    const update = () => setEnabled(mqFine.matches && mqWide.matches && !reduce);
    update();
    mqFine.addEventListener("change", update);
    mqWide.addEventListener("change", update);
    return () => {
      mqFine.removeEventListener("change", update);
      mqWide.removeEventListener("change", update);
    };
  }, [reduce]);

  const reset = useCallback(() => {
    const el = stageRef.current;
    if (!el) return;
    el.style.transform = "perspective(1400px) rotateX(0deg) rotateY(0deg)";
  }, []);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enabled) return;
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        el.style.transform = `perspective(1400px) rotateX(${(-ny * 2.4).toFixed(3)}deg) rotateY(${(nx * 3.2).toFixed(3)}deg)`;
      });
    },
    [enabled]
  );

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className="relative" onMouseMove={onMove} onMouseLeave={reset}>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 hidden rounded-[2px] bg-[radial-gradient(ellipse_at_center,rgba(198,161,91,0.07),transparent_62%)] lg:block"
      />
      <div
        ref={stageRef}
        className="relative will-change-transform"
        style={{
          transform: "perspective(1400px) rotateX(0deg) rotateY(0deg)",
          transition: enabled ? "transform 180ms cubic-bezier(0.16, 1, 0.3, 1)" : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
}
