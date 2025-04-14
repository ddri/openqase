# The Damn Plan: MDX to Database Migration

## Rules for Staying On Target
1. Always verify the current state before making changes
   - Check the existing implementation
   - Review the file's current state
   - Don't assume changes are needed

2. Trust the documentation and plan
   - Follow the plan's structure
   - Believe what's marked as complete
   - Don't try to "fix" what's already working

3. Question assumptions before acting
   - Why am I making this change?
   - Is this really necessary?
   - What evidence do I have?

4. Be methodical in approach
   - One change at a time
   - Verify each step
   - Document what's done

## Critical Rules

⚠️ NEVER modify configuration files (package.json, next.config.ts, etc.) without explicit approval from the project owner. All config changes must be proposed and approved before implementation.

## 1. Verify Pages Using Database vs MDX
### A. Audit all content-loading pages
- [x] `/paths/algorithm/[slug]/page.tsx` - ✅ Using Supabase database
- [x] `/paths/industry/[slug]/page.tsx` - ✅ Using Supabase database
- [x] `/paths/persona/[slug]/page.tsx` - ✅ Using Supabase database via api.ts
- [x] `/blog/page.tsx` - ❌ Still using `getAllContent` from `@/lib/db` (POSTPONED - Blog migration delayed to focus on learning paths and case studies)
- [x] `/blog/[slug]/page.tsx` - ✅ Using Supabase database (POSTPONED - Blog migration delayed to focus on learning paths and case studies)
- [x] `/quantum-stack/[id]/page.tsx` - ✅ Using Supabase database, but still using MDXRemote
- [x] `/case-study/[slug]/page.tsx` - ✅ Using Supabase database correctly
- [x] List pages for each content type
  - `/paths/algorithm/page.tsx` - ✅ Using Supabase database correctly
  - `/paths/industry/page.tsx` - ✅ Using Supabase database correctly
  - `/paths/persona/page.tsx` - ✅ Using Supabase database

### B. Document which pages still use MDX
- [x] Create list of files still importing from `@/lib/mdx`
  1. `docs/architecture-and-recommendations.md` - Documentation only, can be updated
- [x] Create list of files still using `getAllContent` from `@/lib/db`
  1. `/blog/page.tsx` - Using `getAllContent` from `@/lib/db` (POSTPONED)
- [x] Create list of files using MDX-specific components or types
  ✅ All MDX components and types have been removed

## 2. Remove MDX-specific Code
### A. Identify all MDX configuration files
- [x] `.mdx-plugins.js` - Found
- [x] MDX config in `next.config.ts` - Found
- [x] `src/lib/mdx.d.ts` - Found
- [x] Any other MDX type definitions - None found

### B. Identify MDX dependencies in `package.json`
- [x] List all MDX-related packages
  - ❓ Missing from package.json:
    1. `@next/mdx` (imported in next.config.ts)
    2. `next-mdx-remote` (used in quantum-stack)
    3. `remark-gfm` (used in next.config.ts)
    4. `rehype-prism-plus` (used in next.config.ts)
  - Note: These packages might have been removed already but their imports remain
- [x] Check if any are still needed
  - None of the MDX packages are needed as we're moving to Supabase
- [x] Create list for removal
  - Remove imports and configurations for:
    1. `@next/mdx`
    2. `next-mdx-remote`
    3. `remark-gfm`
    4. `rehype-prism-plus`

### C. Remove files and dependencies
- [x] Remove configuration files
  1. ✅ Removed MDX config from `next.config.ts`
  2. ✅ `.mdx-plugins.js` not found (likely already removed)
- [x] Remove type definitions
  1. ✅ Removed `src/lib/mdx.d.ts`
- [x] Remove unused imports
  1. ✅ Removed MDXRemote from quantum stack page
- [x] Update `package.json`
  - ✅ No MDX packages found in package.json

## 3. Test Content Loading
### A. Create test cases for each content type
- [ ] Algorithms
  - 🚧 Applying fixes following established patterns:
    1. Check content field naming (`mdx_content` vs `content`)
    2. Verify back link text consistency
    3. Ensure proper Next.js 15 params handling
    4. Review AuthGate component usage
    5. Verify type synchronization with Supabase
  - 🚧 Fix case studies relationship:
    1. ✅ Verify schema uses array-based relationship (like personas and industries)
    2. ✅ Remove direct join `case_studies (*)`
    3. ✅ Update query to two-step approach:
       - First fetch algorithm data
       - Then fetch related case studies using array references
    4. Follow pattern from working persona and industry pages
