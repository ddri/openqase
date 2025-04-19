# Database Cleanup Plan

This document outlines the cleanup tasks needed after dropping the following fields from the `case_studies` table:
- `difficulty`
- `tags`
- `metrics`
- `technologies`
- `stack_layers`

## Areas to Clean Up

### 1. Type Definitions
- **Files to Update**:
  - `src/lib/database.types.ts`
  - `src/types/supabase.ts`
  - Any other TypeScript interfaces that reference these fields

### 2. API Routes
- **Files to Update**:
  - `src/app/api/case-studies/route.ts` - Remove references in filtering, form handling
  - `src/app/api/case-studies/[slug]/route.ts` - Remove references in related case studies logic

### 3. Admin UI
- **Files to Update**:
  - `src/app/admin/case-studies/[id]/page.tsx` - Remove form fields for these properties
  - Any other admin pages that reference these fields

### 4. Frontend Components
- **Files to Update**:
  - `src/components/CaseStudyList.tsx` - Remove filtering and display logic for these fields
  - Any other components that display or filter by these fields

### 5. Migration Scripts
- **Files to Update**:
  - `scripts/migrate-content.ts`
  - `scripts/migrate-mdx-to-db.ts` - Remove references in the case study migration

### 6. CSS
- **Files to Update**:
  - `src/app/globals.css` - Remove styles for badges and containers related to these fields

### 7. Documentation
- **Files to Update**:
  - `docs/supabase-schema.md` - Update the schema documentation
  - Any other documentation that references these fields

### 8. Database Indexes
- **SQL to Run**:
  - Drop the GIN indexes for `tags` and `technologies` if they exist:
    ```sql
    DROP INDEX IF EXISTS case_studies_tags_idx;
    DROP INDEX IF EXISTS case_studies_technologies_idx;
    ```

### 9. Content Files
- **Consideration**:
  - The MDX frontmatter in content files still contains these fields
  - You might want to clean these up or just ignore them since they won't be used

## Approach to Cleanup

1. **Start with Type Definitions**: Update the TypeScript interfaces first to avoid type errors
2. **Update API Routes**: Modify the API routes to handle the absence of these fields
3. **Update Frontend Components**: Remove references in components
4. **Update Admin UI**: Remove form fields and related logic
5. **Update Migration Scripts**: Remove references in migration scripts
6. **Clean up CSS**: Remove unused styles
7. **Update Documentation**: Update schema documentation
8. **Drop Database Indexes**: Remove any indexes related to these fields

This systematic approach will help ensure you don't miss any references to these fields and will keep your codebase clean and consistent. 