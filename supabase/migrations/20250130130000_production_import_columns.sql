-- Production migration to add import tracking columns for case study import system
-- This enables the Qookie import functionality and admin interface enhancements

-- Add import tracking columns to case_studies table
DO $$ 
BEGIN
    -- Add import_batch_name for human-readable batch identification (QK-001, QK-002, etc.)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'case_studies' AND column_name = 'import_batch_name'
    ) THEN
        ALTER TABLE case_studies ADD COLUMN import_batch_name VARCHAR(10);
    END IF;

    -- Add year column for case study publication year
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'case_studies' AND column_name = 'year'
    ) THEN
        ALTER TABLE case_studies ADD COLUMN year INTEGER;
    END IF;

    -- Add import_batch_id for UUID-based batch tracking
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'case_studies' AND column_name = 'import_batch_id'
    ) THEN
        ALTER TABLE case_studies ADD COLUMN import_batch_id UUID;
    END IF;

    -- Add import_source to track where the data came from (e.g., 'qookie', 'manual', etc.)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'case_studies' AND column_name = 'import_source'
    ) THEN
        ALTER TABLE case_studies ADD COLUMN import_source TEXT;
    END IF;

    -- Add import_timestamp to track when each record was imported
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'case_studies' AND column_name = 'import_timestamp'
    ) THEN
        ALTER TABLE case_studies ADD COLUMN import_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;

    -- Add original_qookie_id to preserve original ID from Qookie exports
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'case_studies' AND column_name = 'original_qookie_id'
    ) THEN
        ALTER TABLE case_studies ADD COLUMN original_qookie_id TEXT;
    END IF;

    -- Add original_qookie_slug to preserve original slug from Qookie exports
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'case_studies' AND column_name = 'original_qookie_slug'
    ) THEN
        ALTER TABLE case_studies ADD COLUMN original_qookie_slug TEXT;
    END IF;
END $$;

-- Add indexes for better query performance on import-related columns
CREATE INDEX IF NOT EXISTS case_studies_import_batch_name_idx ON case_studies(import_batch_name);
CREATE INDEX IF NOT EXISTS case_studies_import_batch_id_idx ON case_studies(import_batch_id);
CREATE INDEX IF NOT EXISTS case_studies_import_source_idx ON case_studies(import_source);
CREATE INDEX IF NOT EXISTS case_studies_import_timestamp_idx ON case_studies(import_timestamp);

-- Add comments for documentation
COMMENT ON COLUMN case_studies.import_batch_name IS 'Human-readable import batch identifier (e.g., QK-001, QK-002)';
COMMENT ON COLUMN case_studies.import_batch_id IS 'UUID for the import batch, used for grouping and rollback operations';
COMMENT ON COLUMN case_studies.import_source IS 'Source of the import (qookie, manual, api, etc.)';
COMMENT ON COLUMN case_studies.import_timestamp IS 'Timestamp when this record was imported';
COMMENT ON COLUMN case_studies.original_qookie_id IS 'Original ID from Qookie export files for data lineage';
COMMENT ON COLUMN case_studies.original_qookie_slug IS 'Original slug from Qookie export files for reference';