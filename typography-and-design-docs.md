# Typography and Design Documentation (Phase 0 Findings)

This document captures the findings from Phase 0: Discovery & Documentation of the UX/UI Improvement Plan.

## A. Core Design System Documentation

### 1. Global CSS & Tailwind Architecture (`src/app/globals.css`)

**Analysis Date:** [Insert Date of Analysis]

**File Path:** `src/app/globals.css`

**Overall Structure:**
The `globals.css` file serves as the central hub for global styling, theming, and custom utility/component class definitions. It heavily leverages Tailwind CSS and CSS Custom Properties.

**Key Sections & Features:**

*   **Tailwind CSS Initialization & Usage:**
    *   The file begins with the standard Tailwind CSS directives, importing base styles, component classes, and utility classes:
        ```css
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
        ```
    *   Tailwind's utility classes (e.g., `text-2xl`, `font-[600]`, `mb-4`, `p-4`, `grid`, `gap-4`) are used extensively throughout the file within `@layer base` and `@layer components` directives, primarily via the `@apply` directive to create custom classes or style base HTML elements.

*   **Custom CSS Variables (Theme & Style Configuration):**
    *   CSS custom properties (variables) are heavily used for theming and consistent styling, primarily defined within the `@layer base` block.
    *   **Themes:**
        *   **Light Theme (Default):** Defined under `:root`.
            *   Key Variables: `--background`, `--foreground`, `--card`, `--card-foreground`, `--card-background`, `--card-border`, `--primary` (blue accent: `210 90% 50%`), `--text-primary`, `--text-secondary`, `--text-tertiary`, etc.
        *   **Dark Theme:** Defined under `[data-theme='dark']`.
            *   Key Variables: `--background` (graphite grey: `220 10% 17%`), `--foreground`, `--card`, `--primary` (orange accent: `27 100% 65%`), `--text-primary`, `--text-secondary` (increased contrast), etc.
        *   **Graphite Theme:** Defined under `[data-theme='graphite']`.
            *   Key Variables: `--background` (zinc-900 equivalent: `240 5% 10%`), `--foreground`, `--card`, `--primary` (orange-500: `22 100% 50%`), etc.
    *   **Font Variables:**
        *   `--font-sans: var(--font-inter), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;` (defined in `:root`). This is the primary sans-serif font stack, referencing `--font-inter` (which is expected to be loaded via JavaScript, e.g., in `layout.tsx`).
        *   `--font-heading: var(--font-sans);` (defined in `:root`). Headings inherit the same font stack as `--font-sans` by default.
    *   **Other Layout/UI Variables (defined in `:root`):**
        *   `--radius: 0.5rem;` (for border-radius)
        *   `--header-height: 4rem;`
        *   `--banner-height: 2.5rem;`
    *   **Semantic Color Variables:** Each theme defines a comprehensive set of semantic variables, including:
        *   `--card-foreground`, `--card-background`, `--card-border`, `--card-hover-border`, `--card-hover-background`
        *   `--text-primary`, `--text-secondary`, `--text-tertiary`
        *   `--surface-primary`, `--surface-secondary`, `--surface-tertiary`
        *   `--popover`, `--popover-foreground`
        *   `--primary-foreground`
        *   `--secondary`, `--secondary-foreground`
        *   `--muted`, `--muted-foreground`
        *   `--accent`, `--accent-foreground`
        *   `--destructive`, `--destructive-foreground`
        *   `--border`, `--input`, `--ring`

*   **Global Styles for Base HTML Elements (within `@layer base`):**
    *   `main`: `position: relative; z-index: 1;`
    *   `body > *`: `isolation: isolate;` (for managing stacking contexts).
    *   `html`: `scroll-behavior: smooth;`
    *   `*`: Applies `border-border` (likely a CSS variable for a default border color) using `@apply`.
    *   `body`: Styled with Tailwind utilities via `@apply` for `bg-background`, `text-foreground`, `font-sans`, `text-base`, `antialiased`. Also includes `font-feature-settings: "salt" 1;`.
    *   `h1, h2, h3, h4, h5, h6`: Styled with Tailwind utilities via `@apply` for `font-medium`, `tracking-tight`, `text-foreground`. Also includes `font-feature-settings: "salt" 1;`. Specific responsive text sizes (e.g., `text-2xl sm:text-3xl md:text-4xl`), font weights (e.g., `font-[600]`, `font-[500]`), `leading` properties, and `letter-spacing` are applied using Tailwind utilities.
        *   **Note on Redundancy:** There appears to be a duplicate definition block for `h1-h6` and `p` later in the file, also within `@layer base`. The styles in the second block for headings (e.g., `h1` starts at `text-3xl md:text-4xl`) might override or conflict with the first set (e.g., `h1` starts at `text-2xl sm:text-3xl md:text-4xl`). This should be reviewed for consolidation. The `p` tag definition is also repeated, with the second one setting `text-base` as default, which might be the intended final style.
    *   `p`: Styled with Tailwind utilities via `@apply` for `leading-relaxed`, `mb-4`, and responsive text sizes (initially `text-[15px] sm:text-base`, then potentially overridden by `text-base` in the later definition).
    *   `.prose` (Markdown Content Styling): Extensive custom styling for elements like `table`, `th`, `td`, `ul`, `ol`, `li` using CSS custom properties (e.g., `hsl(var(--border))`, `hsl(var(--muted))`) and Tailwind utilities. This section aims to provide well-formatted display for Markdown-generated content.
    *   `nav`, `nav a`: Base styles for navigation, including a themeable active/hover underline effect using `::after` pseudo-element and `hsl(var(--primary))`.

*   **Custom Utility & Component-like Classes (Defined with `@apply`):**
    *   **General Utilities (mostly in `@layer base`):**
        *   `.shadow-transition`
        *   `.active::after` (navigation active indicator, potentially duplicated by `nav a::after` later)
        *   Container classes: `.container-outer` (`max-w-7xl`), `.container-inner` (`max-w-5xl`)
        *   Responsive Grid system: `.grid-responsive-1` to `.grid-responsive-4`
        *   Section Spacing: `.section-spacing`, `.section-spacing-sm`
        *   Basic Card Styles: `.card` (uses CSS vars like `bg-card`, `border-border`), `.card-hover`
        *   Button Sizing: `.btn`, `.btn-lg`
        *   Form Elements: `.form-input`
        *   Accessibility: `.touch-target`
        *   Navigation Spacing: `.nav-spacing`
        *   List Spacing: `.list-spacing`
        *   Typography Enhancement: `.text-balance` (uses `text-wrap: balance;`)
        *   Mobile-first spacing and layout utilities: `.spacing-mobile`, `.grid-gap-mobile`, `.nav-mobile`, `.form-control-mobile`, `.card-mobile`, `.text-mobile`, `.btn-mobile`, `.container-mobile`
    *   **Specific Component/Section Styling (some in `@layer base`, some in `@layer components`):**
        *   Case Study Page Typography: `.case-study-title`, `.section-title`, `.sidebar-title` (in `@layer base`)
        *   Tag Styling: `.tag-label`, `.tag` (in `@layer base`)
        *   Buttons: `.btn-primary`, `.btn-secondary` (styled like chips/pills with `rounded-full`, in `@layer components`)
        *   Card Title: `.card-title` (in `@layer components`)
        *   Description Text (for cards): `.description-text`, `div[class*="CardDescription"]` (in `@layer components`)
        *   Links: `.subtle-link`, `.nav-link` (in `@layer components`)
        *   Enhanced Navigation Indicators: `.nav-indicator`, `.nav-active` (in `@layer components`)
        *   Content Layout: `.content-section`, `.case-study-list`, `.case-study-item`, `.topic-list`, `.topic-item` (in `@layer components`)
        *   Sidebar: `.case-study-sidebar` (uses `bg-surface-tertiary`, in `@layer components`)

*   **Theme-Specific Component Overrides:**
    *   Notably, there are extensive theme-specific styles for `.card` and related elements (icons, badges, decorative pseudo-elements) when `[data-theme='graphite']` is active. These include hover effects, transforms, and use of theme-specific colors (e.g., orange accents).

**Summary of `globals.css` Structure:**
The file effectively sets up a themable design system using Tailwind CSS and CSS Custom Properties. It defines global styles, typography defaults, and a range of custom utility and component classes. The use of `@layer base` and `@layer components` helps organize Tailwind's style injection.

**Points for Review/Potential Refinement:**
*   **Redundancy in h1-h6 and p styling:** The duplicated definitions for heading elements and paragraphs within `@layer base` should be reviewed and consolidated to avoid confusion and ensure intended styles are applied consistently.
*   **Clarity of `.active::after` vs. `nav a::after`:** The navigation active indicator seems to be defined twice.
*   **Specificity and Overrides:** Given the multiple layers and theme overrides (especially for `.card` in the graphite theme), a clear understanding of CSS specificity will be important when making changes.

This initial analysis of `globals.css` provides a strong foundation for understanding the core CSS architecture.

### 2. Tailwind CSS Configuration (`tailwind.config.js`)

**Analysis Date:** [Insert Date of Analysis]

**File Path:** `tailwind.config.js`

**Key Configurations:**

*   **Dark Mode Strategy:**
    *   `darkMode: ['[data-theme="dark"]']`
    *   This configures Tailwind's dark mode to be activated when a `data-theme="dark"` attribute is present on an HTML element (typically the `<html>` or `<body>` tag). This aligns with the theme definitions in `globals.css`.

*   **Content Paths:**
    *   `content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}']`
    *   These paths tell Tailwind where to scan for class names to generate the necessary CSS. It covers pages, components, and the app directory within `src`.

*   **Theme Extensions (`theme.extend`):**
    *   **Container:**
        *   `center: true` (centers the container by default).
        *   `padding: '1rem'` (default padding for containers).
    *   **Font Family:**
        *   `sans: ['var(--font-sans)']`
        *   `heading: ['var(--font-heading)']`
        *   This maps Tailwind's `font-sans` and `font-heading` utility classes to use the CSS custom properties `--font-sans` and `--font-heading` respectively, which are defined in `globals.css`.
    *   **Colors:**
        *   The `colors` object extensively maps Tailwind color utilities (e.g., `background`, `foreground`, `card`, `primary`, `secondary`, `text-primary`, `zinc`, `orange`) to CSS custom properties defined in `globals.css` (e.g., `hsl(var(--background))`, `hsl(var(--card))`).
        *   This allows Tailwind utilities like `bg-background`, `text-primary`, `border-card-border` to dynamically use the theme colors set by the CSS variables.
        *   It also defines direct color palettes for `zinc` and `orange` (e.g., `zinc: {'300': '#d4d4d8', ...}`).
    *   **Border Radius:**
        *   `lg: 'var(--radius)'`
        *   `md: 'calc(var(--radius) - 2px)'`
        *   `sm: 'calc(var(--radius) - 4px)'`
        *   This maps Tailwind's border radius utilities (`rounded-lg`, `rounded-md`, `rounded-sm`) to the CSS custom property `--radius` (defined as `0.5rem` in `globals.css`) and calculations based on it.

*   **Plugins:**
    *   `plugins: [require('tailwindcss-animate')]`
    *   This plugin is used to add utilities for CSS animations.

**Summary of `tailwind.config.js`:**
The Tailwind configuration is set up to integrate seamlessly with the CSS custom property-based theming system established in `globals.css`. It extends Tailwind's default theme to use these variables for fonts, colors, and border-radius, ensuring that Tailwind utilities respect the active theme. The dark mode strategy is also aligned with the `data-theme` attribute used in `globals.css`.

### 3. Font Loading and Application

**Analysis Date:** [Insert Date of Analysis]

**Key Files:** `src/app/layout.tsx`, `src/app/globals.css`, `tailwind.config.js`

**Process:**

1.  **Font Import and Configuration (`src/app/layout.tsx`):**
    *   The `Inter` font is imported from `next/font/google`.
    *   It is configured with specific options:
        ```typescript
        const inter = Inter({
          subsets: ['latin'],
          display: 'swap',
          variable: '--font-inter', // Exposes the font via a CSS variable
          weight: ['400', '500', '600', '700'], // Loads specific weights
        });
        ```
    *   The `variable: '--font-inter'` option is crucial as it makes the Inter font family available as a CSS custom property named `--font-inter`.
    *   Multiple weights (`400`, `500`, `600`, `700`) are loaded, which can be utilized by `font-weight` utilities or direct CSS.

2.  **Font Variable Application (`src/app/layout.tsx`):**
    *   The `inter.variable` (which contains the class name that defines `--font-inter`) is applied to the `<html>` tag:
        ```html
        <html lang="en" suppressHydrationWarning className={inter.variable}>
        ```
    *   This ensures the `--font-inter` CSS variable is available globally.

3.  **CSS Variable Usage for Sans-Serif and Headings (`src/app/globals.css`):**
    *   Inside the `:root` definition in `globals.css`, the primary font stacks are defined:
        ```css
        --font-sans: var(--font-inter), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        --font-heading: var(--font-sans);
        ```
    *   `--font-sans` uses the `--font-inter` variable as its primary font, followed by a common system font stack as fallbacks.
    *   `--font-heading` is set to inherit from `--font-sans`, meaning headings will also use the Inter font stack by default.

4.  **Application to Body and Headings (`src/app/globals.css`):**
    *   The `body` element is styled with `@apply font-sans;`, which, through Tailwind's configuration, resolves to `font-family: var(--font-sans);`.
    *   Heading elements (`h1`-`h6`) do not explicitly set `font-family` in their global styles in `globals.css` but rely on inheritance from `body` or the `font-heading` utility if used via Tailwind classes. Since `font-heading` is mapped to `var(--font-heading)` in `tailwind.config.js`, and `--font-heading` is `var(--font-sans)`, they effectively use `var(--font-inter)`.

