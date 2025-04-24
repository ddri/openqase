-- Migration: Add Blog Tables
-- Description: Creates tables for blog posts and related functionality

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    content TEXT,
    author TEXT,
    featured_image TEXT,
    category TEXT,
    tags TEXT[],
    published BOOLEAN DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE
);

-- Create blog_post_relations table for related posts
CREATE TABLE IF NOT EXISTS blog_post_relations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    blog_post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    related_blog_post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(blog_post_id, related_blog_post_id)
);

-- Add trigger to update updated_at timestamp
DROP FUNCTION IF EXISTS update_blog_posts_updated_at CASCADE;
CREATE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION update_blog_posts_updated_at();

-- Add trigger to set published_at when published changes to true
DROP FUNCTION IF EXISTS set_blog_posts_published_at CASCADE;
CREATE FUNCTION set_blog_posts_published_at()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.published = TRUE AND OLD.published = FALSE THEN
        NEW.published_at = NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_blog_posts_published_at ON blog_posts;
CREATE TRIGGER set_blog_posts_published_at
BEFORE UPDATE ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION set_blog_posts_published_at();

-- Add RLS policies for blog_posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy for admins (can do everything)
CREATE POLICY blog_posts_admin_policy
ON blog_posts
USING (auth.jwt() ->> 'role' = 'admin')
WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Policy for public (can only read published posts)
CREATE POLICY blog_posts_public_read_policy
ON blog_posts
FOR SELECT
USING (
    published = TRUE
);

-- Add RLS policies for blog_post_relations
ALTER TABLE blog_post_relations ENABLE ROW LEVEL SECURITY;

-- Policy for admins (can do everything)
CREATE POLICY blog_post_relations_admin_policy
ON blog_post_relations
USING (auth.jwt() ->> 'role' = 'admin')
WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Policy for public (can only read relations for published posts)
CREATE POLICY blog_post_relations_public_read_policy
ON blog_post_relations
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM blog_posts
        WHERE blog_posts.id = blog_post_relations.blog_post_id
        AND blog_posts.published = TRUE
    )
    AND
    EXISTS (
        SELECT 1 FROM blog_posts
        WHERE blog_posts.id = blog_post_relations.related_blog_post_id
        AND blog_posts.published = TRUE
    )
);