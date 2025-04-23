'use client'

import { useState, useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
interface IndustryFormProps {
  industry: any | null
  isNew: boolean
}

interface IndustryFormData {
  id?: string
  name: string
  slug: string
  description: string
  icon: string
  published: boolean
}

export function IndustryForm({ industry, isNew }: IndustryFormProps) {
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
  const initialValues: IndustryFormData = {
    id: isNew ? undefined : industry?.id,
    name: isNew ? '' : industry?.name || '',
    slug: isNew ? '' : industry?.slug || '',
    description: isNew ? '' : industry?.description || '',
    icon: isNew ? '' : industry?.icon || '',
    published: isNew ? false : industry?.published || false,
  }

  // Set up state for form values
  const [values, setValues] = useState<IndustryFormData>(initialValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Calculate initial completion percentage
  useEffect(() => {
    setCompletionPercentage(calculateCompletionPercentage());
  }, []);
  
  // Check if a tab is complete
  const isTabComplete = (tabName: string): boolean => {
    switch (tabName) {
      case 'basic':
        return !!values.name.trim() && !!values.slug.trim();
      case 'details':
        return !!values.description.trim();
      case 'icon':
        return !!values.icon.trim();
      default:
        return true;
    }
  };
  
  // Calculate completion percentage
  const calculateCompletionPercentage = (): number => {
    const requiredFields = [
      { name: 'name', complete: !!values.name.trim() },
      { name: 'slug', complete: !!values.slug.trim() },
      { name: 'description', complete: !!values.description.trim() },
      { name: 'icon', complete: !!values.icon.trim() }
    ];
    
    const completedCount = requiredFields.filter(field => field.complete).length;
    return Math.round((completedCount / requiredFields.length) * 100);
  };
  
  // Validate all content and collect issues
  const validateContent = (): boolean => {
    const issues: Record<string, {name: string, label: string}[]> = {};
    
    // Basic tab validation
    const basicIssues = [];
    if (!values.name.trim()) {
      basicIssues.push({ name: 'name', label: 'Name is required' });
    }
    if (!values.slug.trim()) {
      basicIssues.push({ name: 'slug', label: 'Slug is required' });
    }
    if (basicIssues.length) {
      issues.basic = basicIssues;
    }
    
    // Details tab validation
    const detailsIssues = [];
    if (!values.description.trim()) {
      detailsIssues.push({ name: 'description', label: 'Description is required' });
    }
    if (detailsIssues.length) {
      issues.details = detailsIssues;
    }
    
    // Icon tab validation
    const iconIssues = [];
    if (!values.icon.trim()) {
      iconIssues.push({ name: 'icon', label: 'Icon is required' });
    }
    if (iconIssues.length) {
      issues.icon = iconIssues;
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
      case 'details': return 'Details';
      case 'icon': return 'Icon';
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
      
      payload.append('name', values.name)
      payload.append('slug', values.slug)
      payload.append('description', values.description || '')
      payload.append('icon', values.icon || '')
      
      // Log the published state before sending
      console.log('Client-side published state:', values.published);
      payload.append('published', values.published ? 'on' : '')
      console.log('Form data published value:', payload.get('published'));
      
      // Validate required fields
      const validationErrors: Record<string, string> = {};
      
      if (!values.name.trim()) {
        validationErrors.name = 'Name is required';
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
      const response = await fetch('/api/industries', {
        method: 'POST',
        body: payload,
      })
      
      if (!response.ok) {
        console.error('Failed to save industry:', await response.text());
        throw new Error('Failed to save industry')
      }
      
      // Get the response data
      const data = await response.json()
      console.log('API response:', data);
      
      // If this is a new industry, update the ID to prevent creating duplicates
      if (isNew && data.id) {
        setValues(prev => ({
          ...prev,
          id: data.id
        }))
        
        // Update URL without refreshing the page
        window.history.replaceState({}, '', `/admin/industries/${data.id}`)
      }
      
      // Update the last saved timestamp
      setLastSaved(new Date().toLocaleTimeString())
      
      // Clear any errors
      setErrors({})
      
      // Show success message
      toast({
        title: 'Success',
        description: isNew ? 'Industry created successfully' : 'Industry updated successfully',
        duration: 3000,
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save industry',
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
    if (values.name && values.slug) {
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

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" asChild>
          <Link href="/admin/industries">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Industries
          </Link>
        </Button>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">
          {isNew ? 'Add New Industry' : 'Edit Industry'}
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
                    payload.append('name', values.name);
                    payload.append('slug', values.slug);
                    payload.append('description', values.description || '');
                    payload.append('icon', values.icon || '');
                    payload.append('published', 'on'); // Force published to be true
                    
                    console.log('Manual payload published value:', payload.get('published'));
                    
                    // Submit the form data
                    const response = await fetch('/api/industries', {
                      method: 'POST',
                      body: payload,
                    });
                    
                    if (!response.ok) {
                      console.error('Failed to save industry:', await response.text());
                      toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: 'Failed to publish industry',
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
                  console.log('Unpublishing industry with state:', { ...values, published: false });
                  
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
            <TabsTrigger value="details" className="relative">
              Details
              {!isTabComplete('details') && (
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"
                      title="This tab has incomplete required fields" />
              )}
            </TabsTrigger>
            <TabsTrigger value="icon" className="relative">
              Icon
              {!isTabComplete('icon') && (
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"
                      title="This tab has incomplete required fields" />
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center">
                    Name <span className="text-red-500 ml-1">*</span>
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
                    <p className="text-sm text-red-500 mt-1">{errors.name}</p>
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Industry Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center">
                    Description <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Textarea
                    name="description"
                    id="description"
                    rows={5}
                    value={values.description}
                    onChange={handleChange}
                    className={errors.description ? "border-red-500" : ""}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500 mt-1">{errors.description}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="icon">
            <Card>
              <CardHeader>
                <CardTitle>Industry Icon</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="icon" className="flex items-center">
                    Icon <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="icon"
                    id="icon"
                    value={values.icon}
                    onChange={handleChange}
                    placeholder="e.g., finance, healthcare, technology"
                    className={errors.icon ? "border-red-500" : ""}
                  />
                  {errors.icon && (
                    <p className="text-sm text-red-500 mt-1">{errors.icon}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Enter the icon name or identifier for this industry
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