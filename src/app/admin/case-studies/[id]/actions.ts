'use server';

import { createServiceRoleSupabaseClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';

export async function saveCaseStudy(values: any): Promise<any> {
  const startTime = Date.now();
  console.log('[CASE_STUDY_SAVE] Starting save operation for:', values.id, values.title);
  
  try {
    const supabase = createServiceRoleSupabaseClient();

    console.log('[CASE_STUDY_SAVE] Relationships to process:', {
      industries: values.industries?.length || 0,
      algorithms: values.algorithms?.length || 0,  
      personas: values.personas?.length || 0
    });

    // Upsert the main case study data
    const upsertStartTime = Date.now();
    console.log('[CASE_STUDY_SAVE] Starting main case study upsert...');
    
    const upsertData: any = {
      id: values.id,
      title: values.title,
      slug: values.slug,
      description: values.description,
      main_content: values.main_content,
      partner_companies: values.partner_companies,
      quantum_companies: values.quantum_companies,
      quantum_hardware: values.quantum_hardware,
      quantum_software: values.quantum_software,
      published: values.published,
      academic_references: values.academic_references || null,
      resource_links: values.resource_links || null,
      year: values.year || new Date().getFullYear(),
    };

    const { data, error } = await supabase
      .from('case_studies')
      .upsert(upsertData)
      .select()
      .single();

    const upsertTime = Date.now() - upsertStartTime;
    console.log(`[CASE_STUDY_SAVE] Main upsert completed in ${upsertTime}ms`);

    if (error || !data) {
      console.error("[CASE_STUDY_SAVE] Error upserting case study:", {
        error,
        upsertData: JSON.stringify(upsertData, null, 2)
      });
      throw new Error(error?.message || "Failed to save case study data.");
    }

    console.log('[CASE_STUDY_SAVE] Case study upserted successfully, starting relationships...');

    // Delete and recreate relationships
    const relationshipStartTime = Date.now();
    console.log('[CASE_STUDY_SAVE] Processing relationships using delete+insert pattern...');

    // Step 1: Delete all existing relationships in parallel
    console.log('[CASE_STUDY_SAVE] Deleting existing relationships...');
    const [industryDelResult, algorithmDelResult, personaDelResult] = await Promise.all([
      supabase
        .from('case_study_industry_relations' as any)
        .delete()
        .eq('case_study_id', data.id),
      supabase
        .from('algorithm_case_study_relations' as any)
        .delete()
        .eq('case_study_id', data.id),
      supabase
        .from('case_study_persona_relations' as any)
        .delete()
        .eq('case_study_id', data.id)
    ]);

    // Check for delete errors
    if (industryDelResult.error) {
      console.error('[CASE_STUDY_SAVE] Error deleting industry relationships:', industryDelResult.error);
    }
    if (algorithmDelResult.error) {
      console.error('[CASE_STUDY_SAVE] Error deleting algorithm relationships:', algorithmDelResult.error);
    }
    if (personaDelResult.error) {
      console.error('[CASE_STUDY_SAVE] Error deleting persona relationships:', personaDelResult.error);
    }

    console.log('[CASE_STUDY_SAVE] All existing relationships deleted successfully');

    // Step 2: Prepare new relationships from form data
    console.log('[CASE_STUDY_SAVE] Preparing new relationships...');

    let industryRelations: any[] = [];
    let algorithmRelations: any[] = [];
    let personaRelations: any[] = [];

    // Industries - only process if array has items
    if (values.industries && Array.isArray(values.industries) && values.industries.length > 0) {
      industryRelations = values.industries.map((industryId: string) => ({
        case_study_id: data.id,
        industry_id: industryId
      }));
    }

    // Algorithms - only process if array has items
    if (values.algorithms && Array.isArray(values.algorithms) && values.algorithms.length > 0) {
      algorithmRelations = values.algorithms.map((algorithmId: string) => ({
        case_study_id: data.id,
        algorithm_id: algorithmId
      }));
    }

    // Personas - only process if array has items
    if (values.personas && Array.isArray(values.personas) && values.personas.length > 0) {
      personaRelations = values.personas.map((personaId: string) => ({
        case_study_id: data.id,
        persona_id: personaId
      }));
    }

    console.log('[CASE_STUDY_SAVE] New relationships prepared:', {
      industries: industryRelations.length,
      algorithms: algorithmRelations.length,
      personas: personaRelations.length
    });

    // Step 3: Insert all new relationships in parallel
    console.log('[CASE_STUDY_SAVE] Inserting new relationships...');
    
    const insertPromises = [];

    if (industryRelations.length > 0) {
      console.log(`[CASE_STUDY_SAVE] Inserting ${industryRelations.length} industry relations`);
      insertPromises.push(
        supabase
          .from('case_study_industry_relations' as any)
          .insert(industryRelations)
      );
    }

    if (algorithmRelations.length > 0) {
      console.log(`[CASE_STUDY_SAVE] Inserting ${algorithmRelations.length} algorithm relations`);
      insertPromises.push(
        supabase
          .from('algorithm_case_study_relations' as any)
          .insert(algorithmRelations)
      );
    }

    if (personaRelations.length > 0) {
      console.log(`[CASE_STUDY_SAVE] Inserting ${personaRelations.length} persona relations`);
      insertPromises.push(
        supabase
          .from('case_study_persona_relations' as any)
          .insert(personaRelations)
      );
    }

    // Execute all inserts in parallel
    if (insertPromises.length > 0) {
      const insertResults = await Promise.all(insertPromises);
      
      // Check for insert errors
      insertResults.forEach((result, index) => {
        if (result.error) {
          const type = index === 0 ? 'industry' : index === 1 ? 'algorithm' : 'persona';
          console.error(`[CASE_STUDY_SAVE] Error inserting ${type} relations:`, result.error);
        }
      });
    } else {
      console.log('[CASE_STUDY_SAVE] No relationships to insert');
    }

    const relationshipTime = Date.now() - relationshipStartTime;
    console.log(`[CASE_STUDY_SAVE] All relationships processed in ${relationshipTime}ms`);

    // Revalidate the admin cache
    revalidatePath('/admin/case-studies');

    const totalTime = Date.now() - startTime;
    console.log(`[CASE_STUDY_SAVE] Save operation completed successfully in ${totalTime}ms`);

    return {
      caseStudy: data,
      success: true
    };

  } catch (error: any) {
    const totalTime = Date.now() - startTime;
    console.error(`[CASE_STUDY_SAVE] Save operation failed after ${totalTime}ms:`, {
      error,
      message: error?.message,
      stack: error?.stack,
      caseStudyId: values.id,
      caseStudyTitle: values.title
    });
    
    return {
      error: error?.message || "Failed to save case study",
      success: false
    };
  }
}

export async function publishCaseStudy(id: string, slug: string): Promise<any> {
  try {
    const supabase = createServiceRoleSupabaseClient();
    const { error } = await supabase
      .from('case_studies')
      .update({ 
        published: true,
        published_at: new Date().toISOString()
      })
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    
    // Revalidate paths
    revalidatePath('/admin/case-studies');
    revalidatePath(`/case-studies/${slug}`);
    revalidatePath('/case-studies');
    
    return { success: true };
  } catch (error: any) {
    console.error("Error publishing case study:", error);
    return { 
      error: error?.message || "Failed to publish case study",
      success: false
    };
  }
}

export async function unpublishCaseStudy(id: string, slug: string): Promise<any> {
  try {
    const supabase = createServiceRoleSupabaseClient();
    const { error } = await supabase
      .from('case_studies')
      .update({ 
        published: false,
        published_at: null
      })
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    
    // Revalidate paths
    revalidatePath('/admin/case-studies');
    revalidatePath(`/case-studies/${slug}`);
    revalidatePath('/case-studies');
    
    return { success: true };
  } catch (error: any) {
    console.error("Error unpublishing case study:", error);
    return { 
      error: error?.message || "Failed to unpublish case study",
      success: false
    };
  }
}