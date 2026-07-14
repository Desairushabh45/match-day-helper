/**
 * @fileoverview Map route — Interactive Stadium Map for StadiumIQ.
 * Renders the interactive SVG stadium navigation map at `/map`.
 *
 * @module routes/map
 */

import { createFileRoute } from "@tanstack/react-router";
import { StadiumMap } from "@/components/StadiumMap";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Interactive Stadium Map — StadiumIQ · FIFA World Cup 2026" },
      {
        name: "description",
        content:
          "StadiumIQ interactive map: live crowd levels, facilities, accessible routes, and directions for all stadium zones at FIFA World Cup 2026.",
      },
    ],
  }),
  component: () => <StadiumMap />,
});
