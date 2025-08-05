-- Add import tracking and audit trail fields to case_studies table
-- This enables batch management, rollback capabilities, and data lineage tracking

-- Add import tracking fields
ALTER TABLE case_studies ADD COLUMN import_batch_id UUID DEFAULT NULL;
ALTER TABLE case_studies ADD COLUMN import_source TEXT DEFAULT NULL;
ALTER TABLE case_studies ADD COLUMN import_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NULL;
ALTER TABLE case_studies ADD COLUMN original_qookie_id TEXT DEFAULT NULL;
ALTER TABLE case_studies ADD COLUMN original_qookie_slug TEXT DEFAULT NULL;

-- Add indexes for query performance
CREATE INDEX idx_case_studies_import_batch_id ON case_studies(import_batch_id);
CREATE INDEX idx_case_studies_import_source ON case_studies(import_source);
CREATE INDEX idx_case_studies_import_timestamp ON case_studies(import_timestamp);

-- Add comments for documentation
COMMENT ON COLUMN case_studies.import_batch_id IS 'UUID identifying the import batch for rollback and audit purposes';
COMMENT ON COLUMN case_studies.import_source IS 'Source system identifier (e.g., qookie-export, manual, api)';
COMMENT ON COLUMN case_studies.import_timestamp IS 'When this case study was imported into OpenQase';
COMMENT ON COLUMN case_studies.original_qookie_id IS 'Original identifier from Qookie export system';
COMMENT ON COLUMN case_studies.original_qookie_slug IS 'Original slug from Qookie export system';