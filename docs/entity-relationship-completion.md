# Entity Relationship System Completion Guide

## Current Status
The quantum entity system is partially implemented:
- ✅ Database tables created (quantum_software, quantum_hardware, quantum_companies, partner_companies)
- ✅ Relationship junction tables created 
- ✅ Migration scripts exist to populate entities from legacy tags
- ✅ Content fetchers support the relationships
- ✅ Public pages display the relationships
- ❌ Admin UI for managing relationships is missing
- ❌ Save operations don't handle the new relationships

## Database Changes Needed for Production

### 1. Run the Migration Scripts (in order)
```sql
-- First: Create the new tables and relationships
-- File: create-content-types-migration.sql
-- This creates quantum_software, quantum_hardware, quantum_companies, partner_companies tables
-- And their junction tables with case_studies

-- Second: Populate entities from existing tags
-- File: migrate-tags-to-content.sql
-- This extracts unique values from legacy TEXT[] fields and creates entity records
-- Then creates relationships in the junction tables

-- Third: Clean up legacy fields (AFTER verification)
-- File: cleanup-legacy-fields-migration.sql
-- This removes the old TEXT[] columns from case_studies
-- Only run after confirming the new system works
```

## Code Changes Needed

### 1. Update Admin Case Study Page to Fetch Quantum Entities

**File:** `src/app/admin/case-studies/[id]/page.tsx`

Add fetching for quantum entities:
```typescript
// Fetch quantum entities for dropdowns
const { data: allQuantumSoftware } = await supabase
  .from('quantum_software')
  .select('id, slug, name')
  .eq('published', true)
  .order('name')

const { data: allQuantumHardware } = await supabase
  .from('quantum_hardware')
  .select('id, slug, name')
  .eq('published', true)
  .order('name')

const { data: allQuantumCompanies } = await supabase
  .from('quantum_companies')
  .select('id, slug, name')
  .eq('published', true)
  .order('name')

const { data: allPartnerCompanies } = await supabase
  .from('partner_companies')
  .select('id, slug, name')
  .eq('published', true)
  .order('name')
```

Fetch existing relationships when editing:
```typescript
if (!isNew && caseStudy) {
  // Fetch quantum software relationships
  const { data: quantumSoftwareRelations } = await supabase
    .from('case_study_quantum_software_relations')
    .select('quantum_software_id')
    .eq('case_study_id', caseStudy.id)
  
  // Similar for hardware, companies, partners...
}
```

### 2. Update Admin Case Study Form Component

**File:** `src/app/admin/case-studies/[id]/client.tsx`

Add props for quantum entities:
```typescript
interface CaseStudyFormProps {
  // existing props...
  quantumSoftware: any[];
  quantumHardware: any[];
  quantumCompanies: any[];
  partnerCompanies: any[];
}
```

Add state for quantum relationships:
```typescript
const [values, setValues] = useState({
  // existing fields...
  quantum_software_ids: isNew ? [] : caseStudy?.quantum_software_ids || [],
  quantum_hardware_ids: isNew ? [] : caseStudy?.quantum_hardware_ids || [],
  quantum_company_ids: isNew ? [] : caseStudy?.quantum_company_ids || [],
  partner_company_ids: isNew ? [] : caseStudy?.partner_company_ids || [],
})
```

Add UI components:
```typescript
{/* Technical Details Section */}
<Card className="shadow-sm">
  <CardHeader className="p-6">
    <CardTitle>Technical Details</CardTitle>
  </CardHeader>
  <CardContent className="space-y-8 p-6 pt-0">
    <RelationshipSelector
      items={quantumSoftware}
      selectedItems={values.quantum_software_ids}
      onChange={(selectedItems) => handleChange('quantum_software_ids', selectedItems)}
      itemLabelKey="name"
      itemValueKey="id"
      label="Quantum Software"
      placeholder="Select quantum software..."
    />
    
    <RelationshipSelector
      items={quantumHardware}
      selectedItems={values.quantum_hardware_ids}
      onChange={(selectedItems) => handleChange('quantum_hardware_ids', selectedItems)}
      itemLabelKey="name"
      itemValueKey="id"
      label="Quantum Hardware"
      placeholder="Select quantum hardware..."
    />
    
    <RelationshipSelector
      items={quantumCompanies}
      selectedItems={values.quantum_company_ids}
      onChange={(selectedItems) => handleChange('quantum_company_ids', selectedItems)}
      itemLabelKey="name"
      itemValueKey="id"
      label="Quantum Companies"
      placeholder="Select quantum companies..."
    />
    
    <RelationshipSelector
      items={partnerCompanies}
      selectedItems={values.partner_company_ids}
      onChange={(selectedItems) => handleChange('partner_company_ids', selectedItems)}
      itemLabelKey="name"
      itemValueKey="id"
      label="Partner Companies"
      placeholder="Select partner companies..."
    />
  </CardContent>
</Card>
```

### 3. Update Save Actions to Handle Quantum Relationships

**File:** `src/app/admin/case-studies/[id]/actions.ts`

Add relationship management after saving case study:
```typescript
// Save quantum software relationships
if (values.quantum_software_ids) {
  // Delete existing relationships
  await supabase
    .from('case_study_quantum_software_relations')
    .delete()
    .eq('case_study_id', data.id);
  
  // Insert new relationships
  const quantumSoftwareRelations = values.quantum_software_ids.map(id => ({
    case_study_id: data.id,
    quantum_software_id: id
  }));
  
  if (quantumSoftwareRelations.length > 0) {
    await supabase
      .from('case_study_quantum_software_relations')
      .insert(quantumSoftwareRelations);
  }
}

// Repeat for quantum_hardware, quantum_companies, partner_companies
```

## Testing Plan

1. **Start local Supabase:**
   ```bash
   supabase start
   ```

2. **Run migration scripts:**
   ```bash
   supabase db reset --local
   # This will apply all migrations including the new entity tables
   ```

3. **Test the admin interface:**
   - Create a new case study
   - Select quantum entities from dropdowns
   - Save and verify relationships are created
   - Edit existing case study and verify relationships load

4. **Test public pages:**
   - View case study page
   - Verify quantum entities appear as clickable links
   - Click through to entity detail pages

## Production Deployment Checklist

1. **Backup production database** before any changes

2. **Run migrations in production:**
   ```sql
   -- Run create-content-types-migration.sql
   -- Run migrate-tags-to-content.sql
   -- DO NOT run cleanup-legacy-fields-migration.sql yet
   ```

3. **Deploy code changes** with entity relationship support

4. **Verify in production:**
   - Check that existing case studies show quantum entities
   - Create/edit a case study to test admin interface
   - Ensure no data loss

5. **After verification (optional):**
   ```sql
   -- Run cleanup-legacy-fields-migration.sql
   -- This removes the legacy TEXT[] columns
   ```

## Rollback Plan

If issues occur, the system falls back to legacy TEXT[] fields:
- The `professional-case-study-layout.tsx` component checks both new relationships and legacy fields
- Don't run the cleanup migration until fully verified
- Can revert code changes without data loss

## Notes

- The relationship system is bidirectional (case studies ↔ entities)
- All relationships support soft delete via `deleted_at` field
- RLS policies are already configured for public read access
- Consider adding caching for entity lists in admin forms