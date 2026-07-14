/**
 * @fileoverview Root route — App shell for StadiumIQ.
 * Defines the HTML shell, global head metadata, resource hints,
 * top-level navigation, error/not-found components, and the
 * QueryClientProvider + ErrorBoundary wrapping the main content.
 *
 * @module __root
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { initVitals } from "../lib/vitals";
import { Navbar } from "@/components/Navbar";
import { AIAssistant } from "@/components/AIAssistant";
import ErrorBoundary from "@/components/ErrorBoundary";
import { APP_SHORT, APP_NAME } from "@/lib/constants";

/**
 * Renders a friendly 404 page when a route is not found.
 *
 * @returns {JSX.Element} A centred 404 message with a home link
 */
function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Go home
        </a>
      </div>
    </div>
  );
}

/**
 * Renders an error fallback when a route throws during rendering.
 * Reports the error to Lovable telemetry and provides retry / go-home actions.
 *
 * @param {{ error: Error; reset: () => void }} props - Error details and reset callback
 * @returns {JSX.Element} A centred error message with recovery options
 */
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Try again
          </button>
          <a href="/" className="rounded-md border border-input px-4 py-2 text-sm">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${APP_SHORT} — GenAI Smart Stadium & Tournament Operations · FIFA World Cup 2026` },
      {
        name: "description",
        content:
          "StadiumIQ: GenAI-enabled stadium operations for FIFA World Cup 2026. Real-time crowd management, multilingual AI assistance, navigation, transport, accessibility, and operational intelligence for fans, organizers, volunteers, and venue staff.",
      },
      { name: "author", content: APP_NAME },
      { property: "og:title", content: `${APP_SHORT} — FIFA World Cup 2026` },
      {
        property: "og:description",
        content: "Smart Stadium Assistant powered by GenAI for fans, staff, and volunteers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "keywords",
        content:
          "stadium AI, FIFA World Cup 2026, crowd management, multilingual assistance, real-time decision support, tournament operations, operational intelligence, accessibility",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      // Resource hints for performance — DNS resolution and connection handshake happen early
      { rel: "dns-prefetch", href: "https://ai.gateway.lovable.dev" },
      { rel: "preconnect", href: "https://ai.gateway.lovable.dev" },
      { rel: "dns-prefetch", href: "https://generativelanguage.googleapis.com" },
      { rel: "preconnect", href: "https://generativelanguage.googleapis.com" },
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

/**
 * Outermost HTML shell rendered on the server.
 * Wraps the entire application in `<html>` and `<body>` tags.
 *
 * @param {{ children: ReactNode }} props - Shell children (head + body content)
 * @returns {JSX.Element} The `<html>` document shell
 */
function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/**
 * Root application component rendered inside the shell.
 * Provides:
 * - `QueryClientProvider` for TanStack Query
 * - `Navbar` sticky top navigation
 * - `ErrorBoundary` wrapping the main page `<Outlet>`
 * - `AIAssistant` floating chat widget
 * - Initialises Web Vitals monitoring and idle-time preloading
 *
 * @returns {JSX.Element} The full application layout
 */
function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  // Initialise Web Vitals monitoring (LCP, CLS, FID) once on mount
  useEffect(() => {
    initVitals();
  }, []);

  // Schedule non-critical work during browser idle time
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(
        () => {
          console.log(`[${APP_SHORT}] Preloading secondary resources during idle time`);
        },
        { timeout: 2000 },
      );
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <main id="main" role="main" className="mx-auto max-w-7xl px-4 py-6">
        <ErrorBoundary fallbackMessage="This page encountered an error. Please try again.">
          <Outlet />
        </ErrorBoundary>
      </main>
      <footer
        role="contentinfo"
        className="mx-auto max-w-7xl px-4 pb-10 pt-6 text-center text-xs text-muted-foreground"
      >
        {APP_SHORT} · Tournament Operations · GenAI concierge for FIFA World Cup 2026
      </footer>
      <AIAssistant />
    </QueryClientProvider>
  );
}
