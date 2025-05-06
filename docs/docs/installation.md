# Installation

Follow these steps to set up the OpenQase project locally.

## Prerequisites

*   [Node.js](https://nodejs.org/) (Version >= 18.0, check with `node -v`)
*   [npm](https://www.npmjs.com/) (Comes with Node.js)
*   [Git](https://git-scm.com/)
*   Access to the repository.
*   (Optional but Recommended) [Supabase CLI](https://supabase.com/docs/guides/cli) for local development and migrations.

## Steps

1.  **Clone the Repository:**
    ```bash
    git clone <repository-url>
    cd openqase
    ```
    Replace `<repository-url>` with the actual URL of your Git repository.

2.  **Install Root Dependencies:**
    These are the dependencies for the main Next.js application.
    ```bash
    npm install
    ```

3.  **Install Documentation Site Dependencies:**
    The Docusaurus documentation site located in `/docs` has its own separate dependencies.
    ```bash
    cd docs
    npm install
    cd ..
    ```
    Alternatively, you can use the helper script from the root directory (once added):
    ```bash
    npm run docs:install
    ```
    *(Note: We haven't added this script to the root `package.json` yet, but it's planned in `docs-plan.md`, Step 9)*

4.  **Set Up Environment Variables:**
    The application requires environment variables, primarily for connecting to Supabase.
    *   Copy the example environment file (if one exists, e.g., `.env.local.example`) to `.env.local`.
        ```bash
        cp .env.local.example .env.local
        ```
        *(If `.env.local.example` doesn't exist, you'll need to create `.env.local` manually based on required variables).*
    *   Fill in the necessary values in `.env.local`, especially:
        *   `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
        *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase project anon key.
        *   `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (keep this secret!).
    *   Refer to the [Supabase Setup](./supabase-setup.md) guide for more details on obtaining these keys and setting up your local Supabase environment if needed.

After completing these steps, you should be ready to run the application and the documentation site locally. Refer to the [Running Locally](./running-locally.md) guide. 