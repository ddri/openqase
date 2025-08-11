# Content Deletion System - Implementation Documentation

## Overview

This document describes the implementation of OpenQase's content deletion system, which provides safe, recoverable content deletion with a two-stage process similar to WordPress's Trash system.

**Implementation Date:** August 2025  
**Architecture Pattern:** View-based soft delete with status field  
**Inspiration:** WordPress (two-stage deletion) + Ghost CMS (minimalist views)

## System Architecture

### Core Design Principles

1. **Safety First**: Content is never immediately deleted; it enters a "deleted" state first
2. **Clean Separation**: Database views provide clean access patterns for different contexts
3. **Audit Trail**: All deletion operations are logged for compliance
4. **Performance**: Indexed views ensure minimal query performance impact
5. **Simplicity**: Status field approach avoids complex query modifications

### Content Lifecycle

```
Draft → Published → Archived → Deleted → (30 days) → Permanently Deleted
  ↓         ↓          ↓          ↓
(editing) (public)  (hidden)  (trash)
```

## Database Schema

### Content Status Field

All content tables now include a `content_status` field:

```sql
content_status VARCHAR(20) CHECK (content_status IN ('draft', 'published', 'archived', 'deleted'))
```

### Soft Delete Columns

Each content table includes:
- `deleted_at` - Timestamp of deletion
- `deleted_by` - UUID of user who deleted
- `archived_at` - Timestamp of archival
- `archived_by` - UUID of user who archived

### Database Views

The system uses four view types for each content table:

1. **public_[table]** - Shows only published content (for website visitors)
2. **admin_[table]** - Shows all non-deleted content (for CMS admin)
3. **trash_[table]** - Shows only deleted content (for recovery)
4. **all_[table]** - Shows everything with effective_status (for super admin)

Example for case_studies:
```sql
-- Public view (website visitors)
CREATE VIEW public_case_studies AS
SELECT * FROM case_studies WHERE content_status = 'published';

-- Admin view (CMS users)
CREATE VIEW admin_case_studies AS
SELECT * FROM case_studies WHERE content_status != 'deleted';

-- Trash view (recovery interface)
CREATE VIEW trash_case_studies AS
SELECT * FROM case_studies WHERE content_status = 'deleted';

-- All content view (super admin)
CREATE VIEW all_case_studies AS
SELECT *,
  CASE 
    WHEN content_status = 'deleted' AND deleted_at < NOW() - INTERVAL '30 days' 
      THEN 'pending_permanent_delete'
    ELSE content_status
  END as effective_status
FROM case_studies;
```

## Database Functions

### soft_delete_content()

Soft deletes a content item:

```sql
SELECT soft_delete_content('case_studies', 'content-uuid', 'user-uuid');
```

Actions:
1. Sets content_status to 'deleted'
2. Sets deleted_at timestamp
3. Sets published to false
4. Logs to audit table

### recover_content()

Recovers a soft-deleted item:

```sql
SELECT recover_content('case_studies', 'content-uuid', 'user-uuid');
```

Actions:
1. Sets content_status to 'draft'
2. Clears deleted_at
3. Sets published to false (safety)
4. Logs recovery to audit

### archive_content()

Archives content (hidden but not deleted):

```sql
SELECT archive_content('case_studies', 'content-uuid', 'user-uuid');
```

## Implementation in Code

### Admin Pages

Admin pages use the admin views to show all non-deleted content:

```typescript
// Before (direct table access)
const { data } = await supabase
  .from('case_studies')
  .select('*')
  .eq('published', true)

// After (view-based access)
const { data } = await supabase
  .from('admin_case_studies')
  .select('*')
```

### Public Pages

Public pages use the public views for published content only:

```typescript
const { data } = await supabase
  .from('public_case_studies')
  .select('*')
```

### Content Management Utils

The `deleteContentItem` function in `/src/utils/content-management.ts` handles soft deletion:

```typescript
export async function deleteContentItem({
  contentType,
  id,
  hardDelete = false,
  deletedBy = null
}) {
  if (!hardDelete) {
    // Soft delete using database function
    const { error } = await supabase
      .rpc('soft_delete_content', {
        table_name: contentType,
        content_id: id,
        deleted_by_user: deletedBy
      });
  }
}
```

