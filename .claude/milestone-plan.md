# GitHub Issues & Milestones Organization Plan

## Current State
- **Version**: v0.5.0 (released)
- **Open Issues**: 11
- **Existing Milestones**: v0.1.0 (outdated), v0.2.0 (outdated)
- **Organization**: Inconsistent - no clear version targeting

## Proposed Milestone Structure

### Milestone: v0.6.0 - Content & Quality (Next Release)
**Theme**: Polish existing features, improve content quality
**Target**: Q1 2026

**Issues to Include:**
- #104 - [Content]: Case study quality audit and template standardization
- #102 - [Cleanup]: Remove legacy TEXT[] fields from case_studies table
- #100 - [Enhancement]: Redesign OpenGraph social sharing image
- #54 - Add Multi-Angle Layered Variational Quantum Algorithm to Algorithms

**Rationale:**
- Focuses on content quality and cleanup after v0.5.0's major features
- Completes the transition from legacy TEXT[] to new content types (#102)
- Improves presentation and discovery (OG images)
- Low-risk, high-value improvements

**Estimated Effort**: Medium (2-3 weeks)

---

### Milestone: v0.7.0 - CMS Enhancements
**Theme**: Admin and content management improvements
**Target**: Q2 2026

**Issues to Include:**
- #99 - [Feature]: Add deletion audit log for content management
- #103 - [Feature]: Review and redesign bulk import system
- #101 - [Feature]: Complete newsletter system - sending, analytics, and campaigns

**Rationale:**
- Focuses on making the CMS more powerful and production-ready
- Audit logging adds accountability for content management
- Bulk import enables scaling content operations
- Newsletter completion enables marketing/engagement

**Estimated Effort**: Large (4-6 weeks)

---

### Milestone: v0.8.0 - Enhanced Visualization & UX
**Theme**: Visual improvements and user experience
**Target**: Q2-Q3 2026

**Issues to Include:**
- #26 - Redesign the algorithm pages to handle latex/math formulas
- #28 - Industry pages - ideas for visualisations and graphics
- #10 - Add javascript charting and diagraming tool (e.g. Mermaid)

**Rationale:**
- Groups visualization and design improvements
- All require design thinking and potentially new dependencies
- Can be tackled together once Mermaid/charting infrastructure is in place
- Enhances learning experience for technical content

**Estimated Effort**: Large (4-5 weeks)

---

### Milestone: v0.9.0 - Monetization & Community
**Theme**: Revenue features and community engagement
**Target**: Q3-Q4 2026

**Issues to Include:**
- #96 - Feature: Add sponsor blocks

**Rationale:**
- Business/sustainability focused
- Enables project monetization
- Can be expanded with additional revenue-related issues

**Estimated Effort**: Medium (2-3 weeks)

---

### Milestone: v1.0.0 - Production Ready
**Theme**: Stability, testing, documentation
**Target**: Q4 2026 or later

**Issues to Include:**
- TBD - Type safety improvements (from README roadmap)
- TBD - Testing infrastructure (from README roadmap)
- TBD - Documentation completion (from README roadmap)
- TBD - Enhanced search system (from README roadmap)

**Rationale:**
- Represents "production ready" milestone
- Focuses on robustness, maintainability, scale
- Should include comprehensive testing and documentation
- Signals stability for contributors and users

**New Issues Needed:**
- Create issues for roadmap items not yet tracked
- Performance benchmarking and optimization
- Security audit
- Accessibility audit (WCAG compliance)

---

## Issues Without Milestone (Backlog)

### Consider Creating These Issues from README Roadmap:
1. **Enhanced Search System** - Upgrade to Supabase full-text search
2. **Type Safety Improvements** - Remove `as any`, add generics
3. **Testing Infrastructure** - Jest/Vitest setup
4. **Redis Caching** - Upgrade rate limiting
5. **Database Function Security** - Add `SET search_path`
6. **Authentication Documentation** - Document patterns
7. **Troubleshooting Guide** - Common issues
8. **Environment Variables Guide** - Comprehensive docs
9. **Deployment Guide** - Beyond Vercel

### Issues That Might Be Stale:
- #10 (Feb 2025) - Charting tool - still relevant?
- #26 (Mar 2025) - Algorithm LaTeX - still needed?
- #28 (Mar 2025) - Industry visualizations - still planned?
- #54 (May 2025) - MALAQA algorithm - still wanted?

**Recommendation**: Review these older issues to confirm they're still priorities.

---

## Migration Plan

### Phase 1: Review & Validate
1. Review old issues (#10, #26, #28, #54) - confirm still relevant
2. Get stakeholder input on milestone groupings
3. Confirm v0.6.0 scope and timeline

### Phase 2: Create New Milestones
```bash
# Create v0.6.0
gh api repos/:owner/:repo/milestones -f title="v0.6.0 - Content & Quality" -f description="Polish existing features, improve content quality, complete content type migration" -f due_on="2026-03-31T00:00:00Z"

# Create v0.7.0
gh api repos/:owner/:repo/milestones -f title="v0.7.0 - CMS Enhancements" -f description="Admin improvements: audit logging, bulk import, newsletter system" -f due_on="2026-06-30T00:00:00Z"

# Create v0.8.0
gh api repos/:owner/:repo/milestones -f title="v0.8.0 - Enhanced Visualization & UX" -f description="Visual improvements: LaTeX formulas, industry graphics, charting tools" -f due_on="2026-09-30T00:00:00Z"

# Create v0.9.0
gh api repos/:owner/:repo/milestones -f title="v0.9.0 - Monetization & Community" -f description="Revenue features and community engagement tools" -f due_on="2026-12-31T00:00:00Z"
```

### Phase 3: Assign Issues to Milestones
```bash
# v0.6.0 assignments
gh issue edit 104 --milestone "v0.6.0 - Content & Quality"
gh issue edit 102 --milestone "v0.6.0 - Content & Quality"
gh issue edit 100 --milestone "v0.6.0 - Content & Quality"
gh issue edit 54 --milestone "v0.6.0 - Content & Quality"

# v0.7.0 assignments
gh issue edit 99 --milestone "v0.7.0 - CMS Enhancements"
gh issue edit 103 --milestone "v0.7.0 - CMS Enhancements"
gh issue edit 101 --milestone "v0.7.0 - CMS Enhancements"

# v0.8.0 assignments
gh issue edit 26 --milestone "v0.8.0 - Enhanced Visualization & UX"
gh issue edit 28 --milestone "v0.8.0 - Enhanced Visualization & UX"
gh issue edit 10 --milestone "v0.8.0 - Enhanced Visualization & UX"

# v0.9.0 assignments
gh issue edit 96 --milestone "v0.9.0 - Monetization & Community"
```

### Phase 4: Create Missing Issues
Create issues for README roadmap items not yet tracked:
- Enhanced Search System
- Type Safety Improvements
- Testing Infrastructure
- Redis Caching
- Database Function Security
- Documentation improvements (Auth, Troubleshooting, Env Vars, Deployment)

### Phase 5: Close/Archive Old Milestones
```bash
# Close v0.1.0 and v0.2.0 since they're complete
gh api repos/:owner/:repo/milestones/1 -X PATCH -f state="closed"
gh api repos/:owner/:repo/milestones/2 -X PATCH -f state="closed"
```

---

## Alternative: Simpler Approach

If milestones feel too heavyweight, consider:

### Option B: Label-Based Organization
**Create labels instead:**
- `priority: high` / `priority: medium` / `priority: low`
- `version: v0.6.0` / `version: v0.7.0` / etc.
- `theme: content` / `theme: cms` / `theme: visualization` / `theme: docs`
- `effort: small` / `effort: medium` / `effort: large`
- `status: ready` / `status: blocked` / `status: in-progress`

**Benefits:**
- More flexible (issues can have multiple themes)
- Less overhead to maintain
- Easier to filter and query

**Drawbacks:**
- Less visible progress tracking
- No built-in "release planning" view
- Requires more manual organization

---

## Recommendation

**For OpenQase, I recommend: Hybrid Approach**

1. **Use Milestones** for major versions (v0.6.0, v0.7.0, v0.8.0, v1.0.0)
2. **Use Labels** for additional organization:
   - `priority: high/medium/low`
   - `effort: small/medium/large`
   - `type: feature/bug/docs/cleanup`
3. **Keep README Roadmap** as high-level public view
4. **Use CHANGELOG** for released features
5. **Use Planning Docs** (MORECONTENT.md, etc.) for detailed specs

This gives you:
- Clear release planning (milestones)
- Flexible organization (labels)
- Public transparency (README)
- Technical detail (planning docs)

---

## Next Steps

1. **Review this plan** - Does the milestone grouping make sense?
2. **Validate old issues** - Are #10, #26, #28, #54 still wanted?
3. **Confirm v0.6.0 scope** - Is this the right next release?
4. **Decide on approach** - Full milestones, labels only, or hybrid?
5. **Execute migration** - Create milestones and assign issues

Ready to proceed?
