# Utility Scripts

The `/scripts` directory contains various utility scripts for development, data management, verification, and setup tasks. These are typically run manually from the command line using `ts-node` (for `.ts` files) or `node` (for `.js`/`.mjs` files).

## Key Scripts

*   **`setup-admin.ts`:**
    *   **Purpose:** Sets up an initial administrative user in Supabase Auth and assigns the 'admin' role in the `user_preferences` table. Essential for accessing the Admin CMS locally.
    *   **Execution:** `npm run setup-admin` (as defined in `package.json`). *Requires appropriate environment variables to be set.*

*   **`migrate-mdx-to-db.ts`:** (Referenced in `package.json` as `migrate:content`)
    *   **Purpose:** Likely involved in migrating content originally stored in MDX files into the Supabase database. *(Exact functionality requires inspecting the script).*
    *   **Execution:** `npm run migrate:content`.

*   **`get-schema.ts`:**
    *   **Purpose:** Possibly fetches or generates a representation of the current database schema, perhaps for documentation or type generation.

*   **Verification Scripts:**
    *   `verify-admin-role.sql`: SQL script to check admin role setup.
    *   `verify-migration.ts`: Checks the status or consistency of database migrations.
    *   `verify-learning-paths.mjs`: Verifies data related to learning paths.
    *   `verify-content.mjs`: Checks the validity or consistency of content data.
    *   `check-json.mjs`: Potentially validates JSON files or data structures.

*   **Migration/Fix Scripts:**
    *   `apply-blog-migration.js`: Applies specific changes related to the blog feature migration.
    *   `apply-fix-case-studies-access.js`: Applies fixes related to case study access permissions (RLS).

*   **Setup/Utility Scripts:**
    *   `enable-dev-mode.js`: Might toggle specific development-only settings or features.
    *   `local-admin-setup.sql`: An SQL script, possibly containing queries used by `setup-admin.ts` or for manual setup.

## Running Scripts

*   **npm Scripts:** Use `npm run <script-name>` for scripts defined in `package.json` (like `setup-admin`, `migrate:content`).
*   **Manual Execution:** For other scripts, use `ts-node` or `node` directly:
    ```bash
    # Example for a TypeScript script
    npx ts-node scripts/get-schema.ts

    # Example for a JavaScript/MJS script
    node scripts/verify-content.mjs
    ```

**Note:** Always inspect a script's contents before running it to understand its purpose, potential side effects, and any required environment variables or arguments. 