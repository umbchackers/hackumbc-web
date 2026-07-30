import { NextResponse } from "next/server";
import {
  checkAuthConfigured,
  clearSessionCookieOptions,
  createSessionToken,
  getAdminPassword,
  getClientIp,
  isAuthorized,
  safeEqualString,
  sessionCookieOptions,
  SESSION_COOKIE,
  unauthorized,
} from "@/lib/admin/auth";
import {
  clearRateLimit,
  isRateLimited,
  recordAttempt,
} from "@/lib/admin/rate-limit";

/** Max failed logins per IP before temporary lockout. */
const LOGIN_LIMIT = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_OPTS = { limit: LOGIN_LIMIT, windowMs: LOGIN_WINDOW_MS };

function rateLimitedResponse(retryAfterSeconds) {
  return NextResponse.json(
    {
      error: `Too many login attempts. Try again in ${retryAfterSeconds} seconds.`,
    },
    {
      status: 429,
      headers: { "Retry-After": String(retryAfterSeconds) },
    },
  );
}

/** POST — verify password, set HttpOnly session cookie */
export async function POST(request) {
  const configError = checkAuthConfigured();
  if (configError) return configError;

  const ip = getClientIp(request);
  const rateKey = `admin-login:${ip}`;

  const locked = isRateLimited(rateKey, LOGIN_OPTS);
  if (!locked.allowed) {
    return rateLimitedResponse(locked.retryAfterSeconds);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const provided = typeof body?.password === "string" ? body.password : "";
  const password = getAdminPassword();

  if (!safeEqualString(provided, password)) {
    const afterFail = recordAttempt(rateKey, LOGIN_OPTS);
    if (!afterFail.allowed) {
      return rateLimitedResponse(afterFail.retryAfterSeconds);
    }
    return unauthorized();
  }

  clearRateLimit(rateKey);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(
    SESSION_COOKIE,
    createSessionToken(),
    sessionCookieOptions(),
  );
  return response;
}

/** GET — session check for restoring the dashboard after refresh */
export async function GET(request) {
  const configError = checkAuthConfigured();
  if (configError) return configError;

  if (!isAuthorized(request)) return unauthorized();
  return NextResponse.json({ ok: true });
}

/** DELETE — logout (clear session cookie) */
export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", clearSessionCookieOptions());
  return response;
}