- [ ] Industries
  - [ ] Fix case studies query in industry page:
    1. Remove direct case_studies join that assumes foreign key relationship
    2. Add separate query to fetch case studies where industry slug is in their industries array
    3. Update types to reflect the two-query approach
- [ ] Personas
- [ ] Quantum stack layers
- [ ] Blog posts (POSTPONED - Will be migrated in a separate phase)

### B. Test scenarios
- [ ] List views load correctly
- [ ] Detail views load correctly
- [ ] Related content loads correctly
- [ ] Filtering and search work
- [ ] Pagination works (if implemented)

## Progress Tracking
- Started: 2024-03-21
- Current Phase: Final Cleanup
- Status: 🚧 In Progress
- Notes: 
  - ✅ All MDX configuration files and imports have been removed
  - ✅ MDX config removed from next.config.ts
  - ✅ MDX type definitions removed
  - ✅ Quantum stack page updated to use dangerouslySetInnerHTML instead of MDXRemote
  - ✅ Learning path pages (persona, industry, algorithm) are using Supabase correctly
  - ✅ Case study page is already using Supabase correctly
  - ✅ Fixed case study path inconsistencies:
    - Updated links in CaseStudyList to use `/case-study/[slug]`
    - Updated links in persona page to use `/case-study/[slug]`
    - Updated links in home page to use `/case-study`
    - Removed empty incorrect directory at `src/app/case-studies`
  - ✅ Fixed algorithm type definition:
    - Removed non-existent `complexity` field from Algorithm interface
    - Verified alignment with database schema
  - ✅ Cleaned up algorithm fields:
    - Removed unused `quantum_advantage` field from page transformation
    - Removed from Algorithm interface in lib/types.ts
    - Removed from database types
    - Verified no remaining TypeScript references
  - ✅ Fixed navigation consistency:
    - Updated algorithm detail page back link to say "Back to Algorithms"
    - Matches pattern used in persona and industry pages
    - 🚧 Need to fix TypeScript errors introduced by the change
  - 🚧 Remaining tasks:
    - Blog migration: POSTPONED
    - Update documentation to reflect current architecture

## Status Update - March 2024

✅ Content Migration Complete
- All MDX content has been successfully migrated to Supabase
- Case studies, algorithms, industries, and personas are now being served from the database
- Verified working example: https://www.openqase.com/case-study/cleveland-clinic-ibm
- ✅ Fixed case study content display by using mdx_content field

## Current Issues Being Addressed

### Case Study Content Display
1. ✅ Identified correct content field:
   - Content is stored in `mdx_content` field
   - Updated page to use `mdx_content` instead of `content`
   - Content now displays correctly with proper markdown formatting
   - ✅ Fixed case study page to use `mdx_content` field instead of `content`

2. 🚧 Markdown Rendering Not Working:
   - Raw Markdown syntax is displayed instead of formatted content
   - Need to add Markdown processor to convert content to HTML
   - Required Changes:
     1. Install Markdown processing library (recommend `marked` or `remark-html`)
     2. Update case study page to process Markdown before display
     3. Keep existing prose styling for consistent appearance
   - Implementation Plan:
     ```typescript
     // Example implementation with marked
     import { marked } from 'marked';
     
     // In the case study page:
     const htmlContent = marked(caseStudy.mdx_content || '');
     <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
     ```

### TypeScript Errors to Fix
1. Line 20: Expected 0 arguments, but got 1
2. Line 27: Type mismatch in slug parameter
3. Line 42: Missing required 'title' prop in LearningPathLayout
4. Lines 48-59: Property access on potentially undefined fields
5. Line 59: Implicit any type in map function

### Next Actions
1. Fix TypeScript errors in case study page:
   - Add proper typing for createServerClient parameters
   - Add required title prop to LearningPathLayout
   - Add proper type guards for case study fields
   - ✅ Add explicit typing for map function parameters
   - ✅ Add markdown-it rendering for persona content with proper styling and layout

### ContentCard Component Issues
1. ✅ Fixed incorrect field reference in AlgorithmList:
   - Bug: Component was using non-existent `applications` field for badges
   - Fix: Updated to use correct `use_cases` field from schema
   - Location: `src/components/AlgorithmList.tsx`
   - ✅ Verified: Algorithms now sort correctly on the learning paths page
   - ✅ Confirmed: Title sorting works as expected (A-Z)

