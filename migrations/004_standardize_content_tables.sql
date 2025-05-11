-- Migration: 004_standardize_content_tables.sql
-- Description: Ensures all content tables have consistent fields and triggers

-- Function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Ensure all content tables have the required fields
DO $$
BEGIN
    -- Algorithms table standardization
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'algorithms' AND column_name = 'published') THEN
        ALTER TABLE algorithms ADD COLUMN published BOOLEAN DEFAULT FALSE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'algorithms' AND column_name = 'updated_at') THEN
        ALTER TABLE algorithms ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'algorithms' AND column_name = 'published_at') THEN
        ALTER TABLE algorithms ADD COLUMN published_at TIMESTAMP WITH TIME ZONE;
    END IF;

    -- Personas table standardization
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'personas' AND column_name = 'published') THEN
        ALTER TABLE personas ADD COLUMN published BOOLEAN DEFAULT FALSE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'personas' AND column_name = 'updated_at') THEN
        ALTER TABLE personas ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'personas' AND column_name = 'published_at') THEN
        ALTER TABLE personas ADD COLUMN published_at TIMESTAMP WITH TIME ZONE;
    END IF;

    -- Industries table standardization
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'industries' AND column_name = 'published') THEN
        ALTER TABLE industries ADD COLUMN published BOOLEAN DEFAULT FALSE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'industries' AND column_name = 'updated_at') THEN
        ALTER TABLE industries ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'industries' AND column_name = 'published_at') THEN
        ALTER TABLE industries ADD COLUMN published_at TIMESTAMP WITH TIME ZONE;
    END IF;

    -- Case Studies table standardization
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'case_studies' AND column_name = 'published') THEN
        ALTER TABLE case_studies ADD COLUMN published BOOLEAN DEFAULT FALSE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'case_studies' AND column_name = 'updated_at') THEN
        ALTER TABLE case_studies ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'case_studies' AND column_name = 'published_at') THEN
        ALTER TABLE case_studies ADD COLUMN published_at TIMESTAMP WITH TIME ZONE;
    END IF;
END $$;

-- Create or replace triggers for updating the updated_at column
DROP TRIGGER IF EXISTS update_algorithms_updated_at ON algorithms;
CREATE TRIGGER update_algorithms_updated_at
BEFORE UPDATE ON algorithms
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_personas_updated_at ON personas;
CREATE TRIGGER update_personas_updated_at
BEFORE UPDATE ON personas
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_industries_updated_at ON industries;
CREATE TRIGGER update_industries_updated_at
BEFORE UPDATE ON industries
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_case_studies_updated_at ON case_studies;
CREATE TRIGGER update_case_studies_updated_at
BEFORE UPDATE ON case_studies
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Add comments to explain the standardization
COMMENT ON COLUMN algorithms.published IS 'Flag indicating if the content is published and visible to users';
COMMENT ON COLUMN algorithms.updated_at IS 'Timestamp of the last update to this record';
COMMENT ON COLUMN algorithms.published_at IS 'Timestamp when the content was published';

COMMENT ON COLUMN personas.published IS 'Flag indicating if the content is published and visible to users';
COMMENT ON COLUMN personas.updated_at IS 'Timestamp of the last update to this record';
COMMENT ON COLUMN personas.published_at IS 'Timestamp when the content was published';

COMMENT ON COLUMN industries.published IS 'Flag indicating if the content is published and visible to users';
COMMENT ON COLUMN industries.updated_at IS 'Timestamp of the last update to this record';
COMMENT ON COLUMN industries.published_at IS 'Timestamp when the content was published';

COMMENT ON COLUMN case_studies.published IS 'Flag indicating if the content is published and visible to users';
COMMENT ON COLUMN case_studies.updated_at IS 'Timestamp of the last update to this record';
COMMENT ON COLUMN case_studies.published_at IS 'Timestamp when the content was published';

-- Update published_at for already published content
UPDATE algorithms SET published_at = updated_at WHERE published = TRUE AND published_at IS NULL;
UPDATE personas SET published_at = updated_at WHERE published = TRUE AND published_at IS NULL;
UPDATE industries SET published_at = updated_at WHERE published = TRUE AND published_at IS NULL;
UPDATE case_studies SET published_at = updated_at WHERE published = TRUE AND published_at IS NULL;