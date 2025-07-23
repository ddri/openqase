import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    const { data, error } = await supabase
      .from('case_studies')
      .select(`
        *,
        industries (*),
        algorithms (*)
      `)
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Case study not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to fetch case study' },
        { status: 500 }
      );
    }

    // Get related case studies based on shared industries
    let relatedQuery = supabase
      .from('case_studies')
      .select(`
        id,
        slug,
        title,
        description,
        industries,
        published_at,
        year
      `)
      .neq('slug', slug)
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(3);

    // Add filters for industries if they exist
    if (data.industries?.length) {
      relatedQuery = relatedQuery.overlaps('industries', data.industries);
    }

    const { data: relatedCases, error: relatedError } = await relatedQuery;

    if (relatedError) {
      console.error('Error fetching related cases:', relatedError);
      // Don't fail the whole request if related cases fail
      return NextResponse.json({
        ...data,
        related_cases: []
      });
    }

    return NextResponse.json({
      ...data,
      related_cases: relatedCases || []
    });
  } catch (error) {
    console.error('Case Study API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 