# Feature: Convert Static Tags to Related Content Pages

## Summary
Transform the current static tag fields (`quantum_software`, `quantum_hardware`, `quantum_companies`, `partner_companies`) from simple string arrays into full content types with dedicated pages, similar to our existing Personas, Industries, and Algorithms implementation.

## Current State
- **Now**: Tags are stored as string arrays in the `case_studies` table, displayed as static badges
- **Problem**: Users want to learn more about these entities but have no way to access additional context

## Proposed Solution
Create four new content types with:
- Dedicated database tables with rich metadata fields
- Individual content pages with descriptions and related case studies
- Admin interfaces for content management
- Bidirectional relationships via junction tables

## Implementation Phases
- [x] **Phase 1**: Database schema - Create tables, views, junction tables
- [x] **Phase 2**: Data migration - Convert existing tags to content records
- [x] **Phase 3**: Admin interfaces - CRUD operations for each content type (UI only)
- [x] **Phase 3.5**: API endpoints - Backend CRUD operations for admin interfaces
- [x] **Phase 4**: Public pages - List and detail views at `/paths/[content-type]`
- [x] **Phase 5**: Frontend updates - Convert badges to clickable links
- [x] **Phase 6**: API updates - Content fetchers and relationships
- [x] **Phase 6.5**: Technical Debt Resolution - API standardization and code cleanup
- [ ] **Phase 7**: Public Pages - Build user-facing list and detail pages  
- [ ] **Phase 8**: Testing - Data integrity, functionality, performance
- [ ] **Phase 9**: Cleanup - Remove old fields after verification

## Acceptance Criteria
- [ ] All existing tags migrated without data loss
- [ ] Each content type has working admin interface
- [ ] Public pages display with proper markdown rendering
- [ ] Case study pages show clickable links instead of static badges
- [ ] Related case studies appear on content detail pages
- [ ] Performance remains unchanged or improves
- [ ] Published/draft filtering works correctly

## Technical Considerations
- Follow existing patterns from Personas/Industries/Algorithms
- Maintain backward compatibility during transition
- Use bidirectional junction tables for relationships
- Apply same RLS policies and deletion system
- Preserve static site generation architecture

## Phase 3.5: API Endpoints Required

**Missing API Routes (must be created):**
- `/src/app/api/quantum-software/route.ts` - GET, POST, PUT
- `/src/app/api/quantum-software/delete/route.ts` - POST (soft delete)
- `/src/app/api/quantum-hardware/route.ts` - GET, POST, PUT  
- `/src/app/api/quantum-hardware/delete/route.ts` - POST (soft delete)
- `/src/app/api/quantum-companies/route.ts` - GET, POST, PUT
- `/src/app/api/quantum-companies/delete/route.ts` - POST (soft delete)
- `/src/app/api/partner-companies/route.ts` - GET, POST, PUT
- `/src/app/api/partner-companies/delete/route.ts` - POST (soft delete)

**API Patterns to Follow:**
- Model after existing `/src/app/api/algorithms/` or `/src/app/api/case-studies/`
- Include proper error handling and validation
- Support published/draft filtering
- Use service role Supabase client for admin operations
- Implement proper HTTP status codes
- Follow Next.js 13+ App Router patterns

**Current State:**
- Admin interfaces exist but will fail on save/edit/delete operations
- Frontend forms call these APIs but get 404 errors
- Need APIs before testing admin functionality

## Phase 6.5: Technical Debt Resolution

### Overview
Before proceeding to testing, we need to address technical inconsistencies that could cause maintenance issues and confusion. This phase focuses on standardizing API patterns and eliminating code duplication.

### Issue 1: API Pattern Inconsistency

**Current State:**
- **Complex Pattern** (algorithms, case-studies, personas, industries): Uses `@/utils/content-management` with relationship handling, validation, and bulk operations
- **Simple Pattern** (quantum-software, quantum-hardware, quantum-companies, partner-companies): Direct Supabase queries with basic CRUD

**Problems:**
- Maintenance burden - developers must understand two patterns
- Feature gaps - simple APIs lack bulk operations and relationship management
- Inconsistent error handling and validation
- Unclear which pattern to follow for future development

**Solution Plan:**
1. **Analyze Requirements**: Determine if new content types need advanced features:
   - Bulk operations (publish/unpublish multiple items)
   - Complex relationship management beyond case studies
   - Advanced validation rules
   - FormData handling for file uploads

