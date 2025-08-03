# Data Fetching

OpenQase v0.4.0 introduces a hybrid data fetching architecture that combines static generation for public content with dynamic patterns for admin functionality.

## 1. Unified Content Fetching (Public Content) 

**NEW in v0.4.0** - Primary pattern for public content pages (`case-study`, `paths/algorithm`, `paths/persona`, `paths/industry`).

* **Context:** Used for all public content pages that need to be statically generated for optimal performance.
* **Mechanism:** Uses the unified content fetching system from `src/lib/content-fetchers.ts` that provides consistent APIs across all content types.
* **Functions:**
  * `getStaticContentWithRelationships()` - Fetches single content item with all relationships
  * `getStaticContentList()` - Fetches content lists for listing pages
  * `generateStaticParamsForContentType()` - Generates static params for build-time generation
* **Benefits:** Eliminates N+1 queries, enables static generation, provides consistent API
* **Example:** See [Unified Content Fetching](./unified-content-fetching.md) for comprehensive documentation

```typescript
// Modern pattern for content pages
import { getStaticContentWithRelationships } from '@/lib/content-fetchers';

export default async function AlgorithmPage({ params }: { params: { slug: string } }) {
  const algorithm = await getStaticContentWithRelationships('algorithms', params.slug);
  
  if (!algorithm) {
    notFound();
  }
  
  // All relationships included in single query
  return <div>{algorithm.name}</div>;
}
```

## 2. Server Components (Admin & Complex Pages)

*   **Context:** Used for admin pages, complex dynamic pages, and initial data loading in `page.tsx` and `layout.tsx` files rendered on the server.
*   **Mechanism:** Server Components can directly use `async/await` to fetch data from Supabase before rendering.
*   **Supabase Client:** Uses server-side Supabase client obtained via `createServerSupabaseClient` from `src/lib/supabase-server.ts`.
*   **Example:** Loading admin forms in `src/app/admin/[content-type]/[id]/page.tsx`, complex dashboard pages.
*   **Caching:** Leverages Next.js data caching. Cache invalidation handled via `revalidatePath` or `revalidateTag` calls within Server Actions.

## 3. Server Actions (Mutations & Admin Operations)

*   **Context:** Used for handling data mutations (Create, Update, Delete) triggered by user interactions in Client Components (e.g., form submissions, admin operations).
*   **Mechanism:** Client Components invoke functions marked with `"use server";` (defined in `actions.ts` files).
*   **Supabase Client:** Uses the **service role client** (`createServiceRoleSupabaseClient`) for elevated privileges required for admin operations.
*   **Example:** The `saveItem`, `publishItem`, `deleteItem` functions in Admin CMS (`src/app/admin/[content-type]/[id]/actions.ts`).
*   **Cache Invalidation:** Server Actions call `revalidatePath` or `revalidateTag` after mutations to update static content.

## 4. Client-Side Fetching (React State)

*   **Context:** Used within Client Components for interactive features:
    *   Dynamic form interactions
    *   Local component state management
    *   Real-time admin interface updates
*   **Mechanism:** Standard React state and effects with Supabase client
*   **Supabase Client:** Uses browser-safe Supabase client (`createBrowserSupabaseClient`) for client-side operations.
*   **Example:** Admin form submissions, relationship selectors, content validation.

## 5. API Routes (Admin & External Integrations)

*   **Context:** Preserved for admin functionality, external integrations, and specific use cases requiring REST endpoints.
*   **Mechanism:** Traditional REST API endpoints in `src/app/api/` that can be called via `fetch`.
*   **Supabase Client:** API Route handlers use server-side Supabase client with appropriate permissions.
*   **Example:** Admin API endpoints (`/api/case-studies`, `/api/algorithms`), external webhooks, third-party integrations.

## Architecture Decision: Hybrid Approach

OpenQase v0.4.0 employs a **hybrid architecture** that optimizes for different use cases:

### Public Content (Static Generation)
- **Pattern:** Unified Content Fetching System
- **Performance:** 50-100ms load times (static files)
- **Content Types:** Case studies, algorithms, personas, industries
- **Benefits:** Maximum performance, SEO optimization, reduced database load

### Admin Content (Dynamic Generation)
- **Pattern:** Server Components + Server Actions + API Routes
- **Performance:** Dynamic, real-time updates
- **Content Types:** Admin forms, dashboards, user management
- **Benefits:** Real-time updates, complex interactions, secure operations

### Migration Status

**✅ Migrated to Unified System (v0.4.0):**
- Case studies (`/case-study/[slug]`)
- Algorithms (`/paths/algorithm/[slug]`)  
- Personas (`/paths/persona/[slug]`)
- Industries (`/paths/industry/[slug]`)

**🔄 Still Using Legacy Patterns:**
- Admin pages (`/admin/*`)
- Blog posts (`/blog/*`)
- Complex interactive features

**Performance Impact:**
- **Before:** 30+ second page loads with multiple database queries
- **After:** 50-100ms static page serving with pre-built relationships
- **Build Time:** All content pages generated at build time

## Best Practices

### For Public Content
1. **Use unified fetching functions** from `src/lib/content-fetchers.ts`
2. **Implement `generateStaticParams`** for static generation
3. **Use on-demand revalidation** via `revalidatePath()` instead of time-based ISR (`export const revalidate`)
4. **Handle null cases** with `notFound()` for missing content

### For Admin Content
1. **Use Server Components** for initial data loading
2. **Implement Server Actions** for mutations with cache invalidation
3. **Use service role client** for elevated privileges
4. **Call `revalidatePath`** after mutations to update static content

### For Interactive Features
1. **Use React state and effects** for client-side state management
2. **Implement proper loading states** and error handling
3. **Use browser client** for client-side operations
4. **Consider performance implications** of client-side fetching

This hybrid approach provides the best of both worlds: blazing-fast static content for users and powerful dynamic capabilities for content management. 