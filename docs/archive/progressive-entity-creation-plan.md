# Progressive Entity Creation Plan

## Overview
Implement "create on the fly" functionality for quantum companies, hardware, software, and partner companies while maintaining backward compatibility and data integrity.

## Phase 1: Database Schema Enhancement (Non-Breaking)

### 1.1 Add Metadata Columns
```sql
-- Add status tracking to all four entity types
ALTER TABLE quantum_companies ADD COLUMN IF NOT EXISTS 
  content_status TEXT DEFAULT 'complete',
  is_stub BOOLEAN DEFAULT false,
  created_via TEXT DEFAULT 'admin'; -- 'admin', 'case_study_form', 'import'

ALTER TABLE quantum_hardware ADD COLUMN IF NOT EXISTS
  content_status TEXT DEFAULT 'complete',
  is_stub BOOLEAN DEFAULT false,
  created_via TEXT DEFAULT 'admin';

ALTER TABLE quantum_software ADD COLUMN IF NOT EXISTS
  content_status TEXT DEFAULT 'complete',
  is_stub BOOLEAN DEFAULT false,
  created_via TEXT DEFAULT 'admin';

ALTER TABLE partner_companies ADD COLUMN IF NOT EXISTS
  content_status TEXT DEFAULT 'complete',
  is_stub BOOLEAN DEFAULT false,
  created_via TEXT DEFAULT 'admin';

-- Update existing records to mark them as complete
UPDATE quantum_companies SET content_status = 'complete', is_stub = false WHERE content_status IS NULL;
UPDATE quantum_hardware SET content_status = 'complete', is_stub = false WHERE content_status IS NULL;
UPDATE quantum_software SET content_status = 'complete', is_stub = false WHERE content_status IS NULL;
UPDATE partner_companies SET content_status = 'complete', is_stub = false WHERE content_status IS NULL;
```

### 1.2 Content Status Types
- `stub` - Name and slug only (created via quick-add)
- `partial` - Has description but missing detailed content
- `complete` - Full profile with main_content and all metadata

## Phase 2: API Endpoints for Quick Creation

### 2.1 New API Routes
```typescript
// /api/quantum-companies/quick-create
// /api/quantum-hardware/quick-create
// /api/quantum-software/quick-create
// /api/partner-companies/quick-create
```

### 2.2 Quick Create Endpoint Logic
```typescript
// Example: /api/quantum-companies/quick-create/route.ts
export async function POST(request: Request) {
  const { name, case_study_id } = await request.json();
  
  // Check if already exists
  const existing = await supabase
    .from('quantum_companies')
    .select('id, name, slug')
    .eq('slug', generateSlug(name))
    .single();
    
  if (existing.data) {
    // Return existing entity
    return NextResponse.json({ 
      data: existing.data, 
      created: false 
    });
  }
  
  // Create stub entity
  const { data, error } = await supabase
    .from('quantum_companies')
    .insert({
      name,
      slug: generateSlug(name),
      description: `${name} is a quantum computing company.`, // Minimal default
      content_status: 'stub',
      is_stub: true,
      created_via: 'case_study_form',
      published: false // Stubs start as drafts
    })
    .select()
    .single();
    
  if (data && case_study_id) {
    // Auto-link to the case study
    await supabase
      .from('case_study_quantum_company_relations')
      .insert({
        case_study_id,
        quantum_company_id: data.id
      });
  }
  
  return NextResponse.json({ 
    data, 
    created: true,
    message: 'Stub created - remember to complete the profile later'
  });
}
```

## Phase 3: Enhanced Case Study Form UI

