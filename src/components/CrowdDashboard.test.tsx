import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CrowdDashboard } from "./CrowdDashboard";

describe("CrowdDashboard", () => {
  it("renders without crashing", () => {
    render(<CrowdDashboard />);
    expect(screen.getByRole("heading", { name: /Crowd Management System/i })).toBeInTheDocument();
  });
  it("has a refresh button", () => {
    render(<CrowdDashboard />);
    expect(screen.getByRole("button", { name: /refresh/i })).toBeInTheDocument();
  });
  it("refresh click keeps dashboard rendered", () => {
    render(<CrowdDashboard />);
    fireEvent.click(screen.getByRole("button", { name: /refresh/i }));
    expect(screen.getByRole("heading", { name: /Crowd Management System/i })).toBeInTheDocument();
  });
  it("shows an AI recommendation", () => {
    render(<CrowdDashboard />);
    expect(screen.getByText(/AI Recommendation/i)).toBeInTheDocument();
  });
  it("renders all zones", () => {
    render(<CrowdDashboard />);
    expect(screen.getAllByText(/Gate|Court|Section/).length).toBeGreaterThan(2);
  });
});
