/**
 * @fileoverview EmergencyAlerts — High-priority alert banners for StadiumIQ.
 * Renders dismissible emergency notifications (weather, medical, security, etc.)
 * with ARIA live-region semantics for immediate screen-reader announcement.
 *
 * @module EmergencyAlerts
 */

import { memo, useCallback, useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { ALERT_TYPES } from "@/lib/constants";

import { Alert } from "@/types";

/** Props for the EmergencyAlerts component */
interface EmergencyAlertsProps {
  /** Optional callback invoked when the user clicks "Report incident" */
  onReport?: () => void;
}

/**
 * Initial alert set shown on first load.
 * In production, these would be pushed from a real-time emergency system.
 */
const INITIAL: Alert[] = [
  {
    id: 1,
    type: ALERT_TYPES.WEATHER,
    message: "Light rain expected around 8pm — ponchos available at gates.",
    timestamp: new Date(),
  },
];

/**
 * Emergency Alerts section component.
 * Renders a dismissible banner for each active alert. When all alerts are
 * dismissed the component returns `null`, removing itself from the DOM.
 *
 * Each alert uses `role="alert"` so screen readers announce it immediately.
 *
 * @param {EmergencyAlertsProps} props - Component props
 * @returns {JSX.Element | null} Alert banners or null when none remain
 */
function EmergencyAlertsBase({ onReport }: EmergencyAlertsProps) {
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL);

  /**
   * Removes an alert from the visible list by its ID.
   * Stabilised with `useCallback` to avoid re-rendering sibling alerts
   * when an unrelated state update occurs.
   *
   * @param {number} id - The ID of the alert to dismiss
   * @returns {void}
   */
  const dismiss = useCallback((id: number) => setAlerts((a) => a.filter((x) => x.id !== id)), []);

  if (alerts.length === 0) return null;

  return (
    <section aria-label="Emergency alerts" className="space-y-2">
      {alerts.map((a) => (
        <div
          key={a.id}
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/15 p-3"
        >
          <AlertTriangle className="mt-0.5 size-5 text-destructive" />
          <div className="flex-1 text-sm">
            <div className="font-semibold text-destructive">
              {a.type} · {a.timestamp.toLocaleTimeString()}
            </div>
            <div className="text-foreground/90">{a.message}</div>
          </div>
          <button
            onClick={onReport}
            className="rounded-md border border-border bg-background px-2.5 py-1 text-xs hover:bg-accent"
            aria-label="Report an incident"
          >
            Report incident
          </button>
          <button
            onClick={() => dismiss(a.id)}
            aria-label="Dismiss alert"
            className="rounded-md p-1 text-muted-foreground hover:bg-accent"
          >
            <X className="size-4" />
          </button>
        </div>
      ))}
    </section>
  );
}

/**
 * Memoised EmergencyAlerts export.
 * Safe to use at the top of a page layout without causing unnecessary re-renders.
 */
export const EmergencyAlerts = memo(EmergencyAlertsBase);