2. **Choose Standardization Strategy**:
   
   **Option A: Upgrade to Complex Pattern** (Recommended)
   - Migrate all 4 new content type APIs to use content-management utilities
   - Benefits: Consistency, feature-rich, future-proof
   - Effort: High (4-6 hours)
   - Risk: Medium (need to test relationship configurations)
   
   **Option B: Keep Simple Pattern**
   - Document the two patterns and when to use each
   - Add missing features to simple APIs as needed
   - Benefits: Less work, already functional
   - Effort: Low (1 hour documentation)
   - Risk: Low (no code changes)
   
   **Option C: Create Hybrid Approach**
   - Extract common CRUD logic into shared utilities
   - Both patterns use same core functions
   - Benefits: Best of both worlds
   - Effort: Medium (3-4 hours)
   - Risk: Medium (new abstraction layer)

3. **Implementation Steps (for Option A - Recommended)**:
   - Create RELATIONSHIP_CONFIGS entries for each new content type
   - Implement extractFormData functions for each type
   - Update APIs to use fetchContentItems, saveContentItem, deleteContentItem
   - Test admin interfaces still work with new API structure
   - Verify soft delete functionality preserved

### Issue 2: Frontend Code Duplication

**Current State:**
- Quantum Hardware section in case study layout manually implements link rendering
- `renderEntityLinks()` helper function exists but isn't used consistently
- Same logic duplicated with minor variations

**Problems:**
- Code duplication increases maintenance burden
- Risk of behavior divergence over time
- Harder to make global changes

**Solution Plan:**
1. **Refactor Quantum Hardware Section**:
   - Modify `renderEntityLinks()` to accept optional icon parameter
   - Use helper function for quantum hardware rendering
   - Ensure Cpu icon still displays correctly

2. **Implementation Steps**:
   - Update `renderEntityLinks()` signature to accept icon prop
   - Replace manual quantum hardware implementation
   - Test all 4 content types display correctly
   - Verify icons appear where expected

### Issue 3: Content Type Detection Fragility

**Current State:**
- `filterRelationships()` detects content type by checking field existence
- Detection logic relies on specific field combinations
- No explicit type information passed

**Problems:**
- Breaks if schema changes
- Ambiguous when types share fields
- Hard to debug detection failures
- Implicit logic not obvious

**Solution Plan:**
1. **Add Explicit Type Information**:
   
   **Option A: Pass Type Parameter** (Recommended)
   - Modify function signatures to accept explicit contentType
   - Update all callers to provide type
   - Benefits: Clear, reliable, debuggable
   - Effort: Medium (2-3 hours)
   
   **Option B: Add Type Discriminator Field**
   - Add `_type` field to all content queries
   - Use discriminator for detection
   - Benefits: Self-contained data
   - Effort: High (database changes)
   
   **Option C: Improve Detection Logic**
   - Use unique field combinations
   - Add fallback detection methods
   - Benefits: No API changes needed
   - Effort: Low (1 hour)

2. **Implementation Steps (for Option A)**:
   - Update `filterRelationships()` to accept contentType parameter
   - Modify `getStaticContentWithRelationships()` to pass type
   - Remove field-based detection logic
   - Test all content types filter correctly

### Execution Order
1. **First**: Fix API Pattern Inconsistency (highest impact)
2. **Second**: Fix Content Type Detection (affects data flow)
3. **Third**: Fix Frontend Duplication (lowest risk)

### Success Criteria
- [x] All APIs use consistent pattern (migrated all 4 content types to use content-management utilities)
- [ ] No duplicate rendering logic in frontend
- [ ] Content type detection is explicit and reliable
- [ ] All existing functionality still works
- [ ] Code is more maintainable and clear

### Time Estimate
- Option A for all issues: 8-10 hours
- Option B (minimal approach): 2-3 hours
- Hybrid approach: 5-6 hours

### Recommendation
**Go with Option A for API standardization** - the upfront investment will pay dividends in maintenance and feature additions. The other issues can use simpler solutions since they're lower impact.

## Phase 7: Public Pages - Build User-Facing Discovery Experience

### Overview
Now that admin interfaces and content management are complete, we need to build the public-facing pages where users discover and browse the new content types. This includes both list pages and individual detail pages with dual layout options.

