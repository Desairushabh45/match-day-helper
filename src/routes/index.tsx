import { createFileRoute } from "@tanstack/react-router";
import { EmergencyAlerts } from "@/components/EmergencyAlerts";
import { CrowdDashboard } from "@/components/CrowdDashboard";
import { MatchSchedule } from "@/components/MatchSchedule";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="space-y-8">
      <EmergencyAlerts />
      <section
        aria-label="Hero"
        className="rounded-2xl border border-border bg-gradient-to-br from-navy to-navy/60 p-8 shadow-2xl shadow-black/40"
      >
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          FIFA World Cup 2026
        </div>
        <h1 className="mt-2 text-4xl font-black leading-tight sm:text-5xl">
          Your <span className="text-primary">AI-powered</span> stadium concierge
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          StadiumFlow AI helps fans, staff, and volunteers navigate the world's biggest tournament —
          live crowd data, transport, accessibility, and multilingual match support in one place.
        </p>
      </section>
      <CrowdDashboard />
      <MatchSchedule />
    </div>
  );
}