## Audit Trail

All deletion operations are logged to `deletion_audit_log`:

```sql
CREATE TABLE deletion_audit_log (
  id UUID PRIMARY KEY,
  content_type VARCHAR(50),
  content_id UUID,
  action VARCHAR(20), -- 'soft_delete', 'restore', 'archive', 'hard_delete'
  performed_by UUID,
  performed_at TIMESTAMP,
  reason TEXT
);
```

## Configuration

Retention policies are stored in `deletion_config`:

```sql
CREATE TABLE deletion_config (
  content_type VARCHAR(50) PRIMARY KEY,
  soft_delete_retention_days INTEGER DEFAULT 30,
  archive_retention_days INTEGER DEFAULT 365,
  auto_cleanup_enabled BOOLEAN DEFAULT true
);
```

## Migration Path

### From Query-Based to View-Based

Initially, we attempted to modify all queries to filter out deleted content:

```typescript
// Problematic approach - modifying every query
query = query.is('deleted_at', null)
```

This approach was abandoned because:
1. Required modifying every query in the codebase
2. Error-prone and easy to miss queries
3. Made the code complex and harder to maintain

The view-based approach is cleaner:
1. Views handle filtering at the database level
2. Application code remains simple
3. Clear separation between public/admin/trash contexts

## TypeScript Types

Types are generated from database views:

```typescript
// Admin view type (nullable fields from view)
export type CaseStudy = Database['public']['Views']['admin_case_studies']['Row']

// Handling nullable IDs in components
const handleSelect = (id: string | null) => {
  if (!id) return;
  // Process selection
}
```

## Testing

### Manual Testing Performed

1. **Soft Delete Test**
   ```sql
   SELECT soft_delete_content('case_studies', 'test-uuid', NULL);
   -- Verified: Content moves to deleted status
   -- Verified: Content appears in trash_case_studies view
   -- Verified: Content hidden from admin_case_studies view
   ```

2. **Recovery Test**
   ```sql
   SELECT recover_content('case_studies', 'test-uuid', NULL);
   -- Verified: Content returns to draft status
   -- Verified: Content reappears in admin_case_studies view
   -- Verified: Content removed from trash_case_studies view
   ```

3. **View Filtering Test**
   ```sql
   SELECT COUNT(*) FROM public_case_studies;  -- Only published
   SELECT COUNT(*) FROM admin_case_studies;   -- All non-deleted
   SELECT COUNT(*) FROM trash_case_studies;   -- Only deleted
   ```

## Known Limitations

1. **Nullable View Fields**: Views return nullable fields even when base table has NOT NULL constraints
2. **Manual Cleanup**: No automated background job for permanent deletion after 30 days yet
3. **Cascade Deletes**: Relationships not yet handled (Epic 4)
4. **UI Components**: Trash interface not yet built (Epic 3)

## Future Enhancements (Remaining Epics)

### Epic 3: Two-Stage Deletion UI/UX
- Add Trash page to admin interface
- Add delete/restore buttons
- Bulk operations support

### Epic 4: Referential Integrity
- Handle cascade soft deletes for relationships
- Maintain referential integrity

### Epic 5: SEO & URL Management
- 404 handling for deleted content
- Redirect management
- Sitemap updates

### Epic 6: Compliance & Audit
- GDPR compliance reports
- Full audit trail interface
- Data retention policies

### Epic 7: Performance & Background Processing
- Automated cleanup job for 30+ day old deletions
- Performance optimization for large datasets
- Archive compression

## Benefits of This Approach

1. **Clean Architecture**: Views provide clean separation of concerns
2. **Performance**: Indexed views are fast, no runtime filtering needed
3. **Safety**: Two-stage deletion prevents accidental data loss
4. **Maintainability**: Simple application code, complexity handled in database
5. **Flexibility**: Easy to add new views or modify access patterns
6. **Compliance**: Full audit trail for regulatory requirements

## References

- [WordPress Trash System](https://wordpress.org/support/article/trash/)
- [Ghost CMS Architecture](https://ghost.org/docs/architecture/)
- [Supabase Views Documentation](https://supabase.com/docs/guides/database/views)
- Original Epic Planning: `/docs/deletion-system-epics.md`