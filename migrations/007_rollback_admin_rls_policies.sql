-- ROLLBACK Migration: 007_rollback_admin_rls_policies.sql
-- Description: Rollback admin RLS policies to original JWT-based checks
-- Use this ONLY if migration 007 causes issues

-- Drop the new user_preferences-based policies
DROP POLICY IF EXISTS "Admins can manage algorithms" ON algorithms;
DROP POLICY IF EXISTS "Admins can manage personas" ON personas;
DROP POLICY IF EXISTS "Admins can manage industries" ON industries;
DROP POLICY IF EXISTS "Admins can manage case_studies" ON case_studies;
DROP POLICY IF EXISTS "Admins can manage blog_posts" ON blog_posts;

-- Drop junction table policies
DROP POLICY IF EXISTS "Admins can manage algorithm_case_study_relations" ON algorithm_case_study_relations;
DROP POLICY IF EXISTS "Admins can manage algorithm_industry_relations" ON algorithm_industry_relations;
DROP POLICY IF EXISTS "Admins can manage case_study_industry_relations" ON case_study_industry_relations;
DROP POLICY IF EXISTS "Admins can manage case_study_persona_relations" ON case_study_persona_relations;
DROP POLICY IF EXISTS "Admins can manage case_study_relations" ON case_study_relations;
DROP POLICY IF EXISTS "Admins can manage blog_post_relations" ON blog_post_relations;
DROP POLICY IF EXISTS "Admins can manage persona_industry_relations" ON persona_industry_relations;

-- Restore original JWT-based admin policies
CREATE POLICY "Admins can manage algorithms"
  ON algorithms FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can manage personas"
  ON personas FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can manage industries"
  ON industries FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can manage case_studies"
  ON case_studies FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can manage blog_posts"
  ON blog_posts FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Restore junction table policies
CREATE POLICY "Admins can manage algorithm_case_study_relations"
  ON algorithm_case_study_relations FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can manage algorithm_industry_relations"
  ON algorithm_industry_relations FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can manage case_study_industry_relations"
  ON case_study_industry_relations FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can manage case_study_persona_relations"
  ON case_study_persona_relations FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can manage case_study_relations"
  ON case_study_relations FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can manage blog_post_relations"
  ON blog_post_relations FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can manage persona_industry_relations"
  ON persona_industry_relations FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Remove the verification function
DROP FUNCTION IF EXISTS verify_admin_rls_policies();

-- Remove the index we added (optional, doesn't hurt to keep it)
-- DROP INDEX IF EXISTS user_preferences_role_idx; 