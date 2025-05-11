# Database Seeding

Seeding the database with initial or sample data is primarily handled through SQL scripts within the migrations system.

## Initial Seed Data

*   **File:** `migrations/001_initial_seed.sql`
*   **Content:** This migration file likely contains `INSERT` statements to populate tables like `industries`, `personas`, `algorithms`, and potentially some initial `case_studies` or `blog_posts` with baseline data required for the application to function or for demonstration purposes.
*   **Execution:** This seed script is run automatically as part of the migration process when the local Supabase instance is first started (`supabase start`) or reset (`supabase db reset`), as it's part of the numbered migration sequence.

## Admin User Setup

*   **File:** `scripts/setup-admin.ts`
*   **Content:** This script appears to be responsible for setting up an initial administrative user. It likely:
    *   Interacts with Supabase Auth to create a user account (potentially using predefined credentials, possibly from environment variables).
    *   Inserts a corresponding record into the `user_preferences` table, setting the `role` field to `'admin'`.
*   **Execution:** This is a custom script run using `ts-node`. It needs to be executed manually after the initial database setup and potentially requires specific environment variables to be set. To run it:
    ```bash
    npm run setup-admin
    ```
    *(Based on the script definition in `package.json`)*. Check the script's content or associated documentation for required environment variables or parameters.

## Local Development

When running `supabase start` or `supabase db reset` for local development:

1.  The database schema is created/reset based on all migration files in `migrations/`.
2.  The `001_initial_seed.sql` script is executed, populating tables with initial content.
3.  You may need to manually run `npm run setup-admin` afterwards to ensure an admin user exists for accessing the `/admin` CMS.

## Staging/Production

Seeding in staging or production environments usually requires a more controlled approach. The `001_initial_seed.sql` might only contain essential lookup data (like industries), while sample content or admin users might be created manually or through dedicated, environment-specific seeding scripts, depending on the deployment strategy. 