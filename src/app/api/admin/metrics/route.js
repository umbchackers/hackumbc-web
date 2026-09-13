import { NextResponse } from "next/server";
import {
  checkAuthConfigured,
  isAuthorized,
  unauthorized,
} from "@/lib/admin/auth";
import {
  getMetricSnapshots,
  getRegistrationCount,
  maybeTakeSnapshot,
} from "@/lib/admin/dynamodb";
import { computeStats } from "@/lib/admin/stats";

/**
 * GET /api/admin/metrics
 * Auth: admin session cookie.
 * Optionally records a snapshot, then returns headline stats + chart history.
 */
export async function GET(request) {
  const configError = checkAuthConfigured();
  if (configError) return configError;
  if (!isAuthorized(request)) return unauthorized();

  try {
    await maybeTakeSnapshot();
    const [snapshots, liveTotal] = await Promise.all([
      getMetricSnapshots(),
      getRegistrationCount(),
    ]);

    // Append live count so the chart tip matches the registrations table
    const history = [...snapshots];
    const last = history[history.length - 1];
    if (!last || last.totalRegistrations !== liveTotal) {
      history.push({
        timestamp: new Date().toISOString(),
        totalRegistrations: liveTotal,
      });
    }

    return NextResponse.json({
      stats: computeStats(snapshots, liveTotal),
      history,
    });
  } catch (err) {
    console.error("Failed to load metrics", err);
    return NextResponse.json(
      { error: "Failed to load metrics", detail: err.message },
      { status: 500 },
    );
  }
}
