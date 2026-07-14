import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { d as HeartPulse, f as Eye, g as Accessibility, n as Volume2, p as Ear } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/accessibility-Bo3gAH9Z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* @fileoverview AccessibilityGuide — Multilingual & Accessibility features for StadiumIQ.
* Displays accessibility services available at the stadium and provides
* large-text and high-contrast display mode toggles that apply CSS classes
* to the document root element.
*
* @module AccessibilityGuide
*/
/**
* Static list of accessibility services offered at the stadium.
* Memoised outside the component so the reference is stable across renders.
*/
var ITEMS = [
	{
		icon: Accessibility,
		title: "Wheelchair Routes",
		desc: "Step-free entry via East Gate and elevators to all levels."
	},
	{
		icon: Ear,
		title: "Hearing Loops",
		desc: "Induction loops at info desks, gates, and VIP lounges."
	},
	{
		icon: Eye,
		title: "Visual Aids",
		desc: "Braille signage, high-contrast wayfinding, tactile maps at kiosks."
	},
	{
		icon: Volume2,
		title: "Quiet Zones",
		desc: "Low-stimulation rooms on Level 2, sections 210 and 235."
	},
	{
		icon: HeartPulse,
		title: "Medical Stations",
		desc: "24/7 first aid at every gate, defibrillators every 60m."
	}
];
/**
* Accessibility Guide page component.
* Renders service cards and provides two document-level display toggles:
* - **Large text** — adds `large-text` class to `<html>` for 20% font scale
* - **High contrast** — adds `high-contrast` class to `<html>` for WCAG AAA colours
*
* Cleans up CSS classes on unmount to avoid persistent state across navigations.
*
* @returns {JSX.Element} The accessibility guide section with service cards
*/
function AccessibilityGuideBase() {
	const [large, setLarge] = (0, import_react.useState)(false);
	const [contrast, setContrast] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.toggle("large-text", large);
		document.documentElement.classList.toggle("high-contrast", contrast);
		return () => {
			document.documentElement.classList.remove("large-text");
			document.documentElement.classList.remove("high-contrast");
		};
	}, [large, contrast]);
	/**
	* Toggles the large-text display mode on or off.
	* Stabilised with `useCallback` so the button does not cause re-renders
	* of other components that share the same render scope.
	*
	* @returns {void}
	*/
	const toggleLarge = (0, import_react.useCallback)(() => setLarge((v) => !v), []);
	/**
	* Toggles the high-contrast display mode on or off.
	*
	* @returns {void}
	*/
	const toggleContrast = (0, import_react.useCallback)(() => setContrast((v) => !v), []);
	/**
	* Memoised ITEMS list — reference-stable, avoids accidental re-renders
	* if this component is ever lifted into a context that changes frequently.
	*/
	const items = (0, import_react.useMemo)(() => ITEMS, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-labelledby": "a11y-heading",
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "a11y-heading",
				className: "text-2xl font-bold text-primary",
				children: "Accessibility Guide"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Multilingual Assistance — A stadium experience designed for everyone."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"aria-pressed": large,
					onClick: toggleLarge,
					className: "rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-accent",
					children: large ? "Reset text size" : "Large text"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"aria-pressed": contrast,
					onClick: toggleContrast,
					className: "rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-accent",
					children: contrast ? "Normal contrast" : "High contrast"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
			children: items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-xl border border-border bg-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-10 place-items-center rounded-lg bg-primary/15 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(it.icon, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold",
						children: it.title
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: it.desc
				})]
			}, it.title))
		})]
	});
}
/**
* Memoised AccessibilityGuide export.
* Ensures the component does not re-render unless its route activates.
*/
var AccessibilityGuide = (0, import_react.memo)(AccessibilityGuideBase);
/**
* @fileoverview Accessibility route — Multilingual Assistance & Accessibility Guide for StadiumIQ.
* Renders the accessibility services page at `/accessibility`.
*
* @module routes/accessibility
*/
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessibilityGuide, {});
//#endregion
export { SplitComponent as component };
