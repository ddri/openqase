-- Migration: Add content_status field and database views for clean soft delete pattern
-- This implements the WordPress/Ghost hybrid approach with views for clean queries
-- Date: 2025-08-09

-- =====================================================
-- STEP 1: Add content_status field to all content tables
-- =====================================================

-- Case Studies
ALTER TABLE case_studies 
ADD COLUMN IF NOT EXISTS content_status VARCHAR(20) DEFAULT 'published'
CHECK (content_status IN ('draft', 'published', 'archived', 'deleted'));

-- Blog Posts
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS content_status VARCHAR(20) DEFAULT 'published'
CHECK (content_status IN ('draft', 'published', 'archived', 'deleted'));

-- Algorithms
ALTER TABLE algorithms 
ADD COLUMN IF NOT EXISTS content_status VARCHAR(20) DEFAULT 'published'
CHECK (content_status IN ('draft', 'published', 'archived', 'deleted'));

-- Industries
ALTER TABLE industries 
ADD COLUMN IF NOT EXISTS content_status VARCHAR(20) DEFAULT 'published'
CHECK (content_status IN ('draft', 'published', 'archived', 'deleted'));

-- Personas
ALTER TABLE personas 
ADD COLUMN IF NOT EXISTS content_status VARCHAR(20) DEFAULT 'published'
CHECK (content_status IN ('draft', 'published', 'archived', 'deleted'));

-- =====================================================
-- STEP 2: Sync content_status with existing data
-- =====================================================

-- Update case_studies status based on existing fields
UPDATE case_studies 
SET content_status = CASE
  WHEN deleted_at IS NOT NULL THEN 'deleted'
  WHEN archived_at IS NOT NULL THEN 'archived'
  WHEN published = false OR published IS NULL THEN 'draft'
  ELSE 'published'
END;

-- Update blog_posts status
UPDATE blog_posts 
SET content_status = CASE
  WHEN deleted_at IS NOT NULL THEN 'deleted'
  WHEN archived_at IS NOT NULL THEN 'archived'
  WHEN published = false OR published IS NULL THEN 'draft'
  ELSE 'published'
END;

-- Update algorithms status
UPDATE algorithms 
SET content_status = CASE
  WHEN deleted_at IS NOT NULL THEN 'deleted'
  WHEN archived_at IS NOT NULL THEN 'archived'
  WHEN published = false OR published IS NULL THEN 'draft'
  ELSE 'published'
END;

-- Update industries status
UPDATE industries 
SET content_status = CASE
  WHEN deleted_at IS NOT NULL THEN 'deleted'
  WHEN archived_at IS NOT NULL THEN 'archived'
  WHEN published = false OR published IS NULL THEN 'draft'
  ELSE 'published'
END;

-- Update personas status
UPDATE personas 
SET content_status = CASE
  WHEN deleted_at IS NOT NULL THEN 'deleted'
  WHEN archived_at IS NOT NULL THEN 'archived'
  WHEN published = false OR published IS NULL THEN 'draft'
  ELSE 'published'
END;

