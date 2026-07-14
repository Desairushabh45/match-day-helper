/**
 * @fileoverview CrowdDashboard — Real-time crowd density monitoring for StadiumIQ.
 * Displays live capacity and wait-time data for all stadium zones with
 * an AI recommendation for the least-crowded entrance.
 *
 * @module CrowdDashboard
 */

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCw, Sparkles } from "lucide-react";
import { ZONES, REFRESH_INTERVAL } from "@/lib/constants";
import { generateCrowdData, getCrowdBar, getCrowdColor, formatWaitTime } from "@/lib/helpers";

/**
 * Core Crowd Management System dashboard component.
 * Polls demo crowd data every `REFRESH_INTERVAL` ms and exposes a manual
 * refresh button. Recommends the least-crowded zone via an AI insight banner.
 *
 * Uses `useMemo` to avoid re-computing sorted zone data on unrelated renders,
 * and `useCallback` to stabilise the refresh handler reference.
 *
 * @returns {JSX.Element} The crowd management dashboard section
 */
function CrowdDashboardBase() {
  const [tick, setTick] = useState(1);

  /**
   * Memoised crowd data snapshot — recalculated only when `tick` increments.
   * Prevents unnecessary re-renders of child zone cards.
   */
  const data = useMemo(() => generateCrowdData(ZONES, tick), [tick]);

  // Auto-refresh crowd data every REFRESH_INTERVAL milliseconds
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), REFRESH_INTERVAL);
    return () => clearInterval(id);
  }, []);

  /**
   * Increments the tick counter to trigger a new data snapshot.
   * Stabilised with `useCallback` to prevent child re-renders.
   *
   * @returns {void}
   */
  const refresh = useCallback(() => setTick((t) => t + 1), []);

  /**
   * Derives the least-crowded zone from the current data snapshot.
   * Memoised so the sort only runs when `data` changes.
   */
  const leastCrowded = useMemo(() => {
    return [...data].sort((a, b) => a.capacity - b.capacity)[0];
  }, [data]);

  /**
   * Aggregated crowd statistics derived from the current data snapshot.
   * Used for operational overview in future analytics panels.
   */
  const crowdStats = useMemo(
    () => ({
      totalHigh: data.filter((z) => z.level === "HIGH").length,
      totalLow: data.filter((z) => z.level === "LOW").length,
      avgCapacity: Math.round(data.reduce((a, z) => a + z.capacity, 0) / data.length),
    }),
    [data],
  );

  return (
    <section aria-labelledby="crowd-heading" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="crowd-heading" className="text-2xl font-bold text-primary">
            Crowd Management System
          </h2>
          <p className="text-sm text-muted-foreground">
            Real-time decision support · Auto-refreshing every 30s · {data.length} zones monitored
            {crowdStats.totalHigh > 0 && (
              <span className="ml-2 text-danger">
                · {crowdStats.totalHigh} high-density zone{crowdStats.totalHigh > 1 ? "s" : ""}
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={refresh}
            aria-label="Refresh crowd data"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-accent"
          >
            <RefreshCw className="size-4" /> Refresh
          </button>
        </div>
      </div>

      <div
        role="status"
        aria-live="polite"
        className="rounded-xl border border-primary/30 bg-primary/10 p-4"
      >
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 size-5 text-primary" />
          <div className="text-sm">
            <div className="font-semibold text-primary">AI Recommendation</div>
            <div className="text-muted-foreground">
              Least crowded entrance right now:{" "}
              <span className="font-semibold text-foreground">{leastCrowded.zone}</span> (
              {leastCrowded.capacity}% capacity, {formatWaitTime(leastCrowded.wait)}) · Avg
              capacity: {crowdStats.avgCapacity}%
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((z) => (
          <article
            key={z.zone}
            className="rounded-xl border border-border bg-card p-4 shadow-lg shadow-black/20 transition-transform hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-semibold">{z.zone}</h3>
              <span
                className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getCrowdColor(z.level)}`}
              >
                {z.level}
              </span>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">Capacity</div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full transition-all duration-700 ${getCrowdBar(z.level)}`}
                style={{ width: `${z.capacity}%` }}
                aria-label={`${z.capacity}% capacity`}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{z.capacity}% full</span>
              <span className="font-medium">{formatWaitTime(z.wait)}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/**
 * Memoised CrowdDashboard export.
 * Prevents re-renders when parent route state changes but crowd data is unchanged.
 */
export const CrowdDashboard = memo(CrowdDashboardBase);
