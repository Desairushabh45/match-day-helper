/**
 * @fileoverview MatchSchedule — FIFA World Cup 2026 match listing with filters.
 * Renders upcoming matches with live countdown timers, group/venue filters,
 * and responsive card layout.
 *
 * @module MatchSchedule
 */

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { MATCHES } from "@/lib/constants";

/** Props for the internal Countdown component */
interface CountdownProps {
  /** ISO 8601 datetime string of the match start time */
  target: string;
}

/**
 * Live countdown timer that ticks every second until the target datetime.
 * Renders "Live" once the target time has passed.
 *
 * @param {CountdownProps} props - Component props
 * @returns {JSX.Element} A formatted countdown string or "Live" indicator
 */
function Countdown({ target }: CountdownProps) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = new Date(target).getTime() - now;
  if (diff <= 0) return <span className="text-success">Live</span>;

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return (
    <span className="font-mono tabular-nums">
      {d}d {h}h {m}m {s}s
    </span>
  );
}

/**
 * Match schedule dashboard with group and venue filtering.
 * Uses `useMemo` to avoid re-filtering the full MATCHES array on every render
 * and `useCallback` to stabilise the filter change handlers.
 *
 * @returns {JSX.Element} The filterable match schedule section
 */
function MatchScheduleBase() {
  const [group, setGroup] = useState<string>("ALL");
  const [venue, setVenue] = useState<string>("ALL");

  /**
   * Unique group identifiers derived from the MATCHES data.
   * Memoised — recalculates only if MATCHES changes (effectively never at runtime).
   */
  const groups = useMemo(() => ["ALL", ...Array.from(new Set(MATCHES.map((m) => m.group)))], []);

  /**
   * Unique venue names derived from the MATCHES data.
   * Memoised for the same reason as `groups`.
   */
  const venues = useMemo(() => ["ALL", ...Array.from(new Set(MATCHES.map((m) => m.venue)))], []);

  /**
   * Filtered match list based on the selected group and venue.
   * Recalculates whenever the filter selections change.
   */
  const filtered = useMemo(
    () =>
      MATCHES.filter(
        (m) => (group === "ALL" || m.group === group) && (venue === "ALL" || m.venue === venue),
      ),
    [group, venue],
  );

  /**
   * The next upcoming match (first in the array — matches sorted by time).
   * Used for the countdown display in the section header.
   */
  const next = useMemo(() => MATCHES[0], []);

  /**
   * Handler for group filter `<select>` changes.
   * Stabilised with `useCallback` to avoid re-rendering the filter controls.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} e - Change event
   * @returns {void}
   */
  const handleGroupChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setGroup(e.target.value);
  }, []);

  /**
   * Handler for venue filter `<select>` changes.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} e - Change event
   * @returns {void}
   */
  const handleVenueChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setVenue(e.target.value);
  }, []);

  return (
    <section aria-labelledby="matches-heading" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="matches-heading" className="text-2xl font-bold text-primary">
            Match Schedule
          </h2>
          <p className="text-sm text-muted-foreground">
            Next match starts in <Countdown target={next.time} />
          </p>
        </div>
        <div className="flex gap-2">
          <select
            aria-label="Filter by group"
            value={group}
            onChange={handleGroupChange}
            className="rounded-md border border-border bg-input px-2 py-1.5 text-sm"
          >
            {groups.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
          <select
            aria-label="Filter by venue"
            value={venue}
            onChange={handleVenueChange}
            className="rounded-md border border-border bg-input px-2 py-1.5 text-sm"
          >
            {venues.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((m) => (
          <article key={m.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Group {m.group}</span>
              <span>
                {new Date(m.time).toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-lg font-bold">
              <span>{m.home}</span>
              <span className="text-primary">vs</span>
              <span>{m.away}</span>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">{m.venue}</div>
            <div className="mt-2 inline-block rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
              {m.status}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/**
 * Memoised MatchSchedule export.
 * Safe to use in pages that re-render frequently (e.g., countdown parent).
 */
export const MatchSchedule = memo(MatchScheduleBase);
