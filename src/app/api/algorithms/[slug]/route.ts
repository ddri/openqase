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
        industries,
        quantum_hardware,
        published_at
      `)
      .contains('algorithms', [slug])
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(5);

    // Get industries where this algorithm is commonly used
    const { data: commonIndustries, error: industriesError } = await supabase
      .from('case_studies')
      .select('industries')
      .contains('algorithms', [slug])
      .eq('published', true);

    // Extract unique industries from case studies
    const uniqueIndustries = commonIndustries
      ? [...new Set(commonIndustries.flatMap(c => c.industries || []))]
      : [];

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