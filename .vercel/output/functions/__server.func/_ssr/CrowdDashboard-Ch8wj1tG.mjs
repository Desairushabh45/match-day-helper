import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as RefreshCw, o as Sparkles } from "../_libs/lucide-react.mjs";
import { l as ZONES, o as REFRESH_INTERVAL } from "./constants-CYiY_tRs.mjs";
import { i as getCrowdColor, n as generateCrowdData, r as getCrowdBar, t as formatWaitTime } from "./helpers-CJx_akSF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CrowdDashboard-Ch8wj1tG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* @fileoverview CrowdDashboard — Real-time crowd density monitoring for StadiumIQ.
* Displays live capacity and wait-time data for all stadium zones with
* an AI recommendation for the least-crowded entrance.
*
* @module CrowdDashboard
*/
/**
* Core Crowd Management System dashboard component.
* Polls demo crowd data every `REFRESH_INTERVAL` ms and exposes a manual
* refresh button. Recommends the least-crowded zone via an AI insight banner.
*
* Uses `useMemo` to avoid re-computing sorted zone data on unrelated renders,
* and `useCallback` to stabilise the refresh handler reference.
*
* @returns {JSX.Element} The crowd management dashboard section
*/
function CrowdDashboardBase() {
	const [tick, setTick] = (0, import_react.useState)(1);
	/**
	* Memoised crowd data snapshot — recalculated only when `tick` increments.
	* Prevents unnecessary re-renders of child zone cards.
	*/
	const data = (0, import_react.useMemo)(() => generateCrowdData(ZONES, tick), [tick]);
	(0, import_react.useEffect)(() => {
		const id = setInterval(() => setTick((t) => t + 1), REFRESH_INTERVAL);
		return () => clearInterval(id);
	}, []);
	/**
	* Increments the tick counter to trigger a new data snapshot.
	* Stabilised with `useCallback` to prevent child re-renders.
	*
	* @returns {void}
	*/
	const refresh = (0, import_react.useCallback)(() => setTick((t) => t + 1), []);
	(0, import_react.useMemo)(() => {
		return [...data].sort((a, b) => a.capacity - b.capacity)[0];
	}, [data]);
	/**
	* Aggregated crowd statistics derived from the current data snapshot.
	* Used for operational overview in future analytics panels.
	*/
	const crowdStats = (0, import_react.useMemo)(() => {
		return {
			highZones: data.filter((z) => z.level === "HIGH"),
			lowZones: data.filter((z) => z.level === "LOW"),
			avgCapacity: Math.round(data.reduce((sum, z) => sum + z.capacity, 0) / data.length),
			recommendedZone: data.reduce((min, z) => z.capacity < min.capacity ? z : min, data[0])
		};
	}, [data]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-labelledby": "crowd-heading",
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "crowd-heading",
					className: "text-2xl font-bold text-primary",
					children: "Crowd Management System"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						"Real-time decision support · Auto-refreshing every 30s · ",
						data.length,
						" zones monitored"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: refresh,
						"aria-label": "Refresh crowd data",
						className: "inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-4" }), " Refresh"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "status",
				"aria-live": "polite",
				className: "rounded-xl border border-primary/30 bg-primary/10 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mt-0.5 size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-semibold text-primary",
							children: "AI Recommendation"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-muted-foreground",
							children: [
								"Least crowded entrance right now:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: crowdStats.recommendedZone.name
								}),
								" (",
								crowdStats.recommendedZone.capacity,
								"% capacity, ",
								formatWaitTime(crowdStats.recommendedZone.waitTime),
								") · Avg capacity: ",
								crowdStats.avgCapacity,
								"%"
							]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: data.map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl border border-border bg-card p-4 shadow-lg shadow-black/20 transition-transform hover:-translate-y-0.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold",
								children: z.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getCrowdColor(z.level)}`,
								children: z.level
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 text-xs text-muted-foreground",
							children: "Capacity"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 h-2 overflow-hidden rounded-full bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `h-full transition-all duration-700 ${getCrowdBar(z.level)}`,
								style: { width: `${z.capacity}%` },
								"aria-label": `${z.capacity}% capacity`
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-center justify-between text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [z.capacity, "% full"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: formatWaitTime(z.waitTime)
							})]
						})
					]
				}, z.id))
			})
		]
	});
}
/**
* Memoised CrowdDashboard export.
* Prevents re-renders when parent route state changes but crowd data is unchanged.
*/
var CrowdDashboard = (0, import_react.memo)(CrowdDashboardBase);
//#endregion
export { CrowdDashboard };
