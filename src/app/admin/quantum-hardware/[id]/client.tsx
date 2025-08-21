'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface QuantumHardwareFormProps {
  quantumHardware: any
  caseStudies: any[]
  isNew: boolean
}

export function QuantumHardwareForm({ quantumHardware, caseStudies, isNew }: QuantumHardwareFormProps) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [values, setValues] = useState({
    name: quantumHardware?.name || '',
    slug: quantumHardware?.slug || '',
    description: quantumHardware?.description || '',
    main_content: quantumHardware?.main_content || '',
    manufacturer: quantumHardware?.manufacturer || '',
    qubit_count: quantumHardware?.qubit_count || '',
    qubit_type: quantumHardware?.qubit_type || '',
    coherence_time: quantumHardware?.coherence_time || '',
    gate_fidelity: quantumHardware?.gate_fidelity || '',
    operating_temperature: quantumHardware?.operating_temperature || '',
    website_url: quantumHardware?.website_url || '',
    documentation_url: quantumHardware?.documentation_url || '',
    published: quantumHardware?.published || false,
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
        ? '/api/quantum-hardware'
        : `/api/quantum-hardware?id=${quantumHardware.id}`
      
      const response = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })

      if (response.ok) {
        router.push('/admin/quantum-hardware')
        router.refresh()
      } else {
        console.error('Failed to save quantum hardware')
      }
    } catch (error) {
      console.error('Error saving quantum hardware:', error)
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
              {isNew ? 'Create' : 'Edit'} Quantum Hardware
            </h1>
            <p className="text-muted-foreground">
              {isNew ? 'Add a new quantum hardware system to the database.' : 'Edit quantum hardware system details.'}
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
                  placeholder="Hardware name"
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
              <Label htmlFor="manufacturer">Manufacturer</Label>
              <Input
                id="manufacturer"
                value={values.manufacturer}
                onChange={(e) => handleChange('manufacturer', e.target.value)}
                placeholder="Company or organization"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="qubit_count">Qubit Count</Label>
                <Input
                  id="qubit_count"
                  value={values.qubit_count}
                  onChange={(e) => handleChange('qubit_count', e.target.value)}
                  placeholder="e.g., 100"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="qubit_type">Qubit Type</Label>
                <Input
                  id="qubit_type"
                  value={values.qubit_type}
                  onChange={(e) => handleChange('qubit_type', e.target.value)}
                  placeholder="e.g., Superconducting"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="coherence_time">Coherence Time</Label>
                <Input
                  id="coherence_time"
                  value={values.coherence_time}
                  onChange={(e) => handleChange('coherence_time', e.target.value)}
                  placeholder="e.g., 100 μs"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="gate_fidelity">Gate Fidelity</Label>
                <Input
                  id="gate_fidelity"
                  value={values.gate_fidelity}
                  onChange={(e) => handleChange('gate_fidelity', e.target.value)}
                  placeholder="e.g., 99.5%"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="operating_temperature">Operating Temperature</Label>
                <Input
                  id="operating_temperature"
                  value={values.operating_temperature}
                  onChange={(e) => handleChange('operating_temperature', e.target.value)}
                  placeholder="e.g., 15 mK"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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