### Requirements Summary
1. **Related Content Navigation**: Add 4 new cards to `/related-content` page
2. **List Pages**: Create browseable pages at `/paths/quantum-software`, `/paths/quantum-hardware`, etc.
3. **Detail Pages**: Individual content pages showing descriptions and related case studies
4. **Dual Layout System**: Grid view (discovery) and table view (efficiency) toggle

### Technical Implementation Plan

#### 7.1: Related Content Page Updates
**File**: `/src/app/related-content/page.tsx`

**Changes Needed:**
- Add 4 new content type cards alongside existing Persona, Industry, Algorithm cards
- Use consistent card design and icons
- Link to new list pages (`/paths/quantum-software`, etc.)

**Card Content:**
- **Quantum Software**: "Explore quantum computing frameworks, libraries, and development tools"
- **Quantum Hardware**: "Discover quantum processors, systems, and computing platforms" 
- **Quantum Companies**: "Learn about companies building quantum computing solutions"
- **Partner Companies**: "Explore organizations collaborating on quantum initiatives"

#### 7.2: List Page Architecture
**Files to Create:**
- `/src/app/paths/quantum-software/page.tsx`
- `/src/app/paths/quantum-hardware/page.tsx` 
- `/src/app/paths/quantum-companies/page.tsx`
- `/src/app/paths/partner-companies/page.tsx`

**Dual Layout System:**
```typescript
// Shared components
/src/components/content-list/
├── layout-toggle.tsx          // Grid/Table view toggle
├── grid-view.tsx             // Card-based discovery layout  
├── table-view.tsx            // Dense tabular layout
└── use-layout-preference.tsx // localStorage hook for user preference
```

**Layout Toggle Features:**
- **Default**: Grid view (better for discovery)
- **Persistence**: Save user preference in localStorage
- **Responsive**: Force grid view on mobile (table too cramped)
- **Icons**: Grid (⊞) and Table (≡) toggle buttons

**Grid View Specifications:**
- 3-column responsive layout (matches existing Industry/Persona pages)
- Cards show: Name, description snippet, company/category, related case study count
- Hover effects and clear CTAs to detail pages

**Table View Specifications:**
- Sortable columns: Name, Company/Category, Description (truncated), Case Studies
- Search/filter functionality
- Pagination for large datasets
- Click-through to detail pages

#### 7.3: Detail Page Architecture
**Files to Create:**
- `/src/app/paths/quantum-software/[slug]/page.tsx`
- `/src/app/paths/quantum-hardware/[slug]/page.tsx`
- `/src/app/paths/quantum-companies/[slug]/page.tsx` 
- `/src/app/paths/partner-companies/[slug]/page.tsx`

**Content Structure:**
```typescript
interface DetailPageData {
  // Core content
  name: string
  description: string
  website_url?: string
  docs_url?: string
  github_url?: string
  
  // Type-specific fields
  category?: string          // quantum-software, quantum-companies
  manufacturer?: string      // quantum-hardware
  industry?: string         // partner-companies
  
  // Relationships
  related_case_studies: CaseStudy[]
}
```

**Page Layout:**
1. **Hero Section**: Name, description, external links (website, docs, GitHub)
2. **Details Section**: Category/manufacturer, technical details
3. **Related Case Studies**: Grid of associated case studies with preview
4. **Breadcrumb Navigation**: Related Content > Quantum Software > Item Name

#### 7.4: Data Fetching Strategy
**Approach**: Follow existing patterns from Industry/Persona/Algorithm pages

**List Pages:**
```typescript
// Use existing getStaticContentList pattern
const items = await getStaticContentList('quantum_software', { 
  published: true,
  include_relationships: ['case_studies'] 
})
```

**Detail Pages:**
```typescript  
// Use existing getStaticContentWithRelationships pattern
const item = await getStaticContentWithRelationships('quantum_software', slug, {
  relationships: ['case_studies']
})
```

#### 7.5: SEO and Performance
**Static Generation:**
- All list and detail pages use `generateStaticParams()` 
- Build-time generation for performance
- ISR support for content updates

**Meta Data:**
- Dynamic titles: "Quantum Software | OpenQase" / "Qiskit - Quantum Software | OpenQase"
- Descriptions from content descriptions
- OpenGraph tags for social sharing

