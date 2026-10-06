const LEGACY_SALT = "my-fixed-salt";
const HASH_PREFIX = "pbkdf2";
const ITERATIONS = 100_000;

export const toLocalDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/** Calendar day from a YYYY-MM-DD value or an ISO timestamp saved by older builds. */
export const calendarDate = (value: string): string | null => {
  const match = /^(\d{4}-\d{2}-\d{2})/.exec(value);
  if (!match) return null;
  const [year, month, day] = match[1].split("-").map(Number);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return match[1];
};

export const isBeforeToday = (value: string | null | undefined) => {
  if (!value) return false;
  const day = calendarDate(value);
  if (!day) return false;
  return day < toLocalDateString(new Date());
};

export const formatStoredDate = (value: string) => {
  const day = calendarDate(value);
  if (!day) return value;
  const [year, month, date] = day.split("-").map(Number);
  return new Date(year, month - 1, date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const toHex = (bytes: Uint8Array) =>
  [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");

const fromHex = (hex: string) => {
  if (hex.length % 2 !== 0 || /[^0-9a-f]/i.test(hex)) return null;
  const bytes = new Uint8Array(hex.length / 2);
  for (let index = 0; index < bytes.length; index += 1) {
    bytes[index] = Number.parseInt(hex.slice(index * 2, index * 2 + 2), 16);
  }
  return bytes;
};

const timingSafeEqual = (left: string, right: string) => {
  if (left.length !== right.length) return false;
  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) {
    mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return mismatch === 0;
};

const deriveBits = async (password: string, salt: Uint8Array) => {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: salt as BufferSource,
      iterations: ITERATIONS,
    },
    key,
    256,
  );
  return toHex(new Uint8Array(bits));
};

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await deriveBits(password, salt);
  return `${HASH_PREFIX}$${toHex(salt)}$${hash}`;
}

export async function verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  if (stored.startsWith(`${HASH_PREFIX}$`)) {
    const [, saltHex, hashHex] = stored.split("$");
    if (!saltHex || !hashHex) return false;
    const salt = fromHex(saltHex);
    if (!salt) return false;
    const actual = await deriveBits(password, salt);
    return timingSafeEqual(actual, hashHex);
  }

  const legacy = await deriveBits(
    password,
    new TextEncoder().encode(LEGACY_SALT),
  );
  return timingSafeEqual(legacy, stored);
}
