-- Migration: 005_standardize_rls_policies.sql
-- Description: Standardizes Row Level Security (RLS) policies across all content tables

-- Enable RLS on all content tables
ALTER TABLE algorithms ENABLE ROW LEVEL SECURITY;
ALTER TABLE personas ENABLE ROW LEVEL SECURITY;
ALTER TABLE industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them with consistent naming and logic
DROP POLICY IF EXISTS "Public can view published algorithms" ON algorithms;
DROP POLICY IF EXISTS "Admins can manage algorithms" ON algorithms;

DROP POLICY IF EXISTS "Public can view published personas" ON personas;
DROP POLICY IF EXISTS "Admins can manage personas" ON personas;

DROP POLICY IF EXISTS "Public can view published industries" ON industries;
DROP POLICY IF EXISTS "Admins can manage industries" ON industries;

DROP POLICY IF EXISTS "Public can view published case_studies" ON case_studies;
DROP POLICY IF EXISTS "Admins can manage case_studies" ON case_studies;

DROP POLICY IF EXISTS "Public can view published blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Admins can manage blog_posts" ON blog_posts;

-- Create standardized policies for algorithms
CREATE POLICY "Public can view published algorithms"
  ON algorithms FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can manage algorithms"
  ON algorithms FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Create standardized policies for personas
CREATE POLICY "Public can view published personas"
  ON personas FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can manage personas"
  ON personas FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Create standardized policies for industries
CREATE POLICY "Public can view published industries"
  ON industries FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can manage industries"
  ON industries FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Create standardized policies for case_studies
CREATE POLICY "Public can view published case_studies"
  ON case_studies FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can manage case_studies"
  ON case_studies FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Create standardized policies for blog_posts
CREATE POLICY "Public can view published blog_posts"
  ON blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can manage blog_posts"
  ON blog_posts FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Standardize junction table RLS policies
-- Algorithm-Case Study relations
ALTER TABLE algorithm_case_study_relations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can manage algorithm_case_study_relations" ON algorithm_case_study_relations;
CREATE POLICY "Admins can manage algorithm_case_study_relations"
  ON algorithm_case_study_relations FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Case Study relations
ALTER TABLE case_study_relations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can manage case_study_relations" ON case_study_relations;
CREATE POLICY "Admins can manage case_study_relations"
  ON case_study_relations FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Blog Post relations
ALTER TABLE blog_post_relations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can manage blog_post_relations" ON blog_post_relations;
CREATE POLICY "Admins can manage blog_post_relations"
  ON blog_post_relations FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Add comments to explain the RLS policies
COMMENT ON TABLE algorithms IS 'Quantum algorithms with publishing workflow support';
COMMENT ON TABLE personas IS 'User personas with publishing workflow support';
COMMENT ON TABLE industries IS 'Industry categories with publishing workflow support';
COMMENT ON TABLE case_studies IS 'Case studies with publishing workflow support';
COMMENT ON TABLE blog_posts IS 'Blog posts with publishing workflow support';

COMMENT ON TABLE algorithm_case_study_relations IS 'Junction table for algorithm to case study relationships';
COMMENT ON TABLE case_study_relations IS 'Junction table for case study to case study relationships';
COMMENT ON TABLE blog_post_relations IS 'Junction table for blog post to blog post relationships';