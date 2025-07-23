-- Remove icon column and add sector column to industries table
-- This migration updates the industries table schema to match the application code

-- Add sector column if it doesn't exist
ALTER TABLE industries 
ADD COLUMN IF NOT EXISTS sector text[] DEFAULT '{}';

-- Drop icon column if it exists
ALTER TABLE industries 
DROP COLUMN IF EXISTS icon;

-- Add comment to document the change
COMMENT ON COLUMN industries.sector IS 'Array of sector/segment names for industry categorization';