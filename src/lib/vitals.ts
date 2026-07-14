/**
 * Web Vitals monitoring utilities for StadiumIQ.
 * Observes Core Web Vitals (LCP, CLS, FID) using the PerformanceObserver API
 * and logs them to the console for performance analysis.
 *
 * @module vitals
 */

/**
 * Initializes Web Vitals monitoring via PerformanceObserver.
 * Tracks Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS).
 * Silently no-ops in environments without PerformanceObserver support.
 *
 * @returns {void}
 *
 * @example
 * // Call once at app startup
 * initVitals();
 */
export function initVitals(): void {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
    return;
  }

  // Track Largest Contentful Paint (LCP)
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lcp = entries[entries.length - 1];
      if (lcp) {
        console.log(`[StadiumIQ Vitals] LCP: ${Math.round(lcp.startTime)}ms`);
      }
    });
    lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
  } catch {
    // Browser may not support this entry type
  }

  // Track Cumulative Layout Shift (CLS)
  try {
    const clsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        // LayoutShift entries have a `value` property
        const shift = entry as PerformanceEntry & { value?: number };
        if (shift.value !== undefined) {
          console.log(`[StadiumIQ Vitals] CLS entry: ${shift.value.toFixed(4)}`);
        }
      });
    });
    clsObserver.observe({ type: "layout-shift", buffered: true });
  } catch {
    // Browser may not support this entry type
  }

  // Track First Input Delay (FID)
  try {
    const fidObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        const fid = entry as PerformanceEntry & { processingStart?: number };
        if (fid.processingStart !== undefined) {
          const delay = fid.processingStart - entry.startTime;
          console.log(`[StadiumIQ Vitals] FID: ${Math.round(delay)}ms`);
        }
      });
    });
    fidObserver.observe({ type: "first-input", buffered: true });
  } catch {
    // Browser may not support this entry type
  }
}
