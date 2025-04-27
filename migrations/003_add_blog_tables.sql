-- First, check if the update_ts_content function exists, and create it if it doesn't
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_ts_content') THEN
        CREATE OR REPLACE FUNCTION update_ts_content()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.ts_content =
                setweight(to_tsvector('english', coalesce(NEW.title, '')), 'A') ||
                setweight(to_tsvector('english', coalesce(NEW.description, '')), 'B') ||
                setweight(to_tsvector('english', coalesce(NEW.content, '')), 'C');
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
    END IF;
END
$$;

-- Check if update_updated_at_column function exists, and create it if it doesn't
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_updated_at_column') THEN
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
    END IF;
END
$$;

-- Create blog_posts table
create table blog_posts (
    id uuid default uuid_generate_v4() primary key,
    slug text unique not null,
    title text not null,
    description text,
    content text,
    author text,
    featured_image text,
    category text,
    tags text[],
    published boolean default false,
    featured boolean default false,
    published_at timestamp with time zone,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    ts_content tsvector
);

-- Create indexes for blog posts
create index blog_posts_slug_idx on blog_posts (slug);
create index blog_posts_tags_idx on blog_posts using gin (tags);
create index blog_posts_ts_content_idx on blog_posts using gin (ts_content);

-- Create trigger for updating ts_content
create trigger blog_posts_ts_content_update
before insert or update on blog_posts
for each row execute function update_ts_content();

-- Create trigger for updating updated_at
create trigger update_blog_posts_updated_at
before update on blog_posts
for each row execute function update_updated_at_column();

-- Enable RLS
alter table blog_posts enable row level security;

-- Create RLS policies
create policy "Public can view published blog posts"
    on blog_posts for select
    using (published = true);

create policy "Admins can manage blog posts"
    on blog_posts for all
    using (auth.jwt() ->> 'role' = 'admin');

-- Create blog_post_relations table for related posts
create table blog_post_relations (
    id uuid default uuid_generate_v4() primary key,
    blog_post_id uuid references blog_posts(id) on delete cascade,
    related_blog_post_id uuid references blog_posts(id) on delete cascade,
    relation_type text not null,
    created_at timestamp with time zone default now(),
    unique(blog_post_id, related_blog_post_id)
);

-- Enable RLS on relations table
alter table blog_post_relations enable row level security;

-- Create RLS policy for relations
create policy "Admins can manage blog_post_relations"
  on blog_post_relations
  for all
  using (auth.jwt() ->> 'role' = 'admin');

-- Add comment to explain the migration
COMMENT ON TABLE blog_posts IS 'Blog posts with publishing workflow support';
COMMENT ON TABLE blog_post_relations IS 'Relationships between blog posts';