**Summary of Font System:**
*   The primary application font is **Inter**. It is loaded via Next.js font optimization.
*   The Inter font is made globally available through the CSS variable `--font-inter`.
*   This variable is then used to define `--font-sans` (for general text) and subsequently `--font-heading` (for headings) in `globals.css`, both effectively using Inter as the primary font with system fallbacks.
*   Tailwind's `font-sans` and `font-heading` utility classes are configured to use these CSS variables.
*   The `body` element directly applies `font-sans` (i.e., Inter via CSS variables).
*   This setup means that a change to a new primary body font and a new primary heading font could potentially be achieved by:
    1.  Loading the new fonts similarly in `layout.tsx` and exposing them via new CSS variables (e.g., `--font-new-body`, `--font-new-heading`).
    2.  Updating the definitions of `--font-sans` and `--font-heading` in `globals.css` to use these new variables.
    Alternatively, if only one new font is chosen for both, or if the existing structure of `--font-heading: var(--font-sans)` is maintained, fewer variable changes might be needed.

### 4. Reusable Components & Utilities Inventory

**Analysis Date:** [Insert Date of Analysis]

**A. Custom Utility & Component-like Classes (from `globals.css`):**

These classes are defined using `@apply` with Tailwind CSS utilities and often leverage the CSS custom properties defined for theming.

*   **Layout & Structure:**
    *   `.container-outer`: Full-width container with a `max-width` (7xl), horizontal auto margins for centering, and responsive padding.
    *   `.container-inner`: Full-width container with a smaller `max-width` (5xl), for more constrained content areas.
    *   `.grid-responsive-1`, `.grid-responsive-2`, `.grid-responsive-3`, `.grid-responsive-4`: Predefined responsive grid layouts with consistent gap sizing.
    *   `.section-spacing`, `.section-spacing-sm`: Apply vertical padding for consistent section spacing.
    *   `.content-section`: Applies bottom margin for spacing between content blocks.
    *   `.case-study-sidebar`: Styles for the sidebar specific to case studies, including background color (`bg-surface-tertiary`) and border.

*   **Typography Specific:**
    *   `.case-study-title`: Specific styling for titles on case study pages (font size, weight, margin, letter-spacing).
    *   `.section-title`: Styling for general section titles (font size, weight, margin, letter-spacing).
    *   `.sidebar-title`: Styling for titles within sidebars (smaller font size/weight than main section titles).
    *   `.tag-label`: Styling for the label text of tags (font weight).
    *   `.tag`: Styling for tag text (font size, opacity).
    *   `.card-title`: Styling for titles within cards (font size, weight, tracking, letter-spacing). Defined in `@layer components`.
    *   `.description-text`, `div[class*="CardDescription"]`: Styling for description text within cards (font size, line height, color, weight). Defined in `@layer components`.
    *   `.text-balance`: Applies `text-wrap: balance;` for improved text flow, especially for headlines.
    *   `.text-mobile`: Base typography for mobile (font size, line height).

*   **Interactivity & States:**
    *   `.shadow-transition`: Adds a `box-shadow` transition.
    *   `.card-hover`: Defines hover states for cards (border color, shadow). Applied to the basic `.card` class.
    *   `.subtle-link`: Styling for links with a less prominent appearance, with hover effects. Defined in `@layer components`.
    *   `.nav-link`: Styling for navigation links. Defined in `@layer components`.
    *   `.nav-indicator`, `.nav-active`: Styles for enhanced navigation active states (indicator line, text color). Defined in `@layer components`.
    *   `.active::after`: Alternative/older style for navigation active indicator using a pseudo-element. *Note: Review against `.nav-indicator` for consistency.*

*   **Basic Elements & Forms:**
    *   `.card`: Base styling for card elements (border-radius, border, background color `bg-card`, padding). Theme-specific overrides exist, especially for `[data-theme='graphite']`.
    *   `.btn`, `.btn-lg`: General button sizing classes.
    *   `.btn-primary`, `.btn-secondary`: Specific button styling (background, text color, border-radius, padding, font weight, letter-spacing). Defined in `@layer components`.
    *   `.form-input`: Styling for form input fields.

*   **Mobile Specific (beyond typography):**
    *   `.spacing-mobile`, `.spacing-mobile-y`, `.spacing-mobile-x`: Responsive padding utilities for mobile.
    *   `.grid-gap-mobile`: Responsive gap utility for grids on mobile.
    *   `.nav-mobile`: Styling for mobile navigation (fixed positioning).
    *   `.form-control-mobile`: Styling for mobile-friendly form controls (min-height, padding, text size).
    *   `.card-mobile`: Padding for cards on mobile.
    *   `.btn-mobile`: Styling for full-width or appropriately sized buttons on mobile.
    *   `.container-mobile`: Responsive padding for containers on mobile.

*   **List Spacing:**
    *   `.list-spacing > * + *`: Adds margin-top to subsequent children, for spacing items in a list.
    *   `.case-study-list`, `.topic-list`: Specific list spacing using `space-y` utilities.
    *   `.case-study-item`, `.topic-item`: Styles for items within these specific lists.

*   **Accessibility:**
    *   `.touch-target`: Ensures a minimum touch target size for interactive elements.

*   **Markdown (`.prose`) Specific:**
    *   As detailed in the `globals.css` analysis, extensive styling is provided for elements within `.prose` blocks to ensure well-formatted Markdown content (tables, lists, code blocks).

**B. Shadcn UI Components & Integration (e.g., from `src/components/ui/`):**

Based on the project structure and typical Shadcn UI usage:

*   **General Approach:** Shadcn UI components are typically unstyled or minimally styled primitives that are composed using Tailwind CSS utility classes. The visual appearance of these components (e.g., `Button`, `Card`, `Badge`, `Input`, `Dialog`, `Checkbox`, `DropdownMenu`, `Label`, `ScrollArea`, `Slot`, `Tabs`, `Tooltip`, `Toaster`) comes directly from applying Tailwind utilities to them or their constituent parts, often within their respective component files in `src/components/ui/`.

*   **Theming:** These components inherently leverage the existing Tailwind configuration and CSS custom properties defined in `globals.css` and `tailwind.config.js`. This means:
    *   **Colors:** `bg-primary`, `text-destructive`, `border-border`, etc., applied to Shadcn components will use the HSL values from CSS variables.
    *   **Fonts:** Text within Shadcn components will inherit the `--font-sans` (Inter) by default through the global body styles or use `--font-heading` if specific heading utilities are applied.
    *   **Border Radius:** `rounded-lg`, `rounded-md` utilities will use the `--radius` CSS variable.

*   **Examples from `src/app/page.tsx`:**
    *   `<Card>`, `<CardHeader>`, `<CardTitle>`, `<CardDescription>`: Used to structure content. Their appearance (background, text color, padding, border) is controlled by Tailwind classes applied either directly in `page.tsx` or within their definitions in `src/components/ui/card.tsx`, which in turn use global CSS variables and Tailwind theme settings.
    *   `<Badge>`: Used for tags. Its styling (background, text color, border) comes from Tailwind classes, likely using variants defined in `src/components/ui/badge.tsx` that map to CSS variables.
    *   `<Button>`: Used for calls to action. `variant` and `size` props control which Tailwind classes (and thus CSS variables) are applied.

*   **Customization:** While Shadcn components are styled with Tailwind, some may have their own `variants` defined using `class-variance-authority` (CVA) within their component files (e.g., `src/components/ui/button.tsx`). These variants map to sets of Tailwind classes. Global custom classes from `globals.css` (like `.card-title`) might also be applied within these component definitions or on their instances.

**C. Card Component Specific Deep Dive:**

*   **Global `.card` Class (`globals.css`):**
    *   Provides base styling: `rounded-lg border border-border bg-card p-4 sm:p-6`.
    *   This class is a general-purpose card style that can be applied to any `div` or semantic element to give it a card-like appearance using the theme's CSS variables.
    *   It has a `.card-hover` utility class for hover effects.
    *   Significant theme-specific enhancements for `[data-theme='graphite'] .card` exist, adding decorative pseudo-elements, complex hover effects, and backdrop blur.

*   **Shadcn UI `<Card>` Component (`src/components/ui/card.tsx` - Assumed Structure):**
    *   This is likely the primary component used for structured card content (e.g., as seen in `src/app/page.tsx`).
    *   It typically acts as a wrapper and doesn't apply many styles itself directly, but rather expects Tailwind classes to be added to it or its children.
    *   **Sub-components:**
        *   `<CardHeader>`: Container for header content.
        *   `<CardTitle>`: For the main title within the card. It might use the `.card-title` class from `globals.css` or have Tailwind utilities applied directly for font size, weight, etc.
        *   `<CardDescription>`: For descriptive text. It might use the `.description-text` class or `div[class*="CardDescription"]` selectors from `globals.css` or have Tailwind utilities applied directly.
        *   `<CardContent>`: Main content area of the card.
        *   `<CardFooter>`: Footer area of the card.
    *   **Styling Source:** The visual appearance of the Shadcn `<Card>` and its parts is primarily derived from:
        1.  Tailwind utility classes applied directly to these components when used (e.g., `<Card className="bg-card p-6">`).
        2.  Base styles inherited from global element styles (e.g., font from `body`).
        3.  Specific custom classes from `globals.css` that might be applied within the component's definition or on its instance (e.g., `.card-title` applied to the element that renders the card title).
        4.  The underlying HTML element (often a `div`) rendered by the `<Card>` component might have the generic `.card` class applied to it by default from within its own definition if the Shadcn `Card` is designed to pick up that global style, or it might simply be styled with direct Tailwind utilities that achieve a similar effect as the `.card` class (e.g. `rounded-lg border bg-card p-6`).

*   **Relationship & Usage:**
    *   It's possible that the Shadcn `<Card>` component itself, in its default implementation within `src/components/ui/card.tsx`, is styled with Tailwind utilities that mirror or directly apply the styles defined in the global `.card` class. For instance, the root element of the Shadcn Card component might have `className={cn("rounded-lg border bg-card p-6", className)}` or similar, effectively applying the same base as the `.card` class plus any passed-in classes.
    *   The theme-specific styles for `[data-theme='graphite'] .card` would apply to any element with the `.card` class, including instances of the Shadcn `<Card>` if its root element has this class.

