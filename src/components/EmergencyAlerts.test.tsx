import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EmergencyAlerts } from "./EmergencyAlerts";

describe("EmergencyAlerts", () => {
  it("renders without crashing", () => {
    render(<EmergencyAlerts />);
    expect(screen.getByRole("region", { name: /emergency alerts/i })).toBeInTheDocument();
  });
  it("renders default alert content", () => {
    render(<EmergencyAlerts />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
  it("dismiss button removes the alert", () => {
    const { container } = render(<EmergencyAlerts />);
    fireEvent.click(screen.getByRole("button", { name: /dismiss alert/i }));
    expect(container.querySelector('[role="alert"]')).toBeNull();
  });
  it("report incident triggers callback", () => {
    const onReport = vi.fn();
    render(<EmergencyAlerts onReport={onReport} />);
    fireEvent.click(screen.getByRole("button", { name: /report an incident/i }));
    expect(onReport).toHaveBeenCalled();
  });
});
