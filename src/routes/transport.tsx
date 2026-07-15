/**
 * @fileoverview Transport route — Transportation Hub for StadiumIQ.
 * Renders the multi-modal transport information page at `/transport`.
 *
 * @module routes/transport
 */

import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import PageSkeleton from "@/components/PageSkeleton";

const TransportHub = lazy(() => import("@/components/TransportHub").then(m => ({ default: m.TransportHub || m.default })));

export const Route = createFileRoute("/transport")({
  head: () => ({
    meta: [
      { title: "Transportation Hub — Route Planning" },
      {
        name: "description",
        content:
          "StadiumIQ Transportation Hub: real-time metro, bus, rideshare, and parking info for your matchday at FIFA World Cup 2026.",
      },
    ],
  }),
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <TransportHub />
    </Suspense>
  ),
});
