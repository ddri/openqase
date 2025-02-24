# Content Management System Refactoring

## Changes

This PR implements several improvements to our content management system:

### Content Loader Refactoring
- Added a centralized directory-to-content-type mapping to improve maintainability
- Enhanced content validation with type-specific required fields
- Improved MDX content handling and compilation
- Added proper TypeScript types for all content operations
- Simplified content loading logic with better error handling

### Case Studies Page Updates
- Migrated to use the new centralized content loader
- Removed duplicate type definitions in favor of shared types
- Fixed persona link paths to match the correct URL structure
- Improved type safety throughout the component

### Personas Page Updates
- Added client-side rendering support
- Updated content loading to use the new type system
- Enhanced type safety for case study mapping
- Improved component structure and organization

### Type System Improvements
- Added `rawContent` field to BaseContent interface for better MDX handling
- Consolidated content type definitions
- Enhanced type safety across the application

## Testing Done
- Verified content loading works for all content types
- Confirmed proper validation of required fields
- Tested case study and persona page rendering
- Checked all internal links are working correctly
- Validated MDX content compilation and rendering

## Technical Notes
- The new directory-to-content-type mapping makes it easier to add new content types
- Type-specific validation ensures content integrity
- The centralized loader reduces code duplication and improves maintainability
- All content types now properly include raw MDX content for rendering

## Breaking Changes
None. This refactoring maintains backward compatibility while improving the internal structure.