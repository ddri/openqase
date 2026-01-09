# Instructions: Adding MA-QAOA Algorithm

This document provides step-by-step instructions for adding the Multi-Angle Quantum Approximate Optimization Algorithm (MA-QAOA) to OpenQase.

## Related Issue

Closes #54 - Add Multi-Angle Layered Variational Quantum Algorithm to Algorithms

## Content Prepared

The complete algorithm content has been researched and drafted in:
- **Content draft:** `docs/content-drafts/ma-qaoa-algorithm.md`
- **Script (optional):** `scripts/add-ma-qaoa-algorithm.ts`

## Method 1: Add via Admin Interface (Recommended)

### Step 1: Access Admin Interface

1. Navigate to: https://openqase.com/auth
2. Sign in with admin credentials
3. Go to: https://openqase.com/admin/algorithms

### Step 2: Create New Algorithm

Click "Create New Algorithm" and fill in the fields:

#### Basic Information

**Name:**
```
Multi-Angle Quantum Approximate Optimization Algorithm (MA-QAOA)
```

**Slug:**
```
ma-qaoa
```

**Description:**
```
A variant of the Quantum Approximate Optimization Algorithm (QAOA) that uses multiple independent parameters per quantum gate, enabling shallower circuits and improved approximation ratios for optimization problems on near-term quantum devices.
```

**Year:**
```
2021
```

**Published:**
```
✓ Yes
```

#### Main Content

Copy the entire "Main Content" section from `docs/content-drafts/ma-qaoa-algorithm.md` (everything after the `## Overview` heading through the end of the document).

The main content includes:
- Overview
- Key Features (Reduced Circuit Depth, Improved Approximation Ratio, Efficient Parameter Optimization)
- Technical Details
- Applications (Combinatorial Optimization, Aircraft Loading, Near-Term Quantum Advantage)
- Performance Characteristics
- Comparison to Standard QAOA
- Industry Adoption
- Related Algorithms
- Academic References
- Future Directions
- Implementation Resources

### Step 3: Link to Related Content

After saving the algorithm, link it to relevant content:

#### Related Algorithms
- QAOA (Quantum Approximate Optimization Algorithm)
- VQE (Variational Quantum Eigensolver)
- Quantum Annealing

#### Related Quantum Companies
- IonQ (mentioned in aircraft loading application)

#### Related Quantum Hardware
- IonQ Aria
- IonQ Forte

#### Related Case Studies
Search for case studies that mention:
- IonQ
- Aircraft loading optimization
- QAOA
- Optimization problems

**Known case studies to check:**
- Any IonQ-related case studies
- Optimization-focused case studies

### Step 4: Verify

1. View the algorithm page: https://openqase.com/algorithm/ma-qaoa
2. Check that:
   - Content displays correctly
   - Formatting is proper
   - Links work
   - Related content is linked
3. Test on mobile and desktop
4. Verify SEO metadata (OpenGraph, meta description)

## Method 2: Add via Script (Alternative)

If you prefer to use the command-line script:

### Prerequisites

- Local Supabase running: `supabase start`
- Database migrations applied: `supabase db reset`
- Environment variables configured in `.env.local`

### Run Script

```bash
npx tsx scripts/add-ma-qaoa-algorithm.ts
```

The script will:
1. Check if algorithm already exists
2. Insert the algorithm with all content
3. Return the new algorithm ID

After running the script, you'll still need to:
- Link to related case studies via admin interface
- Verify the content displays correctly

## Research Sources

The algorithm content was researched from:

1. **Multi-angle Quantum Approximate Optimization Algorithm**
   - Paper: arXiv:2109.11455 (2021)
   - URL: https://arxiv.org/abs/2109.11455
   - Key findings: 33% improvement, shallower circuits

2. **Quantum Computing for Optimizing Aircraft Loading**
   - Paper: arXiv:2504.01567 (2025)
   - URL: https://arxiv.org/abs/2504.01567
   - Application: IonQ Aria and Forte, 12-28 qubits

3. **Additional Resources**
   - Nature Reviews Physics tutorial on Variational Quantum Algorithms
   - OSTI.GOV technical documentation

## Key Algorithm Characteristics

For reference when creating the entry:

- **Type:** Variational Quantum Algorithm
- **Base Algorithm:** QAOA (Quantum Approximate Optimization Algorithm)
- **Year Published:** 2021
- **Primary Use Case:** Combinatorial optimization on NISQ devices
- **Key Innovation:** Multi-angle parameters per gate (vs. global parameters in QAOA)
- **Performance:** 33% better approximation ratio, 3x shallower circuits
- **Hardware:** Demonstrated on IonQ Aria and Forte (trapped-ion systems)
- **Problem Sizes:** Successfully tested on 12-28 qubit problems

## Alternative Names

The algorithm is also known as:
- Multi-Angle Layered Variational Quantum Algorithm (MAL-VQA)
- Multi-Angle Quantum Alternating Operator Algorithm (MA-QAOA)

Consider mentioning these alternative names in the content for searchability.

## Post-Addition Tasks

After adding the algorithm:

1. **Update issue #54**
   - Add comment with completion details
   - Close the issue

2. **Test the new page**
   - Navigate to /algorithm/ma-qaoa
   - Verify content quality
   - Check mobile responsiveness
   - Test related links

3. **Consider follow-up improvements**
   - Add more related case studies as they're discovered
   - Link to any tutorial content when available
   - Update as new research or applications emerge

## Questions or Issues

If you encounter any problems:
- Check that admin authentication is working
- Verify database migrations are up-to-date
- Ensure content doesn't exceed field limits
- Review validation errors in the admin form

---

**Created:** January 8, 2026
**For Milestone:** v0.6.0 - Content Quality & Cleanup
**Issue:** #54
