# Persona Page Enhancements Plan

## Overview

This document outlines the plan for enhancing the Persona pages in the admin CMS and the public-facing site. The main changes are:
1.  Adding a "Recommended Reading" section.
2.  Renaming the `role` field to `expertise` and changing its type to `text[]` to better represent persona skills and allow for multiple values (displayed as badges).
3.  Verifying the existing "Related Case Studies" section.

This content is part of the Learning Paths section of the site.

## Key Design Decision 1: Recommended Reading as Structured Markup

- **Recommended Reading** will be stored as a dedicated `TEXT` field in the `personas` table in the database (e.g., `recommended_reading`).
- The user will enter reading list items using the **markdown reference style (`[^1]: Reading item...`)** in a dedicated text area within the admin CMS, consistent with the Algorithm References.
- The backend will store this as a string, and the frontend will parse and render it in a dedicated section on the Persona detail page.
- This approach keeps authoring simple while allowing for structured, consistent rendering, similar to how Steps and References were handled for Algorithms.

### Benefits of This Approach
- **Separation of Concerns:** Recommended reading is distinct from `main_content`, simplifying management and display.
- **Consistent Formatting:** Ensures all Persona pages display reading lists uniformly.
- **Simple Authoring:** Content authors use a familiar text area and markup.
- **Future Flexibility:** Allows migration to a more structured format later if needed.
- **Potential for Linking:** Using this reference-style markup allows for linking inline citations from the `main_content` if desired.

## Key Design Decision 2: Role Field Replaced by Expertise Array

- The existing `role` field (`text`) will be repurposed.
- **Data Type Change:** The column's data type will be changed from `text` to `text[]` (array of text) to allow storing multiple expertise keywords.
- **Rename:** The column will be renamed from `role` to `expertise`.
- This aligns better with the information's purpose (skills/keywords) and allows displaying multiple badges per persona, similar to past designs.
- This leverages existing filtering/searching UI components (`PersonaList.tsx`) with modifications.

## Current State of the Persona Pages

- The `personas` table includes fields like name, slug, description, ~~role~~, main_content (markdown), industries, and `related_case_studies` (an array of IDs).
- The main listing page (`src/app/paths/persona/page.tsx` using `src/components/PersonaList.tsx`) displays published personas with search and **filtering based on the current `role` field**.
- The detail page (`src/app/paths/persona/[slug]/page.tsx`) displays persona details, including role, industries, markdown `main_content`, and **already includes a section displaying related case studies** fetched based on the `related_case_studies` array.

-----------------

## Implementation Plan

### 1. Database Schema Updates
- Add a new `recommended_reading` TEXT field to the `personas` table.
- Change the data type of the `role` column to `TEXT[]`.
- Rename the `role` column to `expertise`.

### 2. Admin Form Component Updates
- Update the Persona admin form (likely `src/app/admin/personas/[id]/page.tsx` or similar) to include a new text area for the `recommended_reading` field.
- Provide clear instructions and potentially placeholder text for the `[^1]: ...` markup format.
- Update the input for the `role` field to handle the renamed `expertise` field and its `text[]` type (e.g., using a tag input component).
- Update form state management and validation for both `recommended_reading` and `expertise`.

### 3. Rendering Logic & Component
- Create a new `RecommendedReadingRenderer` component (e.g., in `src/components/ui/RecommendedReadingRenderer.tsx`) to parse the markup and render the list attractively.
- Adapt logic from `ReferencesRenderer` due to the similar format.
- If desired, implement logic to link inline citations in `main_content` to the reading list.
- Update `PersonaList.tsx`:
    - Adjust filtering logic for the new `expertise` (`text[]`) field (potentially removing the dropdown filter, enhancing text search).
    - Pass the `persona.expertise` array to the `ContentCard`'s `badges` prop.
- Update `src/app/paths/persona/[slug]/page.tsx`:
    - Display multiple badges based on the `persona.expertise` array.

### 4. Display Page Integration
- Update the Persona detail page (`src/app/paths/persona/[slug]/page.tsx`) to:
    - Fetch the `recommended_reading` data along with other persona details.
    - Integrate the `RecommendedReadingRenderer` component to display the section.
    - Add appropriate styling and section headers.
    - Ensure conditional rendering (only show the section if content exists).

### 5. Related Case Studies Verification
- Verify the existing "Related Case Studies" section implementation on the detail page (`src/app/paths/persona/[slug]/page.tsx`).
- Confirm its visibility and functionality. Make minor styling adjustments if needed, but no major refactoring is planned unless issues are found.

### 6. Backend/API Updates
- Ensure server actions or API endpoints handling persona creation/updates correctly read/write the new `recommended_reading` field **and the renamed/typed `expertise` field**.

### 7. Testing & Migration
- Test the full workflow: authoring (including `expertise` tags and recommended reading), saving, rendering, filtering/searching, and potentially linking.
- Address any migration needs for existing persona entries (adding `recommended_reading`, potentially converting existing `role` values to single-element `expertise` arrays).

## Implementation Phases (Proposed)

### Phase 1: Database & Backend -- COMPLETED
- Implement all database schema changes (`recommended_reading` add, `role` type change and rename to `expertise`).
- Update server actions/API endpoints to reflect these schema changes.

### Phase 2: Admin UI -- COMPLETED
- Update the Persona admin form component for both new fields.

### Phase 3: Frontend Component Development & Updates -- IN PROGRESS
- Create the `RecommendedReadingRenderer` component.
- Update `PersonaList.tsx` for `expertise` filtering/search and badges.
- Update `[slug]/page.tsx` for `expertise` badges.

### Phase 4: Display Integration & Review
- Update the Persona detail page (`[slug]/page.tsx`) to fetch and display recommended reading.
- Verify the Related Case Studies section.

### Phase 5: Testing
- Thoroughly test the end-to-end functionality, including migration aspects.

## Next Steps
- ~~Confirm the desired markup format for "Recommended Reading".~~ **Decision:** Use `[^1]: ...` format.
- ~~Confirm if any changes are required for the "Related Case Studies" section.~~ **Decision:** Verify existing implementation.
- ~~**Decision:** Change `role` (text) to `expertise` (text[]).~~
- ~~**Proceed with Phase 1: Database & Backend updates.**~~ **Phase 1 COMPLETED.**
- ~~**Proceed with Phase 2: Admin UI updates.** Start with adding `recommended_reading` and `expertise` fields to the form.~~ **Phase 2 COMPLETED.**
- **Proceed with Phase 3: Frontend Component Development & Updates.** Start with creating `RecommendedReadingRenderer`. 