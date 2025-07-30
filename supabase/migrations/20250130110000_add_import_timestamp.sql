-- Add import_timestamp column to case_studies table
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS import_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW();