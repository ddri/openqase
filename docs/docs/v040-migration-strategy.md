# OpenQase 0.4.0: Migration Strategy - API to Static

## Executive Summary

This document outlines the comprehensive migration strategy for transitioning OpenQase from its current complex API-heavy architecture to Simple Static Generation (SSG) with Next.js Draft Mode. The strategy addresses the identified pain points while ensuring zero downtime and maintaining all existing functionality.

## Current State Analysis

### Current Architecture Problems

**API Route Complexity**: 
- Case studies API route: 386 lines with complex filtering
- Multiple separate database queries (N+1 patterns)
- Junction table resolution in separate queries
- Service role client complexity

**Performance Issues**:
- 30+ second timeouts on case studies pages
- Complex relationship resolution causing delays
- Multiple round trips to database

**Inconsistent Patterns**:
- Case studies: Complex API routes → Client fetching
- Learning paths: Direct server components → Fast loading
- Mixed patterns causing confusion and maintenance overhead

### Target State

**Unified Pattern**: All content types use direct server component data fetching with static generation
**Performance**: Sub-second page loads from CDN edge
**Simplicity**: Single database calls with deep relationship resolution
**Preview**: Next.js Draft Mode for editorial workflow

## Migration Strategy Overview

**Duration**: 6 weeks
**Approach**: Incremental migration with parallel development
**Risk Level**: Low (incremental with rollback capabilities)

### Phase Timeline

```
Week 1-2: Foundation & Case Studies Migration
Week 3-4: Additional Content Types & Admin Integration  
Week 5-6: Preview Implementation & Performance Optimization
```

## Phase 1: Foundation & Case Studies (Weeks 1-2)

### Week 1: Foundation Setup

#### Task 1.1: Create Unified Content Fetching Pattern
**Objective**: Standardize data fetching across all content types

**Implementation**:
```typescript
// src/lib/content-fetchers.ts
export async function getStaticContentWithRelationships<T>(
  contentType: 'case_studies' | 'algorithms' | 'personas' | 'industries',
  slug: string,
  options: { preview?: boolean } = {}
): Promise<T | null> {
  const supabase = await createServerSupabaseClient();
  
  const relationshipMap = {
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
      algorithm_case_study_relations(case_studies(id, title, slug, description))
    `,
    personas: `
      *,
      persona_industry_relations(industries(id, name, slug)),
      persona_algorithm_relations(algorithms(id, name, slug, difficulty)),
      case_study_persona_relations(case_studies(id, title, slug, description))
    `,
    industries: `
      *,
      algorithm_industry_relations(algorithms(id, name, slug, use_cases)),
      case_study_industry_relations(case_studies(id, title, slug, description)),
      persona_industry_relations(personas(id, name, slug))
    `
  };

  const selectQuery = relationshipMap[contentType];
  let query = supabase
    .from(contentType)
    .select(selectQuery)
    .eq('slug', slug);

  // Only filter by published status if not in preview mode
  if (!options.preview) {
    query = query.eq('published', true);
  }

  const { data, error } = await query.single();

  if (error) {
    console.error(`Failed to fetch ${contentType}:`, error);
    return null;
  }

  return data;
}

