import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as RefreshCw, o as Sparkles, r as TriangleAlert, t as X } from "../_libs/lucide-react.mjs";
import { l as ZONES, o as REFRESH_INTERVAL, t as ALERT_TYPES } from "./constants-BCCCNdz0.mjs";
import { i as getCrowdColor, n as generateCrowdData, r as getCrowdBar, t as formatWaitTime } from "./helpers-n7cuZdJ9.mjs";
import { t as MatchSchedule } from "./MatchSchedule-Zxx3YFQq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-COIcqu_G.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* @fileoverview EmergencyAlerts — High-priority alert banners for StadiumIQ.
* Renders dismissible emergency notifications (weather, medical, security, etc.)
* with ARIA live-region semantics for immediate screen-reader announcement.
*
* @module EmergencyAlerts
*/
/**
* Initial alert set shown on first load.
* In production, these would be pushed from a real-time emergency system.
*/
var INITIAL = [{
	id: 1,
	type: ALERT_TYPES.WEATHER,
	message: "Light rain expected around 8pm — ponchos available at gates.",
	timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString()
}];
/**
* Emergency Alerts section component.
* Renders a dismissible banner for each active alert. When all alerts are
* dismissed the component returns `null`, removing itself from the DOM.
*
* Each alert uses `role="alert"` so screen readers announce it immediately.
*
* @param {EmergencyAlertsProps} props - Component props
* @returns {JSX.Element | null} Alert banners or null when none remain
*/
function EmergencyAlertsBase({ onReport }) {
	const [alerts, setAlerts] = (0, import_react.useState)(INITIAL);
	/**
	* Removes an alert from the visible list by its ID.
	* Stabilised with `useCallback` to avoid re-rendering sibling alerts
	* when an unrelated state update occurs.
	*
	* @param {number} id - The ID of the alert to dismiss
	* @returns {void}
	*/
	const dismiss = (0, import_react.useCallback)((id) => setAlerts((a) => a.filter((x) => x.id !== id)), []);
	if (alerts.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		"aria-label": "Emergency alerts",
		className: "space-y-2",
		children: alerts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "alert",
			className: "flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/15 p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 size-5 text-destructive" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-semibold text-destructive",
						children: [
							a.type,
							" · ",
							a.timestamp
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-foreground/90",
						children: a.message
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onReport,
					className: "rounded-md border border-border bg-background px-2.5 py-1 text-xs hover:bg-accent",
					"aria-label": "Report an incident",
					children: "Report incident"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => dismiss(a.id),
					"aria-label": "Dismiss alert",
					className: "rounded-md p-1 text-muted-foreground hover:bg-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})
			]
		}, a.id))
	});
}
/**
* Memoised EmergencyAlerts export.
* Safe to use at the top of a page layout without causing unnecessary re-renders.
*/
var EmergencyAlerts = (0, import_react.memo)(EmergencyAlertsBase);
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
	/**
	* Derives the least-crowded zone from the current data snapshot.
	* Memoised so the sort only runs when `data` changes.
	*/
	const leastCrowded = (0, import_react.useMemo)(() => {
		return [...data].sort((a, b) => a.capacity - b.capacity)[0];
	}, [data]);
	/**
	* Aggregated crowd statistics derived from the current data snapshot.
	* Used for operational overview in future analytics panels.
	*/
	const crowdStats = (0, import_react.useMemo)(() => ({
		totalHigh: data.filter((z) => z.level === "HIGH").length,
		totalLow: data.filter((z) => z.level === "LOW").length,
		avgCapacity: Math.round(data.reduce((a, z) => a + z.capacity, 0) / data.length)
	}), [data]);
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
						" zones monitored",
						crowdStats.totalHigh > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-2 text-danger",
							children: [
								"· ",
								crowdStats.totalHigh,
								" high-density zone",
								crowdStats.totalHigh > 1 ? "s" : ""
							]
						})
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
									children: leastCrowded.zone
								}),
								" (",
								leastCrowded.capacity,
								"% capacity, ",
								formatWaitTime(leastCrowded.wait),
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
								children: z.zone
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
								children: formatWaitTime(z.wait)
							})]
						})
					]
				}, z.zone))
			})
		]
	});
}
/**
* Memoised CrowdDashboard export.
* Prevents re-renders when parent route state changes but crowd data is unchanged.
*/
var CrowdDashboard = (0, import_react.memo)(CrowdDashboardBase);
/**
* @fileoverview Home route — Dashboard landing page for StadiumIQ.
* Renders the hero section, emergency alerts, crowd management dashboard,
* and match schedule for fans arriving at the app.
*
* @module routes/index
*/
/**
* Home page component — the primary dashboard for StadiumIQ fans.
* Composes emergency alerts, hero banner, crowd management system,
* and match schedule in a single scrollable layout.
*
* @returns {JSX.Element} The home dashboard page
*/
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmergencyAlerts, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-label": "Hero",
				className: "rounded-2xl border border-border bg-gradient-to-br from-navy to-navy/60 p-8 shadow-2xl shadow-black/40",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-semibold uppercase tracking-[0.3em] text-primary",
						children: "FIFA World Cup 2026"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-2 text-4xl font-black leading-tight sm:text-5xl",
						children: [
							"Your ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								children: "AI-powered"
							}),
							" stadium concierge"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base",
						children: "StadiumIQ helps fans, staff, and volunteers navigate the world's biggest tournament — real-time decision support for crowd management, transport, accessibility, and multilingual match assistance all in one place."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrowdDashboard, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchSchedule, {})
		]
	});
}
//#endregion
export { Home as component };
