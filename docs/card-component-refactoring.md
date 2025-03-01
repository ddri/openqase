# Card Component Refactoring Documentation

## Work Completed So Far

1. **Theme System Implementation**
   - Fixed hydration errors by implementing a client-side only theme system
   - Set dark theme as the default with proper theme variables
   - Added mounting state to prevent hydration mismatches

2. **Card Height Standardization**
   - Updated the base Card component (`src/components/ui/card.tsx`) to accept:
     - `fixedHeight` prop - Boolean to enable fixed height mode
     - `height` prop - Number parameter for specific pixel height
   - Updated CardHeader to accept `flexGrow` prop for proper content distribution
   - Set default height to 210px
   - Created documentation for recommended heights by page type

3. **Theme Variable Replacement**
   - Replaced hardcoded colors with theme variables (e.g., changed `text-gray-900` to `text-[var(--text-primary)]`)
   - Ensured proper dark mode support across components

## Card Component Analysis

We've identified three different card components in the codebase:

1. **Base Card Component** (`src/components/ui/card.tsx`)
   - Generic, composable card with subcomponents (CardHeader, CardTitle, etc.)
   - Recently enhanced with height parameters for consistent sizing
   - Used in some pages of the application

2. **ContentCard Component** (`src/components/ContentCard.tsx`)
   - Specialized card for content items
   - Custom implementation not using the base Card component
   - Uses its own styling approach

3. **PathCard Component** (`src/components/PathCard.tsx`)
   - Specialized card for learning paths
   - Also not using the base Card component
   - Includes unique features like an aspect ratio container for images

## Decision Pending

We need to decide on a strategy for handling these multiple card implementations:

**Option 1: Keep Separate Components**
- Maintain separate specialized card components
- Add height control to each card type
- Accept potential inconsistencies and maintenance overhead

**Option 2: Refactor to Single Card System (Preferred)**
- Rebuild specialized cards using the base Card component internally
- Maintain the specialized APIs but implement them using Card composition
- Ensure consistent styling and behavior across all pages

We are leaning towards Option 2 (refactoring to a single card system) for these reasons:
- Better consistency across the application
- Reduced maintenance burden
- Easier application of system-wide changes
- Better adherence to the DRY principle

## Next Steps

1. **Inventory Card Usage**
   - Identify all pages using ContentCard and PathCard components
   - Document specific styling and behavior requirements for each

2. **Create Refactored Components**
   - Rebuild ContentCard and PathCard using base Card composition
   - Maintain the same API to minimize changes to consuming pages
   - Incorporate height parameters consistently

3. **Page Updates**
   - Update page implementations to use appropriate fixed heights
   - Ensure consistent card appearance across different page types

4. **Testing**
   - Verify consistent card heights within each page type
   - Test theme switching to ensure proper styling in both modes
   - Confirm no regression in existing functionality

## Relevant Files

- `src/components/ui/card.tsx` - Base card component with height parameters
- `src/components/ContentCard.tsx` - Custom content card implementation
- `src/components/PathCard.tsx` - Custom path card implementation
- `src/app/paths/page.tsx` - Learning paths page using Card component
- `src/app/paths/industry/page.tsx` - Industry page using Card component
- `src/app/paths/persona/page.tsx` - Persona page that may be using PathCard
- `src/app/case-study/page.tsx` - Case studies page that may be using ContentCard

## Resuming This Work

When resuming this work:

1. First review this document to understand the context and decisions made
2. Check the implementation status of the refactoring plan
3. Prioritize consistent card height implementation across all pages
4. Focus on component composition rather than duplication
5. Ensure all pages maintain proper theme variable usage
6. Verify all refactored components support both light and dark themes

For each page type, refer to this height reference:
- Industries: 210-220px
- Case Studies: 260px
- Algorithms: 280px
- Personas: 320px
- Learning Paths: 340px

The primary goal is to unify the card implementation approach while maintaining the visual distinctiveness of each section.