import { NextRequest, NextResponse } from 'next/server';
import { createServiceRoleSupabaseClient } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    const supabase = createServiceRoleSupabaseClient();
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    
    // Soft delete by setting deleted_at timestamp
    const { error } = await supabase
      .from('quantum_software')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting quantum software:', error);
      return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in quantum-software DELETE:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}