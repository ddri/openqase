# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- **API & Relationships Documentation**: Comprehensive guide explaining content connectivity architecture
  - Detailed explanation of bidirectional relationships and junction tables
  - API patterns and best practices for content management
  - Implementation examples and troubleshooting guide
- **New Content Types**: Converted static tag fields to full content types with dedicated pages
  - Added Quantum Software content type with 54 items migrated from tags
  - Added Quantum Hardware content type with 40 items migrated from tags  
  - Added Quantum Companies content type with 23 items migrated from tags
  - Added Partner Companies content type with 47 items migrated from tags
  - Created 287 total relationships preserving all existing tag associations
- **Admin Interfaces**: Complete CRUD management for all new content types
  - Added `/admin/quantum-software` with full editing capabilities
  - Added `/admin/quantum-hardware` with technical specifications
  - Added `/admin/quantum-companies` with company details
  - Added `/admin/partner-companies` with partnership information
- **Public Content Pages**: Browseable pages for discovering content
  - Added `/paths/quantum-software` and `/paths/quantum-software/[slug]` pages
  - Added `/paths/quantum-hardware` and `/paths/quantum-hardware/[slug]` pages
  - Added `/paths/quantum-companies` and `/paths/quantum-companies/[slug]` pages
  - Added `/paths/partner-companies` and `/paths/partner-companies/[slug]` pages
- **Enhanced Case Study Experience**: Interactive content instead of static badges
  - Case study pages now show clickable links to content pages
  - Hover effects and visual feedback for better UX
  - Related case studies shown on content detail pages
- **Database Architecture**: Robust relationship system with performance optimization
  - Created bidirectional junction tables for all content relationships
  - Added proper indexes for query performance (complex queries execute in ~1.6ms)
  - Implemented soft delete system and RLS policies
  - Maintained backward compatibility with legacy tag fields during transition

### Changed
- **Content Management**: Transformed static tags into full content management system
  - Legacy TEXT[] fields now serve as fallback during transition period
  - All new content prioritizes relationship data over legacy arrays
  - Content fetchers updated to support both old and new data formats
- **API Standardization**: Migrated all 4 new content type APIs to use complex pattern
  - Quantum Software, Hardware, Companies, and Partner Companies now use content-management utilities
  - Consistent error handling, validation, and pagination across all APIs
  - Support for published/draft filtering and relationship management

### Fixed
- **Form Input Consistency**: Fixed inconsistent styling between Input and Textarea components in admin forms
  - All form fields now use consistent "sunken" appearance with `bg-surface-sunken`
  - Unified visual treatment creates better visual hierarchy and user experience
  - Standardized border width (2px) across all input types

### Changed

## [0.5.0] - 2025-08-13

### Added
- **Complete Design System Documentation**: Created comprehensive design system page at `/design-system`
  - Live component examples with actual Card components
  - Interactive light/dark mode toggle
  - Typography scale, color palette, and shadow system documentation
  - Clear Do's and Don'ts guidelines
- **Design System Architecture**: Created `/lib/design-system.ts` as single source of truth
  - Centralized design tokens and component styles
  - Documented design rules and principles
  - Utility functions for consistent styling
- **Improved Design System**: Implemented accessibility-focused color improvements
  - Warmer Light Mode background for better visual comfort
  - Deeper blue-black text for higher contrast (10:1+ ratio)
  - Blue secondary accent color to complement yellow primary
  - Shadow elevation system for visual hierarchy
  - Card hover effects with elevation changes
- **Complete Soft Delete System**: Implemented professional content deletion system across all content types
  - Added `deleted_at` and `deleted_by` columns to all content tables (case studies, blog posts, algorithms, industries, personas)
  - Created secure `soft_delete_content()` and `recover_content()` database functions with SQL injection protection
  - Implemented admin-only delete endpoints with proper authentication and authorization
  - Added recovery system for accidentally deleted content
- **Featured Content System**: Enhanced homepage with featured content capabilities
  - Added `featured` boolean column to case_studies and blog_posts tables with performance indexes
  - Implemented featured content selection in admin interface
  - Homepage displays up to 2 featured case studies with graceful fallback content
- **Newsletter Integration**: Complete newsletter signup system with Beehiiv integration
  - Added NewsletterSignup component with form validation and loading states
  - Integrated with Beehiiv API for professional newsletter management
  - Added newsletter signup call-to-action in sidebar replacing removed content section
  - Implemented rate limiting and error handling for newsletter subscriptions
- **Homepage Redesign**: Completely redesigned homepage with modern magazine-style layout
  - Replaced cluttered layout with clean, organized content sections
  - Added newsletter signup component in prominent sidebar position
  - Improved visual hierarchy and content organization
  - Enhanced mobile responsiveness and accessibility

### Changed
- **Homepage Layout**: Major redesign for improved user experience
  - Removed "Latest Addition" section that was redundant with other content
  - Restructured content sections for better flow and engagement
  - Added partner company badges to case study cards for visual balance and company recognition
  - Implemented consistent hover states across all interactive elements
