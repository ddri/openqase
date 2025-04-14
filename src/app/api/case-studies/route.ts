import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';

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
    const featured = searchParams.get('featured') === 'true';
    const tags = searchParams.get('tags')?.split(',').filter(Boolean);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = Math.min(
      parseInt(searchParams.get('pageSize') || String(DEFAULT_PAGE_SIZE)),
      MAX_PAGE_SIZE
    );
    
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    let query = supabase
      .from('case_studies')
      .select(`
        *,
        industries (*),
        algorithms (*),
        count(*) over() as total_count
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

    if (featured) {
      query = query.eq('featured', true);
    }

    if (tags?.length) {
      query = query.contains('tags', tags);
    }

    const { data, error, count } = await query;

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch case studies' },
        { status: 500 }
      );
    }

    // Remove the total_count from each row and put it in the response metadata
    const items = data?.map(({ total_count, ...item }: any) => item as CaseStudyRow) || [];
    
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

    // Check if user is admin
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get form data
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const content = formData.get('content') as string;
    const partner_companies = (formData.get('partner_companies') as string)
      ?.split(',')
      .map((s) => s.trim())
      .filter(Boolean) || null;
    const quantum_companies = (formData.get('quantum_companies') as string)
      ?.split(',')
      .map((s) => s.trim())
      .filter(Boolean) || null;
    const url = formData.get('url') as string;
    const industries = formData.getAll('industries[]') as string[];
    const algorithms = formData.getAll('algorithms[]') as string[];
    const personas = formData.getAll('personas[]') as string[];
    const quantum_hardware = (formData.get('quantum_hardware') as string)
      ?.split(',')
      .map((s) => s.trim())
      .filter(Boolean) || null;
    const classical_hardware = (formData.get('classical_hardware') as string)
      ?.split(',')
      .map((s) => s.trim())
      .filter(Boolean) || null;
    const published = formData.get('published') === 'on';
    const featured = formData.get('featured') === 'on';

    // Prepare the data object with correct types
    const baseData: Omit<CaseStudyInsert, 'published_at' | 'created_at' | 'updated_at'> = {
      title,
      slug,
      description: description || undefined,
      content: content || undefined,
      partner_companies: partner_companies?.length ? partner_companies : undefined,
      quantum_companies: quantum_companies?.length ? quantum_companies : undefined,
      url: url || undefined,
      industries: industries?.length ? industries : undefined,
      algorithms: algorithms?.length ? algorithms : undefined,
      personas: personas?.length ? personas : undefined,
      quantum_hardware: quantum_hardware?.length ? quantum_hardware : undefined,
      classical_hardware: classical_hardware?.length ? classical_hardware : undefined,
      published: published || undefined,
      featured: featured || undefined,
    };

    let result: CaseStudyRow | null = null;
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