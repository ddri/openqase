-- Rollback migration: Restore icon column and remove sector column
-- Only use this if you need to revert the schema changes

-- Add icon column back if it doesn't exist
ALTER TABLE industries 
ADD COLUMN IF NOT EXISTS icon text;

-- Drop sector column if it exists
ALTER TABLE industries 
DROP COLUMN IF EXISTS sector;