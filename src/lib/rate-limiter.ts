/**
 * Simple in-memory rate limiter for API protection
 * For production, consider upgrading to Redis-based rate limiting
 */

interface RateLimitEntry {
  requests: number;
  resetTime: number;
}

class InMemoryRateLimiter {
  private store = new Map<string, RateLimitEntry>();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Clean up expired entries every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  /**
   * Check if a request is allowed under rate limiting
   * @param identifier - Unique identifier (IP address, user ID, etc.)
   * @param limit - Maximum requests allowed
   * @param windowMs - Time window in milliseconds
   * @returns Object with allowed status and remaining requests
   */
  checkLimit(
    identifier: string,
    limit: number,
    windowMs: number
  ): {
    allowed: boolean;
    remaining: number;
    resetTime: number;
    retryAfter?: number;
  } {
    const now = Date.now();
    const resetTime = now + windowMs;
    
    const entry = this.store.get(identifier);

    if (!entry || now > entry.resetTime) {
      // First request or window expired - reset
      this.store.set(identifier, {
        requests: 1,
        resetTime,
      });

      return {
        allowed: true,
        remaining: limit - 1,
        resetTime,
      };
    }

    if (entry.requests >= limit) {
      // Rate limit exceeded
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
        retryAfter: Math.ceil((entry.resetTime - now) / 1000), // seconds
      };
    }

    // Increment counter
    entry.requests++;
    this.store.set(identifier, entry);

    return {
      allowed: true,
      remaining: limit - entry.requests,
      resetTime: entry.resetTime,
    };
  }

  /**
   * Clean up expired entries to prevent memory leaks
   */
  private cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.resetTime) {
        this.store.delete(key);
      }
    }
  }

  /**
   * Get current stats (for monitoring)
   */
  getStats() {
    return {
      totalEntries: this.store.size,
      entries: Array.from(this.store.entries()).map(([key, entry]) => ({
        identifier: key,
        requests: entry.requests,
        resetTime: new Date(entry.resetTime).toISOString(),
      })),
    };
  }

  /**
   * Clear all entries (for testing)
   */
  clear() {
    this.store.clear();
  }

  /**
   * Cleanup on shutdown
   */
  destroy() {
    clearInterval(this.cleanupInterval);
    this.store.clear();
  }
}

// Singleton instance
const rateLimiter = new InMemoryRateLimiter();

/**
 * Rate limiting configurations for different endpoints
 */
export const RATE_LIMITS = {
  newsletter: {
    limit: parseInt(process.env.RATE_LIMIT_NEWSLETTER || '5'), // 5 requests
    windowMs: parseInt(process.env.RATE_LIMIT_NEWSLETTER_WINDOW || '300000'), // 5 minutes
  },
  general: {
    limit: parseInt(process.env.RATE_LIMIT_GENERAL || '100'), // 100 requests  
    windowMs: parseInt(process.env.RATE_LIMIT_GENERAL_WINDOW || '900000'), // 15 minutes
  },
} as const;

/**
 * Get client identifier for rate limiting
 * @param request - Next.js request object
 * @returns Unique identifier string
 */
export function getClientIdentifier(request: Request): string {
  // In production, consider using a more sophisticated approach
  // that handles proxy headers (X-Forwarded-For, etc.)
  
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  // Fallback - this won't work well in production behind a proxy
  return 'unknown';
}

/**
 * Apply rate limiting to an API endpoint
 * @param request - Next.js request object
 * @param config - Rate limit configuration
 * @returns Rate limit result
 */
export function applyRateLimit(
  request: Request,
  config: { limit: number; windowMs: number }
) {
  const identifier = getClientIdentifier(request);
  return rateLimiter.checkLimit(identifier, config.limit, config.windowMs);
}

/**
 * Create rate limit headers for HTTP response
 * @param result - Rate limit check result
 * @returns Headers object
 */
export function createRateLimitHeaders(result: {
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}) {
  const headers: Record<string, string> = {
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': Math.ceil(result.resetTime / 1000).toString(),
  };

  if (result.retryAfter) {
    headers['Retry-After'] = result.retryAfter.toString();
  }

  return headers;
}

export { rateLimiter }; 