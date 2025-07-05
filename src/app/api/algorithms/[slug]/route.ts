import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    // First get the algorithm
    const { data: algorithm, error: algorithmError } = await supabase
      .from('algorithms')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (algorithmError) {
      if (algorithmError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Algorithm not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to fetch algorithm' },
        { status: 500 }
      );
    }

    // TODO: Fix to use junction tables for algorithm-case study relationships
    // Then get related case studies through algorithm_case_study_relations
    const { data: relatedCases, error: casesError } = await supabase
      .from('case_studies')
      .select(`
        id,
        slug,
        title,
        description,
        partner_companies,
        quantum_companies,
        quantum_hardware,
        published_at
      `)
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(5);

    // TODO: Get industries through case_study_industry_relations junction table
    const uniqueIndustries: string[] = [];

    if (casesError) {
      console.error('Error fetching related cases:', casesError);
      // Don't fail the whole request if related cases fail
      return NextResponse.json({
        ...algorithm,
        related_cases: [],
        common_industries: uniqueIndustries
      });
    }

    return NextResponse.json({
      ...algorithm,
      related_cases: relatedCases,
      common_industries: uniqueIndustries
    });
  } catch (error) {
    console.error('Algorithm API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 