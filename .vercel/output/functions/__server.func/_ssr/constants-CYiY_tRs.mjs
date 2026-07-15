//#region node_modules/.nitro/vite/services/ssr/assets/constants-CYiY_tRs.js
/** Application name */
var APP_NAME = "StadiumIQ";
/** Short display name used in the navbar and branding */
var APP_SHORT = "StadiumIQ";
/** Auto-refresh interval in milliseconds */
var REFRESH_INTERVAL = 3e4;
/** Stadium zones monitored by the system */
var ZONES = [
	"North Gate",
	"South Gate",
	"East Gate",
	"West Gate",
	"Food Court",
	"VIP Section"
];
/** Supported AI assistant languages */
var LANGUAGES = [
	{
		code: "en",
		name: "English",
		flag: "🇬🇧"
	},
	{
		code: "es",
		name: "Español",
		flag: "🇪🇸"
	},
	{
		code: "fr",
		name: "Français",
		flag: "🇫🇷"
	},
	{
		code: "ar",
		name: "العربية",
		flag: "🇸🇦"
	},
	{
		code: "hi",
		name: "हिन्दी",
		flag: "🇮🇳"
	}
];
/** Emergency alert categories */
var ALERT_TYPES = {
	MEDICAL: "Medical",
	SECURITY: "Security",
	WEATHER: "Weather",
	EVACUATION: "Evacuation",
	INFO: "Information"
};
/**
* Transport mode display names for the Transportation Hub.
*/
var TRANSPORT_TYPES = {
	METRO: "Metro / Subway",
	BUS: "Bus Routes",
	TAXI: "Taxi / Rideshare",
	PARKING: "Parking"
};
/**
* System prompt injected into every Gemini AI conversation.
*/
var SYSTEM_PROMPT = `You are StadiumIQ, an AI assistant for FIFA World Cup 2026. Help fans, staff and volunteers with stadium navigation, crowd management, transportation, accessibility and match information. Be concise and helpful. Respond in the user's language.`;
/**
* Sample FIFA World Cup 2026 match data used for the schedule display.
*/
var MATCHES = [
	{
		id: "1",
		homeTeam: "Brazil",
		awayTeam: "France",
		time: "2026-06-15T18:00:00Z",
		venue: "MetLife Stadium",
		group: "A",
		status: "upcoming"
	},
	{
		id: "2",
		homeTeam: "Argentina",
		awayTeam: "Germany",
		time: "2026-06-15T21:00:00Z",
		venue: "SoFi Stadium",
		group: "B",
		status: "upcoming"
	},
	{
		id: "3",
		homeTeam: "Spain",
		awayTeam: "England",
		time: "2026-06-16T16:00:00Z",
		venue: "AT&T Stadium",
		group: "C",
		status: "upcoming"
	},
	{
		id: "4",
		homeTeam: "Portugal",
		awayTeam: "Netherlands",
		time: "2026-06-16T19:00:00Z",
		venue: "Mercedes-Benz Stadium",
		group: "D",
		status: "upcoming"
	},
	{
		id: "5",
		homeTeam: "USA",
		awayTeam: "Mexico",
		time: "2026-06-17T20:00:00Z",
		venue: "Rose Bowl",
		group: "E",
		status: "upcoming"
	},
	{
		id: "6",
		homeTeam: "Japan",
		awayTeam: "Croatia",
		time: "2026-06-17T23:00:00Z",
		venue: "Lumen Field",
		group: "F",
		status: "upcoming"
	}
];
//#endregion
export { MATCHES as a, TRANSPORT_TYPES as c, LANGUAGES as i, ZONES as l, APP_NAME as n, REFRESH_INTERVAL as o, APP_SHORT as r, SYSTEM_PROMPT as s, ALERT_TYPES as t };
