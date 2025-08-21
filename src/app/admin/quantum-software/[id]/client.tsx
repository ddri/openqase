'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface QuantumSoftwareFormProps {
  quantumSoftware: any
  caseStudies: any[]
  isNew: boolean
}

export function QuantumSoftwareForm({ quantumSoftware, caseStudies, isNew }: QuantumSoftwareFormProps) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [values, setValues] = useState({
    name: quantumSoftware?.name || '',
    slug: quantumSoftware?.slug || '',
    description: quantumSoftware?.description || '',
    main_content: quantumSoftware?.main_content || '',
    vendor: quantumSoftware?.vendor || '',
    website_url: quantumSoftware?.website_url || '',
    documentation_url: quantumSoftware?.documentation_url || '',
    github_url: quantumSoftware?.github_url || '',
    license_type: quantumSoftware?.license_type || '',
    pricing_model: quantumSoftware?.pricing_model || '',
    published: quantumSoftware?.published || false,
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
        ? '/api/quantum-software'
        : `/api/quantum-software?id=${quantumSoftware.id}`
      
      const response = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })

      if (response.ok) {
        router.push('/admin/quantum-software')
        router.refresh()
      } else {
        console.error('Failed to save quantum software')
      }
    } catch (error) {
      console.error('Error saving quantum software:', error)
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
              {isNew ? 'Create' : 'Edit'} Quantum Software
            </h1>
            <p className="text-muted-foreground">
              {isNew ? 'Add a new quantum software platform to the database.' : 'Edit quantum software platform details.'}
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
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={values.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Software name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
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
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={values.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Brief description"
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="vendor">Vendor</Label>
              <Input
                id="vendor"
                value={values.vendor}
                onChange={(e) => handleChange('vendor', e.target.value)}
                placeholder="Company or organization"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="website_url">Website URL</Label>
                <Input
                  id="website_url"
                  value={values.website_url}
                  onChange={(e) => handleChange('website_url', e.target.value)}
                  placeholder="https://..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="documentation_url">Documentation URL</Label>
                <Input
                  id="documentation_url"
                  value={values.documentation_url}
                  onChange={(e) => handleChange('documentation_url', e.target.value)}
                  placeholder="https://..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="github_url">GitHub URL</Label>
                <Input
                  id="github_url"
                  value={values.github_url}
                  onChange={(e) => handleChange('github_url', e.target.value)}
                  placeholder="https://github.com/..."
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="license_type">License Type</Label>
                <Input
                  id="license_type"
                  value={values.license_type}
                  onChange={(e) => handleChange('license_type', e.target.value)}
                  placeholder="MIT, Apache, Commercial, etc."
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="pricing_model">Pricing Model</Label>
                <Input
                  id="pricing_model"
                  value={values.pricing_model}
                  onChange={(e) => handleChange('pricing_model', e.target.value)}
                  placeholder="Free, Subscription, Per-use, etc."
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="main_content">Main Content</Label>
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
              <Label htmlFor="published">Published</Label>
            </div>
          </CardContent>
        </Card>
    </div>
  )
}