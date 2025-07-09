# Contentful Architecture Research for OpenQase 0.4.0

## Executive Summary

This document analyzes Contentful's architecture to understand how they solve content delivery, static generation, and caching challenges that OpenQase faces. The goal is to identify patterns and solutions we can adapt for our static-first architecture.

## Contentful Architecture Overview

### Core Architecture Principles

1. **API-First Design**: All content accessible via RESTful and GraphQL APIs
2. **Build-Time Resolution**: Content relationships resolved during static generation
3. **Edge Distribution**: Content served from CDN edge locations globally
4. **Webhook-Driven Updates**: Content changes trigger automated deployments
5. **Preview/Production Separation**: Draft content accessible via separate preview APIs

### API Structure

#### Content Delivery API (CDA)
**Purpose**: Optimized for production content consumption
```
https://cdn.contentful.com/spaces/{space_id}/entries
```

**Key Features**:
- **Read-only**: No write operations, optimized for speed
- **CDN Cached**: Aggressive caching at edge locations
- **Relationship Resolution**: Supports `include` parameter for deep fetching
- **Filtering**: Rich query capabilities without database load

**Example Request**:
```javascript
// Fetch blog posts with related authors and categories
const response = await fetch(
  'https://cdn.contentful.com/spaces/abc123/entries?' +
  'content_type=blogPost&' +
  'include=2&' +  // Include 2 levels of linked entries
  'order=-sys.createdAt'
);
```

#### Preview API
**Purpose**: Access to draft/unpublished content for editorial workflows
```
https://preview.contentful.com/spaces/{space_id}/entries
```

**Key Differences**:
- **Authentication Required**: Preview access token needed
- **No CDN Caching**: Always fresh from origin
- **Draft Content**: Includes unpublished entries
- **Editorial Workflow**: Supports content in various states

### Build-Time Content Resolution

#### Static Site Generation Pattern
```javascript
// Next.js example - Contentful's recommended approach
export async function getStaticProps({ params }) {
  // Fetch content with all relationships resolved
  const blogPost = await client.getEntry(params.slug, {
    include: 3,  // Deep relationship resolution
    content_type: 'blogPost'
  });
  
  // All relationships resolved at build time
  return {
    props: {
      post: blogPost,
      author: blogPost.fields.author,  // Already resolved
      relatedPosts: blogPost.fields.related  // Already resolved
    },
    revalidate: 3600  // ISR: Revalidate every hour
  };
}

export async function getStaticPaths() {
  // Pre-generate all blog post pages
  const entries = await client.getEntries({
    content_type: 'blogPost',
    select: 'fields.slug'
  });
  
  return {
    paths: entries.items.map(entry => `/blog/${entry.fields.slug}`),
    fallback: 'blocking'  // Generate new pages on demand
  };
}
```

### Relationship Resolution Strategy

#### Include Parameter Deep Fetching
Contentful solves the N+1 query problem by allowing deep relationship resolution in a single API call:

```javascript
// Single API call resolves all relationships
const content = await client.getEntries({
  content_type: 'caseStudy',
  include: 3,  // Include up to 3 levels of linked content
  'fields.slug': slug
});

// Result includes:
// - Main case study
// - Linked companies (level 1)
// - Company industries (level 2) 
// - Industry related algorithms (level 3)
```

**Benefits**:
- **Single Network Request**: No N+1 queries
- **Predictable Performance**: Known relationship depth
- **CDN Cacheable**: Entire response can be cached
- **Type-Safe**: All relationships typed and resolved

### Caching Strategy

#### Multi-Layer Caching Approach

1. **CDN Edge Caching**
   - Content cached at 200+ global edge locations
   - Cache TTL configured per content type
   - Instant invalidation via webhook events

2. **Build Artifact Caching**
   - Static pages cached indefinitely
   - Content changes trigger selective rebuilds
   - Immutable deployments with rollback capability

3. **Browser Caching**
   - Long cache headers for static assets
   - Service worker for offline content access
   - Optimistic updates for better UX

#### Cache Invalidation Strategy
```javascript
// Webhook handler for content updates
export default async function webhook(req, res) {
  const { sys } = req.body;
  
  // Determine what content was updated
  const contentType = sys.contentType.sys.id;
  const entryId = sys.id;
  
  // Selective revalidation based on content type
  switch (contentType) {
    case 'blogPost':
      // Revalidate blog index and specific post
      await revalidate('/blog');
      await revalidate(`/blog/${entry.fields.slug}`);
      break;
      
    case 'caseStudy':
      // Revalidate related algorithm pages too
      await revalidateRelatedContent(entryId);
      break;
  }
  
  res.status(200).json({ revalidated: true });
}
```

### Preview Mode Implementation

#### Editorial Workflow Support
```javascript
// Preview mode for editors
export async function getServerSideProps({ preview, params }) {
  const client = preview ? previewClient : deliveryClient;
  
  const content = await client.getEntry(params.slug);
  
  return {
    props: {
      content,
      preview: !!preview
    }
  };
}

// Preview mode toggle
export default function PreviewBanner({ preview }) {
  if (!preview) return null;
  
  return (
    <div className="preview-banner">
      Viewing draft content - <a href="/api/exit-preview">Exit Preview</a>
    </div>
  );
}
```

