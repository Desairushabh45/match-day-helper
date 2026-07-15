import React from 'react'

const PageSkeleton = () => (
  <div
    className="animate-pulse p-8 space-y-6"
    role="status"
    aria-label="Loading page content"
    aria-live="polite"
  >
    <div className="h-8 bg-muted rounded w-1/3" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-32 bg-muted rounded-xl" />
      ))}
    </div>
    <div className="h-48 bg-muted rounded-xl" />
    <span className="sr-only">Loading StadiumIQ content, please wait...</span>
  </div>
)
export default React.memo(PageSkeleton)
