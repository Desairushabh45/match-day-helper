/**
 * @fileoverview Application-wide constants for StadiumIQ.
 * Single source of truth for all hardcoded values — import from here
 * instead of using inline strings/numbers in components.
 *
 * @module constants
 */

import type { Match } from "@/types";

/** Application name */
export const APP_NAME = 'StadiumIQ' as const

/** Short display name used in the navbar and branding */
export const APP_SHORT = "StadiumIQ" as const;

/** Application version (semantic versioning) */
export const APP_VERSION = "1.0.0" as const;

/** Live demo URL */
export const LIVE_URL = 'https://match-day-helper.vercel.app' as const

/** Source code repository URL */
export const GITHUB_URL = "https://github.com/Rohanindia/med" as const;

/** Auto-refresh interval in milliseconds */
export const REFRESH_INTERVAL = 30_000 as const

/** Maximum chat message length in characters */
export const MAX_CHAT_LENGTH = 300 as const

/** Rate limit: maximum AI messages per minute */
export const RATE_LIMIT_PER_MINUTE = 10 as const

/** Gemini AI model identifier used for the GenAI assistant */
export const GEMINI_MODEL = "gemini-2.0-flash" as const;

/** Available crowd density levels */
export const CROWD_LEVELS = ['LOW', 'MEDIUM', 'HIGH'] as const

/** Stadium zones monitored by the system */
export const ZONES = [
  'North Gate',
  'South Gate',
  'East Gate',
  'West Gate',
  'Food Court',
  'VIP Section',
] as const

/** Navigation page identifiers */
export const PAGES = {
  HOME: '/',
  MAP: '/map',
  TRANSPORT: '/transport',
  SCHEDULE: '/schedule',
  ACCESSIBILITY: '/accessibility',
  STAFF: '/staff',
} as const

/** Supported AI assistant languages */
export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
] as const

/** Emergency alert categories */
export const ALERT_TYPES = {
  MEDICAL: 'Medical',
  SECURITY: 'Security',
  WEATHER: 'Weather',
  EVACUATION: 'Evacuation',
  INFO: 'Information',
} as const

/**
 * Transport mode display names for the Transportation Hub.
 */
export const TRANSPORT_TYPES = {
  METRO: "Metro / Subway",
  BUS: "Bus Routes",
  TAXI: "Taxi / Rideshare",
  PARKING: "Parking",
} as const;

/**
 * System prompt injected into every Gemini AI conversation.
 */
export const SYSTEM_PROMPT = `You are StadiumIQ, an AI assistant for FIFA World Cup 2026. Help fans, staff and volunteers with stadium navigation, crowd management, transportation, accessibility and match information. Be concise and helpful. Respond in the user's language.`;

/**
 * Sample FIFA World Cup 2026 match data used for the schedule display.
 */
export const MATCHES: Match[] = [
  {
    id: "1",
    homeTeam: "Brazil",
    awayTeam: "France",
    time: "2026-06-15T18:00:00Z",
    venue: "MetLife Stadium",
    group: "A",
    status: "upcoming",
  },
  {
    id: "2",
    homeTeam: "Argentina",
    awayTeam: "Germany",
    time: "2026-06-15T21:00:00Z",
    venue: "SoFi Stadium",
    group: "B",
    status: "upcoming",
  },
  {
    id: "3",
    homeTeam: "Spain",
    awayTeam: "England",
    time: "2026-06-16T16:00:00Z",
    venue: "AT&T Stadium",
    group: "C",
    status: "upcoming",
  },
  {
    id: "4",
    homeTeam: "Portugal",
    awayTeam: "Netherlands",
    time: "2026-06-16T19:00:00Z",
    venue: "Mercedes-Benz Stadium",
    group: "D",
    status: "upcoming",
  },
  {
    id: "5",
    homeTeam: "USA",
    awayTeam: "Mexico",
    time: "2026-06-17T20:00:00Z",
    venue: "Rose Bowl",
    group: "E",
    status: "upcoming",
  },
  {
    id: "6",
    homeTeam: "Japan",
    awayTeam: "Croatia",
    time: "2026-06-17T23:00:00Z",
    venue: "Lumen Field",
    group: "F",
    status: "upcoming",
  },
];
