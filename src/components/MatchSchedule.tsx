import { memo, useEffect, useMemo, useState } from "react";
import { MATCHES } from "@/lib/constants";

function Countdown({ target }: { target: string }) {
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

function MatchScheduleBase() {
  const [group, setGroup] = useState<string>("ALL");
  const [venue, setVenue] = useState<string>("ALL");

  const groups = useMemo(() => ["ALL", ...Array.from(new Set(MATCHES.map((m) => m.group)))], []);
  const venues = useMemo(() => ["ALL", ...Array.from(new Set(MATCHES.map((m) => m.venue)))], []);

  const filtered = useMemo(
    () =>
      MATCHES.filter(
        (m) => (group === "ALL" || m.group === group) && (venue === "ALL" || m.venue === venue),
      ),
    [group, venue],
  );

  const next = MATCHES[0];

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
            onChange={(e) => setGroup(e.target.value)}
            className="rounded-md border border-border bg-input px-2 py-1.5 text-sm"
          >
            {groups.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
          <select
            aria-label="Filter by venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
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

export const MatchSchedule = memo(MatchScheduleBase);
