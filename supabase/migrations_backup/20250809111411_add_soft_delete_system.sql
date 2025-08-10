-- Migration: Add Soft Delete Support to OpenQase
-- Date: 2025-01-10
-- Epic 1: Foundation - Database Schema & Infrastructure
-- 
-- This migration is SAFE and NON-BREAKING:
-- 1. Only adds new columns (doesn't modify existing ones)
-- 2. All columns default to NULL (won't affect existing queries)
-- 3. Includes rollback script at the bottom
-- 4. Creates filtered indexes for performance

-- =====================================================
-- STEP 1: Add soft delete columns to all content tables
-- =====================================================

-- Case Studies
ALTER TABLE case_studies 
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP DEFAULT NULL,
ADD COLUMN IF NOT EXISTS deleted_by UUID DEFAULT NULL,
ADD COLUMN IF NOT EXISTS archived_at TIMESTAMP DEFAULT NULL,
ADD COLUMN IF NOT EXISTS archived_by UUID DEFAULT NULL;

COMMENT ON COLUMN case_studies.deleted_at IS 'Timestamp when content was soft deleted';
COMMENT ON COLUMN case_studies.deleted_by IS 'User ID who deleted the content';
COMMENT ON COLUMN case_studies.archived_at IS 'Timestamp when content was archived';
COMMENT ON COLUMN case_studies.archived_by IS 'User ID who archived the content';

-- Blog Posts
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP DEFAULT NULL,
ADD COLUMN IF NOT EXISTS deleted_by UUID DEFAULT NULL,
ADD COLUMN IF NOT EXISTS archived_at TIMESTAMP DEFAULT NULL,
ADD COLUMN IF NOT EXISTS archived_by UUID DEFAULT NULL;

-- Algorithms
ALTER TABLE algorithms 
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP DEFAULT NULL,
ADD COLUMN IF NOT EXISTS deleted_by UUID DEFAULT NULL,
ADD COLUMN IF NOT EXISTS archived_at TIMESTAMP DEFAULT NULL,
ADD COLUMN IF NOT EXISTS archived_by UUID DEFAULT NULL;

-- Industries
ALTER TABLE industries 
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP DEFAULT NULL,
ADD COLUMN IF NOT EXISTS deleted_by UUID DEFAULT NULL,
ADD COLUMN IF NOT EXISTS archived_at TIMESTAMP DEFAULT NULL,
ADD COLUMN IF NOT EXISTS archived_by UUID DEFAULT NULL;

-- Personas
ALTER TABLE personas 
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP DEFAULT NULL,
ADD COLUMN IF NOT EXISTS deleted_by UUID DEFAULT NULL,
ADD COLUMN IF NOT EXISTS archived_at TIMESTAMP DEFAULT NULL,
ADD COLUMN IF NOT EXISTS archived_by UUID DEFAULT NULL;

-- =====================================================
-- STEP 2: Add soft delete to junction/relationship tables
-- =====================================================

-- Case Study <-> Algorithm Relations
ALTER TABLE algorithm_case_study_relations
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP DEFAULT NULL;

-- Case Study <-> Industry Relations
ALTER TABLE case_study_industry_relations
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP DEFAULT NULL;

-- Case Study <-> Persona Relations
ALTER TABLE case_study_persona_relations
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP DEFAULT NULL;

-- Blog Post Relations
ALTER TABLE blog_post_relations
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP DEFAULT NULL;

-- =====================================================
-- STEP 3: Create filtered indexes for performance
-- =====================================================
-- These indexes only include non-deleted rows, maintaining query performance

-- Case Studies
CREATE INDEX IF NOT EXISTS idx_case_studies_not_deleted 
ON case_studies(id) 
WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_case_studies_deleted_at 
ON case_studies(deleted_at) 
WHERE deleted_at IS NOT NULL;

-- Blog Posts
CREATE INDEX IF NOT EXISTS idx_blog_posts_not_deleted 
ON blog_posts(id) 
WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_blog_posts_deleted_at 
ON blog_posts(deleted_at) 
WHERE deleted_at IS NOT NULL;

-- Algorithms
CREATE INDEX IF NOT EXISTS idx_algorithms_not_deleted 
ON algorithms(id) 
WHERE deleted_at IS NULL;

-- Industries
CREATE INDEX IF NOT EXISTS idx_industries_not_deleted 
ON industries(id) 
WHERE deleted_at IS NULL;

-- Personas
CREATE INDEX IF NOT EXISTS idx_personas_not_deleted 
ON personas(id) 
WHERE deleted_at IS NULL;

-- Junction tables
CREATE INDEX IF NOT EXISTS idx_algo_case_relations_not_deleted 
ON algorithm_case_study_relations(case_study_id, algorithm_id) 
WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_case_industry_relations_not_deleted 
ON case_study_industry_relations(case_study_id, industry_id) 
WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_case_persona_relations_not_deleted 
ON case_study_persona_relations(case_study_id, persona_id) 
WHERE deleted_at IS NULL;

-- =====================================================
-- STEP 4: Create audit table for deletion tracking
-- =====================================================

CREATE TABLE IF NOT EXISTS deletion_audit_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content_type VARCHAR(50) NOT NULL,
    content_id UUID NOT NULL,
    content_title VARCHAR(255),
    action VARCHAR(20) NOT NULL CHECK (action IN ('soft_delete', 'restore', 'archive', 'permanent_delete')),
    performed_by UUID NOT NULL,
    performed_at TIMESTAMP DEFAULT NOW(),
    reason TEXT,
    metadata JSONB,
    INDEX idx_audit_content (content_type, content_id),
    INDEX idx_audit_performed_at (performed_at),
    INDEX idx_audit_performed_by (performed_by)
);

COMMENT ON TABLE deletion_audit_log IS 'Audit trail for all deletion operations for compliance and recovery';

-- =====================================================
-- STEP 5: Create scheduled cleanup configuration
-- =====================================================

CREATE TABLE IF NOT EXISTS deletion_config (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content_type VARCHAR(50) NOT NULL UNIQUE,
    soft_delete_retention_days INTEGER DEFAULT 30,
    archive_retention_days INTEGER DEFAULT 365,
    auto_cleanup_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert default configuration
INSERT INTO deletion_config (content_type, soft_delete_retention_days, archive_retention_days)
VALUES 
    ('case_studies', 30, 365),
    ('blog_posts', 30, 365),
    ('algorithms', 30, 365),
    ('industries', 30, 365),
    ('personas', 30, 365)
ON CONFLICT (content_type) DO NOTHING;

-- =====================================================
-- VERIFICATION QUERIES (Run these to confirm success)
-- =====================================================

-- Check that columns were added:
-- SELECT column_name, data_type, is_nullable 
-- FROM information_schema.columns 
-- WHERE table_name = 'case_studies' 
-- AND column_name IN ('deleted_at', 'deleted_by', 'archived_at', 'archived_by');

-- Check that indexes were created:
-- SELECT indexname, indexdef 
-- FROM pg_indexes 
-- WHERE tablename IN ('case_studies', 'blog_posts', 'algorithms', 'industries', 'personas')
-- AND indexname LIKE '%deleted%';

-- =====================================================
-- ROLLBACK SCRIPT (Only if needed)
-- =====================================================
-- To completely reverse this migration, uncomment and run:

-- -- Remove indexes
-- DROP INDEX IF EXISTS idx_case_studies_not_deleted;
-- DROP INDEX IF EXISTS idx_case_studies_deleted_at;
-- DROP INDEX IF EXISTS idx_blog_posts_not_deleted;
-- DROP INDEX IF EXISTS idx_blog_posts_deleted_at;
-- DROP INDEX IF EXISTS idx_algorithms_not_deleted;
-- DROP INDEX IF EXISTS idx_industries_not_deleted;
-- DROP INDEX IF EXISTS idx_personas_not_deleted;
-- DROP INDEX IF EXISTS idx_algo_case_relations_not_deleted;
-- DROP INDEX IF EXISTS idx_case_industry_relations_not_deleted;
-- DROP INDEX IF EXISTS idx_case_persona_relations_not_deleted;
-- 
-- -- Remove columns from content tables
-- ALTER TABLE case_studies 
-- DROP COLUMN IF EXISTS deleted_at,
-- DROP COLUMN IF EXISTS deleted_by,
-- DROP COLUMN IF EXISTS archived_at,
-- DROP COLUMN IF EXISTS archived_by;
-- 
-- ALTER TABLE blog_posts 
-- DROP COLUMN IF EXISTS deleted_at,
-- DROP COLUMN IF EXISTS deleted_by,
-- DROP COLUMN IF EXISTS archived_at,
-- DROP COLUMN IF EXISTS archived_by;
-- 
-- ALTER TABLE algorithms 
-- DROP COLUMN IF EXISTS deleted_at,
-- DROP COLUMN IF EXISTS deleted_by,
-- DROP COLUMN IF EXISTS archived_at,
-- DROP COLUMN IF EXISTS archived_by;
-- 
-- ALTER TABLE industries 
-- DROP COLUMN IF EXISTS deleted_at,
-- DROP COLUMN IF EXISTS deleted_by,
-- DROP COLUMN IF EXISTS archived_at,
-- DROP COLUMN IF EXISTS archived_by;
-- 
-- ALTER TABLE personas 
-- DROP COLUMN IF EXISTS deleted_at,
-- DROP COLUMN IF EXISTS deleted_by,
-- DROP COLUMN IF EXISTS archived_at,
-- DROP COLUMN IF EXISTS archived_by;
-- 
-- -- Remove columns from junction tables
-- ALTER TABLE algorithm_case_study_relations DROP COLUMN IF EXISTS deleted_at;
-- ALTER TABLE case_study_industry_relations DROP COLUMN IF EXISTS deleted_at;
-- ALTER TABLE case_study_persona_relations DROP COLUMN IF EXISTS deleted_at;
-- ALTER TABLE blog_post_relations DROP COLUMN IF EXISTS deleted_at;
-- 
-- -- Drop audit tables
-- DROP TABLE IF EXISTS deletion_audit_log;
-- DROP TABLE IF EXISTS deletion_config;