export async function getStaticContentList<T>(
  contentType: 'case_studies' | 'algorithms' | 'personas' | 'industries',
  options: { preview?: boolean } = {}
): Promise<T[]> {
  const supabase = await createServerSupabaseClient();
  
  let query = supabase
    .from(contentType)
    .select('*')
    .order('updated_at', { ascending: false });

  if (!options.preview) {
    query = query.eq('published', true);
  }

  const { data, error } = await query;

  if (error) {
    console.error(`Failed to fetch ${contentType} list:`, error);
    return [];
  }

  return data || [];
}
```

**Duration**: 2 days
**Deliverable**: Unified content fetching library

#### Task 1.2: Configure Static Generation Base
**Objective**: Setup Next.js configuration for static generation

**Implementation**:
```typescript
// next.config.ts updates
const nextConfig = {
  output: 'export', // Enable static export
  trailingSlash: true,
  images: {
    unoptimized: true // Required for static export
  },
  // Remove any ISR configurations
}
```

**Duration**: 1 day
**Deliverable**: Next.js configuration ready for static generation

### Week 2: Case Studies Migration

#### Task 2.1: Convert Case Study Pages to Static Generation
**Objective**: Replace API route with direct server component fetching

**Before** (Current API Pattern):
```typescript
// src/app/case-study/[slug]/page.tsx - BEFORE
export default async function CaseStudyPage({ params }) {
  const response = await fetch(`/api/case-studies/${params.slug}`);
  const caseStudy = await response.json();
  // ... complex API handling
}
```

**After** (Static Generation Pattern):
```typescript
// src/app/case-study/[slug]/page.tsx - AFTER
export async function generateStaticParams() {
  const caseStudies = await getStaticContentList<CaseStudy>('case_studies');
  return caseStudies.map(({ slug }) => ({ slug }));
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const caseStudy = await getStaticContentWithRelationships<EnrichedCaseStudy>(
    'case_studies', 
    params.slug
  );
  
  if (!caseStudy) {
    notFound();
  }
  
  return <CaseStudyDisplay data={caseStudy} />;
}
```

**Duration**: 3 days
**Deliverable**: Case studies converted to static generation

#### Task 2.2: Remove Case Studies API Routes
**Objective**: Clean up complex API infrastructure

**Files to Remove**:
- `src/app/api/case-studies/[slug]/route.ts`
- `src/app/api/case-studies/route.ts`
- Related complex utility functions

**Duration**: 1 day
**Deliverable**: Simplified codebase without case studies API routes

#### Task 2.3: Setup Vercel Deploy Hooks
**Objective**: Enable content publish → rebuild workflow

**Implementation**:
```typescript
// Admin publish action update
export async function publishCaseStudy(id: string) {
  // 1. Update database
  const { data } = await supabase
    .from('case_studies')
    .update({ 
      published: true, 
      published_at: new Date() 
    })
    .eq('id', id)
    .select('slug')
    .single();

  // 2. Trigger full site rebuild
  await fetch(process.env.VERCEL_DEPLOY_HOOK!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      trigger: 'content_publish',
      contentType: 'case_studies',
      slug: data.slug 
    })
  });

  return { success: true, rebuilding: true };
}
```

**Duration**: 1 day
**Deliverable**: Automated rebuild on content publish

## Phase 2: Additional Content Types & Admin Integration (Weeks 3-4)

### Week 3: Convert Remaining Content Types

#### Task 3.1: Convert Algorithms to Static Generation
**Following the same pattern as case studies**

**Duration**: 2 days
**Deliverable**: Algorithms using static generation

#### Task 3.2: Convert Personas to Static Generation  
**Duration**: 2 days
**Deliverable**: Personas using static generation

#### Task 3.3: Convert Industries to Static Generation
**Duration**: 1 day
**Deliverable**: Industries using static generation

### Week 4: Admin Integration & API Cleanup

#### Task 4.1: Update Admin Publish Workflows
**Objective**: Integrate rebuild triggers into admin interface

**Implementation**:
```typescript
// src/components/admin/PublishButton.tsx
export function PublishButton({ contentType, id, currentStatus }: PublishButtonProps) {
  const [isPublishing, setIsPublishing] = useState(false);
  
  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const response = await fetch('/api/admin/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentType, id })
      });
      
      if (response.ok) {
        toast.success('Content published! Site rebuilding...');
      }
    } catch (error) {
      toast.error('Failed to publish content');
    } finally {
      setIsPublishing(false);
    }
  };
  
  return (
    <button onClick={handlePublish} disabled={isPublishing}>
      {isPublishing ? 'Publishing...' : 'Publish & Rebuild'}
    </button>
  );
}
```

**Duration**: 2 days
**Deliverable**: Admin interface integrated with static generation

#### Task 4.2: Remove All Complex API Routes
**Files to Remove**:
- `src/app/api/algorithms/[slug]/route.ts`
- `src/app/api/algorithms/route.ts`
- `src/app/api/personas/[slug]/route.ts`
- `src/app/api/industries/[slug]/route.ts`
- `src/utils/content-management.ts` (complex parts)

**Duration**: 2 days  
**Deliverable**: Significantly simplified API surface

## Phase 3: Preview Implementation & Optimization (Weeks 5-6)

### Week 5: Next.js Draft Mode Implementation

#### Task 5.1: Create Draft Mode API Route
**Objective**: Enable preview functionality for unpublished content

**Implementation**:
```typescript
// src/app/api/draft/route.ts
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { getStaticContentWithRelationships } from '@/lib/content-fetchers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  const contentType = searchParams.get('type') as 'case_studies' | 'algorithms' | 'personas' | 'industries';

  // Validate secret and parameters
  if (secret !== process.env.DRAFT_SECRET_TOKEN || !slug || !contentType) {
    return new Response('Invalid token', { status: 401 });
  }

  // Verify the content exists
  const content = await getStaticContentWithRelationships(
    contentType, 
    slug, 
    { preview: true }
  );
  
  if (!content) {
    return new Response('Content not found', { status: 404 });
  }

  // Enable Draft Mode
  draftMode().enable();
  
  // Redirect to the content page
  const contentPaths = {
    case_studies: '/case-study',
    algorithms: '/paths/algorithm', 
    personas: '/paths/persona',
    industries: '/paths/industry'
  };
  
  redirect(`${contentPaths[contentType]}/${slug}`);
}
```

**Duration**: 2 days
**Deliverable**: Draft mode API route

#### Task 5.2: Update Page Components for Preview
**Objective**: Enable preview content fetching in page components

**Implementation**:
```typescript
// Example: src/app/case-study/[slug]/page.tsx
import { draftMode } from 'next/headers';

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const { isEnabled } = draftMode();
  
  const caseStudy = await getStaticContentWithRelationships<EnrichedCaseStudy>(
    'case_studies', 
    params.slug,
    { preview: isEnabled }
  );
  
  if (!caseStudy) {
    notFound();
  }
  
  return <CaseStudyDisplay data={caseStudy} showPreviewBanner={isEnabled} />;
}
```

**Duration**: 2 days
**Deliverable**: All content pages support preview mode

#### Task 5.3: Admin Preview Integration
**Objective**: Add preview buttons to admin interface

**Implementation**:
```typescript
// src/components/admin/PreviewButton.tsx
export function PreviewButton({ contentType, slug }: PreviewButtonProps) {
  const previewUrl = `/api/draft?secret=${process.env.NEXT_PUBLIC_DRAFT_SECRET}&type=${contentType}&slug=${slug}`;
  
  return (
    <button 
      onClick={() => window.open(previewUrl, '_blank')}
      className="preview-btn"
    >
      Preview Draft
    </button>
  );
}
```

**Duration**: 1 day
**Deliverable**: Preview functionality in admin

### Week 6: Performance Optimization & Documentation

#### Task 6.1: Performance Monitoring Setup
**Objective**: Track the performance improvements

**Implementation**:
```typescript
// src/lib/performance-monitor.ts
export function trackPageLoad(contentType: string, slug: string) {
  if (typeof window !== 'undefined') {
    const loadTime = performance.now();
    
    // Track Core Web Vitals
    getCLS(console.log);
    getFID(console.log);
    getLCP(console.log);
    
    // Log performance metrics
    console.log(`Page Load: ${contentType}/${slug} in ${loadTime}ms`);
  }
}
```

**Duration**: 2 days
**Deliverable**: Performance monitoring system

#### Task 6.2: Create Migration Documentation
**Objective**: Document the new patterns and procedures

**Content**:
- Content authoring workflow with preview
- Deployment and rebuild process
- Troubleshooting guide
- Performance benchmarks

**Duration**: 2 days
**Deliverable**: Comprehensive documentation

#### Task 6.3: Testing & Validation
**Objective**: Ensure all functionality works correctly

**Testing Areas**:
- All content types load correctly
- Preview functionality works
- Rebuild triggers function
- Performance meets targets
- Admin workflows function

**Duration**: 1 day
**Deliverable**: Validated migration

## Risk Mitigation

### Risk 1: Content Not Building
**Mitigation**: Keep old API routes during migration for rollback
**Detection**: Build monitoring and alerts
**Response**: Immediate rollback to previous API patterns

### Risk 2: Preview Mode Not Working  
**Mitigation**: Thorough testing in staging environment
**Detection**: Manual testing of all preview workflows
**Response**: Fix preview mode before removing API routes

### Risk 3: Performance Regression
**Mitigation**: Performance benchmarks before/after
**Detection**: Core Web Vitals monitoring
**Response**: Optimize queries or rollback if needed

### Risk 4: Admin Workflow Disruption
**Mitigation**: Parallel implementation with feature flags
**Detection**: User feedback and error monitoring
**Response**: Quick fixes or temporary API route restoration

## Success Metrics

### Performance Targets

- **Page Load Time**: 30s → &lt;500ms (99%+ improvement)
- **Core Web Vitals**: All green scores
- **Build Time**: &lt;3 minutes for full site
- **CDN Cache Hit Rate**: >95%

### Technical Targets  
- **Code Reduction**: Remove 1000+ lines of complex API code
- **Database Queries**: Reduce from N+1 to single query per page
- **Error Rate**: &lt;0.1% content loading failures
- **Rebuild Success Rate**: >99%

### Editorial Workflow Targets
- **Preview Access**: &lt;5 seconds from admin to preview
- **Publish to Live**: &lt;3 minutes from publish to live site
- **Content Editor Satisfaction**: Maintain current workflow ease

## Rollback Plan

### Immediate Rollback (Minutes)
1. Revert to previous deployment via Vercel dashboard
2. Restore API routes from git history  
3. Update admin interface to use API endpoints
4. Communicate status to content team

### Partial Rollback (Content Type Specific)
1. Restore specific API routes for problematic content type
2. Update page components to use API instead of direct fetching
3. Maintain static generation for working content types
4. Fix issues and re-migrate incrementally

### Full Migration Abort
1. Restore all API routes
2. Remove static generation configuration
3. Return to ISR or SSR patterns
4. Document lessons learned for future attempt

## Communication Plan

### Stakeholder Updates
- **Weekly**: Progress reports to technical leadership
- **Bi-weekly**: Content team workflow impact updates
- **Major milestones**: Company-wide announcements

### Content Team Training
- **Week 2**: New publish workflow demonstration
- **Week 4**: Preview functionality training
- **Week 6**: Full workflow certification

### Documentation Delivery
- **Week 3**: Draft documentation for review
- **Week 5**: Final documentation and training materials
- **Week 6**: Knowledge transfer sessions

## Post-Migration Monitoring

### First Week After Migration
- **Daily**: Performance monitoring and error tracking
- **Daily**: Content team feedback collection
- **Daily**: Build success rate monitoring

### First Month After Migration
- **Weekly**: Performance trend analysis
- **Weekly**: Editorial workflow assessment  
- **Monthly**: Technical debt and optimization opportunities

### Ongoing Monitoring
- **Monthly**: Performance benchmarks
- **Quarterly**: Content team satisfaction surveys
- **Quarterly**: Technical architecture review

---

**Document Status**: Migration Strategy Complete - 0.4.0 Planning  
**Created**: January 2025  
**Last Updated**: January 2025  
**Dependencies**: Architecture decision (SSG + Draft Mode) approved  
**Next Phase**: Implementation Phase 1 kickoff 