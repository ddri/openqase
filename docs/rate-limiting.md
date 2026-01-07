# Rate Limiting

OpenQase implements a hybrid rate limiting system that supports both development and production deployments.

---

## Overview

### Hybrid Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  Development    │ -> │   In-Memory      │ -> │  Single Server  │
│  (No Redis)     │    │   Rate Limiter   │    │  Rate Limits    │
└─────────────────┘    └──────────────────┘    └─────────────────┘

┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  Production     │ -> │ Redis-Based      │ -> │  Multi-Server   │
│  (With Redis)   │    │ Rate Limiter     │    │  Consistent     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Key Features

- **Automatic Fallback**: Uses Redis when available, falls back to in-memory
- **Zero Breaking Changes**: Existing code works without modifications
- **Production-Ready**: Supports multi-server deployments with Redis
- **Configurable**: Adjust limits via environment variables
- **Monitoring**: Built-in stats and debugging capabilities

---

## Quick Start

### Development (In-Memory)

No configuration needed! Rate limiting works out of the box:

```typescript
import { rateLimiter, RATE_LIMITS } from '@/lib/rate-limiter';

const result = await rateLimiter.checkLimit(
  'user-identifier',
  RATE_LIMITS.general.limit,
  RATE_LIMITS.general.windowMs
);

if (!result.allowed) {
  return new Response('Too many requests', { status: 429 });
}
```

### Production (Redis)

1. **Create Upstash Redis Database**:
   - Go to https://upstash.com
   - Create a new Redis database
   - Copy REST API credentials

2. **Add to Environment Variables**:
   ```bash
   UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
   UPSTASH_REDIS_REST_TOKEN=your_token_here
   ```

3. **Deploy**: Rate limiting automatically uses Redis

---

## Configuration

### Environment Variables

```bash
# Rate Limit Configuration
RATE_LIMIT_NEWSLETTER=5                    # Max requests
RATE_LIMIT_NEWSLETTER_WINDOW=300000        # 5 minutes in ms

RATE_LIMIT_GENERAL=100                     # Max requests
RATE_LIMIT_GENERAL_WINDOW=900000           # 15 minutes in ms

# Redis Configuration (Production)
UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token_here
```

### Default Rate Limits

| Endpoint | Limit | Window | Use Case |
|----------|-------|--------|----------|
| Newsletter | 5 requests | 5 minutes | Prevent spam subscriptions |
| General API | 100 requests | 15 minutes | Normal API usage |

---

## Usage Patterns

### Basic Rate Limiting

```typescript
import { rateLimiter, RATE_LIMITS } from '@/lib/rate-limiter';

export async function POST(request: Request) {
  // Get client identifier
  const clientIP = request.headers.get('x-forwarded-for') || 'unknown';

  // Check rate limit
  const result = await rateLimiter.checkLimit(
    `api:${clientIP}`,
    RATE_LIMITS.general.limit,
    RATE_LIMITS.general.windowMs
  );

  // Handle rate limit exceeded
  if (!result.allowed) {
    return new Response(
      JSON.stringify({ error: 'Too many requests' }),
      {
        status: 429,
        headers: {
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': Math.ceil(result.resetTime / 1000).toString(),
          'Retry-After': result.retryAfter?.toString() || '300',
        },
      }
    );
  }

  // Process request...
  return new Response('Success');
}
```

### Custom Rate Limits

```typescript
import { rateLimiter } from '@/lib/rate-limiter';

// Strict rate limit for sensitive operations
const result = await rateLimiter.checkLimit(
  `password-reset:${email}`,
  3,      // 3 requests
  3600000 // 1 hour
);

// Generous rate limit for read operations
const result = await rateLimiter.checkLimit(
  `read:${userId}`,
  1000,   // 1000 requests
  60000   // 1 minute
);
```

### Per-User Rate Limiting

```typescript
// Get authenticated user
const { data: { user } } = await supabase.auth.getUser();

if (user) {
  // Rate limit by user ID
  const result = await rateLimiter.checkLimit(
    `user:${user.id}`,
    50,
    60000
  );
} else {
  // Rate limit by IP for anonymous users
  const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
  const result = await rateLimiter.checkLimit(
    `ip:${clientIP}`,
    10,
    60000
  );
}
```

---

## How It Works

### In-Memory Rate Limiting

Used when Redis is not configured:

```typescript
class InMemoryRateLimiter {
  private store = new Map<string, RateLimitEntry>();

  async checkLimit(identifier: string, limit: number, windowMs: number) {
    // Store requests in memory
    // Clean up expired entries
    // Return allowed/denied status
  }
}
```

**Pros:**
- Zero configuration
- No external dependencies
- Fast (< 1ms)

