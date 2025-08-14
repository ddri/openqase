-- Add only the missing import_timestamp column
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'case_studies' AND column_name = 'import_timestamp'
    ) THEN
        ALTER TABLE case_studies ADD COLUMN import_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;