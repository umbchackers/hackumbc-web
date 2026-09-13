import { NextResponse } from "next/server";
import {
  checkAuthConfigured,
  isAuthorized,
  unauthorized,
} from "@/lib/admin/auth";
import { getVenueEventTallies } from "@/lib/admin/dynamodb";

/**
 * GET /api/admin/venue/tallies
 * Auth: admin session cookie.
 * On-demand scan of PWA METADATA for check-in, meal, workshop, and prize tallies.
 * Intentionally not polled — client loads only when the user presses a button.
 */
export async function GET(request) {
  const configError = checkAuthConfigured();
  if (configError) return configError;
  if (!isAuthorized(request)) return unauthorized();

  try {
    const tallies = await getVenueEventTallies();
    return NextResponse.json(tallies);
  } catch (err) {
    console.error("Failed to load venue event tallies", err);
    return NextResponse.json(
      { error: "Failed to load venue tallies", detail: err.message },
      { status: 500 },
    );
  }
}
