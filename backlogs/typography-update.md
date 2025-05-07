# UX/UI Improvement Plan: Case Study Page

This document outlines the plan to enhance the user experience (UX) and user interface (UI) of the case study page, based on the initial design review.

## Phase 0: Discovery & Documentation (Understanding the Current State)

**Goal:** To thoroughly understand and document the existing website's CSS architecture, component usage, and typographic styling before implementing any changes. This will minimize risk, ensure consistency, and provide a clear baseline.

1.  **Global CSS Architecture:**
    *   [ ] **Action:** Investigate and document how global CSS is structured and applied.
        *   *Considerations:* Identify main stylesheet(s), CSS methodologies used (e.g., BEM, Tailwind CSS, CSS Modules, styled-components), how global styles are inherited or overridden.

2.  **Component Inventory & Usage:**
    *   [ ] **Action:** Identify and document common UI components (e.g., cards, buttons, navigation elements, form inputs).
        *   *Considerations:* Where are they defined? How are they styled? Are they reused consistently?
    *   [ ] **Action:** Specifically analyze card/component usage for different content types:
        *   [ ] Document how cards/components are used for Learning Path content (industries, algorithms, personas).
        *   [ ] Document how cards/components are used for Case Studies content.
        *   [ ] Note any differences or similarities in component usage between these content types.

3.  **Typographic System Analysis:**
    *   [ ] **Action:** Document the current typographic hierarchy.
        *   *Considerations:* How are H1, H2, H3, body text, captions, links, etc., currently styled and differentiated (font family, size, weight, color, spacing)?
        *   [ ] Identify any existing typographic scale or patterns.
    *   [ ] **Action:** Note where typographic styles are defined (e.g., global CSS, component-specific styles).

4.  **Tooling & Build Process (Relevant to Styling):**
    *   [ ] **Action:** Briefly document any frontend build tools or processes that compile, bundle, or process CSS/styles (e.g., Webpack, PostCSS, SASS/LESS preprocessors).

## I. Typography Overhaul

**Goal:** Improve readability, establish clear visual hierarchy, and introduce more visual interest through font choices.

1.  **Font Selection & Pairing:**
    *   [ ] **Action:** Research and select a primary heading font.
        *   *Considerations:* Characterful sans-serif, good for impact, legible at large sizes.
    *   [ ] **Action:** Research and select a body text font.
        *   *Considerations:* Highly legible sans-serif, good for long-form reading, pairs well with the heading font.
    *   [ ] **Example Pairings to Consider (from Claude):**
        *   **Option 1:** Headings: Roboto Slab (semibold/bold) | Body: Inter (Technical, contemporary)
        *   **Option 2:** Headings: Source Sans Pro (semibold/bold) | Body: IBM Plex Sans (Professional, clear, designed for technical content)
        *   **Option 3:** Headings: Montserrat (medium/semibold) | Body: Open Sans (Clean, professional, good contrast)
    *   [ ] **Action:** Define fallback fonts for web safety.
    *   [ ] **Action:** Implement the chosen fonts in the CSS.

2.  **Font Size & Weight Hierarchy:**
    *   [ ] **Action:** Increase the main page title ("Quantum Brilliance and Pawsey Supercomputing Centre") significantly. Define a specific, impactful size (e.g., 48px, 60px). Use a bold or extra-bold weight.
    *   [ ] **Action:** Define sizes and weights for H2 ("Overview," "Problem Statement") and H3 (potential sub-headings). Ensure they are distinct from each other and body text.
    *   [ ] **Action:** Increase the base body font size for improved readability (e.g., to 16px or 18px).
    *   [ ] **Action:** Review and adjust font weights for secondary text elements (e.g., captions, labels in the sidebar) to ensure they are de-emphasized appropriately but still legible.

3.  **Line Height (Leading) & Spacing:**
    *   [ ] **Action:** Set an appropriate line height for body text (e.g., 1.5 - 1.7).
    *   [ ] **Action:** Increase spacing (margins) above all headings (H1, H2, H3) to improve separation from preceding content.
    *   [ ] **Action:** Ensure adequate paragraph spacing.

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
    *   [x] **Solution:** User added `SELECT` RLS policies for the `public` role (with `USING (true)`) to `case_study_industry_relations` and `algorithm_case_study_relations` in Supabase Studio.

7.  **Outcome & Cleanup:**
    *   [x] All classifications (Industries, Algorithms, Personas, Quantum Software, Quantum Hardware) now display correctly on the public case study page, including the "Not Applicable" state.
    *   [x] Debugging `console.log` statements were removed from `actions.ts` and `page.tsx`.
    *   [x] `export const dynamic = 'force-dynamic';` was removed from `page.tsx`.

**Conclusion:** The feature implementation was successful. The primary challenge revolved around data fetching for related entities on the public page, which was ultimately traced to missing RLS policies on the junction tables. The admin interface now correctly saves the new software field and manages the "Not Applicable" state for classifications, and the public page accurately reflects this data. 