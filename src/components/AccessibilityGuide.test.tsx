import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AccessibilityGuide } from "./AccessibilityGuide";

describe("AccessibilityGuide", () => {
  it("renders heading", () => {
    render(<AccessibilityGuide />);
    expect(screen.getByRole("heading", { name: /Accessibility Guide/i })).toBeInTheDocument();
  });
  it("shows the feature items", () => {
    render(<AccessibilityGuide />);
    expect(screen.getByText(/Wheelchair Routes/i)).toBeInTheDocument();
    expect(screen.getByText(/Hearing Loops/i)).toBeInTheDocument();
  });
  it("large text toggle updates aria-pressed", () => {
    render(<AccessibilityGuide />);
    const btn = screen.getByRole("button", { name: /Large text/i });
    fireEvent.click(btn);
    expect(document.documentElement.classList.contains("large-text")).toBe(true);
  });
  it("high contrast toggle updates class", () => {
    render(<AccessibilityGuide />);
    const btn = screen.getByRole("button", { name: /High contrast/i });
    fireEvent.click(btn);
    expect(document.documentElement.classList.contains("high-contrast")).toBe(true);
  });
});
