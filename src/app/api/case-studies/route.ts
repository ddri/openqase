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
    const featured = searchParams.get('featured') === 'true';
    const tags = searchParams.get('tags')?.split(',').filter(Boolean);
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
      console.error('Error fetching case studies:', error);
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
    const supabase = await createServerClient();

    // Get form data
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string || null;
    const content = formData.get('content') as string || null;
    const mdx_content = formData.get('mdx_content') as string || null;
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
    const technologies = (formData.get('technologies') as string)
      ?.split(',')
      .map((s) => s.trim())
      .filter(Boolean) || null;
    const tags = (formData.get('tags') as string)
      ?.split(',')
      .map((s) => s.trim())
      .filter(Boolean) || null;
    const difficulty = formData.get('difficulty') as string || null;
    const metrics = formData.get('metrics') ? JSON.parse(formData.get('metrics') as string) : null;
    const published = formData.get('published') === 'on';
    const featured = formData.get('featured') === 'on';

    // Prepare the data object with correct types
    const baseData: Omit<CaseStudyInsert, 'published_at' | 'created_at' | 'updated_at'> = {
      title,
      slug,
      description,
      content,
      mdx_content,
      partner_companies,
      quantum_companies,
      url,
      industries: industries || [],
      algorithms: algorithms || [],
      personas: personas || [],
      quantum_hardware,
      technologies,
      tags,
      difficulty,
      metrics,
      published,
      featured
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