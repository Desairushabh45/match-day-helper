/**
 * @fileoverview AccessibilityGuide — Multilingual & Accessibility features for StadiumIQ.
 * Displays accessibility services available at the stadium and provides
 * large-text and high-contrast display mode toggles that apply CSS classes
 * to the document root element.
 *
 * @module AccessibilityGuide
 */

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Accessibility, Ear, Eye, HeartPulse, Volume2 } from "lucide-react";

/** A single accessibility service card configuration */
interface AccessibilityItem {
  /** Lucide icon component for the service */
  icon: React.ElementType;
  /** Short title of the accessibility service */
  title: string;
  /** Descriptive text about the service's location and scope */
  desc: string;
}

/**
 * Static list of accessibility services offered at the stadium.
 * Memoised outside the component so the reference is stable across renders.
 */
const ITEMS: AccessibilityItem[] = [
  {
    icon: Accessibility,
    title: "Wheelchair Routes",
    desc: "Step-free entry via East Gate and elevators to all levels.",
  },
  {
    icon: Ear,
    title: "Hearing Loops",
    desc: "Induction loops at info desks, gates, and VIP lounges.",
  },
  {
    icon: Eye,
    title: "Visual Aids",
    desc: "Braille signage, high-contrast wayfinding, tactile maps at kiosks.",
  },
  {
    icon: Volume2,
    title: "Quiet Zones",
    desc: "Low-stimulation rooms on Level 2, sections 210 and 235.",
  },
  {
    icon: HeartPulse,
    title: "Medical Stations",
    desc: "24/7 first aid at every gate, defibrillators every 60m.",
  },
];

/**
 * Accessibility Guide page component.
 * Renders service cards and provides two document-level display toggles:
 * - **Large text** — adds `large-text` class to `<html>` for 20% font scale
 * - **High contrast** — adds `high-contrast` class to `<html>` for WCAG AAA colours
 *
 * Cleans up CSS classes on unmount to avoid persistent state across navigations.
 *
 * @returns {JSX.Element} The accessibility guide section with service cards
 */
function AccessibilityGuideBase() {
  const [large, setLarge] = useState(false);
  const [contrast, setContrast] = useState(false);

  // Apply / remove document-level CSS class tokens for display modes
  useEffect(() => {
    document.documentElement.classList.toggle("large-text", large);
    document.documentElement.classList.toggle("high-contrast", contrast);
    return () => {
      document.documentElement.classList.remove("large-text");
      document.documentElement.classList.remove("high-contrast");
    };
  }, [large, contrast]);

  /**
   * Toggles the large-text display mode on or off.
   * Stabilised with `useCallback` so the button does not cause re-renders
   * of other components that share the same render scope.
   *
   * @returns {void}
   */
  const toggleLarge = useCallback(() => setLarge((v) => !v), []);

  /**
   * Toggles the high-contrast display mode on or off.
   *
   * @returns {void}
   */
  const toggleContrast = useCallback(() => setContrast((v) => !v), []);

  /**
   * Memoised ITEMS list — reference-stable, avoids accidental re-renders
   * if this component is ever lifted into a context that changes frequently.
   */
  const items = useMemo(() => ITEMS, []);

  return (
    <section aria-labelledby="a11y-heading" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="a11y-heading" className="text-2xl font-bold text-primary">
            Accessibility Guide
          </h2>
          <p className="text-sm text-muted-foreground">
            Multilingual Assistance — A stadium experience designed for everyone.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            aria-pressed={large}
            onClick={toggleLarge}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-accent"
          >
            {large ? "Reset text size" : "Large text"}
          </button>
          <button
            aria-pressed={contrast}
            onClick={toggleContrast}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-accent"
          >
            {contrast ? "Normal contrast" : "High contrast"}
          </button>
        </div>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <li key={it.title} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-lg bg-primary/15 text-primary">
                <it.icon className="size-5" />
              </div>
              <h3 className="font-semibold">{it.title}</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Memoised AccessibilityGuide export.
 * Ensures the component does not re-render unless its route activates.
 */
export const AccessibilityGuide = memo(AccessibilityGuideBase);
