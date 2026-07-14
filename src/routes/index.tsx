/**
 * @fileoverview Home route — Dashboard landing page for StadiumIQ.
 * Renders the hero section, emergency alerts, crowd management dashboard,
 * and match schedule for fans arriving at the app.
 *
 * @module routes/index
 */

import { createFileRoute } from "@tanstack/react-router";
import { EmergencyAlerts } from "@/components/EmergencyAlerts";
import { CrowdDashboard } from "@/components/CrowdDashboard";
import { MatchSchedule } from "@/components/MatchSchedule";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StadiumIQ — Crowd Management System & Real-time Decision Support · FIFA 2026" },
      {
        name: "description",
        content:
          "StadiumIQ home dashboard: live crowd management, real-time AI decision support, match schedule, and emergency alerts for FIFA World Cup 2026.",
      },
    ],
  }),
  component: Home,
});

/**
 * Home page component — the primary dashboard for StadiumIQ fans.
 * Composes emergency alerts, hero banner, crowd management system,
 * and match schedule in a single scrollable layout.
 *
 * @returns {JSX.Element} The home dashboard page
 */
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
          StadiumIQ helps fans, staff, and volunteers navigate the world's biggest tournament —
          real-time decision support for crowd management, transport, accessibility, and
          multilingual match assistance all in one place.
        </p>
      </section>
      <CrowdDashboard />
      <MatchSchedule />
    </div>
  );
}
