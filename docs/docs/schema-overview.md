# Schema Overview

The OpenQase database schema is managed using Supabase and its migration system. Below is an overview of the key tables identified from the migration files.

*Note: The schema has evolved. Early migrations might show relationships stored as text arrays (`text[]`) within content tables. Later refactoring efforts introduced dedicated junction tables for many-to-many relationships, which is the current standard approach.*

## Core Content Tables

These tables represent the main content types managed by the Admin CMS. They share common fields like `id`, `slug`, `name`/`title`, `description`, `created_at`, `updated_at`, `published`, and `published_at`.

*   **`case_studies`**: Stores information about case studies. Contains metadata like `partner_companies`, `quantum_companies`, `url`, `quantum_hardware`, and originally contained `text[]` fields for `algorithms`, `industries`, and `personas` (now likely managed via junction tables).
*   **`blog_posts`**: (Introduced in later migrations, e.g., `006_add_blog_tables.sql`) Stores blog articles, likely with fields for `title`, `slug`, `content`, author information, etc.
*   **`algorithms`**: Stores details about specific algorithms, including `use_cases` and `quantum_advantage`.
*   **`personas`**: Represents user personas, including `role`, `key_interests`, `technical_level`. Originally contained `text[]` for `industry` (now likely managed via junction tables).
*   **`industries`**: Stores information about different industries, potentially including an `icon`.

## User & Authentication Tables

*   **`auth.users`**: (Built-in Supabase table) Stores user authentication information (email, password hash, etc.). Referenced by `user_preferences`.
*   **`user_preferences`**: Stores user-specific settings.
    *   Links to `auth.users` via the user's `id`.
    *   Includes fields for `theme_preference`, UI settings (`ui_preferences` JSONB), email notification settings (`email_preferences` JSONB).
    *   Crucially contains a `role` column (likely added later) used by the middleware to determine admin access.

## Relationship (Junction) Tables

Following the refactoring plan, many-to-many relationships are managed via dedicated junction tables. Examples likely include (names may vary slightly):

*   `algorithm_case_study_relations`
*   `algorithm_industry_relations`
*   `case_study_industry_relations`
*   `case_study_persona_relations`
*   `blog_post_relations` (For related blog posts)
*   `persona_industry_relations` (Likely added during refactor)

These tables typically contain foreign keys referencing the IDs of the two related content tables (e.g., `case_study_id`, `algorithm_id`).

## Other Potential Tables

*   **`learning_paths` / `paths`**: Based on the `src/app/paths` route, there might be tables related to learning paths or sequences of content. (Needs confirmation from later migrations or schema).

## Key Concepts

*   **UUIDs:** Primary keys (`id`) predominantly use UUIDs (`uuid_generate_v4()`).
*   **Slugs:** Unique text slugs (`slug`) are used for user-friendly URLs.
*   **Timestamps:** Standard `created_at`, `updated_at`, and `published_at` timestamps (`timestamp with time zone`) track record changes and publishing status.
*   **RLS (Row Level Security):** Policies are applied (e.g., on `case_studies`, `user_preferences`) to control data access based on user roles or ownership. Admins typically bypass RLS via the service role key in Server Actions.
*   **Indexes:** Various indexes are created on slugs and potentially array fields (using GIN indexes) to improve query performance.

For the most up-to-date and detailed schema, developers should refer to the latest migration files in the `/migrations` directory or inspect the database directly (e.g., using the local Supabase Studio). 