### 3.1 New Multi-Select Component
```typescript
// components/admin/entity-multi-select.tsx
interface EntityMultiSelectProps {
  entityType: 'quantum_companies' | 'quantum_hardware' | 'quantum_software' | 'partner_companies';
  value: string[]; // Array of IDs
  onChange: (value: string[]) => void;
  caseStudyId?: string;
}

export function EntityMultiSelect({ entityType, value, onChange, caseStudyId }: EntityMultiSelectProps) {
  const [options, setOptions] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Load existing entities
  useEffect(() => {
    fetchEntities();
  }, [entityType]);
  
  const handleCreateNew = async (name: string) => {
    setIsCreating(true);
    
    const response = await fetch(`/api/${entityType}/quick-create`, {
      method: 'POST',
      body: JSON.stringify({ name, case_study_id: caseStudyId })
    });
    
    const { data, created } = await response.json();
    
    if (created) {
      toast({
        title: 'Created stub entity',
        description: `"${name}" was created. Remember to complete its profile later.`,
        action: <ToastAction altText="Edit now" onClick={() => window.open(`/admin/${entityType}/${data.id}`, '_blank')}>
          Edit Profile
        </ToastAction>
      });
    }
    
    // Add to selected values
    onChange([...value, data.id]);
    
    // Refresh options
    await fetchEntities();
    setIsCreating(false);
  };
  
  return (
    <div className="space-y-2">
      <Label>{formatEntityTypeLabel(entityType)}</Label>
      
      <MultiSelect
        options={options}
        value={value}
        onChange={onChange}
        placeholder="Search or create..."
        searchable
        creatable
        onCreateOption={handleCreateNew}
        isCreating={isCreating}
        formatCreateLabel={(input) => `Create "${input}" (stub)`}
        components={{
          Option: ({ data }) => (
            <div className="flex items-center justify-between">
              <span>{data.label}</span>
              {data.is_stub && (
                <Badge variant="outline" className="ml-2 text-xs">
                  Needs Profile
                </Badge>
              )}
            </div>
          )
        }}
      />
      
      <p className="text-xs text-muted-foreground">
        Can't find what you're looking for? Just type and press Enter to create a stub.
      </p>
    </div>
  );
}
```

### 3.2 Updated Case Study Form
```typescript
// In case study admin form
<EntityMultiSelect
  entityType="quantum_companies"
  value={formData.quantum_company_ids}
  onChange={(ids) => setFormData({ ...formData, quantum_company_ids: ids })}
  caseStudyId={caseStudyId}
/>

<EntityMultiSelect
  entityType="quantum_hardware"
  value={formData.quantum_hardware_ids}
  onChange={(ids) => setFormData({ ...formData, quantum_hardware_ids: ids })}
  caseStudyId={caseStudyId}
/>
```

## Phase 4: Admin Dashboard for Incomplete Profiles

