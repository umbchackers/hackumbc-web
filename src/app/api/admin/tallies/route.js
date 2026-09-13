import { NextResponse } from "next/server";
import {
  checkAuthConfigured,
  isAuthorized,
  unauthorized,
} from "@/lib/admin/auth";
import { getEventPrepTallies } from "@/lib/admin/dynamodb";

/**
 * GET /api/admin/tallies
 * Auth: admin session cookie.
 * On-demand scan of registrations for t-shirt + dietary tallies.
 * Intentionally not polled — client loads only when the user presses a button.
 */
export async function GET(request) {
  const configError = checkAuthConfigured();
  if (configError) return configError;
  if (!isAuthorized(request)) return unauthorized();

  try {
    const tallies = await getEventPrepTallies();
    return NextResponse.json(tallies);
  } catch (err) {
    console.error("Failed to load event prep tallies", err);
    return NextResponse.json(
      { error: "Failed to load tallies", detail: err.message },
      { status: 500 },
    );
  }
}
