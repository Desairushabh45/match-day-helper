/**
 * @fileoverview Shared utility helpers for StadiumIQ.
 * Pure functions used across multiple components — no side effects.
 *
 * @module helpers
 */

import type { CrowdLevel } from "./constants";
import { MAX_CHAT_LENGTH } from "./constants";

/**
 * Sanitizes user input by removing HTML tags and limiting length
 * @param {string} text - Raw input text from user
 * @param {number} maxLength - Maximum allowed characters (default: 300)
 * @returns {string} Sanitized text safe for AI processing
 */
export const sanitizeInput = (text: string, maxLength = 300): string => {
  return text.replace(/<[^>]*>/g, '').slice(0, maxLength)
}

/**
 * Returns Tailwind CSS color class based on crowd density level
 * @param {string} level - Crowd level: 'LOW' | 'MEDIUM' | 'HIGH'
 * @returns {string} Tailwind color class string
 */
export const getCrowdColor = (level: string): string => {
  const colors = { LOW: 'text-green-500', MEDIUM: 'text-yellow-500', HIGH: 'text-red-500' }
  return colors[level as keyof typeof colors] ?? 'text-gray-500'
}

/**
 * Returns the Tailwind CSS background-colour class for the capacity progress bar.
 * Matches the semantic colour scheme used by `getCrowdColor`.
 *
 * @param {CrowdLevel} level - Crowd density level ("LOW" | "MEDIUM" | "HIGH")
 * @returns {string} Tailwind background-colour class string
 *
 * @example
 * getCrowdBar("HIGH")   // → "bg-danger"
 * getCrowdBar("LOW")    // → "bg-success"
 */
export const getCrowdBar = (level: CrowdLevel): string => {
  if (level === "HIGH") return "bg-danger";
  if (level === "MEDIUM") return "bg-warning";
  return "bg-success";
};

/**
 * Formats wait time in minutes to human readable string
 * @param {number} minutes - Wait time in minutes
 * @returns {string} Formatted string like "5 min wait" or "No wait"
 */
export const formatWaitTime = (minutes: number): string => {
  if (minutes === 0) return 'No wait'
  return `${minutes} min wait`
}

/**
 * Deterministic pseudo-random number generator seeded with an integer.
 * Used to produce stable, reproducible demo crowd data across SSR and client
 * renders without causing hydration mismatches.
 *
 * @param {number} seed - Integer seed value
 * @returns {() => number} A function that returns the next value in [0, 1)
 *
 * @internal Not exported — use `generateCrowdData` instead.
 */
const seeded = (seed: number): (() => number) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

import type { Zone } from "@/types";

/**
 * Generates a snapshot of simulated crowd data for all stadium zones.
 * The `tick` parameter acts as a time seed so data visibly changes on
 * each auto-refresh cycle without requiring a real API call.
 *
 * @param {readonly string[]} zones - Array of zone name strings (from ZONES constant)
 * @param {number} tick - Auto-incrementing refresh counter used as the random seed
 * @returns {Zone[]} Array of zone data objects, one per zone
 *
 * @example
 * const zones = generateCrowdData(ZONES, tick);
 * // zones[0] → { id: "...", name: "North Gate", level: "MEDIUM", waitTime: 8, capacity: 62 }
 */
export const generateCrowdData = (zones: readonly string[], tick: number): Zone[] => {
  return zones.map((zone, i) => {
    const r = seeded(tick + i * 13)();
    const capacity = Math.min(100, Math.round(30 + r * 70));
    const level: Zone["level"] = capacity > 75 ? "HIGH" : capacity > 45 ? "MEDIUM" : "LOW";
    const waitTime =
      level === "HIGH"
        ? 15 + Math.round(r * 20)
        : level === "MEDIUM"
          ? 5 + Math.round(r * 10)
          : Math.round(r * 3);
    return { id: `zone-${i}`, name: zone, level, waitTime, capacity };
  });
};
