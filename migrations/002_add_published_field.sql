-- Add published field to personas table
ALTER TABLE personas ADD COLUMN published BOOLEAN DEFAULT FALSE;

-- Add published field to industries table
ALTER TABLE industries ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE industries ADD COLUMN published BOOLEAN DEFAULT FALSE;

-- Create comment to explain the migration
COMMENT ON TABLE personas IS 'User personas with publishing workflow support';
COMMENT ON TABLE industries IS 'Industry categories with publishing workflow support';

-- Update the updated_at column for personas when a row is updated
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for personas
CREATE TRIGGER update_personas_updated_at
BEFORE UPDATE ON personas
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for industries
CREATE TRIGGER update_industries_updated_at
BEFORE UPDATE ON industries
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();