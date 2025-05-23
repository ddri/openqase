'use client';

import React, { useState, useTransition, useEffect } from 'react';
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
import { ResourceLinksEditor } from '@/components/admin/ResourceLinksEditor';
import { createContentValidationRules, calculateCompletionPercentage, validateFormValues } from '@/utils/form-validation';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { saveCaseStudy, publishCaseStudy, unpublishCaseStudy } from './actions';

// Define IDs for "Not Applicable" records
const NOT_APPLICABLE_ALGORITHM_ID = '5bb7190e-d0df-46cc-a459-2eea19856fb1';
const NOT_APPLICABLE_INDUSTRY_ID = '4cd2a6a0-6dc1-49ba-893c-f24eebaf384a';
const NOT_APPLICABLE_PERSONA_ID = 'd1c1c7e7-2847-4bf3-b165-3bd84a99f3a6';

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
    partner_companies: isNew ? [] : caseStudy?.partner_companies || [],
    quantum_companies: isNew ? [] : caseStudy?.quantum_companies || [],
    quantum_hardware: isNew ? [] : caseStudy?.quantum_hardware || [],
    quantum_software: isNew ? [] : caseStudy?.quantum_software || [],
    algorithms: isNew ? [] : (caseStudy?.algorithms || []),
    industries: isNew ? [] : (caseStudy?.industries || []),
    personas: isNew ? [] : (caseStudy?.personas || []),
    published: isNew ? false : caseStudy?.published || false,
    academic_references: isNew ? '' : caseStudy?.academic_references || '',
    resource_links: isNew ? [] : caseStudy?.resource_links || [],
  });
  const [isDirty, setIsDirty] = useState(false);
  
  const [notApplicableStates, setNotApplicableStates] = useState({
    algorithms: false,
    industries: false,
    personas: false
  });

  // Effect to initialize notApplicableStates based on loaded caseStudy data
  useEffect(() => {
    if (caseStudy && !isNew) {
      setNotApplicableStates({
        algorithms: (caseStudy.algorithms || []).includes(NOT_APPLICABLE_ALGORITHM_ID),
        industries: (caseStudy.industries || []).includes(NOT_APPLICABLE_INDUSTRY_ID),
        personas: (caseStudy.personas || []).includes(NOT_APPLICABLE_PERSONA_ID),
      });
    }
  }, [caseStudy, isNew]);
  
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
  
  // Handle not applicable change
  const handleNotApplicableChange = (field: 'algorithms' | 'industries' | 'personas', isNotApplicable: boolean) => {
    setNotApplicableStates(prev => ({
      ...prev,
      [field]: isNotApplicable
    }));

    let newSelectedItems: string[] = [];
    if (isNotApplicable) {
      if (field === 'algorithms') newSelectedItems = [NOT_APPLICABLE_ALGORITHM_ID];
      else if (field === 'industries') newSelectedItems = [NOT_APPLICABLE_INDUSTRY_ID];
      else if (field === 'personas') newSelectedItems = [NOT_APPLICABLE_PERSONA_ID];
    }
    // When unchecking N/A, values[field] is already an array of selected items,
    // so we just need to ensure the N/A ID is not in it if it was previously.
    // However, RelationshipSelector's onChange should provide the correct list without N/A ID.
    // For now, if unchecking, we set to empty, relying on user to re-select or RelationshipSelector to repopulate.
    // A more robust solution might involve RelationshipSelector handling the N/A ID itself.
    
    // If unchecking, we reset to the current selections, excluding the N/A ID if present.
    // If checking, we set to only the N/A ID.
    setValues(prev => {
      let currentSelection = prev[field] || [];
      if (isNotApplicable) {
        // If N/A is checked, set the value to be only the N/A ID for that field
        if (field === 'algorithms') return { ...prev, algorithms: [NOT_APPLICABLE_ALGORITHM_ID] };
        if (field === 'industries') return { ...prev, industries: [NOT_APPLICABLE_INDUSTRY_ID] };
        if (field === 'personas') return { ...prev, personas: [NOT_APPLICABLE_PERSONA_ID] };
      } else {
        // If N/A is unchecked, remove the N/A ID from the selection if it exists.
        // The RelationshipSelector should ideally handle providing the list of actual selections.
        // For now, we filter out the N/A ID.
        let idToRemove = '';
        if (field === 'algorithms') idToRemove = NOT_APPLICABLE_ALGORITHM_ID;
        else if (field === 'industries') idToRemove = NOT_APPLICABLE_INDUSTRY_ID;
        else if (field === 'personas') idToRemove = NOT_APPLICABLE_PERSONA_ID;
        
        const updatedSelection = Array.isArray(currentSelection) 
                               ? currentSelection.filter(id => id !== idToRemove) 
                               : [];
        return { ...prev, [field]: updatedSelection };
      }
      return prev; // Should not happen
    });
    setIsDirty(true);
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Submitting case study with resource links:', values.resource_links);
    
    startTransition(async () => {
      try {
        // Include notApplicableStates in the data sent to the server
        const result = await saveCaseStudy({
          ...values,
          notApplicableStates
        });
        
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
    // Create custom validators for fields that can be marked as N/A
    const industriesValidator = (value: any): boolean => 
      (Array.isArray(value) && value.length > 0) || notApplicableStates.industries;
    
    const algorithmsValidator = (value: any): boolean => 
      (Array.isArray(value) && value.length > 0) || notApplicableStates.algorithms;
    
    // Find the rules for these fields
    const modifiedRules = validationRules.map(rule => {
      if (rule.field === 'industries') {
        return { ...rule, validator: industriesValidator };
      }
      if (rule.field === 'algorithms') {
        return { ...rule, validator: algorithmsValidator };
      }
      return rule;
    });
    
    const issues = validateFormValues({
      values,
      validationRules: modifiedRules
    });
    
    return Object.keys(issues).length === 0 ? true : issues;
  };
  
  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-24">
      {/* Add better spacing from the top navigation */}
      <div className="pt-6 mb-8 bg-background pb-4 border-b border-border">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/admin/case-studies')}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Case Studies
          </Button>
          
          <div className="flex items-center gap-3">
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
        
        {/* Progress bar section */}
        <div>
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="text-muted-foreground">Content Completeness</span>
            <span className="font-medium">{completionPercentage}%</span>
          </div>
          <ContentCompleteness percentage={completionPercentage} showLabel={false} />
        </div>
      </div>
      
      {/* No need for spacing div anymore */}
      
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
                  placeholder="Enter a brief description (for SEO and previews)"
                  className="min-h-[100px]"
                />
                {/* Validation message for description can be added here if needed */}
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
        
        {/* Resource Links Section */}
        <Card className="shadow-sm">
          <CardHeader className="p-6">
            <CardTitle>Resource Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6 pt-0">
            <div className="space-y-3">
              <Label>External Resources</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Add links to external resources related to this case study, such as press releases, company websites, or project pages.
              </p>
              <ResourceLinksEditor
                links={values.resource_links}
                onChange={(newLinks) => handleChange('resource_links', newLinks)}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Academic References Section */}
        <Card className="shadow-sm">
          <CardHeader className="p-6">
            <CardTitle>Academic References</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6 pt-0">
            <div className="space-y-3">
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
              itemValueKey="id"
              label="Industries"
              placeholder="Select industries..."
              required={true}
              notApplicable={notApplicableStates.industries}
              onNotApplicableChange={(isNA) => handleNotApplicableChange('industries', isNA)}
            />
            
            <RelationshipSelector
              items={algorithms}
              selectedItems={values.algorithms}
              onChange={(selectedItems) => handleChange('algorithms', selectedItems)}
              itemLabelKey="name"
              itemValueKey="id"
              label="Algorithms"
              placeholder="Select algorithms..."
              required={true}
              notApplicable={notApplicableStates.algorithms}
              onNotApplicableChange={(isNA) => handleNotApplicableChange('algorithms', isNA)}
            />
            
            <RelationshipSelector
              items={personas}
              selectedItems={values.personas}
              onChange={(selectedItems) => handleChange('personas', selectedItems)}
              itemLabelKey="name"
              itemValueKey="id"
              label="Personas"
              placeholder="Select personas..."
              notApplicable={notApplicableStates.personas}
              onNotApplicableChange={(isNA) => handleNotApplicableChange('personas', isNA)}
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
            
            <div className="space-y-3">
              <Label htmlFor="quantum_software">Quantum Software</Label>
              <TagInput
                tags={values.quantum_software}
                onTagsChange={(newTags) => handleChange('quantum_software', newTags)}
                placeholder="Add quantum software..."
              />
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

export default CaseStudyForm;
