/**
 * @fileoverview Accessibility route — Multilingual Assistance & Accessibility Guide for StadiumIQ.
 * Renders the accessibility services page at `/accessibility`.
 *
 * @module routes/accessibility
 */

import { createFileRoute } from "@tanstack/react-router";
import { AccessibilityGuide } from "@/components/AccessibilityGuide";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Multilingual Assistance & Accessibility — StadiumIQ · FIFA 2026" },
      {
        name: "description",
        content:
          "StadiumIQ accessibility guide: wheelchair routes, hearing loops, quiet zones, high-contrast mode, large text, and multilingual assistance for FIFA World Cup 2026.",
      },
    ],
  }),
  component: () => <AccessibilityGuide />,
});
