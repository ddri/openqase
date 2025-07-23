# Product Requirements Document: Case Studies Year-Based Functionality

## Executive Summary

This PRD outlines the implementation of year-based functionality for case studies, enabling users to filter, sort, and search case studies by year. This enhancement will improve content discoverability and provide better context for users evaluating the relevance and timeliness of case studies.

## Current State Analysis

### Database Schema
- **Table**: `case_studies`
- **Current Fields**: `id`, `slug`, `title`, `description`, `main_content`, `partner_companies`, `quantum_companies`, `algorithms`, `quantum_hardware`, `published`, `published_at`, `created_at`, `updated_at`, `academic_references`, `resource_links`, `quantum_software`
- **Missing**: Dedicated `year` field for case study year

### Current UI Components
- **Case Study List Page**: `/case-study` - Shows all case studies with search and sort functionality
- **Individual Case Study Page**: `/case-study/[slug]` - Displays case study content with metadata sidebar
- **Admin Interface**: `/admin/case-studies/[id]` - Form for creating/editing case studies

### Current Functionality
- Search by title and description
- Sort by title (A-Z) or most recent (updated_at)
- Display metadata: partner companies, quantum companies, hardware, software, industries, algorithms, personas
- No year-based filtering or display

## Requirements

### 1. Database Schema Changes

#### 1.1 Add Year Field
- **Field Name**: `year`
- **Type**: `integer`
- **Constraints**: 
  - NOT NULL
  - Range: 1990-2030 (reasonable quantum computing timeline)
  - Default: Current year
- **Index**: Create index on `year` field for efficient filtering

#### 1.2 Migration Strategy
- Create migration file: `supabase/migrations/YYYYMMDDHHMMSS_add_year_to_case_studies.sql`
- Add column with default value
- Update existing records with year based on `published_at` or `created_at` date
- Add validation constraint

### 2. Admin Interface Updates

#### 2.1 Case Study Form Enhancement
- **Location**: `src/app/admin/case-studies/[id]/client.tsx`
- **New Field**: Year input field
- **Validation**: 
  - Required field
  - Integer between 1990-2030
  - Default to current year for new case studies
- **UI Component**: Number input with validation

#### 2.2 Form Validation Updates
- **File**: `src/utils/form-validation.ts`
- **Add**: Year validation rules
- **Integration**: Include year in completion percentage calculation

### 3. Case Study List Page Enhancements

#### 3.1 Filter by Year
- **Component**: `src/components/CaseStudiesList.tsx`
- **New Filter**: Year dropdown/select
- **Options**: 
  - "All Years" (default)
  - Individual years (dynamically populated from available case studies)
  - Year ranges (e.g., "2020-2024", "2015-2019")
- **UI**: Multi-select or range picker

#### 3.2 Sort by Year
- **New Sort Option**: "Year (Newest First)" and "Year (Oldest First)"
- **Integration**: Add to existing sort dropdown
- **Logic**: Sort by year field, then by title for same year

#### 3.3 Search by Year
- **Enhancement**: Extend search functionality to include year
- **Search Patterns**: 
  - "2023" → finds case studies from 2023
  - "2020s" → finds case studies from 2020-2029
  - "recent" → finds case studies from last 3 years
- **Implementation**: Add year to search index/query

### 4. Individual Case Study Page Updates

#### 4.1 Year Display
- **Location**: `src/app/case-study/[slug]/page.tsx`
- **Position**: Add to metadata sidebar
- **Format**: "Year: 2023" or "Published: 2023"
- **Styling**: Consistent with other metadata sections

#### 4.2 Year Badge
- **Optional Enhancement**: Add year as a badge in the main content area
- **Position**: Near title or in header section
- **Style**: Subtle badge similar to other metadata

### 5. API Updates

#### 5.1 Case Studies API
- **File**: `src/app/api/case-studies/route.ts`
- **Enhancements**:
  - Include year in response data
  - Add year-based filtering parameters
  - Add year to search functionality

#### 5.2 Individual Case Study API
- **File**: `src/app/api/case-studies/[slug]/route.ts`
- **Enhancements**: Include year in response

### 6. Content Fetching Updates

#### 6.1 Static Content Fetchers
- **File**: `src/lib/content-fetchers.ts`
- **Enhancements**:
  - Include year in fetched data
  - Add year-based filtering options
  - Update type definitions

#### 6.2 Type Definitions
- **File**: `src/types/supabase.ts` and `src/lib/types.ts`
- **Updates**: Add year field to CaseStudy type definitions

## Technical Implementation Plan

### Phase 1: Database & Backend (Week 1)
1. Create and run database migration
2. Update API endpoints to include year field
3. Update content fetchers and type definitions
4. Add year validation to admin form

### Phase 2: Admin Interface (Week 2)
1. Add year input field to case study form
2. Update form validation rules
3. Test admin functionality
4. Update existing case studies with year data

### Phase 3: Frontend Enhancements (Week 3)
1. Update case study list page with year filters
2. Add year-based sorting options
3. Enhance search functionality
4. Add year display to individual case study pages

### Phase 4: Testing & Polish (Week 4)
1. End-to-end testing
2. Performance optimization
3. UI/UX refinements
4. Documentation updates

## Success Metrics

### Quantitative
- **User Engagement**: 20% increase in case study page views
- **Search Efficiency**: 30% reduction in time to find relevant case studies
- **Content Discovery**: 25% increase in cross-year case study exploration

### Qualitative
- **User Feedback**: Positive feedback on year-based filtering
- **Content Relevance**: Better user understanding of case study timeliness
- **Admin Efficiency**: Improved content management with year metadata

## Risk Assessment

### Low Risk
- Database migration (well-defined schema change)
- Admin interface updates (standard form enhancement)

### Medium Risk
- Search functionality complexity
- Performance impact of additional filters
- User experience with new UI elements

### Mitigation Strategies
- Comprehensive testing of search functionality
- Performance monitoring and optimization
- User testing of new filter interfaces
- Gradual rollout with feature flags

## Future Considerations

### Potential Enhancements
1. **Year Ranges**: Predefined ranges (e.g., "Early Quantum Era: 1990-2010")
2. **Timeline View**: Visual timeline of case studies
3. **Trend Analysis**: Show quantum computing trends over years
4. **Year-based Recommendations**: Suggest case studies from similar time periods

### Scalability
- Consider year-based caching strategies
- Plan for decade-based organization as content grows
- Evaluate need for year-based content archiving

## Conclusion

This year-based functionality enhancement will significantly improve the user experience by providing better context and filtering capabilities for case studies. The implementation is well-scoped, technically feasible, and aligns with the platform's goal of making quantum computing content more accessible and discoverable. 