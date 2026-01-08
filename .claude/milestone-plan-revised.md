# GitHub Issues & Milestones Organization Plan (REVISED)

## Timeline
- **Current Date**: January 5, 2026
- **Current Version**: v0.5.0
- **Target**: v1.0.0 by July 1, 2026 (6 months)
- **Cadence**: Monthly milestone releases

## Revised Milestone Structure

### Milestone: v0.6.0 - February 1, 2026 (4 weeks)
**Theme**: Content Quality & Cleanup

**Issues:**
- #104 - Case study quality audit and template standardization
- #102 - Remove legacy TEXT[] fields from case_studies table
- #100 - Redesign OpenGraph social sharing image
- #54 - Add Multi-Angle Layered Variational Quantum Algorithm

**New Issues to Create:**
- Database function security - Add `SET search_path` to 9 SECURITY DEFINER functions
- Fix content language checking tool database connection

**Effort**: ~4 weeks | **Risk**: Low

---

### Milestone: v0.7.0 - March 1, 2026 (4 weeks)
**Theme**: CMS Power Features

**Issues:**
- #99 - Add deletion audit log for content management
- #103 - Review and redesign bulk import system
- #101 - Complete newsletter system (sending, analytics, campaigns)

**New Issues to Create:**
- Multi-admin support - Additional user roles and permissions
- Enhanced admin UI improvements

**Effort**: ~4 weeks | **Risk**: Medium

---

### Milestone: v0.8.0 - April 1, 2026 (4 weeks)
**Theme**: Visualization & Technical Content

**Issues:**
- #26 - Redesign algorithm pages to handle latex/math formulas
- #28 - Industry pages - visualizations and graphics
- #10 - Add javascript charting and diagraming tool (Mermaid)

**New Issues to Create:**
- Enhanced search system - Upgrade to Supabase full-text search
- Algorithm visualization enhancements

**Effort**: ~4 weeks | **Risk**: Medium

---

### Milestone: v0.9.0 - May 1, 2026 (4 weeks)
**Theme**: Infrastructure & Scale

**Issues:**
- #96 - Add sponsor blocks

**New Issues to Create:**
- Redis caching - Upgrade from in-memory rate limiting
- API rate limiting improvements for production
- Performance optimization and benchmarking
- Bundle size optimization

**Effort**: ~4 weeks | **Risk**: Medium

---

### Milestone: v1.0.0 - July 1, 2026 (8 weeks, including June buffer)
**Theme**: Production Ready - Testing, Docs, Polish

**New Issues to Create:**
- Type safety improvements - Remove `as any` casts, add generics
- Testing infrastructure - Jest/Vitest with unit/integration tests
- Authentication documentation - Supabase Auth patterns, RLS policies
- Troubleshooting guide - Common development issues
- Environment variables guide - Comprehensive documentation
- Deployment guide expansion - Beyond Vercel scenarios
- Security audit - Comprehensive review
- Accessibility audit - WCAG compliance
- Major dependency updates - Tailwind 4, Zod 4, Sentry 10, Node 24
- Performance benchmarking suite
- API documentation completion
- Contributor guidelines enhancement

**Effort**: ~8 weeks | **Risk**: Low (polish and documentation)

---

## Migration Actions

### Step 1: Close Old Milestones
```bash
gh api repos/:owner/:repo/milestones/1 -X PATCH -f state="closed"
gh api repos/:owner/:repo/milestones/2 -X PATCH -f state="closed"
```

### Step 2: Create New Milestones
```bash
# v0.6.0 - Feb 1
gh api repos/:owner/:repo/milestones \
  -f title="v0.6.0 - Content Quality & Cleanup" \
  -f description="Content quality audit, legacy field removal, OG image redesign, database fixes" \
  -f due_on="2026-02-01T00:00:00Z"

# v0.7.0 - Mar 1
gh api repos/:owner/:repo/milestones \
  -f title="v0.7.0 - CMS Power Features" \
  -f description="Audit logging, bulk import redesign, newsletter completion, multi-admin support" \
  -f due_on="2026-03-01T00:00:00Z"

# v0.8.0 - Apr 1
gh api repos/:owner/:repo/milestones \
  -f title="v0.8.0 - Visualization & Technical Content" \
  -f description="LaTeX formulas, industry visualizations, charting tools, enhanced search" \
  -f due_on="2026-04-01T00:00:00Z"

# v0.9.0 - May 1
gh api repos/:owner/:repo/milestones \
  -f title="v0.9.0 - Infrastructure & Scale" \
  -f description="Sponsor blocks, Redis caching, performance optimization, rate limiting" \
  -f due_on="2026-05-01T00:00:00Z"

# v1.0.0 - Jul 1
gh api repos/:owner/:repo/milestones \
  -f title="v1.0.0 - Production Ready" \
  -f description="Testing infrastructure, comprehensive documentation, type safety, security audit, accessibility, dependency updates" \
  -f due_on="2026-07-01T00:00:00Z"
```

