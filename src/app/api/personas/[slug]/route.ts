import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // First get the persona
    const { data: persona, error: personaError } = await supabase
      .from('personas')
      .select(`
        *,
        industry,
        key_interests
      `)
      .eq('slug', slug)
      .single();

    if (personaError) {
      if (personaError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Persona not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to fetch persona' },
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
        published_at
      `)
      .contains('personas', [slug])
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(5);

    if (casesError) {
      console.error('Error fetching related cases:', casesError);
      // Don't fail the whole request if related cases fail
      return NextResponse.json({
        ...persona,
        related_cases: []
      });
    }

    return NextResponse.json({
      ...persona,
      related_cases: relatedCases
    });
  } catch (error) {
    console.error('Persona API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 