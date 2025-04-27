# CMS Refactoring Plan (April 2025)

## Goal

To standardize, simplify, and modernize the `/admin` CMS architecture by leveraging current Next.js best practices, improving developer experience, enhancing type safety, and preparing for future scalability.

## Current Architecture Summary

*   **Framework:** Next.js 15 (App Router)
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

*   Redundant API layer (vs. Server Actions). We are removing the API layer once safe to do so.
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
        * ✅ Case Studies (completed)
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

### API Route Deprecation Progress

We're actively working to deprecate API routes in favor of Server Actions and direct Supabase calls in Server Components (SSR), as outlined in the refactoring plan:

1. **Fixed Case Studies Display Issues**:
   * Updated content-management.ts to correctly import createBrowserSupabaseClient from @/lib/supabase-browser
   * Modified industry, algorithm, and persona pages to use direct Supabase calls instead of API routes
   * Added proper type assertions and mappings to handle TypeScript errors with junction tables
   * This resolved the "TypeError: serviceClient.from is not a function" errors

2. **Updated Case Studies Admin Interface**:
   * Replaced tabbed interface with single-page scrollable form
   * Removed autosave functionality that was causing duplicate slug errors
   * Implemented Server Actions for saving, publishing, and unpublishing case studies
   * Added proper handling of relationships with industries, algorithms, and personas

3. **Removed Unused Legacy Code**:
   * Removed `src/app/admin/algorithms/[id]/client-standardized.tsx` which was causing type errors but wasn't being used
   * Removed `src/app/api/user/preferences/route.ts` which was trying to import a non-existent `getCurrentUser` function
   * Fixed `createServiceRoleSupabaseClient()` usage in case-studies API route by adding the `await` keyword
   * These changes resolved build errors while aligning with our plan to deprecate API routes

4. **Next Steps for API Route Deprecation**:
   * Continue replacing API route usage with direct Supabase calls in Server Components
   * Implement Server Actions for any remaining admin interfaces
   * Eventually remove redundant API routes once all client-side fetch calls are replaced

### Next Steps

1. Apply the single-page form pattern to:
   * ✅ Algorithms admin (completed)
   * ✅ Industries admin (completed)
   * ✅ Case Studies admin (completed)
   * ✅ Blog Posts admin (completed)

2. Ensure proper handling of relationships for each content type:
   * ✅ Algorithms ↔ Case Studies
   * ✅ Algorithms ↔ Industries
   * ✅ Case Studies ↔ Industries
   * ✅ Case Studies ↔ Algorithms
   * ✅ Case Studies ↔ Personas
   * ✅ Blog Posts ↔ Related Blog Posts

3. ✅ Test the publishing workflow for each content type to ensure it works correctly

### Standardized Relationship Handling

After analyzing the different approaches used across content types, we've decided to standardize on the following approach for handling relationships:

1. **Use Junction Tables** for all many-to-many relationships
   - This provides better scalability and flexibility than storing arrays directly in records
   - Each relationship type should have its own junction table (e.g., `algorithm_case_study_relations`)

2. **Use ID-based RelationshipSelectors**
   - All RelationshipSelector components should use `itemValueKey="id"`
   - This provides direct handling without needing conversion between slugs and IDs
   - This approach is already used in Case Studies and Blog Posts

3. **Direct ID Handling in Server Actions**
   - Server Actions should directly use the IDs from the form values
   - No need for slug-to-ID conversion logic

This standardization will be applied to all content types, including updating the Algorithms admin interface to match this pattern.

**Note about Industries**: The Industries content type doesn't currently have any relationships to manage (it's only referenced by other content types). If relationships are added to Industries in the future, they should follow this standardized approach.

### Implementation Plan for Relationship Standardization

To ensure consistent relationship handling across all content types, we'll follow this implementation plan:

1. **Audit Current Implementation**
   - ✅ Analyze how each content type handles relationships
   - ✅ Document the differences and decide on a standard approach
   - ✅ Update cms-refactor-plan.md with the standardized approach

2. **Update Algorithms Admin Interface**
   - ✅ Modify `src/app/admin/algorithms/[id]/client.tsx` to use "id" as itemValueKey in RelationshipSelectors
   - ✅ Update `src/app/admin/algorithms/[id]/actions.ts` to remove slug-to-ID conversion logic
   - ✅ Test the updated implementation thoroughly

3. **Verify Case Studies Implementation**
   - ✅ Confirm that Case Studies is already using the standardized approach
   - ✅ Fix any bugs in the Case Studies relationship handling

4. **Verify Blog Posts Implementation**
   - ✅ Confirm that Blog Posts is already using the standardized approach
   - ✅ Test the Blog Posts relationship handling

5. **Update Personas Implementation**
   - ✅ Evaluate if Personas should be migrated to use junction tables
   - ✅ Create persona_industry_relations junction table
   - ✅ Update RelationshipSelector to use "id" as itemValueKey
   - ✅ Update page.tsx to fetch relationships from junction table
   - ✅ Update actions.ts to handle relationships using junction table

6. **Fix Case Studies Implementation**
   - ✅ Update page.tsx to fetch relationships from the correct junction tables
   - ✅ Add relationship IDs to the caseStudy object before passing to the form

7. **Documentation and Knowledge Sharing**
   - [ ] Document the standardized approach in a developer guide
   - [ ] Create examples of proper relationship handling for future reference
   - [ ] Share the standardized approach with the team

This standardization will ensure consistent, maintainable code across all content types and make future development more efficient.

### Remaining Tasks

1. **Complete Documentation and Knowledge Sharing**:
   - Document the standardized approach in a developer guide
   - Create examples of proper relationship handling for future reference
   - Share the standardized approach with the team

2. **Continue API Route Deprecation**:
   - Replace remaining API routes with Server Actions
   - Ensure all createServiceRoleSupabaseClient() calls are properly awaited
   - Remove redundant API routes once all client-side fetch calls are replaced
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