**Cons:**
- Only works on single server
- Lost on server restart
- Memory usage grows with traffic

### Redis Rate Limiting

Used in production with Redis configured:

```typescript
class RedisRateLimiter {
  async checkLimit(identifier: string, limit: number, windowMs: number) {
    // Use Redis sorted sets for sliding window
    // Remove old entries outside window
    // Count requests in current window
    // Return allowed/denied status
  }
}
```

**Pros:**
- Works across multiple servers
- Persistent across restarts
- Scalable to high traffic
- Accurate sliding window

**Cons:**
- Requires Redis/Upstash
- Slightly slower (~5-10ms)
- External dependency

### Sliding Window Algorithm

Both implementations use a sliding window algorithm:

```
Time:    0s     10s     20s     30s     40s     50s     60s
Window:  |-------- 60s window ---------|
Requests: X   X      X    XX      X   X    XX    X
         │   │      │    ││      │   │    ││    │
         1   2      3    45      6   7    89    10

At 50s: Count requests from 0s-50s (last 60s)
```

This provides more accurate rate limiting than fixed windows.

---

## Monitoring & Debugging

### Check Rate Limit Status

```typescript
import { redisRateLimiter } from '@/lib/rate-limiter-redis';

// Check if Redis is available
if (redisRateLimiter.isEnabled()) {
  console.log('✅ Redis rate limiting active');

  // Get current request count
  const count = await redisRateLimiter.getCount('user:123');
  console.log(`Current requests: ${count}`);

  // Get detailed stats
  const stats = await redisRateLimiter.getStats('user:123');
  console.log('Stats:', stats);
} else {
  console.log('ℹ️ Using in-memory rate limiting');
}
```

### Reset Rate Limit (Admin/Testing)

```typescript
import { redisRateLimiter } from '@/lib/rate-limiter-redis';

// Reset rate limit for a user
await redisRateLimiter.reset('user:123');

// Reset rate limit for an IP
await redisRateLimiter.reset('ip:192.168.1.1');
```

### View All Rate Limits (Development)

```typescript
import { rateLimiter } from '@/lib/rate-limiter';

const stats = rateLimiter.getStats();
console.log('Active rate limits:', stats);
```

---

## Testing

### Unit Testing

```typescript
import { rateLimiter } from '@/lib/rate-limiter';

describe('Rate Limiter', () => {
  beforeEach(() => {
    rateLimiter.clear(); // Clear before each test
  });

  it('should allow requests under limit', async () => {
    const result = await rateLimiter.checkLimit('test', 5, 60000);
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(4);
  });

  it('should block requests over limit', async () => {
    // Make 5 requests
    for (let i = 0; i < 5; i++) {
      await rateLimiter.checkLimit('test', 5, 60000);
    }

    // 6th request should be blocked
    const result = await rateLimiter.checkLimit('test', 5, 60000);
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it('should reset after window expires', async () => {
    const result1 = await rateLimiter.checkLimit('test', 1, 100); // 100ms window
    expect(result1.allowed).toBe(true);

    // Wait for window to expire
    await new Promise((resolve) => setTimeout(resolve, 150));

    const result2 = await rateLimiter.checkLimit('test', 1, 100);
    expect(result2.allowed).toBe(true); // Should be allowed again
  });
});
```

### Integration Testing

```typescript
describe('API Rate Limiting', () => {
  it('should return 429 when rate limited', async () => {
    // Make requests up to limit
    for (let i = 0; i < 5; i++) {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email: 'test@example.com' }),
      });
      expect(response.status).toBe(200);
    }

    // Next request should be rate limited
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com' }),
    });

    expect(response.status).toBe(429);
    expect(response.headers.get('Retry-After')).toBeTruthy();
  });
});
```

---

## Production Deployment

### Vercel Deployment

1. **Add Environment Variables** in Vercel Dashboard:
   ```
   UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
   UPSTASH_REDIS_REST_TOKEN=your_token_here
   ```

2. **Deploy**: Rate limiting automatically uses Redis

3. **Verify**: Check logs for "✅ Redis rate limiter initialized"

### Health Check

Create an endpoint to verify rate limiting is working:

```typescript
// app/api/health/rate-limit/route.ts
import { redisRateLimiter } from '@/lib/rate-limiter-redis';

export async function GET() {
  const status = {
    redis: redisRateLimiter.isEnabled(),
    mode: redisRateLimiter.isEnabled() ? 'redis' : 'in-memory',
    timestamp: new Date().toISOString(),
  };

  return Response.json(status);
}
```

---

## Troubleshooting

### Issue: Rate limits not working across servers

**Symptoms:**
- Rate limits seem to reset randomly
- Different servers have different counts

