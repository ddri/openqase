-- Migration: 007_fix_admin_rls_policies.sql
-- Description: Fix admin RLS policies to check user_preferences table instead of JWT
-- This resolves the issue where admin role is stored in database but policies check JWT

-- Drop all existing admin policies that check JWT
DROP POLICY IF EXISTS "Admins can manage algorithms" ON algorithms;
DROP POLICY IF EXISTS "Admins can manage personas" ON personas;
DROP POLICY IF EXISTS "Admins can manage industries" ON industries;
DROP POLICY IF EXISTS "Admins can manage case_studies" ON case_studies;
DROP POLICY IF EXISTS "Admins can manage blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Admins can manage blog posts" ON blog_posts;

-- Drop junction table admin policies
DROP POLICY IF EXISTS "Admins can manage algorithm_case_study_relations" ON algorithm_case_study_relations;
DROP POLICY IF EXISTS "Admins can manage algorithm_industry_relations" ON algorithm_industry_relations;
DROP POLICY IF EXISTS "Admins can manage case_study_industry_relations" ON case_study_industry_relations;
DROP POLICY IF EXISTS "Admins can manage case_study_persona_relations" ON case_study_persona_relations;
DROP POLICY IF EXISTS "Admins can manage case_study_relations" ON case_study_relations;
DROP POLICY IF EXISTS "Admins can manage blog_post_relations" ON blog_post_relations;
DROP POLICY IF EXISTS "Admins can manage persona_industry_relations" ON persona_industry_relations;

-- Recreate admin policies with proper user_preferences check
-- Content tables
CREATE POLICY "Admins can manage algorithms"
  ON algorithms FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_preferences 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage personas"
  ON personas FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_preferences 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage industries"
  ON industries FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_preferences 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage case_studies"
  ON case_studies FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_preferences 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage blog_posts"
  ON blog_posts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_preferences 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Junction table policies
CREATE POLICY "Admins can manage algorithm_case_study_relations"
  ON algorithm_case_study_relations FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_preferences 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage algorithm_industry_relations"
  ON algorithm_industry_relations FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_preferences 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage case_study_industry_relations"
  ON case_study_industry_relations FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_preferences 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage case_study_persona_relations"
  ON case_study_persona_relations FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_preferences 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage case_study_relations"
  ON case_study_relations FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_preferences 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage blog_post_relations"
  ON blog_post_relations FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_preferences 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage persona_industry_relations"
  ON persona_industry_relations FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_preferences 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Add index to optimize the admin check (if not already exists)
CREATE INDEX IF NOT EXISTS user_preferences_role_idx ON user_preferences (id, role);

-- Verification function to test the migration
CREATE OR REPLACE FUNCTION verify_admin_rls_policies()
RETURNS TABLE(table_name text, policy_name text, policy_definition text) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    schemaname::text || '.' || tablename::text as table_name,
    policyname::text as policy_name,
    qual::text as policy_definition
  FROM pg_policies 
  WHERE schemaname = 'public' 
    AND policyname LIKE '%Admin%'
  ORDER BY tablename, policyname;
END;
$$ LANGUAGE plpgsql;

-- Add comment to document the change
COMMENT ON FUNCTION verify_admin_rls_policies() IS 'Verification function to check admin RLS policies after migration 007'; 