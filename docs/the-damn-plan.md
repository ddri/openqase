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

⚠️ THIS IS A NEXT.JS 15 PROJECT
- ALWAYS use Next.js 15 patterns and best practices
- DO NOT assume Next.js 13 patterns
- DO NOT copy/paste solutions from older Next.js versions
- When searching for solutions, explicitly search for Next.js 15
- When reviewing code, verify it follows Next.js 15 patterns
- Question any implementation that looks like it's from an older Next.js version

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

### Type Synchronization
1. ✅ Fixed user preferences type synchronization:
   - Updated `user_preferences` table in `database.types.ts` to include `role` field
   - Made `UserPreferences` interface match database types exactly
   - Fixed nullable fields to match database schema
   - Verified type consistency between interface and database schema

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
1. ✅ Added `mdx_content` and other fields to database types
   - Verified field types against migration file
   - Added proper typing for array fields
   - Updated interfaces to match database schema

2. ✅ Case Study Edit Page TypeScript Errors
   - ✅ Added Database type export with all tables
   - ✅ Created checkbox component with proper types
   - ✅ Fixed Supabase client typing
   - ✅ Added proper types for map functions

3. ✅ Form Submission Handling
   - ✅ Updated API route to handle array fields
   - ✅ Added validation for JSON fields (metrics)
   - ✅ Added proper error handling
   - ✅ Implemented proper form submission with all fields

4. ✅ UI Improvements
   - ✅ Added loading states
   - ✅ Added error messages
   - ✅ Added success notifications
   - ✅ Improved form organization with tabs

5. Next Steps:
   a. Testing:
      - Test form submission with all fields
      - Test validation
      - Test error handling
   
   b. Content Management:
      - Implement list view for case studies
      - Add sorting and filtering
      - Add search functionality
   
   c. Other Content Types:
      - Apply same pattern to algorithms, industries, personas
      - Create reusable components for common functionality
      - Ensure consistent UI across all content types

6. Remaining Issues:
   - Need to implement list view for case studies
   - Need to add search and filtering functionality
   - Need to apply same pattern to other content types
   - Need to create reusable components for common functionality

### Next Actions
1. Fix TypeScript errors in case study page:
   - Add proper typing for createServerClient parameters
   - Add required title prop to LearningPathLayout
   - Add proper type guards for case study fields
   - ✅ Add explicit typing for map function parameters
   - ✅ Add markdown-it rendering for persona content with proper styling and layout

### Environment Configuration
1. ✅ Standardize admin email across environments:
   - Use `davedri@gmail.com` as the consistent admin email
   - Added to `.env.example` as reference
   - Document in deployment guide

2. ✅ Environment Setup Process:
   - Copy `.env.example` to `.env.local` for local development
   - Set up same admin email in Supabase cloud instance
   - Ensure consistent auth behavior across environments

3. ✅ Auth Middleware Updates:
   - Added proper admin route protection
   - Added role-based access control
   - Improved redirect handling for protected routes
   - Added proper session checks

4. Development Method Improvements:
   - Use real email addresses for testing
   - Maintain consistency between local and cloud environments
   - Document environment-specific configurations

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

## Admin Interface Plan

### A. Requirements
1. Content Management:
   - [ ] Create new personas, algorithms, industries, and case studies
   - [ ] Edit existing content
   - [ ] Markdown editor for rich content
   - [ ] Preview rendered content
   - [ ] Manage relationships between content types

2. Authentication & Authorization:
   - [x] Admin-only access
   - [x] Role-based permissions
   - [ ] Audit logging for changes

3. Data Validation:
   - [ ] Required fields validation
   - [ ] Slug uniqueness check
   - [ ] Relationship integrity
   - [ ] Markdown syntax validation

### B. Implementation Approach
1. Phase 1: Basic CRUD
   - [x] Create `/admin` route with authentication
   - [ ] Implement basic forms for each content type
   - [x] Use Supabase's built-in auth for admin access
   - [ ] Start with simple text fields and basic markdown

2. Phase 2: Rich Content
   - [ ] Add markdown editor (e.g., TipTap or MDX Editor)
   - [ ] Implement live preview
   - [ ] Add image upload support
   - [ ] Add relationship management UI

3. Phase 3: Advanced Features
   - [ ] Add bulk operations
   - [ ] Implement version history
   - [ ] Add content scheduling
   - [ ] Add export/import functionality

