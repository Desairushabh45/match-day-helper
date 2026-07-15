import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as MATCHES } from "./constants-CYiY_tRs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/MatchSchedule-DAOqAf08.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* @fileoverview MatchSchedule — FIFA World Cup 2026 match listing with filters.
* Renders upcoming matches with live countdown timers, group/venue filters,
* and responsive card layout.
*
* @module MatchSchedule
*/
/**
* Live countdown timer that ticks every second until the target datetime.
* Renders "Live" once the target time has passed.
*
* @param {CountdownProps} props - Component props
* @returns {JSX.Element} A formatted countdown string or "Live" indicator
*/
function Countdown({ target }) {
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		const id = setInterval(() => setNow(Date.now()), 1e3);
		return () => clearInterval(id);
	}, []);
	const diff = new Date(target).getTime() - now;
	if (diff <= 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-success",
		children: "Live"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "font-mono tabular-nums",
		children: [
			Math.floor(diff / 864e5),
			"d ",
			Math.floor(diff / 36e5 % 24),
			"h ",
			Math.floor(diff / 6e4 % 60),
			"m ",
			Math.floor(diff / 1e3 % 60),
			"s"
		]
	});
}
/**
* Match schedule dashboard with group and venue filtering.
* Uses `useMemo` to avoid re-filtering the full MATCHES array on every render
* and `useCallback` to stabilise the filter change handlers.
*
* @returns {JSX.Element} The filterable match schedule section
*/
function MatchScheduleBase() {
	const [group, setGroup] = (0, import_react.useState)("ALL");
	const [venue, setVenue] = (0, import_react.useState)("ALL");
	/**
	* Unique group identifiers derived from the MATCHES data.
	* Memoised — recalculates only if MATCHES changes (effectively never at runtime).
	*/
	const groups = (0, import_react.useMemo)(() => ["ALL", ...Array.from(new Set(MATCHES.map((m) => m.group)))], []);
	/**
	* Unique venue names derived from the MATCHES data.
	* Memoised for the same reason as `groups`.
	*/
	const venues = (0, import_react.useMemo)(() => ["ALL", ...Array.from(new Set(MATCHES.map((m) => m.venue)))], []);
	/**
	* Filtered match list based on the selected group and venue.
	* Recalculates whenever the filter selections change.
	*/
	const filtered = (0, import_react.useMemo)(() => MATCHES.filter((m) => {
		if (group !== "ALL" && m.group !== group) return false;
		if (venue !== "ALL" && m.venue !== venue) return false;
		return true;
	}), [group, venue]);
	const next = (0, import_react.useMemo)(() => MATCHES.find((m) => new Date(m.time) > /* @__PURE__ */ new Date()) || MATCHES[0], []);
	/**
	* Handler for group filter `<select>` changes.
	* Stabilised with `useCallback` to avoid re-rendering the filter controls.
	*
	* @param {React.ChangeEvent<HTMLSelectElement>} e - Change event
	* @returns {void}
	*/
	const handleGroupChange = (0, import_react.useCallback)((e) => {
		setGroup(e.target.value);
	}, []);
	/**
	* Handler for venue filter `<select>` changes.
	*
	* @param {React.ChangeEvent<HTMLSelectElement>} e - Change event
	* @returns {void}
	*/
	const handleVenueChange = (0, import_react.useCallback)((e) => {
		setVenue(e.target.value);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-labelledby": "matches-heading",
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "matches-heading",
				className: "text-2xl font-bold text-primary",
				children: "Match Schedule"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: ["Next match starts in ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Countdown, { target: next.time })]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					"aria-label": "Filter by group",
					value: group,
					onChange: handleGroupChange,
					className: "rounded-md border border-border bg-input px-2 py-1.5 text-sm",
					children: groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: g }, g))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					"aria-label": "Filter by venue",
					value: venue,
					onChange: handleVenueChange,
					className: "rounded-md border border-border bg-input px-2 py-1.5 text-sm",
					children: venues.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: v }, v))
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
			children: filtered.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl border border-border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Group ", m.group] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: new Date(m.time).toLocaleString(void 0, {
							dateStyle: "medium",
							timeStyle: "short"
						}) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center justify-between text-lg font-bold",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.homeTeam }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								children: "vs"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.awayTeam })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 text-xs text-muted-foreground",
						children: m.venue
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 inline-block rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary",
						children: m.status
					})
				]
			}, m.id))
		})]
	});
}
/**
* Memoised MatchSchedule export.
* Safe to use in pages that re-render frequently (e.g., countdown parent).
*/
var MatchSchedule = (0, import_react.memo)(MatchScheduleBase);
//#endregion
export { MatchSchedule };