## Performance Characteristics

### Delivery Speed
- **First Byte Time**: <100ms globally via CDN
- **Content Loading**: Sub-second for most content types
- **Relationship Resolution**: Single request for complex data
- **Build Times**: Optimized for large content sets (10,000+ entries)

### Scalability Features
- **Concurrent Builds**: Parallel static generation
- **Incremental Updates**: Only rebuild changed content
- **Edge Computing**: Content transformations at edge
- **Auto-scaling**: CDN handles traffic spikes automatically

## Content Management Integration

### Webhook Architecture
```javascript
// Content publish webhook
{
  "metadata": {
    "tags": []
  },
  "sys": {
    "type": "Entry",
    "id": "4BqrajvA8E6qwgkieoqmqO",
    "space": {"sys": {"type": "Link", "linkType": "Space", "id": "cfexampleapi"}},
    "environment": {"sys": {"type": "Link", "linkType": "Environment", "id": "master"}},
    "contentType": {"sys": {"type": "Link", "linkType": "ContentType", "id": "blogPost"}},
    "createdAt": "2013-06-27T22:46:12.852Z",
    "updatedAt": "2013-06-27T22:46:12.921Z",
    "publishedAt": "2013-06-27T22:46:12.921Z"
  },
  "fields": {
    "title": {"en-US": "Hello, World!"},
    "slug": {"en-US": "hello-world"},
    "content": {"en-US": "This is my first blog post..."}
  }
}
```

### Deploy Integration
```yaml
# GitHub Actions - Contentful → Vercel Deploy
name: Deploy on Content Update
on:
  repository_dispatch:
    types: [contentful-webhook]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Trigger Vercel Deploy
        run: |
          curl -X POST "https://api.vercel.com/v1/integrations/deploy/..."
```

## Key Lessons for OpenQase

### 1. Single API Call Resolution
**Problem Solved**: N+1 queries causing timeouts
**Contentful Solution**: Deep `include` parameter for relationship resolution
**OpenQase Application**: 
```typescript
// Instead of multiple database calls
const caseStudy = await supabase
  .from('case_studies')
  .select(`
    *,
    companies(*),
    quantum_hardware(*),
    quantum_software(*)
  `)
  .eq('slug', slug)
  .single();
```

### 2. Build-Time vs Runtime Strategy
**Problem Solved**: Inconsistent performance across content types
**Contentful Solution**: Clear separation of static (build-time) vs dynamic (runtime)
**OpenQase Application**:
- **Static**: Case studies, algorithms, industries, personas
- **Dynamic**: User profiles, newsletter subscriptions, admin operations

### 3. Cache Invalidation Strategy
**Problem Solved**: Complex cache management
**Contentful Solution**: Webhook-driven selective invalidation
**OpenQase Application**: Admin publish actions trigger specific page revalidation

### 4. Preview Mode for Editors
**Problem Solved**: Editorial workflow for draft content
**Contentful Solution**: Separate preview API with authentication
**OpenQase Application**: Admin users can preview unpublished content

## Recommended Patterns for OpenQase

### 1. Unified Content API Pattern
```typescript
// Single pattern for all content types
export async function getContentWithRelationships<T>(
  contentType: string,
  slug: string,
  relationships: string[] = []
): Promise<T> {
  const selectQuery = [
    '*',
    ...relationships.map(rel => `${rel}(*)`)
  ].join(', ');
  
  const { data, error } = await supabase
    .from(contentType)
    .select(selectQuery)
    .eq('slug', slug)
    .eq('published', true)
    .single();
    
  if (error) throw error;
  return data;
}
```

### 2. Static Generation Strategy
```typescript
// Standardized static generation for all content
export async function generateStaticParams() {
  const { data } = await supabase
    .from('case_studies')
    .select('slug')
    .eq('published', true);
    
  return data.map(({ slug }) => ({ slug }));
}

export default async function CaseStudyPage({ params }) {
  const caseStudy = await getContentWithRelationships(
    'case_studies',
    params.slug,
    ['companies', 'quantum_hardware', 'quantum_software']
  );
  
  return <CaseStudyContent data={caseStudy} />;
}
```

### 3. Admin Integration Pattern
```typescript
// Admin publish triggers revalidation
export async function publishContent(id: string, contentType: string) {
  // Update published status
  await supabase
    .from(contentType)
    .update({ published: true, published_at: new Date() })
    .eq('id', id);
    
  // Trigger revalidation
  await fetch('/api/revalidate', {
    method: 'POST',
    body: JSON.stringify({ contentType, id })
  });
}
```

## Next Steps

1. **Design OpenQase Content API**: Adapt Contentful patterns to our Supabase backend
2. **Implement Static Generation**: Start with case studies as proof of concept  
3. **Create Revalidation Strategy**: Admin publish → selective page regeneration
4. **Add Preview Mode**: Allow admin users to preview unpublished content

---

**Document Status**: Research Complete - 0.4.0 Planning  
**Created**: January 2025  
**Last Updated**: January 2025  
**Research Sources**: Contentful Documentation, Next.js Integration Guides, Performance Case Studies  
**Next**: v040-research-jamstack, v040-design-static-options 