### C. Technical Stack
1. Frontend:
   - Next.js App Router
   - React Hook Form for form handling
   - TipTap for rich text editing
   - Tailwind CSS for styling

2. Backend:
   - Supabase for database and auth
   - Row Level Security (RLS) for data protection
   - Storage for media files

### D. UI/UX Design with Shadcn/UI

1. Admin Dashboard Layout:
   ```
   +------------------+------------------------------------------+
   |     Logo         |  Content Management                     |
   +------------------+------------------------------------------+
   |  Navigation      |  [Search]  [New Content]  [Settings]    |
   |  - Case Studies  |                                          |
   |  - Algorithms    |  +------------------------------------+  |
   |  - Industries    |  |  Title  | Type  | Status | Actions |  |
   |  - Personas      |  +------------------------------------+  |
   |                  |  | Case... | Case  | Draft  | [Edit]  |  |
   |  [User Profile]  |  | Algo... | Algo  | Pub... | [View]  |  |
   |                  |  | Ind...  | Ind   | Pub... | [Del]   |  |
   +------------------+  +------------------------------------+  |
   ```

2. Content Editor Layout:
   ```
   +----------------------------------------------------------+
   |  [Back]  Edit Case Study  [Save]  [Preview]  [Publish]   |
   +----------------------------------------------------------+
   |  Title: [_____________________________]                   |
   |  Slug:  [_____________________________]                   |
   |                                                           |
   |  Description:                                            |
   |  [Rich Text Editor with Toolbar]                         |
   |  +---------------------------------------------------+   |
   |  |                                                   |   |
   |  |                                                   |   |
   |  +---------------------------------------------------+   |
   |                                                           |
   |  Relationships:                                          |
   |  [ ] Related Algorithms  [ ] Related Industries          |
   |  +-------------------------------------------+           |
   |  | Algorithm 1  [x]  Algorithm 2  [x]       |           |
   |  +-------------------------------------------+           |
   +----------------------------------------------------------+
   ```

3. Components to Use:
   - Navigation:
     ```tsx
     <NavigationMenu>
       <NavigationMenuList>
         <NavigationMenuItem>
           <NavigationMenuTrigger>Case Studies</NavigationMenuTrigger>
           <NavigationMenuContent>
             <ul className="grid w-[400px] gap-3 p-4">
               <li><NavigationMenuLink>All Case Studies</NavigationMenuLink></li>
               <li><NavigationMenuLink>New Case Study</NavigationMenuLink></li>
             </ul>
           </NavigationMenuContent>
         </NavigationMenuItem>
       </NavigationMenuList>
     </NavigationMenu>
     ```

   - Data Table:
     ```tsx
     <DataTable
       columns={[
         { accessorKey: "title", header: "Title" },
         { accessorKey: "type", header: "Type" },
         { accessorKey: "status", header: "Status" },
         {
           id: "actions",
           cell: ({ row }) => (
             <DropdownMenu>
               <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
               <DropdownMenuContent>
                 <DropdownMenuItem>Edit</DropdownMenuItem>
                 <DropdownMenuItem>View</DropdownMenuItem>
                 <DropdownMenuItem>Delete</DropdownMenuItem>
               </DropdownMenuContent>
             </DropdownMenu>
           ),
         },
       ]}
       data={content}
     />
     ```

   - Form Layout:
     ```tsx
     <Form>
       <FormField
         name="title"
         render={({ field }) => (
           <FormItem>
             <FormLabel>Title</FormLabel>
             <FormControl>
               <Input {...field} />
             </FormControl>
           </FormItem>
         )}
       />
       <FormField
         name="content"
         render={({ field }) => (
           <FormItem>
             <FormLabel>Content</FormLabel>
             <FormControl>
               <TipTapEditor {...field} />
             </FormControl>
           </FormItem>
         )}
       />
     </Form>
     ```

4. Key Features:
   - Responsive sidebar navigation
   - Searchable data tables with sorting
   - Rich text editor with markdown support
   - Relationship management with multi-select
   - Preview mode for content
   - Status indicators and badges
   - Action menus for each item

5. Color Scheme:
   - Primary: Your brand color
   - Secondary: Neutral grays
   - Success: Green for published
   - Warning: Yellow for drafts
   - Error: Red for errors/deletions

### E. Implementation Progress

