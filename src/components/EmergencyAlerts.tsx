import { memo, useCallback, useState } from "react";
import { AlertTriangle, X } from "lucide-react";

interface Alert {
  id: number;
  type: "Medical" | "Security" | "Weather" | "Evacuation";
  message: string;
  timestamp: string;
}

const INITIAL: Alert[] = [
  { id: 1, type: "Weather", message: "Light rain expected around 8pm — ponchos available at gates.", timestamp: new Date().toLocaleTimeString() },
];

function EmergencyAlertsBase({ onReport }: { onReport?: () => void }) {
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL);
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
              {a.type} · {a.timestamp}
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

export const EmergencyAlerts = memo(EmergencyAlertsBase);
