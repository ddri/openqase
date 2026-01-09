# Case Study Quality Audit Framework

Comprehensive quality assessment system for OpenQase case studies based on issue #104.

## Overview

This framework defines what makes a "good" case study, how to measure quality, and how to prioritize improvements across all 56+ case studies in the database.

## Related Issue

Issue #104 - Case study quality audit and template standardization

---

## Quality Template: What Makes a Good Case Study

### Required Fields (Must Have)

| Field | Description | Quality Criteria | Weight |
|-------|-------------|------------------|--------|
| **Title** | Case study name | Clear company + topic format, 20-100 chars | 5% |
| **Slug** | URL-friendly identifier | Matches title, unique, lowercase-with-hyphens | 5% |
| **Description** | 1-2 sentence summary | 100-250 chars, explains "what" and "why" | 15% |
| **Main Content** | Full case study narrative | 2000+ chars, well-structured, informative | 20% |
| **Year** | When study occurred | Accurate, verified, ideally 2020+ | 5% |
| **Published** | Visibility status | true for public, false for drafts | - |

**Subtotal: 50% of quality score**

### Technical Details (Important)

| Field | Description | Quality Criteria | Weight |
|-------|-------------|------------------|--------|
| **Algorithms** | Quantum algorithms used | At least 1, linked to algorithm pages | 15% |
| **Industries** | Relevant industry sectors | At least 1, properly categorized | 10% |
| **Personas** | Target audience roles | At least 1, linked to persona pages | 10% |

**Subtotal: 35% of quality score**

### Supporting Content (Nice to Have)

| Field | Description | Quality Criteria | Weight |
|-------|-------------|------------------|--------|
| **Quantum Companies** | QC companies involved | Linked to company pages | 5% |
| **Partner Companies** | Traditional companies | Linked to company pages | 3% |
| **Quantum Hardware** | Hardware platforms used | Linked to hardware pages | 3% |
| **Quantum Software** | SDKs/tools used | Linked to software pages | 2% |
| **Academic References** | Citations and sources | Valid, accessible links | 1% |
| **Resource Links** | External resources | Working URLs | 1% |

**Subtotal: 15% of quality score**

---

## Scoring System

### Completeness Score (0-100%)

Measures whether all required and recommended fields are populated.

**Calculation:**
```
Completeness = (Populated Fields / Total Possible Fields) × 100
```

**Breakdown:**
- Required fields populated: 50 points
- Technical details populated: 35 points
- Supporting content populated: 15 points

**Scoring Bands:**
- **90-100%:** Excellent - All fields complete
- **75-89%:** Good - Minor gaps
- **50-74%:** Needs Work - Several missing fields
- **0-49%:** Poor - Major gaps, needs significant improvement

### Quality Score (0-100%)

Measures the richness and usefulness of the content, not just presence.

**Factors:**

1. **Description Quality** (20 points)
   - 20 pts: 150+ chars, clear problem statement and outcome
   - 15 pts: 100-149 chars, adequate explanation
   - 10 pts: 50-99 chars, minimal explanation
   - 5 pts: 1-49 chars, very brief
   - 0 pts: Missing

2. **Main Content Quality** (30 points)
   - 30 pts: 2000+ chars, comprehensive, well-structured
   - 20 pts: 1000-1999 chars, good depth
   - 10 pts: 500-999 chars, adequate
   - 5 pts: 1-499 chars, minimal
   - 0 pts: Missing

3. **Content Indicators** (10 points)
   - Mentions "quantum advantage": +3 pts
   - Includes results/outcomes: +3 pts
   - Describes implementation: +2 pts
   - Discusses challenges: +2 pts

4. **Relationship Richness** (20 points)
   - 10+ relationships: 20 pts
   - 7-9 relationships: 15 pts
   - 5-6 relationships: 10 pts
   - 3-4 relationships: 5 pts
   - 0-2 relationships: 0 pts

5. **Recency** (10 points)
   - 2023-2026: 10 pts (current/recent)
   - 2020-2022: 7 pts (recent)
   - 2015-2019: 4 pts (somewhat dated)
   - Before 2015: 1 pt (historical)
   - No year: 0 pts

6. **Technical Depth** (10 points)
   - Multiple algorithms: +5 pts
   - Multiple industries: +3 pts
   - Hardware + software specified: +2 pts

**Scoring Bands:**
- **90-100%:** Exceptional - Model case study
- **75-89%:** Strong - Minor improvements possible
- **60-74%:** Adequate - Room for improvement
- **50-59%:** Weak - Needs significant enhancement
- **0-49%:** Poor - Requires major rewrite

### Combined Priority Score

For prioritizing improvements:

```
Priority Score = (Completeness Score + Quality Score) / 2
```

Lower scores = higher priority for improvement.

---

## Content Quality Checklist

Use this checklist when reviewing individual case studies:

### Structure & Clarity

