import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageSkeleton_default } from "./PageSkeleton-B433rWDk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/schedule-CXCoIA0t.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* @fileoverview Schedule route — Match Schedule page for StadiumIQ.
* Renders the FIFA World Cup 2026 match schedule with filters at `/schedule`.
*
* @module routes/schedule
*/
var MatchSchedule = (0, import_react.lazy)(() => import("./MatchSchedule-DAOqAf08.mjs").then((m) => ({ default: m.MatchSchedule || m.default })));
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
	fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSkeleton_default, {}),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchSchedule, {})
});
//#endregion
export { SplitComponent as component };
