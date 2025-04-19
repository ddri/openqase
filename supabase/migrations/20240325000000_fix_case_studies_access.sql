-- Drop existing policies
DROP POLICY IF EXISTS "Public can view published case studies" ON case_studies;

-- Create new policy that doesn't require authentication
CREATE POLICY "Anyone can view published case studies"
    ON case_studies FOR SELECT
    USING (published = true);