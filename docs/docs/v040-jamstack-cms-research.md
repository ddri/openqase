# Jamstack CMS Patterns Research for OpenQase 0.4.0

## Executive Summary

This document analyzes Jamstack CMS patterns from leading platforms (Strapi, Sanity, Ghost, Forestry/Tina) to understand different approaches to static content generation, content workflows, and performance optimization. The goal is to identify patterns applicable to OpenQase's static-first architecture.

## Platform Analysis

### Strapi (Headless CMS + Static Generation)

#### Architecture Overview
- **Backend**: Node.js headless CMS with PostgreSQL/MongoDB
- **Frontend**: Agnostic - works with Next.js, Gatsby, Nuxt, etc.
- **Deployment**: Self-hosted or cloud, separate from frontend
- **Content Delivery**: API-first with static generation plugins

#### Static Generation Strategy
```javascript
// Strapi + Next.js pattern
export async function getStaticProps({ params }) {
  // Fetch from Strapi API with relationship population
  const article = await fetch(
    `${process.env.STRAPI_API_URL}/api/articles/${params.slug}?` +
    'populate[0]=author&' +
    'populate[1]=categories&' +
    'populate[2]=related_articles.featured_image'
  ).then(res => res.json());

  return {
    props: { article: article.data },
    revalidate: 3600 // ISR: revalidate every hour
  };
}
```

#### Content Workflow
1. **Content Creation**: Editors use Strapi admin panel
2. **Publishing**: Content marked as published in Strapi
3. **Webhook Trigger**: Strapi sends webhook to deployment service
4. **Build Process**: Frontend rebuilds with updated content
5. **Deployment**: New static site deployed to CDN

#### Key Features
- **Relationship Population**: Similar to Contentful's include parameter
- **Media Management**: Built-in asset optimization and CDN
- **Role-Based Permissions**: Granular access control for content teams
- **Plugin Ecosystem**: Extensible with community plugins

#### Performance Characteristics
```javascript
// Strapi API optimization patterns
const strapiQuery = {
  populate: {
    author: {
      fields: ['name', 'email']
    },
    categories: {
      fields: ['name', 'slug']
    },
    featured_image: {
      fields: ['url', 'alternativeText']
    }
  },
  fields: ['title', 'content', 'publishedAt'],
  sort: ['publishedAt:desc']
};
```

**Benefits**:
- Single API call for complex data
- Selective field fetching reduces payload
- Built-in caching and optimization

### Sanity (Real-time + Static Hybrid)

#### Architecture Overview
- **Backend**: Cloud-hosted document database
- **Content Lake**: Centralized content storage with real-time sync
- **Frontend**: Static generation with real-time preview capabilities
- **Delivery**: CDN + real-time updates for live content

#### Real-time Static Pattern
```javascript
// Sanity + Next.js with real-time preview
export async function getStaticProps({ params, preview = false }) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    content,
    "author": author->{name, image},
    "categories": categories[]->name
  }`;
  
  const post = await sanityClient.fetch(query, { slug: params.slug });
  
  return {
    props: {
      post,
      preview
    },
    revalidate: preview ? 1 : 3600
  };
}

// Real-time preview for editors
export default function PostPage({ post, preview }) {
  // Subscribe to real-time updates in preview mode
  const [livePost, setLivePost] = useState(post);
  
  useEffect(() => {
    if (preview) {
      const subscription = sanityClient
        .listen(`*[_id == "${post._id}"]`)
        .subscribe(update => {
          setLivePost(update.result);
        });
      
      return () => subscription.unsubscribe();
    }
  }, [preview, post._id]);
  
  const displayPost = preview ? livePost : post;
  return <PostContent post={displayPost} preview={preview} />;
}
```

#### GROQ Query Language
Sanity's Graph-Relational Object Queries provide powerful relationship resolution:

```javascript
// Complex relationship query in single request
const query = `*[_type == "caseStudy" && slug.current == $slug][0]{
  title,
  description,
  mainContent,
  "companies": companies[]->{
    name,
    industry->{name, slug}
  },
  "quantumHardware": quantumHardware[]->{
    name,
    type,
    manufacturer->{name, logo}
  },
  "relatedStudies": *[_type == "caseStudy" && 
    count((categories[]._ref)[@ in ^.^.categories[]._ref]) > 0][0...3]{
    title,
    slug,
    excerpt
  }
}`;
```

#### Key Features
- **Real-time Collaboration**: Multiple editors can work simultaneously
- **Content Versioning**: Complete edit history and rollback
- **Structured Content**: Schema-based content modeling
- **Asset Pipeline**: Automatic image optimization and transformation

### Ghost (Publication-focused CMS)

#### Architecture Overview
- **Backend**: Node.js CMS optimized for publishing
- **Content Types**: Posts, pages, authors, tags (publication-focused)
- **Deployment**: Self-hosted or Ghost Pro cloud
- **Static Export**: Built-in static site generation

#### Static Export Pattern
```javascript
// Ghost static site generation
const GhostContentAPI = require('@tryghost/content-api');

