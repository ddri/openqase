# Security Audit - January 2025

## Overview
Security audit conducted for OpenQase v0.5.0 release. This document tracks all identified vulnerabilities, their severity, and remediation status.

## Critical Issues - Must Fix Before Release

### 1. ✅ Unpublished Content Exposure via Public API GETs
**Severity**: CRITICAL  
**Status**: FIXED (2025-01-11)  
**CVE Risk**: Information Disclosure

**Issue**: API routes accept `includeUnpublished=true` parameter and use service-role client, allowing anyone to fetch drafts/unpublished content without authentication.

**Evidence**: 
- Public GET endpoints use `createServiceRoleSupabaseClient()`
- No auth check before honoring `includeUnpublished` parameter
- Middleware allows GET without authentication

**Fix Applied**:
- [x] Removed `includeUnpublished` parameter from all public GET endpoints
- [x] Hardcoded `includeUnpublished = false` in all public API routes
- [ ] Consider switching to anon client with RLS for public endpoints (v0.5.1)

**Files to Review**:
- `/api/case-studies/route.ts`
- `/api/algorithms/route.ts`
- `/api/industries/route.ts`
- `/api/personas/route.ts`
- `/api/blog-posts/route.ts`

---

### 2. ⚠️ XSS via Unsanitized Markdown Rendering
**Severity**: LOW (Single admin author)  
**Status**: Accepted Risk  
**CVE Risk**: Cross-Site Scripting (XSS) - Mitigated by single-author model

**Issue**: markdown-it configured with `html: true` and content rendered via `dangerouslySetInnerHTML` without sanitization.

**Evidence**:
- `src/lib/markdown-server.ts`: `html: true` configuration
- Multiple components using `dangerouslySetInnerHTML` without sanitization

**Risk Assessment**:
- **Accepted as low risk** - Only one trusted admin author creates content
- No external content creation or user-generated content
- Admin would have to intentionally XSS themselves
- HTML support needed for rich content formatting

**Future Consideration**:
- If multiple authors are added, implement DOMPurify sanitization
- For now, maintaining HTML support for content flexibility

**Files Unchanged**:
- `/lib/markdown-server.ts`
- Components using `dangerouslySetInnerHTML`

---

### 3. ✅ Unauthenticated Revalidation Endpoint
**Severity**: HIGH  
**Status**: FIXED (2025-01-11)  
**CVE Risk**: Denial of Service

**Issue**: `/api/revalidate` endpoint had no authentication, allowing anyone to trigger expensive rebuilds.

**Evidence**:
- No auth check in revalidation route
- Could be used for DoS attacks

**Fix Applied**:
- [x] Removed dead endpoint entirely - was unused code from old "refresh cache" button
- [x] All revalidation now happens through Server Actions when content is saved
- [x] No breaking changes as endpoint was never called anywhere

**Files Removed**:
- `/api/revalidate/route.ts` (deleted)

---

## High Priority Issues - Should Fix Soon

### 4. ⚠️ Weak Preview Secret Default
**Severity**: LOW (Environment variable likely set)  
**Status**: Acceptable for 0.5.0  

**Issue**: Preview mode uses weak default secret when `PREVIEW_SECRET` env var not set.

**Assessment**:
- Line 15 in `/api/preview/route.ts` has fallback `|| 'preview-secret-key'`
- Production likely has `PREVIEW_SECRET` properly configured
- Easy fix: Remove fallback to force env var requirement
- Low risk if production environment properly configured

**Fix for Future**:
- [ ] Remove default fallback in production builds
- [ ] Throw error if `PREVIEW_SECRET` missing in production
- [ ] Document requirement in `.env.example`

**Files to Review**:
- `/api/preview/route.ts` line 15
- Environment variable handling

---

### 5. ⚠️ Missing CSRF Protection on Admin API Routes
**Severity**: MEDIUM (Single admin user)  
**Status**: Accepted Risk  
**CVE Risk**: Cross-Site Request Forgery - Mitigated by single-admin model

**Issue**: Admin mutation endpoints have no CSRF protection beyond cookie auth.

**Risk Assessment**:
- **Accepted as medium risk** - Only one trusted admin user
- Low-value target (beta site, no financial transactions)
- Would require targeted attack against specific admin
- Implementation risk outweighs security benefit for beta

**Future Consideration**:
- When adding multiple admins, implement CSRF tokens
- Consider migration to Next.js Server Actions (built-in CSRF)
- For now, relying on SameSite cookies (browser default)

**Security Note Added**:
- Added comment in `/src/middleware.ts` explaining accepted risk

**Files Unchanged**:
- All POST/PUT/DELETE routes in `/api/*`

---

### 6. ⚠️ Error Information Leakage
**Severity**: LOW (Most errors already generic)  
**Status**: Acceptable for 0.5.0  
**CVE Risk**: Information Disclosure - Low risk

**Issue**: API handlers might return detailed error messages that could reveal system internals.

