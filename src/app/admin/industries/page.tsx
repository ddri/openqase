import { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import type { Database } from '@/lib/database.types'
import { IndustriesClient } from './client'

export const metadata: Metadata = {
  title: 'Industries Management - OpenQASE Admin',
  description: 'Manage industry content'
}

export type Industry = Database['public']['Tables']['industries']['Row']

export default async function IndustriesPage() {
  const supabase = await createClient()
  
  const { data: industries, error } = await supabase
    .from('industries')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching industries:', error)
    return <div>Error loading industries</div>
  }

  return <IndustriesClient data={industries || []} />
}