### 4.1 New Dashboard Section
```typescript
// /app/admin/dashboard/incomplete-profiles.tsx
export function IncompleteProfiles() {
  const [stubs, setStubs] = useState({
    quantum_companies: [],
    quantum_hardware: [],
    quantum_software: [],
    partner_companies: []
  });
  
  useEffect(() => {
    // Fetch all stubs
    Promise.all([
      supabase.from('quantum_companies').select('*').eq('is_stub', true),
      supabase.from('quantum_hardware').select('*').eq('is_stub', true),
      supabase.from('quantum_software').select('*').eq('is_stub', true),
      supabase.from('partner_companies').select('*').eq('is_stub', true)
    ]).then(([companies, hardware, software, partners]) => {
      setStubs({
        quantum_companies: companies.data || [],
        quantum_hardware: hardware.data || [],
        quantum_software: software.data || [],
        partner_companies: partners.data || []
      });
    });
  }, []);
  
  const totalStubs = Object.values(stubs).reduce((sum, arr) => sum + arr.length, 0);
  
  if (totalStubs === 0) return null;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Incomplete Entity Profiles</CardTitle>
        <CardDescription>
          {totalStubs} entities need their profiles completed
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stubs.quantum_companies.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Quantum Companies ({stubs.quantum_companies.length})</h4>
              <div className="space-y-1">
                {stubs.quantum_companies.map(company => (
                  <div key={company.id} className="flex items-center justify-between p-2 border rounded">
                    <span>{company.name}</span>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/admin/quantum-companies/${company.id}`}>
                        Complete Profile
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Repeat for other entity types */}
        </div>
      </CardContent>
    </Card>
  );
}
```

## Phase 5: Public Display Handling

### 5.1 Options for Stub Display

**Option A: Hide Stubs from Public**
```typescript
// In content-fetchers.ts
export async function getPublicQuantumCompanies() {
  return supabase
    .from('quantum_companies')
    .select('*')
    .eq('published', true)
    .eq('is_stub', false); // Hide stubs
}
```

**Option B: Show Stubs with Minimal Info**
```typescript
// In quantum company detail page
if (company.is_stub) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1>{company.name}</h1>
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          Full profile coming soon. This company is mentioned in our case studies.
        </AlertDescription>
      </Alert>
      
      {/* Still show related case studies */}
      <RelatedCaseStudies companyId={company.id} />
    </div>
  );
}
```

**Option C: Progressive Enhancement**
- Show whatever content exists
- Add "Help us improve this profile" CTA for stubs

## Phase 6: Migration Strategy

### 6.1 Deployment Order
1. **Deploy schema changes** (Phase 1) - Non-breaking
2. **Deploy API endpoints** (Phase 2) - New endpoints, no conflicts
3. **Deploy enhanced UI** (Phase 3) - Backward compatible
4. **Monitor and educate** - Train content editors on new workflow
5. **Complete stub profiles** - Gradually enhance stubs to full profiles

### 6.2 Rollback Plan
- All changes are additive (new columns, new endpoints)
- Old workflow still works (can still create full entities first)
- Can revert UI changes independently of database changes

### 6.3 Testing Checklist
- [ ] Can create case study with existing entities
- [ ] Can create case study with new stub entities
- [ ] Stubs appear in admin dashboard
- [ ] Stubs can be upgraded to full profiles
- [ ] Public pages handle stubs appropriately
- [ ] Search includes/excludes stubs as configured
- [ ] No 404s for stub entity pages

## Phase 7: Future Enhancements

### 7.1 Bulk Import with Stubs
```typescript
// When importing case studies
const companiesMentioned = ['IBM', 'Google', 'Rigetti', 'IonQ'];

for (const companyName of companiesMentioned) {
  await createOrGetEntity('quantum_companies', companyName, {
    createAsStub: true,
    source: 'bulk_import'
  });
}
```

### 7.2 AI-Assisted Profile Completion
- Use AI to suggest descriptions from context
- Auto-fetch company websites for metadata
- Suggest relationships based on case study content

### 7.3 Crowdsourced Improvements
- Allow verified users to suggest profile improvements
- Review queue for community contributions

## Benefits of This Approach

1. **No Breaking Changes** - Everything is backward compatible
2. **Improved Workflow** - Content editors can work faster
3. **Data Quality Tracking** - Know what needs improvement
4. **Flexible Display** - Choose how to handle incomplete data
5. **Progressive Enhancement** - Start simple, improve over time

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Too many stubs created | Dashboard tracking, regular cleanup reminders |
| SEO impact from thin content | Hide stubs from public or add noindex |
| User confusion about stubs | Clear labeling in admin UI |
| Data quality degradation | Automated alerts for old stubs |

## Success Metrics

- **Workflow Speed**: Time to create case study reduced by 50%
- **Stub Completion Rate**: 80% of stubs completed within 30 days
- **Content Quality**: No increase in 404s or thin content pages
- **Editor Satisfaction**: Positive feedback on new workflow

## Implementation Timeline

- **Week 1**: Database changes and API endpoints
- **Week 2**: UI components and case study form updates
- **Week 3**: Admin dashboard and monitoring
- **Week 4**: Testing, training, and deployment