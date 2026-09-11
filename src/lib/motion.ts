/** ISB motion presets — reuse instead of one-off durations. */
export const motionDuration = {
  instant: 0.12,
  fast: 0.18,
  base: 0.28,
  slow: 0.42,
} as const;

export const motionEase = {
  standard: [0.25, 0.1, 0.25, 1] as const,
  out: [0.16, 1, 0.3, 1] as const,
};

export const springSoft = {
  type: "spring" as const,
  stiffness: 380,
  damping: 32,
  mass: 0.8,
};

export const springSnappy = {
  type: "spring" as const,
  stiffness: 520,
  damping: 36,
  mass: 0.7,
};
