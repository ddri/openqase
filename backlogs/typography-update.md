# UX/UI Improvement Plan: Case Study Page

This document outlines the plan to enhance the user experience (UX) and user interface (UI) of the case study page, based on the initial design review.

## Phase 0: Discovery & Documentation (Understanding the Current State)

**Goal:** To thoroughly understand and document the existing website's CSS architecture, component usage, and typographic styling before implementing any changes. This will minimize risk, ensure consistency, and provide a clear baseline.

**A. Core Design System Documentation:**

1.  **Global CSS & Tailwind Architecture:**
    *   [ ] **Action:** Document the structure of `src/app/globals.css`.
        *   *Focus:* How Tailwind CSS (base, components, utilities) is initialized and used.
        *   *Focus:* Identify and list all custom CSS variables defined (e.g., for colors, fonts, spacing, themes in `:root`, `[data-theme='dark']`, `[data-theme='graphite']`).
        *   *Focus:* Document how global styles are applied to base HTML elements (e.g., `body`, `h1-h6`, `p`, `a`). Note the use of `@apply`.
    *   [ ] **Action:** Document Tailwind CSS Configuration (`tailwind.config.js`).
        *   *Focus:* Customizations to theme (colors, spacing, breakpoints), plugins used, `content` paths.
    *   [ ] **Action:** Document font loading and application.
        *   *Focus:* How fonts (e.g., Inter) are loaded (e.g., in `src/app/layout.tsx`) and made available via CSS variables (e.g., `--font-inter`).
        *   *Focus:* Trace how `--font-sans` and `--font-heading` are defined and used.

2.  **Reusable Components & Utilities Inventory:**
    *   [ ] **Action:** Identify and document common UI components defined via custom classes in `globals.css` (e.g., `.card`, `.btn`, container classes like `.container-outer`, `.container-inner`, grid classes) or as React components (e.g., those in `src/components/ui/`).
        *   *Focus:* For each, note its purpose, how it's styled (e.g., Tailwind classes, `@apply`), and where its primary styles are defined.
    *   [ ] **Action (Card Specific):** Deep dive into card components.
        *   *Focus:* Are card styles globally defined (e.g., `.card` in `globals.css`)? Are there variations?
        *   *Focus:* How are card components (e.g., `Card`, `CardHeader`, `CardTitle`, `CardDescription` from `src/components/ui/card.tsx`) structured and styled? Are they wrappers around HTML elements with Tailwind classes, or do they have their own specific CSS?

**B. Key Page Design & Typography Audit:**

For each page/section listed below, document:
    *   Overall layout structure and primary containers used (e.g., `.container-outer`, `.container-inner`, flex/grid structures).
    *   Specific card components used: Identify the exact card components/classes. Are they shared across different content types or unique? How do they function (props, content areas)?
    *   Heading implementation: How are H1, H2, H3, etc., implemented (semantic HTML vs. styled divs)? What are their current effective styles (font, size, weight, color)?
    *   Body text styling: Font, size, weight, line-height, color for main paragraphs.
    *   Styling of other key elements: Links, lists, buttons, badges, form inputs relevant to the page.
    *   Note any page-specific CSS or unique styling patterns.

1.  [ ] **Primary Navigation Bar (`src/components/Navigation.tsx`)**
2.  [ ] **Footer (`src/components/FooterWrapper.tsx` and related footer component)**
3.  [ ] **Landing Page (`src/app/page.tsx`)**
    *   [ ] Hero Section
    *   [ ] Learning Paths Section (Cards used)
    *   [ ] Why Choose OpenQASE Section (Cards/feature blocks used)
    *   [ ] Featured Case Studies Section (Cards used)
