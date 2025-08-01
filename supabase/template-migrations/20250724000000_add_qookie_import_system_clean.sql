-- Clean Qookie Import System Migration
-- Based on actual production schema structure

-- Add import tracking columns to existing case_studies table
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS import_source text;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS import_batch_id uuid;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS original_qookie_slug text;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS original_qookie_id text;

-- Create import batches table
CREATE TABLE IF NOT EXISTS import_batches (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  batch_name text NOT NULL,
  source_file text NOT NULL,
  source_type text NOT NULL DEFAULT 'file',
  
  -- Export metadata from Qookie
  export_version text,
  export_date timestamp with time zone,
  qookie_total_items integer,
  
  -- Processing statistics
  total_items integer NOT NULL DEFAULT 0,
  valid_items integer DEFAULT 0,
  invalid_items integer DEFAULT 0,
  approved_items integer DEFAULT 0,
  promoted_items integer DEFAULT 0,
  
  -- Batch workflow status  
  status text NOT NULL DEFAULT 'staging',
  
  -- User tracking
  imported_by text,
  promoted_by text,
  
  created_at timestamp with time zone DEFAULT now(),
  promoted_at timestamp with time zone
);

-- Create staging case studies table (matching production case_studies structure)
CREATE TABLE IF NOT EXISTS staging_case_studies (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  batch_id uuid NOT NULL REFERENCES import_batches(id) ON DELETE CASCADE,
  
  -- Qookie source data (preserved for audit)
  qookie_id text NOT NULL,
  qookie_slug text NOT NULL,
  qookie_data jsonb NOT NULL,
  
  -- Transformed OpenQase data (matching production case_studies structure exactly)
  slug text NOT NULL,
  title text NOT NULL,
  description text,
  main_content text,
  partner_companies text[],
  quantum_companies text[],
  algorithms text[],
  quantum_hardware text[],
  quantum_software text[],
  year smallint NOT NULL DEFAULT EXTRACT(year FROM now()),
  
  -- Additional fields for relationship mapping (will be resolved to UUIDs during promotion)
  industries text[], -- Store slugs, resolve to UUIDs during promotion
  personas text[],   -- Store slugs, resolve to UUIDs during promotion
  
  -- Import workflow status
  validation_status text NOT NULL DEFAULT 'pending',
  validation_errors jsonb DEFAULT '[]'::jsonb,
  validation_warnings jsonb DEFAULT '[]'::jsonb,
  mapping_quality jsonb DEFAULT '{}'::jsonb,
  
  -- Admin review tracking
  reviewed_by text,
  reviewed_at timestamp with time zone,
  promotion_status text NOT NULL DEFAULT 'staged',
  promoted_at timestamp with time zone,
  
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create promotion audit log
CREATE TABLE IF NOT EXISTS promotion_log (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  batch_id uuid NOT NULL REFERENCES import_batches(id),
  promoted_items integer NOT NULL,
  promoted_case_study_ids uuid[] NOT NULL,
  promoted_by text,
  promoted_at timestamp with time zone DEFAULT now(),
  rollback_data jsonb
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_staging_case_studies_batch_id ON staging_case_studies(batch_id);
CREATE INDEX IF NOT EXISTS idx_staging_case_studies_validation_status ON staging_case_studies(validation_status);
CREATE INDEX IF NOT EXISTS idx_staging_case_studies_promotion_status ON staging_case_studies(promotion_status);
CREATE INDEX IF NOT EXISTS idx_import_batches_status ON import_batches(status);
CREATE INDEX IF NOT EXISTS idx_import_batches_created_at ON import_batches(created_at);
CREATE INDEX IF NOT EXISTS idx_case_studies_import_batch_id ON case_studies(import_batch_id);
CREATE INDEX IF NOT EXISTS idx_case_studies_import_source ON case_studies(import_source);

-- Enable RLS on new tables
ALTER TABLE staging_case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE import_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotion_log ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
DO $$ BEGIN
  CREATE POLICY "Admin can manage staging case studies" ON staging_case_studies
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Admin can manage import batches" ON import_batches
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Admin can view promotion log" ON promotion_log
    FOR SELECT TO authenticated
    USING (true);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;