import { memo } from "react";
import { Train, Bus, Car, ParkingSquare } from "lucide-react";

const OPTIONS = [
  {
    icon: Train,
    name: "Metro / Subway",
    detail: "Next train in 4 min · Line A, B",
    status: "On time",
  },
  {
    icon: Bus,
    name: "Bus Routes",
    detail: "Route 12 departs in 8 min · 6 stops",
    status: "Frequent",
  },
  {
    icon: Car,
    name: "Taxi / Rideshare",
    detail: "Est. wait 3–5 min · Gate W pickup",
    status: "Available",
  },
  {
    icon: ParkingSquare,
    name: "Parking",
    detail: "P2: 412 spaces free · P4: full",
    status: "Limited",
  },
];

function TransportHubBase({ onPlanRoute }: { onPlanRoute?: () => void }) {
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
          onClick={onPlanRoute}
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

export const TransportHub = memo(TransportHubBase);
