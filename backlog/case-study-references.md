# Case Study References Feature Implementation Plan

## Overview
Add a references section to case studies, identical to what exists on Algorithm pages. This will allow citing academic papers, industry reports, and other sources using footnote citation style.

## User Stories
- As a content editor, I want to add references to case studies so readers can find additional resources.
- As a researcher, I want to see the sources behind case study claims so I can verify information and explore further.
- As a site admin, I want consistent reference formatting across the platform to maintain professional quality.

## Database Changes
1. Update the `case_studies` table in Supabase:
   - Add a new field `academic_references` (TEXT type) to match the algorithms implementation
   - Default value: NULL

## Implementation Approach
References will be stored as formatted text using markdown footnote syntax:
```
[^1]: Author, Title, Journal (Year)
[^2]: Another reference
```

Content editors will be able to cite these references in the main content using the same syntax: `[^1]`, `[^2]`, etc.

## Admin UI Changes
1. Update case study forms (`client.tsx` and `client-new.tsx`):
   - Add an "Academic References" section with a textarea input, identical to the algorithms implementation
   - Include guidance text explaining the footnote citation format
   - Update validation rules in `form-validation.ts` if needed

## Public UI Changes
1. Update the case study detail page:
   - Add a dedicated "References" section
   - Use the same `ReferencesRenderer` component used in algorithm pages
   - Display references in the same formatted style

## Implementation Steps

### Phase 1: Database Setup
1. Update the Supabase schema to include the `academic_references` TEXT field
2. Update TypeScript types in `types/supabase.ts`

### Phase 2: Admin UI Implementation
1. Add textarea for academic references in the case study form
2. Include helper text explaining the footnote citation format
3. Update form state management to handle the new field
4. Ensure the field is saved to the database

### Phase 3: Public UI Implementation
1. Update the case study detail page to display references
2. Reuse the existing `ReferencesRenderer` component
3. Ensure proper styling and formatting

### Phase 4: Testing & Refinement
1. Test creation and editing of references in admin UI
2. Verify display on public case study pages
3. Check that footnote citations work correctly in the main content
4. Gather feedback from content team

## Acceptance Criteria
- Content editors can add references using the same footnote citation format used in algorithms
- References are displayed in a consistent format on public case study pages
- Inline citations are properly linked to the references section 