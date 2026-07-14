import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("@tanstack/react-start", () => ({
  useServerFn: () => vi.fn().mockResolvedValue({ reply: "Test response" }),
}));
vi.mock("@/lib/chat.functions", () => ({
  chatWithStadiumIQ: vi.fn(),
}));

import { AIAssistant } from "./AIAssistant";

describe("AIAssistant", () => {
  it("renders the toggle button", () => {
    render(<AIAssistant />);
    expect(screen.getByRole("button", { name: /open AI assistant/i })).toBeInTheDocument();
  });
  it("opens dialog on click", () => {
    render(<AIAssistant />);
    fireEvent.click(screen.getByRole("button", { name: /open AI assistant/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
  it("shows textarea when open", () => {
    render(<AIAssistant />);
    fireEvent.click(screen.getByRole("button", { name: /open AI assistant/i }));
    expect(screen.getByLabelText(/Message StadiumIQ/i)).toBeInTheDocument();
  });
  it("textarea accepts input", () => {
    render(<AIAssistant />);
    fireEvent.click(screen.getByRole("button", { name: /open AI assistant/i }));
    const ta = screen.getByLabelText(/Message StadiumIQ/i) as HTMLTextAreaElement;
    fireEvent.change(ta, { target: { value: "Where is Gate A?" } });
    expect(ta.value).toBe("Where is Gate A?");
  });
  it("closes on second click", () => {
    render(<AIAssistant />);
    const btn = screen.getByRole("button", { name: /open AI assistant/i });
    fireEvent.click(btn);
    fireEvent.click(screen.getByRole("button", { name: /close AI assistant/i }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });
  it("shows language selector", () => {
    render(<AIAssistant />);
    fireEvent.click(screen.getByRole("button", { name: /open AI assistant/i }));
    expect(screen.getByLabelText(/language/i)).toBeInTheDocument();
  });
});
