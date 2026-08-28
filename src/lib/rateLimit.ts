/**
 * Fixed-window rate limiter held in process memory.
 *
 * Per-instance only, so it will not hold across a serverless fleet. It stops
 * casual abuse from a single client; use Upstash or similar if this ever needs
 * to be authoritative.
 */

type Entry = { count: number; resetAt: number }

const buckets = new Map<string, Entry>()

export const WINDOW_MS = 60_000
export const MAX_REQUESTS = 5

export function rateLimit(
  key: string,
  now = Date.now()
): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
  const entry = buckets.get(key)

  if (!entry || now >= entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, remaining: MAX_REQUESTS - 1, retryAfterSeconds: 0 }
  }

  entry.count += 1

  if (entry.count > MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
    }
  }

  return { allowed: true, remaining: MAX_REQUESTS - entry.count, retryAfterSeconds: 0 }
}

// Exposed so tests can start from a known state.
export function resetRateLimits() {
  buckets.clear()
}
