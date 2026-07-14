//#region node_modules/.nitro/vite/services/ssr/assets/constants-BCCCNdz0.js
/**
* @fileoverview Application-wide constants for StadiumIQ.
* Single source of truth for all hardcoded values — import from here
* instead of using inline strings/numbers in components.
*
* @module constants
*/
/** Full application name used in headers and SEO */
var APP_NAME = "StadiumFlow AI";
/** Short display name used in the navbar and branding */
var APP_SHORT = "StadiumIQ";
/** Auto-refresh interval for crowd data in milliseconds (30 seconds) */
var REFRESH_INTERVAL = 3e4;
/**
* Stadium zone names. Use these string literal values wherever a zone
* identifier is needed to keep naming consistent across the app.
*/
var ZONES = [
	"North Gate",
	"South Gate",
	"East Gate",
	"West Gate",
	"Food Court",
	"VIP Section"
];
/**
* Supported UI languages for the multilingual AI assistant.
* `code` is the BCP-47 language tag; `label` is the display name.
*/
var LANGUAGES = [
	{
		code: "en",
		label: "English"
	},
	{
		code: "es",
		label: "Español"
	},
	{
		code: "fr",
		label: "Français"
	},
	{
		code: "ar",
		label: "العربية"
	},
	{
		code: "hi",
		label: "हिन्दी"
	}
];
/**
* Alert type identifiers for the emergency alert system.
* Used to categorise and style alert banners.
*/
var ALERT_TYPES = {
	MEDICAL: "Medical",
	SECURITY: "Security",
	WEATHER: "Weather",
	EVACUATION: "Evacuation",
	INFO: "Information"
};
/**
* Transport mode display names for the Transportation Hub.
* Mirrors the options shown in TransportHub.tsx.
*/
var TRANSPORT_TYPES = {
	METRO: "Metro / Subway",
	BUS: "Bus Routes",
	TAXI: "Taxi / Rideshare",
	PARKING: "Parking"
};
/**
* System prompt injected into every Gemini AI conversation.
* Establishes the assistant's persona and scope.
*/
var SYSTEM_PROMPT = `You are StadiumIQ, an AI assistant for FIFA World Cup 2026. Help fans, staff and volunteers with stadium navigation, crowd management, transportation, accessibility and match information. Be concise and helpful. Respond in the user's language.`;
/**
* Sample FIFA World Cup 2026 match data used for the schedule display.
* In production this would be replaced by a live API feed.
*/
var MATCHES = [
	{
		id: 1,
		home: "Brazil",
		away: "France",
		time: "2026-06-15T18:00:00Z",
		venue: "MetLife Stadium",
		group: "A",
		status: "Upcoming"
	},
	{
		id: 2,
		home: "Argentina",
		away: "Germany",
		time: "2026-06-15T21:00:00Z",
		venue: "SoFi Stadium",
		group: "B",
		status: "Upcoming"
	},
	{
		id: 3,
		home: "Spain",
		away: "England",
		time: "2026-06-16T16:00:00Z",
		venue: "AT&T Stadium",
		group: "C",
		status: "Upcoming"
	},
	{
		id: 4,
		home: "Portugal",
		away: "Netherlands",
		time: "2026-06-16T19:00:00Z",
		venue: "Mercedes-Benz Stadium",
		group: "D",
		status: "Upcoming"
	},
	{
		id: 5,
		home: "USA",
		away: "Mexico",
		time: "2026-06-17T20:00:00Z",
		venue: "Rose Bowl",
		group: "E",
		status: "Upcoming"
	},
	{
		id: 6,
		home: "Japan",
		away: "Croatia",
		time: "2026-06-17T23:00:00Z",
		venue: "Lumen Field",
		group: "F",
		status: "Upcoming"
	}
];
//#endregion
export { MATCHES as a, TRANSPORT_TYPES as c, LANGUAGES as i, ZONES as l, APP_NAME as n, REFRESH_INTERVAL as o, APP_SHORT as r, SYSTEM_PROMPT as s, ALERT_TYPES as t };