2. 🚧 Remaining TypeScript Errors:
   - Line 92: Type 'string | null' is not assignable to type 'string'
   - Need to add null check or update ContentCard component to accept nullable description

## Next Steps

1. Clean up:
   - Remove unused MDX-specific code and dependencies
   - Archive or remove the original MDX files (after verifying all content is in Supabase)
   - Update documentation to reflect the new database-driven architecture

2. Path Consistency:
   - Ensure all links across the site use the correct paths:
     - Case Studies: `/case-study/[slug]`
     - Algorithms: `/paths/algorithm/[slug]`
     - Industries: `/paths/industry/[slug]`
     - Personas: `/paths/persona/[slug]`
   - ✅ Fix persona page back link to say "Back to Personas" instead of "Back to Learning Paths"
   - ✅ Fix industry page back link to say "Back to Industries" instead of "Back to Learning Paths"

3. Testing:
   - Add comprehensive tests for database content loading
   - Verify all content is displaying correctly with proper formatting
   - Test search and filtering functionality with the new database backend

## Current Blockers:
1. Type issues with Supabase query results
2. Content migration hasn't been run yet

## Type and Component Migration Issues

### A. Missing Components
1. Audit AuthGate component:
   ✅ Found correct path: `@/components/auth/AuthGate`
   - Current issue: Using wrong path `@/components/auth-gate` in case study page
   - Required props:
     ```typescript
     interface AuthGateProps {
       children: React.ReactNode;
       title: string;      // Required
       description: string; // Required
     }
     ```
   - Example usage from working routes:
     ```typescript
     <AuthGate
       title={algorithm.name}
       description={algorithm.description}
     >
       {/* Content */}
     </AuthGate>
     ```

### B. Algorithm Page Type Issues
1. Type mismatches in `src/app/paths/algorithm/[slug]/page.tsx`:
   - [ ] Database types don't match component props
   - [ ] AuthGate component props need proper typing
   - [ ] Case study relationship types need updating
   - [ ] Supabase client response types need verification

2. Type Synchronization Needed:
   - [ ] Update database.types.ts to match current schema
   - [ ] Verify all algorithm fields are properly typed
   - [ ] Add proper typing for Supabase client usage
   - [ ] Update component prop types to match data structure

### C. General Type Issues
1. Supabase Client Typing:
   - [ ] Add proper Database type to createServerClient
   - [ ] Fix response type handling in queries
   - [ ] Add proper error handling types

2. Component Props:
   - [ ] Update LearningPathLayout props
   - [ ] Fix ContentCard component types
   - [ ] Add proper null checks for optional fields

## Critical Issues Found

### Schema Mismatch in Migration Script
The migration script (`scripts/migrate-mdx-to-db.ts`) is attempting to insert fields that no longer exist in the database schema:

- `mdx_content` (should be just `content`)
- `difficulty` (removed)
- `tags` (removed)
- `metrics` (removed)
- `technologies` (removed)

This explains the migration errors we're seeing. The script needs to be updated to match the current schema before we can successfully migrate the content.

### Action Items
1. Update the migration script to:
   - Remove references to non-existent fields
   - Map MDX content to the correct `content` field
   - Ensure all required fields are properly populated
2. Run a test migration with a single case study to verify the changes
3. Only then proceed with the full migration 

## Schema Relationship Fixes

### A. Current State
1. Many-to-many relationships exist in data but not schema:
   - Personas have `related_case_studies` array (storing slugs)
   - Case studies have `personas` array (storing slugs)
   - No actual database foreign key relationships

2. This causes failures when trying to join:
   ```
   Could not find a relationship between 'personas' and 'case_studies'
   ```

### B. Required Changes
1. Create Junction Table
   ```sql
   create table persona_case_studies (
     id uuid default uuid_generate_v4() primary key,
     persona_id uuid references personas(id) on delete cascade,
     case_study_id uuid references case_studies(id) on delete cascade,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null,
     unique(persona_id, case_study_id)
   );
   ```

2. Migration Steps
   - Create junction table
   - For each persona:
     1. Get `related_case_studies` array
     2. Look up case study IDs by slugs
     3. Insert relationships into junction table
   - For each case study:
     1. Get `personas` array
     2. Look up persona IDs by slugs
     3. Insert relationships into junction table (skip if already exists)
   - Remove `related_case_studies` from personas table
   - Remove `personas` from case studies table

