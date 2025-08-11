import { createServiceRoleSupabaseClient } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { id, ids } = await request.json()
    
    if (!id && !ids) {
      return NextResponse.json({ error: 'ID or IDs are required' }, { status: 400 })
    }

    const supabase = createServiceRoleSupabaseClient()
    
    // Test if we can query the database at all
    const { data: testQuery, error: testError } = await supabase
      .from('case_studies')
      .select('id')
      .limit(1)
    
    if (testError) {
      console.error('Cannot even query case_studies table:', testError)
      return NextResponse.json({ error: `Database connection issue: ${testError.message}` }, { status: 500 })
    }
    
    console.log('Database connection works, found case study:', testQuery)
    
    // Handle both single and bulk delete
    const idsToDelete = ids ? ids : [id]
    
    const errors: string[] = []
    for (const contentId of idsToDelete) {
      console.log('Calling soft_delete_content with:', { table_name: 'case_studies', content_id: contentId })
      const { error } = await supabase.rpc('soft_delete_content', {
        table_name: 'case_studies',
        content_id: contentId
      })
      
      if (error) {
        console.error(`Error soft deleting case study ${contentId}:`, error)
        errors.push(`${contentId}: ${error.message}`)
      }
    }

    if (errors.length > 0) {
      return NextResponse.json({ 
        error: `Failed to delete some case studies: ${errors.join(', ')}` 
      }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}