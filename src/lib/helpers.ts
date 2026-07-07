import type { CrowdLevel } from "./constants";
import { MAX_CHAT_LENGTH } from "./constants";

/** Strip HTML tags and cap length before sending to AI. */
export const sanitizeInput = (text: string): string =>
  text.replace(/<[^>]*>/g, "").slice(0, MAX_CHAT_LENGTH);

/** Semantic token classes for a crowd level. */
export const getCrowdColor = (level: CrowdLevel): string => {
  if (level === "HIGH") return "bg-danger/20 text-danger border-danger/40";
  if (level === "MEDIUM") return "bg-warning/20 text-warning border-warning/40";
  return "bg-success/20 text-success border-success/40";
};

/** Progress bar fill color for a crowd level. */
export const getCrowdBar = (level: CrowdLevel): string => {
  if (level === "HIGH") return "bg-danger";
  if (level === "MEDIUM") return "bg-warning";
  return "bg-success";
};

/** Human-friendly wait time. */
export const formatWaitTime = (minutes: number): string => {
  if (minutes <= 0) return "No wait";
  if (minutes === 1) return "1 min wait";
  return `${minutes} min wait`;
};

/** Deterministic pseudo-random for stable SSR + client demo data. */
const seeded = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

export interface ZoneData {
  zone: string;
  level: CrowdLevel;
  wait: number;
  capacity: number;
}

/** Generate demo crowd data, cycles over time. */
export const generateCrowdData = (zones: readonly string[], tick: number): ZoneData[] => {
  return zones.map((zone, i) => {
    const r = seeded(tick + i * 13)();
    const capacity = Math.min(100, Math.round(30 + r * 70));
    const level: CrowdLevel = capacity > 75 ? "HIGH" : capacity > 45 ? "MEDIUM" : "LOW";
    const wait = level === "HIGH" ? 15 + Math.round(r * 20) : level === "MEDIUM" ? 5 + Math.round(r * 10) : Math.round(r * 3);
    return { zone, level, wait, capacity };
  });
};
