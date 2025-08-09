# Content Deletion System - Implementation Epics

## Overview
Implementation of a comprehensive soft delete system for OpenQase CMS, following industry best practices from WordPress, Contentful, Ghost, and other leading platforms.

**Content Lifecycle:**
```
Draft → Published → Unpublished → Archived → Soft Deleted → (30 days) → Hard Deleted
         ↓                ↓           ↓            ↓
    (visible)        (hidden)     (hidden)    (recoverable)
```

## Success Metrics
- **Safety**: 0 accidental permanent deletions in first 6 months
- **Performance**: <5% query impact with 10k soft deleted records  
- **Recovery**: 100% successful recovery rate for soft deleted content
- **Compliance**: Full GDPR audit trail within 30 days
- **SEO**: <1% traffic loss from deleted content (via redirects)

---

## Epic 1: Foundation - Database Schema & Infrastructure
**Priority:** P0 | **Risk:** Low | **Industry Alignment:** ✅ High

### User Stories
1. As a developer, I need deletion tracking columns added to all content tables so we can implement soft delete
2. As a system admin, I need proper indexes on deletion columns for query performance
3. As a developer, I need archive tables created for long-term storage of deleted content

### Implementation Tasks
```sql
-- Phase 1: Add columns to all content tables
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP DEFAULT NULL;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS deleted_by UUID DEFAULT NULL;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS archived_at TIMESTAMP DEFAULT NULL;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS archived_by UUID DEFAULT NULL;

-- Phase 2: Create filtered indexes for performance
CREATE INDEX idx_case_studies_not_deleted ON case_studies(id) 
WHERE deleted_at IS NULL;

-- Phase 3: Archive tables for long-term storage
CREATE TABLE archived_case_studies AS TABLE case_studies WITH NO DATA;
ALTER TABLE archived_case_studies ADD COLUMN archived_reason TEXT;
```

### Acceptance Criteria
- [ ] All content tables have soft delete columns
- [ ] Filtered indexes created for query performance
- [ ] Migration scripts are reversible
- [ ] No breaking changes to existing queries

---

## Epic 2: Query Layer Updates - Soft Delete Filtering
**Priority:** P0 | **Risk:** Medium | **Industry Alignment:** ✅ High

### User Stories
1. As a visitor, I should never see deleted content on the public site
2. As an admin, I need to optionally view deleted content in the trash
3. As a developer, I need consistent query behavior across all content types

### Implementation Approach
```typescript
// Update content-fetchers.ts
export async function getStaticContentList(
  contentType: string,
  options?: {
    includeDeleted?: boolean; // NEW: defaults to false
    includeArchived?: boolean; // NEW: defaults to false
  }
) {
  let query = supabase.from(contentType);
  
  // By default, exclude deleted items
  if (!options?.includeDeleted) {
    query = query.is('deleted_at', null);
  }
}
```

### Acceptance Criteria
- [ ] All public queries exclude soft-deleted content
- [ ] Admin queries support includeDeleted parameter
- [ ] Relationship queries handle soft-deleted references
- [ ] Performance impact <5% on query times

---

## Epic 3: Two-Stage Deletion UI/UX
**Priority:** P1 | **Risk:** Low | **Industry Alignment:** ✅ High

### User Stories
1. As a content editor, I need a clear "Move to Trash" action that's reversible
2. As an admin, I need to manage trash with bulk operations
3. As a content editor, I need clear warnings when content has references

### UI Components Needed
- Trash management interface at `/admin/trash`
- "Move to Trash" buttons replacing "Delete"
- Recovery interface with bulk operations
- Reference warning dialogs

### Acceptance Criteria
- [ ] "Move to Trash" as primary delete action
- [ ] Trash interface with filters and search
- [ ] Reference warnings before deletion
- [ ] Bulk trash operations
- [ ] 30-day retention clearly communicated

---

## Epic 4: Referential Integrity & Cascade Management  
**Priority:** P1 | **Risk:** High | **Industry Alignment:** ✅ Critical

### User Stories
1. As a content editor, I need to understand impact before deleting referenced content
2. As a system, I need to maintain data integrity when content is deleted
3. As an admin, I need to recover content with all its relationships intact

### Cascade Strategy (Option A)
```typescript
// When deleting content with references:
1. Check all references
2. Show warning with count and details
3. On confirmation: Soft delete junction table entries
4. Soft delete main content
5. Recovery restores everything
```

