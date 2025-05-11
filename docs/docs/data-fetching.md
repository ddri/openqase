# Data Fetching

OpenQase employs several strategies for fetching data, primarily leveraging Next.js App Router features and Supabase.

## 1. Server Components (Primary Read Pattern)

*   **Context:** Used for initial data loading in `page.tsx` and `layout.tsx` files rendered on the server.
*   **Mechanism:** Server Components can directly use `async/await` to fetch data from Supabase before rendering.
*   **Supabase Client:** Typically uses a server-side Supabase client obtained via helpers like `createServerSupabaseClient` (likely from `src/lib/supabase.ts` or `src/lib/supabase-server.ts`). This client uses the user's session cookie or service role keys where appropriate.
*   **Example:** Loading a list of blog posts in `src/app/blog/page.tsx` or a single case study in `src/app/case-study/[slug]/page.tsx`. Fetching initial data for admin forms in `src/app/admin/[content-type]/[id]/page.tsx`.
*   **Caching:** Leverages Next.js data caching. Cache invalidation is typically handled via `revalidatePath` or `revalidateTag` calls within Server Actions after data mutations. Pages can also opt-out of caching using `export const dynamic = 'force-dynamic';`.

## 2. Server Actions (Mutations & Some Reads)

*   **Context:** Used for handling data mutations (Create, Update, Delete) triggered by user interactions in Client Components (e.g., form submissions). Can also be used for server-side data fetching triggered from the client if needed, though less common for reads than Server Components.
*   **Mechanism:** Client Components invoke functions marked with `"use server";` (defined in `.ts` files, often `actions.ts`). These functions execute securely on the server.
*   **Supabase Client:** Typically uses the **service role client** (`createServiceRoleSupabaseClient` via helpers like `getSupabaseServiceClientRole` from `src/lib/supabase.ts`) to perform actions requiring elevated privileges, like writing to the database.
*   **Example:** The `saveItem`, `publishItem`, `deleteItem` functions used in the Admin CMS (`src/app/admin/[content-type]/[id]/actions.ts`).
*   **Cache Invalidation:** Server Actions are responsible for calling `revalidatePath` or `revalidateTag` after successful mutations to ensure data displayed by Server Components is updated.

## 3. Client-Side Fetching (TanStack Query)

*   **Context:** Used within Client Components (`"use client";`) for scenarios requiring client-side data fetching or state management, such as:
    *   Fetching data based on user interaction *after* the initial page load.
    *   Implementing features like pagination, infinite scrolling, or dynamic filtering on the client.
    *   Managing complex client-side state derived from fetched data.
*   **Mechanism:** Uses the [TanStack Query (React Query)](https://tanstack.com/query/latest) library (`@tanstack/react-query`) to manage fetching, caching, synchronization, and background updates of server state.
*   **Supabase Client:** Queries typically use the browser-safe Supabase client (`createBrowserSupabaseClient` via helpers like `getSupabaseBrowserClient` from `src/lib/supabase-browser.ts`) to fetch data directly from the client.
*   **Example:** Potentially used in interactive dashboards, complex search interfaces, or components requiring frequent data re-fetching based on client state. *(Actual usage needs confirmation from component code).*

## 4. API Routes (Legacy/Specific Cases)

*   **Context:** While the project aims to use Server Actions, traditional API routes might still exist in `src/app/api/` for specific use cases or legacy reasons.
*   **Mechanism:** Client Components use `fetch` or libraries like `src/lib/api-client.ts` to make requests to these endpoints.
*   **Supabase Client:** API Route handlers (`route.ts`) would typically use a server-side Supabase client.
*   **Example:** Potentially used for endpoints called by external services or for functionalities not yet migrated to Server Actions.

In summary, Server Components handle the bulk of initial data loading, Server Actions handle mutations and subsequent cache invalidation, and TanStack Query provides robust client-side data fetching capabilities where needed. 