#### 7.6: Component Reusability
**Shared Components:**
- Leverage existing `ContentCard`, `RelatedCaseStudies` components where possible
- Create `ContentDetailLayout` wrapper for consistent detail page structure
- Extend `renderEntityLinks()` helper for external link rendering

### Implementation Phases

#### Phase 7A: Foundation (2-3 hours)
1. Create dual layout components (`layout-toggle`, `grid-view`, `table-view`)
2. Build layout preference hook with localStorage
3. Update Related Content page with 4 new cards

#### Phase 7B: List Pages (3-4 hours) 
1. Implement all 4 list pages with dual layout system
2. Add search/filter functionality for table view
3. Test responsive behavior and mobile experience

#### Phase 7C: Detail Pages (2-3 hours)
1. Create all 4 detail page types with consistent layout
2. Implement related case studies display
3. Add external link functionality (website, docs, GitHub)

#### Phase 7D: Polish & Testing (1-2 hours)
1. SEO optimization and meta tags
2. Performance testing and optimization
3. Cross-browser testing
4. Accessibility compliance

### Success Criteria
- [ ] Related Content page shows all 7 content type options
- [ ] All 4 new list pages load with dual layout toggle working
- [ ] Table view is sortable and searchable
- [ ] Grid view matches design patterns of existing pages
- [ ] Detail pages show content and related case studies correctly
- [ ] External links (website, docs, GitHub) function properly
- [ ] User layout preference persists between sessions
- [ ] Pages are performant and SEO-optimized
- [ ] Mobile experience is smooth (grid view only)

### Total Time Estimate: 8-12 hours

### Notes
- Can iterate on advanced filtering/search features based on user feedback
- Consider adding bulk import workflows for initial content population
- May want to add content analytics to track popular items

## Questions to Resolve
1. ~~Implement all four types at once or phase them?~~ ✓ Implemented together
2. ~~Should these content types relate to each other?~~ ✓ They relate through case studies
3. ~~How to handle "Not Applicable" cases?~~ ✓ Handled with special detection
4. Need for bulk import functionality? (Future consideration)

## ⚠️ CRITICAL TODO: Import Production Data

**ISSUE**: Local database is empty - production data was never imported into local development environment.

**IMMEDIATE ACTION REQUIRED**:

### Step 1: Check Current Local Database State
Access Supabase local UI at `http://localhost:54323` → SQL Editor, run:
```sql
SELECT 
  'case_studies' as table_name, COUNT(*) as count
FROM case_studies
UNION ALL
SELECT 
  'algorithms' as table_name, COUNT(*) as count  
FROM algorithms
UNION ALL
SELECT 
  'quantum_software' as table_name, COUNT(*) as count
FROM quantum_software
UNION ALL
SELECT 
  'quantum_hardware' as table_name, COUNT(*) as count
FROM quantum_hardware
UNION ALL
SELECT 
  'quantum_companies' as table_name, COUNT(*) as count
FROM quantum_companies
UNION ALL
SELECT 
  'partner_companies' as table_name, COUNT(*) as count
FROM partner_companies;
```

### Step 2: Export Production Data
Connect to production Supabase and export data for each table:
```sql
-- Run these in PRODUCTION SQL editor and save results
SELECT * FROM case_studies WHERE published = true ORDER BY id;
SELECT * FROM algorithms WHERE published = true ORDER BY id;
SELECT * FROM industries WHERE published = true ORDER BY id;
SELECT * FROM personas WHERE published = true ORDER BY id;
-- (Export existing content first, new tables will be empty in production)
```

### Step 3: Import Into Local
Convert exported data to INSERT statements and run in local SQL editor.

**STATUS**: 🔴 BLOCKING - All testing is invalid until production data is loaded

---

## Testing & QA Instructions

⚠️ **Prerequisites**: Complete production data import above before testing

### 1. Admin Interface Testing
Test content management for all 4 new content types:

**URLs to Test:**
- http://localhost:3001/admin/quantum-software
- http://localhost:3001/admin/quantum-hardware  
- http://localhost:3001/admin/quantum-companies
- http://localhost:3001/admin/partner-companies

**Test Cases:**
- [ ] Browse existing content (should show migrated items)
- [ ] Edit an existing item (verify all fields work)
- [ ] Create a new item (test form validation)
- [ ] Publish/unpublish functionality
- [ ] Delete an item (soft delete)
- [ ] Search and filtering

