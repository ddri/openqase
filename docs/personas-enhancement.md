# Persona Page Enhancements Plan

## Overview

This document outlines the plan for enhancing the Persona pages in the admin CMS and the public-facing site. The main changes are:
1.  Adding a "Recommended Reading" section, rendered as standard Markdown.
2.  Renaming the `role` field to `expertise` and changing its type to `text[]` to better represent persona skills and allow for multiple values (displayed as badges).
3.  Verifying the existing "Related Case Studies" section.

This content is part of the Learning Paths section of the site.

## Key Design Decision 1: Recommended Reading as Standard Markdown

- **Recommended Reading** will be stored as a dedicated `TEXT` field in the `personas` table in the database (e.g., `recommended_reading`).
- The user will enter reading list items using **standard Markdown formatting (including links like `[text](url)`)** in a dedicated text area within the admin CMS.
- The backend will store this as a string, and the frontend will parse and render it directly using `markdown-it`, similar to how `main_content` is rendered.
- **Note:** An attempt was made to use `@tailwindcss/typography` for rich styling (`prose` classes), but the plugin caused build errors. The decision was made to remove the plugin and defer specific typography styling for this section. Basic Markdown rendering via `markdown-it` is implemented.
- This approach keeps authoring simple and renders the content in a natural, integrated way. Footnote/reference-style linking is not required for this section.

### Benefits of This Approach
- **Separation of Concerns:** Recommended reading is distinct from `main_content`, simplifying management and display.
- **Consistent Formatting:** Renders similarly to other markdown content on the site (though without dedicated typography plugin styling for now).
- **Simple Authoring:** Content authors use standard Markdown.
- **Future Flexibility:** Allows migration to a more structured format later if needed, or revisiting typography styling.

## Key Design Decision 2: Role Field Replaced by Expertise Array -- COMPLETED

- The existing `role` field (`text`) will be repurposed.
- **Data Type Change:** The column's data type has been changed from `text` to `text[]` (array of text) to allow storing multiple expertise keywords.
- **Rename:** The column has been renamed from `role` to `expertise`.
- This aligns better with the information's purpose (skills/keywords) and allows displaying multiple badges per persona, similar to past designs.
- This leverages existing filtering/searching UI components (`PersonaList.tsx`) with modifications.

## Current State of the Persona Pages -- UPDATED

- The `personas` table includes fields like name, slug, description, `expertise` (`text[]`), `main_content` (markdown), and `recommended_reading` (`text`). Relationships to Case Studies and Industries are handled via join tables. Unused columns (`related_case_studies`, `industry`, `persona_type`) have been dropped.
- The main listing page (`src/app/paths/persona/page.tsx` using `src/components/PersonaList.tsx`) displays published personas with search based on `expertise` and other fields.
- The detail page (`src/app/paths/persona/[slug]/page.tsx`) displays persona details, including `expertise` badges, markdown `main_content`, `recommended_reading` (rendered via `markdown-it`), and related case studies fetched via the `case_study_persona_relations` join table.

-----------------

## Implementation Plan

### 1. Database Schema Updates -- COMPLETED
- Add a new `recommended_reading` TEXT field to the `personas` table.
- Change the data type of the `role` column to `TEXT[]`.
- Rename the `role` column to `expertise`.
- Drop unused columns: `related_case_studies`, `industry`, `persona_type`.

### 2. Admin Form Component Updates -- COMPLETED
- Update the Persona admin form (`src/app/admin/personas/[id]/client.tsx`) to include a text area for `recommended_reading` and input for `expertise`.
- Add tooltip for Markdown guidance.
- Update form state management and validation.

### 3. Rendering Logic & Component -- COMPLETED (Styling Deferred)
- **No custom renderer needed.** The `recommended_reading` field is rendered directly using `markdown-it`.
- Remove `RecommendedReadingRenderer.tsx` and `contentProcessing.ts`.
- Update `PersonaList.tsx`:
    - Adjust filtering logic for the new `expertise` (`text[]`) field.
    - Pass the `persona.expertise` array to the `ContentCard`'s `badges` prop.
- Update `src/app/paths/persona/[slug]/page.tsx`:
    - Display multiple badges based on the `persona.expertise` array.
    - Render `recommended_reading` via `markdown-it`.
    - **Note:** `@tailwindcss/typography` plugin caused issues and was removed. Applying `prose` styling is deferred.

### 4. Display Page Integration -- COMPLETED (Styling Deferred)
- Update the Persona detail page (`src/app/paths/persona/[slug]/page.tsx`) to:
    - Fetch the `recommended_reading` data.
    - Render the `recommended_reading` content using `markdown-it` within a standard `div`. (**Note:** Specific typography styling deferred).
    - Add appropriate styling and section headers.
    - Ensure conditional rendering.

### 5. Related Case Studies Verification -- COMPLETED
- Verify the "Related Case Studies" section implementation on the detail page (`src/app/paths/persona/[slug]/page.tsx`).
- Corrected fetch logic to use `case_study_persona_relations` join table.
- Added necessary RLS policy to `case_study_persona_relations`.

### 6. Backend/API Updates -- COMPLETED
- Update server actions (`src/app/admin/personas/[id]/actions.ts`) to handle `recommended_reading` and `expertise`.
- Add revalidation logic.

### 7. Testing & Migration -- COMPLETED (Basic Functionality)
- Tested the core workflow: authoring, saving, rendering basic content and relationships.
- **Note:** Styling refinement for `recommended_reading` is pending.

## Implementation Phases -- COMPLETED (Core Functionality)

### Phase 1: Database & Backend -- COMPLETED
### Phase 2: Admin UI -- COMPLETED
### Phase 3: Frontend Component Development & Updates -- COMPLETED (Styling Deferred)
### Phase 4: Display Integration & Review -- COMPLETED (Styling Deferred)
### Phase 5: Testing -- COMPLETED (Basic Functionality)

## Next Steps
- ~~Confirm the desired markup format for "Recommended Reading".~~ ~~**Decision:** Use `[^1]: ...` format.~~ **Revised Decision:** Use standard Markdown.
- ~~Confirm if any changes are required for the "Related Case Studies" section.~~ **Decision:** Verify existing implementation -> Required join table query and RLS fixes. **COMPLETED**.
- ~~**Decision:** Change `role` (text) to `expertise` (text[]).~~ **COMPLETED.**
- ~~**Proceed with Phase 1: Database & Backend updates.**~~ **COMPLETED.**
- ~~**Proceed with Phase 2: Admin UI updates.**~~ **COMPLETED.**
- ~~**Proceed with Phase 3: Frontend Component Development & Updates.**~~ **COMPLETED (Styling Deferred).**
- ~~**Proceed with Phase 4: Display Integration & Review.**~~ **COMPLETED (Styling Deferred).**
- ~~**Proceed with Phase 5: Testing.**~~ **COMPLETED (Basic Functionality).**
- **Future:** Revisit styling for the "Recommended Reading" section, potentially investigating the typography plugin conflict or using manual Tailwind classes.
- **Future:** Address reported NPM vulnerabilities. 