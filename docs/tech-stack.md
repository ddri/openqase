# Tech Stack

This project utilizes a modern web development stack focused on React, Next.js, and Supabase.

## Core Framework & Backend

*   **Framework:** [Next.js](https://nextjs.org/) (v15+) - Using the App Router.
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Backend & Database:** [Supabase](https://supabase.com/)
    *   PostgreSQL Database
    *   Authentication
    *   Storage (Assumed, for potential future use)
    *   Serverless Functions (Potentially, via Supabase Edge Functions)

## Frontend & UI

*   **UI Library:** [React](https://react.dev/) (v19+)
*   **Component Framework:** [shadcn/ui](https://ui.shadcn.com/) - Built upon Radix UI and Tailwind CSS.
    *   [Radix UI](https://www.radix-ui.com/) (Primitives)
    *   [Tailwind CSS](https://tailwindcss.com/) (Styling)
    *   [Lucide React](https://lucide.dev/) (Icons)
*   **Data Fetching/State (Client):** [TanStack Query (React Query)](https://tanstack.com/query/latest)
*   **Tables:** [TanStack Table (React Table)](https://tanstack.com/table/latest)
*   **Markdown Rendering:** [react-markdown](https://github.com/remarkjs/react-markdown) / [markdown-it](https://github.com/markdown-it/markdown-it)
*   **Forms:** Standard HTML/React, potentially enhanced with libraries like [React Select](https://react-select.com/).

## Development & Tooling

*   **Package Manager:** npm (Based on `package-lock.json`)
*   **Linting:** [ESLint](https://eslint.org/)
*   **Validation:** [Zod](https://zod.dev/)
*   **Scripting:** [ts-node](https://github.com/TypeStrong/ts-node)
*   **API Helpers:** `@supabase/ssr`, `@supabase/auth-helpers-nextjs`, `@supabase/supabase-js`

## Documentation

*   **Framework:** [Docusaurus](https://docusaurus.io/) (v3) 