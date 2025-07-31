# OpenQase 0.4.0: Architecture Options Design

## Executive Summary

Based on comprehensive research of Contentful and Jamstack CMS patterns, this document presents three viable architecture options for OpenQase's modernization. Each option addresses the identified pain points while offering different trade-offs in complexity, performance, and implementation effort.

## Research Synthesis

### Key Insights from Industry Leaders

**From Contentful Research**:
- Single API calls with deep relationship resolution eliminate N+1 queries
- Build-time static generation with selective revalidation provides optimal performance
- Preview modes enable editorial workflows without compromising performance
- Webhook-driven cache invalidation ensures content freshness

**From Jamstack CMS Analysis**:
- Supabase + Static Generation (Strapi pattern) aligns with our current stack
- GROQ-style relationship resolution (Sanity) can be adapted to PostgreSQL
- ISR with selective revalidation (Ghost pattern) balances performance and freshness
- Admin-triggered rebuilds are the standard pattern across all platforms

### Core Principles for OpenQase

1. **Single Pattern**: Eliminate Learning Paths vs Case Studies inconsistency
2. **Performance First**: Sub-second page loads, eliminate timeouts
3. **Developer Experience**: Clear guidelines, reduced complexity
4. **Editorial Workflow**: Maintain admin CMS functionality with preview modes

## Architecture Option 1: Pure Static Generation (SSG)

### Overview
Pre-render ALL content pages at build time, serve from CDN, rebuild on content changes.

### Architecture Diagram
```
Content Update (Admin) → Database → Webhook → GitHub Action → 
Static Build → Vercel Deploy → CDN → User (&lt; 100ms)
```

### Implementation Details

#### Unified Content Fetching
```typescript
// Single pattern for ALL content types
export async function getStaticContentWithRelationships<T>(
  contentType: string,
  slug: string
): Promise<T> {
  const relationshipMap = {
    case_studies: [
      'partner_companies(name, industry)',
      'quantum_companies(name, logo)', 
      'quantum_hardware(name, type)',
      'quantum_software(name, version)',
      'related_algorithms(name, slug, quantum_advantage)'
    ],
    algorithms: [
      'related_case_studies(title, slug, description)',
      'applicable_industries(name, slug)',
      'implementation_personas(name, slug)'
    ],
    personas: [
      'relevant_algorithms(name, slug, difficulty)',
      'relevant_case_studies(title, slug, description)',
      'target_industries(name, slug)'
    ],
    industries: [
      'relevant_case_studies(title, slug, description)',
      'applicable_algorithms(name, slug, use_cases)',
      'target_personas(name, slug)'
    ]
  };

  const relationships = relationshipMap[contentType] || [];
  const selectQuery = ['*', ...relationships].join(', ');

  const { data, error } = await supabase
    .from(contentType)
    .select(selectQuery)
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) throw new Error(`Failed to fetch ${contentType}: ${error.message}`);
  return data;
}
```

#### Static Generation Implementation
```typescript
// Standardized across ALL content types
export async function generateStaticParams() {
  const { data } = await supabase
    .from('case_studies')
    .select('slug')
    .eq('published', true);
    
  return data.map(({ slug }) => ({ slug }));
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const caseStudy = await getStaticContentWithRelationships(
    'case_studies', 
    params.slug
  );
  
  return <CaseStudyDisplay data={caseStudy} />;
}
```

#### Rebuild Trigger System
```typescript
// Admin publish action
export async function publishContent(id: string, contentType: string) {
  // 1. Update database
  const { data } = await supabase
    .from(contentType)
    .update({ 
      published: true, 
      published_at: new Date() 
    })
    .eq('id', id)
    .select('slug')
    .single();

  // 2. Trigger full site rebuild
  await fetch(process.env.VERCEL_DEPLOY_HOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      trigger: 'content_publish',
      contentType,
      slug: data.slug 
    })
  });

  return { success: true, rebuilding: true };
}
```

### Benefits
- ✅ **Maximum Performance**: 50-100ms page loads globally
- ✅ **Simple Deployment**: Static files, no runtime dependencies
- ✅ **Cost Effective**: Minimal server resources required
- ✅ **SEO Optimal**: Perfect Core Web Vitals scores
- ✅ **Reliability**: No database dependencies at runtime