4.  [ ] **Learning Paths - Main Listing Page (e.g., `/paths`)**
5.  [ ] **Algorithms - Main Listing Page (e.g., `/paths/algorithm`)**
6.  [ ] **Algorithms - Individual Algorithm Page (e.g., `/algorithms/[slug]`)**
7.  [ ] **Industries - Main Listing Page (e.g., `/paths/industry`)**
8.  [ ] **Industries - Individual Industry Page (e.g., `/industries/[slug]`)**
9.  [ ] **Personas - Main Listing Page (e.g., `/paths/persona`)**
10. [ ] **Personas - Individual Persona Page (e.g., `/personas/[slug]`)**
11. [ ] **Case Studies - Main Listing Page (e.g., `/case-study`)**
12. [ ] **Case Studies - Individual Case Study Page (e.g., `/case-study/[slug]`)** (Especially the page structure from the initial image provided)
13. [ ] **Login Page**
14. [ ] **Access Denied / Login Required Page (if applicable, or standard auth redirects)**
15. [ ] **Admin Portal (General structure, common elements, e.g., `src/app/admin/...`)**
    *   [ ] Focus on a representative admin page (e.g., case study edit form) for typography and component usage.

**C. Summary of Typographic System:**

1.  [ ] **Action:** Based on the audit, create a summary document/section detailing the *effective* current typographic system.
    *   *Focus:* List all heading levels (H1-H6, `.case-study-title`, `.section-title`, `.sidebar-title`, etc.) with their typical font (family, weight, size, line-height, color, letter-spacing, margins) as used on key pages.
    *   *Focus:* Document body paragraph styling (font, weight, size, line-height, color).
    *   *Focus:* Document link styling, list styling.
    *   *Focus:* Note any inconsistencies found.

## I. Typography Overhaul

**Goal:** Improve readability, establish clear visual hierarchy, and introduce more visual interest through font choices.

1.  **Font Selection & Pairing:**
    *   [x] **Action:** Research and select a primary heading font. **-> Chosen: Montserrat**
        *   *Considerations:* Characterful sans-serif, good for impact, legible at large sizes.
    *   [x] **Action:** Research and select a body text font. **-> Chosen: Open Sans**
        *   *Considerations:* Highly legible sans-serif, good for long-form reading, pairs well with the heading font.
    *   [x] **Example Pairings to Consider (from Claude):**
        *   ~~Option 1: Headings: Roboto Slab (semibold/bold) | Body: Inter (Technical, contemporary)~~ 
        *   ~~Option 2: Headings: Source Sans Pro (semibold/bold) | Body: IBM Plex Sans (Professional, clear, designed for technical content)~~ 
        *   **Selected -> Option 3:** Headings: Montserrat (medium/semibold) | Body: Open Sans (Clean, professional, good contrast)
    *   [x] **Action: Load Chosen Fonts (`src/app/layout.tsx`)**
        *   Import `Montserrat` and `Open_Sans` from `next/font/google`.
        *   Load required weights (e.g., Montserrat: 400, 500, 600, 700; Open Sans: 400, 600, 700).
        *   Expose fonts via CSS variables (e.g., `--font-montserrat`, `--font-open-sans`).
        *   Apply variables to `<html>` tag.
    *   [x] **Action: Define fallback fonts for web safety.** (Ensured fallback stack remains in CSS variable definitions in `globals.css`).
    *   [x] **Action: Implement Initial Font Swap (`src/app/globals.css`) - Gentle Start**
        *   Update `--font-sans` definition in `:root` to use `var(--font-open-sans), system-ui, ...`.
        *   Update `--font-heading` definition in `:root` to use `var(--font-montserrat), system-ui, ...`.
    *   [x] **Action: Initial Review & Minor Adjustments**
        *   Visually inspected site after font swap.
        *   Made adjustments to base `font-size` (to 1.125rem/18px), `line-height` (to 1.7), and global heading definitions. Addressed initial feedback on text feeling too small.

