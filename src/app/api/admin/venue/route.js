import { NextResponse } from "next/server";
import {
  checkAuthConfigured,
  isAuthorized,
  unauthorized,
} from "@/lib/admin/auth";
import { getVenueAnalytics } from "@/lib/admin/dynamodb";

/**
 * GET /api/admin/venue
 * Auth: admin session cookie.
 * Scans PWA METADATA rows for venue presence analytics.
 */
export async function GET(request) {
  const configError = checkAuthConfigured();
  if (configError) return configError;
  if (!isAuthorized(request)) return unauthorized();

  try {
    const analytics = await getVenueAnalytics();
    return NextResponse.json(analytics);
  } catch (err) {
    console.error("Failed to load venue analytics", err);
    return NextResponse.json(
      { error: "Failed to load venue analytics", detail: err.message },
      { status: 500 },
    );
  }
}