### Drawbacks
- ❌ **Rebuild Time**: Full site rebuild on any content change (2-5 minutes)
- ❌ **Editorial Friction**: Content changes not immediately visible
- ❌ **Preview Limitations**: No real-time preview for draft content
- ❌ **Scalability**: Build times increase with content volume

### Migration Strategy
1. **Week 1**: Implement unified content fetching pattern
2. **Week 2**: Convert case studies to static generation
3. **Week 3**: Convert algorithms, personas, industries
4. **Week 4**: Setup rebuild triggers, remove old API routes

## Architecture Option 2: ISR Hybrid (Recommended)

### Overview
Static generation with Incremental Static Regeneration - best of both worlds.

### Architecture Diagram
```
User Request → CDN Cache (Hit) → User (&lt; 100ms)
             ↓ (Miss)
           Next.js ISR → Database → Generate Page → Cache → User
                      ↓
Admin Publish → Selective Revalidation → Cache Invalidation
```

### Implementation Details

#### ISR Configuration
```typescript
// Page-level ISR with selective revalidation
export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const caseStudy = await getStaticContentWithRelationships(
    'case_studies', 
    params.slug
  );
  
  return <CaseStudyDisplay data={caseStudy} />;
}

export async function generateStaticParams() {
  // Pre-generate popular content only
  const { data } = await supabase
    .from('case_studies')
    .select('slug')
    .eq('published', true)
    .eq('featured', true); // Only featured content pre-generated
    
  return data.map(({ slug }) => ({ slug }));
}

// Enable ISR with on-demand revalidation
export const revalidate = 3600; // Revalidate every hour as fallback
```

#### Selective Revalidation System
```typescript
// API route: /api/revalidate
export async function POST(request: Request) {
  const { contentType, slug, id } = await request.json();
  
  try {
    // Revalidate specific pages
    await revalidate(`/${getContentPath(contentType)}/${slug}`);
    await revalidate(`/${getContentPath(contentType)}`); // List page
    
    // Revalidate related content
    await revalidateRelatedContent(id, contentType);
    
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 });
  }
}

async function revalidateRelatedContent(id: string, contentType: string) {
  // Intelligent relationship-based revalidation
  const relatedMap = {
    case_studies: async (id: string) => {
      const { data } = await supabase
        .from('case_study_algorithms')
        .select('algorithms(slug)')
        .eq('case_study_id', id);
      
      // Revalidate related algorithm pages
      for (const rel of data) {
        await revalidate(`/paths/algorithm/${rel.algorithms.slug}`);
      }
    },
    algorithms: async (id: string) => {
      // Similar logic for algorithm relationships
    }
  };
  
  await relatedMap[contentType]?.(id);
}
```

#### Admin Integration
```typescript
// Enhanced publish with immediate feedback
export async function publishContent(id: string, contentType: string) {
  // 1. Update database
  const { data } = await supabase
    .from(contentType)
    .update({ 
      published: true, 
      published_at: new Date() 
    })
    .eq('id', id)
    .select('slug')
    .single();

  // 2. Immediate selective revalidation
  await fetch('/api/revalidate', {
    method: 'POST',
    body: JSON.stringify({ contentType, slug: data.slug, id })
  });

  return { 
    success: true, 
    revalidated: true,
    liveUrl: `/${getContentPath(contentType)}/${data.slug}`
  };
}
```

#### Preview Mode Implementation
```typescript
// Preview mode for draft content
export async function getServerSideProps({ 
  params, 
  preview = false,
  previewData 
}) {
  const isPreview = preview && previewData?.role === 'admin';
  const publishedFilter = isPreview ? {} : { published: true };
  
  const content = await supabase
    .from('case_studies')
    .select('*')
    .eq('slug', params.slug)
    .match(publishedFilter)
    .single();
    
  if (!content.data && !isPreview) {
    return { notFound: true };
  }
  
  return {
    props: {
      content: content.data,
      preview: isPreview
    }
  };
}

// Preview banner component
export function PreviewBanner({ preview }: { preview: boolean }) {
  if (!preview) return null;
  
  return (
    <div className="bg-yellow-400 text-black text-center py-2">
      <span className="font-semibold">Preview Mode</span> - 
      You are viewing unpublished content. 
      <a href="/api/exit-preview" className="underline ml-2">Exit Preview</a>
    </div>
  );
}
```

