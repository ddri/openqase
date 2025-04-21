import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';
import type { Database } from '@/types/supabase';

type Tables = Database['public']['Tables']
type PersonaRow = Tables['personas']['Row']
type PersonaInsert = Tables['personas']['Insert']
type PersonaUpdate = Tables['personas']['Update']

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    // Use createServerClient to get authenticated client
    const supabase = await createServerClient();
    
    let query = supabase
      .from('personas')
      .select('*', { count: 'exact' })
      .order('name')
      .range(from, to);
    
    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching personas:', error);
      return NextResponse.json(
        { error: 'Failed to fetch personas' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      items: data || [],
      metadata: {
        total: count || 0,
        page,
        pageSize,
        totalPages: Math.ceil((count || 0) / pageSize)
      }
    });
  } catch (error) {
    console.error('Personas API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const supabase = await createServerClient();

    // Get form data
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string || null;
    const role = formData.get('role') as string || null;
    
    const industry = formData.getAll('industry[]') as string[];

    // Prepare the data object
    const baseData: PersonaInsert = {
      name,
      slug,
      description,
      role,
      industry: industry.length > 0 ? industry : null
    };

    let result;
    if (id) {
      // Update existing persona
      const { data: updatedData, error } = await supabase
        .from('personas')
        .update({
          ...baseData,
        })
        .eq('id', id)
        .select('*')
        .single();
        
      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }
      result = updatedData;
    } else {
      // Create new persona
      const { data: insertedData, error } = await supabase
        .from('personas')
        .insert({
          ...baseData,
        })
        .select('*')
        .single();
        
      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }
      result = insertedData;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error handling persona submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Persona ID is required' },
        { status: 400 }
      );
    }
    
    const supabase = await createServerClient();
    
    // Check if the persona exists
    const { data: persona, error: fetchError } = await supabase
      .from('personas')
      .select('id')
      .eq('id', id)
      .single();
      
    if (fetchError || !persona) {
      return NextResponse.json(
        { error: 'Persona not found' },
        { status: 404 }
      );
    }
    
    // Delete the persona
    const { error: deleteError } = await supabase
      .from('personas')
      .delete()
      .eq('id', id);
      
    if (deleteError) {
      return NextResponse.json(
        { error: deleteError.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting persona:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}