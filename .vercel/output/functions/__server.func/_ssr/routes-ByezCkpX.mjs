import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageSkeleton_default } from "./PageSkeleton-B433rWDk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-ByezCkpX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* @fileoverview Home route — Dashboard landing page for StadiumIQ.
* Renders the hero section, emergency alerts, crowd management dashboard,
* and match schedule for fans arriving at the app.
*
* @module routes/index
*/
var EmergencyAlerts = (0, import_react.lazy)(() => import("./EmergencyAlerts-B7PHKTkn.mjs").then((m) => ({ default: m.EmergencyAlerts || m.default })));
var CrowdDashboard = (0, import_react.lazy)(() => import("./CrowdDashboard-Ch8wj1tG.mjs").then((m) => ({ default: m.CrowdDashboard || m.default })));
var MatchSchedule = (0, import_react.lazy)(() => import("./MatchSchedule-DAOqAf08.mjs").then((m) => ({ default: m.MatchSchedule || m.default })));
/**
* Home page component — the primary dashboard for StadiumIQ fans.
* Composes emergency alerts, hero banner, crowd management system,
* and match schedule in a single scrollable layout.
*
* @returns {JSX.Element} The home dashboard page
*/
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Suspense, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSkeleton_default, {}),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmergencyAlerts, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"aria-label": "Hero",
					className: "rounded-2xl border border-border bg-gradient-to-br from-navy to-navy/60 p-8 shadow-2xl shadow-black/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center mb-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-[#fef3c7] text-[#92400e] px-4 py-2 rounded-full text-sm font-semibold",
								children: "⚽ FIFA World Cup 2026 — Official Smart Stadium Assistant"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 text-4xl font-black leading-tight sm:text-5xl",
							children: "StadiumIQ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base",
							children: "GenAI-enabled solution enhancing stadium operations and tournament experience for fans, organizers, volunteers, and venue staff"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrowdDashboard, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchSchedule, {})
			]
		})
	});
}
//#endregion
export { Home as component };