### Step 3: Assign Existing Issues
```bash
# Get milestone numbers first
gh api repos/:owner/:repo/milestones --jq '.[] | "\(.number) \(.title)"'

# Then assign (replace MILESTONE_NUMBER with actual numbers)
# v0.6.0
gh issue edit 104 --milestone 3
gh issue edit 102 --milestone 3
gh issue edit 100 --milestone 3
gh issue edit 54 --milestone 3

# v0.7.0
gh issue edit 99 --milestone 4
gh issue edit 103 --milestone 4
gh issue edit 101 --milestone 4

# v0.8.0
gh issue edit 26 --milestone 5
gh issue edit 28 --milestone 5
gh issue edit 10 --milestone 5

# v0.9.0
gh issue edit 96 --milestone 6
```

### Step 4: Create Missing Issues

**v0.6.0 Issues:**
```bash
gh issue create \
  --title "[Infrastructure]: Fix database function security warnings" \
  --body "Add \`SET search_path\` to 9 SECURITY DEFINER functions to resolve Supabase linter warnings. Low priority but should be cleaned up before v1.0." \
  --label "enhancement,infrastructure" \
  --milestone 3

gh issue create \
  --title "[Bug]: Fix content language checking tool database connection" \
  --body "Complete database connection setup for the UK English language checking tool (\`scripts/content-review.ts\`). Tool is fully developed but needs database connectivity troubleshooting." \
  --label "bug,tooling" \
  --milestone 3
```

**v0.7.0 Issues:**
```bash
gh issue create \
  --title "[Feature]: Multi-admin support with roles and permissions" \
  --body "Add support for multiple admin users with different permission levels. Required for scaling beyond single admin." \
  --label "enhancement,cms" \
  --milestone 4
```

**v0.8.0 Issues:**
```bash
gh issue create \
  --title "[Feature]: Enhanced search system with Supabase full-text search" \
  --body "Upgrade from client-side search to PostgreSQL full-text search with \`to_tsvector()\` and \`plainto_tsquery()\` for better relevance, typo tolerance, and content body searching. Implement when content scales beyond 50 case studies." \
  --label "enhancement,search" \
  --milestone 5
```

**v0.9.0 Issues:**
```bash
gh issue create \
  --title "[Infrastructure]: Upgrade to Redis-based caching" \
  --body "Replace in-memory rate limiting with Redis-based caching and session storage. Needed for production multi-server deployments and public API release." \
  --label "enhancement,infrastructure" \
  --milestone 6

gh issue create \
  --title "[Performance]: API rate limiting improvements for production" \
  --body "Scale rate limiting system for production multi-server deployments with Redis backend." \
  --label "enhancement,performance,infrastructure" \
  --milestone 6

gh issue create \
  --title "[Performance]: Performance optimization and benchmarking" \
  --body "Comprehensive performance review, optimization opportunities, and benchmarking suite setup." \
  --label "enhancement,performance" \
  --milestone 6

gh issue create \
  --title "[Performance]: Bundle size optimization" \
  --body "Analyze and optimize JavaScript bundle sizes, implement code splitting where beneficial." \
  --label "enhancement,performance" \
  --milestone 6
```

**v1.0.0 Issues:**
```bash
gh issue create \
  --title "[Technical Debt]: Type safety improvements" \
  --body "Remove \`as any\` casts, add proper TypeScript generics for dynamic queries, improve Supabase type safety throughout the codebase." \
  --label "enhancement,technical-debt" \
  --milestone 7

gh issue create \
  --title "[Testing]: Implement testing infrastructure" \
  --body "Set up Jest/Vitest with unit tests, integration tests, and component testing. Required for v1.0 production readiness." \
  --label "enhancement,testing" \
  --milestone 7

gh issue create \
  --title "[Documentation]: Authentication patterns documentation" \
  --body "Document Supabase Auth patterns, RLS policies, admin setup, and authentication best practices." \
  --label "documentation" \
  --milestone 7

gh issue create \
  --title "[Documentation]: Troubleshooting guide" \
  --body "Create comprehensive troubleshooting guide for common development issues: Supabase connection, build errors, deployment issues, etc." \
  --label "documentation" \
  --milestone 7

gh issue create \
  --title "[Documentation]: Environment variables guide" \
  --body "Comprehensive documentation of all environment variables, their purposes, and required vs optional configuration." \
  --label "documentation" \
  --milestone 7

gh issue create \
  --title "[Documentation]: Deployment guide expansion" \
  --body "Document deployment scenarios beyond Vercel: self-hosting, Docker, other platforms, CI/CD setup." \
  --label "documentation" \
  --milestone 7

gh issue create \
  --title "[Security]: Comprehensive security audit" \
  --body "Full security audit before v1.0: OWASP Top 10, RLS policies, API endpoints, input validation, authentication flows." \
  --label "security" \
  --milestone 7

gh issue create \
  --title "[Accessibility]: WCAG compliance audit" \
  --body "Comprehensive accessibility audit and improvements to meet WCAG 2.1 Level AA standards." \
  --label "accessibility" \
  --milestone 7

gh issue create \
  --title "[Dependencies]: Major dependency updates" \
  --body "Update major dependencies with breaking changes: Tailwind CSS 3.x → 4.x, Zod 3.x → 4.x, Sentry 9.x → 10.x, Node types 20.x → 24.x. Requires comprehensive testing." \
  --label "dependencies,technical-debt" \
  --milestone 7

gh issue create \
  --title "[Performance]: Performance benchmarking suite" \
  --body "Create automated performance benchmarking and monitoring suite for build times, page loads, API response times." \
  --label "enhancement,performance,testing" \
  --milestone 7

gh issue create \
  --title "[Documentation]: API documentation completion" \
  --body "Complete API documentation for all endpoints, including examples, authentication, rate limits, error codes." \
  --label "documentation" \
  --milestone 7

gh issue create \
  --title "[Documentation]: Contributor guidelines enhancement" \
  --body "Enhance contributor guidelines with development workflows, code style, testing requirements, PR process." \
  --label "documentation" \
  --milestone 7
```