2.  **Font Size & Weight Hierarchy (Full Scale Implementation - Phase I.b):**
    *   [x] **Action:** Increase the main page title ("Quantum Brilliance and Pawsey Supercomputing Centre") significantly. Define a specific, impactful size (e.g., 48px, 60px). Use a bold or extra-bold weight (Montserrat 600 or 700).
        *   *Implemented as global H1 style: `text-[3.5rem]` (56px), `font-bold` (700), Montserrat.* 
    *   [x] **Action:** Define sizes and weights for H2 ("Overview," "Problem Statement") and H3 (potential sub-headings). Ensure they are distinct from each other and body text.
        *   *Implemented as global styles: H2 (`text-[2.25rem]` med), H3 (`text-[1.75rem]` semibold), H4 (`text-[1.375rem]` med), Montserrat. Specific `.prose` overrides created for case study page.* 
    *   [x] **Action:** Increase the base body font size for improved readability (e.g., to 16px or 18px).
        *   *Implemented: Base body `text-[1.125rem]` (18px), Open Sans.*
    *   [x] **Action:** Review and adjust font weights for secondary text elements (e.g., captions, labels in the sidebar) to ensure they are de-emphasized appropriately but still legible.
        *   *Specific Review & Adjustments for Case Study Sidebar:* `.sidebar-title` refined to `text-xs font-semibold uppercase tracking-wider text-text-secondary`. Badge text size set to `text-[14px]`.
        *   *Broader review of other secondary elements across pages pending Phase II.*

3.  **Line Height (Leading) & Spacing:**
    *   [x] **Action:** Set an appropriate line height for body text (e.g., 1.5 - 1.7).
        *   *Implemented: `leading-[1.7]` for body text.*
    *   [x] **Action:** Increase spacing (margins) above all headings (H1, H2, H3) to improve separation from preceding content.
        *   *Partially implemented: New global heading styles in `globals.css` include default bottom margins (`mb-4` for H2, `mb-2` for H3/H4). Top margins primarily handled by `.prose` styles or direct page layout. Full review of top margins pending.*
    *   [x] **Action:** Ensure adequate paragraph spacing.
        *   *Implemented: `p` tag retains `mb-4`.*

4.  **Case Study Page Specific Refinements (Phase I.c - Emergent from review):**
    *   [x] **Action:** Define specific overrides for `.prose h1, .prose h2, .prose h3, .prose h4` within `globals.css` to create a distinct hierarchy for Markdown content on the Case Study page, different from global headings.
    *   [x] **Action:** Iteratively refine `.sidebar-title` on the Case Study page for size, weight, case, and color to ensure it functions as a label and does not compete with main content headings. Final: `text-xs font-semibold uppercase tracking-wider text-text-secondary`.
    *   [x] **Action:** Adjust badge text size in the Case Study sidebar to `text-[14px]`.
    *   [x] **Action:** Correct HTML structure on Case Study page to prevent `.prose` styles from incorrectly targeting sidebar headings.
    *   [x] **Action:** Ensured classification badges (Industries, Algorithms, Personas) in the Case Study sidebar correctly link to `/paths/[classification]/[slug]`, while other badges are non-interactive.

## II. Visual Hierarchy & Layout Refinement

**Goal:** Guide the user's eye, make key information stand out, and improve the overall organization of content.

1.  **Hero Section:**
    *   [ ] **Action:** Style the main title and its introductory paragraph to create a distinct and impactful "hero" section.
        *   *Considerations:* Potentially a slightly different background shade for this area or increased padding.

2.  **Section Distinction:**
    *   [ ] **Action:** Enhance the visual separation of main content sections ("Overview," "Problem Statement").
        *   *Considerations:* Use of larger headings (as per typography), increased top margins. Evaluate if subtle horizontal rules are needed (use sparingly). Consider using cards or subtle background variations to define content sections (Claude).

3.  **Sidebar Enhancement:**
    *   [ ] **Action:** Make sidebar titles ("Partner Companies," "Quantum Companies," etc.) more prominent (larger font size/bolder weight than their content).
    *   [ ] **Action:** Restyle the tags/links (e.g., "Pawsey Supercomputing Research Centre") under sidebar titles.
        *   *Considerations:* Style them as distinct pills/buttons with a subtle background color, clear hover/focus states, and adequate padding.
    *   [ ] **Action:** If company logos are used, ensure their visual presentation is clear and professional (Claude).
    *   [ ] **Action:** Review spacing within the sidebar to prevent a cramped feel.

4.  **Whitespace & Grid Management:**
    *   [ ] **Action:** Conduct a general review of the page to increase whitespace (margins and padding) around text blocks, between components, and in the sidebar.
    *   [ ] **Action:** Consider implementing a structured grid system for better alignment and balance of content elements (Claude).

