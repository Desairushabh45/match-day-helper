import "@testing-library/jest-dom/vitest";

if (typeof window !== "undefined") {
  window.HTMLElement.prototype.scrollIntoView = function () {};
  window.HTMLElement.prototype.scrollTo = function () {};
  // @ts-expect-error test stub
  window.scrollTo = function () {};
}
