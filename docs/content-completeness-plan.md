# Content Completeness Implementation Plan

This plan outlines how to implement content completeness features in the admin interface to prevent publishing incomplete content that could cause errors.

## Phase 1: Required Field Distinction

### Implementation Details

1. **Visual Indicators for Required Fields**
   - Add asterisks (*) to labels of required fields
   - Style required field labels with a distinct color or weight
   - Add "Required" text to field descriptions where appropriate

2. **Field-level Validation**
   - Add inline validation for required fields
   - Show validation messages directly beneath fields
   - Highlight fields with validation errors

3. **Required Relationship Fields**
   - Clearly mark which relationship fields are required (e.g., "At least one related case study is required")
   - Add visual indicators for relationship tabs that contain required selections

### UI Components

```jsx
// Example of required field styling
<div className="space-y-2">
  <Label htmlFor="name" className="required-field">
    Name <span className="text-red-500">*</span>
  </Label>
  <Input
    type="text"
    name="name"
    id="name"
    value={values.name}
    onChange={handleChange}
    required
    className={errors.name ? "border-red-500" : ""}
  />
  {errors.name && (
    <p className="text-sm text-red-500">{errors.name}</p>
  )}
</div>
```

## Phase 2: Content Completeness Indicators

### Implementation Details

1. **Tab Completion Indicators**
   - Add visual indicators to tab triggers showing completion status
   - Use colors (red/yellow/green) or icons (warning/check) to indicate status
   - Show the number of incomplete required fields in each tab

2. **Overall Completion Progress**
   - Add a progress bar or percentage indicator showing overall content completeness
   - Calculate based on the ratio of completed required fields to total required fields
   - Position prominently at the top of the form

3. **Tab Navigation Enhancements**
   - Highlight tabs with incomplete required fields
   - Add tooltips showing which fields need attention

### UI Components

```jsx
// Example of tab with completion indicator
<TabsList>
  <TabsTrigger 
    value="basic" 
    className="relative"
  >
    Basic Info
    {!isTabComplete('basic') && (
      <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" 
            title="This tab has incomplete required fields" />
    )}
  </TabsTrigger>
  {/* Other tabs */}
</TabsList>

// Example of completion progress indicator
<div className="mb-4">
  <div className="flex justify-between mb-1">
    <span>Content Completeness</span>
    <span>{completionPercentage}%</span>
  </div>
  <div className="w-full bg-gray-200 rounded-full h-2.5">
    <div 
      className="bg-blue-600 h-2.5 rounded-full" 
      style={{ width: `${completionPercentage}%` }}
    ></div>
  </div>
</div>
```

## Phase 3: Draft/Published Workflow States

### Implementation Details

1. **Draft/Published Toggle**
   - Replace the current "Published" checkbox with a more prominent toggle
   - Add visual distinction between draft and published states
   - Include explanatory text about the implications of each state

2. **State-based Validation Rules**
   - Allow saving as draft with minimal validation
   - Enforce strict validation for published content
   - Prevent toggling to published state if required fields are incomplete

3. **Status Indicator**
   - Add a prominent status badge showing current state (Draft/Published)
   - Include last saved timestamp with the status

### UI Components

```jsx
// Example of Draft/Published toggle with validation
<div className="flex items-center space-x-4 p-4 border rounded-md bg-gray-50">
  <div className="flex-1">
    <h3 className="font-medium">Content Status</h3>
    <p className="text-sm text-gray-500">
      Draft content can be saved with incomplete fields. 
      Published content must be complete.
    </p>
  </div>
  <div className="flex items-center space-x-2">
    <span className={!values.published ? "font-medium" : "text-gray-500"}>
      Draft
    </span>
    <Switch
      checked={values.published}
      onCheckedChange={(checked) => {
        if (checked && !isContentComplete()) {
          // Show validation modal
          setShowPublishValidationModal(true);
          return;
        }
        setValues(prev => ({ ...prev, published: checked }));
      }}
    />
    <span className={values.published ? "font-medium" : "text-gray-500"}>
      Published
    </span>
  </div>
</div>
```

## Phase 4: Pre-publish Validation

### Implementation Details

1. **Validation Modal**
   - Create a modal that appears when attempting to publish incomplete content
   - List all incomplete required fields grouped by tab
   - Provide direct links to navigate to the tabs with issues

2. **Save Button Behavior**
   - Update the "Save" button to always allow saving as draft
   - Add validation checks when saving with "Published" state enabled
   - Show appropriate feedback based on validation results

3. **Validation Logic**
   - Implement a comprehensive validation function that checks all required fields
   - Include relationship field validation (e.g., at least one related case study)
   - Support custom validation rules for specific content types

