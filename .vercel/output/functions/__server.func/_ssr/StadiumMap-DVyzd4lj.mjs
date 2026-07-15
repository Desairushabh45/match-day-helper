import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { l as ZONES } from "./constants-CYiY_tRs.mjs";
import { n as generateCrowdData, r as getCrowdBar } from "./helpers-CJx_akSF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StadiumMap-DVyzd4lj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* @fileoverview StadiumMap — Interactive SVG stadium map for StadiumIQ.
* Renders a clickable SVG layout of the stadium with live crowd-density
* colour coding per zone and a sidebar showing zone details.
*
* @module StadiumMap
*/
/**
* Static zone metadata — facilities and directional guidance per zone.
* Keyed by zone name (matching the ZONES constant values).
*/
var ZONE_INFO = {
	"North Gate": {
		facilities: [
			"Toilets",
			"First Aid",
			"Info Desk"
		],
		directions: "Main entry, near metro exit A"
	},
	"South Gate": {
		facilities: [
			"Toilets",
			"Parking",
			"Taxi Stand"
		],
		directions: "Bus loop and parking lot P2"
	},
	"East Gate": {
		facilities: ["Family Zone", "First Aid"],
		directions: "Accessible ramps, wheelchair route"
	},
	"West Gate": {
		facilities: ["Toilets", "Exit"],
		directions: "Fastest exit to rideshare pickup"
	},
	"Food Court": {
		facilities: [
			"30+ Vendors",
			"Halal",
			"Vegan"
		],
		directions: "Concourse level 2, center"
	},
	"VIP Section": {
		facilities: ["Lounge", "Concierge"],
		directions: "Level 3 with dedicated elevator"
	}
};
/**
* Zone rectangle positions within the 500×400 SVG viewBox.
* Arranged to approximate a real stadium layout.
*/
var LAYOUT = [
	{
		x: 175,
		y: 20,
		w: 150,
		h: 40,
		label: "North Gate"
	},
	{
		x: 175,
		y: 340,
		w: 150,
		h: 40,
		label: "South Gate"
	},
	{
		x: 400,
		y: 170,
		w: 90,
		h: 60,
		label: "East Gate"
	},
	{
		x: 10,
		y: 170,
		w: 90,
		h: 60,
		label: "West Gate"
	},
	{
		x: 130,
		y: 130,
		w: 100,
		h: 55,
		label: "Food Court"
	},
	{
		x: 270,
		y: 130,
		w: 100,
		h: 55,
		label: "VIP Section"
	}
];
/**
* Colour legend item for the stadium map.
*
* @param {LegendProps} props - Component props
* @returns {JSX.Element} A coloured swatch with a text label
*/
function Legend({ color, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `inline-block size-3 rounded ${color}`,
			"aria-hidden": true
		}), label]
	});
}
/**
* Interactive stadium map component.
* Renders an SVG bird's-eye view of the stadium with clickable zone rectangles
* colour-coded by crowd level. The selected zone's details appear in the sidebar.
*
* Uses `useMemo` to avoid regenerating crowd data on every render and
* `useCallback` to stabilise the zone selection handler.
*
* @returns {JSX.Element} The two-column map + sidebar section
*/
function StadiumMapBase() {
	const [selected, setSelected] = (0, import_react.useState)("North Gate");
	/**
	* Crowd data snapshot for the initial tick.
	* Memoised with no dependencies — changes only if the component re-mounts.
	*/
	const data = (0, import_react.useMemo)(() => generateCrowdData(ZONES, 1), []);
	/**
	* Crowd data indexed by zone name for O(1) lookup during SVG rendering.
	*/
	const byZone = (0, import_react.useMemo)(() => Object.fromEntries(data.map((d) => [d.name, d])), [data]);
	/**
	* Updates the selected zone when the user clicks or activates a zone via keyboard.
	*
	* @param {string} zoneName - Name of the zone to select
	* @returns {void}
	*/
	const handleSelectZone = (0, import_react.useCallback)((zoneName) => {
		setSelected(zoneName);
	}, []);
	const info = ZONE_INFO[selected];
	const cur = byZone[selected];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-labelledby": "map-heading",
		className: "grid gap-4 lg:grid-cols-[1.6fr_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-card p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "map-heading",
					className: "mb-2 text-xl font-bold text-primary",
					children: "Interactive Stadium Map"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					viewBox: "0 0 500 400",
					className: "w-full",
					role: "img",
					"aria-label": "Stadium layout with clickable zones",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
							cx: "250",
							cy: "200",
							rx: "180",
							ry: "130",
							fill: "oklch(0.28 0.05 260)",
							stroke: "var(--gold)",
							strokeWidth: "2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "180",
							y: "150",
							width: "140",
							height: "100",
							rx: "6",
							fill: "oklch(0.42 0.14 145)",
							opacity: "0.6"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							x: "250",
							y: "205",
							textAnchor: "middle",
							fontSize: "14",
							fill: "var(--gold)",
							fontWeight: "bold",
							children: "PITCH"
						}),
						LAYOUT.map((p) => {
							const zd = byZone[p.label];
							const isSelected = selected === p.label;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
								className: "cursor-pointer",
								onClick: () => handleSelectZone(p.label),
								tabIndex: 0,
								role: "button",
								"aria-label": `${p.label}, ${zd?.level} crowd`,
								"aria-pressed": isSelected,
								onKeyDown: (e) => {
									if (e.key === "Enter") handleSelectZone(p.label);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									x: p.x,
									y: p.y,
									width: p.w,
									height: p.h,
									rx: "8",
									className: getCrowdBar(zd.level),
									fillOpacity: isSelected ? .95 : .75,
									stroke: isSelected ? "var(--gold)" : "transparent",
									strokeWidth: "3"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
									x: p.x + p.w / 2,
									y: p.y + p.h / 2 + 4,
									textAnchor: "middle",
									fontSize: "11",
									fill: "white",
									fontWeight: "600",
									pointerEvents: "none",
									children: p.label
								})]
							}, p.label);
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
							color: "bg-success",
							label: "Low"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
							color: "bg-warning",
							label: "Medium"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
							color: "bg-danger",
							label: "High"
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "rounded-xl border border-border bg-card p-4",
			"aria-live": "polite",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-widest text-muted-foreground",
					children: "Selected zone"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 text-2xl font-bold text-primary",
					children: selected
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 text-sm text-muted-foreground",
					children: info?.directions
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 rounded-lg bg-accent p-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Capacity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold",
								children: [cur?.capacity, "%"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Wait" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold",
								children: [cur?.waitTime, " min"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Crowd" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: cur?.level
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-widest text-muted-foreground",
						children: "Facilities"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 flex flex-wrap gap-2",
						children: info?.facilities.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-full border border-border bg-background px-2.5 py-1 text-xs",
							children: f
						}, f))
					})]
				})
			]
		})]
	});
}
/**
* Memoised StadiumMap export.
* Crowd data is generated once on mount; memoisation avoids re-renders
* caused by parent navigation state changes.
*/
var StadiumMap = (0, import_react.memo)(StadiumMapBase);
//#endregion
export { StadiumMap };
