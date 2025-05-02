'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RelationshipSelector } from '@/components/admin/RelationshipSelector';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ContentCompleteness } from '@/components/admin/ContentCompleteness';
import { PublishButton } from '@/components/admin/PublishButton';
import { createContentValidationRules, calculateCompletionPercentage, validateFormValues } from '@/utils/form-validation';
import { useTransition } from 'react';
import { ArrowLeft, Save, Loader2, Info } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { savePersona, publishPersona, unpublishPersona } from './actions';

// Helper to convert expertise array to string for input
const expertiseToString = (arr: string[] | undefined | null): string => 
  Array.isArray(arr) ? arr.join(', ') : '';

// Helper to convert expertise string from input to array for saving
const expertiseStringToArray = (str: string): string[] => 
  str.split(',').map(item => item.trim()).filter(Boolean);

interface PersonaFormProps {
  persona: any | null;
  industries: any[];
  isNew: boolean;
}

/**
 * PersonaForm Component
 *
 * A simplified form for personas with all fields on a single page.
 *
 * @param persona - Initial persona data
 * @param industries - Available industries for relationships
 * @param isNew - Whether this is a new persona
 */
export function PersonaForm({ persona, industries, isNew }: PersonaFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState({
    id: isNew ? undefined : persona?.id,
    name: isNew ? '' : persona?.name || '',
    slug: isNew ? '' : persona?.slug || '',
    description: isNew ? '' : persona?.description || '',
    expertise: isNew ? [] : persona?.expertise || [],
    main_content: isNew ? '' : persona?.main_content || '',
    recommended_reading: isNew ? '' : persona?.recommended_reading || '',
    industry: isNew ? [] : (persona?.id ? [] : []),
    published: isNew ? false : persona?.published || false,
  });
  const [isDirty, setIsDirty] = useState(false);
  // Separate state for the raw expertise input string
  const [expertiseInputString, setExpertiseInputString] = useState<string>(
    () => expertiseToString(persona?.expertise) // Initialize from persona data
  );
  
  // Validation rules for personas
  const validationRules = createContentValidationRules('persona');
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
    
    // Parse expertise string before saving
    const expertiseArray = expertiseStringToArray(expertiseInputString);
    const valuesToSave = {
      ...values,
      // Ensure the expertise field being saved is the parsed array
      // Note: We don't need to update values.expertise state here,
      // only the object being passed to the server action.
      expertise: expertiseArray 
    };
    
    startTransition(async () => {
      try {
        const result = await savePersona(valuesToSave); // Use valuesToSave
        
        // If this was a new persona and we got an ID back, redirect to edit page
        if (isNew && result?.id) {
          router.push(`/admin/personas/${result.id}`);
        }
        
        setIsDirty(false);
        
        toast({
          title: 'Saved',
          description: 'Persona saved successfully',
          duration: 3000,
        });
      } catch (error) {
        console.error("Error in handleSave:", error);
        
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to save persona',
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
        description: 'Cannot publish persona without saving first',
        duration: 3000,
      });
      return;
    }
    
    // Parse expertise string before saving and publishing
    const expertiseArray = expertiseStringToArray(expertiseInputString);
    const valuesToSave = {
      ...values,
      expertise: expertiseArray
    };
    
    startTransition(async () => {
      try {
        // First save the content
        await savePersona(valuesToSave); // Use valuesToSave
        
        // Then publish it
        await publishPersona(values.id!);
        
        setValues(prev => ({ ...prev, published: true }));
        
        toast({
          title: 'Published',
          description: 'Persona is now published and visible to users',
          duration: 3000,
        });
      } catch (error) {
        console.error("Error in handlePublish:", error);
        
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to publish persona',
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
        await unpublishPersona(values.id!);
        
        setValues(prev => ({ ...prev, published: false }));
        
        toast({
          title: 'Unpublished',
          description: 'Persona is now unpublished and hidden from users',
          duration: 3000,
        });
      } catch (error) {
        console.error("Error in handleUnpublish:", error);
        
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to unpublish persona',
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
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/admin/personas')}
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
                    placeholder="Persona name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={values.slug}
                    onChange={(e) => handleChange('slug', e.target.value)}
                    placeholder="persona-slug"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={values.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Short description of the persona"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expertise">Expertise (comma-separated)</Label>
                  <Input
                    id="expertise"
                    // Bind directly to the local string state
                    value={expertiseInputString}
                    onChange={(e) => {
                      // Update the local string state directly
                      setExpertiseInputString(e.target.value);
                      setIsDirty(true); // Mark form as dirty
                    }}
                    placeholder="e.g., Risk Modeling, Derivative Pricing"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Details Section */}
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="main_content">Main Content</Label>
                <Textarea
                  id="main_content"
                  value={values.main_content}
                  onChange={(e) => handleChange('main_content', e.target.value)}
                  placeholder="Detailed persona information in Markdown..."
                  rows={15}
                  className="font-mono text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="recommended_reading">Recommended Reading</Label>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Use standard Markdown format.<br />Example link: `[Google](https://google.com)`</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Textarea
                  id="recommended_reading"
                  value={values.recommended_reading}
                  onChange={(e) => handleChange('recommended_reading', e.target.value)}
                  placeholder="Enter recommended reading content using standard Markdown (e.g., includes links like [Link Text](https://example.com))..."
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Interests & Industries Section */}
          <Card>
            <CardHeader>
              <CardTitle>Interests & Industries</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RelationshipSelector
                items={industries}
                selectedItems={values.industry}
                onChange={(selectedItems) => handleChange('industry', selectedItems)}
                itemLabelKey="name"
                itemValueKey="id"
                label="Industries"
                placeholder="Select industries..."
                required={true}
              />
            </CardContent>
          </Card>
        </form>
      </div>
    </TooltipProvider>
  );
}

export default PersonaForm;