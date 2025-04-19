import { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import type { Database } from '@/lib/database.types'
import { PersonasClient } from './client'

export const metadata: Metadata = {
  title: 'Personas Management - OpenQASE Admin',
  description: 'Manage user personas content'
}

export type Persona = Database['public']['Tables']['personas']['Row']

export default async function PersonasPage() {
  const supabase = await createClient()
  
  const { data: personas, error } = await supabase
    .from('personas')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching personas:', error)
    return <div>Error loading personas</div>
  }

  return <PersonasClient data={personas || []} />
}