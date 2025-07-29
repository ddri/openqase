'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowLeft, Eye, CheckCircle, XCircle, AlertTriangle, FileText, Clock, Edit, Save, X, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import type { ImportBatchWithItems, StagingCaseStudy } from './page'

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-4 w-4" />
    case 'approved':
      return <CheckCircle className="h-4 w-4" />
    case 'rejected':
      return <XCircle className="h-4 w-4" />
    default:
      return <AlertTriangle className="h-4 w-4" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'approved':
      return 'bg-green-100 text-green-800'
    case 'rejected':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

interface CategoryMappingDisplayProps {
  title: string;
  qookieItems: string[];
  mappingResult: {
    exact_matches: string[];
    fuzzy_matches: string[];
    failed_matches: string[];
  };
  currentMapping: string[];
  availableOptions: string[];
  onUpdate: (newMapping: string[]) => void;
}

function CategoryMappingDisplay({ 
  title, 
  qookieItems, 
  mappingResult, 
  currentMapping, 
  availableOptions, 
  onUpdate 
}: CategoryMappingDisplayProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempMapping, setTempMapping] = useState<string[]>(currentMapping);

  const handleSave = () => {
    onUpdate(tempMapping);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempMapping(currentMapping);
    setIsEditing(false);
  };

  const addMapping = (value: string) => {
    if (value && !tempMapping.includes(value)) {
      setTempMapping([...tempMapping, value]);
    }
  };

  const removeMapping = (value: string) => {
    setTempMapping(tempMapping.filter(m => m !== value));
  };

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h5 className="font-medium">{title}</h5>
        {!isEditing ? (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              <X className="h-3 w-3 mr-1" />
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-3 w-3 mr-1" />
              Save
            </Button>
          </div>
        )}
      </div>

      {/* Original Qookie Values */}
      <div>
        <h6 className="text-xs font-medium text-muted-foreground mb-1">Original from Qookie:</h6>
        <div className="flex flex-wrap gap-1">
          {qookieItems.map((item, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {item}
            </Badge>
          ))}
        </div>
      </div>

      {/* Mapping Results */}
      <div className="space-y-2">
        {mappingResult.exact_matches.length > 0 && (
          <div>
            <h6 className="text-xs font-medium text-green-700 mb-1">Exact Matches:</h6>
            <div className="flex flex-wrap gap-1">
              {mappingResult.exact_matches.map((item, i) => (
                <Badge key={i} className="bg-green-100 text-green-800 text-xs">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {mappingResult.fuzzy_matches.length > 0 && (
          <div>
            <h6 className="text-xs font-medium text-yellow-700 mb-1">Fuzzy Matches:</h6>
            <div className="flex flex-wrap gap-1">
              {mappingResult.fuzzy_matches.map((item, i) => (
                <Badge key={i} className="bg-yellow-100 text-yellow-800 text-xs">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {mappingResult.failed_matches.length > 0 && (
          <div>
            <h6 className="text-xs font-medium text-red-700 mb-1">Failed Matches:</h6>
            <div className="flex flex-wrap gap-1">
              {mappingResult.failed_matches.map((item, i) => (
                <Badge key={i} className="bg-red-100 text-red-800 text-xs">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Current Mapping */}
      <div>
        <h6 className="text-xs font-medium text-muted-foreground mb-1">Current OpenQase Mapping:</h6>
        {!isEditing ? (
          <div className="flex flex-wrap gap-1">
            {currentMapping.map((item, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {tempMapping.map((item, i) => (
                <Badge 
                  key={i} 
                  variant="secondary" 
                  className="text-xs cursor-pointer hover:bg-red-100"
                  onClick={() => removeMapping(item)}
                >
                  {item} <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
            <Select onValueChange={addMapping}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Add mapping..." />
              </SelectTrigger>
              <SelectContent>
                {availableOptions
                  .filter(option => !tempMapping.includes(option))
                  .map(option => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
}

interface PreviewDialogProps {
  caseStudy: StagingCaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
  batchId: string;
  onUpdate: () => void;
}

function PreviewDialog({ caseStudy, isOpen, onClose, batchId, onUpdate }: PreviewDialogProps) {
  const [isMappingExpanded, setIsMappingExpanded] = useState(false);
  const [taxonomyOptions, setTaxonomyOptions] = useState<{
    industries: string[];
    personas: string[];
    algorithms: string[];
  }>({ industries: [], personas: [], algorithms: [] });
  const [isUpdating, setIsUpdating] = useState(false);

  // Load taxonomy options when dialog opens
  useEffect(() => {
    if (isOpen && caseStudy) {
      // Mock data for now - in real implementation, fetch from API
      setTaxonomyOptions({
        industries: ['automotive', 'finance', 'healthcare', 'manufacturing', 'aerospace', 'energy'],
        personas: ['quantum-researcher', 'technology-executive', 'business-analyst', 'data-scientist'],
        algorithms: ['qaoa', 'vqe', 'quantum-annealing', 'quantum-phase-estimation']
      });
    }
  }, [isOpen, caseStudy]);

  if (!caseStudy) return null;

  const handleMappingUpdate = async (category: string, newMapping: string[]) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/imports/${batchId}/mapping`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caseStudyId: caseStudy.id,
          updates: { [category]: newMapping }
        })
      });

      if (response.ok) {
        onUpdate(); // Refresh parent component
      } else {
        console.error('Failed to update mapping');
      }
    } catch (error) {
      console.error('Error updating mapping:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const mappingQuality = caseStudy.mapping_quality || {
    industries: { exact_matches: [], fuzzy_matches: [], failed_matches: [] },
    personas: { exact_matches: [], fuzzy_matches: [], failed_matches: [] },
    algorithms: { exact_matches: [], fuzzy_matches: [], failed_matches: [] },
    overall_score: 0
  };

  const failedMappingsCount = 
    mappingQuality.industries.failed_matches.length +
    mappingQuality.personas.failed_matches.length +
    mappingQuality.algorithms.failed_matches.length;

  const qualityScore = Math.round((mappingQuality.overall_score || 0) * 100);
  const getQualityColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{caseStudy.title}</DialogTitle>
          <DialogDescription>
            Review case study details and mapping quality
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Qookie ID</h4>
              <p className="text-sm">{caseStudy.qookie_id}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">OpenQase Slug</h4>
              <p className="text-sm">{caseStudy.slug}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Year</h4>
              <p className="text-sm">{caseStudy.year}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Validation Status</h4>
              <Badge className={getStatusColor(caseStudy.validation_status)}>
                {getStatusIcon(caseStudy.validation_status)}
                <span className="ml-1 capitalize">{caseStudy.validation_status}</span>
              </Badge>
            </div>
          </div>

          {/* Mapping Review Section */}
          <div className="border rounded-lg">
            <div 
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => setIsMappingExpanded(!isMappingExpanded)}
            >
              <div className="flex items-center space-x-3">
                <h3 className="font-medium">Mapping Review</h3>
                <Badge className={`${getQualityColor(qualityScore)} bg-opacity-10`}>
                  Quality: {qualityScore}%
                </Badge>
                {failedMappingsCount > 0 && (
                  <Badge variant="destructive" className="bg-red-100 text-red-800">
                    {failedMappingsCount} failed
                  </Badge>
                )}
              </div>
              {isMappingExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>

            {isMappingExpanded && (
              <div className="p-4 border-t space-y-4">
                {failedMappingsCount > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                    <div className="flex">
                      <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5" />
                      <div className="ml-2">
                        <h4 className="text-sm font-medium text-yellow-800">
                          Mapping Issues Found
                        </h4>
                        <p className="text-sm text-yellow-700">
                          {failedMappingsCount} category mappings failed. Please review and correct them below.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <CategoryMappingDisplay
                    title="Industries"
                    qookieItems={caseStudy.qookie_data?.categories?.industries || []}
                    mappingResult={mappingQuality.industries}
                    currentMapping={caseStudy.industries}
                    availableOptions={taxonomyOptions.industries}
                    onUpdate={(newMapping) => handleMappingUpdate('industries', newMapping)}
                  />

                  <CategoryMappingDisplay
                    title="Personas"
                    qookieItems={caseStudy.qookie_data?.categories?.personas || []}
                    mappingResult={mappingQuality.personas}
                    currentMapping={caseStudy.personas}
                    availableOptions={taxonomyOptions.personas}
                    onUpdate={(newMapping) => handleMappingUpdate('personas', newMapping)}
                  />

                  <CategoryMappingDisplay
                    title="Algorithms"
                    qookieItems={caseStudy.qookie_data?.categories?.algorithms || []}
                    mappingResult={mappingQuality.algorithms}
                    currentMapping={caseStudy.algorithms}
                    availableOptions={taxonomyOptions.algorithms}
                    onUpdate={(newMapping) => handleMappingUpdate('algorithms', newMapping)}
                  />
                </div>

                {isUpdating && (
                  <div className="text-center text-sm text-muted-foreground">
                    Updating mappings...
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-2">Description</h4>
            <p className="text-sm bg-gray-50 p-3 rounded">{caseStudy.description}</p>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Industries</h4>
              <div className="flex flex-wrap gap-1">
                {caseStudy.industries.map((item, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Personas</h4>
              <div className="flex flex-wrap gap-1">
                {caseStudy.personas.map((item, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Algorithms</h4>
              <div className="flex flex-wrap gap-1">
                {caseStudy.algorithms.map((item, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Companies */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Partner Companies</h4>
              <div className="flex flex-wrap gap-1">
                {caseStudy.partner_companies.map((item, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Quantum Companies</h4>
              <div className="flex flex-wrap gap-1">
                {caseStudy.quantum_companies.map((item, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Preview */}
          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-2">Content Preview</h4>
            <div className="text-sm bg-gray-50 p-3 rounded max-h-32 overflow-y-auto">
              {caseStudy.main_content?.substring(0, 500)}
              {caseStudy.main_content?.length > 500 && '...'}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const columns: ColumnDef<StagingCaseStudy>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.title}</div>
        <div className="text-sm text-muted-foreground">{row.original.qookie_id}</div>
      </div>
    ),
  },
  {
    accessorKey: 'validation_status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.validation_status
      return (
        <Badge variant="secondary" className={getStatusColor(status)}>
          <div className="flex items-center space-x-1">
            {getStatusIcon(status)}
            <span className="capitalize">{status}</span>
          </div>
        </Badge>
      )
    },
  },
  {
    accessorKey: 'categories',
    header: 'Categories',
    cell: ({ row }) => {
      const cs = row.original
      const totalCategories = cs.industries.length + cs.personas.length + cs.algorithms.length
      return (
        <div className="text-sm">
          <div>{totalCategories} mapped</div>
          <div className="text-muted-foreground">
            {cs.industries.length}i, {cs.personas.length}p, {cs.algorithms.length}a
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'year',
    header: 'Year',
    cell: ({ row }) => row.original.year,
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      return (
        <div className="flex justify-end space-x-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]

interface BatchReviewClientProps {
  batch: ImportBatchWithItems
}

export function BatchReviewClient({ batch }: BatchReviewClientProps) {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<StagingCaseStudy | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  // Update columns to include preview action
  const columnsWithPreview: ColumnDef<StagingCaseStudy>[] = [
    ...columns.slice(0, -1), // All columns except actions
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        return (
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setSelectedCaseStudy(row.original)
                setIsPreviewOpen(true)
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  const pendingItems = batch.staging_case_studies.filter(cs => cs.validation_status === 'pending').length
  const approvedItems = batch.staging_case_studies.filter(cs => cs.validation_status === 'approved').length
  const rejectedItems = batch.staging_case_studies.filter(cs => cs.validation_status === 'rejected').length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/imports">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Imports
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{batch.batch_name}</h1>
          <p className="text-muted-foreground">
            {batch.source_file} • {batch.total_items} items
          </p>
        </div>
      </div>

      {/* Batch Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{batch.total_items}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingItems}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{approvedItems}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{rejectedItems}</div>
          </CardContent>
        </Card>
      </div>

      {/* Case Studies Table */}
      <Card>
        <CardHeader>
          <CardTitle>Staging Case Studies</CardTitle>
          <CardDescription>
            Review and approve individual case studies before promoting to production
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columnsWithPreview} 
            data={batch.staging_case_studies}
          />
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <PreviewDialog
        caseStudy={selectedCaseStudy}
        isOpen={isPreviewOpen}
        batchId={batch.id}
        onClose={() => {
          setIsPreviewOpen(false)
          setSelectedCaseStudy(null)
        }}
        onUpdate={() => {
          setRefreshKey(prev => prev + 1)
          // Force page refresh to get updated data
          window.location.reload()
        }}
      />
    </div>
  )
}