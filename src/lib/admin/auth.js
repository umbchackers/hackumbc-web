/**
 * Admin auth for registration analytics.
 *
 * Login exchanges NEXT_ADMIN_DASHBOARD_PASSWORD for an HttpOnly signed session
 * cookie (not the raw password in the browser). EventBridge/cron uses
 * NEXT_CRON_SECRET via the x-cron-secret header instead.
 */

import { createHash, createHmac, randomBytes, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

export const SESSION_COOKIE = "hackumbc_admin_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

export function getAdminPassword() {
  return (process.env.NEXT_ADMIN_DASHBOARD_PASSWORD || "").trim();
}

/** Prefer a dedicated signing secret; fall back to the dashboard password. */
function getSigningKey() {
  return (
    process.env.NEXT_ADMIN_SESSION_SECRET || getAdminPassword()
  ).trim();
}

/** Constant-time string compare that does not leak length. */
export function safeEqualString(a, b) {
  const hashA = createHash("sha256").update(String(a ?? ""), "utf8").digest();
  const hashB = createHash("sha256").update(String(b ?? ""), "utf8").digest();
  return timingSafeEqual(hashA, hashB);
}

function signPayload(payload) {
  return createHmac("sha256", getSigningKey())
    .update(payload)
    .digest("base64url");
}

/** Signed token: v1.<expiryMs>.<nonce>.<hmac> */
export function createSessionToken(now = Date.now()) {
  const exp = now + SESSION_TTL_MS;
  const nonce = randomBytes(16).toString("base64url");
  const payload = `v1.${exp}.${nonce}`;
  return `${payload}.${signPayload(payload)}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== "string") return false;
  if (!getAdminPassword() || !getSigningKey()) return false;

  const parts = token.split(".");
  if (parts.length !== 4) return false;

  const [version, expStr, nonce, signature] = parts;
  if (version !== "v1" || !expStr || !nonce || !signature) return false;

  const exp = Number(expStr);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;

  const payload = `${version}.${expStr}.${nonce}`;
  const expected = signPayload(payload);

  // Hash both sides so mismatched signature lengths cannot throw/leak timing
  const sigHash = createHash("sha256").update(signature, "utf8").digest();
  const expHash = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(sigHash, expHash);
}

export function sessionCookieOptions(maxAgeSeconds = SESSION_TTL_MS / 1000) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: maxAgeSeconds,
  };
}

export function clearSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  };
}

/** True if request carries a valid admin session cookie. */
export function isAuthorized(request) {
  if (!getAdminPassword()) return false;

  const token = request.cookies?.get?.(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

/** True if x-cron-secret matches NEXT_CRON_SECRET. */
export function isCronAuthorized(request) {
  const cronSecret = (process.env.NEXT_CRON_SECRET || "").trim();
  if (!cronSecret) return false;

  const header = (request.headers.get("x-cron-secret") || "").trim();
  return safeEqualString(header, cronSecret);
}

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

/** Fail closed when the dashboard password env var is missing. */
export function checkAuthConfigured() {
  if (!getAdminPassword()) {
    return NextResponse.json(
      {
        error:
          "NEXT_ADMIN_DASHBOARD_PASSWORD is not set. Add it to your environment variables.",
      },
      { status: 503 },
    );
  }
  return null;
}

export function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}
