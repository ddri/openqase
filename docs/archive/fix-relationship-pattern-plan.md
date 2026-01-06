# Fix Relationship Pattern - Match Existing Algorithm/Persona/Industry Pattern

## Current Correct Pattern (Algorithms, Personas, Industries)

These pages display:
1. **Entity's own content** (description, main_content)
2. **Case studies that feature this entity** (direct relationship)
3. **Nothing else** - no transitive relationships

## Current Broken Pattern (New Entity Types)

These pages incorrectly display:
1. Entity's own content ✓
2. Case studies that feature this entity ✓ 
3. **OTHER entities from those case studies** ❌ (This is the problem)

## The Fix: Remove Transitive Relationships

### Step 1: Analyze What to Remove

Each of the four new entity pages currently has these sections that need removal:

**Quantum Companies Page (`/paths/quantum-companies/[slug]/page.tsx`):**
- ❌ Related Quantum Software (through case studies)
- ❌ Related Quantum Hardware (through case studies)
- ❌ Related Partner Companies (through case studies)
- ✓ Related Case Studies (KEEP THIS)

**Quantum Hardware Page (`/paths/quantum-hardware/[slug]/page.tsx`):**
- ❌ Related Quantum Software (through case studies)
- ❌ Related Quantum Companies (through case studies)
- ❌ Related Partner Companies (through case studies)
- ✓ Related Case Studies (KEEP THIS)

**Quantum Software Page (`/paths/quantum-software/[slug]/page.tsx`):**
- ❌ Related Quantum Hardware (through case studies)
- ❌ Related Quantum Companies (through case studies)
- ❌ Related Partner Companies (through case studies)
- ✓ Related Case Studies (KEEP THIS)

**Partner Companies Page (`/paths/partner-companies/[slug]/page.tsx`):**
- ❌ Related Quantum Software (through case studies)
- ❌ Related Quantum Hardware (through case studies)
- ❌ Related Quantum Companies (through case studies)
- ✓ Related Case Studies (KEEP THIS)

### Step 2: Code Changes Required

For each of the four pages, we need to:

1. **Remove helper functions** that fetch transitive relationships:
```typescript
// DELETE THESE FUNCTIONS:
async function getRelatedQuantumSoftware(caseStudyIds: string[]) { ... }
async function getRelatedQuantumHardware(caseStudyIds: string[]) { ... }
async function getRelatedQuantumCompanies(caseStudyIds: string[]) { ... }
async function getRelatedPartnerCompanies(caseStudyIds: string[]) { ... }
```

2. **Remove the fetching logic**:
```typescript
// DELETE THESE LINES:
const caseStudyIds = relatedCaseStudies.map(cs => cs.id);
const relatedSoftwareRaw = caseStudyIds.length > 0 ? ...
const relatedSoftware = relatedSoftwareRaw.filter(...);
// etc.
```

3. **Remove the display sections**:
```typescript
// DELETE ENTIRE SECTIONS LIKE:
{relatedSoftware.length > 0 && (
  <div>
    <h3>Quantum Software & Frameworks</h3>
    {/* ... */}
  </div>
)}
```

4. **Keep only the case studies section**:
```typescript
// KEEP THIS SECTION:
{relatedCaseStudies.length > 0 && (
  <div>
    <h3>Related Case Studies</h3>
    {/* ... */}
  </div>
)}
```

### Step 3: Template for Fixed Pages

Here's what each page should look like after fixing:

