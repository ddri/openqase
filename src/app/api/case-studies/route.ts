import { NextRequest, NextResponse } from 'next/server';
import { Database } from '@/types/supabase';
import { createServerClient } from '@/lib/supabase-server';

type Tables = Database['public']['Tables']
type CaseStudyRow = Tables['case_studies']['Row']
type CaseStudyInsert = Tables['case_studies']['Insert']
type CaseStudyUpdate = Tables['case_studies']['Update']

const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 50;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const industry = searchParams.get('industry');
    const algorithm = searchParams.get('algorithm');
    // Note: featured property doesn't exist in the database schema
    // const featured = searchParams.get('featured') === 'true';
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = Math.min(
      parseInt(searchParams.get('pageSize') || String(DEFAULT_PAGE_SIZE)),
      MAX_PAGE_SIZE
    );
    
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    // Use createServerClient to get authenticated client
    const supabase = await createServerClient();
    
    let query = supabase
      .from('case_studies')
      .select(`
        *,
        industries (*),
        algorithms (*)
      `, { count: 'exact' })
      .eq('published', true)
      .order('published_at', { ascending: false })
      .range(from, to);

    if (industry) {
      query = query.contains('industries', [industry]);
    }

    if (algorithm) {
      query = query.contains('algorithms', [algorithm]);
    }

    // Note: featured property doesn't exist in the database schema
    // if (featured) {
    //   query = query.eq('featured', true);
    // }

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching case studies:', error);
      return NextResponse.json(
        { error: 'Failed to fetch case studies' },
        { status: 500 }
      );
    }

    // Process the items
    const items = data || [];
    
    return NextResponse.json({
      items,
      metadata: {
        total: count || 0,
        page,
        pageSize,
        totalPages: Math.ceil((count || 0) / pageSize)
      }
    });
  } catch (error) {
    console.error('Case Studies API Error:', error);
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
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string || null;
    const main_content = formData.get('main_content') as string || null;
    const partner_companies = (formData.get('partner_companies') as string)
      ?.split(',')
      .map((s) => s.trim())
      .filter(Boolean) || null;
    const quantum_companies = (formData.get('quantum_companies') as string)
      ?.split(',')
      .map((s) => s.trim())
      .filter(Boolean) || null;
    const url = formData.get('url') as string || null;
    const industries = formData.getAll('industries[]') as string[];
    const algorithms = formData.getAll('algorithms[]') as string[];
    const personas = formData.getAll('personas[]') as string[];
    const quantum_hardware = (formData.get('quantum_hardware') as string)
      ?.split(',')
      .map((s) => s.trim())
      .filter(Boolean) || null;
    const published = formData.get('published') === 'on';
    // Note: featured property doesn't exist in the database schema
    // const featured = formData.get('featured') === 'on';

    // Prepare the data object with correct types
    const baseData: Omit<CaseStudyInsert, 'published_at' | 'created_at' | 'updated_at'> = {
      title,
      slug,
      description,
      main_content,
      partner_companies,
      quantum_companies,
      url,
      industries: industries || [],
      algorithms: algorithms || [],
      personas: personas || [],
      quantum_hardware,
      published
      // Note: featured property doesn't exist in the database schema
    };

    let result;
    if (id) {
      // Update existing case study
      const { data: updatedData, error } = await supabase
        .from('case_studies')
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
    } else {
      // Create new case study
      const { data: insertedData, error } = await supabase
        .from('case_studies')
        .insert({
          ...baseData,
          published_at: published ? new Date().toISOString() : null,
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
    console.error('Error handling case study submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 