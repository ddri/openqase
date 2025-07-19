'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RelationshipSelector } from '@/components/admin/RelationshipSelector';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ContentCompleteness } from '@/components/admin/ContentCompleteness';
import { PublishButton } from '@/components/admin/PublishButton';
import { TagInput } from '@/components/ui/tag-input';
import { createContentValidationRules, calculateCompletionPercentage, validateFormValues } from '@/utils/form-validation';
import { useTransition } from 'react';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { saveAlgorithm, publishAlgorithm, unpublishAlgorithm } from './actions';

interface AlgorithmFormProps {
  algorithm: any | null;
  caseStudies: any[];
  industries: any[];
  personas: any[];
  isNew: boolean;
}

/**
 * AlgorithmForm Component
 *
 * A simplified form for algorithms with all fields on a single page.
 *
 * @param algorithm - Initial algorithm data
 * @param caseStudies - Available case studies for relationships
 * @param industries - Available industries for relationships
 * @param personas - Available personas for relationships
 * @param isNew - Whether this is a new algorithm
 */
export function AlgorithmForm({ algorithm, caseStudies, industries, personas, isNew }: AlgorithmFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState({
    id: isNew ? undefined : algorithm?.id,
    name: isNew ? '' : algorithm?.name || '',
    slug: isNew ? '' : algorithm?.slug || '',
    description: isNew ? '' : algorithm?.description || '',
    main_content: isNew ? '' : algorithm?.main_content || '',
    use_cases: isNew ? [] : algorithm?.use_cases || [],
    related_case_studies: isNew ? [] : algorithm?.related_case_studies || [],
    related_industries: isNew ? [] : algorithm?.related_industries || [],
    related_personas: isNew ? [] : algorithm?.related_personas || [],
    published: isNew ? false : algorithm?.published || false,
    steps: isNew ? '' : algorithm?.steps || '',
    academic_references: isNew ? '' : algorithm?.academic_references || '',
  });
  const [isDirty, setIsDirty] = useState(false);
  
  // Validation rules for algorithms
  const validationRules = createContentValidationRules('algorithm');
  const completionPercentage = calculateCompletionPercentage({ values, validationRules });
  
  // Handle field change
  const handleChange = (field: string, value: any) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
    setIsDirty(true);
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    startTransition(async () => {
      try {
        const result = await saveAlgorithm(values);
        
        // If this was a new algorithm and we got an ID back, redirect to edit page
        if (isNew && result?.id) {
          router.push(`/admin/algorithms/${result.id}`);
        }
        
        setIsDirty(false);
        
        toast({
          title: 'Saved',
          description: 'Algorithm saved successfully',
          duration: 3000,
        });
      } catch (error) {
        console.error("Error in handleSave:", error);
        
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to save algorithm',
          duration: 5000,
        });
      }
    });
  };
  
  // Handle publishing
  const handlePublish = async () => {
    if (!values.id) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Cannot publish algorithm without saving first',
        duration: 3000,
      });
      return;
    }
    
    startTransition(async () => {
      try {
        // First save the content
        await saveAlgorithm(values);
        
        // Then publish it
        await publishAlgorithm(values.id!);
        
        setValues(prev => ({ ...prev, published: true }));
        
        toast({
          title: 'Published',
          description: 'Algorithm is now published and visible to users',
          duration: 3000,
        });
      } catch (error) {
        console.error("Error in handlePublish:", error);
        
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to publish algorithm',
          duration: 5000,
        });
      }
    });
  };
  
  // Handle unpublishing
  const handleUnpublish = async () => {
    if (!values.id) return;
    
    startTransition(async () => {
      try {
        await unpublishAlgorithm(values.id!);
        
        setValues(prev => ({ ...prev, published: false }));
        
        toast({
          title: 'Unpublished',
          description: 'Algorithm is now unpublished and hidden from users',
          duration: 3000,
        });
      } catch (error) {
        console.error("Error in handleUnpublish:", error);
        
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to unpublish algorithm',
          duration: 5000,
        });
      }
    });
  };
  
  // Validate content before publishing
  const validateContent = () => {
    const issues = validateFormValues({
      values,
      validationRules
    });
    
    return Object.keys(issues).length === 0 ? true : issues;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/admin/algorithms')}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSubmit}
            disabled={isPending || !isDirty}
            className="min-w-[100px]"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save
              </>
            )}
          </Button>
          
          <PublishButton
            isPublished={values.published}
            onPublish={handlePublish}
            onUnpublish={handleUnpublish}
            validateContent={validateContent}
            disabled={isPending}
            onTabChange={() => {}}
            getTabLabel={() => ''}
          />
        </div>
      </div>
      
      <ContentCompleteness percentage={completionPercentage} />
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Section */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={values.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Algorithm name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={values.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  placeholder="algorithm-slug"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={values.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Brief description of the algorithm"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="use_cases">Use Cases</Label>
                <TagInput
                  tags={values.use_cases}
                  onTagsChange={(newTags) => handleChange('use_cases', newTags)}
                  placeholder="Add use case..."
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Content Section */}
        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="main_content">Main Content</Label>
              <Textarea
                id="main_content"
                value={values.main_content}
                onChange={(e) => handleChange('main_content', e.target.value)}
                placeholder="Detailed content about the algorithm"
                rows={15}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Steps Section */}
        <Card>
          <CardHeader>
            <CardTitle>Implementation Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="steps">Steps</Label>
              <p className="text-sm text-muted-foreground">
                Use the format: &lt;step title="Step Title"&gt;Step content in markdown&lt;/step&gt;
              </p>
              <Textarea
                id="steps"
                value={values.steps}
                onChange={(e) => handleChange('steps', e.target.value)}
                placeholder='<step title="Step 1">First step content...</step>'
                rows={10}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* References Section */}
        <Card>
          <CardHeader>
            <CardTitle>Academic References</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="academic_references">References</Label>
              <p className="text-sm text-muted-foreground">
                Use the format: [^1]: Reference text. Use [^1] in main content to cite.
              </p>
              <Textarea
                id="academic_references"
                value={values.academic_references}
                onChange={(e) => handleChange('academic_references', e.target.value)}
                placeholder="[^1]: Author, Title, Journal (Year)"
                rows={8}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Relationships Section */}
        <Card>
          <CardHeader>
            <CardTitle>Relationships</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RelationshipSelector
              items={caseStudies}
              selectedItems={values.related_case_studies}
              onChange={(selectedItems) => handleChange('related_case_studies', selectedItems)}
              itemLabelKey="title"
              itemValueKey="id"
              label="Related Case Studies"
              placeholder="Select case studies..."
              required={true}
            />
            
            <RelationshipSelector
              items={industries}
              selectedItems={values.related_industries}
              onChange={(selectedItems) => handleChange('related_industries', selectedItems)}
              itemLabelKey="name"
              itemValueKey="id"
              label="Related Industries"
              placeholder="Select industries..."
            />

            <RelationshipSelector
              items={personas}
              selectedItems={values.related_personas}
              onChange={(selectedItems) => handleChange('related_personas', selectedItems)}
              itemLabelKey="name"
              itemValueKey="id"
              label="Related Personas"
              placeholder="Select personas..."
            />
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

export default AlgorithmForm;