### UI Components

```jsx
// Example of pre-publish validation modal
<AlertDialog open={showPublishValidationModal} onOpenChange={setShowPublishValidationModal}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle className="flex items-center">
        <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
        Cannot Publish Incomplete Content
      </AlertDialogTitle>
      <AlertDialogDescription>
        The following required fields need to be completed before publishing:
      </AlertDialogDescription>
    </AlertDialogHeader>
    <div className="max-h-[60vh] overflow-y-auto">
      {Object.entries(validationIssues).map(([tab, fields]) => (
        <div key={tab} className="mb-4">
          <h3 className="font-medium mb-2">{getTabLabel(tab)}</h3>
          <ul className="list-disc pl-5 space-y-1">
            {fields.map(field => (
              <li key={field.name}>{field.label}</li>
            ))}
          </ul>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={() => {
              setActiveTab(tab);
              setShowPublishValidationModal(false);
            }}
          >
            Go to {getTabLabel(tab)}
          </Button>
        </div>
      ))}
    </div>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction
        onClick={() => {
          setValues(prev => ({ ...prev, published: false }));
          setShowPublishValidationModal(false);
        }}
      >
        Save as Draft Instead
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Implementation Approach

### Step 1: Form State Enhancement

Add validation state tracking to the form:

```typescript
// Add to component state
const [errors, setErrors] = useState<Record<string, string>>({});
const [validationIssues, setValidationIssues] = useState<Record<string, any[]>>({});
const [showPublishValidationModal, setShowPublishValidationModal] = useState(false);
const [completionPercentage, setCompletionPercentage] = useState(0);
```

### Step 2: Validation Functions

Implement validation logic:

```typescript
// Validate a single field
const validateField = (name: string, value: any): string | null => {
  if (name === 'name' && (!value || value.trim() === '')) {
    return 'Name is required';
  }
  if (name === 'slug' && (!value || value.trim() === '')) {
    return 'Slug is required';
  }
  // Add other field validations
  return null;
};

// Check if a tab is complete
const isTabComplete = (tabName: string): boolean => {
  switch (tabName) {
    case 'basic':
      return !errors.name && !errors.slug;
    case 'relationships':
      return values.related_case_studies.length > 0;
    // Add other tab validations
    default:
      return true;
  }
};

// Validate all content before publishing
const validateForPublishing = (): boolean => {
  const issues: Record<string, any[]> = {};
  
  // Basic tab validation
  const basicIssues = [];
  if (!values.name) basicIssues.push({ name: 'name', label: 'Name is required' });
  if (!values.slug) basicIssues.push({ name: 'slug', label: 'Slug is required' });
  if (basicIssues.length) issues.basic = basicIssues;
  
  // Relationships tab validation
  const relationshipIssues = [];
  if (values.related_case_studies.length === 0) {
    relationshipIssues.push({ 
      name: 'related_case_studies', 
      label: 'At least one related case study is required' 
    });
  }
  if (relationshipIssues.length) issues.relationships = relationshipIssues;
  
  // Update state with validation issues
  setValidationIssues(issues);
  
  // Return true if no issues found
  return Object.keys(issues).length === 0;
};

// Calculate completion percentage
const calculateCompletionPercentage = (): number => {
  const requiredFields = ['name', 'slug', 'related_case_studies'];
  const completedFields = requiredFields.filter(field => {
    if (field === 'related_case_studies') {
      return values.related_case_studies.length > 0;
    }
    return values[field] && values[field].toString().trim() !== '';
  });
  
  return Math.round((completedFields.length / requiredFields.length) * 100);
};
```

### Step 3: Update Form Submission

Modify the form submission logic:

```typescript
// Update handleSubmit function
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  // Validate if trying to publish
  if (values.published && !validateForPublishing()) {
    setShowPublishValidationModal(true);
    setIsSubmitting(false);
    return;
  }
  
  try {
    // Existing submission code...
  } catch (error) {
    // Error handling...
  } finally {
    setIsSubmitting(false);
  }
};
```

### Step 4: Update UI Components

Enhance the UI with the new components described above.

## Timeline

1. **Week 1**: Implement Required Field Distinction (Phase 1)
2. **Week 2**: Implement Content Completeness Indicators (Phase 2)
3. **Week 3**: Implement Draft/Published Workflow States (Phase 3)
4. **Week 4**: Implement Pre-publish Validation (Phase 4)

## Success Criteria

- Users cannot publish content with missing required fields
- Clear visual indicators show which fields need attention
- Draft content can be saved without all required fields
- Published content must have all required fields completed
- Error rates for viewing published content are reduced to zero