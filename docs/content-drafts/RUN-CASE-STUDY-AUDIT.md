# How to Run the Case Study Quality Audit

Quick guide for executing the case study quality audit against the production database.

## Related

- **Issue:** #104 - Case study quality audit and template standardization
- **Framework:** `docs/content-drafts/case-study-quality-audit-framework.md`
- **Script:** `scripts/audit-case-studies.ts`

---

## Prerequisites

1. **Production Supabase Credentials**
   - Project URL: `https://your-project.supabase.co`
   - Service Role Key (from Supabase Dashboard → Settings → API)

2. **Node.js Environment**
   - Node.js 20+ installed
   - tsx package (already in devDependencies)

---

## Step-by-Step Instructions

### 1. Set Production Credentials

Create a temporary `.env.audit` file (DO NOT commit this file):

```bash
# .env.audit
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

Or export directly:

```bash
export NEXT_PUBLIC_SUPABASE_URL="https://your-project-ref.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"
```

### 2. Run the Audit Script

```bash
# Option 1: With environment file
npx tsx scripts/audit-case-studies.ts

# Option 2: With inline credentials
NEXT_PUBLIC_SUPABASE_URL="https://..." SUPABASE_SERVICE_ROLE_KEY="..." npx tsx scripts/audit-case-studies.ts

# Option 3: Save output to file
npx tsx scripts/audit-case-studies.ts > docs/content-drafts/audit-results-$(date +%Y%m%d).txt
```

### 3. Review the Output

The script will display:

```
=== CASE STUDY AUDIT (56 total) ===

Score | Content Length | Title
------|----------------|------
   35 |            234 | [Low scoring case studies first]
   ...
   95 |           4521 | [High scoring case studies last]

=== SUMMARY STATISTICS ===
Average Score: 68.5/100
Average Content Length: 1842 characters

Field Coverage:
  With Description: 54/56
  With Main Content: 52/56

Junction Table Relations:
  With Algorithms: 48/56
  With Industries: 51/56
  With Personas: 45/56

Quality Distribution:
  Excellent (80+): 12
  Good (60-79): 28
  Needs Work (40-59): 14
  Poor (<40): 2

=== TOP 10 NEEDING MOST WORK ===

1. [Case Study Title] (Score: 35)
   Slug: case-study-slug
   Description: 89 chars | Content: 234 chars
   Relations: 0 algos, 1 industries, 0 personas
   Missing: description, main_content, algorithms, personas, academic_refs

[... more details ...]

=== TOP 5 BEST CASE STUDIES (for reference) ===

1. [Excellent Case Study] (Score: 95)
   Slug: excellent-case-study
   Description: 187 chars | Content: 4521 chars

