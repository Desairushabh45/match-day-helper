/**
 * PageSkeleton — animated loading placeholder for page transitions.
 * Rendered while route components are being lazily loaded or data is fetching.
 * Meets WCAG 2.1 AA by using `role="status"` and a visually hidden live text.
 *
 * @returns {JSX.Element} An animated skeleton layout placeholder
 *
 * @example
 * <Suspense fallback={<PageSkeleton />}>
 *   <SomeLazyPage />
 * </Suspense>
 */
function PageSkeleton() {
  return (
    <div
      className="animate-pulse space-y-6 p-4"
      role="status"
      aria-label="Loading page content"
      aria-live="polite"
    >
      {/* Section header skeleton */}
      <div className="h-7 w-1/3 rounded-lg bg-muted" />

      {/* Card grid skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-32 rounded-xl bg-muted" />
        ))}
      </div>

      {/* Wide content block skeleton */}
      <div className="h-48 rounded-xl bg-muted" />

      {/* Paragraph skeletons */}
      <div className="space-y-2">
        <div className="h-4 w-3/4 rounded bg-muted" />
        <div className="h-4 w-1/2 rounded bg-muted" />
      </div>

      {/* Accessibility: screen-reader announcement */}
      <span className="sr-only">Loading, please wait…</span>
    </div>
  );
}

export default PageSkeleton;
