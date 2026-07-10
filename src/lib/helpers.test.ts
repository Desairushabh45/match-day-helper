import { describe, it, expect } from "vitest";
import {
  sanitizeInput,
  getCrowdColor,
  getCrowdBar,
  formatWaitTime,
  generateCrowdData,
} from "./helpers";
import { ZONES } from "./constants";

describe("sanitizeInput", () => {
  it("removes HTML tags", () => {
    expect(sanitizeInput("<script>alert(1)</script>hi")).not.toContain("<script>");
  });
  it("caps length at 300", () => {
    expect(sanitizeInput("a".repeat(400)).length).toBeLessThanOrEqual(300);
  });
  it("handles empty string", () => {
    expect(sanitizeInput("")).toBe("");
  });
  it("passes plain text through", () => {
    expect(sanitizeInput("Where is Gate A?")).toBe("Where is Gate A?");
  });
});

describe("getCrowdColor", () => {
  it("returns danger tokens for HIGH", () => {
    expect(getCrowdColor("HIGH")).toContain("danger");
  });
  it("returns warning tokens for MEDIUM", () => {
    expect(getCrowdColor("MEDIUM")).toContain("warning");
  });
  it("returns success tokens for LOW", () => {
    expect(getCrowdColor("LOW")).toContain("success");
  });
});

describe("getCrowdBar", () => {
  it("returns fill class for each level", () => {
    expect(getCrowdBar("HIGH")).toBe("bg-danger");
    expect(getCrowdBar("MEDIUM")).toBe("bg-warning");
    expect(getCrowdBar("LOW")).toBe("bg-success");
  });
});

describe("formatWaitTime", () => {
  it("says No wait for 0", () => {
    expect(formatWaitTime(0)).toBe("No wait");
  });
  it("singular for 1", () => {
    expect(formatWaitTime(1)).toBe("1 min wait");
  });
  it("plural for many", () => {
    expect(formatWaitTime(15)).toBe("15 min wait");
  });
});

describe("generateCrowdData", () => {
  it("returns data for every zone", () => {
    const data = generateCrowdData(ZONES, 1);
    expect(data).toHaveLength(ZONES.length);
  });
  it("produces valid capacity and levels", () => {
    const data = generateCrowdData(ZONES, 2);
    for (const z of data) {
      expect(z.capacity).toBeGreaterThanOrEqual(0);
      expect(z.capacity).toBeLessThanOrEqual(100);
      expect(["LOW", "MEDIUM", "HIGH"]).toContain(z.level);
      expect(z.wait).toBeGreaterThanOrEqual(0);
    }
  });
  it("is deterministic for the same tick", () => {
    const a = generateCrowdData(ZONES, 5);
    const b = generateCrowdData(ZONES, 5);
    expect(a).toEqual(b);
  });
});
