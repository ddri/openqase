/**
 * Production-ready Redis-based rate limiter using Upstash
 * Supports multi-server deployments with consistent rate limiting
 */

import { Redis } from '@upstash/redis';

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}

/**
 * Redis-based rate limiter for production use
 * Uses Upstash Redis for serverless-friendly rate limiting
 */
export class RedisRateLimiter {
  private redis: Redis | null = null;
  private enabled: boolean = false;

  constructor() {
    // Initialize Redis if credentials are available
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (redisUrl && redisToken) {
      try {
        this.redis = new Redis({
          url: redisUrl,
          token: redisToken,
        });
        this.enabled = true;
        console.log('✅ Redis rate limiter initialized');
      } catch (error) {
        console.error('❌ Failed to initialize Redis rate limiter:', error);
        this.enabled = false;
      }
    } else {
      console.log('ℹ️ Redis credentials not found, rate limiter disabled');
    }
  }

  /**
   * Check if Redis rate limiting is available
   */
  isEnabled(): boolean {
    return this.enabled && this.redis !== null;
  }

  /**
   * Check rate limit using Redis with sliding window algorithm
   * @param identifier - Unique identifier (IP address, user ID, etc.)
   * @param limit - Maximum requests allowed
   * @param windowMs - Time window in milliseconds
   */
  async checkLimit(
    identifier: string,
    limit: number,
    windowMs: number
  ): Promise<RateLimitResult> {
    if (!this.enabled || !this.redis) {
      // If Redis is not available, allow the request
      // The caller should fall back to in-memory limiter
      return {
        allowed: true,
        remaining: limit,
        resetTime: Date.now() + windowMs,
      };
    }

    try {
      const now = Date.now();
      const windowStart = now - windowMs;
      const key = `ratelimit:${identifier}`;

      // Use Redis pipeline for atomic operations
      const pipeline = this.redis.pipeline();

      // Remove old entries outside the window
      pipeline.zremrangebyscore(key, 0, windowStart);

      // Count requests in current window
      pipeline.zcard(key);

      // Add current request
      pipeline.zadd(key, { score: now, member: `${now}` });

      // Set expiry on the key
      pipeline.expire(key, Math.ceil(windowMs / 1000));

      // Execute pipeline
      const results = await pipeline.exec();

      // results[1] is the zcard result (count of requests)
      const requestCount = (results[1] as number) || 0;

      const resetTime = now + windowMs;
      const remaining = Math.max(0, limit - requestCount - 1);

      if (requestCount >= limit) {
        // Rate limit exceeded
        return {
          allowed: false,
          remaining: 0,
          resetTime,
          retryAfter: Math.ceil(windowMs / 1000),
        };
      }

      return {
        allowed: true,
        remaining,
        resetTime,
      };
    } catch (error) {
      console.error('Redis rate limit check failed:', error);
      // On error, allow the request and let in-memory limiter handle it
      return {
        allowed: true,
        remaining: limit,
        resetTime: Date.now() + windowMs,
      };
    }
  }

  /**
   * Get current request count for an identifier
   * Useful for monitoring and debugging
   */
  async getCount(identifier: string): Promise<number> {
    if (!this.enabled || !this.redis) {
      return 0;
    }

    try {
      const key = `ratelimit:${identifier}`;
      const count = await this.redis.zcard(key);
      return count || 0;
    } catch (error) {
      console.error('Failed to get rate limit count:', error);
      return 0;
    }
  }

  /**
   * Reset rate limit for an identifier
   * Useful for testing and admin operations
   */
  async reset(identifier: string): Promise<void> {
    if (!this.enabled || !this.redis) {
      return;
    }

    try {
      const key = `ratelimit:${identifier}`;
      await this.redis.del(key);
    } catch (error) {
      console.error('Failed to reset rate limit:', error);
    }
  }

  /**
   * Get stats for monitoring
   */
  async getStats(identifier: string): Promise<{
    count: number;
    oldestRequest: number | null;
    newestRequest: number | null;
  }> {
    if (!this.enabled || !this.redis) {
      return { count: 0, oldestRequest: null, newestRequest: null };
    }

    try {
      const key = `ratelimit:${identifier}`;

      // Get all entries
      const entries = await this.redis.zrange(key, 0, -1, { withScores: true });

      if (!entries || entries.length === 0) {
        return { count: 0, oldestRequest: null, newestRequest: null };
      }

      const scores = entries.filter((_, i) => i % 2 === 1) as number[];

      return {
        count: scores.length,
        oldestRequest: scores[0] || null,
        newestRequest: scores[scores.length - 1] || null,
      };
    } catch (error) {
      console.error('Failed to get rate limit stats:', error);
      return { count: 0, oldestRequest: null, newestRequest: null };
    }
  }
}

// Singleton instance
export const redisRateLimiter = new RedisRateLimiter();
