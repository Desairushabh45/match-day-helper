/**
 * @fileoverview Schedule route — Match Schedule page for StadiumIQ.
 * Renders the FIFA World Cup 2026 match schedule with filters at `/schedule`.
 *
 * @module routes/schedule
 */

import { createFileRoute } from "@tanstack/react-router";
import { MatchSchedule } from "@/components/MatchSchedule";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Match Schedule — StadiumIQ · FIFA World Cup 2026" },
      {
        name: "description",
        content:
          "StadiumIQ match schedule: all FIFA World Cup 2026 fixtures with live countdown timers, group and venue filters, and real-time status updates.",
      },
    ],
  }),
  component: () => <MatchSchedule />,
});
