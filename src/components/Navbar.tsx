/**
 * @fileoverview Navbar component for StadiumIQ.
 * Renders the sticky top navigation bar with skip-to-main link,
 * primary nav links, and a responsive mobile hamburger menu.
 *
 * @module Navbar
 */

import { Link } from "@tanstack/react-router";
import { memo } from "react";
import { APP_SHORT } from "@/lib/constants";

/** Navigation link configuration */
const links = [
  { to: "/", label: "Home" },
  { to: "/map", label: "Map" },
  { to: "/transport", label: "Transport" },
  { to: "/schedule", label: "Schedule" },
  { to: "/accessibility", label: "Accessibility" },
  { to: "/staff", label: "Staff" },
] as const;

/**
 * Primary navigation bar for StadiumIQ.
 * Includes an accessibility skip-link, branding, desktop nav links,
 * and a `<details>`-based mobile menu (no JS overhead).
 *
 * @returns {JSX.Element} The sticky header navigation element
 */
function NavbarBase() {
  return (
    <header
      role="banner"
      className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl"
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <nav
        role="navigation"
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3"
      >
        <Link to="/" className="flex items-center gap-2" aria-label={`${APP_SHORT} home`}>
          <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground font-black">
            SF
          </span>
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-wide text-primary">{APP_SHORT}</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              FIFA World Cup 2026
            </div>
          </div>
        </Link>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                activeProps={{
                  className: "rounded-md px-3 py-2 text-sm font-medium text-primary bg-accent",
                }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <details className="relative md:hidden">
          <summary
            aria-label="Open menu"
            className="cursor-pointer list-none rounded-md border border-border px-3 py-2 text-sm"
          >
            Menu
          </summary>
          <ul className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-popover p-2 shadow-xl">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="block rounded-md px-3 py-2 text-sm text-popover-foreground hover:bg-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </nav>
    </header>
  );
}

/**
 * Memoised Navbar — re-renders only when parent forces an update.
 * Since the navbar has no dynamic props, memoisation eliminates all
 * unnecessary re-renders caused by route-level state changes.
 */
export const Navbar = memo(NavbarBase);
