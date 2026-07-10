import "@testing-library/jest-dom/vitest";

if (typeof window !== "undefined") {
  window.HTMLElement.prototype.scrollIntoView = function () {};
  window.HTMLElement.prototype.scrollTo = function () {};
  window.scrollTo = function () {} as typeof window.scrollTo;
}