### 2. Public Pages Testing
Test content discovery and navigation:

**URLs to Test:**
- http://localhost:3001/paths/quantum-software
- http://localhost:3001/paths/quantum-hardware
- http://localhost:3001/paths/quantum-companies  
- http://localhost:3001/paths/partner-companies

**Test Cases:**
- [ ] Content grid displays correctly
- [ ] Individual item pages load (click any item)
- [ ] External links work (website, docs, GitHub)
- [ ] Related case studies appear on detail pages
- [ ] Responsive design on mobile

### 3. Case Study Integration Testing
Test the core transformation from static badges to clickable links:

**Test Steps:**
1. Visit any case study: http://localhost:3001/case-study/[slug]
2. Look for the sidebar sections:
   - Partner Companies
   - Quantum Companies  
   - Quantum Hardware
   - Quantum Software
3. Verify items are clickable links (not static badges)
4. Click links to verify they navigate correctly

**Recommended Test Case Studies:**
- IBM and Barclays: `/case-study/ibm-barclays-partnership-financial-services-innovation`
- D-Wave and Toyota: `/case-study/d-wave-toyota-traffic-optimization`

### 4. Data Integrity Testing
Verify migration was successful:

**Database Queries to Run:**
```sql
-- Test 1: Verify migration coverage
SELECT 
  COUNT(*) as total_case_studies,
  COUNT(DISTINCT csr.case_study_id) as with_software_relations,
  COUNT(DISTINCT chr.case_study_id) as with_hardware_relations
FROM case_studies cs
LEFT JOIN case_study_quantum_software_relations csr ON cs.id = csr.case_study_id
LEFT JOIN case_study_quantum_hardware_relations chr ON cs.id = chr.case_study_id
WHERE cs.published = true;

-- Test 2: Sample data verification
SELECT cs.title, qs.name as software, qh.name as hardware
FROM case_studies cs
LEFT JOIN case_study_quantum_software_relations csr ON cs.id = csr.case_study_id
LEFT JOIN quantum_software qs ON csr.quantum_software_id = qs.id
LEFT JOIN case_study_quantum_hardware_relations chr ON cs.id = chr.case_study_id  
LEFT JOIN quantum_hardware qh ON chr.quantum_hardware_id = qh.id
WHERE cs.published = true AND cs.title LIKE '%IBM%'
LIMIT 3;
```

### 5. Performance Testing
Verify queries perform well:

**Performance Test:**
```sql
EXPLAIN ANALYZE
SELECT cs.title, COUNT(DISTINCT qs.id) as software_count
FROM case_studies cs
LEFT JOIN case_study_quantum_software_relations csr ON cs.id = csr.case_study_id
LEFT JOIN quantum_software qs ON csr.quantum_software_id = qs.id
WHERE cs.published = true
GROUP BY cs.id, cs.title
ORDER BY cs.title
LIMIT 10;
```

**Expected Results:**
- Execution time should be < 5ms
- No table scans on large tables
- Indexes should be used

### 6. API Testing
Test programmatic access:

**API Endpoints to Test:**
```bash
# GET endpoints (list content)
curl http://localhost:3001/api/quantum-software
curl http://localhost:3001/api/quantum-hardware
curl http://localhost:3001/api/quantum-companies
curl http://localhost:3001/api/partner-companies

# POST endpoints (create content) - test via admin interface
# PUT endpoints (update content) - test via admin interface  
# DELETE endpoints (soft delete) - test via admin interface
```

**Expected Results:**
- JSON responses with content data
- Published content only for GET requests
- Proper error handling and validation
- CRUD operations work from admin interfaces

### 7. Regression Testing
Ensure existing functionality still works:

**Areas to Verify:**
- [ ] Existing algorithms/personas/industries pages unchanged
- [ ] Search functionality still works
- [ ] Navigation menus display correctly
- [ ] Case study listing pages work
- [ ] Admin dashboard loads

## Known Issues & Limitations
- Some entities appear in multiple content types (e.g., "1QBit" as both software and company) - this is expected
- Legacy TEXT[] fields are preserved during transition - they will be removed in future cleanup
- 4 duplicate slugs exist across content types - this is acceptable for our use case

