'use client';

import React from 'react';
import { BaseContentForm } from '@/components/admin/BaseContentForm';
import { RelationshipSelector } from '@/components/admin/RelationshipSelector';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createContentValidationRules } from '@/utils/form-validation';
import { useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { Database } from '@/types/supabase';
import { saveCaseStudy, publishCaseStudy, unpublishCaseStudy } from './actions';

interface CaseStudyFormProps {
  caseStudy: any | null;
  algorithms: any[];
  industries: any[];
  personas: any[];
  isNew: boolean;
}

interface SaveCaseStudyResult {
  id: string;
  title: string;
  slug: string;
  description: string;
  main_content: string;
  url: string;
  partner_companies: string[];
  quantum_companies: string[];
  quantum_hardware: string[];
  algorithms: string[];
  industries: string[];
  personas: string[];
  published: boolean;
}

type FieldName = "title" | "slug" | "description" | "url" | "partner_companies" | "quantum_companies" | "quantum_hardware" | "algorithms" | "industries" | "personas" | "published" | "main_content";

/**
 * CaseStudyForm Component
 * 
 * An implementation of the BaseContentForm for case studies.
 * 
 * @param caseStudy - Initial case study data
 * @param algorithms - Available algorithms for relationships
 * @param industries - Available industries for relationships
 * @param personas - Available personas for relationships
 * @param isNew - Whether this is a new case study
 */
export function CaseStudyForm({ caseStudy, algorithms, industries, personas, isNew }: CaseStudyFormProps) {
  const [isPending, startTransition] = useTransition();

  // Initial values for the form
  const initialValues = {
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
  };
  
  // Validation rules for case studies
  const validationRules = createContentValidationRules('case_study');
  
  // Tab configuration
  const tabs = [
    { value: 'basic', label: 'Basic Info' },
    { value: 'content', label: 'Content' },
    { value: 'classifications', label: 'Classifications' },
    { value: 'technical', label: 'Technical Details' },
  ];
  
  // Server Actions are imported from ./actions.ts

  // Update handleSave to use the Server Action
  const handleSave = async (values: typeof initialValues) => {
    startTransition(() => {
      saveCaseStudy(values)
         .catch((error) => {
          console.error("Error in handleSave:", error);
          // Handle error appropriately (e.g., display an error message)
        });
    });
  };
  
  // Update handlePublish to use the Server Action
  const handlePublish = async (values: typeof initialValues) => {
    startTransition(() => {
      publishCaseStudy(values.id)
        .catch((error) => {
          console.error("Error in handlePublish:", error);
          // Handle error appropriately (e.g., display an error message)
        });
    });
  };
  
  // Update handleUnpublish to use the Server Action
  const handleUnpublish = async (values: typeof initialValues) => {
    startTransition(() => {
      unpublishCaseStudy(values.id)
        .catch((error) => {
          console.error("Error in handleUnpublish:", error);
          // Handle error appropriately (e.g., display an error message)
        });
    });
  };
  
  // Render tab content
  const renderTabContent = (tabValue: string, values: typeof initialValues, onChange: (field: FieldName, value: any) => void) => {
    const handleChange = (field: FieldName, value: any) => {
        onChange(field, value);
    };

    switch (tabValue) {
      case 'basic':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={values.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Case study title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={values.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  placeholder="case-study-slug"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={values.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Brief description of the case study"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={values.url}
                  onChange={(e) => handleChange('url', e.target.value)}
                  placeholder="https://example.com/case-study"
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
                onChange={(e) => handleChange('main_content', e.target.value)}
                placeholder="Detailed content about the case study"
                rows={15}
              />
            </div>
          </div>
        );
        
      case 'classifications':
        return (
          <div className="space-y-6">
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
          </div>
        );
        
      case 'technical':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="partner_companies">Partner Companies</Label>
              <Input
                id="partner_companies"
                value={values.partner_companies.join(', ')}
                onChange={(e) => {
                  const companies = e.target.value
                    .split(',')
                    .map(item => item.trim())
                    .filter(Boolean);
                   handleChange('partner_companies', companies);
                }}
                placeholder="Company A, Company B, etc."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quantum_companies">Quantum Companies</Label>
              <Input
                id="quantum_companies"
                value={values.quantum_companies.join(', ')}
                onChange={(e) => {
                  const companies = e.target.value
                    .split(',')
                    .map(item => item.trim())
                    .filter(Boolean);
                  handleChange('quantum_companies', companies);
                }}
                placeholder="Quantum Company A, Quantum Company B, etc."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quantum_hardware">Quantum Hardware</Label>
              <Input
                id="quantum_hardware"
                value={values.quantum_hardware.join(', ')}
                onChange={(e) => {
                  const hardware = e.target.value
                    .split(',')
                    .map(item => item.trim())
                    .filter(Boolean);
                  handleChange('quantum_hardware', hardware);
                }}
                placeholder="Hardware A, Hardware B, etc."
              />
            </div>
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
      backUrl="/admin/case-studies"
      isNew={isNew}
      contentType="Case Study"
    />
  );
}

export default CaseStudyForm;
