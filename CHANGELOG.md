# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- **Homepage Performance**: Fixed homepage to use static generation at build time with `force-static`, improving LCP from 5.3s to 1.5s (71% improvement) and performance score from 0.75 to 0.97

### Known Issues
- **Build Warnings**: Some case studies referenced in JSON files have not been imported to database yet, causing harmless build warnings

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