## Success Criteria
- [ ] All admin interfaces functional
- [ ] All public pages load correctly
- [ ] Case studies show clickable links instead of static badges  
- [ ] No data loss (164 content items, 287 relationships preserved)
- [ ] Performance acceptable (complex queries < 5ms)
- [ ] User experience improved (interactive vs static content)

## Company Page Design Enhancement

### Overview
While the basic company detail pages are functional, there's significant opportunity to enhance them into strategic intelligence tools that help users understand each company's role in the quantum ecosystem and discover relevant connections.

### Current State
Company detail pages currently show:
- ✅ Basic company info (name, description, metadata badges)
- ✅ External links (website, LinkedIn)
- ✅ Related case studies
- ✅ SEO optimization and responsive design

### Enhancement Opportunities

#### **Phase 1: Ecosystem Cross-References** (Recommended Next)
**Goal**: Leverage existing relationship data without new database fields

**Implementation**:
- **Related Quantum Software**: Show software/frameworks this company uses or provides
- **Related Quantum Hardware**: Display hardware platforms they work with or manufacture  
- **Partner Relationships**: Highlight collaborations with other organizations
- **Technology Stack Visualization**: Simple badges/chips showing their quantum tech ecosystem

**Data Sources** (all existing):
```sql
-- Software relationships
SELECT qs.* FROM quantum_software qs
JOIN case_study_quantum_software_relations csr ON qs.id = csr.quantum_software_id  
JOIN case_studies cs ON csr.case_study_id = cs.id
WHERE cs.id IN (company's related case studies)

-- Hardware relationships (similar pattern)
-- Partner relationships (similar pattern)
```

**Benefits**:
- ✅ No database schema changes required
- ✅ Uses existing relationship data
- ✅ Helps users discover technology connections
- ✅ Shows ecosystem positioning

#### **Phase 2: Enhanced Business Context** (Future)
**Content Enhancements**:
- **Quantum Focus Areas**: Primary applications/use cases in plain language
- **Industry Positioning**: "Cloud provider", "Hardware manufacturer", "Software vendor", "Research partner"
- **Market Role**: How they fit in the quantum value chain
- **Timeline View**: Evolution through case studies (chronological)

#### **Phase 3: Visual & Interactive Elements** (Future)
**Advanced Features**:
- Company logos/branding assets
- Interactive technology stack diagram
- Partner network visualization
- Quantum application timeline
- Comparison with similar companies

### Technical Implementation Strategy

#### **Phase 1 Database Queries**
```typescript
// In company detail page, fetch related technologies
const relatedSoftware = await getRelatedQuantumSoftware(companyId)
const relatedHardware = await getRelatedQuantumHardware(companyId)  
const partnerCompanies = await getPartnerCompanies(companyId)
```

#### **UI Components Needed**
- `<TechnologySection>` - Display related software/hardware with links
- `<PartnerNetwork>` - Show collaboration relationships  
- `<EcosystemBadges>` - Visual indicators of technology stack
- `<RelationshipGrid>` - Unified display of all connections

#### **Content Strategy**
**For Company Descriptions** (using existing description field):
- Focus on quantum-specific activities and positioning
- Mention key technologies, partnerships, focus areas
- Keep business context relevant to quantum computing journey
- Use consistent tone and structure across all companies

### Success Criteria
**Phase 1**:
- [ ] Users can discover which technologies a company uses
- [ ] Cross-referencing works bidirectionally (company → tech, tech → company)
- [ ] Partner relationships are visible and navigable
- [ ] Page provides clear quantum ecosystem context

**User Value**: Transform company pages from static profiles into quantum ecosystem navigation hubs

### Time Estimate
- **Phase 1**: 4-6 hours (leverage existing relationships)
- **Phase 2**: 6-8 hours (enhanced content and context)
- **Phase 3**: 12+ hours (visual/interactive features)

### Implementation Notes
- Start with quantum companies, then extend to partner companies
- Ensure consistent patterns with existing detail page architecture
- Consider mobile experience for complex relationship displays
- Test performance with companies that have many relationships

## Code Refactoring TODOs

### Helper Function Consolidation
**Status**: TODO - Lower Priority  
**Added**: 2025-08-23

**Issue**: Helper functions for fetching relationships are duplicated across all 4 detail pages (quantum-software, quantum-hardware, quantum-companies, partner-companies).

