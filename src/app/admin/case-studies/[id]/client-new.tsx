'use client';

import React, { useState, useTransition } from 'react';
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
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { saveCaseStudy, publishCaseStudy, unpublishCaseStudy } from './actions';

interface CaseStudyFormProps {
  caseStudy: any | null;
  algorithms: any[];
  industries: any[];
  personas: any[];
  isNew: boolean;
}

/**
 * CaseStudyForm Component
 *
 * A simplified form for case studies with all fields on a single page.
 *
 * @param caseStudy - Initial case study data
 * @param algorithms - Available algorithms for relationships
 * @param industries - Available industries for relationships
 * @param personas - Available personas for relationships
 * @param isNew - Whether this is a new case study
 */
export function CaseStudyForm({ caseStudy, algorithms, industries, personas, isNew }: CaseStudyFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState({
    id: isNew ? undefined : caseStudy?.id,
    title: isNew ? '' : caseStudy?.title || '',
    slug: isNew ? '' : caseStudy?.slug || '',
    description: isNew ? '' : caseStudy?.description || '',
    main_content: isNew ? '' : caseStudy?.main_content || '',
    url: isNew ? '' : caseStudy?.url || '',
    partner_companies: isNew ? [] : caseStudy?.partner_companies || [],
    quantum_companies: isNew ? [] : caseStudy?.quantum_companies || [],
    quantum_hardware: isNew ? [] : caseStudy?.quantum_hardware || [],
    algorithms: isNew ? [] : caseStudy?.algorithms || [],
    industries: isNew ? [] : caseStudy?.industries || [],
    personas: isNew ? [] : caseStudy?.personas || [],
    published: isNew ? false : caseStudy?.published || false,
  });
  const [isDirty, setIsDirty] = useState(false);
  
  // Validation rules for case studies
  const validationRules = createContentValidationRules('case_study');
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
        const result = await saveCaseStudy(values);
        
        // If this was a new case study and we got an ID back, redirect to edit page
        if (isNew && result?.id) {
          router.push(`/admin/case-studies/${result.id}`);
        }
        
        setIsDirty(false);
        
        toast({
          title: 'Saved',
          description: 'Case study saved successfully',
          duration: 3000,
        });
      } catch (error) {
        console.error("Error in handleSave:", error);
        
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to save case study',
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
        description: 'Cannot publish case study without saving first',
        duration: 3000,
      });
      return;
    }
    
    startTransition(async () => {
      try {
        // First save the content
        await saveCaseStudy(values);
        
        // Then publish it
        await publishCaseStudy(values.id!);
        
        setValues(prev => ({ ...prev, published: true }));
        
        toast({
          title: 'Published',
          description: 'Case study is now published and visible to users',
          duration: 3000,
        });
      } catch (error) {
        console.error("Error in handlePublish:", error);
        
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to publish case study',
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
        await unpublishCaseStudy(values.id!);
        
        setValues(prev => ({ ...prev, published: false }));
        
        toast({
          title: 'Unpublished',
          description: 'Case study is now unpublished and hidden from users',
          duration: 3000,
        });
      } catch (error) {
        console.error("Error in handleUnpublish:", error);
        
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to unpublish case study',
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
    <div className="space-y-10 max-w-5xl mx-auto pb-24">
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/admin/case-studies')}
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
      
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Basic Info Section */}
        <Card className="shadow-sm">
          <CardHeader className="p-6">
            <CardTitle>Basic Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6 pt-0">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-3">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={values.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Case study title"
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={values.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  placeholder="case-study-slug"
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={values.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Brief description of the case study"
                  rows={3}
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={values.url}
                  onChange={(e) => handleChange('url', e.target.value)}
                  placeholder="https://example.com/case-study"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Content Section */}
        <Card className="shadow-sm">
          <CardHeader className="p-6">
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6 pt-0">
            <div className="space-y-3">
              <Label htmlFor="main_content">Main Content</Label>
              <Textarea
                id="main_content"
                value={values.main_content}
                onChange={(e) => handleChange('main_content', e.target.value)}
                placeholder="Detailed content about the case study"
                rows={15}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Classifications Section */}
        <Card className="shadow-sm">
          <CardHeader className="p-6">
            <CardTitle>Classifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 p-6 pt-0">
            <RelationshipSelector
              items={industries}
              selectedItems={values.industries}
              onChange={(selectedItems) => handleChange('industries', selectedItems)}
              itemLabelKey="name"
              itemValueKey="slug"
              label="Industries"
              placeholder="Select industries..."
              required={true}
            />
            
            <RelationshipSelector
              items={algorithms}
              selectedItems={values.algorithms}
              onChange={(selectedItems) => handleChange('algorithms', selectedItems)}
              itemLabelKey="name"
              itemValueKey="slug"
              label="Algorithms"
              placeholder="Select algorithms..."
              required={true}
            />
            
            <RelationshipSelector
              items={personas}
              selectedItems={values.personas}
              onChange={(selectedItems) => handleChange('personas', selectedItems)}
              itemLabelKey="name"
              itemValueKey="slug"
              label="Personas"
              placeholder="Select personas..."
            />
          </CardContent>
        </Card>
        
        {/* Technical Details Section */}
        <Card className="shadow-sm">
          <CardHeader className="p-6">
            <CardTitle>Technical Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 p-6 pt-0">
            <div className="space-y-3">
              <Label htmlFor="partner_companies">Partner Companies</Label>
              <TagInput
                tags={values.partner_companies}
                onTagsChange={(newTags) => handleChange('partner_companies', newTags)}
                placeholder="Add partner company..."
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="quantum_companies">Quantum Companies</Label>
              <TagInput
                tags={values.quantum_companies}
                onTagsChange={(newTags) => handleChange('quantum_companies', newTags)}
                placeholder="Add quantum company..."
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="quantum_hardware">Quantum Hardware</Label>
              <TagInput
                tags={values.quantum_hardware}
                onTagsChange={(newTags) => handleChange('quantum_hardware', newTags)}
                placeholder="Add quantum hardware..."
              />
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

export default CaseStudyForm;