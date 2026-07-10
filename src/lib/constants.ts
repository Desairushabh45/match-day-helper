/** App display name shown in metadata and footer. */
export const APP_NAME = "StadiumFlow AI";
/** Short brand shown in the navbar. */
export const APP_SHORT = "StadiumIQ";

/** Auto-refresh interval for the crowd dashboard (ms). */
export const REFRESH_INTERVAL = 30_000;
/** One second in milliseconds — used by countdowns. */
export const ONE_SECOND_MS = 1_000;
/** One minute in milliseconds — used by the chat rate limiter window. */
export const ONE_MINUTE_MS = 60_000;

/** Max characters allowed in a single AI chat message. */
export const MAX_CHAT_LENGTH = 300;
/** Client-side chat rate limit (messages per minute). */
export const RATE_LIMIT_PER_MIN = 10;

/** Capacity % above which a zone is considered HIGH crowd. */
export const CAPACITY_HIGH_THRESHOLD = 75;
/** Capacity % above which a zone is considered MEDIUM crowd. */
export const CAPACITY_MEDIUM_THRESHOLD = 45;
/** Baseline capacity used by the demo data generator. */
export const CAPACITY_BASELINE = 30;
/** Range added to the baseline by the demo generator. */
export const CAPACITY_RANGE = 70;

/** Ordered list of monitored stadium zones. */
export const ZONES = [
  "North Gate",
  "South Gate",
  "East Gate",
  "West Gate",
  "Food Court",
  "VIP Section",
] as const;

export type Zone = (typeof ZONES)[number];
export type CrowdLevel = "LOW" | "MEDIUM" | "HIGH";

/** Languages offered by the AI assistant language selector. */
export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
  { code: "hi", label: "हिन्दी" },
] as const;

/** System prompt sent with every AI chat request. */
export const SYSTEM_PROMPT = `You are StadiumIQ, an AI assistant for FIFA World Cup 2026. Help fans, staff and volunteers with stadium navigation, crowd management, transportation, accessibility and match information. Be concise and helpful. Respond in the user's language.`;

/** FIFA World Cup 2026 sample match fixtures used by the schedule view. */
export const MATCHES = [
  { id: 1, home: "Brazil", away: "France", time: "2026-06-15T18:00:00Z", venue: "MetLife Stadium", group: "A", status: "Upcoming" },
  { id: 2, home: "Argentina", away: "Germany", time: "2026-06-15T21:00:00Z", venue: "SoFi Stadium", group: "B", status: "Upcoming" },
  { id: 3, home: "Spain", away: "England", time: "2026-06-16T16:00:00Z", venue: "AT&T Stadium", group: "C", status: "Upcoming" },
  { id: 4, home: "Portugal", away: "Netherlands", time: "2026-06-16T19:00:00Z", venue: "Mercedes-Benz Stadium", group: "D", status: "Upcoming" },
  { id: 5, home: "USA", away: "Mexico", time: "2026-06-17T20:00:00Z", venue: "Rose Bowl", group: "E", status: "Upcoming" },
  { id: 6, home: "Japan", away: "Croatia", time: "2026-06-17T23:00:00Z", venue: "Lumen Field", group: "F", status: "Upcoming" },
];
