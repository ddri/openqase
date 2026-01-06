# Changelog

All notable changes to OpenQase will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive API reference documentation (905 lines) covering all 26 endpoints
- OpenAPI 3.0.3 specification for Swagger/Postman compatibility
- Complete environment variables guide with security best practices
- Enhanced CONTRIBUTING.md with commit conventions and security guidelines
- Documentation archive folder for historical planning documents
- Improved documentation index in docs/README.md

### Changed
- Renamed api-documentation.md to api-architecture.md for clarity
- Reorganized README.md documentation links for better discoverability
- Moved planning documents to docs/archive/

### Fixed
- Added \`SET search_path = ''\` to SECURITY DEFINER functions to prevent search_path attacks
- Removed legacy TEXT[] field references from codebase

### Security
- Fixed SECURITY DEFINER functions (recover_content, soft_delete_content)
- Database migration applied to production

## [0.5.0] - 2026-01-05

### Added
- Unified content fetching system for static generation
- Hybrid architecture (static public pages, dynamic admin)
- Professional soft delete system with restore capability
- Featured content management for homepage
- Comprehensive case study import system
- Newsletter integration with Beehiiv and Resend
- Trash view for deleted content management
- Project plan document with vision, roadmap, and business model

### Changed
- Complete migration from TEXT[] arrays to relationship tables
- Improved performance: 50-100ms page loads (300x faster)
- Build time reduced to 23 seconds (87% faster)
- 145+ static pages pre-generated at build time
- Zero runtime database calls for public content

### Removed
- Legacy TEXT[] fields (quantum_software, quantum_hardware, etc.)
- N+1 query problems through unified content fetching

### Fixed
- Filtered deleted case studies from admin list
- Infinite recursion errors in relationship queries
- Module resolution issues in Sentry integration

### Security
- Comprehensive security audit completed
- Package updates for all dependencies
- 0 production vulnerabilities

## [0.4.0] - 2025-12-XX

### Added
- Next.js 15 upgrade with App Router
- Supabase integration for database and auth
- Admin CMS with content management
- shadcn/ui component library
- Tailwind CSS styling system

### Changed
- Migration from pages router to app router
- Improved routing structure
- Enhanced component organization

---

## Versioning Guide

### Version Format: MAJOR.MINOR.PATCH

- **MAJOR** (1.0.0): Breaking changes, major architectural shifts
- **MINOR** (0.X.0): New features, monthly milestone releases
- **PATCH** (0.0.X): Bug fixes, minor improvements

### Monthly Milestone Releases

- **v0.6.0** (Feb 1, 2026): Content Quality & Cleanup
- **v0.7.0** (Mar 1, 2026): CMS Power Features
- **v0.8.0** (Apr 1, 2026): Visualization & Technical Content
- **v0.9.0** (May 1, 2026): Infrastructure & Scale
- **v1.0.0** (Jul 1, 2026): Production Ready

### Categories

- **Added**: New features
- **Changed**: Changes to existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security improvements

---

## Links

- [Project Plan](./docs/openqase-project-plan.md) - Detailed roadmap and strategy
- [Release Notes](./docs/release-notes.md) - Technical release details
- [GitHub Releases](https://github.com/openqase/openqase/releases) - Release tags
- [GitHub Milestones](https://github.com/openqase/openqase/milestones) - Progress tracking

---

**Note**: This CHANGELOG started with v0.5.0. Previous versions are documented with approximate dates and may be incomplete.
