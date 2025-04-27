# Application Structure

The OpenQase project follows a structure typical for modern Next.js applications, leveraging the App Router.

## Root Directory

The root directory contains configuration files, the main application source (`src/`), documentation (`docs/`), Supabase configuration (`supabase/`), scripts (`scripts/`), and other project-level items.

*   `src/`: Contains the core application code.
*   `docs/`: Contains the Docusaurus documentation site.
*   `supabase/`: Contains Supabase CLI configuration (`config.toml`) and potentially linked project details.
*   `migrations/`: Contains database migration files managed by the Supabase CLI.
*   `scripts/`: Contains custom Node.js/TypeScript utility scripts for tasks like data migration or setup.
*   `public/`: Static assets directly served by Next.js.
*   `next.config.ts`: Next.js configuration file.
*   `package.json`: Project dependencies and scripts.
*   `tailwind.config.js`, `postcss.config.js`: Tailwind CSS configuration.
*   `tsconfig.json`: TypeScript configuration for the main application.
*   `.env.local`: Local environment variables (Supabase keys, etc.). **Never commit this file.**

## `src/` Directory

This is where the primary application logic resides.

*   `src/app/`: Core of the Next.js App Router implementation. Contains layouts, pages, API routes, and specific feature routes.
*   `src/components/`: Shared React components used throughout the application, likely including UI elements built with shadcn/ui.
*   `src/lib/`: Core library code, utilities, and integrations. Notably contains Supabase client helpers (`supabase-*.ts`), API clients, type definitions, and validation logic.
*   `src/utils/`: Additional utility functions. *(Consider consolidating relevant utilities into `src/lib/` if appropriate)*.
*   `src/hooks/`: Custom React hooks.
*   `src/contexts/`: React Context providers.
*   `src/types/`: Application-specific TypeScript type definitions (though some might also be in `src/lib/types.ts`).
*   `src/middleware.ts`: Next.js middleware, primarily handling authentication and route protection.
*   `src/config/`: Application-level configuration constants or settings.

## `src/app/` Directory

Defines the application's routes and views.

*   `layout.tsx`: Root layout component wrapping all pages.
*   `page.tsx`: The application's homepage component.
*   `globals.css`: Global CSS styles.
*   `admin/`: Contains all routes and components for the Content Management System.
*   `api/`: Contains API route handlers. *(Note: These might be partially or fully deprecated in favor of Server Actions)*.
*   `auth/`: Routes related to user authentication (login, signup, callback).
*   `blog/`, `case-study/`, `paths/`, `profile/`, `contact/`, `about/`: Public-facing routes for different content types or application features.

This structure separates concerns, placing routing and core page logic in `src/app/`, reusable UI elements in `src/components/`, shared business logic and utilities in `src/lib/`, and configuration at the root or within `src/config/`. 