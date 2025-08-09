# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Preview Mode**: Implemented Next.js draft mode for admins to preview unpublished content
- **Preview Button**: Added preview button to admin case study editor that opens content in draft mode
- **Homepage Revalidation**: Homepage automatically updates via ISR when featured case studies are saved
- **Featured Case Studies**: Added database schema and UI for featuring case studies on homepage
  - Added `featured` boolean column to case_studies table with index
  - Implemented featured checkbox in admin UI with proper save state triggering
  - Homepage displays up to 2 featured case studies with graceful fallback

### Changed
- **Homepage Performance**: Dramatically improved homepage performance through proper static generation
  - Added `export const dynamic = 'force-static'` to enforce build-time generation
  - Eliminated 6 parallel runtime database queries
  - Reduced LCP from 5.3s to 1.5s (71% improvement)
  - Improved Lighthouse performance score from 0.75 to 0.97
- **Cache Management**: Implemented industry-standard Pattern A for CMS cache invalidation
  - Replaced broken client-side cache refresh with server-side ISR
  - Added automatic revalidation through server actions on save/publish
  - Aligned with Next.js best practices and modern CMS patterns (Sanity, Contentful, Strapi)
- **CMS Architecture**: Completed the preview mode implementation that was planned but never finished
  - Pure server-side approach with no client-side revalidation
  - Clean separation between draft and published content states
  - Maintains static-first architecture while enabling dynamic updates

### Fixed
- **CMS Content Filtering**: Fixed unpublished case studies appearing on Algorithm, Persona, and Industry pages. Related case studies are now properly filtered to show only published content while preserving preview mode functionality for team access to drafts. This fix maintains the static site generation performance architecture while ensuring content workflow integrity.
- **Featured Case Studies Database**: Added missing `featured` column that was causing SQL errors
- **GitHub Link**: Corrected homepage GitHub link from `/openqase` to `/ddri/openqase`
- **Cache Refresh Errors**: Fixed 401 errors from middleware blocking client-side revalidation attempts
- **Async draftMode**: Updated preview mode implementation for Next.js 15 async `draftMode()` API
- **Admin UI Polish**: 
  - Cleaned up featured checkbox styling, removed star emoji
  - Positioned featured checkbox left of Save button
  - Simplified label to "Feature article"

### Removed
- **Broken Refresh Cache Button**: Removed non-functional client-side cache refresh button from admin
- **Redundant Metadata Display**: Removed duplicate Key Metrics Bar from case study pages that repeated Quick Facts sidebar information

### Known Issues
- **Build Warnings**: Some case studies referenced in relationship data have not been imported to database yet, causing harmless 404 warnings during static generation. These can be fixed by updating fetchers to use `.maybeSingle()` instead of `.single()` for relationship lookups.

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
