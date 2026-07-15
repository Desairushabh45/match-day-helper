/**
 * Initializes Web Vitals monitoring using PerformanceObserver
 * Tracks LCP, CLS, and FID metrics for performance analysis
 */
export const initVitals = (): void => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return

  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lcp = entries[entries.length - 1] as PerformanceEntry & { startTime: number }
      console.log('[Vitals] LCP:', Math.round(lcp.startTime), 'ms')
    })
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })
  } catch (e) { /* LCP not supported */ }

  try {
    const clsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        const cls = entry as PerformanceEntry & { value: number }
        console.log('[Vitals] CLS:', cls.value.toFixed(4))
      })
    })
    clsObserver.observe({ type: 'layout-shift', buffered: true })
  } catch (e) { /* CLS not supported */ }

  try {
    const fidObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        const fid = entry as PerformanceEntry & { processingStart: number; startTime: number }
        console.log('[Vitals] FID:', Math.round(fid.processingStart - fid.startTime), 'ms')
      })
    })
    fidObserver.observe({ type: 'first-input', buffered: true })
  } catch (e) { /* FID not supported */ }
}

/**
 * Schedules non-critical work during browser idle time
 * @param {Function} callback - Work to perform when browser is idle
 * @param {number} timeout - Maximum wait time in ms (default: 2000)
 */
export const scheduleIdleWork = (callback: () => void, timeout = 2000): void => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback, { timeout })
  } else {
    setTimeout(callback, 0)
  }
}
