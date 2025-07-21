'use client'

import { createClient } from '../../../../utils/supabase/client'
import type { Database } from '@/types/supabase'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// Dynamic import for heavy admin component
const CaseStudiesClient = dynamic(() => import('./client').then(mod => ({ default: mod.CaseStudiesClient })), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      <span className="ml-2">Loading case studies...</span>
    </div>
  )
})

export type CaseStudy = Database['public']['Tables']['case_studies']['Row']

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCaseStudies() {
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .order('title')

      if (error) {
        console.error('Error fetching case studies:', error)
        setError('Error loading case studies')
      } else {
        setCaseStudies(data || [])
      }
      setLoading(false)
    }

    fetchCaseStudies()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        <span className="ml-2">Loading...</span>
      </div>
    )
  }

  if (error) {
    return <div>{error}</div>
  }

  return <CaseStudiesClient data={caseStudies} />
}