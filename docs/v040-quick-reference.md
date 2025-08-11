# v0.4.0 Quick Reference Guide

This guide provides quick reference for developers working with the new unified content fetching system introduced in OpenQase v0.4.0.

## When to Use What

### ✅ Use Unified Content Fetching For:
- **Public content pages** (case studies, algorithms, personas, industries)
- **Static generation** requirements
- **Performance-critical** pages
- **SEO-optimized** content

### ❌ Don't Use Unified Content Fetching For:
- **Admin pages** (use direct Supabase clients)
- **User-specific content** (use Server Components)
- **Real-time features** (use native React state with hooks)
- **Complex filtering** (use API routes)

## Common Patterns

### 1. Content Detail Page

```typescript
// src/app/paths/algorithm/[slug]/page.tsx
import { getStaticContentWithRelationships, generateStaticParamsForContentType } from '@/lib/content-fetchers';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return generateStaticParamsForContentType('algorithms');
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const algorithm = await getStaticContentWithRelationships('algorithms', params.slug);
  
  if (!algorithm) {
    return { title: 'Not Found' };
  }
  
  return {
    title: algorithm.name,
    description: algorithm.description,
  };
}

export default async function AlgorithmPage({ params }: { params: { slug: string } }) {
  const algorithm = await getStaticContentWithRelationships('algorithms', params.slug);
  
  if (!algorithm) {
    notFound();
  }
  
  return (
    <div>
      <h1>{algorithm.name}</h1>
      <p>{algorithm.description}</p>
      
      {/* All relationships available */}
      <div>
        <h2>Related Industries</h2>
        {algorithm.algorithm_industry_relations?.map(rel => (
          <span key={rel.industries?.id}>{rel.industries?.name}</span>
        ))}
      </div>
    </div>
  );
}
```

### 2. Content Listing Page

```typescript
// src/app/paths/algorithm/page.tsx
import { getStaticContentList } from '@/lib/content-fetchers';
import AlgorithmList from '@/components/AlgorithmList';

export default async function AlgorithmsPage() {
  const algorithms = await getStaticContentList('algorithms');
  
  return (
    <div>
      <h1>Quantum Algorithms</h1>
      <AlgorithmList algorithms={algorithms} />
    </div>
  );
}
```

### 3. Admin Page (Use Direct Supabase)

```typescript
// src/app/admin/algorithms/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase-server';

export default async function AdminAlgorithmsPage() {
  const supabase = await createServerSupabaseClient();
  
  const { data: algorithms } = await supabase
    .from('algorithms')
    .select('*')
    .order('updated_at', { ascending: false });
  
  return (
    <div>
      <h1>Manage Algorithms</h1>
      {/* Admin interface */}
    </div>
  );
}
```

## Content Types

| Content Type | Table Name | Slug Format |
|-------------|------------|-------------|
| Case Studies | `case_studies` | `kebab-case` |
| Algorithms | `algorithms` | `kebab-case` |
| Personas | `personas` | `kebab-case` |
| Industries | `industries` | `kebab-case` |
| Blog Posts | `blog_posts` | `kebab-case` |

## Available Relationships

### Case Studies
```typescript
type EnrichedCaseStudy = {
  case_study_industry_relations: { industries: Industry }[];
  algorithm_case_study_relations: { algorithms: Algorithm }[];
  case_study_persona_relations: { personas: Persona }[];
}
```

### Algorithms
```typescript
type EnrichedAlgorithm = {
  algorithm_industry_relations: { industries: Industry }[];
  persona_algorithm_relations: { personas: Persona }[];
  algorithm_case_study_relations: { case_studies: CaseStudy }[];
}
```

### Personas
```typescript
type EnrichedPersona = {
  persona_industry_relations: { industries: Industry }[];
  persona_algorithm_relations: { algorithms: Algorithm }[];
  case_study_persona_relations: { case_studies: CaseStudy }[];
}
```

### Industries
```typescript
type EnrichedIndustry = {
  algorithm_industry_relations: { algorithms: Algorithm }[];
  case_study_industry_relations: { case_studies: CaseStudy }[];
  persona_industry_relations: { personas: Persona }[];
}
```

