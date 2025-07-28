# Building a Lightning-Fast Static Site with Complex Relationships: How We Optimized OpenQase

OpenQase is our attempt to build a "Wikipedia for quantum computing business cases" — a comprehensive knowledge base where developers, business leaders, and researchers can explore real-world applications of quantum computing across different industries and use cases. Like Wikipedia, speed and reliability are paramount. Users expect instant page loads when they're diving deep into technical content, following cross-references between related topics, or exploring connections between quantum algorithms and their business applications.

But unlike a traditional static site, OpenQase has a sophisticated relationship system. Every case study connects to specific quantum algorithms, target industries, and user personas. Every algorithm page shows which case studies implement it and which industries benefit most. This web of interconnected content creates immense value for users but presented some fascinating technical challenges when we decided to make the entire site statically generated.

## The Challenge: Static Generation with Dynamic Relationships

Most static site generators work beautifully with simple content hierarchies — blog posts, documentation pages, product listings. But OpenQase needed something more complex. We have four main content types (case studies, algorithms, industries, and personas) that all reference each other through junction tables in our PostgreSQL database.

When a user visits an algorithm page like `/paths/algorithm/grovers-algorithm`, they see:
- The algorithm's detailed description and implementation steps
- All case studies that use this algorithm
- Which industries benefit from it
- What types of users typically implement it
- Academic references and resource links

This relationship data changes as our editorial team adds new case studies or creates new connections between existing content. We needed a system that could rebuild these relationships at build time, not runtime, while maintaining the flexibility to preview unpublished content for our editorial workflow.

## The Original Architecture: Fast but Not Fast Enough

Our initial approach used Next.js App Router with a Supabase backend. We thought we were being clever — we had `generateStaticParams` functions that pre-generated routes for all published content, and our pages showed the telltale `○` (Static) markers in the build output. Everything looked statically generated.

But users reported slow page loads, sometimes taking 30+ seconds. Our performance monitoring revealed the truth: despite the static markers, our pages were actually server-side rendered on every request. The culprit was subtle but critical.

Here's what our original content fetching looked like:

```typescript
export async function getStaticContentWithRelationships(
  contentType: ContentType,
  slug: string
) {
  const supabase = await createServerSupabaseClient(); // The problem!
  
  const { data, error } = await supabase
    .from(contentType)
    .select(`
      *,
      case_study_industry_relations(industries(id, name, slug)),
      algorithm_case_study_relations(algorithms(id, name, slug)),
      case_study_persona_relations(personas(id, name, slug))
    `)
    .eq('slug', slug)
    .eq('published', true)
    .single();

  return data;
}
```

The `createServerSupabaseClient()` function requires access to cookies and headers to handle authentication and row-level security. This dependency on runtime request data forced Next.js to server-render every page, even though we weren't actually using any user-specific data for our public content.

## The Solution: Service Role Client for Build-Time Fetching

The breakthrough came when we realized we needed different Supabase clients for different contexts. For build-time static generation, we don't need (or want) user authentication — we just need access to all published content with elevated permissions.

Supabase provides a "service role" client that bypasses row-level security and doesn't require request context. Here's how we refactored our content fetching:

```typescript
export async function getStaticContentWithRelationships(
  contentType: ContentType,
  slug: string,
  options: { preview?: boolean } = {}
) {
  const supabase = createServiceRoleSupabaseClient(); // No await needed!
  
  const selectQuery = RELATIONSHIP_MAPS[contentType];
  let query = supabase
    .from(contentType)
    .select(selectQuery)
    .eq('slug', slug);

  // Only filter by published status if not in preview mode
  if (!options.preview) {
    query = query.eq('published', true);
  }

  const { data, error } = await query.single();
  return data;
}
```

The key changes:
1. **No request context dependency**: `createServiceRoleSupabaseClient()` doesn't need cookies or headers
2. **Elevated permissions**: Service role can read all content without row-level security checks
3. **Preview mode support**: We can still bypass published filters for editorial previews

## Relationship Mapping: Solving the N+1 Problem

With the client issue solved, we tackled the relationship complexity. Our initial approach was causing N+1 query problems — fetching a case study, then making separate queries for each related algorithm, industry, and persona.