#### Completed Tasks
1. ✅ Admin Layout:
   - Created modern sidebar with Shadcn/UI components
   - Added user profile section
   - Implemented navigation with icons
   - Added search functionality
   - Added sign out button

2. ✅ Fixed TypeScript Error in Admin Layout:
   - Updated database types to include `role` field in `user_preferences` table
   - Added proper type assertion for Supabase query result
   - Used `Pick` to select only the `role` field from `UserPreferences` type
   - Added error handling for database queries
   - Location: `src/app/admin/layout.tsx` and `src/types/supabase.ts`

#### Admin Access Setup
1. ✅ Current State Verified:
   - User exists in Supabase cloud (davedri@gmail.com)
   - User ID: 2c956050-3a2b-4de4-9e39-942b9ee9f402
   - Account is confirmed and active
   - Authentication is working

2. ✅ Local Development Setup:
   - Reset local database with migrations
   - Created local user account
   - Set up admin role in user_preferences
   - Verified role assignment

3. 🚧 Required Steps:
   - [x] Verify user_preferences table structure
   - [x] Add/update admin role for existing user
   - [ ] Test `/admin` access
   - [ ] Document the process for future reference

4. Implementation Rules:
   - Make minimal necessary changes
   - Verify each step before proceeding
   - Use existing user account
   - Focus on cloud instance first, then local development

#### Admin Access Verification
1. Test admin layout access
2. Verify role-based checks in admin layout
3. Test admin-only API endpoints
4. Document admin access requirements

#### Current Issues
1. ~~TypeScript Error in Admin Layout:~~
   ~~```
   Line 33: Property 'role' does not exist on type '{ role: any; } | SelectQueryError<"Processing node failed."> | SelectQueryError<"Could not retrieve a valid record or error value">'.
   Property 'role' does not exist on type 'SelectQueryError<"Processing node failed.">'
   ```~~
   ~~- This error occurs because the Supabase query result type doesn't properly handle the user preferences table~~
   ~~- Need to properly type the user preferences table in the database types~~
   ~~- Solution: Update the Database type in `src/types/supabase.ts` to include the user_preferences table with proper typing~~

#### Next Steps
1. ~~Fix TypeScript Error:~~
   ~~- Update database types to include user_preferences table~~
   ~~- Add proper typing for the role field~~
   ~~- Update the admin layout to handle potential errors~~

2. Implement Content Management Pages:
   - Start with case studies list page
   - Add data table with sorting and filtering
   - Implement create/edit forms

3. Add Rich Text Editor:
   - Integrate TipTap for markdown editing
   - Add preview functionality
   - Implement image upload

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

## Technical Documentation

### Authentication System

#### 1. Authentication Flow

1. **Login/Logout Process**
   - Entry point: `/auth` page
   - Uses Supabase Auth UI with custom theme
   - Handles redirects via `redirectTo` parameter
   - Success flow: `/auth/callback` → original destination
   - Logout: Clears session, redirects to home

2. **AuthGate Component** (Content Protection)
   - Client-side protection wrapper
   - Shows friendly warning for unauthenticated users
   - Customizable titles and descriptions per section
   - Redirects to `/auth` with proper `redirectTo`
   - Used on learning paths, case studies, quantum stack

3. **Admin Access**
   - Protected by middleware
   - Requirements:
     - Valid session
     - User role = 'admin' in `user_preferences`
   - Redirects unauthorized users to home
   - Admin routes defined in middleware

#### 2. Protection Layers

1. **Server-Side (Middleware)**
   ```typescript
   Protected Routes:
   - /paths/*
   - /case-study/*
   - /quantum-stack/*
   - /profile
   
   Admin Routes:
   - /admin/*
   ```

2. **Client-Side (AuthGate)**
   - Wraps protected content
   - Handles session state
   - Shows appropriate UI
   - Used in layouts and pages

#### 3. Sources of Truth

1. **Session Management**
   - Supabase handles session storage
   - Middleware refreshes expired sessions
   - Client components use Supabase hooks

2. **Role Management**
   - `user_preferences` table is source of truth for roles
   - Checked by middleware for admin routes
   - Role field is required for admin access

3. **Route Protection**
   - Middleware (`src/middleware.ts`) is source of truth for protected routes
   - `protectedRoutes` and `adminRoutes` arrays define protection

#### 4. Known Issues & Status

1. Admin Panel Access
   - ✅ Middleware correctly checks for admin role
   - ✅ Role-based access control implemented
   - ✅ Redirect path updated to use `/auth` with proper redirectTo parameter
   - ✅ Admin layout updated to match auth system standard

