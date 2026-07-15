/**
 * @fileoverview Map route — Interactive Stadium Map for StadiumIQ.
 * Renders the interactive SVG stadium navigation map at `/map`.
 *
 * @module routes/map
 */

import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import PageSkeleton from "@/components/PageSkeleton";

const StadiumMap = lazy(() => import("@/components/StadiumMap").then(m => ({ default: m.StadiumMap || m.default })));

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Stadium Navigation & Zone Map" },
      {
        name: "description",
        content:
          "StadiumIQ interactive map: live crowd levels, facilities, accessible routes, and directions for all stadium zones at FIFA World Cup 2026.",
      },
    ],
  }),
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <StadiumMap />
    </Suspense>
  ),
});
