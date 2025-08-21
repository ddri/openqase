-- Migration: Convert existing tag arrays to content records and relationships
-- This script extracts unique tags from case_studies and creates proper content records

-- First, let's see what we're working with
-- SELECT DISTINCT unnest(quantum_software) as software FROM case_studies WHERE quantum_software IS NOT NULL;

-- Helper function to create slugs from names
CREATE OR REPLACE FUNCTION create_slug(name_text TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(
    regexp_replace(
      regexp_replace(name_text, '[^a-zA-Z0-9\s-]', '', 'g'),
      '\s+', '-', 'g'
    )
  );
END;
$$ LANGUAGE plpgsql;

-- 1. MIGRATE QUANTUM SOFTWARE
INSERT INTO quantum_software (slug, name, description, published, created_at, updated_at)
SELECT 
  create_slug(software_name) as slug,
  software_name as name,
  'Quantum software platform used in case studies.' as description,
  true as published,
  NOW() as created_at,
  NOW() as updated_at
FROM (
  SELECT DISTINCT unnest(quantum_software) as software_name 
  FROM case_studies 
  WHERE quantum_software IS NOT NULL 
    AND array_length(quantum_software, 1) > 0
) unique_software
WHERE software_name IS NOT NULL 
  AND software_name != ''
ON CONFLICT (slug) DO NOTHING;

-- 2. MIGRATE QUANTUM HARDWARE  
INSERT INTO quantum_hardware (slug, name, description, published, created_at, updated_at)
SELECT 
  create_slug(hardware_name) as slug,
  hardware_name as name,
  'Quantum hardware platform used in case studies.' as description,
  true as published,
  NOW() as created_at,
  NOW() as updated_at
FROM (
  SELECT DISTINCT unnest(quantum_hardware) as hardware_name 
  FROM case_studies 
  WHERE quantum_hardware IS NOT NULL 
    AND array_length(quantum_hardware, 1) > 0
) unique_hardware
WHERE hardware_name IS NOT NULL 
  AND hardware_name != ''
ON CONFLICT (slug) DO NOTHING;

-- 3. MIGRATE QUANTUM COMPANIES
INSERT INTO quantum_companies (slug, name, description, published, created_at, updated_at)
SELECT 
  create_slug(company_name) as slug,
  company_name as name,
  'Quantum computing company involved in case studies.' as description,
  true as published,
  NOW() as created_at,
  NOW() as updated_at
FROM (
  SELECT DISTINCT unnest(quantum_companies) as company_name 
  FROM case_studies 
  WHERE quantum_companies IS NOT NULL 
    AND array_length(quantum_companies, 1) > 0
) unique_companies
WHERE company_name IS NOT NULL 
  AND company_name != ''
ON CONFLICT (slug) DO NOTHING;

-- 4. MIGRATE PARTNER COMPANIES
INSERT INTO partner_companies (slug, name, description, published, created_at, updated_at)
SELECT 
  create_slug(company_name) as slug,
  company_name as name,
  'Partner company involved in quantum computing case studies.' as description,
  true as published,
  NOW() as created_at,
  NOW() as updated_at
FROM (
  SELECT DISTINCT unnest(partner_companies) as company_name 
  FROM case_studies 
  WHERE partner_companies IS NOT NULL 
    AND array_length(partner_companies, 1) > 0
) unique_partners
WHERE company_name IS NOT NULL 
  AND company_name != ''
ON CONFLICT (slug) DO NOTHING;

-- 5. CREATE RELATIONSHIPS - QUANTUM SOFTWARE
INSERT INTO case_study_quantum_software_relations (case_study_id, quantum_software_id, created_at)
SELECT DISTINCT
  cs.id as case_study_id,
  qs.id as quantum_software_id,
  NOW() as created_at
FROM case_studies cs
CROSS JOIN unnest(cs.quantum_software) as software_name
JOIN quantum_software qs ON qs.name = software_name
WHERE cs.quantum_software IS NOT NULL 
  AND array_length(cs.quantum_software, 1) > 0
ON CONFLICT (case_study_id, quantum_software_id) DO NOTHING;

-- 6. CREATE RELATIONSHIPS - QUANTUM HARDWARE
INSERT INTO case_study_quantum_hardware_relations (case_study_id, quantum_hardware_id, created_at)
SELECT DISTINCT
  cs.id as case_study_id,
  qh.id as quantum_hardware_id,
  NOW() as created_at
FROM case_studies cs
CROSS JOIN unnest(cs.quantum_hardware) as hardware_name
JOIN quantum_hardware qh ON qh.name = hardware_name
WHERE cs.quantum_hardware IS NOT NULL 
  AND array_length(cs.quantum_hardware, 1) > 0
ON CONFLICT (case_study_id, quantum_hardware_id) DO NOTHING;

-- 7. CREATE RELATIONSHIPS - QUANTUM COMPANIES
INSERT INTO case_study_quantum_company_relations (case_study_id, quantum_company_id, created_at)
SELECT DISTINCT
  cs.id as case_study_id,
  qc.id as quantum_company_id,
  NOW() as created_at
FROM case_studies cs
CROSS JOIN unnest(cs.quantum_companies) as company_name
JOIN quantum_companies qc ON qc.name = company_name
WHERE cs.quantum_companies IS NOT NULL 
  AND array_length(cs.quantum_companies, 1) > 0
ON CONFLICT (case_study_id, quantum_company_id) DO NOTHING;

-- 8. CREATE RELATIONSHIPS - PARTNER COMPANIES
INSERT INTO case_study_partner_company_relations (case_study_id, partner_company_id, created_at)
SELECT DISTINCT
  cs.id as case_study_id,
  pc.id as partner_company_id,
  NOW() as created_at
FROM case_studies cs
CROSS JOIN unnest(cs.partner_companies) as company_name
JOIN partner_companies pc ON pc.name = company_name
WHERE cs.partner_companies IS NOT NULL 
  AND array_length(cs.partner_companies, 1) > 0
ON CONFLICT (case_study_id, partner_company_id) DO NOTHING;

-- Verification queries (commented out, run separately to check results)
-- SELECT 'Quantum Software', COUNT(*) FROM quantum_software
-- UNION ALL SELECT 'Quantum Hardware', COUNT(*) FROM quantum_hardware  
-- UNION ALL SELECT 'Quantum Companies', COUNT(*) FROM quantum_companies
-- UNION ALL SELECT 'Partner Companies', COUNT(*) FROM partner_companies;

-- SELECT 'Software Relations', COUNT(*) FROM case_study_quantum_software_relations
-- UNION ALL SELECT 'Hardware Relations', COUNT(*) FROM case_study_quantum_hardware_relations
-- UNION ALL SELECT 'Quantum Company Relations', COUNT(*) FROM case_study_quantum_company_relations  
-- UNION ALL SELECT 'Partner Company Relations', COUNT(*) FROM case_study_partner_company_relations;