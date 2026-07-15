import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as SquareParking, h as Bus, i as TramFront, m as Car } from "../_libs/lucide-react.mjs";
import { c as TRANSPORT_TYPES } from "./constants-CYiY_tRs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/TransportHub-Bvn9dXH_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* @fileoverview TransportHub — Multi-modal transport information for StadiumIQ.
* Displays live status for metro, bus, taxi, and parking options
* with an AI-powered route planning action.
*
* @module TransportHub
*/
var getIcon = (type) => {
	if (type === TRANSPORT_TYPES.METRO) return TramFront;
	if (type === TRANSPORT_TYPES.BUS) return Bus;
	if (type === TRANSPORT_TYPES.TAXI) return Car;
	return SquareParking;
};
/**
* Live transport options shown in the hub, keyed to {@link TRANSPORT_TYPES} values.
* In production these would be fetched from a real-time transit API.
*/
var OPTIONS = [
	{
		type: TRANSPORT_TYPES.METRO,
		nextArrival: "Next train in 4 min · Line A, B",
		status: "On time",
		waitTime: 4
	},
	{
		type: TRANSPORT_TYPES.BUS,
		nextArrival: "Route 12 departs in 8 min · 6 stops",
		status: "Frequent",
		waitTime: 8
	},
	{
		type: TRANSPORT_TYPES.TAXI,
		nextArrival: "Est. wait 3–5 min · Gate W pickup",
		status: "Available",
		waitTime: 4
	},
	{
		type: TRANSPORT_TYPES.PARKING,
		nextArrival: "P2: 412 spaces free · P4: full",
		status: "Limited",
		waitTime: 0
	}
];
/**
* Transportation Hub section component.
* Lists all available transport modes with live status and detail text.
* Provides an AI route-planning CTA that opens the AIAssistant panel.
*
* @param {TransportHubProps} props - Component props
* @returns {JSX.Element} The transportation hub section
*/
function TransportHubBase({ onPlanRoute }) {
	/**
	* Memoised click handler for the "Plan My Route with AI" button.
	* Avoids creating a new function reference on every render.
	*
	* @returns {void}
	*/
	const handlePlanRoute = (0, import_react.useCallback)(() => {
		onPlanRoute?.();
	}, [onPlanRoute]);
	const sortedTransport = (0, import_react.useMemo)(() => [...OPTIONS].sort((a, b) => a.waitTime - b.waitTime), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-labelledby": "transport-heading",
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "transport-heading",
					className: "text-2xl font-bold text-primary",
					children: "Transportation Hub"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Live options to and from the stadium."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handlePlanRoute,
					"aria-label": "Plan my route with AI",
					className: "rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90",
					children: "Plan My Route with AI"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: sortedTransport.map((o) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-xl border border-border bg-card p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-10 place-items-center rounded-lg bg-primary/15 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getIcon(o.type), { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-semibold",
								children: o.type
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] uppercase tracking-widest text-success",
								children: o.status
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: o.nextArrival
						})]
					}, o.type);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 p-3 bg-green-50 rounded-lg border border-green-200",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-semibold text-green-800",
					children: "🌿 Sustainability Initiative"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-green-700",
					children: "StadiumIQ optimizes crowd distribution across all gates to reduce unnecessary movement, minimize carbon footprint from fan travel, and promote sustainable tournament operations during FIFA World Cup 2026."
				})]
			})
		]
	});
}
/**
* Memoised TransportHub export.
* Prevents re-renders unless `onPlanRoute` reference changes.
*/
var TransportHub = (0, import_react.memo)(TransportHubBase);
//#endregion
export { TransportHub };
