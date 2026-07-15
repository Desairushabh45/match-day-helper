/**
 * @fileoverview StadiumMap — Interactive SVG stadium map for StadiumIQ.
 * Renders a clickable SVG layout of the stadium with live crowd-density
 * colour coding per zone and a sidebar showing zone details.
 *
 * @module StadiumMap
 */

import { memo, useCallback, useMemo, useState } from "react";
import { ZONES } from "@/lib/constants";
import { generateCrowdData, getCrowdBar } from "@/lib/helpers";

/** Detailed info for a single stadium zone shown in the sidebar */
interface ZoneInfo {
  /** List of facility names available in this zone */
  facilities: string[];
  /** Directional text to help users navigate to the zone */
  directions: string;
}

/**
 * Static zone metadata — facilities and directional guidance per zone.
 * Keyed by zone name (matching the ZONES constant values).
 */
const ZONE_INFO: Record<string, ZoneInfo> = {
  "North Gate": {
    facilities: ["Toilets", "First Aid", "Info Desk"],
    directions: "Main entry, near metro exit A",
  },
  "South Gate": {
    facilities: ["Toilets", "Parking", "Taxi Stand"],
    directions: "Bus loop and parking lot P2",
  },
  "East Gate": {
    facilities: ["Family Zone", "First Aid"],
    directions: "Accessible ramps, wheelchair route",
  },
  "West Gate": { facilities: ["Toilets", "Exit"], directions: "Fastest exit to rideshare pickup" },
  "Food Court": {
    facilities: ["30+ Vendors", "Halal", "Vegan"],
    directions: "Concourse level 2, center",
  },
  "VIP Section": {
    facilities: ["Lounge", "Concierge"],
    directions: "Level 3 with dedicated elevator",
  },
};

/** SVG position and size for a zone rectangle */
interface Pos {
  /** X coordinate in the SVG viewBox */
  x: number;
  /** Y coordinate in the SVG viewBox */
  y: number;
  /** Width of the zone rectangle */
  w: number;
  /** Height of the zone rectangle */
  h: number;
  /** Display label matching a ZONES value */
  label: string;
}

/**
 * Zone rectangle positions within the 500×400 SVG viewBox.
 * Arranged to approximate a real stadium layout.
 */
const LAYOUT: Pos[] = [
  { x: 175, y: 20, w: 150, h: 40, label: "North Gate" },
  { x: 175, y: 340, w: 150, h: 40, label: "South Gate" },
  { x: 400, y: 170, w: 90, h: 60, label: "East Gate" },
  { x: 10, y: 170, w: 90, h: 60, label: "West Gate" },
  { x: 130, y: 130, w: 100, h: 55, label: "Food Court" },
  { x: 270, y: 130, w: 100, h: 55, label: "VIP Section" },
];

/** Props for the Legend helper component */
interface LegendProps {
  /** Tailwind background-colour class string */
  color: string;
  /** Display label for the legend item */
  label: string;
}

/**
 * Colour legend item for the stadium map.
 *
 * @param {LegendProps} props - Component props
 * @returns {JSX.Element} A coloured swatch with a text label
 */
function Legend({ color, label }: LegendProps) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`inline-block size-3 rounded ${color}`} aria-hidden />
      {label}
    </span>
  );
}

/**
 * Interactive stadium map component.
 * Renders an SVG bird's-eye view of the stadium with clickable zone rectangles
 * colour-coded by crowd level. The selected zone's details appear in the sidebar.
 *
 * Uses `useMemo` to avoid regenerating crowd data on every render and
 * `useCallback` to stabilise the zone selection handler.
 *
 * @returns {JSX.Element} The two-column map + sidebar section
 */
