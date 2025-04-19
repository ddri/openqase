import { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import type { Database } from '@/lib/database.types'
import { AlgorithmsClient } from './client'

export const metadata: Metadata = {
  title: 'Algorithms Management - OpenQASE Admin',
  description: 'Manage quantum algorithms content'
}

export type Algorithm = Database['public']['Tables']['algorithms']['Row']

export default async function AlgorithmsPage() {
  const supabase = await createClient()
  
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