### Step 5: Update README
Simplify the roadmap section in README.md to point to GitHub:

```markdown
## 🔄 Roadmap

OpenQase is on track for a v1.0.0 production release by July 1, 2026, with monthly milestone releases.

**Current Milestones:**
- 📍 **You are here**: v0.5.0 (January 2026)
- 🎯 **Next**: v0.6.0 - Content Quality & Cleanup (February 1, 2026)
- 🚀 **Target**: v1.0.0 - Production Ready (July 1, 2026)

**Track our progress:**
- [View Milestones](https://github.com/openqase/openqase/milestones) - Release planning and progress
- [View Issues](https://github.com/openqase/openqase/issues) - Detailed task tracking
- [View Project Plan](./docs/openqase-project-plan.md) - Vision, strategy, and roadmap

For detailed project planning, user personas, and strategic vision, see our [Project Plan](./docs/openqase-project-plan.md).
```

### Step 6: Create Labels
```bash
# Issue type labels
gh label create "enhancement" --description "New feature or request" --color "a2eeef" || true
gh label create "bug" --description "Something isn't working" --color "d73a4a" || true
gh label create "documentation" --description "Improvements or additions to documentation" --color "0075ca" || true
gh label create "technical-debt" --description "Code cleanup and refactoring" --color "d4c5f9" || true

# Area labels
gh label create "cms" --description "Content management system" --color "c5def5" || true
gh label create "infrastructure" --description "Infrastructure and deployment" --color "bfd4f2" || true
gh label create "performance" --description "Performance improvements" --color "fbca04" || true
gh label create "security" --description "Security related" --color "ee0701" || true
gh label create "accessibility" --description "Accessibility improvements" --color "0e8a16" || true
gh label create "testing" --description "Testing related" --color "0e8a16" || true
gh label create "search" --description "Search functionality" --color "d4c5f9" || true
gh label create "tooling" --description "Developer tooling" --color "ededed" || true
gh label create "dependencies" --description "Dependency updates" --color "0366d6" || true

# Priority labels
gh label create "priority: high" --description "High priority" --color "d93f0b" || true
gh label create "priority: medium" --description "Medium priority" --color "fbca04" || true
gh label create "priority: low" --description "Low priority" --color "0e8a16" || true

# Effort labels
gh label create "effort: small" --description "Small effort (< 1 day)" --color "c2e0c6" || true
gh label create "effort: medium" --description "Medium effort (1-3 days)" --color "fef2c0" || true
gh label create "effort: large" --description "Large effort (> 3 days)" --color "f9d0c4" || true
```

---

## Execution Timeline

**Week 1 (Jan 6-12):**
- Close old milestones
- Create new milestones (v0.6.0 through v1.0.0)
- Assign existing 11 issues to milestones
- Create labels

**Week 2 (Jan 13-19):**
- Create all missing issues (~18 new issues)
- Assign to appropriate milestones
- Update README roadmap section
- Create openqase-project-plan.md

**Week 3 (Jan 20-26):**
- Begin v0.6.0 work
- Review and prioritize issues within milestone
- Start content quality audit (#104)

**Week 4 (Jan 27 - Feb 1):**
- Complete v0.6.0 work
- Release v0.6.0
- Begin v0.7.0 planning

---

## Success Metrics

**Per Milestone:**
- All issues closed or moved to next milestone
- Release notes published
- CHANGELOG updated
- No regression in build time or performance
- All tests passing (once testing infrastructure exists)

**By v1.0.0:**
- 100% issue completion rate
- Comprehensive test coverage (>80%)
- Complete documentation
- Security audit passed
- Accessibility audit passed
- Production deployment successful
- Public API stable and documented

---

## Risk Mitigation

**Risks:**
- Monthly cadence is aggressive - may need to adjust scope
- Testing infrastructure doesn't exist yet - needed by v1.0
- Major dependency updates could introduce breaking changes
- Security/accessibility audits may reveal significant work

**Mitigation:**
- Use June as buffer month before v1.0
- Prioritize testing setup in v0.9.0/early v1.0 timeline
- Test dependency updates in isolated branch
- Start audits early (v0.9.0) to allow time for fixes
- Be willing to move non-critical items to v1.1.0

---

Ready to execute this plan?
