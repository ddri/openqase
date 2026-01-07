## Caching

OpenQase implements a hybrid caching system that supports both development and production deployments.

---

## Overview

### Hybrid Architecture

```
Development (No Redis):
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│   Request   │ -> │  In-Memory   │ -> │   Cached    │
│             │    │  LRU Cache   │    │   Data      │
└─────────────┘    └──────────────┘    └─────────────┘

Production (With Redis):
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│   Request   │ -> │    Redis     │ -> │   Cached    │
│             │    │   + Memory   │    │   Data      │
└─────────────┘    └──────────────┘    └─────────────┘
```

### Key Features

- **Automatic Fallback**: Uses Redis when available, falls back to in-memory LRU cache
- **Zero Configuration**: Works out of the box for development
- **Production-Ready**: Supports multi-server deployments with Redis
- **Simple API**: Easy-to-use caching functions
- **Type-Safe**: Full TypeScript support

---

## Quick Start

### Development (In-Memory)

No configuration needed! Caching works out of the box:

```typescript
import { cache, CACHE_TTL } from '@/lib/cache';

// Simple get/set
await cache.set('user:123', { name: 'John' }, CACHE_TTL.SHORT);
const user = await cache.get('user:123');

// Cache-aside pattern (recommended)
const user = await cache.getOrSet(
  'user:123',
  async () => await fetchUserFromDB('123'),
  CACHE_TTL.MEDIUM
);
```

### Production (Redis)

1. **Use existing Redis** (if you set up rate limiting):
   ```bash
   # Already configured in #111!
   UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
   UPSTASH_REDIS_REST_TOKEN=your_token_here
   ```

2. **Deploy**: Caching automatically uses Redis

---

## Configuration

### Environment Variables

```bash
# Redis Configuration (Production)
# Same Redis instance used for rate limiting
UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token_here
```

### Cache TTL Values

```typescript
import { CACHE_TTL } from '@/lib/cache';

CACHE_TTL.SHORT   // 60 seconds (1 minute)
CACHE_TTL.MEDIUM  // 300 seconds (5 minutes)
CACHE_TTL.LONG    // 3600 seconds (1 hour)
CACHE_TTL.DAY     // 86400 seconds (24 hours)
CACHE_TTL.WEEK    // 604800 seconds (7 days)
CACHE_TTL.MONTH   // 2592000 seconds (30 days)
```

---

## Usage Patterns

### Basic Caching

```typescript
import { cache, CACHE_TTL } from '@/lib/cache';

// Set a value
await cache.set('key', { data: 'value' }, CACHE_TTL.MEDIUM);

// Get a value
const data = await cache.get<MyType>('key');

if (data) {
  console.log('Cache hit:', data);
} else {
  console.log('Cache miss');
}

// Delete a value
await cache.delete('key');

// Check if key exists
const exists = await cache.has('key');
```

### Cache-Aside Pattern (Recommended)

The cache-aside pattern is the most common and recommended approach:

```typescript
import { cache, CACHE_TTL, CacheKeys } from '@/lib/cache';

async function getCaseStudy(slug: string) {
  return cache.getOrSet(
    CacheKeys.caseStudy(slug),
    async () => {
      // This function only runs on cache miss
      const { data } = await supabase
        .from('case_studies')
        .select('*')
        .eq('slug', slug)
        .single();

      return data;
    },
    CACHE_TTL.LONG // Cache for 1 hour
  );
}
```

**Benefits:**
- Simple and readable
- Handles cache miss automatically
- Prevents cache stampede
- Type-safe

### Function Wrapping

Cache an entire function:

```typescript
import { cache } from '@/lib/cache';

// Original function
async function fetchUserById(userId: string) {
  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  return data;
}

// Cached version
const getCachedUser = cache.wrap(fetchUserById, {
  keyGenerator: (userId) => `user:${userId}`,
  ttl: CACHE_TTL.MEDIUM,
});

// Use the cached version
const user = await getCachedUser('123');
```

### Cache Key Builders

Use predefined key builders for consistency:

```typescript
import { CacheKeys } from '@/lib/cache';

// Predefined keys
CacheKeys.caseStudy('my-slug')        // "case-study:my-slug"
CacheKeys.blogPost('my-post')         // "blog-post:my-post"
CacheKeys.algorithm('grovers')        // "algorithm:grovers"
CacheKeys.industry('finance')         // "industry:finance"
CacheKeys.persona('researcher')       // "persona:researcher"
CacheKeys.user('123')                 // "user:123"
CacheKeys.apiResponse('/api/posts')   // "api:/api/posts"
```

**Or create custom keys:**

```typescript
const cacheKey = `content:${contentType}:${id}`;
```

### Batch Operations

Cache multiple values at once:

```typescript
import { redisCache } from '@/lib/cache-redis';

// Set multiple values
await redisCache.mset({
  'user:1': { name: 'Alice' },
  'user:2': { name: 'Bob' },
  'user:3': { name: 'Charlie' },
}, CACHE_TTL.MEDIUM);

// Get multiple values
const [user1, user2, user3] = await redisCache.mget('user:1', 'user:2', 'user:3');
```

### Pattern Deletion

Delete all keys matching a pattern:

```typescript
// Delete all case studies
await cache.deletePattern('case-study:*');

// Delete all user cache
await cache.deletePattern('user:*');

// Delete all API responses
await cache.deletePattern('api:*');
```

---

## Common Use Cases

### 1. Database Query Caching

```typescript
import { cache, CACHE_TTL, CacheKeys } from '@/lib/cache';

async function getPublishedCaseStudies() {
  return cache.getOrSet(
    'case-studies:published',
    async () => {
      const { data } = await supabase
        .from('case_studies')
        .select('*')
        .eq('published', true);

      return data;
    },
    CACHE_TTL.MEDIUM
  );
}
```

### 2. API Response Caching

```typescript
// In API route: app/api/case-studies/route.ts
import { cache, CACHE_TTL, CacheKeys } from '@/lib/cache';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';

  const cacheKey = CacheKeys.apiResponse('/case-studies', `page=${page}`);

  const data = await cache.getOrSet(
    cacheKey,
    async () => {
      // Fetch from database
      return await fetchCaseStudies(parseInt(page));
    },
    CACHE_TTL.MEDIUM
  );

  return Response.json(data);
}
```

### 3. Expensive Computation Caching

```typescript
import { cache, CACHE_TTL } from '@/lib/cache';

async function calculateComplexStats(caseStudyId: string) {
  return cache.getOrSet(
    `stats:${caseStudyId}`,
    async () => {
      // Expensive computation
      const stats = await performComplexCalculation(caseStudyId);
      return stats;
    },
    CACHE_TTL.DAY // Cache for 24 hours
  );
}
```

### 4. Cache Invalidation on Update

```typescript
import { cache } from '@/lib/cache';

async function updateCaseStudy(slug: string, data: any) {
  // Update in database
  await supabase
    .from('case_studies')
    .update(data)
    .eq('slug', slug);

  // Invalidate cache
  await cache.delete(CacheKeys.caseStudy(slug));
  await cache.deletePattern('case-studies:*'); // Invalidate list caches
}
```

### 5. Conditional Caching

```typescript
async function getContent(slug: string, useCache: boolean = true) {
  if (!useCache) {
    return fetchFromDatabase(slug);
  }

  return cache.getOrSet(
    `content:${slug}`,
    () => fetchFromDatabase(slug),
    CACHE_TTL.LONG
  );
}
```

---

## How It Works

### In-Memory LRU Cache

Used when Redis is not configured:

```typescript
class InMemoryCache {
  private store = new Map<string, CacheEntry>();
  private maxSize = 1000; // Configurable

  // LRU eviction when size limit reached
  // Automatic expiry checking
  // Fast access (<1ms)
}
```

**Pros:**
- Zero configuration
- Very fast (<1ms)
- No external dependencies

**Cons:**
- Single server only
- Lost on server restart
- Limited size (1000 entries default)

### Redis Cache

Used in production with Redis configured:

```typescript
class RedisCache {
  async get(key: string) {
    return await this.redis.get(key);
  }

  async set(key: string, value: any, ttl: number) {
    await this.redis.set(key, value, { ex: ttl });
  }
}
```

**Pros:**
- Works across multiple servers
- Persistent across restarts
- Unlimited size (Redis memory limit)
- Scalable

**Cons:**
- Requires Redis/Upstash
- Slightly slower (~5-10ms)
- External dependency

### Hybrid Cache

Combines both for best of both worlds:

```typescript
class HybridCache {
  async get(key: string) {
    // Try Redis first
    if (redisCache.isEnabled()) {
      const value = await redisCache.get(key);
      if (value) return value;
    }

    // Fall back to in-memory
    return memoryCache.get(key);
  }

  async set(key: string, value: any, ttl: number) {
    // Write to both
    await redisCache.set(key, value, ttl);
    memoryCache.set(key, value, ttl);
  }
}
```

**Benefits:**
- Best performance (in-memory reads when possible)
- Reliability (multiple cache layers)
- Graceful degradation (works without Redis)

---

## Best Practices

### 1. Choose Appropriate TTL

```typescript
// Frequently changing data
CACHE_TTL.SHORT  // User status, live counters

// Moderate changes
CACHE_TTL.MEDIUM // Blog posts, case studies

// Rarely changing
CACHE_TTL.LONG   // Static content, reference data

// Very stable
CACHE_TTL.DAY    // Configuration, templates
```

### 2. Use Namespaced Keys

