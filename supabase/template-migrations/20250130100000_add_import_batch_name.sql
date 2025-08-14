-- Add import batch display name for admin interface
-- This provides human-readable batch identifiers instead of UUIDs

-- Add batch name field
ALTER TABLE case_studies ADD COLUMN import_batch_name VARCHAR(10) DEFAULT NULL;

-- Create index for filtering performance  
CREATE INDEX idx_case_studies_import_batch_name ON case_studies(import_batch_name);

-- Create index for published status if not exists (for filtering)
CREATE INDEX IF NOT EXISTS idx_case_studies_published ON case_studies(published);

-- Add comments for documentation
COMMENT ON COLUMN case_studies.import_batch_name IS 'Human-readable batch identifier (e.g., QK-001) for admin interface filtering';