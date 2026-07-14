/**
 * @fileoverview TransportHub — Multi-modal transport information for StadiumIQ.
 * Displays live status for metro, bus, taxi, and parking options
 * with an AI-powered route planning action.
 *
 * @module TransportHub
 */

import { memo, useCallback } from "react";
import { Train, Bus, Car, ParkingSquare } from "lucide-react";
import { TRANSPORT_TYPES } from "@/lib/constants";

/** A single transport mode configuration entry */
interface TransportOption {
  /** Lucide icon component to render */
  icon: React.ElementType;
  /** Display name of the transport mode */
  name: string;
  /** Live status detail text */
  detail: string;
  /** Short status badge text */
  status: string;
}

/**
 * Live transport options shown in the hub, keyed to {@link TRANSPORT_TYPES} values.
 * In production these would be fetched from a real-time transit API.
 */
const OPTIONS: TransportOption[] = [
  {
    icon: Train,
    name: TRANSPORT_TYPES.METRO,
    detail: "Next train in 4 min · Line A, B",
    status: "On time",
  },
  {
    icon: Bus,
    name: TRANSPORT_TYPES.BUS,
    detail: "Route 12 departs in 8 min · 6 stops",
    status: "Frequent",
  },
  {
    icon: Car,
    name: TRANSPORT_TYPES.TAXI,
    detail: "Est. wait 3–5 min · Gate W pickup",
    status: "Available",
  },
  {
    icon: ParkingSquare,
    name: TRANSPORT_TYPES.PARKING,
    detail: "P2: 412 spaces free · P4: full",
    status: "Limited",
  },
];

/** Props for the TransportHub component */
interface TransportHubProps {
  /** Optional callback fired when the user clicks "Plan My Route with AI" */
  onPlanRoute?: () => void;
}

/**
 * Transportation Hub section component.
 * Lists all available transport modes with live status and detail text.
 * Provides an AI route-planning CTA that opens the AIAssistant panel.
 *
 * @param {TransportHubProps} props - Component props
 * @returns {JSX.Element} The transportation hub section
 */
function TransportHubBase({ onPlanRoute }: TransportHubProps) {
  /**
   * Memoised click handler for the "Plan My Route with AI" button.
   * Avoids creating a new function reference on every render.
   *
   * @returns {void}
   */
  const handlePlanRoute = useCallback(() => {
    onPlanRoute?.();
  }, [onPlanRoute]);

  return (
    <section aria-labelledby="transport-heading" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="transport-heading" className="text-2xl font-bold text-primary">
            Transportation Hub
          </h2>
          <p className="text-sm text-muted-foreground">Live options to and from the stadium.</p>
        </div>
        <button
          onClick={handlePlanRoute}
          aria-label="Plan my route with AI"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          Plan My Route with AI
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {OPTIONS.map((o) => (
          <article key={o.name} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-lg bg-primary/15 text-primary">
                <o.icon className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">{o.name}</h3>
                <div className="text-[10px] uppercase tracking-widest text-success">{o.status}</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{o.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/**
 * Memoised TransportHub export.
 * Prevents re-renders unless `onPlanRoute` reference changes.
 */
export const TransportHub = memo(TransportHubBase);
