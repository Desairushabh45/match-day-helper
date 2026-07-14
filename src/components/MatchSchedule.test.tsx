import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MatchSchedule } from "./MatchSchedule";
import { MATCHES } from "@/lib/constants";

describe("MatchSchedule", () => {
  it("renders heading", () => {
    render(<MatchSchedule />);
    expect(screen.getByRole("heading", { name: /Match Schedule/i })).toBeInTheDocument();
  });
  it("renders all matches", () => {
    render(<MatchSchedule />);
    for (const m of MATCHES) {
      expect(screen.getAllByText(m.home).length).toBeGreaterThan(0);
    }
  });
  it("has group and venue filters", () => {
    render(<MatchSchedule />);
    expect(screen.getByLabelText(/filter by group/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/filter by venue/i)).toBeInTheDocument();
  });
});