**Assessment**:
- Most API routes already return generic errors ("Failed to fetch", "Internal server error")
- Console.error logs stay server-side (not exposed to clients)
- Main concern: Logs might contain sensitive data in monitoring tools
- Low risk for single-admin beta site
- Medium effort to fully standardize all error responses

**Fix for Future**:
- [ ] Standardize all error responses across API routes
- [ ] Create error response utility function
- [ ] Scrub sensitive data before logging
- [ ] Review Sentry captures for PII

**Current State**:
- Generic errors returned to clients in most cases
- Detailed errors logged server-side for debugging
- Acceptable risk level for beta release

**Files to Review**:
- All API error handlers in `/api/*`
- Global error boundary

---

## Medium Priority Issues

### 7. ⚠️ In-Memory Rate Limiting (Broken on Vercel)
**Severity**: HIGH (Doesn't work on serverless)  
**Status**: Acceptable for 0.5.0 (Beehiiv provides backup protection)  

**Issue**: Rate limiting uses in-memory storage, which doesn't work on Vercel's serverless functions.

**Critical Assessment**:
- **Rate limiting is actually broken on Vercel!** Each function invocation has separate memory
- In-memory Map storage doesn't persist between serverless function calls
- Your rate limiting provides zero protection on production
- Newsletter endpoint protected by Beehiiv's own rate limiting (backup protection)
- Other endpoints not actually rate limited despite code being present

**Why It's Broken**:
- Vercel runs each request in potentially different serverless instance
- No shared memory between instances
- Rate limit counters reset on every cold start
- `/src/lib/rate-limiter.ts` only works in development (single Node process)

**Fix Required for Production**:
- [ ] Implement Redis for distributed rate limiting
- [ ] OR use Vercel KV (built for edge functions)
- [ ] OR use Upstash Redis (serverless Redis)
- [ ] Apply to all public endpoints consistently

**Current Mitigation**:
- Newsletter protected by Beehiiv's rate limiting
- No financial transactions or high-value targets
- Acceptable for beta but needs fixing before scale

---

### 8. ⚠️ CSP Too Permissive
**Severity**: LOW (Required for third-party services)  
**Status**: Acceptable for 0.5.0  

**Issue**: Content Security Policy allows `unsafe-inline` and `unsafe-eval`.

**Assessment**:
- CSP in `next.config.ts` allows inline scripts and eval()
- Required for Google Analytics, Sentry, Vercel analytics to function
- Removing would break multiple third-party integrations
- Nonce-based CSP is complex to implement correctly
- Low risk given single-admin model (no user-generated content)

**Why It's Needed**:
- Google Tag Manager requires `unsafe-inline`
- Sentry error tracking needs `unsafe-eval`
- Vercel analytics uses inline scripts
- Many React libraries use eval() for development

**Fix Would Require**:
- [ ] Implement nonce-based CSP (complex, error-prone)
- [ ] Refactor all third-party script loading
- [ ] Remove or replace incompatible services
- [ ] Extensive testing of all integrations

**Current State**:
- Permissive CSP allows all required services to function
- No user-generated content reduces XSS risk
- Acceptable trade-off for beta release
- Consider tightening for post-beta if removing some services

---

## Fix Priority Order

### Completed for v0.5.0
1. ✅ Unpublished content exposure - FIXED
2. ✅ Revalidation endpoint - REMOVED (dead code)

### Accepted Risks for v0.5.0
3. ⚠️ XSS in markdown - Accepted (single admin author)
4. ⚠️ CSRF protection - Accepted (single admin, low value target)
5. ⚠️ Preview secret default - Acceptable (env var likely set in prod)
6. ⚠️ Error leakage - Acceptable (mostly generic already)
7. ⚠️ Rate limiting broken - Acceptable (Beehiiv provides backup)
8. ⚠️ CSP permissive - Acceptable (needed for third-party services)

### For v0.5.1 (Post-Beta Priority)
1. Fix rate limiting with Redis/Vercel KV (HIGH - currently broken)
2. Remove preview secret fallback (EASY - one line fix)
3. Standardize error responses (MEDIUM - nice to have)

### For v0.6.0 (Scale Considerations)
1. Implement CSRF tokens or Server Actions
2. Tighten CSP if removing services
3. Add multi-author protections if needed

## Testing Checklist After Fixes

- [ ] Verify unpublished content not accessible via public API
- [ ] Test markdown rendering with malicious HTML
- [ ] Attempt revalidation without auth
- [ ] Check error messages don't leak details
- [ ] Verify preview mode requires valid secret
- [ ] Test CSRF protection on mutations
- [ ] Load test rate limiting
- [ ] Verify CSP headers properly set

## Notes
- Beta status acknowledged - some issues acceptable for beta but not production
- Focus on data exposure and XSS first (most severe)
- Infrastructure issues (rate limiting, CSP) can wait for post-beta