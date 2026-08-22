/**
 * Dashboard headline stats derived from RegistrationMetrics snapshots.
 * Needs a snapshot near Eastern midnight for accurate today/yesterday splits.
 */

import {
  ADMIN_TIME_ZONE,
  shiftYmd,
  zonedDateString,
  zonedMidnightUtcMs,
} from "./timezone";

/**
 * @param {{ timestamp: string, totalRegistrations: number }[]} snapshots
 *   Sorted ascending by timestamp.
 * @param {number} liveTotal Current registration table count.
 */
export function computeStats(snapshots, liveTotal) {
  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;

  const todayYmd = zonedDateString(new Date(now));
  const yesterdayYmd = shiftYmd(todayYmd, -1);
  const dayStart = zonedMidnightUtcMs(todayYmd);
  const yesterdayStart = zonedMidnightUtcMs(yesterdayYmd);

  const nearestAtOrBefore = (targetMs) => {
    let best = null;
    for (const s of snapshots) {
      const t = new Date(s.timestamp).getTime();
      if (t <= targetMs) best = s;
      else break;
    }
    return best;
  };

  const firstInWindow = (startMs, endMs) => {
    for (const s of snapshots) {
      const t = new Date(s.timestamp).getTime();
      if (t >= startMs && t < endMs) return s;
    }
    return null;
  };

  const hourBaseline = nearestAtOrBefore(oneHourAgo);
  // Count as of Eastern midnight today (= end of yesterday)
  const endOfYesterday = nearestAtOrBefore(dayStart);
  const startOfYesterday =
    nearestAtOrBefore(yesterdayStart) ||
    firstInWindow(yesterdayStart, dayStart);

  const snapshotsOnYesterday = snapshots.filter((s) => {
    const t = new Date(s.timestamp).getTime();
    return t >= yesterdayStart && t < dayStart;
  });

  const lastHour = hourBaseline
    ? Math.max(0, liveTotal - hourBaseline.totalRegistrations)
    : null;

  let today = null;
  if (endOfYesterday) {
    today = Math.max(0, liveTotal - endOfYesterday.totalRegistrations);
  }

  let yesterday = null;
  if (startOfYesterday && endOfYesterday) {
    yesterday = Math.max(
      0,
      endOfYesterday.totalRegistrations - startOfYesterday.totalRegistrations,
    );
  }

  // Percent change: today's signups vs yesterday's signups
  let growth = null;
  if (today !== null && yesterday !== null) {
    if (yesterday === 0) {
      growth = today > 0 ? 100 : 0;
    } else {
      growth = Math.round(((today - yesterday) / yesterday) * 100);
    }
  }

  // Warn when yesterday only has an opening point (e.g. 0 at 2pm) and no
  // midnight anchor — then "today" absorbs all growth since open.
  let warning = null;
  const onlyOpenYesterday =
    snapshotsOnYesterday.length <= 1 &&
    endOfYesterday &&
    startOfYesterday &&
    endOfYesterday.timestamp === startOfYesterday.timestamp;

  if (onlyOpenYesterday && liveTotal > endOfYesterday.totalRegistrations) {
    warning =
      "Today/Yesterday are skewed: you only have an opening snapshot for yesterday, not an end-of-day count. Add a RegistrationMetrics item at Eastern midnight with the true count at end of yesterday (e.g. 2026-07-28T04:00:00.000Z for midnight EDT), then refresh.";
  } else if (!endOfYesterday) {
    warning =
      "No snapshot at or before Eastern midnight — Today and Growth cannot be computed accurately yet.";
  } else if (yesterday === null) {
    warning = "Not enough snapshot history to compare today vs yesterday.";
  }

  return {
    totalRegistrations: liveTotal,
    today,
    yesterday,
    lastHour,
    growth,
    warning,
    dayBoundary: ADMIN_TIME_ZONE,
  };
}
