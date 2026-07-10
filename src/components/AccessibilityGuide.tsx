import { memo, useCallback, useEffect, useState } from "react";
import { Accessibility, Ear, Eye, HeartPulse, Volume2 } from "lucide-react";

const ITEMS = [
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

function AccessibilityGuideBase() {
  const [large, setLarge] = useState(false);
  const [contrast, setContrast] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("large-text", large);
    document.documentElement.classList.toggle("high-contrast", contrast);
    return () => {
      document.documentElement.classList.remove("large-text");
      document.documentElement.classList.remove("high-contrast");
    };
  }, [large, contrast]);

  const toggleLarge = useCallback(() => setLarge((v) => !v), []);
  const toggleContrast = useCallback(() => setContrast((v) => !v), []);

  return (
    <section aria-labelledby="a11y-heading" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="a11y-heading" className="text-2xl font-bold text-primary">
            Accessibility Guide
          </h2>
          <p className="text-sm text-muted-foreground">
            A stadium experience designed for everyone.
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
        {ITEMS.map((it) => (
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

export const AccessibilityGuide = memo(AccessibilityGuideBase);
