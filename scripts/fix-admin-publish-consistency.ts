#!/usr/bin/env node

/**
 * Script to fix publishing inconsistency in admin pages
 * Replaces Switch components with PublishButton components to match existing pattern
 */

import fs from 'fs';
import path from 'path';

const files = [
  '/Users/dryan/GitHub/openqase/src/app/admin/quantum-hardware/[id]/client.tsx',
  '/Users/dryan/GitHub/openqase/src/app/admin/quantum-software/[id]/client.tsx'
];

for (const filePath of files) {
  console.log(`Fixing ${path.basename(path.dirname(filePath))}...`);
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  const isHardware = filePath.includes('quantum-hardware');
  const isSoftware = filePath.includes('quantum-software');
  
  const entityName = isHardware ? 'QuantumHardware' : 'QuantumSoftware';
  const entityType = isHardware ? 'quantum hardware' : 'quantum software';
  const functionPrefix = isHardware ? 'saveQuantumHardware' : 'saveQuantumSoftware';
  const publishFunction = isHardware ? 'publishQuantumHardware' : 'publishQuantumSoftware';
  const unpublishFunction = isHardware ? 'unpublishQuantumHardware' : 'unpublishQuantumSoftware';
  
  // Replace the useState and add validation
  content = content.replace(
    /const \[isSaving, setIsSaving\] = useState\(false\)/,
    'const [isPending, startTransition] = useTransition()'
  );
  
  // Add validation rules and completion percentage
  const validationRulesInsert = `
  // Validation rules
  const validationRules = createContentValidationRules([
    { field: 'name', required: true, label: 'Name' },
    { field: 'slug', required: true, label: 'Slug' },
    { field: 'description', required: true, label: 'Description', minLength: 50 },
    { field: 'main_content', required: true, label: 'Main Content', minLength: 100 },
    ${isHardware ? "{ field: 'vendor', required: true, label: 'Vendor' }," : "{ field: 'vendor', required: true, label: 'Vendor' },"}
  ])

  const completionPercentage = calculateCompletionPercentage(values, validationRules)
`;
  
  content = content.replace(
    /(\s+const handleChange = \(field: string, value: any\) => {)/,
    validationRulesInsert + '$1'
  );
  
  // Add id to values
  content = content.replace(
    /const \[values, setValues\] = useState\(\{/,
    `const [values, setValues] = useState({
    id: isNew ? undefined : ${isHardware ? 'quantumHardware' : 'quantumSoftware'}?.id,`
  );
  
  // Replace handleSave function
  const newHandleSave = `  const handleSave = async () => {
    startTransition(async () => {
      try {
        const result = await ${functionPrefix}(values)
        
        if (isNew && result?.id) {
          setValues(prev => ({ ...prev, id: result.id }))
        }
        
        toast({
          title: 'Saved',
          description: '${entityType.charAt(0).toUpperCase() + entityType.slice(1)} has been saved successfully',
          duration: 3000,
        })
      } catch (error) {
        console.error("Error in handleSave:", error)
        
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to save ${entityType}',
          duration: 5000,
        })
      }
    })
  }
  
  const handlePublish = async () => {
    if (!values.id) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Cannot publish ${entityType} without saving first',
        duration: 3000,
      })
      return
    }
    
    startTransition(async () => {
      try {
        await ${functionPrefix}(values)
        await ${publishFunction}(values.id!)
        
        setValues(prev => ({ ...prev, published: true }))
        
        toast({
          title: 'Published',
          description: '${entityType.charAt(0).toUpperCase() + entityType.slice(1)} is now published and visible to users',
          duration: 3000,
        })
      } catch (error) {
        console.error("Error in handlePublish:", error)
        
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to publish ${entityType}',
          duration: 5000,
        })
      }
    })
  }
  
  const handleUnpublish = async () => {
    if (!values.id) return
    
    startTransition(async () => {
      try {
        await ${unpublishFunction}(values.id!)
        setValues(prev => ({ ...prev, published: false }))
        
        toast({
          title: 'Unpublished',
          description: '${entityType.charAt(0).toUpperCase() + entityType.slice(1)} is no longer visible to users',
          duration: 3000,
        })
      } catch (error) {
        console.error("Error in handleUnpublish:", error)
        
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to unpublish ${entityType}',
          duration: 5000,
        })
      }
    })
  }
  
  const validateContent = () => {
    return validateFormValues(values, validationRules)
  }`;
  
  // Replace old handleSave
  content = content.replace(
    /const handleSave = async \(\) => \{[\s\S]*?\}(?=\s*return)/m,
    newHandleSave
  );
  
  // Update header JSX to use PublishButton pattern
  const newHeader = `      <div className="pt-6 mb-8 bg-background pb-4 border-b border-border">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-start gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="mt-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {isNew ? 'Create' : 'Edit'} ${entityType.charAt(0).toUpperCase() + entityType.slice(1)}
              </h1>
              <p className="text-muted-foreground">
                {isNew ? 'Add a new ${entityType} to the database.' : 'Edit ${entityType} details.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ContentCompleteness percentage={completionPercentage} />
            <PublishButton
              isPublished={values.published}
              onPublish={handlePublish}
              onUnpublish={handleUnpublish}
              validateContent={validateContent}
              disabled={isPending}
            />
            <Button 
              onClick={handleSave} 
              disabled={isPending}
              className="min-w-[80px]"
            >
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save
            </Button>
          </div>
        </div>
      </div>`;
  
  // Replace header section
  content = content.replace(
    /<div className="[^"]*">\s*<div className="flex[^}]+<\/div>\s*<\/div>/s,
    newHeader
  );
  
  // Remove Switch component
  content = content.replace(
    /\s*<div className="flex items-center space-x-2[^}]+<Switch[^}]+\/>\s*<Label[^}]+<\/Label>\s*<\/div>/s,
    ''
  );
  
  // Update container className
  content = content.replace(
    /<div className="container mx-auto py-6">/,
    '<div className="space-y-10 max-w-5xl mx-auto pb-24">'
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`✓ Fixed ${path.basename(path.dirname(filePath))}`);
}

console.log('All admin pages now use consistent PublishButton pattern!');