- [ ] **Clear problem statement** - What business challenge was addressed?
- [ ] **Quantum approach explained** - How was quantum computing applied?
- [ ] **Results/outcomes stated** - What was achieved?
- [ ] **Quantified where possible** - Numbers, percentages, metrics
- [ ] **Technical but accessible** - Understandable to target persona
- [ ] **Well-organized** - Logical flow, clear sections
- [ ] **Professional tone** - Consistent with site's style

### Technical Accuracy

- [ ] **Year verified** - Matches known dates/sources
- [ ] **Company information correct** - Names, relationships accurate
- [ ] **Algorithm correctly identified** - Appropriate QC algorithm
- [ ] **Hardware/software accurate** - Correct platforms/tools
- [ ] **Technical claims reasonable** - Not overstated or misleading

### Completeness

- [ ] **All required fields populated** - No missing core data
- [ ] **Relationships linked** - Not just text, but proper DB relations
- [ ] **Supporting materials present** - References, links where applicable
- [ ] **Consistent formatting** - Markdown, structure

### Usefulness

- [ ] **Actionable insights** - What can readers learn/apply?
- [ ] **Relevant to persona** - Matches target audience needs
- [ ] **Clear quantum value** - Why quantum vs classical?
- [ ] **Meaningful connections** - Related case studies make sense

---

## Audit Process

### Phase 1: Data Collection

**Objective:** Export all case studies and understand current state

**Actions:**
1. Run audit script against production database:
   ```bash
   # Set production Supabase credentials
   export NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
   export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

   # Run audit
   npx tsx scripts/audit-case-studies.ts
   ```

2. Review output:
   - Total case studies
   - Field completion rates
   - Average scores
   - Quality distribution

3. Export detailed report for manual review

**Deliverable:** Complete data export with scores and gaps identified

### Phase 2: Template Definition

**Objective:** Finalize quality criteria and scoring system

**Actions:**
1. Review top 5 best case studies as examples
2. Validate scoring weights with stakeholders
3. Define style guide for consistent writing
4. Create case study template for new entries

**Deliverable:** Approved quality template and style guide

### Phase 3: Individual Assessment

**Objective:** Score each case study and identify specific issues

**Actions:**
1. For each case study:
   - Calculate completeness score
   - Calculate quality score
   - Identify missing fields
   - Flag content quality issues
   - Note broken links or outdated info

2. Categorize case studies:
   - Excellent (90-100%): Use as templates
   - Good (75-89%): Minor touch-ups
   - Needs Work (50-74%): Significant improvements
   - Poor (0-49%): Major rewrites or removal

**Deliverable:** Scored spreadsheet with specific issues per case study

### Phase 4: Prioritization

**Objective:** Rank improvements by impact and effort

**Priority Matrix:**

| Impact | Effort | Priority | Examples |
|--------|--------|----------|----------|
| High | Low | **P0 - Quick Wins** | Add missing algorithms, fill in years |
| High | High | **P1 - Major Improvements** | Rewrite thin content, add relationships |
| Low | Low | **P2 - Nice to Have** | Polish descriptions, add references |
| Low | High | **P3 - Backlog** | Historical case studies, minor companies |

**Actions:**
1. Identify quick wins (high impact, low effort)
2. Plan major improvements (high impact, high effort)
3. Defer low-priority items

**Deliverable:** Prioritized improvement roadmap

### Phase 5: Implementation

**Objective:** Execute improvements based on priority

**Approach:**

1. **Batch P0 - Quick Wins** (1-2 weeks)
   - Add missing required fields
   - Link existing relationships
   - Fix broken links
   - Update years

2. **Gradual P1 - Major Improvements** (ongoing)
   - Rewrite thin/poor quality content
   - Research and add technical details
   - Expand descriptions
   - Add missing relationships

3. **Continuous P2 - Enhancements** (as time permits)
   - Polish and refine
   - Add academic references
   - Improve formatting

**Deliverable:** Measurably improved case study quality across site

---

## Expected Outcomes

### Measurable Improvements

**Before (Baseline):**
- Average completeness score: TBD
- Average quality score: TBD
- % with all required fields: TBD
- % excellent (90+): TBD

**Target (After Audit):**
- Average completeness score: 85%+
- Average quality score: 75%+
- % with all required fields: 95%+
- % excellent (90+): 30%+

### Qualitative Benefits

- **Consistency:** All case studies follow same structure
- **Better SEO:** Standardized format improves search rankings
- **Improved UX:** Users find relevant, complete information
- **Easier maintenance:** Clear guidelines for future additions
- **Community ready:** Template enables contributor submissions

---

## Running the Audit

### Prerequisites

1. **Database Access**
   - Production Supabase URL
   - Service role key (for full access)
   - Or admin account credentials

2. **Audit Script**
   - `scripts/audit-case-studies.ts` (already exists)
   - Node.js 20+ and tsx installed

