import { Metadata } from 'next'
import { createServiceRoleSupabaseClient } from '@/lib/supabase-server'
import type { Database } from '@/types/supabase'
import dynamic from 'next/dynamic'

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

export const metadata: Metadata = {
  title: 'Algorithms Management',
  description: 'Manage quantum algorithms content'
}

export type Algorithm = Database['public']['Tables']['algorithms']['Row']

export default async function AlgorithmsPage() {
  const supabase = createServiceRoleSupabaseClient()
  
  const { data: algorithms, error } = await supabase
    .from('algorithms')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching algorithms:', error)
    return <div>Error loading algorithms</div>
  }

  return <AlgorithmsClient data={algorithms || []} />
}