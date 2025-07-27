import { NextRequest, NextResponse } from 'next/server';
import { createServiceRoleSupabaseClient } from '@/lib/supabase-server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ batchId: string }> }
) {
  const { batchId } = await params;
  try {
    const body = await request.json();
    const { item_id, industries, personas, algorithms, user_id } = body;

    if (!item_id || !user_id) {
      return NextResponse.json(
        { error: 'Missing required fields: item_id and user_id' },
        { status: 400 }
      );
    }

    const supabase = createServiceRoleSupabaseClient();

    // Get the current staging case study to update mapping quality
    const { data: currentItem, error: fetchError } = await supabase
      .from('staging_case_studies')
      .select('mapping_quality, qookie_data')
      .eq('id', item_id)
      .eq('batch_id', batchId)
      .single();

    if (fetchError || !currentItem) {
      return NextResponse.json(
        { error: 'Case study not found' },
        { status: 404 }
      );
    }

    // Update the case study with new mappings
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (industries !== undefined) {
      updateData.industries = industries;
    }
    if (personas !== undefined) {
      updateData.personas = personas;
    }
    if (algorithms !== undefined) {
      updateData.algorithms = algorithms;
    }

    // Update mapping quality to reflect manual corrections
    if (currentItem.mapping_quality) {
      const mappingQuality = { ...currentItem.mapping_quality };
      
      // For manually corrected mappings, move them to exact matches
      if (industries !== undefined) {
        // Remove from failed matches and add to exact matches
        mappingQuality.industries.failed_matches = mappingQuality.industries.failed_matches.filter(
          (item: string) => !industries.includes(item)
        );
        // Add to exact matches if not already there
        industries.forEach((industry: string) => {
          if (!mappingQuality.industries.exact_matches.includes(industry)) {
            mappingQuality.industries.exact_matches.push(industry);
          }
        });
      }

      if (personas !== undefined) {
        mappingQuality.personas.failed_matches = mappingQuality.personas.failed_matches.filter(
          (item: string) => !personas.includes(item)
        );
        personas.forEach((persona: string) => {
          if (!mappingQuality.personas.exact_matches.includes(persona)) {
            mappingQuality.personas.exact_matches.push(persona);
          }
        });
      }

      if (algorithms !== undefined) {
        mappingQuality.algorithms.failed_matches = mappingQuality.algorithms.failed_matches.filter(
          (item: string) => !algorithms.includes(item)
        );
        algorithms.forEach((algorithm: string) => {
          if (!mappingQuality.algorithms.exact_matches.includes(algorithm)) {
            mappingQuality.algorithms.exact_matches.push(algorithm);
          }
        });
      }

      // Recalculate overall score
      const totalMappings = 
        mappingQuality.industries.exact_matches.length + 
        mappingQuality.industries.fuzzy_matches.length + 
        mappingQuality.industries.failed_matches.length +
        mappingQuality.personas.exact_matches.length + 
        mappingQuality.personas.fuzzy_matches.length + 
        mappingQuality.personas.failed_matches.length +
        mappingQuality.algorithms.exact_matches.length + 
        mappingQuality.algorithms.fuzzy_matches.length + 
        mappingQuality.algorithms.failed_matches.length;

      const successfulMappings = 
        mappingQuality.industries.exact_matches.length + 
        mappingQuality.industries.fuzzy_matches.length +
        mappingQuality.personas.exact_matches.length + 
        mappingQuality.personas.fuzzy_matches.length +
        mappingQuality.algorithms.exact_matches.length + 
        mappingQuality.algorithms.fuzzy_matches.length;

      mappingQuality.overall_score = totalMappings > 0 ? (successfulMappings / totalMappings) * 100 : 0;

      updateData.mapping_quality = mappingQuality;
    }

    // Update the staging case study
    const { data: updatedItem, error: updateError } = await supabase
      .from('staging_case_studies')
      .update(updateData)
      .eq('id', item_id)
      .eq('batch_id', batchId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating case study mapping:', updateError);
      return NextResponse.json(
        { error: 'Failed to update mapping' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      updated_item: updatedItem
    });

  } catch (error) {
    console.error('Error in mapping update:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}