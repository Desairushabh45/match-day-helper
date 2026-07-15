import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PageSkeleton-B433rWDk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PageSkeleton = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "animate-pulse p-8 space-y-6",
	role: "status",
	"aria-label": "Loading page content",
	"aria-live": "polite",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 bg-muted rounded w-1/3" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
			children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 bg-muted rounded-xl" }, i))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-48 bg-muted rounded-xl" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Loading StadiumIQ content, please wait..."
		})
	]
});
var PageSkeleton_default = import_react.memo(PageSkeleton);
//#endregion
export { PageSkeleton_default as t };
