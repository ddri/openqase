# Production Deployment Checklist for Case Study Import System

## Overview
This checklist ensures safe deployment of the case study import system to production, including database schema updates and import functionality.

## Pre-Deployment Steps

### 1. Database Schema Migration
**CRITICAL: Run these steps in order**

1. **Apply the production migration**:
   ```bash
   supabase db push --linked
   ```
   This will apply: `20250130130000_production_import_columns.sql`

2. **Verify migration success**:
   ```bash
   supabase db shell --linked
   \d case_studies
   ```
   Confirm these columns exist:
   - `import_batch_name` (VARCHAR(10))
   - `year` (INTEGER)
   - `import_batch_id` (UUID)
   - `import_source` (TEXT)
   - `import_timestamp` (TIMESTAMP WITH TIME ZONE)
   - `original_qookie_id` (TEXT)
   - `original_qookie_slug` (TEXT)

### 2. Environment Configuration
Ensure production environment has the service role key properly configured for bulk operations.

### 3. Test Import (Dry Run)
Before importing 104 case studies, test with a small batch:

1. **Test entity mapping**:
   ```bash
   tsx scripts/import-case-studies-with-mapping.ts /path/to/single-file.json
   ```
   (without --commit flag for dry run)

2. **Verify relationships are found**:
   - Should map algorithms, industries, personas
   - Check for any unmapped entities

## Deployment Steps

### 1. Deploy Application Code
Deploy the enhanced admin interface and API changes.

### 2. Run Production Import
**Only after successful schema migration and testing**:

```bash
tsx scripts/import-case-studies-with-mapping.ts /Users/dryan/GitHub/openqase/public/exports-from-qookie/ --commit
```

Expected results:
- 103-104 case studies imported
- Batch name: QK-002 (or next available)
- All entities properly mapped
- Case studies imported as drafts (unpublished)

### 3. Verify Import Success
1. Check admin interface: `/admin/case-studies`
2. Verify filter by import batch works
3. Test bulk operations
4. Spot-check a few case studies for data integrity

## Post-Deployment Verification

### Admin Interface Tests
- [ ] Filter by import batch "QK-002"
- [ ] Search functionality works
- [ ] Bulk publish/unpublish works
- [ ] Individual case study editing works
- [ ] Relationship data displays correctly

### Database Verification
```sql
-- Check import summary
SELECT 
    import_batch_name,
    import_source,
    COUNT(*) as count,
    MIN(import_timestamp) as first_import,
    MAX(import_timestamp) as last_import
FROM case_studies 
WHERE import_batch_name IS NOT NULL
GROUP BY import_batch_name, import_source;

-- Check relationship mappings
SELECT 
    COUNT(DISTINCT cs.id) as case_studies,
    COUNT(acsr.algorithm_id) as algorithm_relations,
    COUNT(csir.industry_id) as industry_relations,
    COUNT(cspr.persona_id) as persona_relations
FROM case_studies cs
LEFT JOIN algorithm_case_study_relations acsr ON cs.id = acsr.case_study_id
LEFT JOIN case_study_industry_relations csir ON cs.id = csir.case_study_id  
LEFT JOIN case_study_persona_relations cspr ON cs.id = cspr.case_study_id
WHERE cs.import_batch_name = 'QK-002';
```

## Rollback Plan
If issues occur, rollback using the batch ID:

```sql
-- Delete imported case studies and relationships
DELETE FROM algorithm_case_study_relations 
WHERE case_study_id IN (
    SELECT id FROM case_studies WHERE import_batch_name = 'QK-002'
);

DELETE FROM case_study_industry_relations 
WHERE case_study_id IN (
    SELECT id FROM case_studies WHERE import_batch_name = 'QK-002'
);

DELETE FROM case_study_persona_relations 
WHERE case_study_id IN (
    SELECT id FROM case_studies WHERE import_batch_name = 'QK-002'
);

DELETE FROM case_studies WHERE import_batch_name = 'QK-002';
```

## Files Modified/Added
- `supabase/migrations/20250130130000_production_import_columns.sql`
- `src/app/api/case-studies/route.ts` (enhanced filtering/bulk ops)
- `src/app/admin/case-studies/client.tsx` (enhanced admin UI)
- `src/lib/supabase-server.ts` (service role client fixes)
- `src/types/supabase.ts` (type definitions for new columns)

## Performance Notes
- Import process handles 104 files efficiently
- 1,231 entity relationships mapped automatically
- Admin interface paginated for large datasets
- Indexes added for import-related queries

## Security Considerations
- Import script requires service role access
- Imported case studies are unpublished by default
- Admin interface requires authentication
- Bulk operations are logged and auditable