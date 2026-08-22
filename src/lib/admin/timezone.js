/**
 * Eastern-time helpers for registration analytics.
 * All "today / yesterday / midnight" boundaries use America/New_York
 * so Amplify (often UTC) and local browsers agree.
 */

export const ADMIN_TIME_ZONE = "America/New_York";

/** Calendar date as YYYY-MM-DD in America/New_York. */
export function zonedDateString(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: ADMIN_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/**
 * UTC epoch ms for 00:00 on `ymd` (YYYY-MM-DD) in America/New_York.
 * Uses a noon-UTC probe to resolve the offset for that calendar day (DST-safe).
 */
export function zonedMidnightUtcMs(ymd) {
  const probe = new Date(`${ymd}T16:00:00.000Z`);
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: ADMIN_TIME_ZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(probe)
      .filter((p) => p.type !== "literal")
      .map((p) => [p.type, p.value]),
  );

  const asUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
  );
  const offset = asUtc - probe.getTime();

  const [y, m, d] = ymd.split("-").map(Number);
  return Date.UTC(y, m - 1, d, 0, 0, 0) - offset;
}

/** Shift a YYYY-MM-DD string by `dayDelta` calendar days (UTC date math). */
export function shiftYmd(ymd, dayDelta) {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + dayDelta)).toISOString().slice(0, 10);
}
