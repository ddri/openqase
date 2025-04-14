-- Update case_studies table to use partner_companies array
ALTER TABLE case_studies 
  DROP COLUMN IF EXISTS partner_company,
  ADD COLUMN IF NOT EXISTS partner_companies TEXT[] DEFAULT '{}';

-- Create GIN index for partner_companies
CREATE INDEX IF NOT EXISTS case_studies_partner_companies_idx 
  ON case_studies USING gin (partner_companies);

-- Update RLS policies
DROP POLICY IF EXISTS "Public can view published case studies" ON case_studies;
DROP POLICY IF EXISTS "Authenticated users can create case studies" ON case_studies;
DROP POLICY IF EXISTS "Admins can manage all case studies" ON case_studies;

-- Create new policies
CREATE POLICY "Public can view published case studies" 
  ON case_studies FOR SELECT 
  USING (published = TRUE);

CREATE POLICY "Authenticated users can create case studies" 
  ON case_studies FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Admins can manage all case studies" 
  ON case_studies FOR ALL 
  TO authenticated 
  USING (auth.uid() IN (SELECT id FROM auth.users WHERE email LIKE '%@openqase.org'));

-- Add comments
COMMENT ON TABLE case_studies IS 'Case studies with multiple partner companies';
COMMENT ON COLUMN case_studies.partner_companies IS 'Array of partner company names';

-- Verify the changes
DO $$
BEGIN
  -- Check if the column exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'case_studies' AND column_name = 'partner_companies') THEN
    RAISE EXCEPTION 'partner_companies column was not added';
  END IF;
  
  -- Check if RLS is enabled
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'case_studies' AND rowsecurity = TRUE) THEN
    RAISE EXCEPTION 'RLS is not enabled on case_studies table';
  END IF;
  
  -- Check if policies exist
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'case_studies' AND policyname = 'Public can view published case studies') THEN
    RAISE EXCEPTION 'Public view policy does not exist';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'case_studies' AND policyname = 'Authenticated users can create case studies') THEN
    RAISE EXCEPTION 'Authenticated create policy does not exist';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'case_studies' AND policyname = 'Admins can manage all case studies') THEN
    RAISE EXCEPTION 'Admin management policy does not exist';
  END IF;
  
  RAISE NOTICE 'All checks passed successfully';
END $$; 