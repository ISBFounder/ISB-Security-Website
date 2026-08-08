import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export type RateLimitResult = {
  success: boolean;
  remaining: number;
  reset: number;
  devFallback?: boolean;
};

const hasUpstash =
  Boolean(process.env.UPSTASH_REDIS_REST_URL) &&
  Boolean(process.env.UPSTASH_REDIS_REST_TOKEN);

let ratelimit: Ratelimit | null = null;

if (hasUpstash) {
  ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "10 m"),
    analytics: true,
    prefix: "isb-forms",
  });
}

/** In-memory fallback for local development only — not production-grade across instances */
const memoryHits = new Map<string, { count: number; reset: number }>();

export async function limitFormRequest(
  identifier: string
): Promise<RateLimitResult> {
  if (ratelimit) {
    const result = await ratelimit.limit(identifier);
    return {
      success: result.success,
      remaining: result.remaining,
      reset: result.reset,
    };
  }

  // Development fallback only
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const entry = memoryHits.get(identifier);
  if (!entry || entry.reset < now) {
    memoryHits.set(identifier, { count: 1, reset: now + windowMs });
    return {
      success: true,
      remaining: 4,
      reset: now + windowMs,
      devFallback: true,
    };
  }
  if (entry.count >= 5) {
    return {
      success: false,
      remaining: 0,
      reset: entry.reset,
      devFallback: true,
    };
  }
  entry.count += 1;
  return {
    success: true,
    remaining: 5 - entry.count,
    reset: entry.reset,
    devFallback: true,
  };
}

export function isRateLimitProduction(): boolean {
  return hasUpstash;
}