**Duplicated Functions**:
- `getRelatedQuantumSoftware()` - Fetches quantum software through case study relations
- `getRelatedQuantumHardware()` - Fetches quantum hardware through case study relations
- `getRelatedQuantumCompanies()` - Fetches quantum companies through case study relations
- `getRelatedPartnerCompanies()` - Fetches partner companies through case study relations

**Current Duplication**:
- Each function appears in 3-4 different page files
- Identical implementation across all instances
- ~20 lines of code duplicated per function

**Proposed Solution**:
1. Create `/lib/relationship-queries.ts` with all shared helper functions
2. Mark as server-only with `'use server'` directive  
3. Import in each detail page as needed
4. Consider TypeScript generics for better type safety
5. Add proper return types and error handling

**Example Structure**:
```typescript
// /lib/relationship-queries.ts
'use server'

export async function getRelatedQuantumSoftware(caseStudyIds: string[]) {
  // Consolidated implementation
}
// ... other functions
```

**Benefits**:
- Single source of truth for query logic
- Easier maintenance and updates
- Cleaner page components  
- Better adherence to DRY principles
- Centralized error handling

**Note**: This is build-time optimization only (static generation), not a performance issue for users. Pages are pre-rendered at build time with all data included.

### Direct Relationship Tracking
**Status**: TODO - Important for Data Completeness  
**Added**: 2025-08-23

**Issue**: Current relationship discovery relies entirely on shared case studies. This misses direct relationships between technologies that exist independently of case studies.

**Current Limitation**:
- Relationships are discovered ONLY through case study co-occurrence
- Example: To find software related to hardware, we find case studies mentioning both
- This misses fundamental relationships like "IBM Qiskit is designed for IBM Quantum hardware"

**Examples of Missing Relationships**:
- **Vendor relationships**: Google Cirq → Google Sycamore (built specifically for)
- **Direct integrations**: Amazon Braket → IonQ hardware (official support)
- **Compatibility**: Qiskit → IBM Quantum Network hardware (designed for)
- **Development**: Microsoft Q# → Azure Quantum hardware (same company)

**Impact**:
- Incomplete ecosystem view for users
- New technologies with no case studies appear isolated
- Users can't discover which technologies are designed to work together
- Misleading gaps in the technology relationship graph

**Proposed Solutions**:

**Option A: Direct Relationship Tables** (Most flexible)
```sql
-- New junction tables with relationship types
CREATE TABLE quantum_hardware_software_relations (
  hardware_id UUID,
  software_id UUID,
  relationship_type TEXT -- 'compatible', 'optimized_for', 'requires', etc.
);

CREATE TABLE quantum_company_technology_relations (
  company_id UUID,
  technology_id UUID,
  technology_type TEXT, -- 'software' or 'hardware'
  relationship_type TEXT -- 'develops', 'maintains', 'supports', etc.
);
```

**Option B: Add Relationship Fields** (Simpler to implement)
```sql
-- Add to existing tables
ALTER TABLE quantum_software ADD COLUMN
  compatible_hardware TEXT[], -- Array of hardware IDs
  developed_by UUID, -- Company reference
  requires_hardware TEXT[]; -- Required hardware

ALTER TABLE quantum_hardware ADD COLUMN
  compatible_software TEXT[], -- Array of software IDs
  manufactured_by UUID, -- Company reference
  supported_frameworks TEXT[]; -- Supported software
```

**Option C: Hybrid Approach** (Recommended)
- Keep case study discovery for "proven in practice" relationships
- Add direct relationship fields/tables for "designed for" relationships
- Display both with different visual indicators:
  - 🔗 "Designed for" (direct relationship)
  - 📚 "Used together in case studies" (discovered relationship)

**Implementation Considerations**:
- Need admin interface to manage direct relationships
- Should distinguish between relationship types in UI
- Migration strategy for existing data
- Validation to prevent circular relationships

**User Value**:
- Complete view of technology ecosystem
- Discover compatible technologies before implementation
- Understand vendor relationships and technology stacks
- Make informed decisions about technology choices

**Priority**: Medium-High - This significantly impacts the value of the Related Content feature

---

## References
- Detailed plan: `MORECONTENT.md`
- Deployment guide: `DEPLOYMENT_CHECKLIST.md`
- Cleanup script: `cleanup-legacy-fields-migration.sql`
- Similar implementation: `/src/app/paths/algorithm`, `/src/app/admin/algorithms`
- Related components: `professional-case-study-layout.tsx`