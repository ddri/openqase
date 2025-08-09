import { createServiceRoleSupabaseClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { id, ids } = await request.json()
    
    if (!id && !ids) {
      return NextResponse.json({ error: 'ID or IDs are required' }, { status: 400 })
    }

    const supabase = await createServiceRoleSupabaseClient()
    
    // Handle both single and bulk delete
    const idsToDelete = ids ? ids : [id]
    
    const errors: string[] = []
    for (const contentId of idsToDelete) {
      const { error } = await supabase.rpc('soft_delete_content', {
        table_name: 'industries',
        content_id: contentId
      })
      
      if (error) {
        console.error(`Error soft deleting industry ${contentId}:`, error)
        errors.push(`${contentId}: ${error.message}`)
      }
    }

    if (errors.length > 0) {
      return NextResponse.json({ 
        error: `Failed to delete some industries: ${errors.join(', ')}` 
      }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}