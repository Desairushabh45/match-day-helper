import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { l as ZONES } from "./constants-CYiY_tRs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StaffPortal-B3W5Gz7v.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* @fileoverview StaffPortal — Operational Intelligence dashboard for StadiumIQ.
* Allows venue staff and volunteers to update zone crowd statuses,
* log quick actions, and maintain an activity log of all field events.
*
* @module StaffPortal
*/
/**
* Core staff operations portal component — Operational Intelligence hub.
* Provides a zone-status form (zone selector + crowd level + optional note)
* and quick-action buttons (report issue, request backup, emergency contact,
* mark stable). All actions are logged to the in-memory activity log.
*
* @returns {JSX.Element} The two-column staff portal section
*/
function StaffPortalBase() {
	const [zone, setZone] = (0, import_react.useState)(ZONES[0]);
	const [level, setLevel] = (0, import_react.useState)("MEDIUM");
	const [note, setNote] = (0, import_react.useState)("");
	const [log, setLog] = (0, import_react.useState)([]);
	/**
	* Appends a timestamped entry to the activity log.
	* Caps the log at 20 entries to prevent unbounded growth.
	*
	* @param {string} action - The action description to log
	* @param {string} [z] - The zone it applies to
	* @returns {void}
	*/
	const addLogEntry = (0, import_react.useCallback)((action, z) => {
		setLog((l) => [{
			id: Date.now(),
			action,
			zone: z,
			timestamp: /* @__PURE__ */ new Date()
		}, ...l].slice(0, 20));
	}, []);
	/**
	* Handles the zone-status form submission.
	* Builds a log entry from the current zone, level, and optional note,
	* then clears the note field.
	*
	* @param {React.FormEvent} e - Form submission event
	* @returns {void}
	*/
	const submit = (0, import_react.useCallback)((e) => {
		e.preventDefault();
		const action = `Status updated to ${level}${note ? ` · ${note}` : ""}`;
		addLogEntry(action, zone);
		setNote("");
	}, [
		zone,
		level,
		note,
		addLogEntry
	]);
	/**
	* Logs a quick action without opening a form.
	* Stabilised with `useCallback` so quick-action buttons don't re-render
	* when unrelated state (zone, level, note) changes.
	*
	* @param {string} label - Quick-action description
	* @returns {void}
	*/
	const quick = (0, import_react.useCallback)((label) => {
		addLogEntry(label, zone);
	}, [addLogEntry, zone]);
	const handleReportIssue = (0, import_react.useCallback)((z) => {
		addLogEntry("Reported issue", z);
	}, [addLogEntry]);
	const handleRequestBackup = (0, import_react.useCallback)((z) => {
		addLogEntry("Requested backup", z);
	}, [addLogEntry]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-labelledby": "staff-heading",
		className: "grid gap-4 lg:grid-cols-[1fr_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-card p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "staff-heading",
					className: "text-2xl font-bold text-primary",
					children: "Operational Intelligence — Staff Portal"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Real-time operational intelligence for FIFA World Cup 2026 venue staff, organizers, and volunteers"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "mt-4 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "staff-zone",
							className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
							children: "Zone"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "staff-zone",
							value: zone,
							onChange: (e) => setZone(e.target.value),
							className: "mt-1 w-full rounded-md border border-border bg-input px-3 py-2 text-sm",
							children: ZONES.map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: z }, z))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "staff-level",
							className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
							children: "Crowd level"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							id: "staff-level",
							value: level,
							onChange: (e) => setLevel(e.target.value),
							className: "mt-1 w-full rounded-md border border-border bg-input px-3 py-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "LOW" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "MEDIUM" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "HIGH" })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "staff-note",
							className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
							children: "Note"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "staff-note",
							value: note,
							onChange: (e) => setNote(e.target.value.slice(0, 200)),
							className: "mt-1 w-full rounded-md border border-border bg-input px-3 py-2 text-sm",
							placeholder: "Optional context"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "w-full rounded-lg bg-primary py-2 text-sm font-semibold text-primary-foreground",
							children: "Update zone status"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-2 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleReportIssue(zone),
							className: "rounded-lg border border-border bg-background py-2 text-xs hover:bg-accent",
							children: "Report issue"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleRequestBackup(zone),
							className: "rounded-lg border border-border bg-background py-2 text-xs hover:bg-accent",
							children: "Request backup"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => quick("Called emergency contact"),
							className: "rounded-lg border border-destructive/40 bg-destructive/10 py-2 text-xs text-destructive hover:bg-destructive/20",
							children: "Emergency contact"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => quick("Zone cleared and stable"),
							className: "rounded-lg border border-border bg-background py-2 text-xs hover:bg-accent",
							children: "Mark stable"
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-card p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-semibold text-primary",
				children: "Activity log"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				"aria-live": "polite",
				className: "mt-3 space-y-1.5 text-sm",
				children: [log.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-muted-foreground",
					children: "No activity yet."
				}), log.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-md bg-accent px-3 py-1.5 font-mono text-xs",
					children: [
						"[",
						l.timestamp.toLocaleTimeString(),
						"] ",
						l.zone ? `${l.zone} → ` : "",
						l.action
					]
				}, l.id))]
			})]
		})]
	});
}
/**
* Memoised StaffPortal export.
* Safe for use in route components that may re-render due to URL changes.
*/
var StaffPortal = (0, import_react.memo)(StaffPortalBase);
//#endregion
export { StaffPortal };