-- =====================================================
-- STEP 3: Create indexes for content_status
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_case_studies_status ON case_studies(content_status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(content_status);
CREATE INDEX IF NOT EXISTS idx_algorithms_status ON algorithms(content_status);
CREATE INDEX IF NOT EXISTS idx_industries_status ON industries(content_status);
CREATE INDEX IF NOT EXISTS idx_personas_status ON personas(content_status);

-- =====================================================
-- STEP 4: Create views for different content access patterns
-- =====================================================

-- PUBLIC VIEWS (for website visitors - only published content)
-- ---------------------------------------------

CREATE OR REPLACE VIEW public_case_studies AS
SELECT * FROM case_studies 
WHERE content_status = 'published';

CREATE OR REPLACE VIEW public_blog_posts AS
SELECT * FROM blog_posts 
WHERE content_status = 'published';

CREATE OR REPLACE VIEW public_algorithms AS
SELECT * FROM algorithms 
WHERE content_status = 'published';

CREATE OR REPLACE VIEW public_industries AS
SELECT * FROM industries 
WHERE content_status = 'published';

CREATE OR REPLACE VIEW public_personas AS
SELECT * FROM personas 
WHERE content_status = 'published';

-- ADMIN VIEWS (for CMS - all except deleted)
-- ---------------------------------------------

CREATE OR REPLACE VIEW admin_case_studies AS
SELECT * FROM case_studies 
WHERE content_status != 'deleted';

CREATE OR REPLACE VIEW admin_blog_posts AS
SELECT * FROM blog_posts 
WHERE content_status != 'deleted';

CREATE OR REPLACE VIEW admin_algorithms AS
SELECT * FROM algorithms 
WHERE content_status != 'deleted';

CREATE OR REPLACE VIEW admin_industries AS
SELECT * FROM industries 
WHERE content_status != 'deleted';

CREATE OR REPLACE VIEW admin_personas AS
SELECT * FROM personas 
WHERE content_status != 'deleted';

-- TRASH VIEWS (for recovery - only deleted content)
-- ---------------------------------------------

CREATE OR REPLACE VIEW trash_case_studies AS
SELECT * FROM case_studies 
WHERE content_status = 'deleted';

CREATE OR REPLACE VIEW trash_blog_posts AS
SELECT * FROM blog_posts 
WHERE content_status = 'deleted';

CREATE OR REPLACE VIEW trash_algorithms AS
SELECT * FROM algorithms 
WHERE content_status = 'deleted';

CREATE OR REPLACE VIEW trash_industries AS
SELECT * FROM industries 
WHERE content_status = 'deleted';

CREATE OR REPLACE VIEW trash_personas AS
SELECT * FROM personas 
WHERE content_status = 'deleted';

-- ALL CONTENT VIEWS (for super admin - everything with status info)
-- ---------------------------------------------

CREATE OR REPLACE VIEW all_case_studies AS
SELECT *,
  CASE 
    WHEN content_status = 'deleted' AND deleted_at < NOW() - INTERVAL '30 days' 
      THEN 'pending_permanent_delete'
    ELSE content_status
  END as effective_status
FROM case_studies;

CREATE OR REPLACE VIEW all_blog_posts AS
SELECT *,
  CASE 
    WHEN content_status = 'deleted' AND deleted_at < NOW() - INTERVAL '30 days' 
      THEN 'pending_permanent_delete'
    ELSE content_status
  END as effective_status
FROM blog_posts;

-- =====================================================
-- STEP 5: Create helper functions for status transitions
-- =====================================================

-- Function to soft delete content
CREATE OR REPLACE FUNCTION soft_delete_content(
  table_name TEXT,
  content_id UUID,
  deleted_by_user UUID DEFAULT NULL
) RETURNS BOOLEAN AS $$
BEGIN
  -- Update the content_status and set deletion metadata
  EXECUTE format('
    UPDATE %I 
    SET content_status = ''deleted'',
        deleted_at = NOW(),
        deleted_by = $1,
        published = false
    WHERE id = $2',
    table_name
  ) USING deleted_by_user, content_id;
  
  -- Log to audit table
  INSERT INTO deletion_audit_log (
    content_type, content_id, action, performed_by
  ) VALUES (
    table_name, content_id, 'soft_delete', deleted_by_user
  );
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Function to recover deleted content
CREATE OR REPLACE FUNCTION recover_content(
  table_name TEXT,
  content_id UUID,
  recovered_by_user UUID DEFAULT NULL
) RETURNS BOOLEAN AS $$
BEGIN
  -- Update the content_status and clear deletion metadata
  EXECUTE format('
    UPDATE %I 
    SET content_status = ''draft'',
        deleted_at = NULL,
        deleted_by = NULL,
        published = false
    WHERE id = $1 AND content_status = ''deleted''',
    table_name
  ) USING content_id;
  
  -- Log to audit table
  INSERT INTO deletion_audit_log (
    content_type, content_id, action, performed_by
  ) VALUES (
    table_name, content_id, 'restore', recovered_by_user
  );
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Function to archive content
CREATE OR REPLACE FUNCTION archive_content(
  table_name TEXT,
  content_id UUID,
  archived_by_user UUID DEFAULT NULL
) RETURNS BOOLEAN AS $$
BEGIN
  -- Update the content_status and set archive metadata
  EXECUTE format('
    UPDATE %I 
    SET content_status = ''archived'',
        archived_at = NOW(),
        archived_by = $1,
        published = false
    WHERE id = $2',
    table_name
  ) USING archived_by_user, content_id;
  
  -- Log to audit table
  INSERT INTO deletion_audit_log (
    content_type, content_id, action, performed_by
  ) VALUES (
    table_name, content_id, 'archive', archived_by_user
  );
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- STEP 6: Add comments for documentation
-- =====================================================

COMMENT ON COLUMN case_studies.content_status IS 'Content lifecycle status: draft, published, archived, or deleted';
COMMENT ON COLUMN blog_posts.content_status IS 'Content lifecycle status: draft, published, archived, or deleted';
COMMENT ON COLUMN algorithms.content_status IS 'Content lifecycle status: draft, published, archived, or deleted';
COMMENT ON COLUMN industries.content_status IS 'Content lifecycle status: draft, published, archived, or deleted';
COMMENT ON COLUMN personas.content_status IS 'Content lifecycle status: draft, published, archived, or deleted';

COMMENT ON VIEW public_case_studies IS 'Public view showing only published case studies';
COMMENT ON VIEW admin_case_studies IS 'Admin view showing all non-deleted case studies';
COMMENT ON VIEW trash_case_studies IS 'Trash view showing only soft-deleted case studies';
COMMENT ON VIEW all_case_studies IS 'Complete view with effective status for super admins';

-- =====================================================
-- VERIFICATION QUERIES (Run these to test)
-- =====================================================

-- Check that views work:
-- SELECT COUNT(*) as public_count FROM public_case_studies;
-- SELECT COUNT(*) as admin_count FROM admin_case_studies;
-- SELECT COUNT(*) as trash_count FROM trash_case_studies;
-- SELECT COUNT(*) as total_count FROM all_case_studies;

-- Test soft delete function:
-- SELECT soft_delete_content('case_studies', 'some-uuid-here', 'user-uuid-here');

-- Test recovery function:
-- SELECT recover_content('case_studies', 'some-uuid-here', 'user-uuid-here');