/**
 * @fileoverview StaffPortal — Operational Intelligence dashboard for StadiumIQ.
 * Allows venue staff and volunteers to update zone crowd statuses,
 * log quick actions, and maintain an activity log of all field events.
 *
 * @module StaffPortal
 */

import { memo, useCallback, useState } from "react";
import { ZONES, type Zone, type CrowdLevel } from "@/lib/constants";

/**
 * Core staff operations portal component — Operational Intelligence hub.
 * Provides a zone-status form (zone selector + crowd level + optional note)
 * and quick-action buttons (report issue, request backup, emergency contact,
 * mark stable). All actions are logged to the in-memory activity log.
 *
 * @returns {JSX.Element} The two-column staff portal section
 */
function StaffPortalBase() {
  const [zone, setZone] = useState<Zone>(ZONES[0]);
  const [level, setLevel] = useState<CrowdLevel>("MEDIUM");
  const [note, setNote] = useState("");
  const [log, setLog] = useState<string[]>([]);

  /**
   * Appends a timestamped entry to the activity log.
   * Caps the log at 20 entries to prevent unbounded growth.
   *
   * @param {string} label - The action description to log
   * @returns {void}
   */
  const addLogEntry = useCallback((label: string) => {
    setLog((l) => [`[${new Date().toLocaleTimeString()}] ${label}`, ...l].slice(0, 20));
  }, []);

  /**
   * Handles the zone-status form submission.
   * Builds a log entry from the current zone, level, and optional note,
   * then clears the note field.
   *
   * @param {React.FormEvent} e - Form submission event
   * @returns {void}
   */
  const submit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const entry = `${zone} → ${level}${note ? ` · ${note}` : ""}`;
      addLogEntry(entry);
      setNote("");
    },
    [zone, level, note, addLogEntry],
  );

  /**
   * Logs a quick action without opening a form.
   * Stabilised with `useCallback` so quick-action buttons don't re-render
   * when unrelated state (zone, level, note) changes.
   *
   * @param {string} label - Quick-action description
   * @returns {void}
   */
  const quick = useCallback(
    (label: string) => {
      addLogEntry(label);
    },
    [addLogEntry],
  );

  return (
    <section aria-labelledby="staff-heading" className="grid gap-4 lg:grid-cols-[1fr_1fr]">
      <div className="rounded-xl border border-border bg-card p-4">
        <h2 id="staff-heading" className="text-2xl font-bold text-primary">
          Operational Intelligence — Staff Portal
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Update zone status and coordinate on the ground.
        </p>

        <form onSubmit={submit} className="mt-4 space-y-3">
          <div>
            <label
              htmlFor="staff-zone"
              className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Zone
            </label>
            <select
              id="staff-zone"
              value={zone}
              onChange={(e) => setZone(e.target.value as Zone)}
              className="mt-1 w-full rounded-md border border-border bg-input px-3 py-2 text-sm"
            >
              {ZONES.map((z) => (
                <option key={z}>{z}</option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="staff-level"
              className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Crowd level
            </label>
            <select
              id="staff-level"
              value={level}
              onChange={(e) => setLevel(e.target.value as CrowdLevel)}
              className="mt-1 w-full rounded-md border border-border bg-input px-3 py-2 text-sm"
            >
              <option>LOW</option>
              <option>MEDIUM</option>
              <option>HIGH</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="staff-note"
              className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Note
            </label>
            <input
              id="staff-note"
              value={note}
              onChange={(e) => setNote(e.target.value.slice(0, 200))}
              className="mt-1 w-full rounded-md border border-border bg-input px-3 py-2 text-sm"
              placeholder="Optional context"
            />
          </div>
          <button className="w-full rounded-lg bg-primary py-2 text-sm font-semibold text-primary-foreground">
            Update zone status
          </button>
        </form>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={() => quick("Reported issue: crowd surge")}
            className="rounded-lg border border-border bg-background py-2 text-xs hover:bg-accent"
          >
            Report issue
          </button>
          <button
            onClick={() => quick("Requested backup at current zone")}
            className="rounded-lg border border-border bg-background py-2 text-xs hover:bg-accent"
          >
            Request backup
          </button>
          <button
            onClick={() => quick("Called emergency contact")}
            className="rounded-lg border border-destructive/40 bg-destructive/10 py-2 text-xs text-destructive hover:bg-destructive/20"
          >
            Emergency contact
          </button>
          <button
            onClick={() => quick("Zone cleared and stable")}
            className="rounded-lg border border-border bg-background py-2 text-xs hover:bg-accent"
          >
            Mark stable
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <h3 className="font-semibold text-primary">Activity log</h3>
        <ul aria-live="polite" className="mt-3 space-y-1.5 text-sm">
          {log.length === 0 && <li className="text-muted-foreground">No activity yet.</li>}
          {log.map((l, i) => (
            <li key={i} className="rounded-md bg-accent px-3 py-1.5 font-mono text-xs">
              {l}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Memoised StaffPortal export.
 * Safe for use in route components that may re-render due to URL changes.
 */
export const StaffPortal = memo(StaffPortalBase);
