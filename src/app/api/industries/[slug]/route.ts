import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    // First get the industry
    const { data: industry, error: industryError } = await supabase
      .from('industries')
      .select('*')
      .eq('slug', slug)
      .single();

    if (industryError) {
      if (industryError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Industry not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to fetch industry' },
        { status: 500 }
      );
    }

    // Then get related case studies
    const { data: relatedCases, error: casesError } = await supabase
      .from('case_studies')
      .select(`
        id,
        slug,
        title,
        description,
        partner_companies,
        quantum_companies,
        algorithms,
        published_at
      `)
      .contains('industries', [slug])
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(5);

    // Get commonly used algorithms in this industry
    const { data: commonAlgorithms, error: algoError } = await supabase
      .from('algorithms')
      .select('*')
      .filter('published', 'eq', true)
      .order('name');

    if (casesError) {
      console.error('Error fetching related cases:', casesError);
      // Don't fail the whole request if related cases fail
      return NextResponse.json({
        ...industry,
        related_cases: [],
        common_algorithms: commonAlgorithms || []
      });
    }

    return NextResponse.json({
      ...industry,
      related_cases: relatedCases,
      common_algorithms: commonAlgorithms || []
    });
  } catch (error) {
    console.error('Industry API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 