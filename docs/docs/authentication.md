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