### Benefits
- ✅ **Fast Performance**: &lt; 500ms for cached pages, &lt; 2s for new pages
- ✅ **Immediate Updates**: Content changes visible within seconds
- ✅ **Scalable**: Handles traffic spikes automatically
- ✅ **Preview Mode**: Real-time preview for editors
- ✅ **Flexible**: Can optimize per content type

### Drawbacks
- ❌ **Complexity**: More complex than pure SSG
- ❌ **Database Dependency**: Still needs runtime database for new pages
- ❌ **Cache Management**: Requires careful cache invalidation logic

### Migration Strategy
1. **Week 1**: Implement unified content pattern + ISR for case studies
2. **Week 2**: Add selective revalidation API and admin integration
3. **Week 3**: Implement preview mode and convert remaining content types
4. **Week 4**: Performance optimization and monitoring

## Architecture Option 3: Contentful-Inspired API

### Overview
Dedicated content API with aggressive CDN caching, similar to Contentful's approach.

### Architecture Diagram
```
User Request → CDN Edge (Hit) → User (&lt; 100ms)
             ↓ (Miss)
           Content API → Database → Transform → Cache → User
                     ↓
Admin Publish → API Cache Invalidation → CDN Purge
```

### Implementation Details

#### Content Delivery API
```typescript
// Dedicated content API - /api/content/[contentType]/[slug]
export async function GET(
  request: Request, 
  { params }: { params: { contentType: string; slug: string } }
) {
  const { contentType, slug } = params;
  const searchParams = new URL(request.url).searchParams;
  const include = searchParams.get('include')?.split(',') || [];
  
  try {
    const content = await getContentWithIncludes(contentType, slug, include);
    
    const response = NextResponse.json({
      data: content,
      metadata: {
        contentType,
        slug,
        lastModified: content.updated_at,
        includes: include
      }
    });
    
    // Aggressive CDN caching
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400');
    response.headers.set('CDN-Cache-Control', 'public, max-age=86400');
    response.headers.set('Vary', 'Accept-Encoding');
    
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}

async function getContentWithIncludes(
  contentType: string, 
  slug: string, 
  includes: string[]
) {
  const baseQuery = supabase
    .from(contentType)
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();
    
  let content = await baseQuery;
  
  // Resolve includes dynamically
  for (const include of includes) {
    content.data[include] = await resolveRelationship(
      contentType, 
      content.data.id, 
      include
    );
  }
  
  return content.data;
}
```

#### Client-Side Content Fetching
```typescript
// Content client similar to Contentful SDK
class OpenQaseContentClient {
  constructor(private baseUrl: string) {}
  
  async getEntry(contentType: string, slug: string, options: {
    include?: string[];
  } = {}) {
    const url = new URL(`${this.baseUrl}/api/content/${contentType}/${slug}`);
    
    if (options.include?.length) {
      url.searchParams.set('include', options.include.join(','));
    }
    
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${contentType}/${slug}`);
    }
    
    return response.json();
  }
  
  async getEntries(contentType: string, options: {
    limit?: number;
    skip?: number;
    include?: string[];
  } = {}) {
    const url = new URL(`${this.baseUrl}/api/content/${contentType}`);
    
    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
    
    const response = await fetch(url.toString());
    return response.json();
  }
}

// Usage in pages
export default async function CaseStudyPage({ params }) {
  const client = new OpenQaseContentClient(process.env.NEXT_PUBLIC_SITE_URL);
  
  const { data: caseStudy } = await client.getEntry(
    'case_studies', 
    params.slug, 
    {
      include: ['partner_companies', 'quantum_hardware', 'quantum_software']
    }
  );
  
  return <CaseStudyDisplay data={caseStudy} />;
}
```

#### Cache Invalidation System
```typescript
// Webhook-style cache invalidation
export async function POST(request: Request) {
  const { contentType, slug, action } = await request.json();
  
  if (action === 'publish') {
    // Purge CDN cache for specific content
    await purgeCDNCache([
      `/api/content/${contentType}/${slug}`,
      `/api/content/${contentType}`,
      `/${getContentPath(contentType)}/${slug}`,
      `/${getContentPath(contentType)}`
    ]);
    
    // Warm cache with fresh content
    await warmCache(contentType, slug);
  }
  
  return NextResponse.json({ success: true });
}

