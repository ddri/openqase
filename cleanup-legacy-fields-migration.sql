-- FUTURE CLEANUP MIGRATION: Remove legacy tag fields after production verification
-- 
-- WARNING: Only run this migration AFTER:
-- 1. Successful production deployment of new content types
-- 2. Verification that all case study relationships are working correctly
-- 3. Confirmation that no rollback is needed
-- 
-- This migration removes the legacy TEXT[] fields that have been replaced 
-- by proper relationship tables.

-- STEP 1: Create backup of legacy data (for final verification)
CREATE TABLE IF NOT EXISTS legacy_tags_backup AS 
SELECT 
  id,
  title,
  slug,
  quantum_software,
  quantum_hardware, 
  quantum_companies,
  partner_companies,
  created_at
FROM case_studies
WHERE quantum_software IS NOT NULL 
   OR quantum_hardware IS NOT NULL
   OR quantum_companies IS NOT NULL  
   OR partner_companies IS NOT NULL;

-- STEP 2: Add comments documenting the backup
COMMENT ON TABLE legacy_tags_backup IS 'Backup of legacy tag data before field removal. Created during content type migration. Safe to drop after 30 days of successful production operation.';

-- STEP 3: Drop the legacy columns from case_studies table
-- UNCOMMENT THESE LINES ONLY AFTER PRODUCTION VERIFICATION:

-- ALTER TABLE case_studies DROP COLUMN IF EXISTS quantum_software;
-- ALTER TABLE case_studies DROP COLUMN IF EXISTS quantum_hardware; 
-- ALTER TABLE case_studies DROP COLUMN IF EXISTS quantum_companies;
-- ALTER TABLE case_studies DROP COLUMN IF EXISTS partner_companies;

-- STEP 4: Update any remaining references in admin interfaces
-- Note: The code has already been updated to use relationships first,
-- with legacy fields as fallback. Once columns are dropped, the fallback
-- will simply return empty arrays.

-- STEP 5: Performance verification queries
-- Run these after cleanup to ensure performance is maintained:

/*
-- Test query performance after cleanup:
EXPLAIN ANALYZE
SELECT 
  cs.title,
  array_agg(DISTINCT qs.name) FILTER (WHERE qs.name IS NOT NULL) as quantum_software,
  array_agg(DISTINCT qh.name) FILTER (WHERE qh.name IS NOT NULL) as quantum_hardware,
  array_agg(DISTINCT qc.name) FILTER (WHERE qc.name IS NOT NULL) as quantum_companies,
  array_agg(DISTINCT pc.name) FILTER (WHERE pc.name IS NOT NULL) as partner_companies
FROM case_studies cs
LEFT JOIN case_study_quantum_software_relations csr ON cs.id = csr.case_study_id
LEFT JOIN quantum_software qs ON csr.quantum_software_id = qs.id AND qs.published = true
LEFT JOIN case_study_quantum_hardware_relations chr ON cs.id = chr.case_study_id
LEFT JOIN quantum_hardware qh ON chr.quantum_hardware_id = qh.id AND qh.published = true
LEFT JOIN case_study_quantum_company_relations ccr ON cs.id = ccr.case_study_id
LEFT JOIN quantum_companies qc ON ccr.quantum_company_id = qc.id AND qc.published = true
LEFT JOIN case_study_partner_company_relations cpr ON cs.id = cpr.case_study_id
LEFT JOIN partner_companies pc ON cpr.partner_company_id = pc.id AND pc.published = true
WHERE cs.published = true
GROUP BY cs.id, cs.title
ORDER BY cs.title
LIMIT 10;
*/

-- FINAL NOTES:
-- - This migration is designed to be run manually after production verification
-- - The legacy_tags_backup table should be kept for 30 days as additional safety
-- - All application code has been updated to work with or without legacy fields
-- - Rollback plan: Restore columns from backup if needed (though this should not be necessary)