/**
 * @fileoverview Accessibility route — Multilingual Assistance & Accessibility Guide for StadiumIQ.
 * Renders the accessibility services page at `/accessibility`.
 *
 * @module routes/accessibility
 */

import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import PageSkeleton from "@/components/PageSkeleton";

const AccessibilityGuide = lazy(() => import("@/components/AccessibilityGuide").then(m => ({ default: m.AccessibilityGuide || m.default })));

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility Guide — Inclusive Stadium Experience" },
      {
        name: "description",
        content:
          "StadiumIQ accessibility guide: wheelchair routes, hearing loops, quiet zones, high-contrast mode, large text, and multilingual assistance for FIFA World Cup 2026.",
      },
    ],
  }),
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <AccessibilityGuide />
    </Suspense>
  ),
});
