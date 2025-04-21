# Database Cleanup Plan

## Type Organization

### Current Issues
1. Types are imported from multiple locations:
   - `@/types/supabase`
   - `@/lib/database.types`
   - `@/lib/types`

2. Inconsistent import styles:
   - Some use `type` keyword
   - Some don't
   - Some import directly from database types
   - Others use intermediate type files

### Action Plan

1. **Standardize on `@/types/supabase`**
   - Make this the single source of truth for database types
   - Remove or deprecate types in `@/lib/database.types.ts`
   - Update all imports to use this path

2. **Clean up `@/lib/types.ts`**
   - Keep only shared interfaces and types not directly from database
   - Import database types from `@/types/supabase` when needed
   - Document the purpose of this file

3. **Standardize Import Style**
   - Use `import type { Database } from '@/types/supabase'` consistently
   - This makes it clear we're only importing types, not values

### Migration Tasks

1. **API Routes to Update** ✅
   - `src/app/api/personas/route.ts` ✅
   - `src/app/api/industries/route.ts` ✅
   - `src/app/api/algorithms/route.ts` ✅

2. **Admin Pages to Update** ✅
   - `src/app/admin/case-studies/page.tsx` ✅
   - `src/app/admin/personas/page.tsx` ✅
   - `src/app/admin/algorithms/page.tsx` ✅
   - `src/app/admin/industries/page.tsx` ✅

3. **Components to Update** ✅
   - `src/components/PersonaManager.tsx` ✅ (uses relative path)

### Next Steps
1. ~~Audit all files importing from `@/lib/database.types.ts`~~ ✅
2. ~~Create a migration plan for updating imports~~ ✅
3. Update documentation to reflect the new type organization
4. Remove deprecated type files after migration 