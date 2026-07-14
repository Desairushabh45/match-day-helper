/**
 * @fileoverview Application-wide constants for StadiumIQ.
 * Single source of truth for all hardcoded values — import from here
 * instead of using inline strings/numbers in components.
 *
 * @module constants
 */

/** Full application name used in headers and SEO */
export const APP_NAME = "StadiumFlow AI";

/** Short display name used in the navbar and branding */
export const APP_SHORT = "StadiumIQ";

/** Application version (semantic versioning) */
export const APP_VERSION = "1.0.0";

/** Live production URL */
export const LIVE_URL = "https://match-day-helper.vercel.app";

/** Source code repository URL */
export const GITHUB_URL = "https://github.com/Rohanindia/med";

/** Auto-refresh interval for crowd data in milliseconds (30 seconds) */
export const REFRESH_INTERVAL = 30_000;

/** Maximum allowed length (in characters) for AI chat messages */
export const MAX_CHAT_LENGTH = 300;

/** Rate limit: maximum number of AI messages allowed per minute */
export const RATE_LIMIT_PER_MIN = 10;

/** Gemini AI model identifier used for the GenAI assistant */
export const GEMINI_MODEL = "gemini-2.0-flash";

/**
 * Stadium zone names. Use these string literal values wherever a zone
 * identifier is needed to keep naming consistent across the app.
 */
export const ZONES = [
  "North Gate",
  "South Gate",
  "East Gate",
  "West Gate",
  "Food Court",
  "VIP Section",
] as const;

/** Union type of all valid zone names */
export type Zone = (typeof ZONES)[number];

/** Union type for crowd density levels */
export type CrowdLevel = "LOW" | "MEDIUM" | "HIGH";

/**
 * Crowd density level constants as an object for iteration and comparison.
 * Prefer these over raw strings in logic.
 */
export const CROWD_LEVELS = {
  LOW: "LOW" as CrowdLevel,
  MEDIUM: "MEDIUM" as CrowdLevel,
  HIGH: "HIGH" as CrowdLevel,
} as const;

/**
 * Navigation page identifiers used in route links.
 * Maps descriptive names to TanStack Router path strings.
 */
export const PAGES = {
  HOME: "/",
  MAP: "/map",
  TRANSPORT: "/transport",
  SCHEDULE: "/schedule",
  ACCESSIBILITY: "/accessibility",
  STAFF: "/staff",
} as const;

/**
 * Supported UI languages for the multilingual AI assistant.
 * `code` is the BCP-47 language tag; `label` is the display name.
 */
export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
  { code: "hi", label: "हिन्दी" },
] as const;

/**
 * Alert type identifiers for the emergency alert system.
 * Used to categorise and style alert banners.
 */
export const ALERT_TYPES = {
  MEDICAL: "Medical",
  SECURITY: "Security",
  WEATHER: "Weather",
  EVACUATION: "Evacuation",
  INFO: "Information",
} as const;

/**
 * Transport mode display names for the Transportation Hub.
 * Mirrors the options shown in TransportHub.tsx.
 */
export const TRANSPORT_TYPES = {
  METRO: "Metro / Subway",
  BUS: "Bus Routes",
  TAXI: "Taxi / Rideshare",
  PARKING: "Parking",
} as const;

/**
 * System prompt injected into every Gemini AI conversation.
 * Establishes the assistant's persona and scope.
 */
export const SYSTEM_PROMPT = `You are StadiumIQ, an AI assistant for FIFA World Cup 2026. Help fans, staff and volunteers with stadium navigation, crowd management, transportation, accessibility and match information. Be concise and helpful. Respond in the user's language.`;

/**
 * Sample FIFA World Cup 2026 match data used for the schedule display.
 * In production this would be replaced by a live API feed.
 */
export const MATCHES = [
  {
    id: 1,
    home: "Brazil",
    away: "France",
    time: "2026-06-15T18:00:00Z",
    venue: "MetLife Stadium",
    group: "A",
    status: "Upcoming",
  },
  {
    id: 2,
    home: "Argentina",
    away: "Germany",
    time: "2026-06-15T21:00:00Z",
    venue: "SoFi Stadium",
    group: "B",
    status: "Upcoming",
  },
  {
    id: 3,
    home: "Spain",
    away: "England",
    time: "2026-06-16T16:00:00Z",
    venue: "AT&T Stadium",
    group: "C",
    status: "Upcoming",
  },
  {
    id: 4,
    home: "Portugal",
    away: "Netherlands",
    time: "2026-06-16T19:00:00Z",
    venue: "Mercedes-Benz Stadium",
    group: "D",
    status: "Upcoming",
  },
  {
    id: 5,
    home: "USA",
    away: "Mexico",
    time: "2026-06-17T20:00:00Z",
    venue: "Rose Bowl",
    group: "E",
    status: "Upcoming",
  },
  {
    id: 6,
    home: "Japan",
    away: "Croatia",
    time: "2026-06-17T23:00:00Z",
    venue: "Lumen Field",
    group: "F",
    status: "Upcoming",
  },
];