**Summary of Component & Card System:**
The project uses a combination of global utility/component classes defined in `globals.css` (built with Tailwind's `@apply`) and Shadcn UI components (built by composing Tailwind utilities). The Shadcn components are designed to integrate with the Tailwind theme and CSS variables. Cards, in particular, have a base global style (`.card`) and are also implemented via the Shadcn `<Card>` component family, which leverages Tailwind and the project's theming for its appearance. The `graphite` theme provides highly custom visual treatments for cards.

## B. Key Page Design & Typography Audit

For each page/section listed below, the audit documents:
    *   Overall layout structure and primary containers used.
    *   Specific card components used (if any) and their styling source.
    *   Heading implementation and effective styles.
    *   Body text styling (where applicable).
    *   Styling of other key elements (links, buttons, badges, etc.).
    *   Note any page-specific CSS or unique styling patterns not covered by global styles.

### 1. Primary Navigation Bar (`src/components/Navigation.tsx`)

**Analysis Date:** [Insert Date of Analysis]

**File Path:** `src/components/Navigation.tsx`

**Overall Layout & Structure:**
*   The navigation is within a `<header>` element, styled to be `sticky top-0 z-40 w-full`.
*   It has a `border-b border-border` for a bottom separation.
*   A scroll effect (`isScrolled`) changes the background: `bg-background/80 backdrop-blur-sm` when scrolled, otherwise `bg-background`.
*   The main navigation content is wrapped in a `<nav>` element with a class `container mx-auto px-4 sm:px-6 lg:px-8`. This is similar to the global `.container-outer` but applied directly, achieving a max-width centered layout with padding.
*   Inside the `<nav>`, a `div` with `flex h-16 items-center` structures the main navigation bar content (logo, links, actions).

**Logo:**
*   A `<Link href="/">` wrapping a `<span>` with `text-xl font-bold` for "openQase".
    *   **Effective Typography:** Inherits `var(--font-heading)` (Inter) due to `font-bold`. `text-xl` (Tailwind: 1.25rem, 20px). Font weight `font-bold` (700).

**Desktop Navigation Links (`hidden md:flex`):**
*   Iterates `navItems` (`Learning Paths`, `Case Studies`, `Blog`).
*   Each link is a Next.js `<Link>`.
*   **Styling:** Uses `cn()` utility for conditional classes.
    *   Base: `nav-link relative py-2 text-base font-medium`.
        *   `.nav-link` (from `globals.css`): `text-base font-medium text-foreground/80 hover:text-foreground transition-colors`.
        *   **Effective Typography:** `text-base` (1rem, 16px), `font-medium` (500 weight). Color `text-muted-foreground` (from `globals.css` via `text-foreground/80`), changing to `text-primary` on hover.
    *   Active State (`pathname === item.href`):
        *   Applies `nav-active text-primary`.
            *   `.nav-active` (from `globals.css`): `text-primary font-medium`.
        *   An additional `<span>` with `absolute inset-x-0 -bottom-[1px] h-0.5 bg-primary` creates an underline effect.
        *   This active state styling seems to take precedence over the `nav a.active::after` and `.active::after` styles defined in `globals.css` for the main navigation links, as it directly applies classes and an element for the underline.

**Desktop Actions (User Auth & Theme Toggle - `hidden md:flex ml-auto`):**
*   `<ThemeToggle />` component (details not in this file).
*   **User Authentication Section:**
    *   If `user` exists:
        *   Uses Shadcn UI `<DropdownMenu>` with `<DropdownMenuTrigger asChild>` wrapping a `<Button variant="ghost" size="icon">` containing a `<User />` icon (`lucide-react`).
        *   `<DropdownMenuItem>` for "Profile" (as `<Link>`) and "Sign Out".
    *   If `!user`:
        *   `<Button variant="ghost" asChild>` for "Sign In" (`<Link href="/auth">`).
        *   `<Button asChild>` for "Get Started" (`<Link href="/auth">`).
    *   **Shadcn Button Styling:** Buttons (`ghost` and default variant) will use styles defined by Shadcn, leveraging Tailwind utilities and CSS variables for colors, padding, font, etc.
        *   Text inside buttons will generally inherit `font-sans` (Inter).

**Mobile Menu Button (`md:hidden ml-auto`):**
*   A `<button>` toggles `isOpen` state.
*   Styled with `.touch-target -mr-2 p-2`.
*   Contains `<X />` or `<Menu />` icons (`lucide-react`) (`h-6 w-6`).

**Mobile Navigation Menu (`isOpen && <div className="border-t md:hidden">`):**
*   Appears when `isOpen` is true.
*   Has a `border-t`.
*   Navigation links:
    *   Iterates `navItems`.
    *   Each link is a Next.js `<Link>`.
    *   Base styling: `block px-3 py-2 text-base font-medium transition-colors`.
    *   Conditional styling via `cn()`:
        *   Active: `bg-primary/10 text-primary`.
        *   Inactive: `text-muted-foreground hover:bg-accent hover:text-accent-foreground`.
    *   **Effective Typography (Mobile Links):** `text-base` (1rem, 16px), `font-medium` (500 weight). Colors are theme-dependent (`text-primary`, `text-muted-foreground`, `bg-accent`, `text-accent-foreground`).
*   **User Authentication Section (Mobile):**
    *   Similar logic and components (Shadcn `<DropdownMenu>` or Sign In/Get Started `<Button>`) as the desktop version, adapted for the mobile menu layout.

**Key Reusable Components Used:**
*   Shadcn UI: `<Button>`, `<DropdownMenu>`, `<DropdownMenuContent>`, `<DropdownMenuItem>`, `<DropdownMenuTrigger>`.
*   Lucide Icons: `<Menu>`, `<X>`, `<User>`.
*   Custom: `<ThemeToggle />`.

**Typography Summary for Navigation:**
*   **Logo:** `text-xl` (20px), `font-bold` (700), Inter.
*   **Desktop Nav Links:** `text-base` (16px), `font-medium` (500), Inter. Color `text-muted-foreground`, `text-primary` on hover/active.
*   **Mobile Nav Links:** `text-base` (16px), `font-medium` (500), Inter. Various theme colors for text and background based on state.
*   **Button Text:** Generally `text-sm` or `text-base` (from Shadcn Button defaults), `font-medium`, Inter.

**Containers & Styling Approach:**
*   Uses a direct Tailwind implementation for the main responsive container (`container mx-auto ...`), not the custom `.container-outer` / `.container-inner` classes from `globals.css` for the immediate `<nav>` element, though the effect is similar.
*   Relies heavily on Tailwind utility classes for layout, spacing, and conditional styling (`cn`).
*   Leverages CSS variables for colors (e.g., `text-primary`, `bg-background`, `border-border`) ensuring theme adaptability.
*   Active link styling is handled directly with Tailwind classes and a span for the underline on desktop, and background/text color changes on mobile.

**Points for Review/Refinement (from `globals.css` context):**
*   The active link styling (`.nav-active` + `span` underline in this component) for desktop navigation seems to be a more direct implementation than relying solely on the `.nav-active .nav-indicator` or `.active::after` styles defined in `globals.css`. This is not necessarily an issue but an observation for consistency. The global CSS styles might be intended for other navigation contexts or as a fallback.

### 2. Footer (`src/components/FooterWrapper.tsx` and `src/components/Footer.tsx`)

**Analysis Date:** [Insert Date of Analysis]

**File Paths:** `src/components/FooterWrapper.tsx`, `src/components/Footer.tsx`

**A. `FooterWrapper.tsx` Functionality:**
*   This component acts as a conditional wrapper for the main `Footer`.
*   It uses the `usePathname` hook to determine if the current route starts with `/admin`.
*   If it's an admin route, the footer is not rendered (`return null`).
*   Otherwise, it renders the `<Footer />` component.
*   This component does not introduce styling itself but controls the visibility of the footer.

**B. `Footer.tsx` - Layout & Structure:**

*   **Outer Container:** The `<footer>` element has `border-t border-border bg-background`.
*   **Main Content Wrapper:** A `div` with `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12`. This applies a max-width, centers the content, and adds responsive padding. This is similar to the global `.container-outer` class effect.
*   **Grid Layout for Sections:** The main footer content (About Us, Resources, Connect, Legal) is within a `div` with `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8`.
    *   On mobile, sections stack (`grid-cols-1`).
    *   Medium screens: 2 columns (`md:grid-cols-2`).
    *   Large screens: 4 columns (`lg:grid-cols-4`).
*   **`FooterSection` Component (Internal to `Footer.tsx`):**
    *   Each column (About Us, etc.) is rendered using this internal component.
    *   It has a `div` with `border-b md:border-none border-border last:border-0` (for mobile dividers).
    *   The `title` (e.g., "About Us") is a `<button>` for mobile to allow collapsing, styled with `flex w-full items-center justify-between py-4 md:py-0 md:cursor-default`.
        *   Title text (`<h4>`): `text-sm font-semibold uppercase`.
            *   **Effective Typography (Section Title):** `text-sm` (0.875rem, 14px), `font-semibold` (600 weight), Inter. Uppercase transform.
        *   A `<ChevronDown />` icon is shown on mobile and rotates based on `isOpen` state.
    *   The content of each section (`<ul>`) is wrapped in a `div` that has conditional `max-h` and `pb` for collapse/expand animation on mobile (`overflow-hidden transition-all duration-200 ease-in-out`).
*   **Footer Links (`<ul>` within `FooterSection`):**
    *   Each link is a Next.js `<Link>`.
    *   Styled with `text-muted-foreground hover:text-accent transition-colors`.
        *   **Effective Typography (Footer Links):** Inherits body `text-base` by default, but visual appearance is dominated by color. Color `text-muted-foreground` (CSS variable), changing to `text-accent` (CSS variable) on hover.
    *   Connect section links additionally use `inline-flex items-center gap-2` and include Lucide icons (`Github`, `Twitter`, `Linkedin`, `MessageCircle`) styled with `h-4 w-4`.
*   **Bottom Section (Copyright & Credits):**
    *   A `div` with `mt-8 md:mt-12 pt-4 md:pt-8 border-t border-border` separates this from the main links.
    *   Uses `flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left`.
    *   Text paragraphs (`<p>`) are styled with `text-muted-foreground text-sm`.
        *   **Effective Typography (Bottom Text):** `text-sm` (0.875rem, 14px), color `text-muted-foreground`, Inter.

**Key Reusable Components Used:**
*   Lucide Icons: `Github`, `Twitter`, `Linkedin`, `MessageCircle`, `ChevronDown`.
*   Standard HTML and Next.js `<Link>`.

**Typography Summary for Footer:**
*   **Section Titles:** `text-sm` (14px), `font-semibold` (600), Inter, uppercase.
*   **Links:** Implicitly `text-base` (16px) but effectively sized by context, `font-normal` (default weight 400), Inter. Color `text-muted-foreground` (themeable), `text-accent` on hover.
*   **Bottom Text (Copyright, etc.):** `text-sm` (14px), `font-normal` (default weight 400), Inter. Color `text-muted-foreground`.

**Containers & Styling Approach:**
*   Uses direct Tailwind classes for the main responsive container (`max-w-7xl mx-auto ...`), similar to the navigation bar.
*   Relies heavily on Tailwind utility classes for layout (grid, flexbox), spacing, and conditional styling (`cn`).
*   Leverages CSS variables for colors (`bg-background`, `border-border`, `text-muted-foreground`, `text-accent`) ensuring theme adaptability.
*   The `FooterSection` component introduces local state for mobile accordion behavior, with styling to support collapse/expand animations.

**Overall:**
The footer is well-structured with responsive considerations. Typography is generally smaller and uses muted colors, appropriate for a footer. The mobile accordion for sections is a good UX touch for smaller screens.

### 3. Landing Page (`src/app/page.tsx`)

**Analysis Date:** [Insert Date of Analysis]

**File Path:** `src/app/page.tsx`

**Overall Structure:**
*   The page is a client component (`'use client';`).
*   It's composed of several `<section>` elements, each representing a distinct part of the landing page (Hero, Learning Paths, Why Choose OpenQASE, Featured Case Studies).
*   Uses Shadcn UI components (`Card`, `Badge`, `Button`) and Lucide icons extensively.

**A. Hero Section:**
*   **Layout & Container:**
    *   A `<section>` with `flex min-h-screen items-center justify-center bg-background text-center px-4`.
        *   Full viewport height, flex-centered content, uses theme background, centered text, and horizontal padding.
    *   Inner `div` with `max-w-4xl mx-auto space-y-8` for content constraint and vertical spacing.
*   **Headings:**
    *   `<h1>` with `text-4xl md:text-6xl font-bold tracking-tight`.
        *   **Effective Typography (H1):** Inter (via `--font-heading` -> `--font-sans`). Responsive size (2.25rem to 3.75rem). `font-bold` (700). `tracking-tight`.
    *   A `<span>` within `<h1>` with `text-primary block mt-2` for the "Quantum Computing" part, making it use the primary theme color and display on a new line.
*   **Paragraph/Subtitle:**
    *   `<p>` with `text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto`.
        *   **Effective Typography (Subtitle):** Inter. Responsive size (1.25rem to 1.5rem). Color `text-muted-foreground` (CSS variable).
*   **Buttons (CTAs):**
    *   A `div` with `flex flex-col sm:flex-row gap-4 justify-center mt-8`.
    *   Two Shadcn UI `<Button asChild size="lg" className="text-lg px-8">` components wrapping Next.js `<Link>` elements.
        *   One default variant, one `variant="secondary"`.
        *   **Effective Typography (Button Text):** `text-lg` (1.125rem). Font weight likely `font-medium` (Shadcn default for buttons). Inter.

**B. Learning Paths Section:**
*   **Layout & Container:**
    *   A `<section>` with `py-24 px-4` (vertical and horizontal padding).
    *   Inner `div` with `container max-w-7xl mx-auto`. This uses the direct Tailwind `container` utility, not the custom `.container-outer` class, but achieves a similar centered max-width effect.
*   **Section Header:**
    *   A `div` with `text-center mb-16`.
    *   `<h2>` with `text-3xl font-bold tracking-tight`.
        *   **Effective Typography (H2):** Inter. `text-3xl` (1.875rem). `font-bold` (700). `tracking-tight`.
    *   `<p>` with `text-xl text-muted-foreground mt-4`.
        *   **Effective Typography (Section Subtitle):** Inter. `text-xl` (1.25rem). Color `text-muted-foreground`.
*   **Cards (Content):**
    *   A `div` with `grid gap-8 md:grid-cols-3`.
    *   Three Shadcn UI `<Card>` components, each styled with `relative flex flex-col bg-card hover:shadow-lg transition-all duration-200 hover:-translate-y-1`.
        *   Uses `bg-card` (CSS variable).
        *   Hover effects: `shadow-lg`, `translate-y-1`.
    *   **Card Structure (Example - Persona Path Card):**
        *   `<CardHeader>`:
            *   Icon wrapper: `div` with `mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10`.
                *   Lucide `<User />` icon: `h-6 w-6 text-primary`.
            *   `<CardTitle>`: Text content "Persona Path".
                *   **Effective Typography (CardTitle):** Likely `text-xl font-[500] tracking-tight` (from `.card-title` class in `globals.css` if applied by Shadcn CardTitle, or similar direct Tailwind utilities). Inter.
            *   `<CardDescription className="mb-4">`: Text content.
                *   **Effective Typography (CardDescription):** Likely `text-base leading-relaxed text-text-secondary font-normal` (from `.description-text` / `div[class*="CardDescription"]` in `globals.css` or similar direct Tailwind). Inter.
        *   Button wrapper: `div` with `mt-auto p-6 pt-0`.
        *   Shadcn UI `<Button asChild className="w-full">` wrapping a Next.js `<Link>`.

**C. Why Choose OpenQASE Section:**
*   **Layout & Container:**
    *   A `<section>` with `py-24`.
    *   Inner `div` with `container max-w-7xl`.
*   **Section Header:**
    *   A `div` with `text-center mb-16`.
    *   `<h2>` with `text-4xl font-bold mb-4`.
        *   **Effective Typography (H2):** Inter. `text-4xl` (2.25rem). `font-bold` (700).
    *   `<p>` with `text-muted-foreground text-lg`.
        *   **Effective Typography (Section Subtitle):** Inter. `text-lg` (1.125rem). Color `text-muted-foreground`.
*   **Feature Blocks (Content):**
    *   A `div` with `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`.
    *   Maps over `features` array, rendering a `div` for each feature, styled with `bg-card rounded-lg p-6 shadow-sm`.
        *   These are not using the Shadcn `<Card>` component but are styled directly to look like cards/info blocks using `bg-card` (CSS variable) and padding/shadow.
    *   **Feature Block Structure:**
        *   Icon: `div` with `text-primary mb-4` containing a Lucide icon (e.g., `<Brain />`).
        *   `<h3>` with `text-xl font-semibold mb-2` for feature title.
            *   **Effective Typography (H3):** Inter. `text-xl` (1.25rem). `font-semibold` (600).
        *   `<p>` with `text-muted-foreground` for feature description.
            *   **Effective Typography (Feature Description):** Inter. `text-base` (default). Color `text-muted-foreground`.

**D. Featured Case Studies Section:**
*   **Layout & Container:**
    *   A `<section>` with `py-24 px-4 bg-muted/50` (uses a muted background variant).
    *   Inner `div` with `container max-w-7xl mx-auto`.
*   **Section Header:**
    *   A `div` with `flex justify-between items-center mb-16`.
    *   `<h2>` with `text-3xl font-bold tracking-tight`.
        *   **Effective Typography (H2):** Inter. `text-3xl` (1.875rem). `font-bold` (700).
    *   `<p>` with `text-xl text-muted-foreground mt-4`.
        *   **Effective Typography (Section Subtitle):** Inter. `text-xl` (1.25rem). Color `text-muted-foreground`.
    *   A "View All Case Studies" `<Button variant="ghost" asChild>` with a Next.js `<Link>` and an `<ArrowRight />` icon.
*   **Cards (Content):**
    *   A `div` with `grid gap-8 md:grid-cols-3`.
    *   Three Shadcn UI `<Card>` components, each styled with `group flex flex-col overflow-hidden bg-card hover:shadow-lg transition-all duration-200 hover:-translate-y-1`.
    *   **Card Structure (Example):**
        *   Image/Placeholder Area: `div` with `aspect-[2/1] bg-primary/5 relative` containing decorative gradient `div`s with hover effects (`group-hover:opacity-75`).
        *   `<CardHeader>`:
            *   Badges: `div` with `flex gap-2 mb-4` containing Shadcn UI `<Badge variant="outline" className="bg-card/75 backdrop-blur-sm">`.
            *   `<CardTitle className="line-clamp-2">`: Text content.
            *   `<CardDescription className="line-clamp-3">`: Text content.
        *   Typography for `<CardTitle>` and `<CardDescription>` is consistent with previous card examples.

**Key Reusable Components Used:**
*   Shadcn UI: `<Card>`, `<CardHeader>`, `<CardTitle>`, `<CardDescription>`, `<Badge>`, `<Button>`.
*   Lucide Icons: `<Brain>`, `<FileText>`, `<Users>`, `<Building2>`, `<CircuitBoard>`, `<ArrowRight>`.

**Typography Summary for Landing Page (Varied by Section):**
*   **H1 (Hero):** Responsive `text-4xl` to `text-6xl`, `font-bold`, Inter.
*   **H2 (Section Titles):** Typically `text-3xl` or `text-4xl`, `font-bold`, Inter.
*   **H3 (Feature Titles):** `text-xl`, `font-semibold`, Inter.
*   **Card Titles (Shadcn):** Likely `text-xl`, `font-[500]` (medium), Inter.
*   **Paragraphs/Subtitles:** Vary from `text-lg` to `text-2xl`, typically `font-normal` (400), Inter. Colors `text-muted-foreground` or default.
*   **Card Descriptions (Shadcn):** Likely `text-base`, `font-normal`, Inter. Color `text-text-secondary`.
*   **Button Text:** `text-lg` for hero CTAs, others likely `text-sm` or `text-base` (Shadcn defaults), `font-medium`, Inter.

**Containers & Styling Approach:**
*   Uses direct Tailwind classes for main section containers (`container max-w-7xl mx-auto`), not the custom `.container-outer` / `.container-inner` from `globals.css`, though the effect is similar for `max-w-7xl`.
*   Heavy reliance on Tailwind utility classes for layout (flex, grid), spacing, responsive design, and styling.
*   Shadcn UI components are central to displaying the learning path categories and the CTA card.
*   The "Why Choose OpenQASE" section uses divs styled like cards (`bg-card`, `rounded-lg`, `shadow-sm`) rather than the formal Shadcn `<Card>` component, demonstrating direct Tailwind styling for card-like appearances.
*   CSS variables are used implicitly through Tailwind utilities for colors (`bg-background`, `text-primary`, `bg-card`, `text-muted-foreground`) and other themeable properties.

**Overall:**
The landing page is a rich composition of different sections, each with clear typographic hierarchy and component usage. It effectively combines direct Tailwind styling with Shadcn UI components. Card usage is prominent and primarily relies on the Shadcn `<Card>` family, though simpler card-like blocks are also custom-styled with Tailwind.

### 4. Learning Paths - Main Listing Page (`src/app/paths/page.tsx`)

**Analysis Date:** [Insert Date of Analysis]

**File Path:** `src/app/paths/page.tsx`

**Overall Structure:**
*   The page is an `async` server component.
*   It fetches content counts (`personas`, `industries`, `algorithms`) using a Supabase client.
*   The main content is wrapped in an `<AuthGate>` component, which likely handles authentication checks and might display a message if the user is not authorized. The `title` and `description` props to `<AuthGate>` suggest it might render a header or placeholder for unauthorized users.
*   The primary layout within the `AuthGate` is a `<main>` tag with `min-h-screen`.

**A. Main Content Layout & Container:**
*   A `div` with `container-outer section-spacing` is used as the primary content wrapper.
    *   `.container-outer`: Custom class from `globals.css` (max-width 7xl, centered, responsive padding).
    *   `.section-spacing`: Custom class from `globals.css` for consistent vertical padding.

**B. Page Header Section:**
*   A `div` with `max-w-2xl mx-auto text-center mb-12 md:mb-16` for centering and constraining the header text.
*   `<h1>` with `text-2xl sm:text-3xl md:text-4xl font-bold mb-4`.
    *   **Effective Typography (H1):** Inter. Responsive size (1.5rem to 2.25rem). `font-bold` (700).
*   `<p>` with `text-base sm:text-lg text-muted-foreground`.
    *   **Effective Typography (Subtitle):** Inter. Responsive size (1rem to 1.125rem). Color `text-muted-foreground`.

**C. Learning Path Category Cards:**
*   A `div` with `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 md:mb-16`.
*   Maps over a `paths` array (Persona, Industry, Algorithm) to render each category as a clickable card.
*   Each card is a Next.js `<Link>` wrapping a Shadcn UI `<Card>` component.
*   **Link Styling:** `className="group"` is applied to the `<Link>` for potential group-hover states on the card.
*   **Card Styling (`<Card>`):**
    *   `className={cn("h-full transition-all duration-200", "hover:shadow-sm hover:border-border-hover hover:bg-accent/5")}`.
        *   `h-full` makes cards in a row equal height.
        *   Hover effects: `shadow-sm`, `border-border-hover` (CSS var), `bg-accent/5` (CSS var).
*   **Card Structure (`<CardHeader>`):**
    *   `className="h-full flex flex-col"` ensures the header fills the card and allows flex column layout for its children.
    *   **Icon & Count Row:** `div` with `flex items-center justify-between mb-4`.
        *   Icon Wrapper: `div` with `p-2 rounded-lg bg-primary/10`.
            *   Dynamic `<path.Icon />` (Users, Building2, Atom from Lucide) styled with `h-6 w-6 text-primary`.
        *   Shadcn UI `<Badge variant="secondary" className="text-xs">` displaying `{path.count} Paths`.
            *   **Effective Typography (Count Badge):** `text-xs` (0.75rem, 12px). Font weight from Shadcn Badge secondary variant. Inter.
    *   **Title & Description Block:** `div` with `flex-grow` (to push examples/badges to the bottom).
        *   `<CardTitle className="text-lg sm:text-xl mb-2">`.
            *   **Effective Typography (CardTitle):** Inter. Responsive size (1.125rem to 1.25rem). Font weight likely `font-[500]` (from `.card-title` or Shadcn default).
        *   `<CardDescription className="mb-4">`.
            *   **Effective Typography (CardDescription):** Inter. Likely `text-base` (1rem), `font-normal` (400), color `text-text-secondary` (from `.description-text` or Shadcn default).
    *   **Examples Badges Block:** `div` with `flex flex-wrap gap-2 mt-auto pt-2` (pushes to bottom of card content).
        *   Maps `path.examples` to render Shadcn UI `<Badge variant="outline" className="text-xs">`.
            *   **Effective Typography (Example Badge):** `text-xs` (0.75rem, 12px). Font weight from Shadcn Badge outline variant. Inter.

**D. "Not Sure Where to Start?" Card Section:**
*   A `div` with `max-w-3xl mx-auto` for centering and constraining this call-to-action card.
*   Shadcn UI `<Card className="bg-card/50">` (slightly transparent card background).
*   **Card Structure (`<CardHeader>`):**
    *   `div` with `text-center`.
    *   `<h2>` with `text-xl sm:text-2xl font-semibold mb-4`.
        *   **Effective Typography (H2):** Inter. Responsive size (1.25rem to 1.5rem). `font-semibold` (600).
    *   `<p>` with `text-muted-foreground mb-6`.
        *   **Effective Typography (Paragraph):** Inter. `text-base` (default). Color `text-muted-foreground`.
    *   Shadcn UI `<Button asChild size="lg">` wrapping a Next.js `<Link href="/paths/persona">`.
        *   **Effective Typography (Button Text):** `size="lg"` (Shadcn prop), likely `text-base` or `text-lg`. Font weight `font-medium` (Shadcn default). Inter.

**Key Reusable Components Used:**
*   Custom: `<AuthGate>`.
*   Shadcn UI: `<Card>`, `<CardHeader>`, `<CardTitle>`, `<CardDescription>`, `<Badge>`, `<Button>`.
*   Lucide Icons: `<Users>`, `<Building2>`, `<Atom>`.
*   Custom global CSS classes: `.container-outer`, `.section-spacing`.

**Typography Summary for Learning Paths Page:**
*   **H1 (Page Title):** Responsive `text-2xl` to `text-4xl`, `font-bold`, Inter.
*   **H2 (CTA Card Title):** Responsive `text-xl` to `text-2xl`, `font-semibold`, Inter.
*   **Card Titles:** Responsive `text-lg` to `text-xl`, `font-[500]` (medium), Inter.
*   **Paragraphs/Subtitles:** Responsive `text-base` to `text-lg`, `font-normal`, Inter. Color `text-muted-foreground`.
*   **Card Descriptions:** `text-base`, `font-normal`, Inter. Color `text-text-secondary`.
*   **Badges (Count & Examples):** `text-xs`, font weight varies by variant, Inter.
*   **Button Text (CTA Card):** Likely `text-base` or `text-lg` (Shadcn `size="lg"`), `font-medium`, Inter.

**Containers & Styling Approach:**
*   Uses the custom global class `.container-outer` for the main page container, ensuring consistency with other pages that might use it.
*   Uses the custom global class `.section-spacing` for vertical padding.
*   Relies heavily on Tailwind utility classes for layout (grid, flexbox), spacing, and responsive design.
*   Shadcn UI components are central to displaying the learning path categories and the CTA card.
*   Styling for cards includes hover effects (`shadow-sm`, `border-border-hover`, `bg-accent/5`) directly applied via Tailwind utilities using `cn()`.
*   CSS variables are used implicitly through Tailwind utilities for colors and other themeable properties.

**Overall:**
The Learning Paths main listing page uses a clear, card-based layout to present the different path categories. Typography is consistent with a typical page structure (H1, supporting paragraphs, card titles, descriptions). The use of `<AuthGate>` suggests that access to this page might be controlled. Shadcn UI components are well-integrated for UI elements.

### 5. Algorithms - Main Listing Page (`src/app/paths/algorithm/page.tsx`)

**Analysis Date:** [Insert Date of Analysis]

**File Path:** `src/app/paths/algorithm/page.tsx`

**Overall Structure:**
*   The page is an `async` server component.
*   It fetches a list of published algorithms from Supabase using `createServerSupabaseClient`.
*   The entire page content is wrapped within a `<LearningPathLayout>` component, which likely provides a consistent page structure (e.g., title, breadcrumbs, container) for all learning path related pages.
*   It then renders an `<AlgorithmList>` component, passing the fetched algorithms to it.

**A. `<LearningPathLayout>` Component Usage:**
*   **Props Passed:**
    *   `title="Quantum Algorithms"`: This sets the main title displayed by the layout component.
*   **Assumed Structure & Styling (based on typical layout components and previous observations):**
    *   The `<LearningPathLayout>` likely renders an `<h1>` or similar heading element for the `title`.
        *   **Expected Typography (Page Title):** Based on its usage as a main page title, it might use styles similar to other H1s on the site (e.g., responsive `text-2xl` to `text-4xl`, `font-bold`, Inter) or have its own specific styling defined within the layout component itself.
    *   It probably includes a primary content area where its `children` (in this case, `<AlgorithmList />`) are rendered. This area might be wrapped in a container like `.container-outer` or a direct Tailwind `container mx-auto`.

**B. `<AlgorithmList>` Component Usage:**
*   **Props Passed:**
    *   `algorithms={algorithms}`: The array of algorithm data fetched from Supabase.
*   **Functionality & Content (Assumed - as the code for `AlgorithmList` is not provided here):**
    *   This component is responsible for rendering the list of algorithms.
    *   It likely maps over the `algorithms` array.
    *   Each algorithm is probably displayed using a card-like structure, potentially using Shadcn UI `<Card>` components or custom-styled divs.
    *   Each item in the list would typically be a link to the individual algorithm page (e.g., `/paths/algorithm/[slug]`).
*   **Expected Card/Item Styling (Hypothetical - common patterns):**
    *   **Card:** Shadcn UI `<Card>` or a `div` with `bg-card`, `border`, `rounded-lg`, `p-4` or `p-6`.
    *   **Title:** `<CardTitle>` or an `<h3>`/`<h4>` with styles like `text-lg` or `text-xl`, `font-semibold` or `font-medium`.
    *   **Description:** `<CardDescription>` or a `<p>` with `text-sm` or `text-base`, `text-muted-foreground` or `text-text-secondary`.
    *   **Badges/Tags:** Potentially Shadcn UI `<Badge>` for algorithm types or complexity if that data is available.
    *   **Links:** The entire card or a specific "View Details" button/link would navigate to the individual algorithm page.

**Key Reusable Components Used (In this file and likely by children):**
*   Custom: `<LearningPathLayout>`, `<AlgorithmList>`.
*   Shadcn UI (expected within `<AlgorithmList>`): `<Card>`, `<CardHeader>`, `<CardTitle>`, `<CardDescription>`, `<Button>`, `<Badge>`.
*   Next.js: `<Link>` (expected within `<AlgorithmList>`).

**Typography Summary for Algorithms Listing Page (Highly dependent on `<LearningPathLayout>` and `<AlgorithmList>` internals):**
*   **Page Title (from `<LearningPathLayout>`):** Expected to be a prominent heading (e.g., H1 or H2 equivalent), Inter, bold.
*   **Algorithm Item Titles (within `<AlgorithmList>`):** Likely `text-lg` or `text-xl`, `font-medium` or `font-semibold`, Inter.
*   **Algorithm Item Descriptions/Excerpts:** Likely `text-sm` or `text-base`, `font-normal`, Inter, muted color.

**Containers & Styling Approach:**
*   The primary container and page structure are provided by `<LearningPathLayout>`.
*   The actual list rendering and styling for individual algorithm items are encapsulated within the `<AlgorithmList>` component.
*   The page itself is quite minimal, delegating most of the presentation to these two child components.
*   The overall styling will heavily rely on the Tailwind utilities and CSS variables defined globally, as applied within `<LearningPathLayout>` and `<AlgorithmList>`.

**Overall:**
This page serves as a clean entry point for listing algorithms. Its visual appearance and detailed typography will largely be determined by the implementations of the `<LearningPathLayout>` and `<AlgorithmList>` components. The structure suggests a consistent layout for learning path sections and a component-based approach to rendering lists of content.

### 6. Industries - Main Listing Page (`src/app/paths/industry/page.tsx`)

**Analysis Date:** [Insert Date of Analysis]

**File Path:** `src/app/paths/industry/page.tsx`

**Overall Structure:**
*   The page is an `async` server component.
*   It fetches a list of published industries from Supabase using `createServerSupabaseClient`.
*   The entire page content is wrapped within a `<LearningPathLayout>` component.
*   It renders an `<IndustryList>` component, passing the fetched industries to it.
*   This structure is identical to the `Algorithms - Main Listing Page` in terms of high-level architecture.

**A. `<LearningPathLayout>` Component Usage:**
*   **Props Passed:**
    *   `title="Quantum Industries"`: Sets the main title for the page via the layout.
*   **Assumed Structure & Styling:**
    *   As with the Algorithms page, `<LearningPathLayout>` is expected to provide the main page title (likely an `<h1>` or equivalent) and a structured content area for its children.
    *   **Expected Typography (Page Title):** Prominent heading style (e.g., responsive `text-2xl` to `text-4xl`, `font-bold`, Inter).

**B. `<IndustryList>` Component Usage:**
*   **Props Passed:**
    *   `industries={industries}`: The array of industry data.
*   **Functionality & Content (Assumed):**
    *   Responsible for rendering the list of industries.
    *   Likely maps over the `industries` array, displaying each as a card or list item linking to the individual industry page (e.g., `/paths/industry/[slug]`).
*   **Expected Card/Item Styling (Hypothetical - common patterns):**
    *   Similar to the `<AlgorithmList>`, it would likely use Shadcn UI `<Card>` components or similarly styled divs.
    *   Elements within each item would include a title (industry name), possibly a short description, and perhaps related icons or badges if applicable.

**Key Reusable Components Used (In this file and likely by children):**
*   Custom: `<LearningPathLayout>`, `<IndustryList>`.
*   Shadcn UI (expected within `<IndustryList>`): `<Card>`, `<CardHeader>`, `<CardTitle>`, `<CardDescription>`, etc.
*   Next.js: `<Link>` (expected within `<IndustryList>`).

**Typography Summary for Industries Listing Page (Dependent on child components):**
*   **Page Title (from `<LearningPathLayout>`):** Prominent heading, Inter, bold.
*   **Industry Item Titles (within `<IndustryList>`):** Likely `text-lg` or `text-xl`, `font-medium` or `font-semibold`, Inter.
*   **Industry Item Descriptions/Excerpts:** Likely `text-sm` or `text-base`, `font-normal`, Inter, muted color.

**Containers & Styling Approach:**
*   Container and overall page structure managed by `<LearningPathLayout>`.
*   List rendering and item styling encapsulated in `<IndustryList>`.
*   Styling will be driven by global Tailwind utilities, CSS variables, and styles defined within the child components.

**Overall:**
This page follows the same pattern as the Algorithms listing page, acting as a simple data-fetching and layout-delegating component. The user experience and specific styling will be defined by `<LearningPathLayout>` and `<IndustryList>`. The consistency in structure across these listing pages is a good sign for maintainability.

### 7. Personas - Main Listing Page (`src/app/paths/persona/page.tsx`)

**Analysis Date:** [Insert Date of Analysis]

**File Path:** `src/app/paths/persona/page.tsx`

**Overall Structure:**
*   The page is an `async` server component.
*   It fetches a list of published personas from Supabase using `createServerSupabaseClient`.
*   The entire page content is wrapped within a `<LearningPathLayout>` component.
*   It renders a `<PersonaList>` component, passing the fetched personas to it.
*   This structure is identical to the Algorithm and Industry main listing pages.

**A. `<LearningPathLayout>` Component Usage:**
*   **Props Passed:**
    *   `title="Quantum Personas"`: Sets the main title for the page via the layout.
*   **Assumed Structure & Styling:**
    *   Consistent with previous usage, `<LearningPathLayout>` is expected to provide the main page title (likely an `<h1>` or equivalent) and a structured content area.
    *   **Expected Typography (Page Title):** Prominent heading style (e.g., responsive `text-2xl` to `text-4xl`, `font-bold`, Inter).

**B. `<PersonaList>` Component Usage:**
*   **Props Passed:**
    *   `personas={personas}`: The array of persona data.
*   **Functionality & Content (Assumed):**
    *   Responsible for rendering the list of personas.
    *   Likely maps over the `personas` array, displaying each as a card or list item linking to the individual persona page (e.g., `/paths/persona/[slug]`).
*   **Expected Card/Item Styling (Hypothetical - common patterns):**
    *   Likely uses Shadcn UI `<Card>` components or similarly styled divs, consistent with other list displays on the site.
    *   Elements within each item would include the persona name (title), possibly a short description or role summary, and perhaps relevant icons or tags.

**Key Reusable Components Used (In this file and likely by children):**
*   Custom: `<LearningPathLayout>`, `<PersonaList>`.
*   Shadcn UI (expected within `<PersonaList>`): `<Card>`, `<CardHeader>`, `<CardTitle>`, `<CardDescription>`, etc.
*   Next.js: `<Link>` (expected within `<PersonaList>`).

**Typography Summary for Personas Listing Page (Dependent on child components):**
*   **Page Title (from `<LearningPathLayout>`):** Prominent heading, Inter, bold.
*   **Persona Item Titles (within `<PersonaList>`):** Likely `text-lg` or `text-xl`, `font-medium` or `font-semibold`, Inter.
*   **Persona Item Descriptions/Excerpts:** Likely `text-sm` or `text-base`, `font-normal`, Inter, muted color.

**Containers & Styling Approach:**
*   Container and overall page structure managed by `<LearningPathLayout>`.
*   List rendering and item styling encapsulated in `<PersonaList>`.
*   Styling will be driven by global Tailwind utilities, CSS variables, and styles defined within the child components.

**Overall:**
This page maintains the consistent architectural pattern seen in the Algorithm and Industry listing pages. It serves as a straightforward entry point for browsing personas, with the detailed presentation handled by the `<LearningPathLayout>` and `<PersonaList>` components. This modularity is beneficial for consistent UX across similar page types.

### 8. Algorithms - Individual Algorithm Page (`src/app/paths/algorithm/[slug]/page.tsx`)

**Analysis Date:** [Insert Date of Analysis]

**File Path:** `src/app/paths/algorithm/[slug]/page.tsx`

**Overall Structure:**
*   The page is an `async` server component that fetches data for a specific algorithm based on its `slug`.
*   It uses `createServerSupabaseClient` for data fetching.
*   Content is wrapped in an `<AuthGate>` component, suggesting controlled access.
*   The main presentation is handled by the `<LearningPathLayout>` component.
*   Includes Markdown rendering (`markdown-it`) with custom preprocessing (`preprocessMarkdown` for lists, `enhanceTypography` for adding Tailwind-like classes to HTML elements) and table/cell rendering customizations.
*   Custom components `<StepsRenderer>` and `<ReferencesRenderer>` are used.

**A. `<AuthGate>` Component Usage:**
*   Props: `title="Access Algorithm Details"`, `description="Get exclusive access to detailed quantum algorithm explanations and implementations."`
*   Likely provides a message or UI for users who are not authorized to view the content.

**B. `<LearningPathLayout>` Component Usage:**
*   **Props Passed:**
    *   `title={algorithm.name}`: The algorithm's name is used as the page title.
    *   `backLinkText="Back to Algorithms"`
    *   `backLinkHref="/paths/algorithm"`
*   **Assumed Structure & Styling:** Provides the main page title (likely H1), a back link, and a content area for its children. Typography for the title is expected to be prominent.

**C. Main Content Layout (within `<LearningPathLayout>`):**
*   A `div` with `grid grid-cols-1 gap-12 lg:grid-cols-12` creates a two-column layout on large screens.
    *   **Left Column (Main Content - `lg:col-span-9`):**
        *   An `<article>` with `max-w-none text-[var(--text-secondary)]`.
        *   **Algorithm Description:** `<p className="text-lg text-[var(--text-primary)] mb-8 leading-7">{algorithm.description}</p>`
            *   **Effective Typography:** Inter. `text-lg` (1.125rem). Color `text-[var(--text-primary)]` (CSS var). `leading-7`.
        *   **Use Cases Badges:** `div` with `flex flex-wrap gap-2 mb-8`.
            *   Shadcn UI `<Badge variant="outline" className="bg-[var(--surface-secondary)] border-[var(--border)] text-[var(--text-secondary)]">` for each use case.
                *   **Effective Typography (Badge):** `text-sm` (Shadcn default). Colors from CSS variables.
        *   **Main Content (Rendered Markdown):** `div` with `dangerouslySetInnerHTML={{ __html: processedContent }}`.
            *   The `processedContent` has Tailwind-like classes injected by the `enhanceTypography` function for `<h1>` to `<h4>`, `<p>`, `<ul>`, `<ol>`, `<li>`, `<blockquote>`, `<pre>`, and `<code>`.
            *   Additional classes `prose-headings:text-[var(--text-primary)] prose-p:text-[var(--text-secondary)] ... prose-a:text-[var(--primary)] ...` are applied to the container, suggesting an attempt to further style the .prose output or elements within it using CSS variables.
            *   **Effective Typography (Markdown):** Will vary based on the HTML element and the classes injected by `enhanceTypography` and the `prose-...` classes. Headings will be `text-4xl` down to `text-xl`, `font-bold` or `font-semibold`. Paragraphs `leading-7`. Links `text-[var(--primary)] font-medium`.
        *   **Implementation Steps (`algorithm.steps`):**
            *   `<h2>` with `mt-10 scroll-m-20 border-b border-[var(--border)] pb-2 text-3xl font-semibold tracking-tight text-[var(--text-primary)]`.
                *   **Effective Typography (H2):** Inter. `text-3xl` (1.875rem). `font-semibold` (600). Color `text-[var(--text-primary)]`.
            *   `<StepsRenderer stepsMarkup={algorithm.steps} />` component (details not in this file, assumed to render structured steps).
        *   **Academic References (`algorithm.academic_references`):**
            *   `<ReferencesRenderer referencesMarkup={algorithm.academic_references} />` component (details not in this file, assumed to render formatted references). Likely includes an `<h2>` similar to "Implementation Steps".
    *   **Right Column (Sidebar - `lg:col-span-3`):**
        *   A `div` with `sticky top-8 space-y-8`.
        *   **Related Case Studies Section:**
            *   Conditional rendering: `caseStudies.length > 0`.
            *   `<h3>` with `mb-4 text-lg font-semibold text-[var(--text-primary)]`.
                *   **Effective Typography (H3):** Inter. `text-lg` (1.125rem). `font-semibold` (600). Color `text-[var(--text-primary)]`.
            *   A `div` with `space-y-4` containing linked items.
            *   Each case study item: `div` with `rounded-lg border border-[var(--border)] p-4 hover:bg-[var(--surface-secondary)] transition-colors`.
                *   These are not explicitly Shadcn `<Card>` but are styled like simple cards/list items.
                *   Title: `<p className="font-medium text-[var(--text-primary)]">{cs.title}</p>`.
                    *   **Effective Typography:** Inter. `font-medium` (500). Color `text-[var(--text-primary)]`.
                *   Description: `<p className="text-sm text-[var(--text-tertiary)] mt-2 line-clamp-2">{cs.description}</p>`.
                    *   **Effective Typography:** Inter. `text-sm` (0.875rem). Color `text-[var(--text-tertiary)]`.

**Key Reusable Components Used:**
*   Custom: `<AuthGate>`, `<LearningPathLayout>`, `<StepsRenderer>`, `<ReferencesRenderer>`.
*   Shadcn UI: `<Badge>`.

**Typography Summary for Individual Algorithm Page:**
*   **Page Title (from `<LearningPathLayout>`):** Algorithm name, prominent heading (e.g., H1 equivalent), Inter, bold.
*   **Algorithm Description:** `text-lg`, Inter, color `text-[var(--text-primary)]`.
*   **Markdown Content Headings:** H1 (`text-4xl bold`), H2 (`text-3xl semibold`), H3 (`text-2xl semibold`), H4 (`text-xl semibold`), Inter. Colors via `prose-headings` or `text-[var(--text-primary)]`.
*   **Markdown Paragraphs:** `leading-7`, Inter. Color via `prose-p` or `text-[var(--text-secondary)]`.
*   **Section Titles (Steps, Related Case Studies H3):** `text-3xl semibold` (for Steps H2), `text-lg semibold` (for Case Studies H3), Inter. Color `text-[var(--text-primary)]`.
*   **Related Case Study Titles:** `font-medium`, Inter. Color `text-[var(--text-primary)]`.
*   **Related Case Study Descriptions:** `text-sm`, Inter. Color `text-[var(--text-tertiary)]`.
*   **Badges:** `text-sm` (Shadcn default), Inter. Colors from CSS variables.

**Containers & Styling Approach:**
*   Page structure and primary title provided by `<LearningPathLayout>`.
*   Main content area uses a responsive two-column grid.
*   Markdown content is processed to inject Tailwind-like utility classes for typography, and then further styled with `prose-...` classes targeting elements within the rendered HTML.
*   Direct use of CSS variables (e.g., `text-[var(--text-secondary)]`) is common for text colors, overriding or complementing Tailwind's default color utilities.
*   Sidebar items (related case studies) are custom-styled divs, not full Shadcn `<Card>` components, but achieve a card-like list item appearance.

**Overall:**
This page displays detailed content for an individual algorithm. It features significant custom Markdown processing to control typography. The layout is responsive, adapting to a two-column structure on larger screens. There's a heavy reliance on CSS variables for theming text and UI elements directly, sometimes in conjunction with Tailwind utilities. The custom renderers for steps and references suggest structured content beyond plain Markdown for those sections.

### 9. Industries - Individual Industry Page (`src/app/paths/industry/[slug]/page.tsx`)

**Analysis Date:** [Insert Date of Analysis]

**File Path:** `src/app/paths/industry/[slug]/page.tsx`

**Overall Structure:**
*   An `async` server component that fetches data for a specific industry based on its `slug`.
*   Uses `createServerSupabaseClient` for data fetching.
*   The main presentation is handled by the `<LearningPathLayout>` component.
*   Includes Markdown rendering (`markdown-it`) with custom preprocessing for lists and table formatting (similar to the individual algorithm page, though the `enhanceTypography` function is not explicitly called here, relying on `.prose` classes instead).
*   Fetches and displays related case studies using Shadcn UI `<Card>` components.
*   Unlike the algorithm page, this one does not seem to be wrapped in `<AuthGate>` directly in this file.

**A. `<LearningPathLayout>` Component Usage:**
*   **Props Passed:**
    *   `title={industry.name}`: The industry's name is used as the page title.
    *   `backLinkText="Back to Industries"`
    *   `backLinkHref="/paths/industry"`
*   **Assumed Structure & Styling:** Provides the main page title, a back link, and a content area. Typography for the title is expected to be prominent.

**B. Main Content Layout (within `<LearningPathLayout>`):**
*   A `div` with `space-y-8` structures the main content vertically.
*   **Industry Description & Main Content Section:**
    *   A `div` with `flex flex-col gap-4`.
    *   **Industry Description:** `<p className="text-lg text-muted-foreground">{industry.description}</p>`
        *   **Effective Typography:** Inter. `text-lg` (1.125rem). Color `text-muted-foreground`.
    *   **Main Content (Rendered Markdown):**
        *   Conditional: `industry.main_content && (...)`
        *   A `div` with `className="prose dark:prose-invert max-w-none mt-8"` and `dangerouslySetInnerHTML={{ __html: processedContent }}`.
            *   The `processedContent` is HTML rendered from Markdown (with list and table fixes).
            *   Styling relies on Tailwind Typography plugin classes (`.prose`, `.dark:prose-invert`) for typographic defaults (headings, paragraphs, lists, etc.).
            *   **Effective Typography (Markdown):** Will follow the Tailwind Typography plugin's default scale and styles unless further customized. Headings (H1-H6), paragraphs, lists, links will be styled by `.prose`.
*   **Related Case Studies Section:**
    *   Conditional: `caseStudies && caseStudies.length > 0`.
    *   A `div` with `space-y-4`.
    *   `<h2>` with `text-2xl font-bold`.
        *   **Effective Typography (H2):** Inter. `text-2xl` (1.5rem). `font-bold` (700).
    *   A `div` with `grid gap-4 md:grid-cols-2 lg:grid-cols-3` for the case study cards.
    *   Each case study is a Shadcn UI `<Card key={study.id} className="p-4">`.
        *   **Card Content:**
            *   Next.js `<Link href={`/case-study/${study.slug}`} className="hover:underline">` wrapping an `<h3>`.
            *   `<h3>` with `font-semibold` for the case study title.
                *   **Effective Typography (Case Study Title in Card):** Inter. `text-lg` (default for H3s, or as per Shadcn CardTitle if used). `font-semibold` (600).
            *   `<p className="text-sm text-muted-foreground mt-2">{study.description}</p>` for the case study description.
                *   **Effective Typography (Case Study Description in Card):** Inter. `text-sm` (0.875rem). Color `text-muted-foreground`.

**Key Reusable Components Used:**
*   Custom: `<LearningPathLayout>`.
*   Shadcn UI: `<Badge>` (potentially, though not directly in this file for industry page itself), `<Card>`.
*   Next.js: `<Link>`.

**Typography Summary for Individual Industry Page:**
*   **Page Title (from `<LearningPathLayout>`):** Industry name, prominent heading (e.g., H1 equivalent), Inter, bold.
*   **Industry Description:** `text-lg`, Inter, color `text-muted-foreground`.
*   **Markdown Content Headings & Text:** Styled by Tailwind Typography plugin (`.prose`). Default sizes are usually H1 (`2.25em`), H2 (`1.875em`), H3 (`1.5em`), H4 (`1.25em`), with corresponding font weights. Font family will be Inter (inherited).
*   **"Related Case Studies" Title (H2):** `text-2xl`, `font-bold`, Inter.
*   **Case Study Titles in Cards (H3):** `font-semibold` (likely `text-lg`), Inter.
*   **Case Study Descriptions in Cards:** `text-sm`, color `text-muted-foreground`, Inter.

**Containers & Styling Approach:**
*   Page structure and primary title provided by `<LearningPathLayout>`.
*   The main content area is a single column with vertical spacing.
*   Markdown content styling is primarily handled by the Tailwind Typography plugin (`.prose`). This is a different approach to Markdown styling than the individual Algorithm page, which used a custom `enhanceTypography` function.
*   Related case studies are displayed in a responsive grid using Shadcn UI `<Card>` components, styled with basic padding.
*   Direct use of Tailwind utilities for typography (e.g., `text-lg`, `font-semibold`) is present for non-Markdown content.

**Overall:**
This page displays detailed content for an individual industry. It uses the Tailwind Typography plugin for styling its main Markdown content, which offers a consistent set of typographic styles. Related content (case studies) is presented in a clean card grid. The styling approach for Markdown here is more standardized (relying on a plugin) compared to the more bespoke approach on the individual algorithm page.

### 10. Personas - Individual Persona Page (`src/app/paths/persona/[slug]/page.tsx`)

**Analysis Date:** [Insert Date of Analysis]

**File Path:** `src/app/paths/persona/[slug]/page.tsx`

**Overall Structure:**
*   An `async` server component that fetches data for a specific persona based on its `slug`.
*   Uses `createServerSupabaseClient` for data fetching.
*   Content is wrapped in an `<AuthGate>` component.
*   The main presentation is handled by the `<LearningPathLayout>` component.
*   Includes Markdown rendering (`markdown-it`) with custom preprocessing for lists and table formatting (similar to other individual detail pages).
*   Fetches and displays related case studies, with specific card styling for these.

**A. `<AuthGate>` Component Usage:**
*   Props: `title="Access Persona Details"`, `description="Get exclusive access to detailed quantum computing learning paths."`
*   Likely provides a message or UI for users who are not authorized.

**B. `<LearningPathLayout>` Component Usage:**
*   **Props Passed:**
    *   `title={persona.name}`
    *   `description={persona.description || ''}`
    *   `backLinkText="Back to Personas"`
    *   `backLinkHref="/paths/persona"`
*   **Assumed Structure & Styling:** Provides the main page title (H1), description (likely a paragraph below the title), a back link, and a content area.

**C. Main Content Layout (within `<LearningPathLayout>`):**
*   A `div` with `max-w-none` (allowing content to span the full width of the layout's content area).
*   **Expertise Badges:**
    *   Conditional: `persona.expertise && persona.expertise.length > 0`
    *   A `div` with `flex flex-wrap gap-2 mb-8`.
    *   Shadcn UI `<Badge variant="outline" className="text-base">` for each expertise item.
        *   **Effective Typography (Badge):** `text-base` (1rem). Font weight from Shadcn Badge outline variant. Inter.
*   **Main Content (Rendered Markdown - `persona.main_content`):**
    *   Conditional: `renderedContent && (...)`
    *   A `div` with `className="prose prose-gray dark:prose-invert max-w-none mb-8"` and `dangerouslySetInnerHTML={{ __html: renderedContent }}`.
        *   Styling relies on Tailwind Typography plugin classes (`.prose`, `.prose-gray`, `.dark:prose-invert`) for typographic defaults.
        *   **Effective Typography (Markdown):** Follows Tailwind Typography plugin styles (headings, paragraphs, lists, etc.), using Inter as the base font.
*   **Recommended Reading Section (Rendered Markdown - `persona.recommended_reading`):**
    *   Conditional: `persona.recommended_reading && (...)`
    *   A `div` with `mb-8`.
    *   `<h2>` with `text-xl font-semibold mb-4 border-b pb-2`.
        *   **Effective Typography (H2):** Inter. `text-xl` (1.25rem). `font-semibold` (600). Has a bottom border.
    *   A `div` with `className="prose-a:text-[var(--primary)] prose-a:hover:underline"` and `dangerouslySetInnerHTML={{ __html: renderedRecommendedReading }}`.
        *   This `div` intentionally *omits* the main `.prose` classes, applying only link styling directly via Tailwind-like classes targeting `<a>` tags within the rendered HTML. This means typography for headings, paragraphs, lists within this section will rely on browser defaults or inherited styles unless the Markdown itself contains specific HTML with classes.
*   **Related Case Studies Section:**
    *   Conditional: `caseStudies.length > 0`.
    *   `<h2>` with `text-xl font-semibold mb-4`.
        *   **Effective Typography (H2):** Inter. `text-xl` (1.25rem). `font-semibold` (600).
    *   A `div` with `grid grid-cols-1 gap-6`.
    *   Each case study is a Next.js `<Link>` with `className="block group"` wrapping a `div`.
    *   **Card Styling (Custom Div):** The `div` is styled with `p-6 rounded-lg border border-border bg-card/50 transition-all duration-200 hover:bg-accent/5 hover:border-border-hover`.
        *   This creates a card-like appearance using direct Tailwind utilities and CSS variables. It's not using the Shadcn `<Card>` component here, but custom styling that includes hover effects and a semi-transparent background (`bg-card/50`).
    *   **Card Content:**
        *   `<h3>` with `text-lg font-semibold mb-2 group-hover:text-primary` for the case study title.
            *   **Effective Typography (Case Study Title):** Inter. `text-lg` (1.125rem). `font-semibold` (600). Changes color to `text-primary` on group hover.
        *   `<p className="text-muted-foreground mb-4">{caseStudy.description}</p>`
            *   **Effective Typography (Case Study Description):** Inter. `text-base` (default). Color `text-muted-foreground`.
        *   Badges: `div` with `flex flex-wrap gap-2` containing Shadcn UI `<Badge variant="outline" className="text-sm">` for industries and hardware.
            *   **Effective Typography (Badge):** `text-sm` (0.875rem). Inter.

**Key Reusable Components Used:**
*   Custom: `<AuthGate>`, `<LearningPathLayout>`.
*   Shadcn UI: `<Badge>`.
*   Next.js: `<Link>`.

**Typography Summary for Individual Persona Page:**
*   **Page Title (from `<LearningPathLayout>`):** Persona name, prominent heading, Inter, bold.
*   **Persona Description (from `<LearningPathLayout>`):** Likely `text-lg` or similar, Inter, color `text-muted-foreground`.
*   **Expertise Badges:** `text-base`, Inter.
*   **Main Content Markdown:** Styled by Tailwind Typography plugin (`.prose`).
*   **"Recommended Reading" Title (H2):** `text-xl`, `font-semibold`, Inter.
*   **"Recommended Reading" Content:** Link styling `prose-a:...`, other elements rely on browser/inherited styles or specific HTML from Markdown.
*   **"Related Case Studies" Title (H2):** `text-xl`, `font-semibold`, Inter.
*   **Case Study Titles (H3 in custom cards):** `text-lg`, `font-semibold`, Inter. Hover effect on color.
*   **Case Study Descriptions (in custom cards):** `text-base`, color `text-muted-foreground`, Inter.
*   **Case Study Badges:** `text-sm`, Inter.

**Containers & Styling Approach:**
*   Page structure provided by `<LearningPathLayout>`.
*   Main content area is a single column.
*   Markdown styling for `main_content` uses Tailwind Typography plugin (`.prose`).
*   Markdown styling for `recommended_reading` is minimal, mainly targeting links, which could lead to typographic inconsistencies if this section contains complex structures like headings or lists without their own explicit styling.
*   Related case studies are displayed using custom-styled `div`s that emulate cards, rather than the Shadcn `<Card>` component directly. This allows for specific hover interactions (`group-hover`).
*   Direct use of Tailwind utilities and CSS variables is prevalent.

**Overall:**
This page provides detailed information for an individual persona. It uses a mix of Markdown rendering strategies: Tailwind Typography for the main content and a more selective styling for recommended reading. The related case studies section features custom-styled cards. The page is wrapped in `<AuthGate>`, indicating potential restricted access.

### 11. Case Studies - Main Listing Page (`src/app/case-study/page.tsx`)

**Analysis Date:** [Insert Date of Analysis]

**File Path:** `src/app/case-study/page.tsx`

**Overall Structure:**
*   An `async` server component.
*   Fetches published case studies using `createServiceRoleSupabaseClient` (note: uses service role client, which might have different RLS implications than `createServerSupabaseClient` used elsewhere, though for public published data it might be functionally similar).
*   Orders case studies by `published_at` (descending).
*   Maps the fetched data to a `CaseStudy[]` type.
*   The main layout is a `<main>` tag with `min-h-screen`.
*   Contains a page header (title and subtitle) and then renders a `<CaseStudyList>` component.

**A. Main Content Layout & Container:**
*   A `div` with `container-outer section-spacing` is used as the primary content wrapper.
    *   `.container-outer`: Custom class from `globals.css` (max-width 7xl, centered, responsive padding).
    *   `.section-spacing`: Custom class from `globals.css` for consistent vertical padding.

**B. Page Header Section:**
*   A `div` with `max-w-2xl mb-8 md:mb-12` for constraining the header text width and providing bottom margin.
*   `<h1>` with `text-2xl sm:text-3xl md:text-4xl font-bold mb-4`.
    *   **Effective Typography (H1):** Inter. Responsive size (1.5rem to 2.25rem). `font-bold` (700).
*   `<p>` with `text-muted-foreground text-base sm:text-lg`.
    *   **Effective Typography (Subtitle):** Inter. Responsive size (1rem to 1.125rem). Color `text-muted-foreground`.

**C. `<CaseStudyList>` Component Usage:**
*   **Props Passed:**
    *   `caseStudies={caseStudies || []}`: The array of case study data.
*   **Functionality & Content (Assumed - as the code for `CaseStudyList` is not provided here):**
    *   This component is responsible for rendering the list of case studies.
    *   It likely maps over the `caseStudies` array.
    *   Each case study is probably displayed using a card-like structure, potentially using Shadcn UI `<Card>` components or custom-styled divs, consistent with other list displays (e.g., on the landing page featured case studies section).
    *   Each item would link to the individual case study page (`/case-study/[slug]`).
*   **Expected Card/Item Styling (Hypothetical - based on landing page featured case studies):**
    *   Shadcn UI `<Card>` with classes like `group flex flex-col overflow-hidden bg-card hover:shadow-lg transition-all duration-200 hover:-translate-y-1`.
    *   May include a placeholder/image area, `<CardHeader>`, `<CardTitle>`, `<CardDescription>`, and `<Badge>` components for metadata (e.g., industries, algorithms).

**Key Reusable Components Used (In this file and likely by children):**
*   Custom: `<CaseStudyList>`.
*   Custom global CSS classes: `.container-outer`, `.section-spacing`.
*   Shadcn UI (expected within `<CaseStudyList>`): `<Card>`, `<CardHeader>`, `<CardTitle>`, `<CardDescription>`, `<Badge>`, etc.
*   Next.js: `<Link>` (expected within `<CaseStudyList>`).

**Typography Summary for Case Studies Listing Page (Dependent on `<CaseStudyList>` internals):**
*   **Page Title (H1):** Responsive `text-2xl` to `text-4xl`, `font-bold`, Inter.
*   **Page Subtitle:** Responsive `text-base` to `text-lg`, `font-normal`, Inter, color `text-muted-foreground`.
*   **Case Study Item Titles (within `<CaseStudyList>`):** Likely `text-lg` or `text-xl` (e.g., from Shadcn `<CardTitle>`), `font-medium` or `font-semibold`, Inter.
*   **Case Study Item Descriptions (within `<CaseStudyList>`):** Likely `text-sm` or `text-base`, `font-normal`, Inter, muted color (e.g., from Shadcn `<CardDescription>`).

**Containers & Styling Approach:**
*   Uses custom global classes `.container-outer` and `.section-spacing` for the main page container and padding.
*   The page header (title, subtitle) is styled directly with Tailwind utilities.
*   The actual list rendering and styling for individual case study items are encapsulated within the `<CaseStudyList>` component.
*   The overall styling will rely on the Tailwind utilities and CSS variables defined globally, as applied within this page and, more significantly, within the `<CaseStudyList>` component.

**Overall:**
This page serves as the main entry point for browsing all published case studies. It has a standard page header and delegates the complex task of rendering the list to the `<CaseStudyList>` component. The structure is clean and focuses on data fetching and passing data to the presentation component. The specific styling of the case study list items will be found within `<CaseStudyList>`.

### 12. Case Studies - Individual Case Study Page (`src/app/case-study/[slug]/page.tsx`)

**Analysis Date:** [Insert Date of Analysis]

**File Path:** `src/app/case-study/[slug]/page.tsx`

**Overall Structure:**
*   An `async` server component fetching data for a specific case study and its relations (industries, algorithms, personas) based on its `slug`.
*   Uses `createServerSupabaseClient` for data fetching.
*   The main presentation is handled by the `<LearningPathLayout>` component.
*   Includes Markdown rendering (`markdown-it`) with custom preprocessing (`preprocessMarkdown` for lists/tables) and citation processing (`processContentWithReferences`).
*   Uses a two-column grid layout for the main content and a sidebar.
*   Renders related metadata (companies, hardware, software, classifications) using Shadcn UI `<Badge>` components in the sidebar.
*   Uses `<ReferencesRenderer>` for academic references.
*   Does not appear to be wrapped in `<AuthGate>` in this file.

**A. `<LearningPathLayout>` Component Usage:**
*   **Props Passed:**
    *   `title={caseStudy.title}`
    *   `description={caseStudy.description || ''}`
    *   `backLinkText="Back to Case Studies"`
    *   `backLinkHref="/case-study"`
*   **Assumed Structure & Styling:** Provides the main page title (H1), description paragraph, a back link, and a content area.

**B. Main Content Layout (within `<LearningPathLayout>`):**
*   A `div` with `className="prose dark:prose-invert max-w-none"` wraps the main content area. This applies Tailwind Typography styling globally within this section.
*   A `div` with `className="grid gap-6 md:grid-cols-[2fr,1fr]"` creates the two-column layout (main content wider than sidebar on medium+ screens).
    *   **Left Column (Main Content):**
        *   A `div` containing the rendered Markdown.
        *   **Main Content (Rendered Markdown):** `div` with `dangerouslySetInnerHTML={{ __html: processedContent }}`.
            *   Styling relies on Tailwind Typography plugin classes (`.prose`, `.dark:prose-invert`) applied to the outer wrapper.
            *   **Effective Typography (Markdown):** Will follow the Tailwind Typography plugin's default scale and styles (headings, paragraphs, lists, links, tables, etc.). Font family Inter (inherited).
        *   **References Section:**
            *   Conditional: `caseStudy.academic_references && (...)`
            *   `<ReferencesRenderer referencesMarkup={caseStudy.academic_references} />`.
                *   Assumed to render a formatted list of references, likely including an `<h2>` title styled by `.prose`.
    *   **Right Column (Sidebar):**
        *   A `div` with `className="space-y-6"`.
        *   **Metadata Sections (Partner Companies, Quantum Companies, Hardware, Software, Industries, Algorithms, Personas, Resource Links):**
            *   Each section is typically a `div` with conditional rendering based on data presence.
            *   Section Title: `<h3>` with `className="text-lg font-semibold mb-2"`.
                *   **Effective Typography (Sidebar H3):** Inter. `text-lg` (1.125rem). `font-semibold` (600). Note: These headings are *outside* the main `.prose` scope, so they use direct Tailwind classes.
            *   Content Display:
                *   For lists of items (companies, hardware, software): `div` with `flex flex-wrap gap-2` containing Shadcn UI `<Badge variant="outline">`.
                *   For classifications (Industries, Algorithms, Personas): Similar structure but includes logic to display "Not Applicable" or "None" as plain text (`<p className="text-sm text-muted-foreground">`) if appropriate, otherwise renders `<Badge variant="outline">`.
                *   For Resource Links: `div` with `flex flex-col space-y-2` containing `<a>` tags styled with `text-primary hover:underline flex items-center`.
            *   **Effective Typography (Sidebar Badges):** `text-sm` (Shadcn default). Inter.
            *   **Effective Typography (Sidebar Text - "None"/"N/A"):** `text-sm`, color `text-muted-foreground`. Inter.
            *   **Effective Typography (Resource Links):** Inherited size (likely `text-base`), color `text-primary`. Inter.

**Key Reusable Components Used:**
*   Custom: `<LearningPathLayout>`, `<ReferencesRenderer>`.
*   Shadcn UI: `<Badge>`.
*   Next.js: `<Link>` (implicitly, if `<LearningPathLayout>` includes breadcrumbs or similar).
*   `markdown-it` for Markdown processing.

**Typography Summary for Individual Case Study Page:**
*   **Page Title (from `<LearningPathLayout>`):** Case study title, prominent heading (H1 equivalent), Inter, bold.
*   **Page Description (from `<LearningPathLayout>`):** `text-lg` or similar, Inter, muted color.
*   **Main Content Markdown:** Styled by Tailwind Typography plugin (`.prose`).
*   **Sidebar Section Titles (H3):** `text-lg`, `font-semibold`, Inter.
*   **Sidebar Badges:** `text-sm`, Inter.
*   **Sidebar Plain Text ("None"/"N/A"):** `text-sm`, color `text-muted-foreground`, Inter.
*   **Resource Links:** `text-base` (likely), color `text-primary`, Inter.

**Containers & Styling Approach:**
*   Page structure provided by `<LearningPathLayout>`.
*   A responsive two-column grid layout is used for the main content area and sidebar.
*   The main content uses Tailwind Typography (`.prose`) for styling, ensuring consistency for Markdown-rendered elements.
*   The sidebar uses direct Tailwind utilities for layout (`space-y-6`, `flex`, `gap-2`) and typography (`text-lg`, `font-semibold`, `text-sm`).
*   Shadcn UI `<Badge>` is used extensively for displaying metadata tags.
*   CSS variables are used implicitly via Tailwind utilities and `.prose` styles.

**Overall:**
This page effectively presents detailed case study information using a common two-column layout (content + sidebar). It leverages the Tailwind Typography plugin for the main article content and direct Tailwind utilities with Shadcn Badges for the structured metadata in the sidebar. The handling of classifications (Industries, Algorithms, Personas) includes specific logic to display different states ("Not Applicable", "None", or actual badges).

### 13. Login Page (`src/app/auth/AuthContent.tsx`)

**Analysis Date:** [Insert Date of Analysis]

**File Path:** `src/app/auth/AuthContent.tsx` (Main UI rendering), `src/app/auth/page.tsx` (Suspense wrapper), `src/app/auth/layout.tsx` (Minimal layout).

**Overall Structure:**
*   The UI is rendered by the `AuthContent` client component.
*   It checks authentication state and redirects logged-in users.
*   It displays a loading spinner (`Loader2` icon) while checking auth.
*   The main UI consists of a centered container holding a title/subtitle and the Supabase Auth UI component.

**A. Layout & Container:**
*   A `div` with `container relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-12`.
    *   Uses the default Tailwind `container` utility (likely centered, with padding).
    *   Calculated `min-h` to fill viewport height minus header height (assuming `--header-height: 4rem`).
    *   Flexbox is used to center the content vertically and horizontally.
*   An inner `div` with `w-full max-w-md` constrains the width of the auth form area.

**B. Page Header Section:**
*   A `div` with `mb-8`.
*   `<h1>` with `text-3xl font-bold tracking-tight`.
    *   **Effective Typography (H1):** Inter. `text-3xl` (1.875rem). `font-bold` (700). `tracking-tight`.
*   `<p>` with `text-muted-foreground mt-2`.
    *   **Effective Typography (Subtitle):** Inter. `text-base` (default). Color `text-muted-foreground`.

**C. Supabase Auth UI Component:**
*   A `div` with `bg-card rounded-lg border p-6` wraps the auth component, giving it a card-like appearance using theme variables.
*   The `<Auth>` component from `@supabase/auth-ui-react` is used.
*   **Styling Configuration:**
    *   `appearance={{ theme: ThemeSupa, ... }}`: Uses a predefined theme (`ThemeSupa`) from the library.
    *   `variables: { default: { colors: { brand: 'hsl(var(--primary))', brandAccent: 'hsl(var(--primary))' } } }`: Overrides the default brand colors of the `ThemeSupa` theme to use the primary color defined by the `--primary` CSS variable from `globals.css`. This ensures the Auth UI's primary elements match the site's theme.
*   **Effective Typography (Auth UI):** The typography within the Supabase Auth UI component itself (labels, input fields, links, buttons) will be determined by the `ThemeSupa` theme, potentially slightly influenced by global styles (like the base `font-sans` being Inter), but primarily controlled by the Auth UI library's own styling rules. It aims to be self-contained but uses the site's primary color for branding.

**Key Reusable Components Used:**
*   Supabase: `<Auth>`.
*   Shadcn UI: `<toast>` (used programmatically), `<ErrorBoundary>`.
*   Lucide Icons: `<Loader2>`.

**Typography Summary for Login Page:**
*   **Page Title (H1):** `text-3xl`, `font-bold`, Inter.
*   **Page Subtitle:** `text-base`, `font-normal`, Inter, color `text-muted-foreground`.
*   **Auth UI Elements:** Typography largely controlled by `ThemeSupa`, likely a standard sans-serif, but themed with the site's primary color.

**Containers & Styling Approach:**
*   Uses the default Tailwind `container` utility for centering content.
*   Flexbox is used for vertical and horizontal centering.
*   A max-width constraint is applied to the form area.
*   The main auth UI is provided by an external library (`@supabase/auth-ui-react`).
*   Theming of the external library is achieved by passing CSS variables (`hsl(var(--primary))`) into its appearance configuration.
*   The auth form is wrapped in a `div` styled to look like a card using theme variables (`bg-card`, `border`).

**Overall:**
The login page provides a clean, centered interface for authentication. It leverages the standard Supabase Auth UI component, ensuring a familiar and functional sign-in/sign-up experience. The key integration point with the site's design system is the application of the primary theme color to the Auth UI's brand elements and wrapping the component in a theme-aware card background.

### 14. Access Denied / Login Required Page (`src/components/auth/AuthGate.tsx`)

**Analysis Date:** [Insert Date of Analysis]

**File Path:** `src/components/auth/AuthGate.tsx`

**Overall Functionality:**
*   This component acts as a client-side gatekeeper for content requiring authentication.
*   It uses `createBrowserSupabaseClient` and `useEffect` to check the user's session status.
*   If the user is authenticated (`isAuthenticated === true`), it renders its `children` (the actual page content).
*   If the authentication status is still being checked (`isAuthenticated === null`), it renders `null` (effectively showing nothing, allowing the parent page layout to render potentially).
*   If the user is *not* authenticated (`isAuthenticated === false`), it renders a specific UI prompting the user to sign in or create an account.

**A. Access Denied / Login Prompt UI (Rendered when `isAuthenticated === false`):**

*   **Layout & Container:**
    *   A `div` with `container max-w-4xl mx-auto py-12`.
        *   Uses the default Tailwind `container` utility, centered, with a max-width of `4xl` (different from the `max-w-md` used on the main auth page) and vertical padding.
*   **Card Structure:**
    *   Uses a Shadcn UI `<Card className="text-center">` as the main container for the prompt.
    *   `<CardHeader className="space-y-4">`:
        *   Icon Wrapper: `div` with `mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center`.
            *   Lucide `<Lock />` icon styled with `w-6 h-6 text-primary`.
        *   `<CardTitle className="text-2xl sm:text-3xl">{title}</CardTitle>` (Uses the `title` prop passed to `AuthGate`).
            *   **Effective Typography (Title):** Inter. Responsive size (1.5rem to 1.875rem). Font weight likely `font-semibold` (Shadcn CardTitle default).
        *   `<CardDescription className="text-base sm:text-lg">{description}</CardDescription>` (Uses the `description` prop passed to `AuthGate`).
            *   **Effective Typography (Description):** Inter. Responsive size (1rem to 1.125rem). Color likely `text-muted-foreground` (Shadcn CardDescription default).
    *   `<CardContent className="space-y-4">`:
        *   A `div` with `flex flex-col sm:flex-row items-center justify-center gap-4` containing buttons.
        *   Shadcn UI `<Button asChild size="lg" variant="default">` wrapping a `<Link href={`/auth?redirectTo=${pathname}`}>` for "Sign In".
        *   Shadcn UI `<Button asChild size="lg" variant="outline">` wrapping a `<Link href={`/auth?redirectTo=${pathname}`}>` for "Create Account".
            *   **Effective Typography (Button Text):** `size="lg"` likely results in `text-base` or `text-lg`. Font weight `font-medium` (Shadcn default). Inter.
    *   `<CardFooter>`:
        *   A `<p className="text-sm text-muted-foreground mx-auto">` with supporting text.
            *   **Effective Typography (Footer Text):** Inter. `text-sm` (0.875rem). Color `text-muted-foreground`.

**Key Reusable Components Used (in this state):**
*   Shadcn UI: `<Card>`, `<CardHeader>`, `<CardTitle>`, `<CardDescription>`, `<CardContent>`, `<CardFooter>`, `<Button>`.
*   Lucide Icons: `<Lock>`.
*   Next.js: `<Link>`.

**Typography Summary for Access Denied UI:**
*   **Title (CardTitle):** Responsive `text-2xl` to `text-3xl`, `font-semibold`, Inter.
*   **Description (CardDescription):** Responsive `text-base` to `text-lg`, `font-normal`, Inter, muted color.
*   **Button Text:** Likely `text-base` or `text-lg` (Shadcn `size="lg"`), `font-medium`, Inter.
*   **Footer Text:** `text-sm`, `font-normal`, Inter, color `text-muted-foreground`.

**Containers & Styling Approach:**
*   Uses the default Tailwind `container` utility with a specific `max-w-4xl`.
*   The entire prompt is contained within a centered Shadcn UI `<Card>`.
*   Styling relies heavily on Shadcn component defaults combined with Tailwind utilities applied directly (e.g., text sizes, spacing, flex layout).
*   CSS variables are used implicitly through Shadcn components and Tailwind utilities for colors, border-radius, etc.
*   The `redirectTo` parameter is added to the login/signup links to ensure the user returns to the originally requested page after authentication.

**Overall:**
The `<AuthGate>` component provides a user-friendly prompt when authentication is required. It reuses the `Card` component structure and standard `Button` styles, ensuring visual consistency with other parts of the site. The messaging (`title`, `description`) is customizable via props, allowing context-specific prompts for different protected areas.

### 15. Admin Portal (`src/app/admin/layout.tsx` & `src/app/admin/page.tsx`)

**Analysis Date:** [Insert Date of Analysis]

**File Paths:** `src/app/admin/layout.tsx`, `src/app/admin/page.tsx` (representative page)

*Note: The analysis below was intended to be added previously but failed application. It is included here for completeness before the summary.*

**A. Admin Layout (`src/app/admin/layout.tsx`):**
*   **Overall Structure:** Standard two-column layout (fixed sidebar + main content area) using Flexbox.
*   **Sidebar:** `w-64`, `bg-card`, `border-r`. Contains header (`h1` - `text-xl font-bold`), nav list (`ul > li > Link`), footer (`text-xs text-muted-foreground`).
*   **Sidebar Nav Links:** `flex items-center p-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground`. Includes Lucide icon (`h-5 w-5`). Typography: Inherited size (likely `text-base`), `font-normal`, Inter.
*   **Main Content Area:** `flex-1 overflow-auto pb-20`. Padding (`p-8`) applied within child page (`admin/page.tsx`).

**B. Admin Dashboard Page (`src/app/admin/page.tsx`):**
*   **Header:** `h1` (`text-3xl font-bold`), `p` (`text-muted-foreground`).
*   **Content Cards:** Uses responsive grid. Shadcn `<Card>` components display data.
    *   Card Title: `text-lg font-medium`.
    *   Card Count: `text-3xl font-bold`.
    *   Card Description: `text-sm text-muted-foreground`.

**Styling Approach (Admin):** Relies on Tailwind utilities and Shadcn UI components within a standard sidebar layout.

## C. Summary of Typographic System (Based on Audit)

**Analysis Date:** [Insert Date of Analysis]

This summary consolidates observations about the effective typography used across the audited pages and components.

*Update Log:*
*   *[Insert Date]*: Initial audit findings.
*   *[Current Date]*: Updated to reflect Phase I changes: New fonts (Montserrat/Open Sans), new typographic scale, and refinements on Case Study page.

**1. Base Font:**
*   **Primary Font (Body):** Open Sans (loaded via `next/font/google` in `layout.tsx` and applied via `--font-open-sans` -> `--font-sans` CSS variable to the `body`).
*   **Heading Font:** Montserrat (loaded via `next/font/google` in `layout.tsx` and applied via `--font-montserrat` -> `--font-heading` CSS variable).
*   **Fallback:** Standard system sans-serif stack (`system-ui`, `-apple-system`, etc.).
*   **Features:** `font-feature-settings: "salt" 1;` applied globally to `body` and `h1-h6`.
*   **Antialiasing:** Applied globally to `body`.

**2. Heading Styles:**
Styling is primarily via Tailwind utilities, defined in `globals.css` within `@layer base`.

*   **Global H1-H4 Styles (Implemented in Phase I):**
    *   **Font:** Montserrat (via `--font-heading`).
    *   Base for H1-H4: `font-medium tracking-tight text-foreground`. (Note: individual weights below override the base `font-medium` here).
    *   `h1`: `text-[3.5rem]` (56px). `font-bold` (700). `leading-tight`.
    *   `h2`: `text-[2.25rem]` (36px). `font-medium` (500). `leading-tight mb-4`. (Weight reduced from semibold during refinements).
    *   `h3`: `text-[1.75rem]` (28px). `font-semibold` (600). `leading-snug mb-2`.
    *   `h4`: `text-[1.375rem]` (22px). `font-medium` (500). `leading-snug mb-2`.
    *   `h5, h6`: Inherit base heading styles, effectively smaller.

*   **Specific Title Class Refinements (Case Study Page):**
    *   `.sidebar-title`: `text-xs` (13.5px), `font-semibold` (600), `uppercase`, `tracking-wider`, `text-text-secondary`, `mb-4`. (Applied to `<h3>` in the sidebar).

*   **Previous Styles (Archived for reference - were based on Inter):**
    *   Base: `font-medium tracking-tight text-foreground`.
    *   `h1`: Responsive `text-2xl` (1.5rem/24px) / `text-3xl` (1.875rem/30px) / `text-4xl` (2.25rem/36px). `font-[600]` (semibold). `leading-tight`.
    *   `h2`: Responsive `text-xl` (1.25rem/20px) / `text-2xl` (1.5rem/24px) / `text-3xl` (1.875rem/30px). `font-[600]` (semibold). `leading-tight`, `mb-4`.
    *   `h3`: Responsive `text-lg` (1.125rem/18px) / `text-xl` (1.25rem/20px) / `text-2xl` (1.5rem/24px). `font-[500]` (medium). `leading-snug`, `mb-2`.
    *   `h4`: Responsive `text-base` (1rem/16px) / `text-lg` (1.125rem/18px) / `text-xl` (1.25rem/20px). `font-[500]` (medium). `mb-2`.
    *   Specific Title Classes: `.case-study-title` (e.g., `text-2xl md:text-3xl font-[600]`), `.section-title` (e.g., `text-2xl font-[600]`), `.sidebar-title` (e.g., `text-lg font-[500]`), `.card-title` (e.g., `text-xl font-[500]`).

**3. Paragraph Styles:**
*   **Global `<p>` Styles (Implemented in Phase I):**
    *   **Font:** Open Sans (via `--font-sans`).
    *   **Size:** `text-[1.125rem]` (18px).
    *   **Line Height:** `leading-[1.7]`.
    *   **Spacing:** `mb-4` (retained from previous styles).
*   **Previous Global `<p>`:** `leading-relaxed mb-4`. Effective size likely `text-base` (1rem / 16px).

**4. Link Styles:**
*   Standard link styling is primarily through Tailwind utilities (`text-primary`, `hover:underline`, etc.) or specific component styles (e.g., `.subtle-link`). Not directly targeted by the initial font/scale overhaul but appearance may be affected by context.

**5. List Styles:**
*   Primarily styled within the `.prose` scope (Tailwind Typography plugin) or with direct Tailwind utilities. Not directly targeted by the initial font/scale overhaul but appearance may be affected.

**6. Badge Styles:**
*   Generally styled by Shadcn UI `<Badge>` component variants and Tailwind utilities.
*   **Case Study Page Specific Refinement:** Sidebar badges use `text-[14px]`.

**7. Markdown Typography (`.prose` vs. Custom):**
*   **Case Study Page Specific (`.prose` overrides in `globals.css`):**
    *   `.prose h1`: Styled like global H2 (`text-[2.25rem] font-medium`).
    *   `.prose h2`: Styled like global H3 (`text-[1.75rem] font-semibold`).
    *   `.prose h3`: Styled like global H4 (`text-[1.375rem] font-medium`).
    *   `.prose h4`: Styled slightly larger than body (`text-[1.25rem] font-medium`).
*   Other pages might use Tailwind Typography plugin defaults (`.prose`) or other custom Markdown rendering solutions. This results in varying typographic outputs for Markdown across different sections.

**8. Admin Portal Typography:**
*   Admin styles are generally separate (defined in `src/app/admin/layout.tsx` and specific admin pages). It will inherit the new base fonts (Open Sans for body, Montserrat for headings if `font-heading` utilities are used). The specific sizes and weights used within the admin panel were not part of this initial overhaul.

**9. General Observations:**
*   **Font Consistency:** New system uses Montserrat for headings and Open Sans for body text.
*   **Responsiveness:** The new global H1-H4 and paragraph styles are defined as single sizes. Pages rely on existing Tailwind responsive prefixes (e.g., `sm:`, `md:`) for specific overrides where needed, or the Tailwind Typography plugin's responsive behavior.
*   **Styling Method:** Primarily Tailwind CSS, with global styles in `globals.css` and component-specific styling.
*   **Theming:** The core theming system (CSS variables for light/dark/graphite) remains unchanged.
*   **Refinements:** Significant iteration was done on the Case Study page's sidebar titles and Markdown heading hierarchy to achieve desired visual balance.