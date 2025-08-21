# Content Types Migration - Deployment Checklist

## Pre-Deployment
- [x] ✅ Pull production database to local development
- [x] ✅ Create new database schema (4 content types + junction tables)
- [x] ✅ Migrate existing tag data to new content records
- [x] ✅ Build admin interfaces for content management
- [x] ✅ Create public pages for content browsing
- [x] ✅ Update case study pages with clickable links
- [x] ✅ Test data integrity (100% migration success)
- [x] ✅ Test performance (1.6ms complex queries)
- [x] ✅ Verify 164 content items, 287 relationships

## Deployment Steps

### 1. Database Migration
```bash
# Apply the main migration
psql $DATABASE_URL -f create-content-types-migration.sql
psql $DATABASE_URL -f migrate-tags-to-content.sql
```

### 2. Application Deployment
- Deploy updated codebase with new content types
- Verify admin interfaces are accessible
- Test public pages load correctly

### 3. Post-Deployment Verification
- [ ] Admin pages load: `/admin/quantum-software`, `/admin/quantum-hardware`, etc.
- [ ] Public pages load: `/paths/quantum-software`, `/paths/quantum-hardware`, etc.
- [ ] Case study pages show clickable links instead of static badges
- [ ] Test a few case study pages to verify relationships work
- [ ] Verify performance is acceptable (< 2ms for complex queries)

### 4. Data Verification Queries
```sql
-- Verify migration coverage
SELECT 
  COUNT(*) as total_published_case_studies,
  COUNT(DISTINCT csr.case_study_id) as with_software_relations,
  COUNT(DISTINCT chr.case_study_id) as with_hardware_relations
FROM case_studies cs
LEFT JOIN case_study_quantum_software_relations csr ON cs.id = csr.case_study_id
LEFT JOIN case_study_quantum_hardware_relations chr ON cs.id = chr.case_study_id
WHERE cs.published = true;

-- Test specific case study relationships
SELECT cs.title, qs.name as software, qh.name as hardware
FROM case_studies cs
LEFT JOIN case_study_quantum_software_relations csr ON cs.id = csr.case_study_id
LEFT JOIN quantum_software qs ON csr.quantum_software_id = qs.id
LEFT JOIN case_study_quantum_hardware_relations chr ON cs.id = chr.case_study_id  
LEFT JOIN quantum_hardware qh ON chr.quantum_hardware_id = qh.id
WHERE cs.published = true
AND cs.title LIKE '%IBM%'
LIMIT 3;
```

## Rollback Plan (if needed)
1. The new system is designed to work alongside legacy fields
2. If issues occur, legacy string arrays are still in database
3. Revert codebase to use only legacy fields if necessary
4. New tables can be dropped without affecting core functionality

## Post-Verification Cleanup (Do NOT run immediately)
- After 7-14 days of successful production operation
- Run the commands in `cleanup-legacy-fields-migration.sql`
- This will remove the legacy TEXT[] fields

## Success Criteria
- [ ] All admin interfaces functional
- [ ] All public pages load correctly  
- [ ] Case study pages show clickable content links
- [ ] No performance degradation
- [ ] No data loss or corruption
- [ ] User experience improved (clickable vs static content)

## Emergency Contacts
- Database issues: [Database Admin]
- Application issues: [Dev Team]
- Performance issues: [Infrastructure Team]

## Notes
- Legacy fields preserved as safety net
- New relationship system prioritized over legacy
- Backward compatibility maintained throughout
- Cleanup migration available for future execution