import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageSkeleton_default } from "./PageSkeleton-B433rWDk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/map-DUtaR8_L.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* @fileoverview Map route — Interactive Stadium Map for StadiumIQ.
* Renders the interactive SVG stadium navigation map at `/map`.
*
* @module routes/map
*/
var StadiumMap = (0, import_react.lazy)(() => import("./StadiumMap-DVyzd4lj.mjs").then((m) => ({ default: m.StadiumMap || m.default })));
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
	fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSkeleton_default, {}),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StadiumMap, {})
});
//#endregion
export { SplitComponent as component };
