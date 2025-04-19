# Database Schema Design

## Overview
This document outlines the complete database structure for OpenQASE, including user preferences, content management, and relationships between different entities.

## Core Tables (MVP)

### 1. User Preferences (`user_preferences`)
```sql
create table user_preferences (
    id uuid references auth.users(id) primary key,
    -- Theme and UI preferences
    theme_preference text default 'system',
    ui_preferences jsonb default jsonb_build_object(
        'sidebar_collapsed', false,
        'code_font_size', 'medium'
    ),
    -- Email preferences
    email_preferences jsonb default jsonb_build_object(
        'product_updates', false,
        'newsletter', false,
        'case_study_alerts', false
    ),
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);
```

### 2. Case Studies (`case_studies`)
```sql
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
    tags text[],
    -- Technical details
    quantum_hardware text[],
    -- Status and timestamps
    published boolean default false,
    featured boolean default false,
    published_at timestamp with time zone,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Indexes for case studies
create index case_studies_slug_idx on case_studies (slug);
create index case_studies_algorithms_idx on case_studies using gin (algorithms);
create index case_studies_industries_idx on case_studies using gin (industries);
create index case_studies_personas_idx on case_studies using gin (personas);
create index case_studies_tags_idx on case_studies using gin (tags);
```

### 3. Algorithms (`algorithms`)
```sql
create table algorithms (
    id uuid default uuid_generate_v4() primary key,
    slug text unique not null,
    name text not null,
    description text,
    prerequisites text[],
    use_cases text[],
    published boolean default false,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);
```

### 4. Industries (`industries`)
```sql
create table industries (
    id uuid default uuid_generate_v4() primary key,
    slug text unique not null,
    name text not null,
    description text,
    icon text,
    created_at timestamp with time zone default now()
);
```

### 5. User Personas (`personas`)
```sql
create table personas (
    id uuid default uuid_generate_v4() primary key,
    slug text unique not null,
    name text not null,
    description text,
    role text,
    industry text[],
    key_interests text[],
    created_at timestamp with time zone default now()
);
```

## Core Relationship Tables

### 1. Case Study Relations (`case_study_relations`)
```sql
create table case_study_relations (
    id uuid default uuid_generate_v4() primary key,
    case_study_id uuid references case_studies(id) on delete cascade,
    related_case_study_id uuid references case_studies(id) on delete cascade,
    relation_type text not null,
    created_at timestamp with time zone default now(),
    unique(case_study_id, related_case_study_id)
);
```

## Nice to Have Features (Future Implementation)

### 1. User Progress Tracking
The following schema will be implemented in a future phase to track user interaction with content:

```sql
create table user_progress (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade,
    content_type text not null,
    content_id uuid not null,
    status text not null,
    progress numeric default 0,
    last_accessed timestamp with time zone,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    unique(user_id, content_type, content_id)
);

-- Indexes for future implementation
create index user_progress_user_id_idx on user_progress (user_id);
create index user_progress_content_idx on user_progress (content_type, content_id);

-- RLS policy for future implementation
create policy "Users can manage own progress"
    on user_progress for all
    using (auth.uid() = user_id);
```

Features enabled by user progress tracking:
- Content recommendation engine
- Usage analytics

## Core Indexes

```sql
-- Case Studies
create index case_studies_slug_idx on case_studies (slug);
create index case_studies_algorithms_idx on case_studies using gin (algorithms);
create index case_studies_industries_idx on case_studies using gin (industries);
create index case_studies_personas_idx on case_studies using gin (personas);

-- Algorithms
create index algorithms_slug_idx on algorithms (slug);
```

## Core Row Level Security (RLS) Policies

```sql
-- Enable RLS
alter table case_studies enable row level security;
alter table user_preferences enable row level security;

-- Case Studies policies
create policy "Public can view published case studies"
    on case_studies for select
    using (published = true);

create policy "Admins can manage case studies"
    on case_studies for all
    using (auth.jwt() ->> 'role' = 'admin');

-- User preferences policies
create policy "Users can view own preferences"
    on user_preferences for select
    using (auth.uid() = id);

create policy "Users can update own preferences"
    on user_preferences for update
    using (auth.uid() = id);
```

## Implementation Plan

1. Initial Setup (MVP)
   - Create core tables in dependency order
   - Set up core RLS policies
   - Create essential indexes
   - Add initial seed data

2. Data Migration (if needed)
   - Plan for any existing data migration
   - Create migration scripts
   - Test migration process

3. Testing
   - Verify core relationships
   - Test RLS policies
   - Performance testing
   - Load testing with sample data

4. Future Features
   - Implement user progress tracking
   - Add progress-based features
   - Expand analytics capabilities

## Technical Considerations

### Performance
- Use appropriate indexes for frequent queries
- Consider partitioning for large tables
- Monitor query performance
- Use materialized views if needed

### Security
- All tables have RLS policies
- Proper user role management
- Regular security audits
- Input validation

### Scalability
- Efficient data types
- Growth planning
- Caching strategy
- Archival strategy

### Maintenance
- Regular VACUUM and ANALYZE
- Index maintenance
- Monitoring and alerting
- Backup verification

## Future TODO

## Implementation Plan

### Phase 1: Frontend Integration
1. **API Client Setup**
   - Create TypeScript API client utilities
   - Implement data fetching hooks (React Query/SWR)
   - Add TypeScript interfaces for API responses
   - Set up error handling utilities

2. **Authentication Implementation**
   - Integrate Supabase Auth UI
   - Set up protected routes
   - Implement auth state management
   - Create login/signup flows
   - Add session persistence

3. **Core UI Components**
   - Case study display components
   - Learning path navigation
   - User preference settings
   - Loading states and error boundaries
   - Responsive layouts

### Phase 2: State Management & Performance
1. **Global State**
   - User preferences management
   - Authentication state
   - Theme management
   - Cache management

2. **Performance Optimization**
   - API response caching
   - Image optimization
   - Code splitting
   - Lazy loading

### Phase 3: Testing & Quality Assurance
1. **Testing Infrastructure**
   - Unit tests for API clients
   - Integration tests for endpoints
   - E2E tests for critical flows
   - API response mocking

2. **Quality Checks**
   - TypeScript strict mode
   - ESLint configuration
   - Prettier setup
   - CI/CD pipeline

### Phase 4: Documentation & Developer Experience
1. **Documentation**
   - API response examples
   - Component documentation
   - Development setup guide
   - Contributing guidelines

2. **Developer Tools**
   - Development environment setup
   - Debugging utilities
   - Local development tools
   - API testing tools

### Success Metrics
- API response times < 200ms
- 100% TypeScript coverage
- > 90% test coverage
- Zero critical security issues
- < 1s Time to First Byte
- < 2s Time to Interactive

### Dependencies
- Next.js 15+
- React Query/SWR
- Supabase Client
- TypeScript 5+
- Jest/React Testing Library
- ESLint/Prettier 