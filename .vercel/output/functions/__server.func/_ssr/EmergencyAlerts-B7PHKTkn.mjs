import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { r as TriangleAlert, t as X } from "../_libs/lucide-react.mjs";
import { t as ALERT_TYPES } from "./constants-CYiY_tRs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/EmergencyAlerts-B7PHKTkn.js
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
	timestamp: /* @__PURE__ */ new Date()
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
							a.timestamp.toLocaleTimeString()
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
//#endregion
export { EmergencyAlerts };