[... more examples ...]
```

### 4. Analyze Results

Key questions to answer:

1. **What's the average score?**
   - Below 70: Significant work needed
   - 70-80: Good baseline, room for improvement
   - Above 80: Strong quality overall

2. **What are common missing fields?**
   - Look at "Field Coverage" section
   - Prioritize most common gaps

3. **Which case studies need urgent attention?**
   - Focus on "TOP 10 NEEDING MOST WORK"
   - These are your P0 quick wins

4. **What can we learn from the best?**
   - Review "TOP 5 BEST CASE STUDIES"
   - Use as templates for improvements

---

## What to Do with Results

### Immediate Actions (P0 - Quick Wins)

Based on audit output, create quick-fix tasks:

```bash
# Example: If many are missing algorithms
# 1. Review each case study mentioned in "Top 10"
# 2. Research which algorithms were actually used
# 3. Link them in admin interface
# 4. Re-run audit to see improvement
```

**Common Quick Wins:**
- Add missing years (research from sources)
- Link existing algorithms/industries/personas
- Fill in short descriptions (100-150 chars)
- Fix broken or missing relationships

### Medium-Term Actions (P1 - Major Improvements)

For case studies with low content scores:

```bash
# 1. Review existing content
# 2. Research additional details from:
#    - Company websites
#    - Press releases
#    - Academic papers
#    - Technical reports
# 3. Expand main_content to 2000+ chars
# 4. Add technical details (hardware, software, problem size)
# 5. Include results/outcomes section
```

**Template for Expansion:**
Use `docs/content-drafts/case-study-quality-audit-framework.md`
→ "Quality Template for New Case Studies" section

### Long-Term Actions (P2 - Polish)

For case studies already at 70-80%:

- Add academic references
- Include resource links
- Polish descriptions
- Add more relationships
- Improve formatting

---

## Tracking Progress

### Before Improvements

Run audit and save baseline:

```bash
npx tsx scripts/audit-case-studies.ts > docs/audit-baseline-$(date +%Y%m%d).txt
```

**Record:**
- Total case studies: __
- Average score: __
- Excellent (80+): __
- Poor (<40): __

### After Each Batch of Improvements

Re-run audit:

```bash
npx tsx scripts/audit-case-studies.ts > docs/audit-progress-$(date +%Y%m%d).txt
```

**Compare:**
- How many case studies improved?
- Did average score increase?
- How many moved to "Excellent" category?
- Are there fewer "Poor" case studies?

### Target Metrics

By end of audit/improvement cycle:

- [ ] Average score: 75%+ (currently: __)
- [ ] Excellent (80+): 30%+ (currently: __)
- [ ] Poor (<40): 0% (currently: __)
- [ ] All case studies have:
  - [ ] Description (100+ chars)
  - [ ] Main content (1000+ chars)
  - [ ] At least 1 algorithm
  - [ ] At least 1 industry
  - [ ] Year specified

---

## Troubleshooting

### "relation does not exist" Error

**Cause:** The audit script expects certain table names

**Solution:** Check table names in Supabase Dashboard:
- Should be: `case_studies`, `algorithms`, `industries`, `personas`
- Junction tables: `case_study_algorithms`, etc.

If names differ, update the script queries.

### "Authentication required" Error

**Cause:** Invalid or missing credentials

**Solution:**
1. Verify Supabase URL is correct (check dashboard)
2. Regenerate service role key if needed (Settings → API)
3. Ensure no trailing spaces in environment variables

### Script Times Out

**Cause:** Large number of case studies or slow connection

**Solution:**
```bash
# Increase timeout (if using tsx with timeout)
# Or run with --max-old-space-size for more memory
node --max-old-space-size=4096 $(which tsx) scripts/audit-case-studies.ts
```

### Results Show 0 Case Studies

**Cause:** Query filtering out unpublished or deleted studies

**Solution:** The script filters to `published = true`. If you want to audit all:
1. Edit `scripts/audit-case-studies.ts`
2. Remove or modify the `.eq('published', true)` line
3. Re-run audit

---

## Next Steps After Audit

1. **Create GitHub Issues for Top Priorities**
   ```bash
   # Example issues to create:
   gh issue create --title "Improve case study: [slug]" \
     --body "Score: 35/100. Missing: algorithms, content expansion needed"
   ```

2. **Assign Priorities**
   - P0: Case studies scoring <40 (critical)
   - P1: Case studies scoring 40-59 (important)
   - P2: Case studies scoring 60-79 (enhancement)

3. **Set Milestones**
   - Week 1: Fix all P0 (scores <40)
   - Week 2-3: Improve P1 (scores 40-59)
   - Ongoing: Polish P2 (scores 60-79)

4. **Track in Project Board**
   - Create columns: "To Audit", "Needs Improvement", "In Progress", "Done"
   - Move case studies through workflow
   - Celebrate improvements!

---

## Additional Resources

- **Audit Framework:** `docs/content-drafts/case-study-quality-audit-framework.md`
- **Quality Template:** See framework doc, "Quality Template for New Case Studies"
- **Existing Script:** `scripts/audit-case-studies.ts`
- **Admin Interface:** https://openqase.com/admin/case-studies

---

**Created:** January 8, 2026
**For Issue:** #104
**Status:** Ready to execute against production database
