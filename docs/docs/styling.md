# Styling

Styling in the OpenQase application is primarily handled using [Tailwind CSS](https://tailwindcss.com/) along with the [shadcn/ui](https://ui.shadcn.com/) component library.

## Tailwind CSS

*   **Utility-First:** Tailwind CSS is used for its utility-first approach, allowing for rapid development by composing styles directly in the HTML/JSX markup.
*   **Configuration:**
    *   `tailwind.config.js`: Defines the theme configuration (colors, spacing, fonts), plugins, and content sources for Tailwind to scan.
    *   `postcss.config.js`: Configures PostCSS plugins, typically including Tailwind CSS and Autoprefixer.
    *   `src/app/globals.css`: Contains Tailwind's base styles (`@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`) and any global custom styles or overrides.
*   **Usage:** Utility classes are applied directly to elements (e.g., `<div class="bg-blue-500 p-4 rounded">`).

## shadcn/ui

*   **Component Library:** shadcn/ui provides a set of beautifully designed, accessible, and unstyled components built on top of Radix UI primitives and styled with Tailwind CSS.
*   **Not a Traditional Library:** Components are not installed as a package dependency. Instead, you use the shadcn/ui CLI to **copy** the source code for individual components directly into your project (typically into `src/components/ui/`).
*   **Configuration:**
    *   `components.json`: Configures the shadcn/ui CLI, defining paths for components, utilities (`lib/utils.ts`), and Tailwind configuration.
*   **Customization:** Because you own the component code, you can easily customize the structure, styling (via Tailwind classes), and behavior of any shadcn/ui component copied into your project.
*   **Usage:** Import and use components directly from their location within your project (e.g., `import { Button } from '@/components/ui/button';`).

## Key Files

*   `tailwind.config.js`: Core theme and plugin configuration for Tailwind.
*   `src/app/globals.css`: Base Tailwind directives and global styles.
*   `components.json`: Configuration for adding new shadcn/ui components.
*   `src/components/ui/`: Default location for shadcn/ui component source code added via the CLI.
*   `src/lib/utils.ts`: Utility functions used by shadcn/ui components (e.g., `cn` for merging class names).

This combination provides a powerful and flexible system for building consistent and customizable user interfaces. Refer to the respective documentation for Tailwind CSS and shadcn/ui for detailed API and usage guides. 