# OpenQase 0.5.0 Release Checklist

## Overview
This checklist tracks all tasks required for the 0.5.0 release, which includes the redesigned homepage, soft delete functionality, featured content system, and newsletter integration.

## Critical Security Tasks

### 1. Remove Localhost Auth Bypass ⚠️
**Priority: HIGH**
- [ ] Remove temporary localhost bypass from `/src/middleware.ts` (lines 68-77)
- [ ] Test authentication works properly in production
- [ ] Ensure admin routes are protected
- [ ] Verify API endpoints require proper authentication

### 2. Review Environment Variables 🔒
**Priority: HIGH**
- [ ] Remove any sensitive keys from `.env.local`
- [ ] Ensure production keys are properly secured
- [ ] Verify Beehiiv API key is production-ready
- [ ] Check Supabase service role key is not exposed

## Database Migration Tasks

### 3. Production Database Updates 📊
**Priority: HIGH**
```sql
-- SQL to run in production Supabase SQL editor:

-- Add soft delete fields to all content tables
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS deleted_by UUID;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS deleted_by UUID;
ALTER TABLE algorithms ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE algorithms ADD COLUMN IF NOT EXISTS deleted_by UUID;
ALTER TABLE industries ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE industries ADD COLUMN IF NOT EXISTS deleted_by UUID;
ALTER TABLE personas ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE personas ADD COLUMN IF NOT EXISTS deleted_by UUID;

-- Add featured field for blog posts and case studies
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

-- Create soft delete function
CREATE OR REPLACE FUNCTION soft_delete_content(
  table_name TEXT,
  content_id UUID
) RETURNS void AS $$
BEGIN
  EXECUTE format('UPDATE %I SET deleted_at = NOW() WHERE id = $1', table_name)
  USING content_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create recover function
CREATE OR REPLACE FUNCTION recover_content(
  table_name TEXT,
  content_id UUID
) RETURNS void AS $$
BEGIN
  EXECUTE format('UPDATE %I SET deleted_at = NULL, deleted_by = NULL WHERE id = $1', table_name)
  USING content_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## SEO & Content Tasks

### 4. Fix 301 Redirects 🔄
**Priority: MEDIUM**
- [ ] Identify all URL changes that caused 301s
- [ ] Implement proper redirects in Next.js config
- [ ] Submit updated sitemap to Google Search Console
- [ ] Monitor for crawl errors

### 5. Content Consistency Audit 📝
**Priority: LOW**
- [ ] Review all content for en-UK vs en-US spelling
- [ ] Check for typos in case studies
- [ ] Ensure consistent terminology (e.g., "optimisation" vs "optimization")
- [ ] Update any outdated information

## Repository Cleanup

### 6. Remove Temporary Files 🧹
**Priority: LOW**
- [ ] Delete `/Users/dryan/GitHub/openqase/DELETEPLAN.md`
- [ ] Remove `/Users/dryan/GitHub/openqase/migrations_backup/` folder
- [ ] Clean up any test data or temporary files
- [ ] Review `.gitignore` for completeness

## Documentation Updates

### 7. Update CHANGELOG.md 📋
**Priority: MEDIUM**
Add entries for:
- Soft delete system implementation
- Featured content functionality
- Homepage redesign with newsletter signup
- Beehiiv integration
- Bug fixes for unpublished content filtering

### 8. Create Release Notes 📄
**Priority: MEDIUM**
- [ ] Write user-facing release notes
- [ ] Document breaking changes (if any)
- [ ] Include upgrade instructions
- [ ] Add screenshots of new features

### 9. Update Setup Documentation 📚
**Priority: LOW**
- [ ] Document new database requirements
- [ ] Add Beehiiv setup instructions
- [ ] Update environment variable documentation
- [ ] Include new admin features guide

## Testing & Verification

### 10. Production Testing ✅
**Priority: HIGH**
Before deploying:
- [ ] Test delete functionality with proper auth
- [ ] Verify featured content appears correctly
- [ ] Confirm newsletter signup works
- [ ] Check all pages build without errors
- [ ] Validate no unpublished content is visible
- [ ] Test admin panel access and permissions

### 11. Performance Verification ⚡
**Priority: MEDIUM**
- [ ] Run Lighthouse audit
- [ ] Check build size hasn't increased significantly
- [ ] Verify static generation still works
- [ ] Test page load speeds

## Deployment Steps

### 12. Pre-deployment
1. Complete all HIGH priority tasks
2. Create git tag for 0.5.0
3. Backup production database
4. Prepare rollback plan

### 13. Deployment
1. Deploy to staging environment first
2. Run smoke tests
3. Deploy to production
4. Run production database migrations
5. Verify all features working

### 14. Post-deployment
1. Monitor error logs
2. Check analytics for issues
3. Announce release
4. Archive completed tasks

## Notes

- **Current Status**: All development work is complete and tested locally
- **Blockers**: Need to remove localhost auth bypass before production
- **Timeline**: Target release date pending completion of security tasks
- **Rollback Plan**: Keep 0.4.x branch available for quick revert if needed

## Sign-off

- [ ] Development complete
- [ ] Security review complete
- [ ] Database migrations tested
- [ ] Documentation updated
- [ ] Production testing complete
- [ ] Ready for release

---
*Last updated: [Current Date]*
*Version: 0.5.0-rc1*