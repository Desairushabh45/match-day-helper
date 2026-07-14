/**
 * @fileoverview Staff route — Operational Intelligence portal for StadiumIQ.
 * Renders the volunteer and staff coordination portal at `/staff`.
 *
 * @module routes/staff
 */

import { createFileRoute } from "@tanstack/react-router";
import { StaffPortal } from "@/components/StaffPortal";

export const Route = createFileRoute("/staff")({
  head: () => ({
    meta: [
      { title: "Operational Intelligence — StadiumIQ Staff Portal · FIFA 2026" },
      {
        name: "description",
        content:
          "StadiumIQ Operational Intelligence: staff and volunteer zone management, incident reporting, backup requests, and real-time activity log for FIFA World Cup 2026.",
      },
    ],
  }),
  component: () => <StaffPortal />,
});