const api = new GhostContentAPI({
  url: 'https://demo.ghost.io',
  key: 'your-content-api-key',
  version: 'v5.0'
});

// Build-time data fetching
export async function getStaticProps() {
  const posts = await api.posts.browse({
    include: 'tags,authors',
    limit: 'all'
  });
  
  return {
    props: { posts },
    revalidate: 3600
  };
}

// Individual post generation
export async function getStaticPaths() {
  const posts = await api.posts.browse({
    fields: 'slug',
    limit: 'all'
  });
  
  return {
    paths: posts.map(post => `/blog/${post.slug}`),
    fallback: 'blocking'
  };
}
```

#### Content Workflow
1. **Editorial Process**: Built-in editorial workflow with draft/published states
2. **SEO Optimization**: Automatic meta tags, sitemaps, schema markup
3. **Member Management**: Built-in subscription and newsletter system
4. **Webhook Integration**: Publish events trigger static rebuilds

#### Performance Features
- **Built-in CDN**: Ghost Pro includes global CDN
- **Image Optimization**: Automatic responsive image generation
- **AMP Support**: Automatic Accelerated Mobile Pages
- **RSS/JSON Feeds**: Multiple content syndication formats

### Forestry/Tina CMS (Git-based Workflow)

#### Architecture Overview
- **Content Storage**: Files stored in Git repository
- **Editorial Interface**: CMS UI commits directly to Git
- **Build Integration**: Git commits trigger static site builds
- **Preview**: Live preview of changes before commit

#### Git-based Content Management
```markdown
<!-- Content stored as Markdown files -->
---
title: "Quantum Computing Case Study"
slug: "quantum-ibm-financial-modeling"
companies: ["IBM", "Goldman Sachs"]
quantum_hardware: ["IBM Quantum System One"]
published: true
date: 2025-01-15
---

# IBM & Goldman Sachs: Quantum Financial Modeling

Content here is stored as Markdown with frontmatter...
```

#### Build-time Processing
```javascript
// Tina/Forestry + Next.js
import { getStaticProps as tinaProps } from 'tina/__generated__/types';

