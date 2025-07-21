'use client'

import { createClient } from '../../../../utils/supabase/client'
import type { Database } from '@/types/supabase'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// Dynamic import for heavy admin component
const AlgorithmsClient = dynamic(() => import('./client').then(mod => ({ default: mod.AlgorithmsClient })), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      <span className="ml-2">Loading algorithms...</span>
    </div>
  )
})

export type Algorithm = Database['public']['Tables']['algorithms']['Row']

export default function AlgorithmsPage() {
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAlgorithms() {
      const supabase = createClient()
      
      const { data, error } = await supabase
        .from('algorithms')
        .select('*')
        .order('name')

      if (error) {
        console.error('Error fetching algorithms:', error)
        setError('Error loading algorithms')
      } else {
        setAlgorithms(data || [])
      }
      setLoading(false)
    }

    fetchAlgorithms()
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

  return <AlgorithmsClient data={algorithms} />
}