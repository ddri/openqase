# Unified Content Fetching System

OpenQase v0.4.0 introduces a unified content fetching system that standardizes data retrieval patterns across all content types while enabling static site generation for optimal performance.

## Overview

The unified content fetching system provides a consistent API for retrieving content with relationships, replacing the previous pattern of direct Supabase calls scattered throughout the codebase. This system eliminates N+1 query problems and enables static site generation.

## Core Functions

### `getStaticContentWithRelationships<T>(contentType, slug, options?)`

Fetches a single content item with all its relationships in a single database query.

**Parameters:**
- `contentType`: One of `'case_studies' | 'algorithms' | 'personas' | 'industries' | 'blog_posts'`
- `slug`: The slug identifier for the content item
- `options`: Optional configuration object with `preview?: boolean`

**Returns:** The content item with all relationships populated, or `null` if not found

**Example:**
```typescript
// In a page.tsx file
import { getStaticContentWithRelationships } from '@/lib/content-fetchers';

export default async function AlgorithmPage({ params }: { params: { slug: string } }) {
  const algorithm = await getStaticContentWithRelationships('algorithms', params.slug);
  
  if (!algorithm) {
    notFound();
  }
  
  // algorithm now includes all relationships:
  // - algorithm_industry_relations
  // - persona_algorithm_relations  
  // - algorithm_case_study_relations
  
  return <div>{algorithm.name}</div>;
}
```

### `getStaticContentList<T>(contentType, options?)`

Fetches a list of content items for listing pages.

**Parameters:**
- `contentType`: One of `'case_studies' | 'algorithms' | 'personas' | 'industries' | 'blog_posts'`
- `options`: Optional configuration object with filtering and sorting options

**Returns:** Array of content items

**Example:**
```typescript
// In a listing page
import { getStaticContentList } from '@/lib/content-fetchers';

export default async function AlgorithmsPage() {
  const algorithms = await getStaticContentList('algorithms');
  
  return (
    <div>
      {algorithms.map(algorithm => (
        <div key={algorithm.id}>{algorithm.name}</div>
      ))}
    </div>
  );
}
```

### `generateStaticParamsForContentType(contentType)`

Generates static params for **published content only** to enable static site generation.

**Parameters:**
- `contentType`: One of `'case_studies' | 'algorithms' | 'personas' | 'industries' | 'blog_posts'`

**Returns:** Array of `{ slug: string }` objects for published content

**Behavior (v0.4.1 Update):**
- Only returns slugs for `published: true` content
- Prevents build warnings from unpublished content
- Unpublished content can still be previewed via direct URLs (rendered dynamically)

**Example:**
```typescript
// In a [slug]/page.tsx file
import { generateStaticParamsForContentType } from '@/lib/content-fetchers';

export async function generateStaticParams() {
  // Only builds static pages for published algorithms
  return generateStaticParamsForContentType('algorithms');
}
```

### `getBuildTimeContentList<T>(contentType, options?)`

Fetches ALL content (published and unpublished) using service role client.

**Use Case:** Admin operations, batch processing, content management. Not used for static generation.

**Note:** For static page generation, use `generateStaticParamsForContentType()` which filters to published content only.

## Relationship Mapping

The system automatically includes relationships for each content type:

### Case Studies
```typescript
case_study_industry_relations(industries(id, name, slug))
algorithm_case_study_relations(algorithms(id, name, slug, quantum_advantage, difficulty))
case_study_persona_relations(personas(id, name, slug))
```

### Algorithms
```typescript
algorithm_industry_relations(industries(id, name, slug))
persona_algorithm_relations(personas(id, name, slug))
algorithm_case_study_relations(case_studies(id, title, slug, description, published_at))
```

### Personas
```typescript
persona_industry_relations(industries(id, name, slug))
persona_algorithm_relations(algorithms(id, name, slug, difficulty))
case_study_persona_relations(case_studies(id, title, slug, description, published_at))
```

### Industries
```typescript
algorithm_industry_relations(algorithms(id, name, slug, use_cases))
case_study_industry_relations(case_studies(id, title, slug, description, published_at))
persona_industry_relations(personas(id, name, slug))
```

## Performance Benefits

### Before (Direct Supabase Calls)
```typescript
// ❌ Old pattern - multiple queries, N+1 problems
const { data: algorithm } = await supabase
  .from('algorithms')
  .select('*')
  .eq('slug', slug)
  .single();

// Separate query for each relationship
const { data: industries } = await supabase
  .from('algorithm_industry_relations')
  .select('industries(*)')
  .eq('algorithm_id', algorithm.id);

// More queries for case studies, personas, etc.
```

### After (Unified Fetching)
```typescript
// ✅ New pattern - single query with all relationships
const algorithm = await getStaticContentWithRelationships('algorithms', slug);
// All relationships included in one query
```

### Performance Improvements
- **Query Reduction**: From 3-5 queries per page to 1 query
- **Load Time**: 30+ seconds → 50-100ms (static generation)
- **Build Time**: All relationships fetched efficiently during build
- **Static Generation**: Enables full static site generation

## Migration Guide

### Page Components

**Before:**
```typescript
// ❌ Old pattern
export const revalidate = 300;

export default async function AlgorithmPage({ params }: { params: { slug: string } }) {
  const supabase = await createServerSupabaseClient();
  
  const { data: algorithm } = await supabase
    .from('algorithms')
    .select('*, algorithm_industry_relations(industries(*))')
    .eq('slug', params.slug)
    .single();
    
  // Manual relationship fetching...
}
```

