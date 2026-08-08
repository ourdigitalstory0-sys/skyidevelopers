/**
 * Sliding Window Rate Limiter Helper
 * Prevents automated bot spam and brute-force submissions.
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 5,
  windowMs: number = 10 * 60 * 1000 // 10 minutes
): { success: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    // New or expired window
    const newRecord: RateLimitRecord = {
      count: 1,
      resetTime: now + windowMs,
    };
    rateLimitStore.set(identifier, newRecord);
    return { success: true, remaining: maxRequests - 1, resetTime: newRecord.resetTime };
  }

  if (record.count >= maxRequests) {
    // Exceeded limit
    return { success: false, remaining: 0, resetTime: record.resetTime };
  }

  record.count += 1;
  return { success: true, remaining: maxRequests - record.count, resetTime: record.resetTime };
}