export const getStaticProps = async (ctx) => {
  const tinaData = await tinaProps(ctx);
  
  // Process markdown content with relationships
  const processedContent = await processMarkdownWithRelationships(
    tinaData.props.data.post.body
  );
  
  return {
    props: {
      ...tinaData.props,
      processedContent
    }
  };
};
```

#### Key Features
- **Version Control**: Full content history via Git
- **Branch Workflows**: Content staging via Git branches  
- **Developer-friendly**: Content as code approach
- **No Database**: All content in repository, no external dependencies

## Comparative Analysis

### Content Relationship Handling

| Platform | Approach | Performance | Complexity |
|----------|----------|-------------|------------|
| **Strapi** | API populate parameter | Good | Medium |
| **Sanity** | GROQ relational queries | Excellent | Medium |
| **Ghost** | Built-in include parameter | Good | Low |
| **Tina/Forestry** | Markdown frontmatter + processing | Variable | High |

### Static Generation Strategies

| Platform | Generation Method | Rebuild Triggers | Preview Mode |
|----------|------------------|------------------|--------------|
| **Strapi** | ISR + webhooks | Content publish | Via draft status |
| **Sanity** | SSG + real-time | Content change | Real-time preview |
| **Ghost** | SSG + webhooks | Post publish | Built-in preview |
| **Tina** | SSG + Git | Git commit | Live preview |

### Developer Experience

| Platform | Learning Curve | Flexibility | Vendor Lock-in |
|----------|----------------|-------------|----------------|
| **Strapi** | Medium | High | Low (self-hosted) |
| **Sanity** | Medium | High | Medium (cloud service) |
| **Ghost** | Low | Medium | Low (self-hosted option) |
| **Tina** | High | High | Low (Git-based) |

## Key Patterns for OpenQase

### 1. Unified Relationship Resolution
**Best Practice**: Single API call with deep relationship fetching
```typescript
// OpenQase adaptation - inspired by Sanity GROQ
async function getCaseStudyWithRelationships(slug: string) {
  const { data } = await supabase
    .from('case_studies')
    .select(`
      *,
      partner_companies!inner(name, industry),
      quantum_companies!inner(name, logo),
      quantum_hardware!inner(name, type),
      quantum_software!inner(name, version),
      related_algorithms!inner(name, slug, quantum_advantage)
    `)
    .eq('slug', slug)
    .eq('published', true)
    .single();
    
  return data;
}
```

### 2. Content-First Static Generation
**Best Practice**: Pre-generate all content pages, use ISR for updates
```typescript
// OpenQase static generation strategy
export async function generateStaticParams() {
  const contentTypes = ['case_studies', 'algorithms', 'personas', 'industries'];
  const allParams = [];
  
  for (const contentType of contentTypes) {
    const { data } = await supabase
      .from(contentType)
      .select('slug')
      .eq('published', true);
      
    allParams.push(...data.map(item => ({ 
      contentType, 
      slug: item.slug 
    })));
  }
  
  return allParams;
}
```

### 3. Admin-Triggered Revalidation
**Best Practice**: Content publishing triggers selective rebuilds
```typescript
// OpenQase publish workflow
export async function publishContent(id: string, contentType: string) {
  // 1. Update content status
  const { data } = await supabase
    .from(contentType)
    .update({ 
      published: true, 
      published_at: new Date() 
    })
    .eq('id', id)
    .select('slug')
    .single();
  
  // 2. Trigger selective revalidation
  await Promise.all([
    revalidate(`/${contentType}/${data.slug}`),
    revalidate(`/${contentType}`), // List page
    revalidateRelatedContent(id, contentType)
  ]);
  
  return { success: true, revalidated: true };
}
```

### 4. Preview Mode for Editors
**Best Practice**: Separate preview mode for unpublished content
```typescript
// OpenQase preview implementation
export async function getServerSideProps({ params, preview = false }) {
  const publishedFilter = preview ? {} : { published: true };
  
  const content = await getCaseStudyWithRelationships(
    params.slug,
    publishedFilter
  );
  
  return {
    props: {
      content,
      preview: !!preview
    }
  };
}
```

## Recommended Architecture for OpenQase

### Hybrid Approach: Supabase + Static Generation
**Combining the best patterns**:

1. **Content Storage**: Keep Supabase as backend (like Strapi pattern)
2. **Relationship Resolution**: Single queries with joins (like Sanity GROQ)
3. **Static Generation**: ISR with selective revalidation (like Ghost)
4. **Admin Integration**: Publish triggers rebuild (like all platforms)

### Implementation Priorities

1. **Phase 1**: Unified content fetching pattern
2. **Phase 2**: Static generation for all content types  
3. **Phase 3**: Admin publish → revalidation workflow
4. **Phase 4**: Preview mode for draft content

## Performance Projections

Based on Jamstack CMS benchmarks:
- **Page Load Times**: < 500ms (vs current 2-30 seconds)
- **Core Web Vitals**: All green scores
- **Build Times**: < 2 minutes for full site
- **Cache Hit Ratio**: > 95% for content pages

## Next Steps

1. **Design OpenQase Static Architecture**: Combine best patterns from research
2. **Create Proof of Concept**: Implement case studies with new pattern
3. **Benchmark Performance**: Compare old vs new approach
4. **Plan Migration Strategy**: Incremental transition plan

---

**Document Status**: Research Complete - 0.4.0 Planning  
**Created**: January 2025  
**Last Updated**: January 2025  
**Research Sources**: Strapi, Sanity, Ghost, Tina CMS documentation and case studies  
**Next**: v040-design-static-options, v040-create-migration-strategy 