### Commands

**Option 1: Against Production**
```bash
# Set production credentials
export NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Run audit
npx tsx scripts/audit-case-studies.ts > docs/content-drafts/audit-results.txt
```

**Option 2: Against Local (After Seeding)**
```bash
# Ensure Supabase is running
supabase start

# Load production data snapshot (if available)
supabase db push

# Run audit
npx tsx scripts/audit-case-studies.ts
```

### Interpreting Results

The audit script outputs:

1. **Summary Statistics**
   - Total case studies
   - Average completeness/quality scores
   - Field completion rates

2. **Top 10 Needing Work**
   - Lowest scoring case studies
   - Specific missing fields
   - Improvement priorities

3. **Top 5 Best**
   - Highest scoring case studies
   - Use as templates/examples

4. **Quality Distribution**
   - How many in each category
   - Overall health assessment

---

## Quality Template for New Case Studies

When creating new case studies, use this template:

### Basic Information

```
Title: [Company Name] + [Quantum Application]
Example: "IonQ Quantum Computing for Aircraft Loading Optimization"

Slug: [lowercase-with-hyphens]
Example: "ionq-aircraft-loading-optimization"

Description: [1-2 sentences, 100-250 chars]
Example: "IonQ demonstrated quantum optimization for aircraft cargo loading using their Aria and Forte trapped-ion systems, achieving optimal solutions for problems ranging from 12 to 28 qubits."

Year: [YYYY]
Example: 2024

Published: true
```

### Main Content Structure

```markdown
## Overview

[1-2 paragraphs introducing the case study, the company, and the problem]

## Problem Statement

[What business/technical challenge was being addressed?]
[Why was this problem important?]
[What were the limitations of classical approaches?]

## Quantum Approach

[Which quantum algorithm(s) were used?]
[What quantum hardware/software platform?]
[How was the problem formulated for quantum computing?]

## Implementation

[Technical details of the implementation]
[Any novel techniques or innovations]
[Integration with classical systems]

## Results and Outcomes

[What was achieved? (Quantify where possible)]
[Performance metrics]
[Comparison to classical approaches]
[Business impact]

## Challenges and Learnings

[What difficulties were encountered?]
[How were they addressed?]
[Key takeaways]

## Future Directions

[Potential for scaling]
[Next steps or follow-on work]

## Technical Details

- **Algorithms:** [Link to algorithm pages]
- **Hardware:** [Link to hardware pages]
- **Software:** [Link to software/SDK pages]
- **Problem Size:** [Qubits, variables, constraints]

## References

- [Academic papers]
- [Company announcements]
- [Technical reports]
```

### Relationships to Link

- **Algorithms** (Required): At least 1
- **Industries** (Required): At least 1
- **Personas** (Required): At least 1
- **Quantum Companies**: Main QC company involved
- **Partner Companies**: Traditional companies/clients
- **Quantum Hardware**: Specific QPU/system used
- **Quantum Software**: SDKs, frameworks, tools

---

## Tools and Resources

### Audit Script

- **Location:** `scripts/audit-case-studies.ts`
- **Purpose:** Automated quality assessment
- **Output:** Scores, statistics, priority list

### Style Guide

Create `docs/case-study-style-guide.md` with:
- Writing tone and voice
- Formatting conventions
- Technical terminology guidelines
- Example good vs poor descriptions

### Template File

Create `docs/case-study-template.md` with:
- Blank template for copying
- Field-by-field instructions
- Examples for each section

---

## Success Metrics

Track these metrics before and after improvements:

### Quantitative

- **Average completeness score**: Target 85%+
- **Average quality score**: Target 75%+
- **% with full technical details**: Target 90%+
- **% with 2000+ char content**: Target 70%+
- **Average relationships per case study**: Target 7+

### Qualitative

- **User feedback**: Survey satisfaction with case studies
- **Time on page**: Increased engagement with content
- **Return visits**: Users coming back to read more
- **SEO performance**: Improved search rankings
- **Contributor ease**: How easy is it to add new case studies?

---

## Next Steps

1. **Run Audit Against Production**
   - Export all case study data
   - Generate scores and statistics
   - Identify improvement priorities

2. **Review Top/Bottom Performers**
   - Examine best case studies as templates
   - Analyze worst performers for common issues

3. **Create Detailed Improvement Plan**
   - List specific actions per case study
   - Estimate effort (hours per improvement)
   - Assign priorities (P0, P1, P2, P3)

4. **Begin P0 Quick Wins**
   - Start with high-impact, low-effort improvements
   - Build momentum with visible progress

5. **Document Progress**
   - Track improvements made
   - Update metrics weekly/monthly
   - Celebrate milestones

---

**Created:** January 8, 2026
**For Milestone:** v0.6.0 - Content Quality & Cleanup
**Issue:** #104
**Status:** Framework defined, audit pending execution