async function purgeCDNCache(urls: string[]) {
  // Vercel Edge Config or similar CDN purge
  for (const url of urls) {
    await fetch(`https://api.vercel.com/v1/edge-config/purge`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    });
  }
}
```

### Benefits
- ✅ **API Consistency**: Similar to industry standard (Contentful)
- ✅ **Flexible Caching**: Fine-grained cache control per content type
- ✅ **Real-time Updates**: Immediate cache invalidation
- ✅ **Developer Familiar**: Standard API patterns

### Drawbacks
- ❌ **Most Complex**: Requires comprehensive API design
- ❌ **Runtime Dependency**: Always needs database connection
- ❌ **Cache Complexity**: Sophisticated cache invalidation logic
- ❌ **Performance Risk**: Cold cache performance depends on database

### Migration Strategy
1. **Week 1-2**: Design and implement content API
2. **Week 3**: Build cache invalidation system
3. **Week 4**: Convert pages to use content API
4. **Week 5**: Performance optimization and CDN tuning

## FINAL DECISION: Option 1 (Pure Static Generation)

### Why Simple SSG is Optimal for OpenQase

**Content Velocity Analysis**: With only 2-3 articles/week of evergreen content, the complexity of ISR is not justified.

**Decision Rationale**:
1. **Solves Core Pain Points**: Eliminates N+1 queries and API timeouts completely
2. **Zero Complexity**: No cache invalidation logic or race conditions
3. **Perfect Reliability**: What you build is exactly what users get
4. **Cost Effective**: Minimal server resources, pure CDN delivery
5. **Content Pattern Match**: Low-frequency evergreen content suits rebuild workflow

**Trade-offs Accepted**:
- ✅ 2-3 minute rebuild time acceptable for evergreen content
- ✅ Preview functionality will be handled via alternative solutions (see Preview Strategy below)
- ✅ Manual publish workflow aligns with content review process

### Implementation Timeline

**Phase 1 (Week 1-2): Foundation**
- Implement unified content fetching pattern
- Convert case studies to static generation
- Setup Vercel deploy hooks

**Phase 2 (Week 3-4): Expansion**  
- Convert algorithms, personas, industries to SSG
- Remove old API routes and complex fetching
- Setup preview solution (see Preview Strategy below)

**Phase 3 (Week 5-6): Enhancement**
- Performance optimization and monitoring
- Admin publish workflow integration
- Documentation and training

## Preview Strategy for Static Generation

While static generation eliminates real-time preview capabilities, several proven solutions exist for content preview workflows. Based on industry research and best practices, here are the recommended options:

### Option 1: Next.js Draft Mode (Recommended)

**How it works**: Built-in Next.js feature that bypasses static generation for preview URLs using secure cookies.

**Implementation**:
```typescript
// app/api/draft/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  if (secret !== process.env.DRAFT_SECRET_TOKEN || !slug) {
    return new Response('Invalid token', { status: 401 })
  }

  // Verify the slug exists in your CMS
  const post = await getPostBySlug(slug, { draft: true })
  if (!post) {
    return new Response('Invalid slug', { status: 401 })
  }

  // Enable Draft Mode
  draftMode().enable()
  
  // Redirect to the slug
  redirect(slug)
}

// In your page component
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { isEnabled } = draftMode()
  
  const post = await getBlogPost(params.slug, {
    preview: isEnabled // Fetch draft content if in preview mode
  })
  
  return <Article post={post} />
}
```

**Supabase Integration**:
```typescript
// Preview URLs in admin: https://yoursite.com/api/draft?secret=TOKEN&slug=/blog/post-slug

