export const APP_NAME = "StadiumFlow AI";
export const APP_SHORT = "StadiumIQ";
export const REFRESH_INTERVAL = 30000;
export const MAX_CHAT_LENGTH = 300;
export const RATE_LIMIT_PER_MIN = 10;

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

export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
  { code: "hi", label: "हिन्दी" },
] as const;

export const SYSTEM_PROMPT = `You are StadiumIQ, an AI assistant for FIFA World Cup 2026. Help fans, staff and volunteers with stadium navigation, crowd management, transportation, accessibility and match information. Be concise and helpful. Respond in the user's language.`;

export const MATCHES = [
  { id: 1, home: "Brazil", away: "France", time: "2026-06-15T18:00:00Z", venue: "MetLife Stadium", group: "A", status: "Upcoming" },
  { id: 2, home: "Argentina", away: "Germany", time: "2026-06-15T21:00:00Z", venue: "SoFi Stadium", group: "B", status: "Upcoming" },
  { id: 3, home: "Spain", away: "England", time: "2026-06-16T16:00:00Z", venue: "AT&T Stadium", group: "C", status: "Upcoming" },
  { id: 4, home: "Portugal", away: "Netherlands", time: "2026-06-16T19:00:00Z", venue: "Mercedes-Benz Stadium", group: "D", status: "Upcoming" },
  { id: 5, home: "USA", away: "Mexico", time: "2026-06-17T20:00:00Z", venue: "Rose Bowl", group: "E", status: "Upcoming" },
  { id: 6, home: "Japan", away: "Croatia", time: "2026-06-17T23:00:00Z", venue: "Lumen Field", group: "F", status: "Upcoming" },
];
