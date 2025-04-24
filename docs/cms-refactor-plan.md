# CMS Refactoring Plan (April 2025)

## Goal

To standardize, simplify, and modernize the `/admin` CMS architecture by leveraging current Next.js best practices, improving developer experience, enhancing type safety, and preparing for future scalability.

## Current Architecture Summary

*   **Framework:** Next.js (App Router)
*   **Structure:**
    *   Admin UI: `src/app/admin/[content-type]/` (Server + Client Components)
    *   API Routes: `src/app/api/[content-type]/` (Called by client components)
    *   Public Pages: Fetch published content directly.
*   **Data Layer:** Supabase
*   **Core Logic:** `src/utils/content-management.ts` (Generic CRUD functions)
*   **Supabase Clients:** Multiple utility locations (`src/utils/supabase/*`, `src/lib/supabase*.ts`)
*   **Authentication:** Middleware (`src/middleware.ts`)
*   **Publishing:** Boolean `published` flag.
*   **Relationships:** Junction tables via `content-management.ts`.

## Weaknesses / Areas for Improvement

*   Redundant API layer (vs. Server Actions).
*   Lack of input validation (Zod).
*   Scalability concerns (pagination, basic publishing).
*   Developer Experience issues (duplicate Supabase utils, manual cache invalidation).
*   Incomplete standardization efforts.

## Proposed Refactoring Steps

1.  **Consolidate Supabase Utilities:**
    *   Analyze `src/utils/supabase/*` and `src/lib/supabase*.ts`.
    *   Merge into a single module (`src/lib/supabase.ts`).
    *   Define clear helpers (e.g., `getSupabaseServerClient`, `getSupabaseServiceClientRole`, `getSupabaseBrowserClient`).
    *   Update all imports codebase-wide.
2.  **Implement Server Actions:**
    *   Refactor admin forms (`client.tsx` etc. in `src/app/admin/[content-type]/[id]/`).
    *   Replace client-side `fetch` with Server Actions.
    *   Server Actions contain direct Supabase calls using `createServiceRoleSupabaseClient`.
    *   Remove redundant API routes (`src/app/api/[content-type]/`).

    > **Implementation Note (April 2025):** We initially considered having Server Actions call `content-management.ts` functions, but encountered issues with mixing client and server contexts. The `content-management.ts` utility tries to serve both contexts, which causes problems with the "next/headers" import restriction in Next.js. For consistency and simplicity, we decided to have Server Actions contain direct Supabase calls, following the pattern already established in the case studies and blog posts implementations.
3.  **Add Input Validation:**
    *   Define Zod schemas for each content type.
    *   Use schemas in Server Actions to parse/validate form data.
4.  **Implement Next.js Caching & Revalidation:**
    *   Use `revalidatePath` / `revalidateTag` in Server Actions after successful mutations.
    *   Ensure list pages (`src/app/admin/[content-type]/page.tsx`) use appropriate caching strategies (`export const dynamic = 'force-dynamic';` or tag-based).
5.  **Standardize Admin Components:**
    *   ✅ Redesign admin forms to use a single-page approach with sections instead of tabs
    *   ✅ Remove autosave functionality in favor of explicit Save button
    *   ✅ Implement proper redirection after creating new content
    *   Apply this pattern to all content types:
        * ✅ Personas (completed)
        * ✅ Algorithms (completed)
        * ✅ Industries (completed)
        * ⬜ Case Studies (pending)
        * ✅ Blog Posts (completed)

## Implementation Notes (April 2025)

### Single-Page Form Pattern

We've successfully implemented a new form pattern for the admin interface that:

1. **Displays all fields on a single page** with clear section cards
2. **Eliminates autosave on tab changes** that was causing duplicate slug errors
3. **Uses explicit Save and Publish buttons** for better user control
4. **Properly handles the creation workflow** with redirection after creating new content

This pattern has been implemented for Personas, Algorithms, Industries, and Blog Posts to ensure consistency and reliability throughout the admin interface.

### Blog Display Fixes

We've fixed issues with the blog display pages:

1. **Updated Supabase client function calls**:
   * Changed `createServerClient` to `createServerSupabaseClient` in both the blog list page and individual blog post pages
   * Fixed import paths to use relative paths instead of aliases that were causing TypeScript errors
   * This resolved the "TypeError: createServerClient is not defined" errors that were preventing blog posts from displaying

### Next Steps

1. Apply the single-page form pattern to:
   * ✅ Algorithms admin (completed)
   * ✅ Industries admin (completed)
   * ⬜ Case Studies admin (pending)
   * ✅ Blog Posts admin (completed)

2. Ensure proper handling of relationships for each content type:
   * ✅ Algorithms ↔ Case Studies
   * ✅ Algorithms ↔ Industries
   * ⬜ Case Studies ↔ Related Case Studies
   * ✅ Blog Posts ↔ Related Blog Posts

3. ✅ Test the publishing workflow for each content type to ensure it works correctly
6.  **(Optional) Enhance Publishing Workflow:**
    *   Migrate schema: `published boolean` -> `status text` ('draft', 'review', 'published').
    *   Update logic and UI to handle statuses.
7.  **(Future) Address Scalability & Features:**
    *   Server-side pagination/infinite scroll for admin lists.
    *   Integrate Supabase Storage for image uploads.
    *   Add full-text search.

## Visualized Flow (with Server Actions)

```mermaid
graph TD
    subgraph Admin UI (src/app/admin/[type]/[id])
        A[React Server Component (page.tsx - Loads initial data)] --> B(Client Component with Form);
        B -- User Interaction --> C{Server Action (e.g., saveItem)};
    end

    subgraph Server-Side Logic
        C -- Validates Input (Zod) --> D[Calls Supabase (via consolidated src/lib/supabase.ts)];
        D -- Saves to DB --> E[Database];
        C -- On Success --> F(revalidatePath / revalidateTag);
    end

    F --> G(Admin List Page Reloads with Fresh Data);

    style B fill:#ccf,stroke:#333,stroke-width:2px
    style C fill:#f9f,stroke:#333,stroke-width:2px