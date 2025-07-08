# Release Notes

Keep track of new features, improvements, and bug fixes for OpenQase here.

---

## Version 0.3.0 (January 2025)

### ✨ Features

*   **Newsletter Subscription System:** Complete email marketing infrastructure with Resend integration, beautiful HTML templates, rate limiting, and unsubscribe functionality. Includes production-ready API endpoints for subscription management.
*   **Algorithm Documentation Enhancement:** Added structured steps and academic references support with custom markup parsing (`<step>` tags and `[^1]` references) for comprehensive algorithm documentation.
*   **Case Studies Performance Optimization:** Fixed API timeout issues by eliminating N+1 queries and standardizing to the Learning Paths pattern for consistent performance.
*   **Enhanced Admin CMS:** Improved content management workflows with better relationship handling and standardized patterns across all content types.

### 🐛 Bug Fixes

*   **Logo Visibility:** Fixed OpenQase logo disappearing in Graphite theme by properly detecting all dark theme variants (`dark` and `graphite`).
*   **Case Studies API Timeout:** Resolved performance issues caused by N+1 relationship queries by simplifying the API pattern.
*   **Content Standardization:** Ensured all content tables have consistent `published`, `updated_at`, and `published_at` fields with proper triggers.

### 🔧 Changes & Improvements

*   **Database Schema Standardization:** All content tables now follow consistent patterns with proper RLS policies and triggers.
*   **Email Infrastructure:** Unified email system using Resend for both transactional and marketing emails with SMTP configuration.
*   **Performance Monitoring:** Added performance baseline scripts and content size verification tools.
*   **Theme Consistency:** Improved theme switching logic and standardized OpenQase branding across components.
*   **Documentation Expansion:** Comprehensive guides for newsletter system, algorithm enhancements, and architecture modernization planning.

### 🚀 Infrastructure

*   **Rate Limiting:** Implemented per-IP rate limiting for newsletter subscriptions (5 requests per 5-minute window).
*   **Database Migrations:** Added migrations for newsletter subscriptions, blog tables, and content table standardization.
*   **Admin Role Management:** Improved admin setup scripts and role verification processes.

---

## Version 0.2.0 (2024)

### ✨ Features

*   **Admin CMS Documentation:** Introduced a new developer documentation site using Docusaurus, hosted within the `/docs` directory of the main repository. Includes an initial guide for the refactored `/admin` CMS.
*   **Example Docs Page:** Added a basic example page to demonstrate content creation in the new docs site.

### 🐛 Bug Fixes

*   **Docs URL Structure:** Corrected the URL path for documentation pages to remove the duplicate `/docs/docs/` segment. Pages are now accessible at `/docs/[slug]`.
*   **Docs Landing Page:** Replaced the default Docusaurus landing page with a redirect to the primary CMS guide.

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

*Older release notes will be added here as the project evolves.* 