3. Update Queries
   - Update persona page query to use proper join:
     ```typescript
     .from('personas')
     .select(`
       *,
       case_studies!persona_case_studies(*)
     `)
     ```

### C. Testing
1. Verify Data Migration
   - All relationships preserved
   - No orphaned references
   - No duplicate relationships

2. Test Queries
   - Persona page loads with case studies
   - Case study page loads with personas
   - Related content properly linked

### D. Rollback Plan
1. Keep original arrays until verified
2. Script to restore from arrays if needed
3. Only remove arrays after full testing 

## Query Implementation Fix

### A. Current Issue
- Attempting to join `personas` and `case_studies` tables directly
- Error: "Could not find a relationship between 'personas' and 'case_studies'"
- Current approach assumes foreign key relationships that don't exist

### B. Correct Approach
1. Use Array-Based Queries
   - Schema already supports array relationships:
     - `personas` has `related_case_studies text[]`
     - `case_studies` has `personas text[]`
   - Arrays store slugs as references
   - GIN indexes already exist for performance

2. Implementation Pattern
   ```typescript
   // 1. Get the persona
   const { data: persona } = await supabase
     .from('personas')
     .select('*')
     .eq('slug', slug)
     .single();

   // 2. Get related case studies using slugs
   if (persona?.related_case_studies?.length > 0) {
     const { data: caseStudies } = await supabase
       .from('case_studies')
       .select('*')
       .in('slug', persona.related_case_studies);
   }
   ```

3. Benefits
   - Simpler implementation
   - Works with existing schema
   - No schema changes needed
   - Matches content relationship model
   - More flexible than strict foreign keys

4. Considerations
   - Two queries instead of one join
   - Need proper error handling
   - Validate existence of referenced slugs

### C. Implementation Steps
1. Update Persona Page ✅
   - Modify query to use two-step approach ✅
   - Add debug logging to verify ✅
   - Test with existing persona ✅
   - NOTE: Debug logging intentionally kept for monitoring

2. Clean Up
   - [ ] Remove debug logging (postponed - keeping for monitoring)
   - [ ] Ensure error handling
   - [ ] Update types if needed

3. Verify
   - [x] Test with multiple personas
   - [x] Check case study loading
   - [x] Verify all relationships work

### D. Testing
1. Verify Data Migration
   - All relationships preserved
   - No orphaned references
   - No duplicate relationships

2. Test Queries
   - Persona page loads with case studies
   - Case study page loads with personas
   - Related content properly linked

### E. Future Tasks
1. Debug Cleanup (After Stability Verified)
   - Remove console.log statements from:
     - Metadata query results
     - Persona fetch results
     - Case studies fetch results
   - Currently keeping for:
     - Production monitoring
     - Relationship debugging
     - Query verification

2. Visual Improvements
   - Fix dark mode card backgrounds
   - Review duplicate description display
   - Check LearningPathLayout styling

## Critical Issues Found

### Schema Mismatch in Migration Script
The migration script (`scripts/migrate-mdx-to-db.ts`) is attempting to insert fields that no longer exist in the database schema:

- `mdx_content` (should be just `content`)
- `difficulty` (removed)
- `tags`

## Algorithm Page Sorting Debug Progress (2024-04-13)

1. Initial Problem:
   - Error: `TypeError: undefined is not an object (evaluating 'a.title.localeCompare')`
   - Location: Algorithm list sorting in `/paths/algorithm` page

2. Investigation Steps:
   - Added logging to page component to trace data flow from database
   - Added logging to AlgorithmList component to trace data processing
   - Discovered potential issue: duplicate algorithms with different data
     - Example: 'qft' and 'quantum-fourier-transform-algorithm'
     - Example: 'variational-quantum-eigensolver' and 'variational-quantum-eigensolver-vqe-algorithm'

3. Current Status:
   - Database query working correctly
   - Data transformation (name → title) working
   - AlgorithmList receiving transformed data
   - Added detailed sort comparison logging to debug exact values being compared

4. Next Steps:
   - Review new sort comparison logs
   - Determine if duplicate algorithms are causing the sort error
   - Follow one-change-at-a-time approach to fix once root cause is confirmed

## Learning Paths Consistency
All learning paths (persona, industry, algorithm) follow the same pattern:
- Root page (`/paths/{type}/page.tsx`) lists all items
- Slug page (`/paths/{type}/[slug]/page.tsx`) shows details
- Uses `mdx_content` field for rich content rendering via MarkdownIt
- Shows related case studies when applicable
- Consistent database schema pattern:
  - Base fields (name, description, etc.)
  - `mdx_content` field for rich content
  - Type-specific fields (e.g. `key_applications` for algorithms)

