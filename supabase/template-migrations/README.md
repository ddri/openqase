# Database Migrations

## Migration: 20240107000000_remove_icon_add_sector_industries.sql

This migration updates the `industries` table schema to align with the application code changes:

### Changes:
1. **Removes** the `icon` column (text) - no longer used in the application
2. **Adds** the `sector` column (text[]) - array of sector/segment names for industry categorization

### Why this migration is needed:
- The application code was updated to use a `sector` array field instead of the `icon` field
- Without this migration, runtime errors occur when:
  - Loading industry data in the admin interface
  - Saving industry data through the admin forms
  - Displaying industry sectors on public pages

### To apply this migration:
```bash
# Using Supabase CLI
supabase migration up

# Or manually in SQL editor
-- Run the contents of 20240107000000_remove_icon_add_sector_industries.sql
```

### To rollback (if needed):
```bash
# Run the contents of 20240107000000_remove_icon_add_sector_industries_rollback.sql
```

### Affected components:
- `/src/app/admin/industries/[id]/client.tsx` - Admin form for editing industries
- `/src/components/IndustryList.tsx` - Public industry listing with sector filtering
- `/src/app/admin/industries/[id]/actions.ts` - Server actions for saving industry data