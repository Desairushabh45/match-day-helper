import type { CrowdLevel } from "./constants";
import {
  MAX_CHAT_LENGTH,
  CAPACITY_HIGH_THRESHOLD,
  CAPACITY_MEDIUM_THRESHOLD,
  CAPACITY_BASELINE,
  CAPACITY_RANGE,
} from "./constants";

/**
 * Strip HTML tags and cap length before sending user input to the AI.
 * @param text Raw user input from the chat textarea.
 * @returns Sanitized string, no HTML, no longer than {@link MAX_CHAT_LENGTH}.
 */
export const sanitizeInput = (text: string): string =>
  text.replace(/<[^>]*>/g, "").slice(0, MAX_CHAT_LENGTH);

/**
 * Semantic Tailwind classes (background/border/text) for a badge showing crowd level.
 * @param level Discrete crowd level.
 */
export const getCrowdColor = (level: CrowdLevel): string => {
  if (level === "HIGH") return "bg-danger/20 text-danger border-danger/40";
  if (level === "MEDIUM") return "bg-warning/20 text-warning border-warning/40";
  return "bg-success/20 text-success border-success/40";
};

/**
 * Fill color class for a progress bar representing a crowd level.
 * @param level Discrete crowd level.
 */
export const getCrowdBar = (level: CrowdLevel): string => {
  if (level === "HIGH") return "bg-danger";
  if (level === "MEDIUM") return "bg-warning";
  return "bg-success";
};

/**
 * Format a wait-time in minutes as a human-friendly string.
 * @param minutes Estimated queue minutes.
 */
export const formatWaitTime = (minutes: number): string => {
  if (minutes <= 0) return "No wait";
  if (minutes === 1) return "1 min wait";
  return `${minutes} min wait`;
};

/**
 * Deterministic pseudo-random generator so SSR and client render identical demo data.
 * @param seed Integer seed.
 * @returns A function that yields the next pseudo-random value in [0, 1).
 */
const seeded = (seed: number): (() => number) => {
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

/**
 * Generate demo crowd data for the given zones at a given tick.
 * @param zones Ordered zone names.
 * @param tick Refresh tick — same tick yields the same data (deterministic).
 */
export const generateCrowdData = (zones: readonly string[], tick: number): ZoneData[] => {
  return zones.map((zone, i) => {
    const r = seeded(tick + i * 13)();
    const capacity = Math.min(100, Math.round(CAPACITY_BASELINE + r * CAPACITY_RANGE));
    const level: CrowdLevel =
      capacity > CAPACITY_HIGH_THRESHOLD
        ? "HIGH"
        : capacity > CAPACITY_MEDIUM_THRESHOLD
          ? "MEDIUM"
          : "LOW";
    const wait =
      level === "HIGH"
        ? 15 + Math.round(r * 20)
        : level === "MEDIUM"
          ? 5 + Math.round(r * 10)
          : Math.round(r * 3);
    return { zone, level, wait, capacity };
  });
};