## Learning Path Data Fetching Standard
All learning paths should follow this pattern for data fetching and typing:

1. Type Definition:
```typescript
type Entity = Database['public']['Tables']['table_name']['Row'];
```

2. Data Fetching Function:
```typescript
async function getEntities() {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('table_name')
    .select()
    .order('name');

  if (error) {
    console.error('Error fetching entities:', error);
    return [];
  }

  return data as Entity[];
}
```

3. Page Component:
```typescript
export default async function EntitiesPage() {
  const entities = await getEntities();
  return <EntityList entities={entities} />;
}
```

This approach provides:
- Explicit type safety using database schema types
- Consistent error handling
- Separation of concerns (data fetching vs presentation)
- Maintainable and testable code structure

## Standardizing Learning Path Data Fetching

### Current State
1. Industry page: ✅ Using correct pattern
   ```typescript
   type Industry = Database['public']['Tables']['industries']['Row'];
   async function getIndustries() {
     // Proper error handling and type assertion
     return data as Industry[];
   }
   ```

2. Persona page: ❌ Needs update
   ```typescript
   // Currently mixing data fetching with presentation
   // No explicit type safety or error handling
   const { data: personas } = await supabase.from('personas').select('*');
   ```

3. Algorithm page: ❌ Needs update
   ```typescript
   // Currently doing complex transformation
   // Not following standard pattern
   const transformed = data.map((alg: DbAlgorithm): Algorithm => ({...}));
   ```

### Implementation Order
1. Update persona page first (simplest change)
   - Add type definition
   - Extract data fetching function
   - Add error handling
   - Use type assertion

2. Update algorithm page second
   - Remove complex transformation
   - Follow same pattern as industry page
   - Fix any TypeScript errors one at a time

3. Verify consistency
   - All pages use same pattern
   - All have proper error handling
   - All use database types directly

### Why This Order
- Start with simpler change (persona) to validate approach
- Then tackle more complex change (algorithm)
- Follows "one change at a time" rule
- Allows verification at each step

## Database Type Standard
All pages should follow the industry page pattern for database types:

1. Import Database type from Supabase:
```typescript
import type { Database } from '@/types/supabase';
```

2. Define table type inline:
```typescript
type Entity = Database['public']['Tables']['table_name']['Row'];
```

3. Use type assertion in data fetching:
```typescript
return data as Entity[];
```

Example (from working industry page):
```typescript
import type { Database } from '@/types/supabase';

type Industry = Database['public']['Tables']['industries']['Row'];

async function getIndustries() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('industries')
    .select()
    .order('name');

  if (error) {
    console.error('Error fetching industries:', error);
    return [];
  }

  return data as Industry[];
}
```

### Implementation Order
1. Update persona page to match industry pattern exactly
2. Update algorithm page to match industry pattern exactly
3. Remove any complex transformations and match the simple pattern that works

## Migration Status Update (2024-04-13)

### Completed Tasks
1. ✅ Migration script updated to handle correct fields
2. ✅ Content successfully migrated to database
3. ✅ Pages updated to use Supabase:
   - ✅ Algorithm pages (root and [slug])
   - ✅ Industry pages (root and [slug])
   - ✅ Persona pages (root and [slug])
   - ✅ Case Study pages (root and [slug])
4. ✅ MDX content properly rendered using markdown-it
5. ✅ Basic styling and layout restored

### Current Issues
1. TypeScript Errors:
   - [ ] Case study page type mismatches
   - [ ] Supabase client typing in various components
   - [ ] Database types synchronization needed

2. Content Display:
   - [ ] Verify all markdown formatting
   - [ ] Check image rendering
   - [ ] Ensure proper heading hierarchy

3. Navigation:
   - [ ] Verify all internal links
   - [ ] Update any remaining MDX-style paths
   - [ ] Test breadcrumb navigation

### Next Steps
1. Fix TypeScript Errors:
   - Update database.types.ts to match current schema
   - Properly type Supabase client usage
   - Fix component prop types

2. Content Verification:
   - Test all pages with actual content
   - Verify markdown rendering
   - Check related content links

3. Cleanup:
   - Remove unused MDX-related code
   - Clean up debug logging
   - Add automated tests