### Acceptance Criteria
- [ ] Pre-deletion reference checking
- [ ] Cascade soft delete for junction tables
- [ ] Recovery restores all relationships
- [ ] No orphaned references in production
- [ ] Clear cascade documentation

---

## Epic 5: SEO & URL Management
**Priority:** P1 | **Risk:** Medium | **Industry Alignment:** ✅ High

### User Stories
1. As a site owner, I need deleted content URLs to redirect appropriately
2. As an SEO manager, I need to preserve search rankings when content is removed
3. As a developer, I need automatic redirect creation for deleted published content

### Implementation
```typescript
// Automatic redirect creation
async function handleContentDeletion(content) {
  if (content.published) {
    await createRedirect({
      from: content.url,
      to: findBestRedirectTarget(content),
      type: 301
    });
  }
}
```

### Acceptance Criteria
- [ ] Auto 301 redirects for deleted published content
- [ ] Redirect management interface
- [ ] Pattern-based redirect rules
- [ ] No redirects to homepage
- [ ] Sitemap updates within 24 hours

---

## Epic 6: Compliance & Audit System
**Priority:** P2 | **Risk:** High | **Industry Alignment:** ✅ Required

### User Stories
1. As a compliance officer, I need complete audit trails of all deletions
2. As a data subject, I need my right to erasure to be fulfilled
3. As an admin, I need to prove compliance with retention policies

### Audit Requirements
- Complete deletion history with who/what/when/why
- GDPR compliance for permanent deletion
- Configurable retention periods
- Export functionality for audits

### Acceptance Criteria
- [ ] Complete audit log of deletions
- [ ] GDPR-compliant permanent deletion
- [ ] Configurable retention periods
- [ ] Audit log export functionality
- [ ] Automated compliance reports

---

## Epic 7: Performance Optimization & Background Processing
**Priority:** P2 | **Risk:** Medium | **Industry Alignment:** ✅ Best Practice

### User Stories
1. As a system admin, I need automatic cleanup of old deleted content
2. As a developer, I need deletion operations to not block the UI
3. As a site visitor, I need consistent fast page loads

### Background Jobs Needed
```typescript
// Scheduled cleanup job (runs daily)
async function cleanupDeletedContent() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  // Archive before permanent deletion
  await archiveOldContent(thirtyDaysAgo);
  
  // Permanent deletion
  await hardDeleteArchivedContent(thirtyDaysAgo);
}
```

### Acceptance Criteria  
- [ ] 30-day auto cleanup job
- [ ] Archive strategy for deleted content
- [ ] Performance metrics dashboard
- [ ] Async deletion for large operations
- [ ] <100ms queries with 100k+ soft deleted records

---

## Implementation Order

### Phase 1: Foundation (Week 1-2)
1. Epic 1: Database schema changes
2. Epic 2: Query layer updates (feature flagged)

### Phase 2: Core Functionality (Week 3-4)
1. Epic 3: Two-stage deletion UI
2. Epic 4: Referential integrity (with extensive testing)

### Phase 3: Production Readiness (Week 5-6)
1. Epic 5: SEO & redirects
2. Epic 6: Audit system basics

### Phase 4: Optimization (Week 7-8)
1. Epic 7: Background processing
2. Performance monitoring
3. Final testing and rollout

---

## Risk Mitigation

### Feature Flags
```typescript
const SOFT_DELETE_ENABLED = process.env.NEXT_PUBLIC_SOFT_DELETE === 'true';
const CASCADE_DELETE_ENABLED = process.env.NEXT_PUBLIC_CASCADE_DELETE === 'true';
```

### Rollback Plan
1. Feature flags can disable soft delete instantly
2. Database changes are additive (non-breaking)
3. All deleted content recoverable for 30 days
4. Backup before any permanent deletion

### Testing Strategy
1. Unit tests for all deletion functions
2. Integration tests for cascade scenarios
3. Performance benchmarks at 10k, 100k, 1M records
4. User acceptance testing with content team
5. Disaster recovery drill before production

---

## Industry Alignment

Our approach follows proven patterns from:
- **WordPress**: Two-stage deletion with trash (30+ million sites)
- **Contentful**: Reference checking and safety warnings
- **Ghost**: SEO-preserving redirects
- **Strapi**: Soft delete with lifecycle states
- **Drupal**: Role-based permissions and audit trails

**Industry Alignment Score: 9/10**

Missing only:
- Sanity's full revision system (overkill for our needs)
- Prismic's complex planning system (future enhancement)