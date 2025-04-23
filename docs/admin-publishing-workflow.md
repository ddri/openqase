# Admin Publishing Workflow Documentation

This document outlines how the publishing workflow is implemented for content types in the admin panel, using Algorithms as the reference implementation. The same patterns can be applied to other content types like Personas, Industries, and Case Studies.

## Table of Contents

1. [Database Structure](#database-structure)
2. [API Routes](#api-routes)
3. [Client Components](#client-components)
4. [Publishing Workflow](#publishing-workflow)
5. [Common Issues and Solutions](#common-issues-and-solutions)

## Database Structure

### Content Tables

Each content type has its own table in the database with a `published` boolean field:

```sql
create table algorithms (
    id uuid default uuid_generate_v4() primary key,
    slug text unique not null,
    name text not null,
    description text,
    main_content text,
    published boolean default false,
    quantum_advantage text,
    use_cases text[],
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    ts_content tsvector
);
```

### Junction Tables for Relationships

For many-to-many relationships, we use junction tables instead of array fields. This provides better data integrity and query performance:

```sql
create table algorithm_case_study_relations (
    id uuid default uuid_generate_v4() primary key,
    algorithm_id uuid references algorithms(id) on delete cascade,
    case_study_id uuid references case_studies(id) on delete cascade,
    created_at timestamp with time zone default now(),
    unique(algorithm_id, case_study_id)
);
```

### Row Level Security (RLS)

Junction tables have Row Level Security enabled with policies for admin access:

```sql
alter table algorithm_case_study_relations enable row level security;

create policy "Admins can manage algorithm_case_study_relations"
  on algorithm_case_study_relations
  for all
  using (auth.jwt() ->> 'role' = 'admin');
```

## API Routes

### GET Handler

The GET handler fetches content items and their relationships:

```typescript
// For a specific item by slug
if (slug) {
  const { data: algorithm, error } = await supabase
    .from('algorithms')
    .select('*')
    .eq('slug', slug)
    .single();
    
  if (error || !algorithm) {
    return NextResponse.json(
      { error: 'Algorithm not found' },
      { status: 404 }
    );
  }
  
  // Fetch related case studies from the junction table
  // Use service role client for junction table operations to bypass RLS
  const serviceClient = createServiceClient();
  const { data: relations, error: relationsError } = await serviceClient
    .from('algorithm_case_study_relations')
    .select(`
      case_study_id,
      case_studies:case_studies(id, slug, title)
    `)
    .eq('algorithm_id', algorithm.id);
    
  if (!relationsError && relations) {
    // Extract the case study information
    const relatedCaseStudies = relations.map(relation => relation.case_studies);
    (algorithm as any).related_case_studies = relatedCaseStudies;
  }
  
  return NextResponse.json(algorithm);
}
```

### POST Handler

The POST handler creates or updates content items and manages relationships:

```typescript
// Handle relationships with case studies using the junction table
if (relatedCaseStudies.length > 0) {
  console.log('Updating case study relationships for algorithm:', id);
  
  // First, delete existing relationships for this algorithm
  // Use service role client for junction table operations to bypass RLS
  const serviceClient = createServiceClient();
  const { error: deleteError } = await serviceClient
    .from('algorithm_case_study_relations')
    .delete()
    .eq('algorithm_id', id);
    
  if (deleteError) {
    console.error('Error deleting existing case study relationships:', deleteError);
  }
  
  // Then, insert new relationships
  const relationInserts = [];
  for (const caseStudySlug of relatedCaseStudies) {
    // Get the case study ID from the slug
    const { data: caseStudyData, error: caseStudyError } = await supabase
      .from('case_studies')
      .select('id')
      .eq('slug', caseStudySlug)
      .single();
      
    if (caseStudyError || !caseStudyData) {
      console.error(`Error finding case study with slug ${caseStudySlug}:`, caseStudyError);
      continue;
    }
    
    relationInserts.push({
      algorithm_id: id,
      case_study_id: caseStudyData.id
    });
  }
  
  if (relationInserts.length > 0) {
    // Use service role client for junction table operations to bypass RLS
    const serviceClient = createServiceClient();
    const { error: insertError } = await serviceClient
      .from('algorithm_case_study_relations')
      .insert(relationInserts);
      
    if (insertError) {
      console.error('Error inserting case study relationships:', insertError);
    } else {
      console.log(`Successfully inserted ${relationInserts.length} case study relationships`);
    }
  }
}
```

### DELETE Handler

The DELETE handler removes content items and their relationships:

```typescript
// First delete the relationships in the junction table
// Use service role client for junction table operations to bypass RLS
const serviceClient = createServiceClient();
const { error: relDeleteError } = await serviceClient
  .from('algorithm_case_study_relations')
  .delete()
  .eq('algorithm_id', id);
  
if (relDeleteError) {
  console.error('Error deleting algorithm relationships:', relDeleteError);
  // Continue with deletion even if relationship deletion fails
}

// Then delete the algorithm
const { error: deleteError } = await supabase
  .from('algorithms')
  .delete()
  .eq('id', id);
```

## Client Components

### Form State Management

The client component manages form state using React's useState hook:

```typescript
const [values, setValues] = useState<FormValues>({
  id: initialData?.id || '',
  name: initialData?.name || '',
  slug: initialData?.slug || '',
  description: initialData?.description || '',
  main_content: initialData?.main_content || '',
  published: initialData?.published || false,
  use_cases: initialData?.use_cases || [],
  related_case_studies: initialData?.related_case_studies?.map(cs => cs.slug) || [],
  related_industries: initialData?.related_industries?.map(ind => ind.slug) || []
});
```

### Tab Navigation with Auto-Save

When changing tabs, the form is automatically saved if required fields are filled:

```typescript
const handleTabChange = async (value: string) => {
  // Only save if there are changes and required fields are filled
  if (values.name && values.slug) {
    setIsSaving(true)
    try {
      // Create a synthetic event for the form submission
      const event = new Event('submit') as any
      event.preventDefault = () => {}
      
      await handleSubmit(event)
      setActiveTab(value)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save before changing tabs',
      })
    } finally {
      setIsSaving(false)
    }
  } else {
    // If required fields aren't filled, just change tabs without saving
    setActiveTab(value)
  }
}
```

### Publishing Workflow

The publish button validates content before publishing:

```typescript
onClick={async () => {
  // If trying to publish, validate content
  if (!values.published) {
    const isValid = validateContent();
    if (!isValid) {
      setShowValidationModal(true);
      return;
    }
    
    console.log('Before publishing - current state:', { ...values });
    
    // If valid, publish
    setValues(prev => {
      console.log('Setting published=true, prev state:', prev);
      return {
        ...prev,
        published: true
      };
    });
    
    // Need to wait for state update to complete
    setTimeout(async () => {
      // Log state after setting published to true
      console.log('After setting published=true, current values:', { ...values });
      
      // Save the form with the published state
      const event = new Event('submit') as any;
      event.preventDefault = () => {};
      
      // Create a payload manually to ensure published is set
      const payload = new FormData();
      if (values.id) {
        payload.append('id', values.id);
      }
      payload.append('name', values.name);
      payload.append('slug', values.slug);
      payload.append('description', values.description || '');
      payload.append('main_content', values.main_content || '');
      payload.append('published', 'on'); // Force published to be true
      
      // Handle array fields
      if (values.use_cases && values.use_cases.length > 0) {
        payload.append('use_cases', values.use_cases.join(', '));
      }
      
      // Handle relationships
      values.related_case_studies.forEach(slug => {
        payload.append('related_case_studies[]', slug);
      });
      
      values.related_industries.forEach(slug => {
        payload.append('related_industries[]', slug);
      });
      
      console.log('Manual payload published value:', payload.get('published'));
      
      // Submit the form data
      const response = await fetch('/api/algorithms', {
        method: 'POST',
        body: payload,
      });
      
      if (!response.ok) {
        console.error('Failed to save algorithm:', await response.text());
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to publish algorithm',
          duration: 5000,
        });
      } else {
        const data = await response.json();
        console.log('API response after manual publish:', data);
        
        // Update the last saved timestamp
        setLastSaved(new Date().toLocaleTimeString());
        
        toast({
          title: 'Published',
          description: 'Content is now published and visible to users',
          duration: 3000,
        });
      }
    }, 100);
  }
}
```

### Content Validation

The validateContent function checks if all required fields are filled:

```typescript
const validateContent = (): boolean => {
  const issues: Record<string, {name: string, label: string}[]> = {};
  
  // Basic tab validation
  const basicIssues = [];
  if (!values.name.trim()) {
    basicIssues.push({ name: 'name', label: 'Name is required' });
  }
  if (!values.slug.trim()) {
    basicIssues.push({ name: 'slug', label: 'Slug is required' });
  }
  if (basicIssues.length) {
    issues.basic = basicIssues;
  }
  
  // Content tab validation
  const contentIssues = [];
  if (!values.main_content.trim()) {
    contentIssues.push({ name: 'main_content', label: 'Main content is required' });
  }
  if (contentIssues.length) {
    issues.content = contentIssues;
  }
  
  // Relationships tab validation
  const relationshipIssues = [];
  if (values.related_case_studies.length === 0) {
    relationshipIssues.push({
      name: 'related_case_studies',
      label: 'At least one related case study is required'
    });
  }
  if (relationshipIssues.length) {
    issues.relationships = relationshipIssues;
  }
  
  // Update state with validation issues
  setValidationIssues(issues);
  
  // Return true if no issues found
  return Object.keys(issues).length === 0;
};
```

## Publishing Workflow

The publishing workflow follows these steps:

1. User fills out content in various tabs (Basic Info, Content, Technical Details, Relationships)
2. When changing tabs, content is automatically saved if required fields are filled
3. When clicking the Publish button:
   - Content is validated to ensure all required fields are filled
   - If validation fails, a modal shows the missing fields
   - If validation passes, the published flag is set to true
   - The form is submitted with the published flag
4. The API route:
   - Updates the content item with the published flag
   - Manages relationships in the junction table
   - Returns the updated content item
5. The UI updates to show the content as published

## Common Issues and Solutions

### 1. Junction Table Permissions

**Issue**: Junction tables with Row Level Security (RLS) may prevent regular clients from inserting/updating/deleting records.

**Solution**: Use the service role client for operations on junction tables:

```typescript
import { createServiceClient } from '@/utils/supabase/service-role';

// Use service role client for junction table operations
const serviceClient = createServiceClient();
const { error } = await serviceClient
  .from('algorithm_case_study_relations')
  .delete()
  .eq('algorithm_id', id);
```

### 2. React State Update Timing

**Issue**: React state updates are asynchronous, so the published flag may not be set in time for the form submission.

**Solution**: Use a manual approach with setTimeout and explicitly set the published flag:

```typescript
// Need to wait for state update to complete
setTimeout(async () => {
  // Create a payload manually to ensure published is set
  const payload = new FormData();
  payload.append('published', 'on'); // Force published to be true
  
  // Submit the form data
  const response = await fetch('/api/algorithms', {
    method: 'POST',
    body: payload,
  });
}, 100);
```

### 3. SQL Query Syntax Errors

**Issue**: Complex SQL queries with window functions may cause syntax errors in the Supabase PostgREST API.

**Solution**: Simplify the select statement and avoid using window functions:

```typescript
// Instead of:
.select(`
  *,
  industries (*),
  algorithms (*),
  count(*) over() as total_count
`, { count: 'exact' })

// Use:
.select(`
  *,
  industries (*),
  algorithms (*)
`, { count: 'exact' })
```

### 4. Relationship Queries

**Issue**: When fetching related items, using the wrong field (e.g., name instead of slug) can cause errors.

**Solution**: Ensure you're using the correct field for relationship queries:

```typescript
// Instead of:
const response = await fetch(
  `/api/case-studies?algorithm=${encodeURIComponent(algorithm.name)}`,
  { cache: 'no-store' }
);

// Use:
const response = await fetch(
  `/api/case-studies?algorithm=${encodeURIComponent(algorithm.slug)}`,
  { cache: 'no-store' }
);
```

## Implementing for Other Content Types

To implement this workflow for other content types (Personas, Industries, Case Studies):

1. Create junction tables for many-to-many relationships
2. Update API routes to use the service role client for junction table operations
3. Implement the same client-side validation and publishing workflow
4. Ensure proper state management for the published flag

By following this pattern, you can create a consistent publishing workflow across all content types in the admin panel.

## Implementation Progress

### Current State

#### Algorithms (Reference Implementation)
- ✅ Complete publishing workflow with:
  - `published` boolean field in the database
  - Multi-tab form interface with auto-save
  - Content validation before publishing
  - Content completeness indicator
  - Validation modal for missing required fields
  - Relationship management with case studies using junction tables

#### Personas & Industries
- ✅ Complete publishing workflow implemented following the Algorithms pattern
- ✅ Database schema updated with `published` and `updated_at` fields
- ✅ Client components with tab navigation, auto-save, and validation
- ✅ API routes updated to handle the publishing workflow
- ✅ TypeScript types updated to include new fields

#### Case Studies
- ✅ Basic list view with published status indicator
- ✅ Simple edit link
- ✅ Detailed edit form with tabs (Basic Info, Content, Classifications, Technical Details)
- ✅ Form validation with required fields
- ✅ Auto-save functionality when changing tabs
- ✅ Content completeness tracking with visual indicator
- ✅ Publishing controls with validation
- ✅ Relationship management with algorithms, industries, and personas

### Implementation Details

#### 1. Database Schema Updates

We've added the necessary fields to the database schema:

```sql
-- Add published field to personas table
ALTER TABLE personas ADD COLUMN published BOOLEAN DEFAULT FALSE;

-- Add published field to industries table
ALTER TABLE industries ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE industries ADD COLUMN published BOOLEAN DEFAULT FALSE;

-- Create comment to explain the migration
COMMENT ON TABLE personas IS 'User personas with publishing workflow support';
COMMENT ON TABLE industries IS 'Industry categories with publishing workflow support';

-- Update the updated_at column for personas when a row is updated
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for personas
CREATE TRIGGER update_personas_updated_at
BEFORE UPDATE ON personas
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for industries
CREATE TRIGGER update_industries_updated_at
BEFORE UPDATE ON industries
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

#### 2. TypeScript Type Updates

We've updated the TypeScript types to include the new fields:

```typescript
// For personas
personas: {
  Row: {
    // existing fields...
    published: boolean | null
    updated_at: string | null
  }
  Insert: {
    // existing fields...
    published?: boolean | null
    updated_at?: string | null
  }
  Update: {
    // existing fields...
    published?: boolean | null
    updated_at?: string | null
  }
}

// For industries
industries: {
  Row: {
    // existing fields...
    published: boolean | null
    updated_at: string | null
  }
  Insert: {
    // existing fields...
    published?: boolean | null
    updated_at?: string | null
  }
  Update: {
    // existing fields...
    published?: boolean | null
    updated_at?: string | null
  }
}
```

#### 3. Client Component Implementation

We've created client components for both Personas and Industries with:

1. **Form State Management**
   ```typescript
   const [values, setValues] = useState<PersonaFormData>({
     id: isNew ? undefined : persona?.id,
     name: isNew ? '' : persona?.name || '',
     slug: isNew ? '' : persona?.slug || '',
     description: isNew ? '' : persona?.description || '',
     role: isNew ? '' : persona?.role || '',
     industry: isNew ? [] : persona?.industry || [],
     published: isNew ? false : persona?.published || false,
   });
   ```

2. **Content Validation**
   ```typescript
   const validateContent = (): boolean => {
     const issues: Record<string, {name: string, label: string}[]> = {};
     
     // Basic tab validation
     const basicIssues = [];
     if (!values.name.trim()) {
       basicIssues.push({ name: 'name', label: 'Name is required' });
     }
     // ... more validation logic
     
     // Update state with validation issues
     setValidationIssues(issues);
     
     // Return true if no issues found
     return Object.keys(issues).length === 0;
   };
   ```

3. **Auto-Save Functionality**
   ```typescript
   const handleTabChange = async (value: string) => {
     // Only save if there are changes and required fields are filled
     if (values.name && values.slug) {
       setIsSaving(true)
       try {
         // Create a synthetic event for the form submission
         const event = new Event('submit') as any
         event.preventDefault = () => {}
         
         await handleSubmit(event)
         setActiveTab(value)
       } catch (error) {
         // Error handling
       } finally {
         setIsSaving(false)
       }
     } else {
       // If required fields aren't filled, just change tabs without saving
       setActiveTab(value)
     }
   }
   ```

4. **Publishing Controls**
   ```typescript
   <Button
     type="button"
     variant={values.published ? "default" : "outline"}
     size="sm"
     onClick={async () => {
       // If trying to publish, validate content
       if (!values.published) {
         const isValid = validateContent();
         if (!isValid) {
           setShowValidationModal(true);
           return;
         }
         
         // If valid, publish
         setValues(prev => ({
           ...prev,
           published: true
         }));
         
         // Save with published state
         // ...
       } else {
         // If unpublishing
         setValues(prev => ({
           ...prev,
           published: false
         }));
         
         // Save with unpublished state
         // ...
       }
     }}
   >
     {values.published ? 'Published ✓' : 'Publish'}
   </Button>
   ```

5. **Content Completeness Tracking**
   ```typescript
   const calculateCompletionPercentage = (): number => {
     const requiredFields = [
       { name: 'name', complete: !!values.name.trim() },
       { name: 'slug', complete: !!values.slug.trim() },
       { name: 'role', complete: !!values.role.trim() },
       { name: 'industry', complete: values.industry.length > 0 }
     ];
     
     const completedCount = requiredFields.filter(field => field.complete).length;
     return Math.round((completedCount / requiredFields.length) * 100);
   };
   ```

#### 4. API Route Updates

We've updated the API routes to handle the `published` field:

```typescript
// Get form data
const id = formData.get('id') as string;
const name = formData.get('name') as string;
const slug = formData.get('slug') as string;
const description = formData.get('description') as string || null;
const role = formData.get('role') as string || null;
const published = formData.get('published') === 'on';

// Prepare the data object
const baseData: PersonaInsert = {
  name,
  slug,
  description,
  role,
  published,
  industry: industry.length > 0 ? industry : null
};

// Update with timestamp
const { data: updatedData, error } = await supabase
  .from('personas')
  .update({
    ...baseData,
    updated_at: new Date().toISOString(),
  })
  .eq('id', id)
  .select('*')
  .single();
```

### Next Steps: Case Studies Implementation

To complete the publishing workflow for Case Studies, we need to:

1. Create a client component (`src/app/admin/case-studies/[id]/client.tsx`) with:
   - Tab navigation (Basic Info, Content, Technical Details, Relationships)
   - Auto-save functionality
   - Content validation and completeness tracking
   - Publishing controls

2. Update the page.tsx file to use the new client component

3. Enhance the API route to better handle relationships with algorithms, industries, and personas

The implementation would follow the same pattern as Personas and Industries, with adjustments for the specific fields and relationships of Case Studies.

### Common Components to Consider

For future improvements, we could extract common functionality into reusable components:

1. `ContentCompleteness`: A component to display the content completeness percentage
2. `ValidationModal`: A component to display validation issues
3. `PublishButton`: A component to handle publishing/unpublishing
4. `AutoSaveTabs`: A component for tab navigation with auto-save functionality