5.  **"Back to Case Studies" Link:**
    *   [ ] **Action:** Evaluate if the styling of the "Back to Case Studies" link needs adjustment for better visual prominence or integration.

6.  **Persona Detail Page Sidebar & Metadata Enhancement (`src/app/paths/persona/[slug]/page.tsx`)**
    *   [x] **Action:** Restructure the Persona detail page layout to support a two-column grid (main content + sidebar), similar to the Case Study page.
    *   [x] **Action:** Create the new sidebar container `div`.
    *   [x] **Action (Expertise Badges):**
        *   [x] Move the rendering logic for `persona.expertise` badges into the new sidebar.
        *   [x] Add a `<h3>` with class `sidebar-title` (e.g., "Expertise") above these badges.
        *   [x] Style these badges as non-interactive (e.g., `variant="outline"`, `text-[14px]`, `border-border`), adjusting their current `text-base` styling.
    *   [x] **Action (Industries Section):**
        *   [x] Update the Supabase query to fetch related industries for the persona (e.g., via `persona_industry_relations(industries(id, name, slug))`).
        *   [x] Add a `<h3>` with class `sidebar-title` (e.g., "Industries") for this new section.
        *   [x] Render fetched industries as `<Badge>` components wrapped in `<Link>` components, linking to `/paths/industry/[slug]`.
        *   [x] Style these linkable badges consistent with other interactive classification badges (e.g., `variant="outline"`, `text-[14px]`, `border-border`, `hover:bg-muted-foreground/20`, `cursor-pointer`).
        *   [x] Implement logic to display "None" or similar if no industries are related.

7. **Section Separators on Detail Pages (HR Implementation)**
    *   [x] **Action (Persona Page):** Add `<hr className="my-8 border-border" />` before the "Recommended Reading" and "Related Case Studies" section titles on `src/app/paths/persona/[slug]/page.tsx` to improve visual separation.
    *   [x] **Action (Persona Page):** Remove redundant `border-b` from "Recommended Reading" `<h2>` after adding HR.
    *   [x] **Action (Case Study Page):** Add `<hr className="my-8 border-border" />` before the `<ReferencesRenderer />` component call on `src/app/case-study/[slug]/page.tsx`.
    *   [x] **Action (Global):** Attempted to fix double-line issue by adding `@apply border-none;` to `.prose h2` in `globals.css`.

## III. Color & Contrast

**Goal:** Ensure accessibility, optimal readability, and a thematically appropriate visual tone.

1.  **Contrast Check:**
    *   [ ] **Action:** Use a contrast checker tool to verify that all text elements (especially body text and secondary text) meet WCAG AA or AAA guidelines against their backgrounds.
    *   [ ] **Action:** Adjust text or background colors as needed to meet contrast requirements.

2.  **Strategic Color System & Palette:**
    *   [ ] **Action:** Define and implement a strategic color system including primary, secondary, and accent colors (Claude).
    *   [ ] **Action:** Ensure accent colors are used consistently and effectively to highlight interactive elements and key information.
    *   [ ] **Action:** Consider a color palette that reflects the innovative and cutting-edge nature of quantum computing (Claude).

## IV. Engagement & Visual Interest

**Goal:** Make the page more visually appealing and less text-dense.

1.  **Exploration of Visuals (Future Consideration):**
    *   [ ] **Task:** Identify opportunities to incorporate relevant visuals.
        *   *Examples (if applicable):* Subtle background image for hero, icons for resource links, simple diagrams for complex concepts.
    *   *Note:* This might be content-dependent and require new assets. For now, focus on layout and typography to support future visual additions.

2.  **Text Scannability:**
    *   [ ] **Action:** Review long blocks of text.
        *   *Considerations:* Where appropriate, introduce bullet points, numbered lists, or blockquotes to break up text and highlight key information.

3.  **Subtle Global Background (New from AI Review):**
    *   [ ] **Action:** Evaluate the use of a subtle global background texture or gradient to add visual depth to the entire page.
        *   *Considerations:* Must not be distracting; ensure it complements the dark theme and improves aesthetics without harming readability or performance.