2. Authentication Flow
   - ✅ Login/Logout process working
   - ✅ Session management implemented
   - ✅ Protected routes working
   - ✅ AuthGate component functioning
   - ✅ Callback handling implemented

#### 5. Implementation Checklist

- [x] Basic auth flow with Supabase
- [x] Protected routes middleware
- [x] AuthGate component
- [x] Admin role in user_preferences
- [x] Admin routes protection
- [ ] Fix admin layout redirect path
- [ ] Verify all protected routes are in middleware
- [ ] Add error handling for auth failures
- [ ] Add session refresh handling
- [ ] Document auth flow in user guide

## Admin Implementation Plan

### Core Principles
1. **Keep It Simple**
   - Admin page is a solved problem - don't overcomplicate
   - Follow basic CMS patterns
   - One source of truth for admin access (middleware only)

2. **Clear Goals**
   - Create and edit Learning Paths (Personas, Industries, Algorithms)
   - Create and edit Case Studies
   - Simple, functional admin UI

### Implementation Steps
1. **Phase 1: Basic Admin Access** 🚧 IN PROGRESS
   - Remove duplicate auth checks
   - Keep middleware as single source of truth
   - Create minimal admin page that displays "Welcome Admin"
   - Verify access works without redirect loops

2. **Phase 2: Content Management UI**
   - Add content type selection (Persona, Industry, Algorithm, Case Study)
   - Implement basic create/edit forms
   - Add markdown editor for content
   - Add metadata fields (title, description, etc.)

3. **Phase 3: Content Organization**
   - Add list views for each content type
   - Add search and filtering
   - Add draft/publish functionality
   - Add content validation

### Technical Approach
1. **Authentication**
   - ✅ Middleware handles admin route protection
   - ✅ User role stored in user_preferences
   - ✅ Admin email configured in environment

2. **UI Components**
   - Use Shadcn/UI for consistent design
   - Simple layout with sidebar navigation
   - Content editor with preview
   - Form validation and error handling

3. **Data Management**
   - Direct Supabase queries for content
   - Optimistic updates where possible
   - Proper error handling
   - Draft state management

### Success Criteria
- Admin can access `/admin` without redirect loops
- Can create and edit all content types
- Content immediately available on the site
- Simple, intuitive interface

### Admin Interface Implementation
1. Fix Data Table Dependencies
   - ✅ Identified missing @tanstack/react-table dependency
   - ✅ Successfully installed @tanstack/react-table
   - ✅ Verify data-table component works after installation

2. Content Management Implementation Order
   a. Case Studies Management (Priority)
   - [ ] Create basic list view with data table
   - [ ] Implement create/edit/delete functionality
   - [ ] Add sorting and filtering
   - [ ] Add proper error handling and loading states
   - [ ] Test with real data from Supabase

   b. Algorithms Management
   - [ ] Create list view with data table
   - [ ] Create edit form with proper validation
   - [ ] Implement relationship management with case studies
   - [ ] Add sorting and filtering
   - [ ] Test with real data

   c. Industries Management
   - [ ] Create list view with data table
   - [ ] Create edit form with proper validation
   - [ ] Fix case studies relationship as noted
   - [ ] Add sorting and filtering
   - [ ] Test with real data

   d. Personas Management
   - [ ] Create list view with data table
   - [ ] Create edit form with proper validation
   - [ ] Add sorting and filtering
   - [ ] Test with real data

   e. Quantum Stack Management
   - [ ] Create list view with data table
   - [ ] Create edit form with proper validation
   - [ ] Add sorting and filtering
   - [ ] Test with real data

3. Shared Components and Infrastructure
   - [ ] Create reusable form components using Shadcn/UI
   - [ ] Implement proper error handling components
   - [ ] Create loading state components
   - [ ] Add toast notifications for actions
   - [ ] Implement proper validation patterns

4. Testing and Validation
   - [ ] Test all CRUD operations
   - [ ] Verify proper error handling
   - [ ] Check mobile responsiveness
   - [ ] Verify proper role-based access
   - [ ] Test relationship management

5. Documentation
   - [ ] Document component usage
   - [ ] Add inline code comments
   - [ ] Update README with new admin features
   - [ ] Document any required environment variables

