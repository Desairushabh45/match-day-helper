import { memo, useCallback, useState } from "react";
import { ZONES, type Zone, type CrowdLevel } from "@/lib/constants";

function StaffPortalBase() {
  const [zone, setZone] = useState<Zone>(ZONES[0]);
  const [level, setLevel] = useState<CrowdLevel>("MEDIUM");
  const [note, setNote] = useState("");
  const [log, setLog] = useState<string[]>([]);

  const submit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const entry = `[${new Date().toLocaleTimeString()}] ${zone} → ${level}${note ? ` · ${note}` : ""}`;
      setLog((l) => [entry, ...l].slice(0, 20));
      setNote("");
    },
    [zone, level, note],
  );

  const quick = useCallback((label: string) => {
    setLog((l) => [`[${new Date().toLocaleTimeString()}] ${label}`, ...l].slice(0, 20));
  }, []);

  return (
    <section aria-labelledby="staff-heading" className="grid gap-4 lg:grid-cols-[1fr_1fr]">
      <div className="rounded-xl border border-border bg-card p-4">
        <h2 id="staff-heading" className="text-2xl font-bold text-primary">Volunteer & Staff Portal</h2>
        <p className="mt-1 text-sm text-muted-foreground">Update zone status and coordinate on the ground.</p>

        <form onSubmit={submit} className="mt-4 space-y-3">
          <div>
            <label htmlFor="staff-zone" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Zone</label>
            <select id="staff-zone" value={zone} onChange={(e) => setZone(e.target.value as Zone)}
              className="mt-1 w-full rounded-md border border-border bg-input px-3 py-2 text-sm">
              {ZONES.map((z) => <option key={z}>{z}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="staff-level" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Crowd level</label>
            <select id="staff-level" value={level} onChange={(e) => setLevel(e.target.value as CrowdLevel)}
              className="mt-1 w-full rounded-md border border-border bg-input px-3 py-2 text-sm">
              <option>LOW</option><option>MEDIUM</option><option>HIGH</option>
            </select>
          </div>
          <div>
            <label htmlFor="staff-note" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Note</label>
            <input id="staff-note" value={note} onChange={(e) => setNote(e.target.value.slice(0, 200))}
              className="mt-1 w-full rounded-md border border-border bg-input px-3 py-2 text-sm"
              placeholder="Optional context" />
          </div>
          <button className="w-full rounded-lg bg-primary py-2 text-sm font-semibold text-primary-foreground">
            Update zone status
          </button>
        </form>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button onClick={() => quick("Reported issue: crowd surge")} className="rounded-lg border border-border bg-background py-2 text-xs hover:bg-accent">Report issue</button>
          <button onClick={() => quick("Requested backup at current zone")} className="rounded-lg border border-border bg-background py-2 text-xs hover:bg-accent">Request backup</button>
          <button onClick={() => quick("Called emergency contact")} className="rounded-lg border border-destructive/40 bg-destructive/10 py-2 text-xs text-destructive hover:bg-destructive/20">Emergency contact</button>
          <button onClick={() => quick("Zone cleared and stable")} className="rounded-lg border border-border bg-background py-2 text-xs hover:bg-accent">Mark stable</button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <h3 className="font-semibold text-primary">Activity log</h3>
        <ul aria-live="polite" className="mt-3 space-y-1.5 text-sm">
          {log.length === 0 && <li className="text-muted-foreground">No activity yet.</li>}
          {log.map((l, i) => <li key={i} className="rounded-md bg-accent px-3 py-1.5 font-mono text-xs">{l}</li>)}
        </ul>
      </div>
    </section>
  );
}

export const StaffPortal = memo(StaffPortalBase);
