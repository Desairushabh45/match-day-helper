/**
 * @fileoverview Transport route — Transportation Hub for StadiumIQ.
 * Renders the multi-modal transport information page at `/transport`.
 *
 * @module routes/transport
 */

import { createFileRoute } from "@tanstack/react-router";
import { TransportHub } from "@/components/TransportHub";

export const Route = createFileRoute("/transport")({
  head: () => ({
    meta: [
      { title: "Transportation Hub — StadiumIQ · FIFA World Cup 2026" },
      {
        name: "description",
        content:
          "StadiumIQ Transportation Hub: real-time metro, bus, rideshare, and parking info for your matchday at FIFA World Cup 2026.",
      },
    ],
  }),
  component: () => <TransportHub />,
});
