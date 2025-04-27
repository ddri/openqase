# Supabase Integration

OpenQase uses Supabase for its database, authentication, and potentially other backend services. Interaction with Supabase is managed through a set of helper utilities located in `src/lib/`, designed to provide the correct Supabase client instance depending on the execution context (Server Component, Client Component, Server Action, Middleware, API Route).

This setup primarily leverages the `@supabase/ssr` package, which provides helpers to securely manage sessions and create Supabase clients across different Next.js rendering environments.

## Key Utility Files & Clients

While the original refactor plan aimed to consolidate into `src/lib/supabase.ts`, the current structure appears to use several specialized files, likely wrappers around `@supabase/ssr` helpers:

1.  **`src/lib/supabase-server.ts` (or similar helpers in `src/lib/supabase.ts`): Server-Side Client Creation**
    *   **Purpose:** Used to create Supabase client instances within server-side contexts where cookies can be accessed.
    *   **Contexts:**
        *   React Server Components (`page.tsx`, `layout.tsx`)
        *   Server Actions (`actions.ts`)
        *   API Route Handlers (`route.ts`)
    *   **Likely Helpers:** Exports functions like `createServerSupabaseClient` or `getSupabaseServerClient`. These functions internally use `createServerClient` from `@supabase/ssr`, reading cookies from the request context to authenticate the user.
    *   **Service Role Client:** May also export a helper like `createServiceRoleSupabaseClient` or `getSupabaseServiceClientRole` for use **strictly within Server Actions or trusted server environments** where elevated privileges are needed (e.g., bypassing RLS for admin tasks). This client uses the `SUPABASE_SERVICE_ROLE_KEY` environment variable. **Use with extreme caution.**

2.  **`src/lib/supabase-browser.ts`: Client-Side Client Creation**
    *   **Purpose:** Used to create a Supabase client instance intended for use within the browser (Client Components).
    *   **Contexts:**
        *   Client Components (`"use client";`)
    *   **Likely Helpers:** Exports a function like `createBrowserSupabaseClient` or `getSupabaseBrowserClient`. This likely uses `createBrowserClient` from `@supabase/ssr`.
    *   **Authentication:** This client uses the public `NEXT_PUBLIC_SUPABASE_ANON_KEY` and relies on the browser's cookies (managed by `@supabase/ssr` via middleware/server components) for user authentication. It cannot perform service role actions.

3.  **`src/lib/supabase-middleware.ts`: Middleware Client & Session Management**
    *   **Purpose:** Specifically designed for use within Next.js Middleware (`src/middleware.ts`).
    *   **Likely Helpers:** Exports functions like `createMiddlewareClient` and crucially `updateSession`.
    *   **Functionality:**
        *   `createMiddlewareClient` (using `@supabase/ssr`) creates a client suitable for reading/writing cookies within the middleware context.
        *   `updateSession` is a key function from `@supabase/ssr` that reads the request cookies, refreshes the session if necessary, and writes the updated session cookies back to the response. This ensures session consistency across the application.

4.  **`src/lib/supabase.ts`: Potential Central Hub?**
    *   **Purpose:** This file might act as a central export point for clients/helpers from the other files, or it might contain the primary implementation that the others wrap. Needs inspection to confirm its exact role relative to the others. *(Based on the refactor plan, this was intended to be the sole source, but the presence of the other files suggests a more distributed setup currently).*

## Usage Guidelines

*   **Server Components/API Routes (Read Operations):** Use the **server-side client** (`createServerSupabaseClient`) configured to use the user's session.
*   **Server Actions (Mutations/Admin Operations):** Use the **service role client** (`createServiceRoleSupabaseClient`) if elevated privileges are needed. Use the standard server-side client if only user-level permissions are required.
*   **Client Components (Browser):** Use the **browser client** (`createBrowserSupabaseClient`).
*   **Middleware:** Use the **middleware client** (`createMiddlewareClient`) and the `updateSession` helper.

Always import the Supabase client creation functions from these designated utility files rather than directly using `@supabase/ssr` or `@supabase/supabase-js` to ensure consistent setup and session handling. 