import { toLocalDateString } from "./helperFunction";

import { describe, it, expect } from "vitest";

describe("toLocalDateString", () => {
  it("should format single digit days and month with leading zeros", () => {
    const date = new Date(2026, 0, 5);
    const result = toLocalDateString(date);
    expect(result).toBe("2026-01-05");
  });

  it("format for double digit days and month", () => {
    const date = new Date(2026, 10, 15);
    const result = toLocalDateString(date);
    expect(result).toBe("2026-11-15");
  });
  it("should handle transition of years correctly", () => {
    const date = new Date(2025, 11, 31); // ۳۱ دسامبر ۲۰۲۵
    const result = toLocalDateString(date);
    expect(result).toBe("2025-12-31");
  });
});