## V. Header & Minor Elements

**Goal:** Ensure consistency and usability of global elements.

1.  **Header Navigation:**
    *   [ ] **Action:** Review the main site navigation ("openQase | Learning Paths | Case Studies | Blog").
        *   *Considerations:* Evaluate if visual weight needs adjustment or if an active page indicator would be beneficial.

2.  **Icons (Top Right):**
    *   [ ] **Action:** Confirm the moon and person icons have sufficient contrast and tappable/clickable area.

## VI. Implementation & Review

1.  **Development:**
    *   [ ] **Action:** Implement changes iteratively, starting with typography.
    *   [ ] **Action:** Test across different screen sizes and browsers. Ensure the layout adapts elegantly and improve touch targets and button sizes for mobile users (Claude).
2.  **Review:**
    *   [ ] **Action:** Conduct a peer review of the implemented changes.
    *   [ ] **Action:** Gather feedback and make final adjustments.

## VII. Feature: Enhanced Case Study Data Display (Software Field & Classifications)

**Goal:** To add a new "Quantum Software" field to case studies and ensure all relevant classifications (Industries, Algorithms, Personas, Quantum Hardware, Quantum Software) are correctly displayed on the public case study page, including a "Not Applicable" state.

**Summary of Work (Completed in Chat Session [Current Date]):**

1.  **Initial Requirements:**
    *   [x] Add a new `quantum_software` field (TEXT[]) to the `case_studies` table in Supabase.
    *   [x] Display this new field on the admin form and the public case study page, similar to "Quantum Hardware".
    *   [x] Ensure existing classifications (Industries, Algorithms, Personas) are displayed on the public case study page.
    *   [x] Implement a way to show "Not Applicable" for these classifications if no specific items are relevant.

2.  **Database Modifications (User & AI):**
    *   [x] User manually added `quantum_software TEXT[]` to `case_studies` table in Supabase.
    *   [x] User added `is_system_record BOOLEAN DEFAULT false` to `algorithms`, `industries`, and `personas` tables.
    *   [x] User created a "Not Applicable" record in each of the `algorithms`, `industries`, and `personas` tables, with `is_system_record` set to `true` and a slug of `not-applicable`.
        *   Algorithm "Not Applicable" ID: `5bb7190e-d0df-46cc-a459-2eea19856fb1`
        *   Industry "Not Applicable" ID: `4cd2a6a0-6dc1-49ba-893c-f24eebaf384a`
        *   Persona "Not Applicable" ID: `d1c1c7e7-2847-4bf3-b165-3bd84a99f3a6`
    *   [x] Generated/updated Supabase types (`src/types/supabase.ts`) to reflect schema changes (local generation using `--local` flag).

3.  **Backend & Data Handling Changes (AI):**
    *   [x] Updated `CaseStudy` interface in `src/lib/types.ts` to include `quantum_software: string[];`.
    *   [x] Updated data mapping in `src/app/case-study/page.tsx` to include `quantum_software`.
    *   [x] Updated `saveCaseStudy` function in `src/app/admin/case-studies/[id]/actions.ts`:
        *   To save `quantum_software`.
        *   To correctly handle saving relations for industries, algorithms, and personas, including logic to point to the "Not Applicable" record UUID if the corresponding checkbox is ticked in the admin form.
    *   [x] Updated API route `src/app/api/case-studies/route.ts` (POST handler) to parse and include `quantum_software` from form data.

4.  **Admin Form Updates (`src/app/admin/case-studies/[id]/client.tsx`) (AI):**
    *   [x] Added a new multi-select form field for "Quantum Software", mirroring the "Quantum Hardware" field.
    *   [x] Modified `values` state to include `quantum_software`.
    *   [x] Updated `useEffect` hook and `handleCheckboxChange` logic to manage the "Not Applicable" state for Industries, Algorithms, and Personas. If "Not Applicable" is checked, the respective multi-select is disabled and cleared; if unchecked, it's enabled. The `notApplicableStates` are passed to the `saveCaseStudy` action.

