import { describe, expect, it } from "vitest";
import {
  calendarDate,
  formatStoredDate,
  hashPassword,
  isBeforeToday,
  toLocalDateString,
  verifyPassword,
} from "./helperFunction";

describe("toLocalDateString", () => {
  it("should format single digit days and month with leading zeros", () => {
    const date = new Date(2026, 0, 5);
    expect(toLocalDateString(date)).toBe("2026-01-05");
  });

  it("format for double digit days and month", () => {
    const date = new Date(2026, 10, 15);
    expect(toLocalDateString(date)).toBe("2026-11-15");
  });

  it("should handle transition of years correctly", () => {
    const date = new Date(2025, 11, 31);
    expect(toLocalDateString(date)).toBe("2025-12-31");
  });
});

describe("calendar dates", () => {
  it("keeps the calendar day from an ISO timestamp", () => {
    expect(calendarDate("2026-10-10T00:00:00.000Z")).toBe("2026-10-10");
    expect(formatStoredDate("2026-10-10T00:00:00.000Z")).toBe("Oct 10, 2026");
  });

  it("rejects impossible calendar days", () => {
    expect(calendarDate("2026-02-31")).toBeNull();
  });

  it("compares due dates by calendar day", () => {
    expect(isBeforeToday("2000-01-01")).toBe(true);
    expect(isBeforeToday("2999-01-01")).toBe(false);
    expect(isBeforeToday(toLocalDateString(new Date()))).toBe(false);
  });
});

describe("password hashing", () => {
  it("verifies a password against a per-user salt", async () => {
    const stored = await hashPassword("secret1");
    expect(stored.startsWith("pbkdf2$")).toBe(true);
    expect(await verifyPassword("secret1", stored)).toBe(true);
    expect(await verifyPassword("secret2", stored)).toBe(false);
  });

  it("uses a different salt for the same password", async () => {
    const first = await hashPassword("secret1");
    const second = await hashPassword("secret1");
    expect(first).not.toBe(second);
    expect(await verifyPassword("secret1", first)).toBe(true);
    expect(await verifyPassword("secret1", second)).toBe(true);
  });

  it("still accepts hashes created with the previous fixed salt", async () => {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode("secret1"),
      "PBKDF2",
      false,
      ["deriveBits"],
    );
    const bits = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        hash: "SHA-256",
        salt: new TextEncoder().encode("my-fixed-salt"),
        iterations: 100_000,
      },
      key,
      256,
    );
    const legacy = [...new Uint8Array(bits)]
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    expect(await verifyPassword("secret1", legacy)).toBe(true);
    expect(await verifyPassword("other", legacy)).toBe(false);
  });
});
