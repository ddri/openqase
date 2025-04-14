-- Create stack layers table
create table stack_layers (
    id uuid default uuid_generate_v4() primary key,
    slug text unique not null,
    name text not null,
    description text,
    order_index integer not null,
    parent_layer_id uuid references stack_layers(id),
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Add stack_layers array to case_studies
alter table case_studies 
add column stack_layers text[];

-- Create index for stack layers in case studies
create index case_studies_stack_layers_idx on case_studies using gin (stack_layers);

-- Enable RLS on stack_layers
alter table stack_layers enable row level security;

-- Create RLS policies for stack_layers
create policy "Public can view stack layers"
    on stack_layers for select
    using (true);

create policy "Admins can manage stack layers"
    on stack_layers for all
    using (auth.jwt() ->> 'role' = 'admin');

-- Update verification function
create or replace function verify_initial_setup()
returns boolean as $$
begin
    -- Verify all tables exist
    if not exists (
        select from information_schema.tables 
        where table_name in (
            'industries', 'personas', 'algorithms', 
            'user_preferences', 'case_studies', 
            'case_study_relations', 'stack_layers'
        )
    ) then
        return false;
    end if;

    -- Verify RLS is enabled
    if not exists (
        select from pg_tables 
        where tablename in ('case_studies', 'user_preferences', 'stack_layers')
        and rowsecurity = true
    ) then
        return false;
    end if;

    return true;
end;
$$ language plpgsql; 