**Solution:**
- Verify Redis credentials are set
- Check logs for "✅ Redis rate limiter initialized"
- If missing, add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`

### Issue: Redis connection errors

**Symptoms:**
- Logs show "Redis rate limit check failed"
- Falling back to in-memory

**Solution:**
1. **Check Redis is accessible**:
   ```bash
   curl https://your-db.upstash.io/ping \
     -H "Authorization: Bearer your_token_here"
   ```

2. **Verify credentials** are correct
3. **Check Upstash dashboard** for database status

### Issue: Rate limits too strict/lenient

**Symptoms:**
- Legitimate users being blocked
- OR abuse not being prevented

**Solution:**
Adjust limits via environment variables:

```bash
# More lenient
RATE_LIMIT_NEWSLETTER=10
RATE_LIMIT_NEWSLETTER_WINDOW=600000  # 10 minutes

# More strict
RATE_LIMIT_NEWSLETTER=3
RATE_LIMIT_NEWSLETTER_WINDOW=60000   # 1 minute
```

### Issue: Memory usage growing (development)

**Symptoms:**
- In-memory rate limiter using too much RAM
- Development server slowing down

**Solution:**
- In-memory limiter automatically cleans up every 5 minutes
- Restart dev server to clear all entries
- Consider using Redis even in development for heavy testing

---

## Best Practices

### 1. Use Namespaced Identifiers

```typescript
// Good - namespaced and specific
await rateLimiter.checkLimit(`newsletter:${ip}`, 5, 300000);
await rateLimiter.checkLimit(`api:${userId}`, 100, 900000);
await rateLimiter.checkLimit(`login:${email}`, 5, 300000);

// Bad - generic and conflicts
await rateLimiter.checkLimit(ip, 5, 300000);
await rateLimiter.checkLimit(userId, 100, 900000);
```

### 2. Match Limits to Use Case

| Use Case | Suggested Limit | Window |
|----------|-----------------|--------|
| Newsletter signup | 5 requests | 5 minutes |
| Login attempts | 5 requests | 15 minutes |
| Password reset | 3 requests | 1 hour |
| Read API | 100 requests | 15 minutes |
| Write API | 20 requests | 15 minutes |
| Search | 50 requests | 1 minute |

### 3. Return Proper Headers

```typescript
if (!result.allowed) {
  return new Response(JSON.stringify({ error: 'Too many requests' }), {
    status: 429,
    headers: {
      'X-RateLimit-Limit': limit.toString(),
      'X-RateLimit-Remaining': '0',
      'X-RateLimit-Reset': Math.ceil(result.resetTime / 1000).toString(),
      'Retry-After': result.retryAfter?.toString() || '300',
    },
  });
}
```

### 4. Monitor Rate Limit Usage

Log when users hit rate limits:

```typescript
if (!result.allowed) {
  console.warn('Rate limit exceeded:', {
    identifier,
    endpoint: '/api/newsletter',
    limit,
    timestamp: new Date().toISOString(),
  });
}
```

### 5. Provide Clear Error Messages

```typescript
if (!result.allowed) {
  return Response.json(
    {
      error: 'Too many requests',
      message: 'You have exceeded the rate limit. Please try again later.',
      retryAfter: result.retryAfter,
      resetTime: new Date(result.resetTime).toISOString(),
    },
    { status: 429 }
  );
}
```

---

## Performance

### Benchmarks

| Implementation | Latency | Throughput | Scalability |
|----------------|---------|------------|-------------|
| In-Memory | < 1ms | 100K+ req/s | Single server only |
| Redis (Upstash) | 5-10ms | 10K+ req/s | Unlimited servers |

### Optimization Tips

1. **Cache Redis results** for repeated checks within same request
2. **Use shorter windows** for better performance (less data to scan)
3. **Clean up identifiers** that are no longer needed
4. **Monitor Redis memory** usage in production

---

## Security Considerations

### IP Spoofing Protection

```typescript
// Get real IP from proxy headers
const forwarded = request.headers.get('x-forwarded-for');
const realIp = request.headers.get('x-real-ip');

// Always use the first IP in the chain (client IP)
const clientIP = forwarded ? forwarded.split(',')[0].trim() : realIp || 'unknown';
```

### Rate Limit Bypass Prevention

- Never expose reset endpoints to public APIs
- Use authenticated identifiers (user IDs) when possible
- Log and alert on suspicious rate limit patterns
- Implement progressive delays (exponential backoff)

### DDoS Protection

Rate limiting is **not sufficient** for DDoS protection. Also use:
- CDN (Cloudflare, Vercel Edge)
- WAF (Web Application Firewall)
- Network-level protection
- Connection limits

---

*Last updated: v0.5.0 - Redis-based rate limiting implemented*