### Implementation Notes
- Follow Next.js 15 patterns strictly
- Use Shadcn/UI components consistently
- Maintain TypeScript type safety
- Follow existing auth patterns
- Keep performance in mind (pagination, lazy loading)

### Next.js 15 Component Architecture
1. Server/Client Component Separation
   - ❌ Current Issue: Mixing server components in client-side cell renderers
   - ❌ Current Issue: Synchronous cookies() usage
   - ❌ Current Issue: Server-side column definitions with client components

2. Required Changes for Next.js 15:
   a. Data Table Implementation
   - [~] Move column definitions to a client component
   - [~] Create separate server component for data fetching
   - [ ] Use proper async patterns for cookies and auth
   - [ ] Implement proper error boundaries

   b. Component Structure
   - [ ] Create ClientPage wrapper for client-side logic
   - [ ] Keep ServerPage for data fetching
   - [ ] Pass serializable data between components
   - [ ] Use proper Next.js 15 patterns for dynamic rendering

3. Implementation Order:
   - [ ] Fix synchronous cookie access
   - [ ] Verify auth helper implementations
   - [ ] Test admin role verification
   - [ ] Implement proper error boundaries
   - [ ] Add loading states
   - [ ] Then proceed with UI improvements

### Authentication and Permissions Issues
1. Cookie Handling Problems
   - ❌ Synchronous cookie access in auth chain
   - ❌ createServerComponentClient cookie implementation needs review
   - ✅ Completed cookie access audit:
     Found 3 different cookie handling patterns:
     1. Synchronous in supabase-server.ts:
        - Using cookies() directly in cookie getter
        - Needs to be updated to async pattern
     2. Mixed in case-studies/page.tsx:
        - Attempting async but implementation incorrect
        - Using createServerComponentClient incorrectly
     3. Correct in middleware.ts:
        - Using createMiddlewareClient properly
        - This is the pattern to follow

   New Findings:
   - ❌ Next.js 15 cookies() returns Promise<ReadonlyRequestCookies>
   - ❌ Current implementation doesn't handle async cookie access correctly
   - ❌ Need to await cookies() before accessing values
   
   Updated Fix Required:
   1. Cookie Handler Pattern:
      ```typescript
      export const getAsyncCookieHandler = async () => {
        const cookieStore = await cookies()
        return {
          async get(name: string) {
            return cookieStore.get(name)?.value
          }
        }
      }
      ```

   2. Usage in Components:
      ```typescript
      export default async function CaseStudiesPage() {
        const cookieHandler = await getAsyncCookieHandler()
        const supabase = createServerComponentClient<Database>({
          cookies: cookieHandler
        })
        // ... rest of the code
      }
      ```

   Implementation Order (Updated):
   1. [ ] Update cookie handler to use proper async pattern
   2. [ ] Test cookie handler in isolation
   3. [ ] Update supabase-server.ts
   4. [ ] Update case-studies page
   5. [ ] Test full auth flow

2. Supabase Permission Chain
   - ❌ Permission denied for users table
   - ❌ RLS policies need review
   - [ ] Verify admin role check implementation
   - [ ] Review user_preferences table access
   - [ ] Document permission requirements

3. Auth Implementation Review
   a. Current Issues:
   - Cookie handling breaks auth context
   - Permission chain fails at user verification
   - Middleware auth check may be incomplete

   b. Required Fixes:
   - [ ] Audit createServerComponentClient usage
   - [ ] Review middleware auth implementation
   - [ ] Document correct Next.js 15 auth patterns
   - [ ] Test auth flow comprehensively

4. Implementation Order (Updated):
   - [ ] Fix synchronous cookie access
   - [ ] Verify auth helper implementations
   - [ ] Test admin role verification
   - [ ] Implement proper error boundaries
   - [ ] Add loading states
   - [ ] Then proceed with UI improvements

