# Component Library

The project utilizes a combination of custom components and components provided by the [shadcn/ui](https://ui.shadcn.com/) library, organized within the `src/components/` directory.

## `src/components/` Directory Structure

*   **`src/components/ui/`**: This directory contains the source code for shadcn/ui components that have been added to the project using the shadcn/ui CLI (e.g., Button, Input, Card, DropdownMenu). Because the source code is directly included, these components can be easily customized as needed.
*   **`src/components/` (Root or Subdirectories):** This directory likely contains custom-built React components specific to the OpenQase application. These might include:
    *   **Layout Components:** Components defining specific page layouts or sections (e.g., `AdminLayout`, `PageHeader`).
    *   **Feature Components:** More complex components related to specific features (e.g., `CaseStudyCard`, `AlgorithmSelector`, `RelationshipSelector` as seen in the Admin CMS).
    *   **Shared Utilities:** Smaller, reusable UI pieces not covered by shadcn/ui.

## Key Concepts & Patterns

*   **Composition:** Components are likely built using composition, combining smaller shadcn/ui primitives and custom elements to create more complex UI structures.
*   **Styling:** Components are styled using [Tailwind CSS](./styling.md) utility classes, following the conventions established by shadcn/ui. The `cn` utility function (likely from `src/lib/utils.ts`) is probably used extensively to conditionally merge Tailwind classes.
*   **Server vs. Client Components:** Components within this directory can be either Server or Client Components.
    *   Purely presentational components are often Server Components by default.
    *   Components requiring state, lifecycle hooks (`useEffect`), browser APIs, or event handlers must be marked with the `"use client";` directive. shadcn/ui components that handle user interaction (like DropdownMenu, Input, Checkbox) are typically Client Components.
*   **Reusability:** The goal is to create reusable components to maintain UI consistency and reduce code duplication.

## Using Components

*   **shadcn/ui Components:** Import directly from their path within `src/components/ui/` (often using the `@/components/ui/` alias configured in `tsconfig.json`).
    ```typescript
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
    ```
*   **Custom Components:** Import from their location within `src/components/`.
    ```typescript
    import PageHeader from '@/components/PageHeader';
    import RelationshipSelector from '@/components/RelationshipSelector'; // Example path
    ```

Developers should look within `src/components/` for existing reusable elements before creating new ones. When adding new shadcn/ui components, use the CLI: `npx shadcn-ui@latest add [component-name]`. 