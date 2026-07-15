import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageSkeleton_default } from "./PageSkeleton-B433rWDk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/staff-Cqwmu4FG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* @fileoverview Staff route — Operational Intelligence portal for StadiumIQ.
* Renders the volunteer and staff coordination portal at `/staff`.
*
* @module routes/staff
*/
var StaffPortal = (0, import_react.lazy)(() => import("./StaffPortal-B3W5Gz7v.mjs").then((m) => ({ default: m.StaffPortal || m.default })));
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
	fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSkeleton_default, {}),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaffPortal, {})
});
//#endregion
export { SplitComponent as component };
