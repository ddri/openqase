'use client';

import React from 'react';
import { BaseContentForm } from '@/components/admin/BaseContentForm';
import { RelationshipSelector } from '@/components/admin/RelationshipSelector';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createContentValidationRules } from '@/utils/form-validation';
import { saveContentItem, updatePublishedStatus } from '@/utils/content-management';

interface AlgorithmFormProps {
  algorithm: any | null;
  caseStudies: any[];
  isNew: boolean;
}

/**
 * AlgorithmForm Component
 * 
 * An implementation of the BaseContentForm for algorithms.
 * 
 * @param algorithm - Initial algorithm data
 * @param caseStudies - Available case studies for relationships
 * @param isNew - Whether this is a new algorithm
 */
export function AlgorithmForm({ algorithm, caseStudies, isNew }: AlgorithmFormProps) {
  // Initial values for the form
  const initialValues = {
    id: isNew ? undefined : algorithm?.id,
    name: isNew ? '' : algorithm?.name || '',
    slug: isNew ? '' : algorithm?.slug || '',
    description: isNew ? '' : algorithm?.description || '',
    main_content: isNew ? '' : algorithm?.main_content || '',
    quantum_advantage: isNew ? '' : algorithm?.quantum_advantage || '',
    use_cases: isNew ? [] : algorithm?.use_cases || [],
    related_case_studies: isNew ? [] : algorithm?.related_case_studies?.map((cs: any) => cs.id) || [],
    published: isNew ? false : algorithm?.published || false,
  };
  
  // Validation rules for algorithms
  const validationRules = createContentValidationRules('algorithm');
  
  // Tab configuration
  const tabs = [
    { value: 'basic', label: 'Basic Info' },
    { value: 'content', label: 'Content' },
    { value: 'technical', label: 'Technical Details' },
    { value: 'relationships', label: 'Relationships' },
  ];
  
  // Save function
  const handleSave = async (values: any) => {
    const { data, error } = await saveContentItem({
      contentType: 'algorithms',
      data: {
        name: values.name,
        slug: values.slug,
        description: values.description,
        main_content: values.main_content,
        quantum_advantage: values.quantum_advantage,
        use_cases: values.use_cases,
        published: values.published,
      },
      id: values.id,
      relationships: [
        {
          relationshipConfig: {
            junctionTable: 'algorithm_case_study_relations',
            contentIdField: 'algorithm_id',
            relatedIdField: 'case_study_id',
            relatedTable: 'case_studies'
          },
          relatedIds: values.related_case_studies
        }
      ]
    });
    
    if (error) {
      throw error;
    }
    
    return {
      ...values,
      id: data?.id || values.id,
    };
  };
  
  // Publish function
  const handlePublish = async (values: any) => {
    const { data, error } = await updatePublishedStatus({
      contentType: 'algorithms',
      id: values.id,
      published: true
    });
    
    if (error) {
      throw error;
    }
    
    return {
      ...values,
      published: true,
    };
  };
  
  // Unpublish function
  const handleUnpublish = async (values: any) => {
    const { data, error } = await updatePublishedStatus({
      contentType: 'algorithms',
      id: values.id,
      published: false
    });
    
    if (error) {
      throw error;
    }
    
    return {
      ...values,
      published: false,
    };
  };
  
  // Render tab content
  const renderTabContent = (tabValue: string, values: any, onChange: (field: string, value: any) => void) => {
    switch (tabValue) {
      case 'basic':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={values.name}
                  onChange={(e) => onChange('name', e.target.value)}
                  placeholder="Algorithm name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={values.slug}
                  onChange={(e) => onChange('slug', e.target.value)}
                  placeholder="algorithm-slug"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={values.description}
                  onChange={(e) => onChange('description', e.target.value)}
                  placeholder="Brief description of the algorithm"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );
        
      case 'content':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="main_content">Main Content</Label>
              <Textarea
                id="main_content"
                value={values.main_content}
                onChange={(e) => onChange('main_content', e.target.value)}
                placeholder="Detailed content about the algorithm"
                rows={15}
              />
            </div>
          </div>
        );
        
      case 'technical':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="quantum_advantage">Quantum Advantage</Label>
              <Textarea
                id="quantum_advantage"
                value={values.quantum_advantage}
                onChange={(e) => onChange('quantum_advantage', e.target.value)}
                placeholder="Describe the quantum advantage of this algorithm"
                rows={5}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="use_cases">Use Cases</Label>
              <Input
                id="use_cases"
                value={values.use_cases.join(', ')}
                onChange={(e) => {
                  const useCases = e.target.value
                    .split(',')
                    .map(item => item.trim())
                    .filter(Boolean);
                  onChange('use_cases', useCases);
                }}
                placeholder="Finance, Healthcare, etc."
              />
            </div>
          </div>
        );
        
      case 'relationships':
        return (
          <div className="space-y-4">
            <RelationshipSelector
              items={caseStudies}
              selectedItems={values.related_case_studies}
              onChange={(selectedItems) => onChange('related_case_studies', selectedItems)}
              itemLabelKey="title"
              itemValueKey="id"
              label="Related Case Studies"
              placeholder="Select case studies..."
              required={true}
            />
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <BaseContentForm
      initialValues={initialValues}
      onSave={handleSave}
      onPublish={handlePublish}
      onUnpublish={handleUnpublish}
      validationRules={validationRules}
      tabs={tabs}
      renderTabContent={renderTabContent}
      backUrl="/admin/algorithms"
      isNew={isNew}
      contentType="Algorithm"
    />
  );
}

export default AlgorithmForm;