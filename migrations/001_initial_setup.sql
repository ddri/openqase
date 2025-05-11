-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- Create core reference tables first
create table industries (
    id uuid default uuid_generate_v4() primary key,
    slug text unique not null,
    name text not null,
    description text,
    icon text,
    created_at timestamp with time zone default now()
);

create table personas (
    id uuid default uuid_generate_v4() primary key,
    slug text unique not null,
    name text not null,
    description text,
    role text,
    industry text[],
    key_interests text[],
    technical_level text,
    created_at timestamp with time zone default now()
);

create table algorithms (
    id uuid default uuid_generate_v4() primary key,
    slug text unique not null,
    name text not null,
    description text,
    use_cases text[],
    quantum_advantage text,
    published boolean default false,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Create user preferences table
create table user_preferences (
    id uuid references auth.users(id) primary key,
    theme_preference text default 'system',
    ui_preferences jsonb default jsonb_build_object(
        'sidebar_collapsed', false,
        'code_font_size', 'medium'
    ),
    email_preferences jsonb default jsonb_build_object(
        'product_updates', false,
        'newsletter', false,
        'case_study_alerts', false
    ),
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Create main content table
create table case_studies (
    id uuid default uuid_generate_v4() primary key,
    slug text unique not null,
    title text not null,
    description text,
    content text,
    -- Core metadata
    partner_companies text[],
    quantum_companies text[],
    url text,
    -- Classifications
    algorithms text[],
    industries text[],
    personas text[],
    -- Technical details
    quantum_hardware text[],
    -- Status and timestamps
    published boolean default false,
    published_at timestamp with time zone,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Create relationship table
create table case_study_relations (
    id uuid default uuid_generate_v4() primary key,
    case_study_id uuid references case_studies(id) on delete cascade,
    related_case_study_id uuid references case_studies(id) on delete cascade,
    relation_type text not null,
    created_at timestamp with time zone default now(),
    unique(case_study_id, related_case_study_id)
);

-- Create essential indexes
create index case_studies_slug_idx on case_studies (slug);
create index case_studies_algorithms_idx on case_studies using gin (algorithms);
create index case_studies_industries_idx on case_studies using gin (industries);
create index case_studies_personas_idx on case_studies using gin (personas);
create index algorithms_slug_idx on algorithms (slug);
create index case_studies_partner_companies_idx on case_studies using gin (partner_companies);
create index case_studies_quantum_companies_idx on case_studies using gin (quantum_companies);
create index case_studies_quantum_hardware_idx on case_studies using gin (quantum_hardware);

-- Enable Row Level Security
alter table case_studies enable row level security;
alter table user_preferences enable row level security;

-- Create RLS Policies
create policy "Public can view published case studies"
    on case_studies for select
    using (published = true);

create policy "Admins can manage case studies"
    on case_studies for all
    using (auth.jwt() ->> 'role' = 'admin');

create policy "Users can view own preferences"
    on user_preferences for select
    using (auth.uid() = id);

create policy "Users can update own preferences"
    on user_preferences for update
    using (auth.uid() = id);

-- Create verification function
create or replace function verify_initial_setup()
returns boolean as $$
begin
    -- Verify all tables exist
    if not exists (
        select from information_schema.tables 
        where table_name in (
            'industries', 'personas', 'algorithms', 
            'user_preferences', 'case_studies', 
            'case_study_relations'
        )
    ) then
        return false;
    end if;

    -- Verify RLS is enabled
    if not exists (
        select from pg_tables 
        where tablename in ('case_studies', 'user_preferences')
        and rowsecurity = true
    ) then
        return false;
    end if;

    return true;
end;
$$ language plpgsql; 