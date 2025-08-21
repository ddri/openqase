'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface QuantumCompanyFormProps {
  quantumCompany: any
  caseStudies: any[]
  isNew: boolean
}

export function QuantumCompanyForm({ quantumCompany, caseStudies, isNew }: QuantumCompanyFormProps) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [values, setValues] = useState({
    name: quantumCompany?.name || '',
    slug: quantumCompany?.slug || '',
    description: quantumCompany?.description || '',
    main_content: quantumCompany?.main_content || '',
    company_type: quantumCompany?.company_type || '',
    founding_year: quantumCompany?.founding_year || '',
    headquarters: quantumCompany?.headquarters || '',
    funding_stage: quantumCompany?.funding_stage || '',
    website_url: quantumCompany?.website_url || '',
    linkedin_url: quantumCompany?.linkedin_url || '',
    published: quantumCompany?.published || false,
  })

  const handleChange = (field: string, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }))
    
    // Auto-generate slug from name
    if (field === 'name' && isNew) {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim()
      setValues(prev => ({ ...prev, slug }))
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const url = isNew 
        ? '/api/quantum-companies'
        : `/api/quantum-companies?id=${quantumCompany.id}`
      
      const response = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })

      if (response.ok) {
        router.push('/admin/quantum-companies')
        router.refresh()
      } else {
        console.error('Failed to save quantum company')
      }
    } catch (error) {
      console.error('Error saving quantum company:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {isNew ? 'Create' : 'Edit'} Quantum Company
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {isNew ? 'Add a new quantum company to the database.' : 'Edit quantum company details.'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <Card className="border-0 shadow-none">
          <CardHeader className="border-b border-gray-200">
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" >Name</Label>
                <Input
                  id="name"
                  value={values.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Company name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="slug" >Slug</Label>
                <Input
                  id="slug"
                  value={values.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  placeholder="url-friendly-name"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description" >Description</Label>
              <Textarea
                id="description"
                value={values.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Brief description"
                className="mt-1"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="company_type" >Company Type</Label>
                <Input
                  id="company_type"
                  value={values.company_type}
                  onChange={(e) => handleChange('company_type', e.target.value)}
                  placeholder="e.g., hardware, software, consulting, research"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="founding_year" >Founding Year</Label>
                <Input
                  id="founding_year"
                  value={values.founding_year}
                  onChange={(e) => handleChange('founding_year', e.target.value)}
                  placeholder="e.g., 2019"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="headquarters" >Headquarters</Label>
                <Input
                  id="headquarters"
                  value={values.headquarters}
                  onChange={(e) => handleChange('headquarters', e.target.value)}
                  placeholder="City, Country"
                  className="mt-1"
                />
              </div>
              <div>
              </div>
            </div>

            <div>
              <Label htmlFor="funding_stage" >Funding Stage</Label>
              <Input
                id="funding_stage"
                value={values.funding_stage}
                onChange={(e) => handleChange('funding_stage', e.target.value)}
                placeholder="e.g., Series A, Seed, Public"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="website_url" >Website URL</Label>
                <Input
                  id="website_url"
                  value={values.website_url}
                  onChange={(e) => handleChange('website_url', e.target.value)}
                  placeholder="https://..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="linkedin_url" >LinkedIn URL</Label>
                <Input
                  id="linkedin_url"
                  value={values.linkedin_url}
                  onChange={(e) => handleChange('linkedin_url', e.target.value)}
                  placeholder="https://linkedin.com/company/..."
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="main_content" >Main Content</Label>
              <Textarea
                id="main_content"
                value={values.main_content}
                onChange={(e) => handleChange('main_content', e.target.value)}
                placeholder="Detailed content (supports markdown)"
                className="mt-1"
                rows={8}
              />
            </div>

            <div className="flex items-center space-x-2 pt-4 border-t border-border">
              <Switch
                id="published"
                checked={values.published}
                onCheckedChange={(checked) => handleChange('published', checked)}
              />
              <Label htmlFor="published" >Published</Label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}