### Root Cause Analysis
1. Cookie Handling
   - Problem: Synchronous cookie access breaking auth chain
   - Impact: Auth context lost, permissions fail
   - Location: Somewhere in createServerComponentClient usage
   - Required Investigation:
     - ✅ Audit all cookie access points
     - ✅ Review auth helper implementations
     - ✅ Check middleware cookie handling
     - [ ] Verify Next.js 15 compatibility

   Specific Fix Required:
   1. Update supabase-server.ts:
      ```typescript
      export const createServerClient = async () => {
        const cookieStore = cookies();
        
        return createClient<Database>(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          {
            cookies: {
              async get(name: string) {
                return cookieStore.get(name)?.value;
              },
            },
          }
        );
      };
      ```

   2. Update case-studies/page.tsx:
      ```typescript
      export default async function CaseStudiesPage() {
        const cookieStore = cookies();
        const supabase = createServerComponentClient<Database>({
          cookies: async () => {
            return {
              get(name: string) {
                return cookieStore.get(name)?.value;
              },
              set(name: string, value: string, options: CookieOptions) {
                // Not needed in Server Component
              },
              remove(name: string, options: CookieOptions) {
                // Not needed in Server Component
              },
            }
          }
        });
        // ... rest of the code
      }
      ```

   3. Create a shared utility:
      ```typescript
      // src/lib/cookies.ts
      export const getAsyncCookieHandler = (cookieStore: ReturnType<typeof cookies>) => ({
        async get(name: string) {
          return cookieStore.get(name)?.value;
        },
        // Other methods as needed
      });
      ```

   Implementation Order:
   1. [ ] Create shared cookie utility
   2. [ ] Update supabase-server.ts
   3. [ ] Update case-studies page
   4. [ ] Test auth flow
   5. [ ] Document working pattern

## 4. Case Study CMS Implementation
### A. Current State
- [x] Admin panel accessible
- [x] Case study creation view working
- [x] Basic case study listing and viewing functional
- [x] Database connection (Supabase) working

### B. Case Study Fields & Data Model
- [x] Document all available fields
  - [x] Required vs optional fields
  - [x] Field types and validation
  - [x] Relationships (algorithms, industries, personas)
  - [x] Content field types (text, rich text, arrays, etc.)

#### Field Documentation

1. Basic Information (Tab)
   ```typescript
   {
     title: string;          // Required: The display title of the case study
     slug: string;           // Required: URL-friendly version of title (e.g., "quantum-chemistry-2024")
     description: string;    // Optional: Short summary for listings and previews
     content: string;        // Optional: Main content in Markdown format
   }
   ```

2. Partner Information
   ```typescript
   {
     partner_companies: string[];  // Optional: Array of company names involved
     quantum_companies: string[];  // Optional: Array of quantum computing companies
     url: string;                  // Optional: External reference URL
   }
   ```

3. Classifications
   ```typescript
   {
     algorithms: string[];    // Optional: Array of algorithm slugs
     industries: string[];    // Optional: Array of industry slugs
     personas: string[];      // Optional: Array of persona slugs
     tags: string[];         // Optional: Array of custom tags
   }
   ```

4. Technical Details
   ```typescript
   {
     quantum_hardware: string[];  // Optional: Array of quantum hardware used
   }
   ```

5. Publication Status
   ```typescript
   {
     published: boolean;           // Required: Whether the case study is public
     featured: boolean;           // Optional: Whether to feature on homepage
     published_at: Date;          // Optional: When the case study was published
     created_at: Date;           // Auto-generated: Creation timestamp
     updated_at: Date;           // Auto-generated: Last update timestamp
   }
   ```

#### Field Design Pattern

1. Input Guidelines
   - Title: Clear, descriptive name (50-100 characters)
   - Slug: Auto-generated from title, URL-friendly
   - Description: Concise summary (100-200 characters)
   - Content: Rich text with Markdown support

2. Relationship Fields
   - Use multi-select dropdowns for:
     - Algorithms
     - Industries
     - Personas
   - Allow custom tags with typeahead

3. Array Fields
   - Partner Companies: One per line
   - Quantum Companies: One per line
   - Quantum Hardware: One per line
   - Tags: Comma-separated or one per line

4. Validation Rules
   - Required Fields:
     - Title
     - Slug
     - Published status
   - Format Validation:
     - Slug: URL-friendly (lowercase, hyphens)
     - URLs: Valid URL format
     - Dates: ISO format

5. Helper Text Pattern
   ```typescript
   const fieldHelpers = {
     title: "Enter a clear, descriptive title for the case study",
     slug: "URL-friendly version of the title (auto-generated)",
     description: "Brief summary for listings and previews",
     content: "Main content in Markdown format",
     partner_companies: "Enter company names, one per line",
     quantum_companies: "Enter quantum computing companies, one per line",
     algorithms: "Select relevant quantum algorithms",
     industries: "Select applicable industries",
     personas: "Select target user personas",
     tags: "Add custom tags, separated by commas",
     quantum_hardware: "List quantum hardware used, one per line",
     url: "External reference URL (if applicable)"
   };
   ```

