import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import type { Database } from '@/types/supabase';

type Tables = Database['public']['Tables']
type AlgorithmRow = Tables['algorithms']['Row']
type AlgorithmInsert = Tables['algorithms']['Insert']
type AlgorithmUpdate = Tables['algorithms']['Update']

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeUnpublished = searchParams.get('includeUnpublished') === 'true';
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    // Use createClient to get authenticated client
    const supabase = await createClient();
    
    let query = supabase
      .from('algorithms')
      .select('*', { count: 'exact' })
      .order('name')
      .range(from, to);
    
    if (!includeUnpublished) {
      query = query.eq('published', true);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching algorithms:', error);
      return NextResponse.json(
        { error: 'Failed to fetch algorithms' },
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
    console.error('Algorithms API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const supabase = await createClient();

    // Get form data
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string || null;
    const published = formData.get('published') === 'on';
    
    // Process array fields
    const use_cases = (formData.get('use_cases') as string)
      ?.split(',')
      .map((s) => s.trim())
      .filter(Boolean) || null;
    
    // Get relationship data (for future implementation)
    const relatedCaseStudies = formData.getAll('related_case_studies[]') as string[];
    const relatedIndustries = formData.getAll('related_industries[]') as string[];

    // Prepare the data object
    const baseData: AlgorithmInsert = {
      name,
      slug,
      description,
      published,
      use_cases
    };

    let result;
    if (id) {
      // Update existing algorithm
      const { data: updatedData, error } = await supabase
        .from('algorithms')
        .update({
          ...baseData,
          updated_at: new Date().toISOString(),
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
      
      // TODO: Handle relationships in a future update
      // This would involve updating junction tables or array fields in related tables
    } else {
      // Create new algorithm
      const { data: insertedData, error } = await supabase
        .from('algorithms')
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
      
      // TODO: Handle relationships in a future update
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error handling algorithm submission:', error);
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
        { error: 'Algorithm ID is required' },
        { status: 400 }
      );
    }
    
    const supabase = await createClient();
    
    // Check if the algorithm exists
    const { data: algorithm, error: fetchError } = await supabase
      .from('algorithms')
      .select('id')
      .eq('id', id)
      .single();
      
    if (fetchError || !algorithm) {
      return NextResponse.json(
        { error: 'Algorithm not found' },
        { status: 404 }
      );
    }
    
    // Delete the algorithm
    const { error: deleteError } = await supabase
      .from('algorithms')
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
    console.error('Error deleting algorithm:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}