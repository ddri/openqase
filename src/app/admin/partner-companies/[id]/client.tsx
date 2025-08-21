'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface PartnerCompanyFormProps {
  partnerCompany: any
  caseStudies: any[]
  isNew: boolean
}

export function PartnerCompanyForm({ partnerCompany, caseStudies, isNew }: PartnerCompanyFormProps) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [values, setValues] = useState({
    name: partnerCompany?.name || '',
    slug: partnerCompany?.slug || '',
    description: partnerCompany?.description || '',
    main_content: partnerCompany?.main_content || '',
    industry: partnerCompany?.industry || '',
    company_size: partnerCompany?.company_size || '',
    headquarters: partnerCompany?.headquarters || '',
    partnership_type: partnerCompany?.partnership_type || '',
    quantum_use_cases: partnerCompany?.quantum_use_cases || '',
    website_url: partnerCompany?.website_url || '',
    linkedin_url: partnerCompany?.linkedin_url || '',
    published: partnerCompany?.published || false,
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
        ? '/api/partner-companies'
        : `/api/partner-companies?id=${partnerCompany.id}`
      
      const response = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })

      if (response.ok) {
        router.push('/admin/partner-companies')
        router.refresh()
      } else {
        console.error('Failed to save partner company')
      }
    } catch (error) {
      console.error('Error saving partner company:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-24">
      <div className="pt-6 mb-8 bg-background pb-4 border-b border-border">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {isNew ? 'Create' : 'Edit'} Partner Company
            </h1>
            <p className="text-muted-foreground">
              {isNew ? 'Add a new partner company to the database.' : 'Edit partner company details.'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="p-6">
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6 pt-0">
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
                <Label htmlFor="industry" >Industry</Label>
                <Input
                  id="industry"
                  value={values.industry}
                  onChange={(e) => handleChange('industry', e.target.value)}
                  placeholder="e.g., Financial Services, Healthcare"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="company_size" >Company Size</Label>
                <Input
                  id="company_size"
                  value={values.company_size}
                  onChange={(e) => handleChange('company_size', e.target.value)}
                  placeholder="e.g., Enterprise, SME, Startup"
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
                <Label htmlFor="partnership_type" >Partnership Type</Label>
                <Input
                  id="partnership_type"
                  value={values.partnership_type}
                  onChange={(e) => handleChange('partnership_type', e.target.value)}
                  placeholder="e.g., Technology, Research, Commercial"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="quantum_use_cases" >Quantum Use Cases</Label>
              <Input
                id="quantum_use_cases"
                value={values.quantum_use_cases}
                onChange={(e) => handleChange('quantum_use_cases', e.target.value)}
                placeholder="e.g., Optimization, Simulation, Machine Learning"
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
  )
}