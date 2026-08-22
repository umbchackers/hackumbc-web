/**
 * Client-side chart windowing for the admin registrations dashboard.
 * Filters snapshot history into All / Today / 7d / day / week views.
 */

import {
  ADMIN_TIME_ZONE,
  shiftYmd,
  zonedDateString,
  zonedMidnightUtcMs,
} from "./timezone";

/** Ignore a pre-range baseline older than this (avoids anchoring Today on a stale 0). */
const FRESH_BASELINE_MS = 3 * 60 * 60 * 1000;

export const RANGE_PRESETS = [
  { id: "all", label: "All time" },
  { id: "today", label: "Today" },
  { id: "7d", label: "Last 7 days" },
  { id: "day", label: "Specific day" },
  { id: "week", label: "Week ending" },
];

export function formatTime(iso) {
  return new Date(iso).toLocaleString(undefined, {
    timeZone: ADMIN_TIME_ZONE,
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatShort(iso, rangeId) {
  const d = new Date(iso);
  if (rangeId === "today" || rangeId === "day") {
    return d.toLocaleTimeString(undefined, {
      timeZone: ADMIN_TIME_ZONE,
      hour: "numeric",
      minute: "2-digit",
    });
  }
  return d.toLocaleString(undefined, {
    timeZone: ADMIN_TIME_ZONE,
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function toDateInputValue(date = new Date()) {
  return zonedDateString(date);
}

/** Inclusive start / end (UTC ms) for a chart preset. `start: null` = all time. */
export function getRangeBounds(rangeId, selectedDate) {
  const now = Date.now();

  if (rangeId === "all") {
    return { start: null, end: null };
  }

  if (rangeId === "today") {
    const ymd = zonedDateString(new Date(now));
    return { start: zonedMidnightUtcMs(ymd), end: now };
  }

  if (rangeId === "7d") {
    return { start: now - 7 * 24 * 60 * 60 * 1000, end: now };
  }

  if (rangeId === "day") {
    const start = zonedMidnightUtcMs(selectedDate);
    const next = shiftYmd(selectedDate, 1);
    return { start, end: zonedMidnightUtcMs(next) - 1 };
  }

  // Week ending on selectedDate (7 Eastern calendar days inclusive)
  const end = zonedMidnightUtcMs(shiftYmd(selectedDate, 1)) - 1;
  const startYmd = shiftYmd(selectedDate, -6);
  return { start: zonedMidnightUtcMs(startYmd), end };
}

function nearestAtOrBefore(history, targetMs) {
  let best = null;
  for (const p of history) {
    const t = new Date(p.timestamp).getTime();
    if (t <= targetMs) best = p;
    else break;
  }
  return best;
}

/**
 * Slice snapshot history for the chart.
 * If a fresh reading exists near range start, carry that count forward to the
 * boundary; otherwise start at the first in-range point (no fake zero).
 */
export function sliceHistory(history, rangeId, selectedDate) {
  if (!history.length) {
    return { points: [], newInRange: null, spanLabel: "No data yet" };
  }

  const { start, end } = getRangeBounds(rangeId, selectedDate);

  if (start === null) {
    const first = history[0];
    const last = history[history.length - 1];
    return {
      points: history,
      newInRange: last.totalRegistrations - first.totalRegistrations,
      spanLabel: `${formatTime(first.timestamp)} → ${formatTime(last.timestamp)}`,
    };
  }

  const inRange = history.filter((p) => {
    const t = new Date(p.timestamp).getTime();
    return t >= start && t <= end;
  });

  const baseline = nearestAtOrBefore(history, start);
  const baselineAge = baseline
    ? start - new Date(baseline.timestamp).getTime()
    : Infinity;
  const baselineFresh = baseline && baselineAge <= FRESH_BASELINE_MS;

  const points = [];

  if (baselineFresh) {
    points.push({
      timestamp: new Date(start).toISOString(),
      totalRegistrations: baseline.totalRegistrations,
    });
  }

  for (const p of inRange) {
    const t = new Date(p.timestamp).getTime();
    if (
      points.length &&
      Math.abs(t - new Date(points[0].timestamp).getTime()) < 1000 &&
      p.totalRegistrations === points[0].totalRegistrations
    ) {
      continue;
    }
    points.push(p);
  }

  if (!points.length && inRange.length) {
    points.push(...inRange);
  }

  if (!points.length) {
    return {
      points: [],
      newInRange: null,
      spanLabel: "No snapshots in this range",
    };
  }

  const first = points[0];
  const last = points[points.length - 1];
  const startLabel = new Date(start).toLocaleString(undefined, {
    timeZone: ADMIN_TIME_ZONE,
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  const endLabel = new Date(Math.min(end, Date.now())).toLocaleString(
    undefined,
    {
      timeZone: ADMIN_TIME_ZONE,
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    },
  );

  return {
    points,
    newInRange: last.totalRegistrations - first.totalRegistrations,
    spanLabel: `${startLabel} → ${endLabel}`,
  };
}
