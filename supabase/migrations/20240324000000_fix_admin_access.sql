-- Drop the existing admin policy that uses email domain
DROP POLICY IF EXISTS "Admins can manage case studies" ON case_studies;

-- Create new admin policy using role check
CREATE POLICY "Admins can manage case studies"
    ON case_studies FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM user_preferences
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    ); 