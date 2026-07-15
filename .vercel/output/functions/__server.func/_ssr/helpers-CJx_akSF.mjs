//#region node_modules/.nitro/vite/services/ssr/assets/helpers-CJx_akSF.js
/**
* Sanitizes user input by removing HTML tags and limiting length
* @param {string} text - Raw input text from user
* @param {number} maxLength - Maximum allowed characters (default: 300)
* @returns {string} Sanitized text safe for AI processing
*/
var sanitizeInput = (text, maxLength = 300) => {
	return text.replace(/<[^>]*>/g, "").slice(0, maxLength);
};
/**
* Returns Tailwind CSS color class based on crowd density level
* @param {string} level - Crowd level: 'LOW' | 'MEDIUM' | 'HIGH'
* @returns {string} Tailwind color class string
*/
var getCrowdColor = (level) => {
	return {
		LOW: "text-green-500",
		MEDIUM: "text-yellow-500",
		HIGH: "text-red-500"
	}[level] ?? "text-gray-500";
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
* Formats wait time in minutes to human readable string
* @param {number} minutes - Wait time in minutes
* @returns {string} Formatted string like "5 min wait" or "No wait"
*/
var formatWaitTime = (minutes) => {
	if (minutes === 0) return "No wait";
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
* @returns {Zone[]} Array of zone data objects, one per zone
*
* @example
* const zones = generateCrowdData(ZONES, tick);
* // zones[0] → { id: "...", name: "North Gate", level: "MEDIUM", waitTime: 8, capacity: 62 }
*/
var generateCrowdData = (zones, tick) => {
	return zones.map((zone, i) => {
		const r = seeded(tick + i * 13)();
		const capacity = Math.min(100, Math.round(30 + r * 70));
		const level = capacity > 75 ? "HIGH" : capacity > 45 ? "MEDIUM" : "LOW";
		const waitTime = level === "HIGH" ? 15 + Math.round(r * 20) : level === "MEDIUM" ? 5 + Math.round(r * 10) : Math.round(r * 3);
		return {
			id: `zone-${i}`,
			name: zone,
			level,
			waitTime,
			capacity
		};
	});
};
//#endregion
export { sanitizeInput as a, getCrowdColor as i, generateCrowdData as n, getCrowdBar as r, formatWaitTime as t };
