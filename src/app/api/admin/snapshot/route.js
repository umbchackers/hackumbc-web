import { NextResponse } from "next/server";
import {
  checkAuthConfigured,
  getClientIp,
  isAuthorized,
  isCronAuthorized,
  unauthorized,
} from "@/lib/admin/auth";
import {
  getRegistrationCount,
  maybeTakeSnapshot,
  saveMetricSnapshot,
} from "@/lib/admin/dynamodb";
import { checkRateLimit } from "@/lib/admin/rate-limit";

/**
 * POST /api/admin/snapshot
 *
 * Records a registration-count snapshot when allowed by the 5-minute throttle.
 * Auth: admin session cookie OR x-cron-secret (EventBridge / external cron).
 * Query force=1 (session only) bypasses the throttle.
 */
export async function POST(request) {
  const configError = checkAuthConfigured();
  if (configError) return configError;

  const isCron = isCronAuthorized(request);
  if (!isCron && !isAuthorized(request)) return unauthorized();

  const ip = isCron ? "cron" : getClientIp(request);
  const rate = checkRateLimit(`admin-snapshot:${ip}`, {
    limit: 30,
    windowMs: 60 * 60 * 1000,
  });
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Snapshot rate limit exceeded" },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSeconds) },
      },
    );
  }

  try {
    const force =
      !isCron && request.nextUrl.searchParams.get("force") === "1";
    if (force) {
      const total = await getRegistrationCount();
      const snapshot = await saveMetricSnapshot(total);
      return NextResponse.json({ skipped: false, snapshot });
    }

    const result = await maybeTakeSnapshot();
    return NextResponse.json(result);
  } catch (err) {
    console.error("Snapshot failed", err);
    return NextResponse.json(
      { error: "Snapshot failed", detail: err.message },
      { status: 500 },
    );
  }
}
