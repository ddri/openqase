# Release Notes

Keep track of new features, improvements, and bug fixes for OpenQase here.

---

## Version 0.2.0 (YYYY-MM-DD)

### ✨ Features

*   **Admin CMS Documentation:** Introduced a new developer documentation site using Docusaurus, hosted within the `/docs` directory of the main repository. Includes an initial guide for the refactored `/admin` CMS. ([#IssueID](link-to-pr-or-issue))
*   **Example Docs Page:** Added a basic example page to demonstrate content creation in the new docs site. ([#IssueID](link-to-pr-or-issue))

### 🐛 Bug Fixes

*   **Docs URL Structure:** Corrected the URL path for documentation pages to remove the duplicate `/docs/docs/` segment. Pages are now accessible at `/docs/[slug]`. ([#IssueID](link-to-pr-or-issue))
*   **Docs Landing Page:** Replaced the default Docusaurus landing page with a redirect to the primary CMS guide. ([#IssueID](link-to-pr-or-issue))

### 🔧 Changes & Improvements

*   Configured Docusaurus project basics (`title`, `baseUrl`, repository links).
*   Updated root `.gitignore` to exclude Docusaurus build artifacts.

---

## Version 0.1.0 (YYYY-MM-DD)

*Initial release or previous significant changes.*

### ✨ Features

*   **Admin CMS Refactor:** Completed refactoring of all admin content types (Personas, Algorithms, Industries, Case Studies, Blog Posts) to use single-page forms, Server Actions, and standardized relationship handling via junction tables. (See `cms-refactor-plan.md` for details).
*   **Consolidated Supabase Utils:** Merged Supabase client utilities into `src/lib/supabase.ts`.

### 🐛 Bug Fixes

*   Fixed blog display issues related to Supabase client calls.
*   Resolved type errors and Supabase client issues in Case Studies display and admin interface.
*   Removed unused legacy components and API routes (`client-standardized.tsx`, `api/user/preferences`).

---

*Find older release notes [here](link-to-archive-if-needed).* 