# Routing

This project uses the Next.js [App Router](https://nextjs.org/docs/app) paradigm for defining routes and handling navigation. The structure of the `src/app/` directory directly maps to the application's URL paths.

## Key Concepts

*   **Directory-Based Routing:** Each folder within `src/app/` represents a URL segment. For example, `src/app/admin/blog-posts/` maps to the `/admin/blog-posts` path.
*   **`page.tsx`:** Defines the UI for a specific route segment. A `page.tsx` file makes a route publicly accessible. For example, `src/app/about/page.tsx` renders the content for the `/about` page.
*   **`layout.tsx`:** Defines UI that is shared across multiple routes within a directory and its children. The root layout is defined in `src/app/layout.tsx`. Nested layouts can be created within subdirectories.
*   **Dynamic Routes:** Folders named with square brackets (e.g., `[id]`, `[slug]`) create dynamic routes. The value within the brackets becomes a parameter accessible within the page/layout components.
    *   Example: `src/app/admin/blog-posts/[id]/page.tsx` handles routes like `/admin/blog-posts/123`, where `123` is the `id` parameter.
*   **Route Groups:** Folders named with parentheses (e.g., `(marketing)`) group routes without affecting the URL path. This is useful for organizing routes or applying specific layouts to a group. *(This project might not use route groups currently, but it's a standard feature).*
*   **API Routes (`route.ts`):** While the project is moving towards Server Actions, traditional API endpoints can be defined using `route.ts` files within the `src/app/api/` directory or other route segments. For example, `src/app/api/user/route.ts` would handle requests to `/api/user`.

## Observed Route Structure

Based on the `src/app/` directory:

*   `/`: Homepage (`src/app/page.tsx`)
*   `/admin/*`: Admin CMS routes (`src/app/admin/`)
    *   `/admin/[content-type]/`: List view for a content type.
    *   `/admin/[content-type]/[id]`: Edit/view page for a specific content item.
*   `/api/*`: API endpoints (`src/app/api/`)
*   `/auth/*`: Authentication pages (`src/app/auth/`)
*   `/blog`, `/blog/[slug]`: Public blog pages (`src/app/blog/`)
*   `/case-study`, `/case-study/[slug]`: Public case study pages (`src/app/case-study/`)
*   `/paths/*`: Routes related to Learning Paths (`src/app/paths/`)
*   `/profile`: User profile page (`src/app/profile/`)
*   `/contact`: Contact page (`src/app/contact/`)
*   `/about`: About page (`src/app/about/`)

Navigation between routes typically uses the Next.js `<Link>` component (`next/link`) for client-side navigation or server-side redirects (`next/navigation`). 