export async function getBlogPost(slug: string, options: { preview?: boolean } = {}) {
  const query = supabase
    .from('blog_posts')
    .select('*, authors(*), categories(*)')
    .eq('slug', slug)
    
  if (!options.preview) {
    query.eq('published', true)
  }
  
  return query.single()
}
```

**Benefits**:
- ✅ Zero additional infrastructure
- ✅ Secure token-based access
- ✅ Works with existing Supabase setup
- ✅ Real-time preview of draft content
- ✅ SEO-safe (preview URLs not indexed)

### Option 2: Vercel Preview Deployments

**How it works**: Automatic preview deployments for every branch, allowing content preview on separate URLs.

**Implementation**:
- Create preview branches for draft content
- Each branch gets its own deployment URL
- Content team can review on `https://branch-name--yoursite.vercel.app`

**Benefits**:
- ✅ Full site preview with all features
- ✅ Shareable URLs for stakeholder review
- ✅ Automatic SSL and CDN

**Drawbacks**:
- ❌ Requires branching strategy for content
- ❌ Longer preview generation time (full deployment)

### Option 3: Netlify Preview Servers

**How it works**: Real-time cloud-hosted development environments that connect to your CMS via webhooks.

**Implementation**:
- Setup Preview Server for content branch
- Connect to Supabase via webhooks
- Instant content updates without rebuilds

**Benefits**:
- ✅ Real-time updates (seconds, not minutes)
- ✅ Framework auto-detection
- ✅ Collaborative editing workflow

**Drawbacks**:
- ❌ Netlify-specific solution
- ❌ Additional infrastructure to manage

### Option 4: CMS-Driven Preview URLs

**How it works**: Configure Supabase webhooks to trigger preview builds or use direct database queries for preview content.

**Implementation**:
```typescript
// Preview-specific API endpoint
// app/api/preview/[slug]/route.ts
export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { searchParams } = new URL(request.url)
  const previewToken = searchParams.get('token')
  
  if (previewToken !== process.env.PREVIEW_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Fetch draft content directly
  const post = await supabase
    .from('blog_posts')
    .select('*, authors(*), categories(*)')
    .eq('slug', params.slug)
    .single()
    
  return NextResponse.json(post)
}
```

### Recommended Implementation

For OpenQase's use case, **Next.js Draft Mode** is the optimal solution:

1. **Minimal Complexity**: Uses existing Next.js infrastructure
2. **Supabase Compatible**: Works seamlessly with current database setup
3. **Secure**: Token-based authentication prevents unauthorized access
4. **Fast Setup**: Can be implemented in Phase 2 of migration
5. **Editorial Friendly**: Simple preview URLs that can be bookmarked

### Admin Integration

```typescript
// In admin interface - add preview button
export function PreviewButton({ post }: { post: BlogPost }) {
  const previewUrl = `/api/draft?secret=${process.env.NEXT_PUBLIC_DRAFT_SECRET}&slug=${post.slug}`
  
  return (
    <button 
      onClick={() => window.open(previewUrl, '_blank')}
      className="preview-btn"
    >
      Preview Draft
    </button>
  )
}
```

This approach maintains the simplicity of static generation while providing essential preview capabilities for content creation workflows.

### Expected Outcomes

**Performance Improvements**:
- Page load times: 30s → &lt; 500ms
- Core Web Vitals: All green scores
- API timeouts: Eliminated completely

**Developer Experience**:
- Single pattern for all content types
- Clear static vs dynamic boundaries  
- Simplified debugging and maintenance

**Editorial Experience**:
- Immediate content updates (&lt; 10 seconds)
- Preview mode for draft content
- Clear publish feedback

## Next Steps

1. **Stakeholder Review**: Present options to technical leadership
2. **Proof of Concept**: Implement ISR for case studies as demonstration
3. **Performance Baseline**: Measure current performance for comparison
4. **Migration Planning**: Detailed sprint breakdown and risk assessment

---

**Document Status**: Architecture Design Complete - 0.4.0 Planning  
**Created**: January 2025  
**Last Updated**: January 2025  
**Recommended Option**: ISR Hybrid (Option 2)  
**Next Phase**: v040-create-migration-strategy, Proof of Concept Implementation 