5.  **Public Page Display Updates (`src/app/case-study/[slug]/page.tsx`) (AI):**
    *   [x] Added a section to display "Quantum Software" badges.
    *   [x] Updated sections for Industries, Algorithms, and Personas to:
        *   Fetch data through their respective junction tables (e.g., `case_study_industry_relations(industries(id, name, slug))`).
        *   Display "Not Applicable" as text if the fetched relation points to a record with `slug === 'not-applicable'`.
        *   Display selected items as badges if actual items are related and are not the "Not Applicable" record.
        *   Display "None" if no items are related and "Not Applicable" is not selected.

6.  **Key Debugging Journey & Resolution:**
    *   [x] Initial attempts to display Industries, Algorithms, and Personas failed despite data appearing to save correctly.
    *   [x] Extensive logging was added to `saveCaseStudy` action and the public page data fetching logic.
    *   [x] Confirmed data was being saved to junction tables correctly via direct SQL queries.
    *   [x] Investigated Next.js caching (`export const dynamic = 'force-dynamic';` was temporarily added).
    *   [x] **Root Cause Identified:** Missing `SELECT` Row Level Security (RLS) policies on the junction tables (`case_study_industry_relations`, `algorithm_case_study_relations`) for the `public` role (or `anon` role used by the public page). The `case_study_persona_relations` table *had* the correct `SELECT` policy, which is why Personas were working.
    *   [x] **Solution:** User added `SELECT` RLS policies for the `public` role (with `USING (true)`) to `

## VIII. Known Issues / Follow-up Tasks

*   [ ] **Investigate Double Line Before References (Case Study Page):** Despite adding an `<hr>` and removing borders via `.prose h2` styles, a double line still appears before the References section on `/case-study/[slug]`. 
    *   *Next Steps:* Inspect the `<ReferencesRenderer />` component (`src/components/ui/ReferencesRenderer.tsx`?) to see if it internally renders a heading with a border or its own separator.

## IX. Algorithm Detail Page Alignment (`src/app/paths/algorithm/[slug]/page.tsx`)

**Goal:** Align the structure, styling, and sidebar content of the Algorithm detail page with the patterns established for Persona and Industry detail pages.

*   [ ] **Action:** Change the page layout from the 12-column structure (`lg:grid-cols-12`) to the standard two-column grid (`md:grid-cols-[2fr,1fr]`).
*   [ ] **Action (Markdown Styling):**
    *   [ ] Remove the `enhanceTypography` function and its application to the rendered Markdown (`processedContent`).
    *   [ ] Apply the standard Tailwind Typography classes (e.g., `prose dark:prose-invert max-w-none`) to the `div` directly wrapping the `dangerouslySetInnerHTML` for the main Markdown content.
*   [ ] **Action (Sidebar Content):**
    *   [ ] Remove the existing "Related Case Studies" section from the sidebar.
    *   [ ] Update the main Supabase query fetching the `algorithm` data to include related Industries and Personas (e.g., via `algorithm_industry_relations(industries(id, name, slug))` and `algorithm_persona_relations(personas(id, name, slug))`). *Requires checking/confirming existence of these relations/tables.*
    *   [ ] Define an `EnrichedAlgorithm` type to include these relations and cast the fetched data.
    *   [ ] Add a "Related Industries" section to the sidebar, rendering linkable badges (`/paths/industry/[slug]`) based on fetched relations. Include "None"/"Not Applicable" logic.
    *   [ ] Add a "Related Personas" section to the sidebar, rendering linkable badges (`/paths/persona/[slug]`) based on fetched relations. Include "None"/"Not Applicable" logic.
    *   [ ] Ensure consistent use of `<h3 class="sidebar-title">` and badge styling.
*   [ ] **Action (Main Content Structure):**
    *   [ ] Ensure the "Implementation Steps" and "Academic References" sections (including their preceding `<hr>`) are placed correctly within the main content column, *after* the `.prose`-wrapped Markdown content `div`.
    *   [ ] Decide if/where to add a "Related Case Studies" section back into the main content column (e.g., at the bottom, after References, styled consistently).