# Security Fix Plan: Unpublished Content Exposure

## 1. Discovery Phase - What We Need to Know

### Current State Audit
- [ ] Find all API routes that accept `includeUnpublished` parameter
- [ ] Identify which frontend components call these APIs
- [ ] Check if preview mode depends on these endpoints
- [ ] Verify admin panel usage of these endpoints
- [ ] Document current behavior for rollback if needed

### Risk Assessment

#### What Could Break
1. **Preview Mode**: If preview components fetch additional data via API
2. **Admin Panel**: If admin UI makes API calls expecting unpublished content
3. **Search Functionality**: If search includes unpublished content for admins
4. **Static Generation**: If build process uses these APIs (unlikely but check)
5. **Development Workflow**: Local development expecting to see drafts

#### Security Risks of NOT Fixing
1. **Data Leak**: Competitors could see upcoming case studies
2. **SEO Damage**: Search engines could index draft content
3. **Partner Trust**: Companies see incomplete case studies about them
4. **Reputation**: Security researchers could publicize the vulnerability

## 2. Implementation Plan

### Phase 1: Audit Current Usage
```bash
# Commands to run:
grep -r "includeUnpublished" --include="*.ts" --include="*.tsx"
grep -r "published.*false" --include="*.ts" --include="*.tsx"
```

### Phase 2: Create Safe/Unsafe Endpoint Separation

#### Public Endpoints (UNSAFE - need fixing):
- `GET /api/case-studies` 
- `GET /api/algorithms`
- `GET /api/industries`
- `GET /api/personas`
- `GET /api/blog-posts`
- `GET /api/search-data`

#### Admin Endpoints (SAFE - already auth protected):
- `POST/PUT/DELETE /api/*`
- Admin-specific GET endpoints

### Phase 3: Fix Strategy

#### Option A: Quick Fix (Recommended for v0.5.0)
```typescript
// In each public GET endpoint, remove this:
const includeUnpublished = searchParams.get('includeUnpublished') === 'true';

// Replace with:
const includeUnpublished = false; // Always false for public endpoints
```

#### Option B: Proper Fix (for v0.5.1)
```typescript
// Check user role before accepting parameter
const user = await getUser(request);
const includeUnpublished = user?.role === 'admin' && 
                           searchParams.get('includeUnpublished') === 'true';
```

## 3. Testing Plan

### Manual Testing Checklist
- [ ] Public API returns only published content
- [ ] API with `?includeUnpublished=true` still returns only published
- [ ] Admin panel still works (uses different endpoints or auth)
- [ ] Preview mode still shows unpublished content
- [ ] Search doesn't expose unpublished content
- [ ] Build process completes successfully

### Automated Testing
```typescript
// Test to add:
describe('API Security', () => {
  it('should not expose unpublished content via query param', async () => {
    const res = await fetch('/api/case-studies?includeUnpublished=true');
    const data = await res.json();
    expect(data.every(item => item.published === true)).toBe(true);
  });
});
```

## 4. Rollback Plan

### If Something Breaks
1. Git revert the commit
2. Deploy previous version
3. Document what broke for proper fix

### Monitoring After Deploy
- Check error logs for 404s or failed requests
- Monitor admin panel functionality
- Verify preview links still work
- Check build logs for issues

## 5. Documentation Updates

### Files to Update
- [ ] `SECURITY-AUDIT-2025-01.md` - Mark as fixed
- [ ] `CHANGELOG.md` - Add security fix entry
- [ ] `README.md` - Update API documentation if needed
- [ ] `CLAUDE.md` - Add note about API security model

### Communication
- [ ] Notify team about API behavior change
- [ ] Update any API documentation
- [ ] Consider security disclosure timeline

## 6. Alternative Solutions Considered

### Why Not These Approaches:

1. **RLS Only**: Would require major refactoring, risky for hotfix
2. **Separate Auth Endpoints**: Would duplicate code, maintenance burden
3. **JWT Tokens**: Over-engineering for current needs
4. **Complete API Rewrite**: Too risky for production hotfix

## 7. Success Criteria

- [ ] No unpublished content accessible via public API
- [ ] All existing features still work
- [ ] No performance degradation
- [ ] Clean security scan
- [ ] No user-facing breaking changes

## 8. Timeline

- **Hour 1**: Discovery and audit
- **Hour 2**: Implement fixes
- **Hour 3**: Testing
- **Hour 4**: Documentation and deploy

Total estimate: 4 hours for complete fix with testing