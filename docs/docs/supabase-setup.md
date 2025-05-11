# Supabase Setup

This project uses Supabase for its backend database and authentication. For local development, it's highly recommended to use the [Supabase CLI](https://supabase.com/docs/guides/cli) to run a local instance of Supabase services.

## Prerequisites

*   [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started) installed.
*   [Docker](https://www.docker.com/) installed and running (required by Supabase CLI for local development).

## Local Development Workflow

1.  **Initialize Supabase (if not already done):**
    If this is the first time setting up Supabase locally for this project, navigate to the `supabase` directory and link it to your project (optional, mainly for remote management) or initialize it. The project seems to already have a `supabase/` directory, so it's likely initialized.

2.  **Start Local Supabase Services:**
    From the **root directory** of the project (`openqase/`):
    ```bash
    supabase start
    ```
    This command starts the local Supabase stack using Docker, including the database, Auth, Storage, and other services. It will also apply any migrations found in the `supabase/migrations/` directory (or the `migrations/` directory if configured differently).

3.  **Get Local Credentials:**
    Once Supabase has started, the CLI will output the local service URLs and keys. You can also retrieve them anytime using:
    ```bash
    supabase status
    ```
    This will display information similar to this:
    ```
         API URL: http://localhost:54321
       GraphQL URL: http://localhost:54321/graphql/v1
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
        Inbucket URL: http://localhost:54324
      JWT secret: your-local-jwt-secret
        anon key: your-local-anon-key
    service_role key: your-local-service-role-key
    ```

4.  **Configure Environment Variables:**
    Copy the relevant keys and URLs from the `supabase status` output into your `.env.local` file in the project root:
    ```.env
    # .env.local

    # Use the URLs and keys from 'supabase status' output
    NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-local-anon-key
    SUPABASE_SERVICE_ROLE_KEY=your-local-service-role-key

    # Other environment variables...
    ```
    *   **Important:** The `.env.local` file should be listed in your `.gitignore` (which it is) and should **never** be committed to version control, especially when containing sensitive keys like the `service_role` key.

## Database Migrations

Schema changes are managed via migration files located in the `supabase/migrations/` (or potentially the root `migrations/`) directory.

*   When you run `supabase start`, the CLI automatically applies any new migrations.
*   To reset the local database and reapply all migrations (useful if migrations get stuck or you want a clean slate):
    ```bash
    supabase db reset
    ```
*   To create a new migration after making schema changes (e.g., using Supabase Studio locally at `http://localhost:54323` or via SQL):
    ```bash
    supabase migration new <migration_name>
    # Follow instructions to populate the new migration file.
    ```

Refer to the official [Supabase CLI documentation](https://supabase.com/docs/guides/cli) for more advanced commands and workflows. 