```typescript
// Example: quantum-companies/[slug]/page.tsx
export default async function QuantumCompanyDetailPage({ params }) {
  const quantumCompany = await getStaticContentWithRelationships(
    'quantum_companies',
    params.slug
  );

  if (!quantumCompany) {
    notFound();
  }

  const processedContent = quantumCompany.main_content 
    ? await processMarkdown(quantumCompany.main_content)
    : null;

  // Extract ONLY related case studies - no other entities
  const relatedCaseStudies = quantumCompany.case_study_quantum_company_relations
    ?.map(relation => relation.case_studies)
    .filter((cs): cs is NonNullable<typeof cs> => cs !== null) || [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <Link href="/paths/quantum-companies">← Back</Link>
        <h1>{quantumCompany.name}</h1>
        {quantumCompany.description && <p>{quantumCompany.description}</p>}
        
        {/* Metadata */}
        {quantumCompany.headquarters && <div>📍 {quantumCompany.headquarters}</div>}
        {quantumCompany.website_url && <a href={quantumCompany.website_url}>Visit Website</a>}
        {/* etc. */}
      </div>

      {/* Main Content */}
      {processedContent && (
        <div dangerouslySetInnerHTML={{ __html: processedContent }} />
      )}

      {/* ONLY Related Case Studies - No Other Entities */}
      {relatedCaseStudies.length > 0 && (
        <div>
          <h3>Featured in Case Studies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {relatedCaseStudies.map(caseStudy => (
              <Link key={caseStudy.id} href={`/case-study/${caseStudy.slug}`}>
                <Card>
                  <CardContent>
                    <h4>{caseStudy.title}</h4>
                    <p>{caseStudy.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

### Step 4: Verify Consistency with Existing Pages

Compare the structure with existing pages to ensure consistency:

```typescript
// algorithms/[slug]/page.tsx structure:
1. Algorithm details (name, description, content)
2. Related case studies
3. Nothing else ✓

// Our new structure should be:
1. Entity details (name, description, content, metadata)
2. Related case studies  
3. Nothing else ✓
```

### Step 5: Implementation Order

1. **Start with one page as a test** (e.g., quantum-companies)
2. **Verify the fix works** (no more IonQ on Quantinuum page)
3. **Apply to remaining three pages**
4. **Test all pages**

### Step 6: Specific Files to Modify

1. `/src/app/paths/quantum-companies/[slug]/page.tsx`
   - Remove lines 22-50 (helper functions)
   - Remove lines 100-127 (fetching related entities)
   - Remove lines 217-291 (Technology Ecosystem section)
   - Keep lines 294-325 (Related Case Studies)

2. `/src/app/paths/quantum-hardware/[slug]/page.tsx`
   - Remove lines 22-50 (helper functions)
   - Remove lines 102-127 (fetching related entities)
   - Remove lines 226-301 (Technology Ecosystem section)
   - Keep lines 304-336 (Related Case Studies)

3. `/src/app/paths/quantum-software/[slug]/page.tsx`
   - Remove lines 22-50 (helper functions)
   - Remove lines 102-127 (fetching related entities)
   - Remove lines 226-301 (Technology Ecosystem section)
   - Keep lines 304-336 (Related Case Studies)

4. `/src/app/paths/partner-companies/[slug]/page.tsx`
   - Remove lines 22-50 (helper functions)
   - Remove lines 102-127 (fetching related entities)
   - Remove lines 221-297 (Technology Ecosystem section)
   - Keep lines 299-331 (Related Case Studies)

### Step 7: Testing Checklist

After making changes, verify:

- [ ] Quantinuum page does NOT show IonQ as related
- [ ] IBM Quantum page does NOT show Google Quantum AI as related
- [ ] Each entity page ONLY shows its own content + case studies
- [ ] No "Related Technologies" sections appear
- [ ] No "Research Ecosystem" sections appear
- [ ] Case studies still appear correctly
- [ ] No console errors about duplicate keys
- [ ] Pages load quickly (less data fetching)

### Step 8: Future Considerations

If we later want to show **explicit** relationships (not transitive):

1. **Use the existing unused tables**:
   - `quantum_company_software_relations` (company directly makes software)
   - `quantum_company_hardware_relations` (company directly makes hardware)

2. **Add admin UI** to manage these direct relationships

3. **Display them differently**:
   - "Products by {Company}" (explicit)
   - NOT "Related Technologies" (ambiguous)

### Benefits of This Fix

1. **Eliminates confusion** - No more competitors showing as "related"
2. **Matches existing pattern** - Consistent with algorithms/personas/industries
3. **Simpler code** - Less queries, less complexity
4. **Better performance** - Fewer database calls
5. **Clearer mental model** - Each page shows only what it owns

### Timeline

- **Hour 1**: Fix quantum-companies pages, test with Quantinuum
- **Hour 2**: Fix remaining three entity types
- **Hour 3**: Testing and verification
- **Hour 4**: Commit and deploy

This brings the new entity types in line with the proven pattern you've already established.