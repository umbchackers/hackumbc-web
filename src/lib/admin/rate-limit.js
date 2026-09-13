/**
 * In-memory sliding-window rate limiter (per server instance).
 * Enough for Amplify + an internal admin tool; not shared across instances.
 */

const buckets = new Map();

function getBucket(key) {
  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = { timestamps: [] };
    buckets.set(key, bucket);
  }
  return bucket;
}

function prune(bucket, windowMs, now) {
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < windowMs);
}

/** Peek whether the key is limited (does not record an event). */
export function isRateLimited(key, { limit, windowMs }) {
  const now = Date.now();
  const bucket = getBucket(key);
  prune(bucket, windowMs, now);

  if (bucket.timestamps.length >= limit) {
    const oldest = bucket.timestamps[0];
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((oldest + windowMs - now) / 1000),
    );
    return { allowed: false, retryAfterSeconds, remaining: 0 };
  }

  return {
    allowed: true,
    remaining: Math.max(0, limit - bucket.timestamps.length),
  };
}

/** Record a failure/attempt toward the limit (e.g. bad password). */
export function recordAttempt(key, { limit, windowMs }) {
  const now = Date.now();
  const bucket = getBucket(key);
  prune(bucket, windowMs, now);
  bucket.timestamps.push(now);

  if (bucket.timestamps.length >= limit) {
    const oldest = bucket.timestamps[0];
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((oldest + windowMs - now) / 1000),
    );
    return { allowed: false, retryAfterSeconds, remaining: 0 };
  }

  return {
    allowed: true,
    remaining: Math.max(0, limit - bucket.timestamps.length),
  };
}

/** Peek then record — used for snapshot throttling. */
export function checkRateLimit(key, opts) {
  const peek = isRateLimited(key, opts);
  if (!peek.allowed) return peek;
  return recordAttempt(key, opts);
}

export function clearRateLimit(key) {
  buckets.delete(key);
}