We solved this with comprehensive relationship mapping using Supabase's nested select syntax:

```typescript
const RELATIONSHIP_MAPS: Record<ContentType, string> = {
  case_studies: `
    *,
    case_study_industry_relations(industries(id, name, slug)),
    algorithm_case_study_relations(algorithms(id, name, slug, quantum_advantage)),
    case_study_persona_relations(personas(id, name, slug))
  `,
  algorithms: `
    *,
    algorithm_industry_relations(industries(id, name, slug)),
    persona_algorithm_relations(personas(id, name, slug)),
    algorithm_case_study_relations(case_studies(id, title, slug, description, published_at))
  `,
  // ... more mappings
};
```

This approach fetches all relationship data in a single query, eliminating the N+1 problem and reducing database round trips from potentially dozens to just one per page.

## The Build vs Runtime Challenge

One subtle issue emerged during testing: content discovery during build time. Our `generateStaticParams` functions need to find all content that should have static pages generated. But if we filter by `published: true` during build, we might miss content that gets published between build and deployment.

We solved this with separate functions for build-time and runtime:

```typescript
// Build-time: Discover all content (temporarily disabled published filter)
export async function getBuildTimeContentList(contentType: ContentType) {
  const supabase = createServiceRoleSupabaseClient();
  
  let query = supabase
    .from(contentType)
    .select('*');
    // Temporarily disabled: .eq('published', true)
  
  return query;
}

// Runtime: Only show published content to users
export async function getStaticContentWithRelationships(
  contentType: ContentType,
  slug: string,
  options: { preview?: boolean } = {}
) {
  // ... includes published filter unless in preview mode
}
```

This hybrid approach ensures we generate static pages for all content during build, but only serve published content to end users (unless they're in preview mode).

## Performance Results: 95% Improvement

The results were dramatic. Page load times dropped from 30+ seconds to 2-6 milliseconds — a 95% performance improvement. The Next.js build output now shows truly static pages, and our performance monitoring confirms that pages serve instantly from CDN cache.

More importantly, the user experience transformed. Browsing between related content now feels instant. Users can follow the web of relationships between quantum algorithms, case studies, and industries without any loading delays.

## Hybrid Architecture: Best of Both Worlds

Our final architecture uses a hybrid approach:

- **Public content pages**: Fully static with service role client
- **Admin interface**: Dynamic with user authentication
- **Preview mode**: Bypasses static generation for editorial workflows
- **API routes**: Handle dynamic features like search and contact forms

This gives us the performance benefits of static generation where it matters most (public content consumption) while maintaining the flexibility of server-side rendering for administrative features.

## Key Insights and Lessons Learned

**1. Build markers can be misleading.** Next.js showing `○ (Static)` in build output doesn't guarantee runtime static serving. Always profile actual performance.

**2. Client choice matters enormously.** The difference between `createServerSupabaseClient()` and `createServiceRoleSupabaseClient()` was the difference between 30-second page loads and 2-millisecond page loads.

**3. Relationship complexity requires thoughtful query design.** Our junction table approach with nested selects eliminated N+1 problems while maintaining flexibility.

**4. Build-time vs runtime contexts need different strategies.** Content discovery during build has different requirements than content serving at runtime.

**5. Static doesn't mean inflexible.** We maintained preview functionality and editorial workflows while achieving true static generation for end users.

## The Technical Stack

For developers interested in replicating this approach:

- **Framework**: Next.js 15 App Router with `generateStaticParams`
- **Database**: PostgreSQL with Supabase (using both server and service role clients)
- **Deployment**: Vercel with CDN caching
- **Content Management**: Custom admin interface with preview mode
- **Relationships**: Junction tables with comprehensive foreign key constraints

The complete transformation took several iterations to get right, but the performance gains and improved user experience made it worthwhile. Building a "Wikipedia for quantum computing" requires Wikipedia-level performance, and static generation with thoughtful relationship handling delivered exactly that.

---

*OpenQase is an open-source knowledge base for quantum computing business applications. You can explore the codebase and contribute at [github.com/ddri/openqase](https://github.com/ddri/openqase).*