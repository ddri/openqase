# Deployment

Deploying the OpenQase application involves deploying two separate artifacts:

1.  The main Next.js application (from the root directory).
2.  The static Docusaurus documentation site (built from the `docs/` directory).

The specific deployment method isn't explicitly defined via configuration files (like `vercel.json` or GitHub Actions) within this repository. Deployment is likely handled via a hosting platform's Git integration (e.g., Vercel, Netlify) or manual processes.

## Recommended Platform: Vercel

[Vercel](https://vercel.com/), the creators of Next.js, provides seamless support for deploying Next.js applications and has excellent built-in support for monorepos containing documentation sites.

### Monorepo Configuration on Vercel

If using Vercel's Git integration:

1.  **Project Linking:** Link your Git repository (e.g., GitHub) to a Vercel project.
2.  **Framework Preset:** Vercel should automatically detect Next.js as the framework for the root directory.
3.  **Root Directory:** Ensure the "Root Directory" setting in Vercel is set to the repository root (`.`).
4.  **Build Command:** The default `next build` (or `npm run build`) should work for the main application.
5.  **Ignored Build Step:** By default, Vercel might try to build pushes to any path. You might need to configure the "Ignored Build Step" setting if you want deployments *only* triggered by changes outside the `/docs` directory (or vice-versa if deploying docs separately). Example:
    ```bash
    # In Vercel's "Ignored Build Step" setting under Git integration
    cd .. && if git diff --quiet HEAD^ HEAD ./docs; then exit 0; else exit 1; fi
    ```
    *(This example ignores builds if *only* files within `/docs` changed. Adjust logic as needed).*

### Deploying Docs with the App (Subpath: `/docs`)

This is often the most convenient approach for integrated documentation.

1.  **Build Docs as Part of App Build:** Modify the root `package.json`'s `build` script to build both the app and the docs:
    ```json
    "scripts": {
      // ... other scripts
      "build:docs": "cd docs && npm run build",
      "build": "npm run build:docs && next build"
      // Or: "build": "next build && npm run build:docs" - order might matter
    },
    ```
2.  **Copy Docs Build Output:** After both builds complete, the static Docusaurus output (from `docs/build`) needs to be served by the Next.js application, typically from the `/docs` path. This usually involves copying the `docs/build` contents into the Next.js app's `public/docs` directory before deployment or configuring Vercel/your server to serve the static files. A common approach is to add a step to the `build` script:
    ```json
    "scripts": {
      "build:docs": "cd docs && npm run build",
      "copy:docs": "rm -rf public/docs && cp -r docs/build public/docs",
      "build": "npm run build:docs && next build && npm run copy:docs"
    }
    ```
    *(Ensure `public/docs` is not ignored by `.gitignore` if using this method).*
3.  **Docusaurus `baseUrl`:** Ensure `baseUrl: '/docs/'` is set in `docs/docusaurus.config.ts`.
4.  **Vercel Deployment:** Vercel should pick up the `build` script, build both, and the static files in `public/docs` will be served automatically under the `/docs` path of your main application domain.

### Deploying Docs Separately (Subdomain: `docs.openqase.com`)

1.  **Separate Vercel Project:** Create a *separate* Vercel project specifically for the documentation.
2.  **Root Directory:** Configure this Vercel project's "Root Directory" setting to point to `/docs`.
3.  **Framework Preset:** Vercel should detect Docusaurus.
4.  **Build Command:** `npm run build` (will run the build script within `docs/package.json`).
5.  **Docusaurus `baseUrl`:** Ensure `baseUrl: '/'` is set in `docs/docusaurus.config.ts`.
6.  **Domain:** Assign your desired subdomain (e.g., `docs.openqase.com`) to this Vercel project.

## Environment Variables

*   Ensure production environment variables (e.g., `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) are securely configured in your hosting provider's settings. **Do not commit production keys to `.env.local` or the repository.**

## Database Migrations

*   Database migrations (`supabase/migrations/` or `migrations/`) need to be applied to your production Supabase instance.
*   This is typically done as a separate step in a CI/CD pipeline *before* deploying the application code that relies on the schema changes.
*   The command usually involves linking the Supabase CLI to your production project and running:
    ```bash
    supabase db push --linked
    ```

Choose the deployment strategy (subpath or subdomain for docs) that best suits your needs. Using Vercel's monorepo capabilities often simplifies the process, especially for the subpath approach. 