```typescript
// Good - clear namespace
cache.set('case-study:my-slug', data);
cache.set('blog-post:my-post', data);

// Bad - could conflict
cache.set('my-slug', data);
cache.set('my-post', data);
```

### 3. Invalidate on Updates

```typescript
async function saveCaseStudy(slug: string, data: any) {
  await database.save(data);

  // Invalidate specific cache
  await cache.delete(CacheKeys.caseStudy(slug));

  // Invalidate related caches
  await cache.deletePattern('case-studies:list:*');
  await cache.deletePattern('api:/case-studies*');
}
```

### 4. Handle Cache Misses Gracefully

```typescript
async function getData(key: string) {
  const cached = await cache.get(key);

  if (cached) {
    return cached;
  }

  // Always have a fallback
  const fresh = await fetchFromDatabase(key);

  // Cache for next time
  cache.set(key, fresh, CACHE_TTL.MEDIUM).catch(console.error);

  return fresh;
}
```

### 5. Don't Cache Everything

**Cache:**
- ✅ Expensive database queries
- ✅ API responses
- ✅ Computed/aggregated data
- ✅ Frequently accessed content

**Don't Cache:**
- ❌ User-specific private data (use session)
- ❌ Real-time data
- ❌ Authentication tokens
- ❌ Frequently changing data

---

## Monitoring & Debugging

### Check Cache Status

```typescript
import { cache } from '@/lib/cache';
import { redisCache } from '@/lib/cache-redis';

// Check if Redis is available
if (redisCache.isEnabled()) {
  console.log('✅ Redis caching active');
} else {
  console.log('ℹ️ In-memory caching active');
}

// Get cache stats
const stats = cache.stats();
console.log('Cache stats:', stats);
// { redis: true, memory: { size: 42, maxSize: 1000 } }
```

### Cache Hit/Miss Logging

```typescript
async function getCachedData(key: string) {
  const startTime = Date.now();
  const data = await cache.get(key);
  const duration = Date.now() - startTime;

  if (data) {
    console.log(`Cache HIT: ${key} (${duration}ms)`);
  } else {
    console.log(`Cache MISS: ${key} (${duration}ms)`);
  }

  return data;
}
```

### Clear Cache (Development)

```typescript
import { cache } from '@/lib/cache';

// Clear in-memory cache
cache.clearMemory();

// Clear Redis (development only)
import { redisCache } from '@/lib/cache-redis';
await redisCache.flush(); // Only works in NODE_ENV !== 'production'
```

---

## Performance

### Benchmarks

| Operation | In-Memory | Redis (Upstash) | Speedup |
|-----------|-----------|-----------------|---------|
| GET | <1ms | 5-10ms | 5-10x |
| SET | <1ms | 5-10ms | 5-10x |
| DELETE | <1ms | 5-10ms | 5-10x |
| Pattern Delete | <5ms | 10-50ms | 2-10x |

### Cache Hit Ratios

Target cache hit ratios for different content types:

| Content Type | Target Hit Ratio | TTL |
|--------------|------------------|-----|
| Static pages | 95%+ | LONG |
| API responses | 80-90% | MEDIUM |
| Database queries | 70-80% | MEDIUM |
| User data | 60-70% | SHORT |

### Memory Usage

**In-Memory Cache:**
- Default: 1000 entries max
- Estimate: ~1MB per 1000 simple objects
- LRU eviction when full

**Redis:**
- Limited by Upstash plan
- Free tier: 10,000 requests/day
- Estimate: 256MB free tier

---

## Troubleshooting

### Cache Not Working

**Check Redis connection:**
```typescript
import { redisCache } from '@/lib/cache-redis';

if (!redisCache.isEnabled()) {
  console.log('Redis not available - check credentials');
}
```

### Stale Data

**Force cache refresh:**
```typescript
// Delete and refetch
await cache.delete(key);
const fresh = await cache.getOrSet(key, fetcher);
```

### Memory Usage High

**Reduce cache size:**
```typescript
// In src/lib/cache.ts
new InMemoryCache(500); // Reduce from 1000 to 500
```

---

## Migration Guide

### From Next.js cache()

**Before:**
```typescript
import { cache } from 'react';

const getData = cache(async (id: string) => {
  return await fetchData(id);
});
```

**After:**
```typescript
import { cache } from '@/lib/cache';

async function getData(id: string) {
  return cache.getOrSet(
    `data:${id}`,
    () => fetchData(id),
    CACHE_TTL.MEDIUM
  );
}
```

### From Manual Caching

**Before:**
```typescript
const cached = globalThis.myCache?.get(key);
if (cached) return cached;

const data = await fetchData();
globalThis.myCache?.set(key, data);
return data;
```

**After:**
```typescript
return cache.getOrSet(key, fetchData, CACHE_TTL.MEDIUM);
```

---

*Last updated: v0.5.0 - Redis-based caching implemented*