6. Tab Organization
   - Basic Info: Core metadata
   - Content: Main content and description
   - Classifications: Relationships and tags
   - Technical Details: Hardware and technical info

7. Form Layout Pattern
   ```typescript
   <div className="space-y-4">
     <div className="space-y-2">
       <Label htmlFor="field">Field Label</Label>
       <Input
         type="text"
         name="field"
         id="field"
         placeholder={fieldHelpers.field}
         required={isRequired}
       />
       <p className="text-sm text-muted-foreground">
         {fieldHelpers.field}
       </p>
     </div>
   </div>
   ```

### C. Database Operations
- [ ] Document case study creation flow
  - [ ] Data validation
  - [ ] Error handling
  - [ ] Success/failure notifications
- [ ] Map data transformation process
  - [ ] Form data to database schema
  - [ ] Database schema to display format
- [ ] Document database triggers/hooks
  - [ ] Timestamps
  - [ ] Slug generation
  - [ ] Search indexing

### D. CMS Features
- [ ] Draft/Preview System
  - [ ] Draft state management
  - [ ] Preview rendering
  - [ ] Publish workflow
- [ ] Content Management
  - [ ] Version control/history
  - [ ] Media handling
  - [ ] Rich text editing
  - [ ] Tag management
- [ ] Search and Filtering
  - [ ] Admin search
  - [ ] Public search
  - [ ] Filter combinations
- [ ] Bulk Operations
  - [ ] Bulk edit
  - [ ] Bulk delete
  - [ ] Import/Export

### E. Content Display Patterns
- [ ] List View
  - [ ] Pagination
  - [ ] Sorting
  - [ ] Filtering
  - [ ] Search
- [ ] Detail View
  - [ ] Content layout
  - [ ] Related content
  - [ ] Navigation
  - [ ] Metadata display

### F. Admin Panel Features
- [ ] User Management
  - [ ] Roles and permissions
  - [ ] Access control
- [ ] Audit System
  - [ ] Change logging
  - [ ] User activity tracking
- [ ] Content Moderation
  - [ ] Review workflow
  - [ ] Approval process
- [ ] Analytics
  - [ ] Usage metrics
  - [ ] Content performance

### G. Testing & Validation
- [ ] Form Validation
  - [ ] Client-side validation
  - [ ] Server-side validation
  - [ ] Error messages
- [ ] Data Integrity
  - [ ] Required fields
  - [ ] Data types
  - [ ] Relationships
- [ ] Error Handling
  - [ ] User feedback
  - [ ] Error recovery
  - [ ] Logging

### H. Documentation
- [ ] User Guide
  - [ ] Admin interface
  - [ ] Content creation
  - [ ] Publishing workflow
- [ ] Technical Documentation
  - [ ] API endpoints
  - [ ] Data models
  - [ ] Integration points

## 5. Next.js 15 Compliance
### A. Page Props Pattern
- [x] Identified correct Next.js 15 page props pattern
  ```typescript
  interface PageProps {
    params: {
      id: string;  // or whatever param name you need
    };
  }
  export default async function Page({ params }: PageProps)
  ```
- [x] Audited current usage
  - ✅ `/quantum-stack/[id]/page.tsx` - Using correct pattern
  - ✅ `/paths/algorithm/[slug]/page.tsx` - Using correct pattern
  - ✅ `/paths/industry/[slug]/page.tsx` - Using correct pattern
  - ✅ `/paths/persona/[slug]/page.tsx` - Using correct pattern
  - ❌ `/admin/case-studies/[id]/page.tsx` - Using incorrect inline type
  - ⚠️ `/case-study/[slug]/page.tsx` - Needs verification
  - ⚠️ `/blog/[slug]/page.tsx` - Needs verification

### B. Required Fixes
- [x] Update case studies admin page
  - [x] Add proper interface definition (`CaseStudyPageProps`)
  - [x] Update component props
  - [x] Remove unnecessary `resolvedParams` await
  - [ ] Test deployment
- [ ] Verify and update if needed:
  - [ ] Case study detail page
  - [ ] Blog post page

### C. Documentation
- [ ] Add Next.js 15 patterns section to technical docs
  - [ ] Page props pattern
  - [ ] Common gotchas (e.g., no need to await params)
  - [ ] Migration guide from older patterns