# Production Database Migrations - PENDING

**⚠️ CRITICAL: These migrations have NOT been run in production yet**

Last Updated: 2024-12-17
Status: PENDING DEPLOYMENT

## Overview
The entity relationship system has been fully implemented in code but requires database migrations to be run in production. The system maintains backward compatibility with legacy TEXT[] fields until migrations are complete.

## Migration Files Required (IN ORDER)

### 1. Create Content Types and Relationships
**File:** `create-content-types-migration.sql`
**Purpose:** Creates new tables for quantum entities and junction tables
**Tables Created:**
- `quantum_software` (54 items to migrate)
- `quantum_hardware` (40 items to migrate) 
- `quantum_companies` (23 items to migrate)
- `partner_companies` (47 items to migrate)
- Junction tables for all relationships

**SQL to Run:**
```sql
-- Run entire file: create-content-types-migration.sql
-- This creates all tables, indexes, triggers, and RLS policies
```

### 2. Migrate Data from Legacy Fields
**File:** `migrate-tags-to-content.sql`
**Purpose:** Populates new tables from existing TEXT[] arrays
**Actions:**
- Extracts unique values from case_studies TEXT[] fields
- Creates entity records in new tables
- Creates relationship records in junction tables
- Preserves all existing associations

**SQL to Run:**
```sql
-- Run entire file: migrate-tags-to-content.sql
-- This populates all data and relationships
```

### 3. Cleanup Legacy Fields (ONLY AFTER VERIFICATION)
**File:** `cleanup-legacy-fields-migration.sql`
**Purpose:** Removes deprecated TEXT[] columns
**⚠️ WARNING:** Only run after confirming new system works
**Columns to Remove:**
- `case_studies.quantum_software`
- `case_studies.quantum_hardware`
- `case_studies.quantum_companies`
- `case_studies.partner_companies`

## Production Deployment Checklist

### Pre-Deployment
- [ ] **BACKUP PRODUCTION DATABASE**
- [ ] Test migrations on staging/local environment
- [ ] Verify rollback plan is ready
- [ ] Schedule maintenance window if needed

### Deployment Steps
1. [ ] Run `create-content-types-migration.sql` in production
2. [ ] Verify tables created successfully
3. [ ] Run `migrate-tags-to-content.sql` in production
4. [ ] Verify data migrated correctly:
   ```sql
   -- Verify entity counts
   SELECT 'quantum_software' as type, COUNT(*) as count FROM quantum_software
   UNION ALL
   SELECT 'quantum_hardware', COUNT(*) FROM quantum_hardware
   UNION ALL
   SELECT 'quantum_companies', COUNT(*) FROM quantum_companies
   UNION ALL
   SELECT 'partner_companies', COUNT(*) FROM partner_companies;
   
   -- Verify relationships
   SELECT 'software_relations' as type, COUNT(*) as count 
   FROM case_study_quantum_software_relations
   UNION ALL
   SELECT 'hardware_relations', COUNT(*) 
   FROM case_study_quantum_hardware_relations
   UNION ALL
   SELECT 'company_relations', COUNT(*) 
   FROM case_study_quantum_company_relations
   UNION ALL
   SELECT 'partner_relations', COUNT(*) 
   FROM case_study_partner_company_relations;
   ```

5. [ ] Deploy application code with entity relationship support
6. [ ] Test in production:
   - [ ] View case study page - entities should be clickable
   - [ ] Edit case study in admin - entity dropdowns should work
   - [ ] Save case study - relationships should persist
   - [ ] View entity detail pages

### Post-Deployment Verification (Wait 1-2 weeks)
7. [ ] Monitor for any issues
8. [ ] Confirm all features working correctly
9. [ ] Run `cleanup-legacy-fields-migration.sql` (OPTIONAL)

## Rollback Plan

If issues occur after migrations but before cleanup:
1. Application automatically falls back to legacy TEXT[] fields
2. No immediate action needed - system maintains compatibility

If critical issues:
```sql
-- Emergency rollback (if needed before cleanup)
-- The system will continue using legacy fields
-- No data loss as legacy fields still exist
```

## Local Testing Commands

```bash
# Start local Supabase
supabase start

# Reset and apply migrations
supabase db reset --local

# Or apply individually
supabase db push --local < create-content-types-migration.sql
supabase db push --local < migrate-tags-to-content.sql

# Test the application
npm run dev
```

## Code Changes Already Implemented

✅ Admin UI for managing relationships
✅ Content fetchers support new relationships  
✅ Public pages display entity links
✅ Save/delete operations handle relationships
✅ Backward compatibility maintained

## Expected Outcomes

After successful migration:
- 164 total new entity records created
- ~287 relationship records established
- Case studies will show clickable entity badges
- Admin can manage entities via dropdowns
- Each entity has its own detail page

## Risk Assessment

**Risk Level: LOW-MEDIUM**
- Backward compatibility ensures no immediate breakage
- Migrations are additive (don't modify existing data)
- Legacy fields preserved until verified
- Can operate in hybrid mode indefinitely

## Contact for Issues

If any issues during migration:
1. Check this document first
2. Verify migration SQL files are complete
3. Check application logs for relationship errors
4. Legacy fields are fallback - system should continue working

## Notes

- All migrations tested locally with Supabase
- Entity IDs are UUIDs (generated automatically)
- Soft delete support included (deleted_at field)
- RLS policies configured for public read access
- Full text search enabled on entity descriptions