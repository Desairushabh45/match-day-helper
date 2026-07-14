//#region node_modules/.nitro/vite/services/ssr/assets/helpers-n7cuZdJ9.js
/**
* Strips HTML tags from user input and enforces a maximum character length
* before the text is forwarded to the AI assistant.
* Prevents XSS payloads and token budget overruns.
*
* @param {string} text - Raw user input string, potentially containing HTML
* @param {number} [maxLength=MAX_CHAT_LENGTH] - Maximum allowed character count
* @returns {string} Sanitized plain-text string, truncated to `maxLength`
*
* @example
* sanitizeInput("<script>alert(1)<\/script>Hello") // → "Hello"
* sanitizeInput("Long text...", 10) // → "Long text."
*/
var sanitizeInput = (text, maxLength = 300) => text.replace(/<[^>]*>/g, "").slice(0, maxLength);
/**
* Returns Tailwind CSS class tokens for a crowd level badge.
* Covers background, text colour, and border using semantic colour tokens
* defined in the global stylesheet (danger / warning / success).
*
* @param {CrowdLevel} level - Crowd density level ("LOW" | "MEDIUM" | "HIGH")
* @returns {string} Space-separated Tailwind class string for the badge element
*
* @example
* getCrowdColor("HIGH")   // → "bg-danger/20 text-danger border-danger/40"
* getCrowdColor("MEDIUM") // → "bg-warning/20 text-warning border-warning/40"
* getCrowdColor("LOW")    // → "bg-success/20 text-success border-success/40"
*/
var getCrowdColor = (level) => {
	if (level === "HIGH") return "bg-danger/20 text-danger border-danger/40";
	if (level === "MEDIUM") return "bg-warning/20 text-warning border-warning/40";
	return "bg-success/20 text-success border-success/40";
};
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
var getCrowdBar = (level) => {
	if (level === "HIGH") return "bg-danger";
	if (level === "MEDIUM") return "bg-warning";
	return "bg-success";
};
/**
* Formats a raw wait-time number (in minutes) into a human-readable string
* suitable for display in the crowd dashboard and stadium map panels.
*
* @param {number} minutes - Wait time in minutes (non-negative integer)
* @returns {string} Localised, friendly wait-time string
*
* @example
* formatWaitTime(0)  // → "No wait"
* formatWaitTime(1)  // → "1 min wait"
* formatWaitTime(12) // → "12 min wait"
*/
var formatWaitTime = (minutes) => {
	if (minutes <= 0) return "No wait";
	if (minutes === 1) return "1 min wait";
	return `${minutes} min wait`;
};
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
var seeded = (seed) => {
	let s = seed;
	return () => {
		s = (s * 9301 + 49297) % 233280;
		return s / 233280;
	};
};
/**
* Generates a snapshot of simulated crowd data for all stadium zones.
* The `tick` parameter acts as a time seed so data visibly changes on
* each auto-refresh cycle without requiring a real API call.
*
* @param {readonly string[]} zones - Array of zone name strings (from ZONES constant)
* @param {number} tick - Auto-incrementing refresh counter used as the random seed
* @returns {ZoneData[]} Array of zone data objects, one per zone
*
* @example
* const zones = generateCrowdData(ZONES, tick);
* // zones[0] → { zone: "North Gate", level: "MEDIUM", wait: 8, capacity: 62 }
*/
var generateCrowdData = (zones, tick) => {
	return zones.map((zone, i) => {
		const r = seeded(tick + i * 13)();
		const capacity = Math.min(100, Math.round(30 + r * 70));
		const level = capacity > 75 ? "HIGH" : capacity > 45 ? "MEDIUM" : "LOW";
		return {
			zone,
			level,
			wait: level === "HIGH" ? 15 + Math.round(r * 20) : level === "MEDIUM" ? 5 + Math.round(r * 10) : Math.round(r * 3),
			capacity
		};
	});
};
//#endregion
export { sanitizeInput as a, getCrowdColor as i, generateCrowdData as n, getCrowdBar as r, formatWaitTime as t };
