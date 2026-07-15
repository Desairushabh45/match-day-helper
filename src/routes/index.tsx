/**
 * @fileoverview Home route — Dashboard landing page for StadiumIQ.
 * Renders the hero section, emergency alerts, crowd management dashboard,
 * and match schedule for fans arriving at the app.
 *
 * @module routes/index
 */

import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import PageSkeleton from "@/components/PageSkeleton";

const EmergencyAlerts = lazy(() => import("@/components/EmergencyAlerts").then(m => ({ default: m.EmergencyAlerts || m.default })));
const CrowdDashboard = lazy(() => import("@/components/CrowdDashboard").then(m => ({ default: m.CrowdDashboard || m.default })));
const MatchSchedule = lazy(() => import("@/components/MatchSchedule").then(m => ({ default: m.MatchSchedule || m.default })));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StadiumIQ — Smart Stadium Operations" },
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
      <Suspense fallback={<PageSkeleton />}>
        <EmergencyAlerts />
        <section
          aria-label="Hero"
          className="rounded-2xl border border-border bg-gradient-to-br from-navy to-navy/60 p-8 shadow-2xl shadow-black/40"
        >
          <div className="text-center mb-6">
            <span className="bg-[#fef3c7] text-[#92400e] px-4 py-2 rounded-full text-sm font-semibold">
              ⚽ FIFA World Cup 2026 — Official Smart Stadium Assistant
            </span>
          </div>
          <h1 className="mt-2 text-4xl font-black leading-tight sm:text-5xl">
            StadiumIQ
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            GenAI-enabled solution enhancing stadium operations and 
            tournament experience for fans, organizers, volunteers, 
            and venue staff
          </p>
        </section>
        <CrowdDashboard />
        <MatchSchedule />
      </Suspense>
    </div>
  );
}
