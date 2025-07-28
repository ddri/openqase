import { NextRequest, NextResponse } from 'next/server';
import { createServiceRoleSupabaseClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ batchId: string }> }
) {
  // TODO: Import system disabled for performance testing
  return NextResponse.json(
    { error: 'Import system temporarily disabled' },
    { status: 503 }
  );
  
  /*
  const resolvedParams = await params;
  try {
    const supabase = createServiceRoleSupabaseClient();
    const { caseStudyId, updates } = await request.json();

    if (!caseStudyId || !updates) {
      return NextResponse.json(
        { error: 'Missing caseStudyId or updates' },
        { status: 400 }
      );
    }

    // Update the staging case study with new mappings
    const updateData: any = {};
    
    if (updates.industries) {
      updateData.industries = updates.industries;
    }
    if (updates.personas) {
      updateData.personas = updates.personas;
    }
    if (updates.algorithms) {
      updateData.algorithms = updates.algorithms;
    }

    // Recalculate mapping quality
    if (updates.mapping_quality) {
      updateData.mapping_quality = updates.mapping_quality;
    }

    const { error } = await supabase
      .from('staging_case_studies' as any)
      .update(updateData)
      .eq('id', caseStudyId)
      .eq('batch_id', resolvedParams.batchId);

    if (error) {
      console.error('Failed to update mapping:', error);
      return NextResponse.json(
        { error: 'Failed to update mapping' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Mapping update API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
  */
}