import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';
import type { Database } from '@/types/supabase';

type Tables = Database['public']['Tables']
type IndustryRow = Tables['industries']['Row']
type IndustryInsert = Tables['industries']['Insert']
type IndustryUpdate = Tables['industries']['Update']

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
      .from('industries')
      .select('*', { count: 'exact' })
      .order('name')
      .range(from, to);
    
    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching industries:', error);
      return NextResponse.json(
        { error: 'Failed to fetch industries' },
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
    console.error('Industries API Error:', error);
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
    const icon = formData.get('icon') as string || null;
    const published = formData.get('published') === 'on';
    
    console.log('Published value from form:', formData.get('published'));
    console.log('Interpreted published value:', published);

    // Prepare the data object
    const baseData: IndustryInsert = {
      name,
      slug,
      description,
      icon,
      published
    };

    let result;
    if (id) {
      // Update existing industry
      console.log('Updating industry with data:', { ...baseData, published });
      
      // Log the exact data being sent to the database
      console.log('Exact update data being sent to database:', {
        ...baseData,
        updated_at: new Date().toISOString(),
        published: published // Explicitly log the published flag
      });
      
      const { data: updatedData, error } = await supabase
        .from('industries')
        .update({
          ...baseData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select('*')
        .single();
        
      if (error) {
        console.error('Error updating industry:', error);
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }
      
      console.log('Updated industry data:', updatedData);
      result = updatedData;
    } else {
      // Create new industry
      console.log('Inserting new industry with data:', { ...baseData, published });
      
      // Double-check the published value
      console.log('Final published value before insert:', baseData.published);
      
      const { data: insertedData, error } = await supabase
        .from('industries')
        .insert({
          ...baseData,
        })
        .select('*')
        .single();
        
      if (error) {
        console.error('Error inserting industry:', error);
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }
      
      console.log('Inserted industry data:', insertedData);
      result = insertedData;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error handling industry submission:', error);
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
        { error: 'Industry ID is required' },
        { status: 400 }
      );
    }
    
    const supabase = await createServerClient();
    
    // Check if the industry exists
    const { data: industry, error: fetchError } = await supabase
      .from('industries')
      .select('id')
      .eq('id', id)
      .single();
      
    if (fetchError || !industry) {
      return NextResponse.json(
        { error: 'Industry not found' },
        { status: 404 }
      );
    }
    
    // Delete the industry
    const { error: deleteError } = await supabase
      .from('industries')
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
    console.error('Error deleting industry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}