**After:**
```typescript
// ✅ New pattern
export default async function AlgorithmPage({ params }: { params: { slug: string } }) {
  const algorithm = await getStaticContentWithRelationships('algorithms', params.slug);
  
  if (!algorithm) {
    notFound();
  }
  
  // All relationships available directly
  const relatedIndustries = algorithm.algorithm_industry_relations;
}
```

### Static Params Generation

**Before:**
```typescript
// ❌ Old pattern
export async function generateStaticParams() {
  const supabase = createServiceRoleSupabaseClient();
  
  const { data: algorithms } = await supabase
    .from('algorithms')
    .select('slug')
    .eq('published', true);

  return algorithms?.map((algorithm) => ({
    slug: algorithm.slug,
  })) || [];
}
```

**After:**
```typescript
// ✅ New pattern
export async function generateStaticParams() {
  return generateStaticParamsForContentType('algorithms');
}
```

### Listing Pages

**Before:**
```typescript
// ❌ Old pattern
async function getAlgorithms() {
  const supabase = await createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('algorithms')
    .select('*')
    .eq('published', true)
    .order('name');

  if (error) {
    console.error('Error fetching algorithms:', error);
    return [];
  }

  return data;
}
```

**After:**
```typescript
// ✅ New pattern
export default async function AlgorithmsPage() {
  const algorithms = await getStaticContentList('algorithms');
  
  return <AlgorithmList algorithms={algorithms} />;
}
```

## Type Safety

The system provides full TypeScript support with enriched types:

```typescript
// Enhanced types include relationships
type EnrichedAlgorithm = Database['public']['Tables']['algorithms']['Row'] & {
  algorithm_industry_relations?: { industries: { id: string; name: string; slug?: string | null } | null }[];
  persona_algorithm_relations?: { personas: { id: string; name: string; slug?: string | null } | null }[];
  algorithm_case_study_relations?: { case_studies: { id: string; title: string; slug: string; description: string; published_at: string } | null }[];
};
```

## Hybrid Architecture

The unified system enables a hybrid architecture:

- **Public Content**: Static generation for published content only (v0.4.1)
- **Preview Content**: Dynamic rendering for unpublished content accessed via direct URLs
- **Admin CMS**: Dynamic API routes preserved for content management
- **Build Process**: Clean builds without warnings from unpublished content

## Mixed Content Handling (v0.4.1)

**Critical Architecture Fix**: The system now handles mixed published/unpublished content gracefully.

### Problem Solved
Previously, the CMS would break when relationships contained unpublished content:
- Query-level filtering created `null` objects in relationships
- Page components crashed with "Cannot read properties of null" errors  
- Static generation failed completely when importing unpublished content

### Solution: Runtime Relationship Filtering
The system now uses JavaScript filtering instead of database-level filtering for relationships:

```typescript
// ✅ NEW: Robust filtering that prevents crashes
function filterRelationships(data: any, preview: boolean = false): any {
  const filterRelationArray = (relations: any[], nestedKey: string) => {
    return relations.filter(relation => {
      const nestedItem = relation[nestedKey];
      if (!nestedItem) return false; // Remove null relationships
      if (preview) return true; // Show all in preview mode
      return nestedItem.published === true; // Filter by published status
    });
  };
  
  // Apply filtering to all relationship types...
}
```

### Benefits
- **Build Resilience**: Never fails due to unpublished content in relationships
- **Import Workflows**: Can import unpublished content without breaking the site
- **Preview Mode**: Team can access unpublished content via direct URLs (dynamic rendering)
- **Clean Builds**: No warnings from unpublished content (v0.4.1)
- **Performance**: Published content gets static pages, unpublished uses dynamic rendering
- **Professional CMS**: Handles mixed content states like industry-standard CMSs

### Performance Impact
- **Published Content**: Static HTML (2-6ms) - no change
- **Unpublished Content**: Dynamic rendering (~200-500ms) on first access, then cached via ISR
- **Build Time**: Cleaner and faster - only builds pages for published content
- **Database Load**: No runtime impact for published content

### Publishing Workflow (v0.4.1)
1. **Draft Stage**: Content is unpublished, accessible via direct URL (dynamic rendering)
2. **Review Stage**: Team can preview via direct URLs without build warnings
3. **Publish Stage**: Content is published, static page generated on next build
4. **Performance**: Published content gets full static optimization

This architectural improvement provides a professional CMS workflow while maintaining optimal performance for published content.

## Implementation Details

The system is implemented in `src/lib/content-fetchers.ts` and provides:

1. **Consistent API**: Same function signatures across all content types
2. **Relationship Mapping**: Predefined relationship queries for each content type
3. **Build-Time Safety**: Service role client prevents cookies context errors
4. **Error Handling**: Comprehensive error handling and logging
5. **Preview Support**: Optional preview mode for draft content
6. **Mixed Content Resilience**: JavaScript filtering prevents null pointer crashes

## Future Enhancements

The unified system provides a foundation for future improvements:

- **Caching**: Redis-based caching for frequently accessed content
- **Search**: Full-text search across all content types
- **Batch Operations**: Efficient bulk content operations
- **Content Validation**: Schema validation for content integrity
- **API Versioning**: Versioned API endpoints for external integrations

This unified approach significantly improves performance while maintaining developer experience and enabling advanced features like static site generation. 