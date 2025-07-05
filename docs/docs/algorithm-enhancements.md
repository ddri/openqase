# Algorithm Page Enhancements Plan

## Overview

This document outlines the plan for enhancing the Algorithm pages in the admin CMS, specifically Steps and References. This content feeds the Algorithms content section in the Learning Paths section of the site.

## Key Design Decision 1: Steps as Structured Markup in a Text Field

- **Steps** will be stored as a dedicated TEXT field in the database.
- The user will enter steps using the `<steps><step>...</step></steps>` syntax, just like in the old MDX files.
- The backend will store this as a string, and the frontend will parse and render it in the desired, educational format.
- This approach keeps authoring simple and familiar, while still allowing for structured, consistent rendering.

### Benefits of This Approach for Steps
- **Separation of Concerns:** Steps are not mashed into `main_content`, making them easier to manage, update, and display.
- **Consistent Formatting:** All algorithm pages display steps in the same way, regardless of author.
- **Simple Authoring:** Content authors/editors can add/edit steps in a single text area, using familiar markup.
- **Future Flexibility:** If needed, the steps field could later be migrated to a more structured format.

## Key Design Decision 2: References as Structured Markup in a Text Field

- Use a dedicated references text field in the database (named `academic_references`).
- Provide a single text area in the UI for pasting all references, just like the Steps field.
- Continue using the familiar markup/syntax for references (e.g., numbered or custom tags).
- Ensure the frontend can parse inline/footnote reference markers in main_content and link them to the correct reference entry (as in your old MDX workflow).
- Keep things simple for now, with the option to move to a more dynamic/structured system later.

### Benefits of This Approach for References
- **Simplicity:** This keeps the workflow fast and easy, especially for bulk entry and migration of existing content.
- **Consistency:** It matches the Steps approach, so the authoring experience is uniform.
- **Flexibility:** You can always refactor to a more dynamic, structured system later if/when you need features like citation management, validation, or export.
- **Technical Feasibility:** Parsing inline/footnote markers and linking them to the correct reference is straightforward if you keep a consistent syntax (e.g., [1], [^1], or `<ref id="1">`).
- **Migration:** This approach makes it easy to migrate your old MDX content and maintain compatibility with your existing reference/citation style.


## Current State of the Algorithms page

The current Algorithm form in `src/app/admin/algorithms/[id]/client.tsx` includes fields for:
- Basic info (name, slug, description)
- Main content
- Technical details (quantum advantage, use cases)
- Relationships (related case studies, industries)

However, it's missing the Steps and References sections which are essential for properly documenting algorithms.

-----------------

## Implementation Plan

### 1. Database Schema Updates -- DONE!

Changed the following fields in the algorithms table:
- `steps`: TEXT field to store the steps markup as a string
- `academic_references`: TEXT field to store the references markup as a string


### 2. Form Component Updates -- DONE!

- Added text area for Steps, with instructions for `<step title="Step Title">...</step>` markup.
- Added text area for References, with instructions for `[^1]: Reference text` markup.

### 3. Rendering Logic -- DONE!

- Implemented parsers/renderers for Steps and References markup to display in the desired format.
- Implemented logic to parse and link inline/footnote reference markers in `main_content` to the correct reference entries.

### 4. Validation and Authoring -- DONE!

- Added content validation for Steps and References fields.
- Provided clear authoring instructions and placeholders for both fields.

### 5. Testing & Migration

- Test the full workflow: authoring, saving, rendering, and linking references.
- Migrate any existing content as needed.

### 6. Update Server Actions -- DONE!

Updated the algorithm form state and server actions to handle the new fields.

## Implementation Phases

### Phase 1: Database Updates -- COMPLETED
- Created and ran migration to add the new fields to the algorithms table

### Phase 2: Component Development -- COMPLETED
- Created the StepsRenderer and ReferencesRenderer components
- Implemented parsing and rendering logic for both components
- Created utility function for processing references in content

### Phase 3: Form Integration -- COMPLETED
- Updated the AlgorithmForm component to include the new fields in state
- Added the Steps and References sections to the form
- Updated validation rules to include the new fields

### Phase 4: Display Integration -- COMPLETED
- Updated the algorithm display page to use the new components
- Added proper styling and section headers
- Integrated reference processing with markdown rendering

## Progress Update

### Completed Components

#### ReferencesRenderer Component
✅ Created a new component in `src/components/ui/ReferencesRenderer.tsx` that:
- Parses academic references from markdown text in format `[^1]: Reference text`
- Renders references with proper numbering and styling
- Provides `processContentWithReferences()` utility function to convert citations in content to links
- Implements all planned functionality from design decision #2

The ReferencesRenderer component:
- Accepts a `referencesMarkup` prop containing the markdown references
- Parses each reference with regex to extract ID and content
- Renders a styled "References" section with numbered entries
- Uses markdown-it to render formatted content within each reference
- Maintains consistent styling with the rest of the site

The `processContentWithReferences` utility function:
- Converts inline citations like `[^1]` to clickable links `<a href="#reference-1">[1]</a>`
- Ensures proper linking between citations in the main content and the references section

#### StepsRenderer Component
✅ Created a new component in `src/components/ui/StepsRenderer.tsx` that:
- Parses step markup in the format `<step title="Step Title">step content</step>`
- Renders steps in a clear, numbered format with the Steps and Step UI components
- Uses markdown-it to render formatted content within each step
- Implements all planned functionality from design decision #1

#### Algorithm Form Updates
✅ Updated the algorithm form in `src/app/admin/algorithms/[id]/client.tsx`:
- Added text areas for Steps and References fields with clear instructions
- Added informative helper text explaining the markup format
- Updated the state management to include the new fields
- Provided placeholder examples showing correct formatting

#### Algorithm Display Page
✅ Updated the algorithm display page in `src/app/paths/algorithm/[slug]/page.tsx`:
- Integrated StepsRenderer and ReferencesRenderer components
- Added appropriate styling and section headers
- Used the `processContentWithReferences` function to handle citations
- Enhanced the page's typography and styling for better readability
- Added conditional rendering to show Steps and References sections only when content is available

### Current Status
All planned enhancements have been implemented successfully, including:
- Database schema updates
- Form component updates for authoring
- Rendering logic for display
- Server actions updates
- Type definitions in the Algorithm interface

Content creators can now add structured steps and academic references to algorithms using the familiar markup format, and these will be rendered properly on the algorithm pages with appropriate styling and formatting.

### Next Steps
- Continue monitoring for any issues or feedback from content creators
- Consider adding validation for the steps and references formats
- Consider supporting additional reference styles in the future if needed 