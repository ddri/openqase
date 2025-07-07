# Authentication

Authentication and authorization are handled using a combination of Next.js Middleware, Supabase Auth, and helper utilities.

## Core Mechanism: Next.js Middleware

*   **File:** `src/middleware.ts`
*   **Functionality:** This middleware intercepts requests to specific routes defined in its `config.matcher` array before they reach the page or API handler.
*   **Session Management:** It utilizes the `updateSession` helper (imported from `@/lib/supabase-middleware`) which likely uses the `@supabase/ssr` package to manage user sessions securely across Server Components, Client Components, and Route Handlers by handling cookies.

## Route Protection

The middleware defines different levels of protection:

1.  **General Protected Routes:**
    *   Defined in the `protectedRoutes` array (e.g., `/paths`, `/case-study`, `/profile`).
    *   The `updateSession` helper (from `@supabase/ssr`) automatically handles redirecting unauthenticated users accessing these routes, typically sending them to a login page (e.g., `/auth`).

2.  **Admin Routes:**
    *   Defined in the `adminRoutes` array (`/admin`).
    *   **Requires Authentication:** Users must first be logged in. If not, they are redirected to `/auth?redirectTo=/admin`.
    *   **Requires 'admin' Role:** After confirming authentication, the middleware specifically checks if the logged-in user has the `admin` role.
        *   It fetches the user's session using a server-side Supabase client (`createServerSupabaseClient` from `@/lib/supabase`).
        *   It queries the `user_preferences` table in Supabase, filtering by the user's ID (`session.user.id`).
        *   It checks if the `role` column in `user_preferences` is equal to `'admin'`.
        *   If the user is not found in `user_preferences` or their role is not `'admin'`, they are redirected to the homepage (`/`).

## Authentication UI

*   User interface components for login, signup, password reset, etc., are likely located within the `src/app/auth/` directory.
*   These pages probably utilize Supabase UI components (`@supabase/auth-ui-react`) or custom forms that interact with Supabase Auth client methods (`supabase.auth.signInWithPassword`, `supabase.auth.signUp`, etc.).
*   The `/auth/callback` route is specifically handled by the middleware to process the redirect after successful authentication via third-party providers or email links.

## Supabase Auth Integration

*   The application relies heavily on [Supabase Authentication](https://supabase.com/docs/guides/auth).
*   User identities, sessions, and potentially user metadata are stored and managed within Supabase.
*   Different Supabase client helpers (`supabase-browser`, `supabase-server`, `supabase-middleware`) are likely used depending on the context (Client Component, Server Component, Middleware) to interact with Supabase Auth. See the [Supabase Integration](./supabase-integration.md) guide for more details on client usage.

# Authentication & Authorization

OpenQase uses Supabase Auth for user authentication with a two-tier security architecture.

## Architecture Overview

### Two-Tier Security Model

OpenQase implements a **dual security approach** that separates admin operations from public API access:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Admin Routes  │ -> │   Service Role   │ -> │  Bypass All RLS │
│   /admin/*      │    │   Client         │    │  Full Access    │
└─────────────────┘    └──────────────────┘    └─────────────────┘

┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  Public Routes  │ -> │  Regular Client  │ -> │   RLS Policies  │
│  /api/*         │    │  + User Session  │    │ Granular Access │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Why This Architecture?

**Admin Operations (Service Role):**
- Maximum permissions for content management
- Bypasses all Row Level Security (RLS) policies
- Used by admin forms, publishing, content creation
- Requires admin route authentication via middleware

**Public Operations (RLS Policies):**
- Granular permissions for end users
- Secure access to published content only
- Used by public APIs and content display
- Filtering and access control via database policies

## Admin Authentication

### Route Protection

Admin routes (`/admin/*`) are protected by:

1. **Middleware authentication check** (`src/middleware.ts`)
2. **Admin role verification** in `user_preferences` table
3. **Development mode bypass** via `NEXT_PUBLIC_DEV_MODE=true`

### Service Role Usage

All admin Server Actions use the service role client:

```typescript
// Admin operations
const supabase = createServiceRoleSupabaseClient();
```

This client:
- ✅ **Bypasses all RLS policies**
- ✅ **Has full database access**
- ✅ **Used only in secure server-side operations**

## RLS Policies & Known Issues

### Current Policy Status

**Published Content (Working):**
```sql
CREATE POLICY "Public can view published content"
  ON table_name FOR SELECT
  USING (published = true);
```

**Admin Policies (Unused):**
```sql
-- These policies exist but are NOT used by admin operations
CREATE POLICY "Admins can manage content"
  ON table_name FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');  -- ⚠️ Broken but unused
```

### Why Admin Policies Are Broken (But OK)

**The Issue:**
- RLS policies check `auth.jwt() ->> 'role' = 'admin'`
- But admin role is stored in `user_preferences` table, not JWT
- This would fail for admin users using regular client

**Why It Doesn't Matter:**
- Admin operations use **service role client** which bypasses ALL RLS
- These policies are never actually executed for admin operations
- Public operations don't need admin privileges

### Future Considerations

If we ever need consistent admin access through public APIs:

1. **Option A:** Update RLS policies to check `user_preferences` table
2. **Option B:** Add role to JWT claims via Supabase Auth hooks
3. **Option C:** Remove unused admin RLS policies entirely

For now, the current architecture works well and provides clear separation of concerns.

## User Authentication

### Session Management

- JWT tokens managed by Supabase Auth
- Automatic refresh via middleware
- Secure cookie storage
- Session validation on protected routes

### User Roles

Currently supports:
- **Regular users** - Can view published content
- **Admin users** - Full content management access

Role stored in `user_preferences.role` field.

## Environment Variables

Required authentication environment variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Development Mode (bypasses admin auth)
NEXT_PUBLIC_DEV_MODE=false

# Content Access Control
REQUIRE_AUTH_FOR_CONTENT=false
NEXT_PUBLIC_REQUIRE_AUTH_FOR_CONTENT=false
```

## Security Best Practices

1. **Never expose service role key** to client-side code
2. **Use middleware** for route-level protection
3. **Validate user roles** before admin operations
4. **Keep RLS policies simple** and focused on public access
5. **Document security architecture** clearly

---

*Last updated: v0.3.0 - Two-tier security model documented* 