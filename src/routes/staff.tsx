/**
 * @fileoverview Staff route — Operational Intelligence portal for StadiumIQ.
 * Renders the volunteer and staff coordination portal at `/staff`.
 *
 * @module routes/staff
 */

import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import PageSkeleton from "@/components/PageSkeleton";

const StaffPortal = lazy(() => import("@/components/StaffPortal").then(m => ({ default: m.StaffPortal || m.default })));

export const Route = createFileRoute("/staff")({
  head: () => ({
    meta: [
      { title: "Operational Intelligence — Staff Portal" },
      {
        name: "description",
        content:
          "StadiumIQ Operational Intelligence: staff and volunteer zone management, incident reporting, backup requests, and real-time activity log for FIFA World Cup 2026.",
      },
    ],
  }),
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <StaffPortal />
    </Suspense>
  ),
});
