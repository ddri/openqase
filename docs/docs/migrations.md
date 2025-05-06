# Database Migrations

Changes to the database schema (creating tables, adding columns, modifying policies, etc.) are managed using the [Supabase CLI](https://supabase.com/docs/guides/cli) and SQL migration files.

## Workflow

1.  **Make Schema Changes Locally:**
    *   Start your local Supabase instance using `supabase start`.
    *   Connect to the local database using a tool like Supabase Studio (available at `http://localhost:54323` by default when running locally) or any standard PostgreSQL client.
    *   Make the desired schema changes using the Studio UI or by executing SQL commands directly.

2.  **Generate a New Migration File:**
    *   Once you've made your changes locally, use the Supabase CLI to automatically detect the differences between your local database schema and the last applied migration.
    *   From the **root directory** (`openqase/`), run:
        ```bash
        supabase migration new <your_migration_name>
        ```
        Replace `<your_migration_name>` with a short, descriptive name for the changes (e.g., `add_user_bio_field`, `update_case_study_rls`).
    *   This command creates a new SQL file in the `migrations/` directory (e.g., `migrations/YYYYMMDDHHMMSS_your_migration_name.sql`) containing the SQL statements needed to apply your changes.

3.  **Review and Edit the Migration File:**
    *   Open the newly generated SQL file.
    *   **Carefully review** the generated SQL to ensure it accurately reflects the changes you intended and doesn't include accidental modifications.
    *   Edit the file if necessary. You can add comments or adjust the SQL.

4.  **Apply Migrations Locally (Optional but Recommended):**
    *   To ensure your migration works correctly, you can reset your local database and reapply all migrations, including the new one:
        ```bash
        supabase db reset
        ```
        *(Warning: This deletes all local data!)*
    *   Alternatively, if `supabase start` is already running, stopping (`supabase stop`) and restarting (`supabase start`) should also apply the new migration if it hasn't been applied yet.

5.  **Commit the Migration File:**
    *   Add the new migration file (`migrations/YYYYMMDDHHMMSS_your_migration_name.sql`) to your Git commit along with any related application code changes.

## Applying Migrations

*   **Local Development:** Migrations are automatically applied when you run `supabase start`.
*   **Staging/Production:** When deploying changes to hosted Supabase projects (staging, production), migrations need to be applied using the Supabase CLI linked to that remote project, typically as part of a CI/CD pipeline:
    ```bash
    # Example command (likely run in CI/CD)
    supabase db push --linked
    ```

## Key Files & Directories

*   `migrations/`: Contains all the SQL migration files, ordered chronologically by their timestamp prefix.
*   `supabase/config.toml`: Supabase CLI configuration file.

Refer to the [Supabase Migrations Documentation](https://supabase.com/docs/guides/database/migrations) for more details. 