- **Security Hardening**: Enhanced production security measures
  - Removed temporary localhost authentication bypass from middleware
  - Implemented proper authentication requirements for all write operations
  - Added admin role verification for content management operations
  - Secured environment variables and API key management
- **Database Architecture**: Modernized database with soft delete capabilities
  - Production database updated with all new schema changes
  - Added performance indexes for featured content queries
  - Implemented secure database functions with proper permission grants
- **Professional Design System Implementation**: Complete overhaul with cue from Material Design principles
  - Background remains warm cream for comfort
  - Shadow system strengthened for actual visible elevation
  - All cards now have proper borders AND shadows for definition
- **Strategic Accent Color Usage**: Fixed yellow overuse
  - Icons changed from yellow to gray (professional look)
  - Numbers changed from yellow to bold black (emphasis through weight)
  - Links changed from yellow to gray with subtle hover states
  - Yellow reserved only for primary CTAs and key interactions
- **Improved Visual Hierarchy**: Systematic elevation and spacing
  - Consistent shadow progression (sm, md, lg) indicates importance
  - Increased section padding and grid gaps for breathing room
  - Rounded corners on all cards for modern feel
  - Removed unnecessary hover translations (elevation via shadow only)

### Security
- **API Content Exposure**: Fixed critical vulnerability where unpublished content could be accessed via public API endpoints
  - Removed `includeUnpublished` parameter from all public GET endpoints
  - Hardcoded published-only filtering in API routes to prevent draft content exposure
  - Protects partner companies from having incomplete case studies exposed prematurely
- **Unauthenticated Revalidation Endpoint**: Removed dead `/api/revalidate` endpoint that lacked authentication
  - Endpoint was unused code from old "refresh cache" button feature
  - Eliminated potential DoS attack vector from unauthenticated cache rebuilds
  - All revalidation now happens securely through Server Actions

### Fixed
- **Content Relationship Filtering**: Resolved build failures from unpublished content in relationships
- **Bidirectional Junction Table Handling**: Fixed critical bug where relationship data showed "None" on content pages
  - Implemented context-aware filtering for all bidirectional junction tables
  - Fixed duplicate filtering that was destroying relationship data
  - Properly handles `algorithm_case_study_relations`, `case_study_industry_relations`, `case_study_persona_relations`, `algorithm_industry_relations`, `persona_algorithm_relations`, and `persona_industry_relations` based on page context
  - Ensures correct nested key usage ('algorithms', 'industries', 'personas', 'case_studies') depending on the content type being filtered
  - Added JavaScript runtime filtering to handle mixed published/unpublished content gracefully
  - Modified `generateStaticParams` to only build pages for published content
  - Made page components resilient to null relationships from unpublished content
  - Maintained static site generation performance while fixing content workflow issues
- **Card Height Consistency**: Fixed visual imbalance in homepage content cards
  - Added partner company badges to case study cards to match blog post card heights
  - Improved visual consistency across all content card layouts
- **Authentication Middleware**: Corrected authentication flow for production deployment
  - Removed development-only localhost bypasses
  - Ensured proper authentication requirements for all admin operations
- **Critical Sentry Errors**: Fixed production errors affecting user experience
  - Resolved infinite recursion in content metadata extraction (RangeError: Maximum call stack size exceeded)
  - Fixed React Server Components module resolution error for GlobalSearch component
  - Improved build performance and reduced homepage bundle size (4.57kB → 3.17kB)
- **Design System Consistency**: Comprehensive audit and fixes across entire codebase
  - Fixed hard-coded colors in NewsletterSignup and AlphaBanner components
  - Updated Card component to use proper shadow system (shadow-md default, shadow-lg on hover)
  - Removed opacity from border hover states for better visibility
  - Applied consistent semantic tokens across all 145+ pages
- **Visual Hierarchy Correction**: Fixed backwards elevation system
  - Sidebar cards now properly elevated (white with shadows) instead of sunken
  - Hero sections use muted backgrounds to recede appropriately
  - Main content areas maintain proper elevation with white backgrounds
  - All professional layout components updated for consistent hierarchy

### Removed
- **Development Artifacts**: Cleaned up temporary files and development tools
  - Deleted migrations_backup folder with broken migration files
  - Cleaned up unused development scripts and temporary SQL files
- **Redundant Homepage Sections**: Streamlined homepage content
  - Removed "Latest Addition" section that duplicated other content areas
  - Simplified content presentation for better user focus

## [0.4.1] - Previous Release

### Fixed
- CMS Content Filtering: Fixed unpublished case studies appearing on public pages
- Mobile Responsiveness: Fixed various layout issues on mobile devices
- Security: Fixed content exposure vulnerabilities in API endpoints

### Added
- Supabase Auth migration completed
- Professional layouts for case studies, algorithms, industries, and personas
- Interactive Knowledge Map component for homepage

### Changed
- Redesigned homepage with particle field animation and dashboard metrics
- Improved search functionality with type filtering
