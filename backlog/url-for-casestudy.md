# Case Study Resource Links Implementation Plan

## Overview
This plan outlines the implementation of multiple resource links for case studies, replacing the single URL field with a more flexible array of structured links.

## Database Changes ✅
1. Add `resource_links` field to the `case_studies` table
   - Type: JSONB array
   - Structure: `[{url: string, label: string, order: number}]`
   - Default: Empty array `[]`
2. Migrate existing URL data to the new structure
3. (Optional) Eventually retire the legacy URL field

## TypeScript Type Updates
Update the case study type definitions in `src/types/supabase.ts`:

```typescript
// Add to case_studies Row type
resource_links: {
  url: string;
  label: string;
  order: number;
}[] | null
```

## Admin UI Implementation
### Update Case Study Form
1. Add "Resource Links" section to the form
   ```tsx
   <Card className="shadow-sm">
     <CardHeader className="p-6">
       <CardTitle>Resource Links</CardTitle>
     </CardHeader>
     <CardContent className="space-y-6 p-6 pt-0">
       {/* Resource Links interface */}
     </CardContent>
   </Card>
   ```

2. Create ResourceLinksEditor component
   - Display existing links as a numbered list
   - Provide fields for URL and label
   - Include up/down buttons for reordering
   - Add delete button for each link
   - Include "Add Resource Link" button at the bottom

3. Update form state to include resource_links
   ```tsx
   const [values, setValues] = useState({
     // existing fields...
     resource_links: isNew ? [] : caseStudy?.resource_links || [],
     // removed url field...
   });
   ```

4. Handle resource links changes
   ```tsx
   const handleAddLink = () => {
     const newLinks = [...values.resource_links, {
       url: '',
       label: '',
       order: values.resource_links.length + 1
     }];
     handleChange('resource_links', newLinks);
   };

   const handleRemoveLink = (index: number) => {
     const newLinks = values.resource_links.filter((_, i) => i !== index);
     // Recompute order values
     newLinks.forEach((link, i) => {
       link.order = i + 1;
     });
     handleChange('resource_links', newLinks);
   };

   const handleMoveLink = (index: number, direction: 'up' | 'down') => {
     if (
       (direction === 'up' && index === 0) || 
       (direction === 'down' && index === values.resource_links.length - 1)
     ) {
       return;
     }

     const newLinks = [...values.resource_links];
     const targetIndex = direction === 'up' ? index - 1 : index + 1;
     
     // Swap items
     [newLinks[index], newLinks[targetIndex]] = [newLinks[targetIndex], newLinks[index]];
     
     // Update order values
     newLinks.forEach((link, i) => {
       link.order = i + 1;
     });
     
     handleChange('resource_links', newLinks);
   };
   ```

### Update Save Action
Ensure the `resource_links` field is included in the database save operation in `actions.ts`:

```typescript
export async function saveCaseStudy(values: any): Promise<any> {
  try {
    const supabase = createServiceRoleSupabaseClient();
    const { data, error } = await supabase
      .from('case_studies')
      .upsert({
        // existing fields...
        resource_links: values.resource_links || [],
        // no need to include url field anymore
      })
      .select()
      .single();
    
    // rest of the function...
  }
}
```

## Frontend Display Implementation
Update the case study page to display resource links in the sidebar:

```tsx
{/* Resource Links Section */}
{caseStudy.resource_links && caseStudy.resource_links.length > 0 && (
  <div>
    <h3 className="text-lg font-semibold mb-2">External Resources</h3>
    <div className="flex flex-col gap-2">
      {caseStudy.resource_links
        .sort((a, b) => a.order - b.order)
        .map((link, index) => (
          <a 
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {link.label}
          </a>
        ))}
    </div>
  </div>
)}
```

## Testing Checklist
- [ ] Database field creation and migration of existing data
- [ ] Type definitions correctly reflect the new structure
- [ ] Admin form correctly displays, adds, removes, and reorders resource links
- [ ] Changes to resource links are properly saved to the database
- [ ] Case study page correctly displays resource links in the correct order
- [ ] Links open the correct URLs in a new tab

## Future Enhancements
- Consider adding link type/category for more organization
- Add optional icon display based on link type or URL domain
- Implement drag-and-drop reordering for better UX
- Add validation for URL format
- Consider analytics tracking for external resource clicks 