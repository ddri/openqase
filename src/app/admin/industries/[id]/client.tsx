'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { saveIndustry, publishIndustry, unpublishIndustry } from './actions';

interface IndustryFormProps {
  industry: any | null;
  isNew: boolean;
}

/**
 * IndustryForm Component
 *
 * A simplified form for industries with all fields on a single page.
 *
 * @param industry - Initial industry data
 * @param isNew - Whether this is a new industry
 */
export function IndustryForm({ industry, isNew }: IndustryFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState({
    id: isNew ? undefined : industry?.id,
    name: isNew ? '' : industry?.name || '',
    slug: isNew ? '' : industry?.slug || '',
    description: isNew ? '' : industry?.description || '',
    main_content: isNew ? '' : industry?.main_content || '',
    icon: isNew ? '' : industry?.icon || '',
    sector: isNew ? [] : industry?.sector || [],
    published: isNew ? false : industry?.published || false,
  });
  const [isDirty, setIsDirty] = useState(false);
  
  // Validation rules for industries
  const validationRules = createContentValidationRules('industry');
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
        const result = await saveIndustry(values);
        
        // If this was a new industry and we got an ID back, redirect to edit page
        if (isNew && result?.id) {
          router.push(`/admin/industries/${result.id}`);
        }
        
        setIsDirty(false);
        
        toast({
          title: 'Saved',
          description: 'Industry saved successfully',
          duration: 3000,
        });
      } catch (error) {
        console.error("Error in handleSave:", error);
        
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to save industry',
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
        description: 'Cannot publish industry without saving first',
        duration: 3000,
      });
      return;
    }
    
    startTransition(async () => {
      try {
        // First save the content
        await saveIndustry(values);
        
        // Then publish it
        await publishIndustry(values.id!);
        
        setValues(prev => ({ ...prev, published: true }));
        
        toast({
          title: 'Published',
          description: 'Industry is now published and visible to users',
          duration: 3000,
        });
      } catch (error) {
        console.error("Error in handlePublish:", error);
        
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to publish industry',
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
        await unpublishIndustry(values.id!);
        
        setValues(prev => ({ ...prev, published: false }));
        
        toast({
          title: 'Unpublished',
          description: 'Industry is now unpublished and hidden from users',
          duration: 3000,
        });
      } catch (error) {
        console.error("Error in handleUnpublish:", error);
        
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to unpublish industry',
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
          onClick={() => router.push('/admin/industries')}
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
                  placeholder="Industry name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={values.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  placeholder="industry-slug"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sector">Sector</Label>
                <TagInput
                  tags={values.sector}
                  onTagsChange={(newTags) => handleChange('sector', newTags)}
                  placeholder="Add sector..."
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
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={values.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Brief description of the industry"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="main_content">Main Content</Label>
              <Textarea
                id="main_content"
                value={values.main_content}
                onChange={(e) => handleChange('main_content', e.target.value)}
                placeholder="Detailed content about the industry"
                rows={15}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Icon Section */}
        <Card>
          <CardHeader>
            <CardTitle>Icon</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <Input
                id="icon"
                value={values.icon}
                onChange={(e) => handleChange('icon', e.target.value)}
                placeholder="Icon name or URL"
              />
              {values.icon && (
                <div className="mt-4">
                  <Label>Icon Preview</Label>
                  <div className="p-4 border rounded-md mt-2 flex items-center justify-center">
                    <Image
                      src={values.icon.startsWith('http') ? values.icon : `/icons/${values.icon}`}
                      alt="Icon Preview"
                      className="h-16 w-16 object-contain"
                      width={64}
                      height={64}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder-icon.svg';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

export default IndustryForm;