function StadiumMapBase() {
  const [selected, setSelected] = useState<string>("North Gate");

  /**
   * Crowd data snapshot for the initial tick.
   * Memoised with no dependencies — changes only if the component re-mounts.
   */
  const data = useMemo(() => generateCrowdData(ZONES, 1), []);

  /**
   * Crowd data indexed by zone name for O(1) lookup during SVG rendering.
   */
  const byZone = useMemo(() => Object.fromEntries(data.map((d) => [d.name, d])), [data]);

  /**
   * Updates the selected zone when the user clicks or activates a zone via keyboard.
   *
   * @param {string} zoneName - Name of the zone to select
   * @returns {void}
   */
  const handleSelectZone = useCallback((zoneName: string) => {
    setSelected(zoneName);
  }, []);

  const info = ZONE_INFO[selected];
  const cur = byZone[selected];

  return (
    <section aria-labelledby="map-heading" className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
      <div className="rounded-xl border border-border bg-card p-4">
        <h2 id="map-heading" className="mb-2 text-xl font-bold text-primary">
          Interactive Stadium Map
        </h2>
        <svg
          viewBox="0 0 500 400"
          className="w-full"
          role="img"
          aria-label="Stadium layout with clickable zones"
        >
          <ellipse
            cx="250"
            cy="200"
            rx="180"
            ry="130"
            fill="oklch(0.28 0.05 260)"
            stroke="var(--gold)"
            strokeWidth="2"
          />
          <rect
            x="180"
            y="150"
            width="140"
            height="100"
            rx="6"
            fill="oklch(0.42 0.14 145)"
            opacity="0.6"
          />
          <text
            x="250"
            y="205"
            textAnchor="middle"
            fontSize="14"
            fill="var(--gold)"
            fontWeight="bold"
          >
            PITCH
          </text>
          {LAYOUT.map((p) => {
            const zd = byZone[p.label];
            const isSelected = selected === p.label;
            return (
              <g
                key={p.label}
                className="cursor-pointer"
                onClick={() => handleSelectZone(p.label)}
                tabIndex={0}
                role="button"
                aria-label={`${p.label}, ${zd?.level} crowd`}
                aria-pressed={isSelected}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSelectZone(p.label);
                }}
              >
                <rect
                  x={p.x}
                  y={p.y}
                  width={p.w}
                  height={p.h}
                  rx="8"
                  className={getCrowdBar(zd.level)}
                  fillOpacity={isSelected ? 0.95 : 0.75}
                  stroke={isSelected ? "var(--gold)" : "transparent"}
                  strokeWidth="3"
                />
                <text
                  x={p.x + p.w / 2}
                  y={p.y + p.h / 2 + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fill="white"
                  fontWeight="600"
                  pointerEvents="none"
                >
                  {p.label}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
          <Legend color="bg-success" label="Low" />
          <Legend color="bg-warning" label="Medium" />
          <Legend color="bg-danger" label="High" />
        </div>
      </div>

      <aside className="rounded-xl border border-border bg-card p-4" aria-live="polite">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Selected zone</div>
        <h3 className="mt-1 text-2xl font-bold text-primary">{selected}</h3>
        <div className="mt-2 text-sm text-muted-foreground">{info?.directions}</div>
        <div className="mt-4 rounded-lg bg-accent p-3 text-sm">
          <div className="flex justify-between">
            <span>Capacity</span>
            <span className="font-semibold">{cur?.capacity}%</span>
          </div>
          <div className="flex justify-between">
            <span>Wait</span>
            <span className="font-semibold">{cur?.waitTime} min</span>
          </div>
          <div className="flex justify-between">
            <span>Crowd</span>
            <span className="font-semibold">{cur?.level}</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Facilities</div>
          <ul className="mt-2 flex flex-wrap gap-2">
            {info?.facilities.map((f) => (
              <li
                key={f}
                className="rounded-full border border-border bg-background px-2.5 py-1 text-xs"
              >
                {f}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </section>
  );
}

/**
 * Memoised StadiumMap export.
 * Crowd data is generated once on mount; memoisation avoids re-renders
 * caused by parent navigation state changes.
 */
export const StadiumMap = memo(StadiumMapBase);
