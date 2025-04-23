'use client'

import { useState, useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { ArrowLeft, AlertCircle } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

// Define types for the component props and form data
interface CaseStudyFormProps {
  caseStudy: any | null
  algorithms: any[]
  industries: any[]
  personas: any[]
  isNew: boolean
}

interface CaseStudyFormData {
  id?: string
  title: string
  slug: string
  description: string
  main_content: string
  published: boolean
  url: string
  partner_companies: string[]
  quantum_companies: string[]
  quantum_hardware: string[]
  algorithms: string[]
  industries: string[]
  personas: string[]
}

export function CaseStudyForm({ caseStudy, algorithms, industries, personas, isNew }: CaseStudyFormProps) {
  // Set up state for tracking the active tab
  const [activeTab, setActiveTab] = useState('basic')
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [completionPercentage, setCompletionPercentage] = useState(0)
  const [showValidationModal, setShowValidationModal] = useState(false)
  const [validationIssues, setValidationIssues] = useState<Record<string, {name: string, label: string}[]>>({})
  const { toast } = useToast()

  // Prepare initial form values
  const initialValues: CaseStudyFormData = {
    id: isNew ? undefined : caseStudy?.id,
    title: isNew ? '' : caseStudy?.title || '',
    slug: isNew ? '' : caseStudy?.slug || '',
    description: isNew ? '' : caseStudy?.description || '',
    main_content: isNew ? '' : caseStudy?.main_content || '',
    published: isNew ? false : caseStudy?.published || false,
    url: isNew ? '' : caseStudy?.url || '',
    partner_companies: isNew ? [] : caseStudy?.partner_companies || [],
    quantum_companies: isNew ? [] : caseStudy?.quantum_companies || [],
    quantum_hardware: isNew ? [] : caseStudy?.quantum_hardware || [],
    algorithms: isNew ? [] : caseStudy?.algorithms || [],
    industries: isNew ? [] : caseStudy?.industries || [],
    personas: isNew ? [] : caseStudy?.personas || [],
  }

  // Set up state for form values
  const [values, setValues] = useState<CaseStudyFormData>(initialValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Calculate initial completion percentage
  useEffect(() => {
    setCompletionPercentage(calculateCompletionPercentage());
  }, []);
  
  // Check if a tab is complete
  const isTabComplete = (tabName: string): boolean => {
    switch (tabName) {
      case 'basic':
        return !!values.title.trim() && !!values.slug.trim();
      case 'content':
        return !!values.main_content.trim();
      case 'classifications':
        return values.industries.length > 0 && values.algorithms.length > 0;
      case 'technical':
        // Technical tab has no required fields
        return true;
      default:
        return true;
    }
  };
  
  // Calculate completion percentage
  const calculateCompletionPercentage = (): number => {
    const requiredFields = [
      { name: 'title', complete: !!values.title.trim() },
      { name: 'slug', complete: !!values.slug.trim() },
      { name: 'main_content', complete: !!values.main_content.trim() },
      { name: 'industries', complete: values.industries.length > 0 },
      { name: 'algorithms', complete: values.algorithms.length > 0 }
    ];
    
    const completedCount = requiredFields.filter(field => field.complete).length;
    return Math.round((completedCount / requiredFields.length) * 100);
  };
  
  // Validate all content and collect issues
  const validateContent = (): boolean => {
    const issues: Record<string, {name: string, label: string}[]> = {};
    
    // Basic tab validation
    const basicIssues = [];
    if (!values.title.trim()) {
      basicIssues.push({ name: 'title', label: 'Title is required' });
    }
    if (!values.slug.trim()) {
      basicIssues.push({ name: 'slug', label: 'Slug is required' });
    }
    if (basicIssues.length) {
      issues.basic = basicIssues;
    }
    
    // Content tab validation
    const contentIssues = [];
    if (!values.main_content.trim()) {
      contentIssues.push({ name: 'main_content', label: 'Main content is required' });
    }
    if (contentIssues.length) {
      issues.content = contentIssues;
    }
    
    // Classifications tab validation
    const classificationIssues = [];
    if (values.industries.length === 0) {
      classificationIssues.push({
        name: 'industries',
        label: 'At least one industry is required'
      });
    }
    if (values.algorithms.length === 0) {
      classificationIssues.push({
        name: 'algorithms',
        label: 'At least one algorithm is required'
      });
    }
    if (classificationIssues.length) {
      issues.classifications = classificationIssues;
    }
    
    // Update state with validation issues
    setValidationIssues(issues);
    
    // Return true if no issues found
    return Object.keys(issues).length === 0;
  };
  
  // Get human-readable tab name
  const getTabLabel = (tabName: string): string => {
    switch (tabName) {
      case 'basic': return 'Basic Info';
      case 'content': return 'Content';
      case 'classifications': return 'Classifications';
      case 'technical': return 'Technical Details';
      default: return tabName;
    }
  };
  
  // Custom form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Update completion percentage
    const newCompletionPercentage = calculateCompletionPercentage()
    setCompletionPercentage(newCompletionPercentage)
    
    try {
      // Format the data for submission
      const payload = new FormData()
      
      if (values.id) {
        payload.append('id', values.id)
      }
      
      payload.append('title', values.title)
      payload.append('slug', values.slug)
      payload.append('description', values.description || '')
      payload.append('main_content', values.main_content || '')
      payload.append('url', values.url || '')
      
      // Log the published state before sending
      console.log('Client-side published state:', values.published);
      payload.append('published', values.published ? 'on' : '')
      console.log('Form data published value:', payload.get('published'));
      
      // Handle array fields
      if (values.partner_companies && values.partner_companies.length > 0) {
        payload.append('partner_companies', values.partner_companies.join(', '))
      }
      
      if (values.quantum_companies && values.quantum_companies.length > 0) {
        payload.append('quantum_companies', values.quantum_companies.join(', '))
      }
      
      if (values.quantum_hardware && values.quantum_hardware.length > 0) {
        payload.append('quantum_hardware', values.quantum_hardware.join(', '))
      }
      
      // Handle relationships
      values.algorithms.forEach(slug => {
        payload.append('algorithms[]', slug)
      })
      
      values.industries.forEach(slug => {
        payload.append('industries[]', slug)
      })
      
      values.personas.forEach(slug => {
        payload.append('personas[]', slug)
      })
      
      // Validate required fields
      const validationErrors: Record<string, string> = {};
      
      if (!values.title.trim()) {
        validationErrors.title = 'Title is required';
      }
      
      if (!values.slug.trim()) {
        validationErrors.slug = 'Slug is required';
      }
      
      // Update errors state
      setErrors(validationErrors);
      
      // If there are validation errors, don't submit
      if (Object.keys(validationErrors).length > 0) {
        throw new Error('Please fill in all required fields');
      }
      
      // Submit the form data
      const response = await fetch('/api/case-studies', {
        method: 'POST',
        body: payload,
      })
      
      if (!response.ok) {
        console.error('Failed to save case study:', await response.text());
        throw new Error('Failed to save case study')
      }
      
      // Get the response data
      const data = await response.json()
      console.log('API response:', data);
      
      // If this is a new case study, update the ID to prevent creating duplicates
      if (isNew && data.id) {
        setValues(prev => ({
          ...prev,
          id: data.id
        }))
        
        // Update URL without refreshing the page
        window.history.replaceState({}, '', `/admin/case-studies/${data.id}`)
      }
      
      // Update the last saved timestamp
      setLastSaved(new Date().toLocaleTimeString())
      
      // Clear any errors
      setErrors({})
      
      // Show success message
      toast({
        title: 'Success',
        description: isNew ? 'Case study created successfully' : 'Case study updated successfully',
        duration: 3000,
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save case study',
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValues(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle tab change with auto-save
  const handleTabChange = async (value: string) => {
    // Only save if there are changes and required fields are filled
    if (values.title && values.slug) {
      setIsSaving(true)
      try {
        // Create a synthetic event for the form submission
        const event = new Event('submit') as any
        event.preventDefault = () => {}
        
        await handleSubmit(event)
        setActiveTab(value)
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to save before changing tabs',
        })
      } finally {
        setIsSaving(false)
      }
    } else {
      // If required fields aren't filled, just change tabs without saving
      setActiveTab(value)
    }
  }

  // Handle comma-separated list inputs
  const handleArrayInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof CaseStudyFormData) => {
    const { value } = e.target
    setValues(prev => ({
      ...prev,
      [field]: value.split(',').map(item => item.trim()).filter(Boolean)
    }))
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" asChild>
          <Link href="/admin/case-studies">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Case Studies
          </Link>
        </Button>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">
          {isNew ? 'Add New Case Study' : 'Edit Case Study'}
        </h1>
        
        <div className="flex items-center space-x-4">
          {lastSaved && (
            <div className="text-sm text-muted-foreground">
              Last saved: {lastSaved}
            </div>
          )}
          
          <div className="flex items-center">
            <Button
              type="button"
              variant={values.published ? "default" : "outline"}
              size="sm"
              onClick={async () => {
                // If trying to publish, validate content
                if (!values.published) {
                  const isValid = validateContent();
                  if (!isValid) {
                    setShowValidationModal(true);
                    return;
                  }
                  
                  console.log('Before publishing - current state:', { ...values });
                  
                  // If valid, publish
                  setValues(prev => {
                    console.log('Setting published=true, prev state:', prev);
                    return {
                      ...prev,
                      published: true
                    };
                  });
                  
                  // Need to wait for state update to complete
                  setTimeout(async () => {
                    // Log state after setting published to true
                    console.log('After setting published=true, current values:', { ...values });
                    
                    // Save the form with the published state
                    const event = new Event('submit') as any;
                    event.preventDefault = () => {};
                    
                    // Create a payload manually to ensure published is set
                    const payload = new FormData();
                    if (values.id) {
                      payload.append('id', values.id);
                    }
                    payload.append('title', values.title);
                    payload.append('slug', values.slug);
                    payload.append('description', values.description || '');
                    payload.append('main_content', values.main_content || '');
                    payload.append('url', values.url || '');
                    payload.append('published', 'on'); // Force published to be true
                    
                    // Handle array fields
                    if (values.partner_companies && values.partner_companies.length > 0) {
                      payload.append('partner_companies', values.partner_companies.join(', '));
                    }
                    
                    if (values.quantum_companies && values.quantum_companies.length > 0) {
                      payload.append('quantum_companies', values.quantum_companies.join(', '));
                    }
                    
                    if (values.quantum_hardware && values.quantum_hardware.length > 0) {
                      payload.append('quantum_hardware', values.quantum_hardware.join(', '));
                    }
                    
                    // Handle relationships
                    values.algorithms.forEach(slug => {
                      payload.append('algorithms[]', slug);
                    });
                    
                    values.industries.forEach(slug => {
                      payload.append('industries[]', slug);
                    });
                    
                    values.personas.forEach(slug => {
                      payload.append('personas[]', slug);
                    });
                    
                    console.log('Manual payload published value:', payload.get('published'));
                    
                    // Submit the form data
                    const response = await fetch('/api/case-studies', {
                      method: 'POST',
                      body: payload,
                    });
                    
                    if (!response.ok) {
                      console.error('Failed to save case study:', await response.text());
                      toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: 'Failed to publish case study',
                        duration: 5000,
                      });
                    } else {
                      const data = await response.json();
                      console.log('API response after manual publish:', data);
                      
                      // Update the last saved timestamp
                      setLastSaved(new Date().toLocaleTimeString());
                      
                      toast({
                        title: 'Published',
                        description: 'Content is now published and visible to users',
                        duration: 3000,
                      });
                    }
                  }, 100);
                  
                  toast({
                    title: 'Published',
                    description: 'Content is now published and visible to users',
                    duration: 3000,
                  });
                } else {
                  // If unpublishing
                  setValues(prev => ({
                    ...prev,
                    published: false
                  }));
                  
                  // Save the form with the unpublished state
                  const event = new Event('submit') as any;
                  event.preventDefault = () => {};
                  
                  // Log the current state before submission
                  console.log('Unpublishing case study with state:', { ...values, published: false });
                  
                  // Wait for the submission to complete
                  await handleSubmit(event);
                  
                  toast({
                    title: 'Unpublished',
                    description: 'Content is now in draft mode',
                    duration: 3000,
                  });
                }
              }}
              className="min-w-[100px] bg-green-600 hover:bg-green-700 text-white"
            >
              {values.published ? 'Published ✓' : 'Publish'}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Content Completeness Indicator */}
      <div className="mb-6">
        <div className="flex justify-between mb-1 text-sm">
          <span>Content Completeness</span>
          <span>{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              completionPercentage === 100
                ? 'bg-green-500'
                : completionPercentage > 50
                  ? 'bg-amber-500'
                  : 'bg-red-500'
            }`}
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList>
            <TabsTrigger value="basic" className="relative">
              Basic Info
              {!isTabComplete('basic') && (
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"
                      title="This tab has incomplete required fields" />
              )}
            </TabsTrigger>
            <TabsTrigger value="content" className="relative">
              Content
              {!isTabComplete('content') && (
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"
                      title="This tab has incomplete required fields" />
              )}
            </TabsTrigger>
            <TabsTrigger value="classifications" className="relative">
              Classifications
              {!isTabComplete('classifications') && (
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"
                      title="This tab has incomplete required fields" />
              )}
            </TabsTrigger>
            <TabsTrigger value="technical" className="relative">
              Technical Details
              {!isTabComplete('technical') && (
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"
                      title="This tab has incomplete required fields" />
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Case Study Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="flex items-center">
                    Title <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    value={values.title}
                    onChange={handleChange}
                    required
                    className={errors.title ? "border-red-500" : ""}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500 mt-1">{errors.title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug" className="flex items-center">
                    Slug <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="slug"
                    id="slug"
                    value={values.slug}
                    onChange={handleChange}
                    required
                    className={errors.slug ? "border-red-500" : ""}
                  />
                  {errors.slug && (
                    <p className="text-sm text-red-500 mt-1">{errors.slug}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    name="description"
                    id="description"
                    rows={5}
                    value={values.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    type="url"
                    name="url"
                    id="url"
                    value={values.url}
                    onChange={handleChange}
                  />
                </div>

                <div className="p-4 border rounded-md bg-gray-50 mt-6">
                  <div>
                    <h3 className="font-medium">Content Status</h3>
                    <p className="text-sm text-gray-500">
                      Draft content can be saved with incomplete fields.
                      Published content must be complete.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Main Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="main_content" className="flex items-center">
                    Main Content <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Textarea
                    name="main_content"
                    id="main_content"
                    rows={15}
                    value={values.main_content}
                    onChange={handleChange}
                    className={errors.main_content ? "border-red-500" : ""}
                    placeholder="Enter the detailed content for this case study..."
                  />
                  {errors.main_content && (
                    <p className="text-sm text-red-500 mt-1">{errors.main_content}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    This is the main content that will be displayed on the case study page.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classifications">
            <Card>
              <CardHeader>
                <CardTitle>Classifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="flex items-center">
                    Industries <span className="text-red-500 ml-1">*</span>
                    <span className="text-xs text-gray-500 ml-2">(At least one required for published content)</span>
                  </Label>
                  <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                    {industries?.map((industry) => (
                      <div key={industry.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`industry-${industry.slug}`}
                          checked={values.industries.includes(industry.slug)}
                          onCheckedChange={(checked) => {
                            const newValues = [...values.industries]
                            if (checked && !newValues.includes(industry.slug)) {
                              newValues.push(industry.slug)
                            } else if (!checked) {
                              const index = newValues.indexOf(industry.slug)
                              if (index !== -1) newValues.splice(index, 1)
                            }
                            setValues({ ...values, industries: newValues })
                          }}
                        />
                        <Label htmlFor={`industry-${industry.slug}`}>{industry.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center">
                    Algorithms <span className="text-red-500 ml-1">*</span>
                    <span className="text-xs text-gray-500 ml-2">(At least one required for published content)</span>
                  </Label>
                  <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                    {algorithms?.map((algorithm) => (
                      <div key={algorithm.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`algorithm-${algorithm.slug}`}
                          checked={values.algorithms.includes(algorithm.slug)}
                          onCheckedChange={(checked) => {
                            const newValues = [...values.algorithms]
                            if (checked && !newValues.includes(algorithm.slug)) {
                              newValues.push(algorithm.slug)
                            } else if (!checked) {
                              const index = newValues.indexOf(algorithm.slug)
                              if (index !== -1) newValues.splice(index, 1)
                            }
                            setValues({ ...values, algorithms: newValues })
                          }}
                        />
                        <Label htmlFor={`algorithm-${algorithm.slug}`}>{algorithm.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Personas</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                    {personas?.map((persona) => (
                      <div key={persona.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`persona-${persona.slug}`}
                          checked={values.personas.includes(persona.slug)}
                          onCheckedChange={(checked) => {
                            const newValues = [...values.personas]
                            if (checked && !newValues.includes(persona.slug)) {
                              newValues.push(persona.slug)
                            } else if (!checked) {
                              const index = newValues.indexOf(persona.slug)
                              if (index !== -1) newValues.splice(index, 1)
                            }
                            setValues({ ...values, personas: newValues })
                          }}
                        />
                        <Label htmlFor={`persona-${persona.slug}`}>{persona.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical">
            <Card>
              <CardHeader>
                <CardTitle>Technical Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="partner_companies">Partner Companies</Label>
                  <Input
                    type="text"
                    name="partner_companies"
                    id="partner_companies"
                    value={values.partner_companies.join(', ')}
                    onChange={(e) => handleArrayInputChange(e, 'partner_companies')}
                    placeholder="Comma-separated list"
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter comma-separated list of partner companies
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantum_companies">Quantum Companies</Label>
                  <Input
                    type="text"
                    name="quantum_companies"
                    id="quantum_companies"
                    value={values.quantum_companies.join(', ')}
                    onChange={(e) => handleArrayInputChange(e, 'quantum_companies')}
                    placeholder="Comma-separated list"
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter comma-separated list of quantum companies
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantum_hardware">Quantum Hardware</Label>
                  <Input
                    type="text"
                    name="quantum_hardware"
                    id="quantum_hardware"
                    value={values.quantum_hardware.join(', ')}
                    onChange={(e) => handleArrayInputChange(e, 'quantum_hardware')}
                    placeholder="Comma-separated list"
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter comma-separated list of quantum hardware used
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center mt-8 py-4 border-t">
          <div className="flex items-center">
            <div className="text-sm mr-2">
              {isSaving && <span className="text-blue-500">Saving...</span>}
            </div>
            <div className="text-sm text-muted-foreground">
              {values.published ?
                <span className="flex items-center text-green-600">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-600 mr-2"></span>
                  Published
                </span> :
                <span className="flex items-center text-amber-600">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-600 mr-2"></span>
                  Draft
                </span>
              }
            </div>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting || isSaving}
            size="lg"
            className="px-8"
          >
            {isSubmitting ? 'Saving...' : 'Save Draft'}
          </Button>
        </div>
      </form>
      
      {/* Validation Modal */}
      <AlertDialog open={showValidationModal} onOpenChange={setShowValidationModal}>
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
          <div className="max-h-[60vh] overflow-y-auto py-4">
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
                    setShowValidationModal(false);
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
                setShowValidationModal(false);
                toast({
                  title: 'Saved as Draft',
                  description: 'Content has been saved as a draft',
                  duration: 3000,
                });
              }}
            >
              Save as Draft Instead
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
