-- Add MDX content fields to core tables
alter table algorithms
add column mdx_content text,
add column prerequisites text[],
add column key_applications text[];

alter table industries
add column mdx_content text,
add column key_applications jsonb; -- For storing structured application data with examples

alter table personas
add column mdx_content text,
add column expertise text[],
add column persona_type text,
add column related_case_studies text[];

-- Update case_studies table
alter table case_studies
add column mdx_content text,
add column difficulty text,
add column tags text[],
add column metrics jsonb,
add column technologies text[];

-- Create indexes for new array fields
create index algorithms_prerequisites_idx on algorithms using gin (prerequisites);
create index algorithms_key_applications_idx on algorithms using gin (key_applications);
create index personas_expertise_idx on personas using gin (expertise);
create index personas_related_case_studies_idx on personas using gin (related_case_studies);
create index case_studies_tags_idx on case_studies using gin (tags);
create index case_studies_technologies_idx on case_studies using gin (technologies);

-- Add full-text search capabilities for MDX content
alter table algorithms
add column ts_content tsvector
generated always as (
  to_tsvector('english', coalesce(description, '') || ' ' || coalesce(mdx_content, ''))
) stored;

alter table industries
add column ts_content tsvector
generated always as (
  to_tsvector('english', coalesce(description, '') || ' ' || coalesce(mdx_content, ''))
) stored;

alter table personas
add column ts_content tsvector
generated always as (
  to_tsvector('english', coalesce(description, '') || ' ' || coalesce(mdx_content, ''))
) stored;

alter table case_studies
add column ts_content tsvector
generated always as (
  to_tsvector('english', coalesce(description, '') || ' ' || coalesce(content, '') || ' ' || coalesce(mdx_content, ''))
) stored;

-- Create full-text search indexes
create index algorithms_ts_content_idx on algorithms using gin(ts_content);
create index industries_ts_content_idx on industries using gin(ts_content);
create index personas_ts_content_idx on personas using gin(ts_content);
create index case_studies_ts_content_idx on case_studies using gin(ts_content); 