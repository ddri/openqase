# Claude Code Development Guidelines for OpenQase

This file contains development guidelines and practices specific to the OpenQase project. Claude Code should follow these guidelines when working on the codebase.

## CHANGELOG Maintenance

### When to Update CHANGELOG.md
Update the CHANGELOG for these types of changes:
- **Fixed**: Bug fixes that affect user experience or content display
- **Added**: New features, components, or significant functionality
- **Changed**: Modifications to existing features that change behavior
- **Security**: Fixes for security vulnerabilities or content exposure issues
- **Removed**: Features or functionality that has been removed

### CHANGELOG Update Process
1. **During development**: Add entries to the `[Unreleased]` section
2. **Before major commits**: Ensure CHANGELOG reflects the changes being committed
3. **Format**: Use clear, user-focused descriptions that explain the impact, not just the technical details

### CHANGELOG Entry Examples
```markdown
### Fixed
- **CMS Content Filtering**: Fixed unpublished case studies appearing on public pages

### Added  
- **New Component**: Added particle field animation for homepage background

### Changed
- **Search Functionality**: Improved search performance and added type filtering
```

## Commit Practices

### Commit Message Format
- Use conventional commit format: `type: description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Keep first line under 50 characters
- Add detailed explanation in body if needed

### Before Committing
1. Update CHANGELOG.md if the change is notable
2. Ensure code follows existing patterns and conventions
3. Test changes don't break existing functionality

## Content Management System (CMS) Guidelines

### Published Content Filtering
- Always filter relationships for `published: true` in runtime queries
- Preserve preview mode functionality for team access to drafts
- Maintain static site generation architecture for performance
- Never expose unpublished content in public queries

### Database Query Patterns
- Use `getStaticContentWithRelationships()` for single content items
- Use `getStaticContentList()` for content lists
- Include `published` field in relationship queries when filtering is needed
- Apply published filters conditionally based on preview mode

### Deletion System (View-Based Architecture)
- **Public pages**: Use `public_*` views (e.g., `public_case_studies`) - shows only published content
- **Admin pages**: Use `admin_*` views (e.g., `admin_case_studies`) - shows all non-deleted content
- **Trash/Recovery**: Use `trash_*` views (e.g., `trash_case_studies`) - shows only deleted content
- **Soft delete**: Use `soft_delete_content()` database function
- **Recovery**: Use `recover_content()` database function
- Content has `content_status` field: 'draft', 'published', 'archived', 'deleted'
- 30-day retention period for soft-deleted content before permanent deletion
- See `/docs/deletion-system-implementation.md` for full technical documentation

## Architecture Principles

### Static Site Generation
- Maintain build-time generation of all pages for performance
- Filter content at runtime, not build-time (except for special cases)
- Preserve ISR (Incremental Static Regeneration) capabilities
- Keep preview workflows functional for team collaboration

### Bidirectional Junction Tables
**CRITICAL**: The CMS uses bidirectional junction tables for relationships. These tables are used differently depending on the content type context:

#### Junction Table Mappings
- `algorithm_case_study_relations`:
  - On case study pages: contains algorithms (use nested key: 'algorithms')
  - On algorithm pages: contains case studies (use nested key: 'case_studies')
  
- `case_study_industry_relations`:
  - On case study pages: contains industries (use nested key: 'industries')
  - On industry pages: contains case studies (use nested key: 'case_studies')
  
- `case_study_persona_relations`:
  - On case study pages: contains personas (use nested key: 'personas')
  - On persona pages: contains case studies (use nested key: 'case_studies')
  
- `algorithm_industry_relations`:
  - On algorithm pages: contains industries (use nested key: 'industries')
  - On industry pages: contains algorithms (use nested key: 'algorithms')
  
- `persona_algorithm_relations`:
  - On persona pages: contains algorithms (use nested key: 'algorithms')
  - On algorithm pages: contains personas (use nested key: 'personas')
  
- `persona_industry_relations`:
  - On persona pages: contains industries (use nested key: 'industries')
  - On industry pages: contains personas (use nested key: 'personas')

#### Implementation Notes
- The `filterRelationships()` function in `content-fetchers.ts` handles context detection
- Content type is determined by checking unique properties (e.g., `quantum_advantage` for algorithms)
- NEVER filter the same relationship data multiple times - it will destroy the data
- Currently, published field filtering is disabled for relationships due to inconsistent data

### Code Quality
- Follow existing code patterns and conventions
- Prefer editing existing files over creating new ones
- Use TypeScript types consistently
- Keep security best practices (never expose secrets/keys)

## Testing and Validation

### Before Deployment
- Run build process to ensure compilation
- Test affected pages in development environment
- Verify CHANGELOG accurately reflects changes
- Ensure no unpublished content appears in public views

## Documentation Standards

- Update CHANGELOG.md for user-facing changes
- Add inline comments for complex logic
- Document architectural decisions in code comments
- Keep README.md current with setup/deployment instructions