## Function Reference

### `getStaticContentWithRelationships<T>(contentType, slug, options?)`

**Purpose:** Fetch single content item with all relationships

**Parameters:**
- `contentType`: `'case_studies' | 'algorithms' | 'personas' | 'industries' | 'blog_posts'`
- `slug`: String identifier
- `options`: `{ preview?: boolean }`

**Returns:** Content item with relationships or `null`

**Example:**
```typescript
const algorithm = await getStaticContentWithRelationships('algorithms', 'quantum-phase-estimation');
```

### `getStaticContentList<T>(contentType, options?)`

**Purpose:** Fetch content lists for listing pages

**Parameters:**
- `contentType`: Content type identifier
- `options`: `{ preview?: boolean, limit?: number, orderBy?: string, orderDirection?: 'asc' | 'desc', filters?: Record<string, any> }`

**Returns:** Array of content items

**Example:**
```typescript
const algorithms = await getStaticContentList('algorithms', {
  limit: 10,
  orderBy: 'name',
  orderDirection: 'asc'
});
```

### `generateStaticParamsForContentType(contentType)`

**Purpose:** Generate static params for `generateStaticParams`

**Parameters:**
- `contentType`: Content type identifier

**Returns:** Array of `{ slug: string }`

**Example:**
```typescript
export async function generateStaticParams() {
  return generateStaticParamsForContentType('algorithms');
}
```

### `getBuildTimeContentList<T>(contentType, options?)`

**Purpose:** Build-time safe content fetching (internal use)

**Use Case:** Used internally by `generateStaticParamsForContentType`

## Migration Checklist

### ✅ Converting to Unified System

1. **Replace direct Supabase calls:**
   ```typescript
   // Before
   const { data } = await supabase.from('algorithms').select('*');
   
   // After
   const algorithms = await getStaticContentList('algorithms');
   ```

2. **Update generateStaticParams:**
   ```typescript
   // Before
   export async function generateStaticParams() {
     const supabase = createServiceRoleSupabaseClient();
     const { data } = await supabase.from('algorithms').select('slug');
     return data?.map(item => ({ slug: item.slug })) || [];
   }
   
   // After
   export async function generateStaticParams() {
     return generateStaticParamsForContentType('algorithms');
   }
   ```

3. **Remove ISR revalidation:**
   ```typescript
   // Remove this line
   export const revalidate = 300;
   ```

4. **Update imports:**
   ```typescript
   import { getStaticContentWithRelationships } from '@/lib/content-fetchers';
   ```

### ❌ Keep Direct Supabase For

- Admin pages (`/admin/*`)
- User-specific content
- Real-time features
- Complex queries with custom filters

## Performance Tips

1. **Use static generation** for public content
2. **Remove unnecessary relationships** from queries
3. **Implement proper error handling** with `notFound()`
4. **Use TypeScript types** for better development experience

## Troubleshooting

### Common Issues

**Issue:** `Cannot read properties of null`
**Solution:** Add null checks before accessing relationships

```typescript
// Good
const industries = algorithm.algorithm_industry_relations?.map(rel => rel.industries?.name) || [];

// Bad
const industries = algorithm.algorithm_industry_relations.map(rel => rel.industries.name);
```

**Issue:** Build-time errors with cookies
**Solution:** Use `getBuildTimeContentList` for build-time operations (handled internally)

**Issue:** Content not updating after changes
**Solution:** Ensure Server Actions call `revalidatePath()` after mutations

## Support

- **Documentation**: [Unified Content Fetching](./unified-content-fetching.md)
- **Architecture**: [Hybrid Architecture](./v040-hybrid-architecture.md)
- **Migration**: [Data Fetching](./data-fetching.md)
- **Issues**: Check build logs for specific error messages

## Next Steps

1. **Complete migration** of remaining content types
2. **Implement caching** for frequently accessed content
3. **Add search functionality** using unified patterns
4. **Optimize build times** with incremental static regeneration 