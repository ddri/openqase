# Plan: Setting Up Docusaurus in /docs

**Goal:** Implement a Docusaurus documentation site within the `/docs` subdirectory of the `openqase` repository to host developer documentation, starting with `admin-cms-guide.md`.

**Guiding Principles:**

*   Keep documentation co-located with the application code for easier synchronization.
*   Avoid modifying the root Next.js application's configuration (`next.config.mjs`).
*   Leverage Docusaurus features for a robust documentation experience.
*   Proceed step-by-step, ensuring each stage is working correctly.

---

## Implementation Steps

**Phase 1: Initial Setup & Configuration**

1.  **Prerequisites Check:**
    *   Verify Node.js version compatibility with Docusaurus v3 (Requires Node.js >= 18.0).
    *   Confirm `npm` or `yarn` is available.
    *   **Action:** Run `node -v` in the terminal.

2.  **Create `/docs` Directory:**
    *   If it doesn't already exist (it seems it does from previous steps, but we confirm).
    *   **Action:** `mkdir docs` (if needed).

3.  **Initialize Docusaurus:**
    *   Navigate into the `/docs` directory.
    *   Run the Docusaurus initialization command. We'll use the "classic" template and TypeScript.
    *   **Action:** `cd docs && npx create-docusaurus@latest . classic --typescript`
    *   **Watch Out:** This will create a new `package.json`, `node_modules`, `docusaurus.config.ts`, etc., *inside* the `/docs` directory.

4.  **Initial Docusaurus Configuration (`docs/docusaurus.config.ts`):**
    *   Open `docs/docusaurus.config.ts`.
    *   Update basic site metadata:
        *   `title`: e.g., 'OpenQase Developer Docs'
        *   `tagline`: Optional tagline.
        *   `favicon`: Point to a favicon (can reuse one from `/public` or add one later).
        *   `url`: Your *production* documentation site URL (e.g., `https://docs.openqase.com` or `https://openqase.com`). We'll decide the final structure later, but need a placeholder.
        *   `baseUrl`: The path where the docs will be served.
            *   If served at the root of a subdomain (e.g., `docs.openqase.com/`), use `/`.
            *   If served from a subpath (e.g., `openqase.com/docs/`), use `/docs/`. We'll start with `/docs/` as it's common when integrating into an existing site structure.
        *   `organizationName`: Your GitHub org/user name (e.g., 'your-github-username').
        *   `projectName`: Your GitHub repo name (e.g., 'openqase').
    *   Review theme configuration (navbar, footer) - adjust later as needed.
    *   **Action:** Edit `docs/docusaurus.config.ts`.

5.  **Local Development Test:**
    *   Still inside the `/docs` directory.
    *   Install dependencies for the Docusaurus project.
    *   Start the Docusaurus development server.
    *   **Action:** `npm install` (or `yarn install`) followed by `npm run start` (or `yarn start`).
    *   **Watch Out:** This will likely run on port 3000 by default. If your main Next.js app also uses port 3000, you'll need to run one of them on a different port (e.g., `npm run start -- --port 3001`).
    *   Verify the default Docusaurus site loads in your browser.

**Phase 2: Content Integration & Repo Setup**

6.  **Update Root `.gitignore`:**
    *   Add entries to prevent committing Docusaurus's local dependencies and build output.
    *   **Action:** Edit the *root* `.gitignore` file and add:
        ```
        # Docusaurus in /docs
        docs/node_modules
        docs/build
        docs/.docusaurus
        ```

7.  **Migrate Initial Content:**
    *   Locate the sample documentation files created by Docusaurus (usually inside `docs/docs/`).
    *   Remove or repurpose the sample files.
    *   Move the existing `admin-cms-guide.md` file (from the root `/docs` folder created previously) into the Docusaurus content folder (e.g., `docs/docs/admin-cms-guide.md`).
    *   **Action:** Move the file and clean up sample content.

8.  **Configure Sidebar (`docs/sidebars.ts`):**
    *   Edit `docs/sidebars.ts` (or `sidebars.js` if you didn't use `--typescript`).
    *   Define the structure of your documentation sidebar. Start simply by adding an entry for the admin guide. Example:
        ```typescript
        const sidebars: SidebarsConfig = {
          tutorialSidebar: [ // Or rename this sidebar key
            {
              type: 'doc',
              id: 'admin-cms-guide', // Corresponds to docs/docs/admin-cms-guide.md
            },
            // Add more pages/categories later
          ],
        };
        ```
    *   **Action:** Edit `docs/sidebars.ts`. Re-run the dev server (`npm run start` in `/docs`) and verify the guide appears in the sidebar.

9.  **Add Root Helper Scripts (`package.json`):**
    *   Edit the *root* `package.json` file.
    *   Add scripts to easily run Docusaurus commands from the project root.
    *   **Action:** Add scripts like:
        ```json
        "scripts": {
          // ... your existing scripts ...
          "docs:install": "cd docs && npm install",
          "docs:start": "cd docs && npm run start",
          "docs:build": "cd docs && npm run build",
          "docs:serve": "cd docs && npm run serve"
        },
        ```
    *   Test one of the scripts, e.g., `npm run docs:start` from the root directory.

**Latest Updates:**

✅ **Newsletter System Documentation Added (July 2025):**
   - Complete documentation for the newsletter subscription system
   - Covers API endpoints, database schema, email integration with Resend
   - Includes rate limiting, frontend integration examples, and deployment guide
   - File: `docs/docs/newsletter-system.md`
   - Added to Features section in `sidebars.ts`

**Phase 3: Deployment & Refinement**

10. **Discuss Deployment Strategy:**
    *   **Option A: Subpath (`openqase.com/docs/`)**
        *   Requires configuring your web server/hosting provider (e.g., Vercel) to serve the static files from `docs/build` at the `/docs` path, potentially alongside your Next.js app. This can involve rewrite rules.
        *   Ensure `baseUrl` in `docusaurus.config.ts` is `/docs/`.
    *   **Option B: Subdomain (`docs.openqase.com`)**
        *   Requires setting up DNS for the subdomain.
        *   Requires a separate deployment process/pipeline for the Docusaurus site pointing to the subdomain.
        *   Ensure `baseUrl` in `docusaurus.config.ts` is `/`.
    *   **Action:** Decide on the preferred deployment strategy. This will influence CI/CD setup.

11. **Implement Deployment:**
    *   Update CI/CD pipeline (`.github/workflows` or similar) to:
        *   Install dependencies for both the root project and `/docs`.
        *   Run the build command for the Next.js app (`npm run build`).
        *   Run the build command for Docusaurus (`npm run docs:build`).
        *   Deploy the Next.js app and the static Docusaurus build according to the chosen strategy (subpath or subdomain).
    *   **Action:** Update CI/CD configuration (This might be complex depending on your current setup).

12. **Refine and Enhance:**
    *   Customize the Docusaurus theme (navbar, footer, styles).
    *   Add more documentation pages.
    *   Implement search (Algolia DocSearch is free for open-source/public docs).
    *   Review configuration and content.
    *   **Action:** Ongoing refinement based on needs.

--- 