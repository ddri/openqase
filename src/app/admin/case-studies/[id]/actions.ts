'use server';

import { createServiceRoleSupabaseClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';

export async function saveCaseStudy(values: any): Promise<any> {
  const startTime = Date.now();
  console.log('[CASE_STUDY_SAVE] Starting save operation for:', values.id, values.title);
  
  try {
    const supabase = createServiceRoleSupabaseClient();
    const notApplicableStates = values.notApplicableStates || {};

    console.log('[CASE_STUDY_SAVE] Not applicable states:', notApplicableStates);
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

    // Simple delete+insert pattern (industry standard)
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

    // Step 2: Prepare new relationships based on form data
    console.log('[CASE_STUDY_SAVE] Preparing new relationships...');

    // Determine new relationship IDs based on form data and N/A states
    let industryRelations: any[] = [];
    let algorithmRelations: any[] = [];
    let personaRelations: any[] = [];

    // Industries
    if (notApplicableStates.industries) {
      industryRelations = [{
        case_study_id: data.id,
        industry_id: '4cd2a6a0-6dc1-49ba-893c-f24eebaf384a' // N/A industry ID
      }];
    } else if (values.industries && Array.isArray(values.industries) && values.industries.length > 0) {
      industryRelations = values.industries.map((industryId: string) => ({
        case_study_id: data.id,
        industry_id: industryId
      }));
    }

    // Algorithms
    if (notApplicableStates.algorithms) {
      algorithmRelations = [{
        case_study_id: data.id,
        algorithm_id: '5bb7190e-d0df-46cc-a459-2eea19856fb1' // N/A algorithm ID
      }];
    } else if (values.algorithms && Array.isArray(values.algorithms) && values.algorithms.length > 0) {
      algorithmRelations = values.algorithms.map((algorithmId: string) => ({
        case_study_id: data.id,
        algorithm_id: algorithmId
      }));
    }

    // Personas
    if (notApplicableStates.personas) {
      personaRelations = [{
        case_study_id: data.id,
        persona_id: 'd1c1c7e7-2847-4bf3-b165-3bd84a99f3a6' // N/A persona ID
      }];
    } else if (values.personas && Array.isArray(values.personas) && values.personas.length > 0) {
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

    // Step 3: Insert all new relationships in parallel (batch inserts)
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
      
      console.log('[CASE_STUDY_SAVE] All new relationships inserted successfully');
    } else {
      console.log('[CASE_STUDY_SAVE] No relationships to insert');
    }

    const relationshipTime = Date.now() - relationshipStartTime;
    console.log(`[CASE_STUDY_SAVE] All relationship processing completed in ${relationshipTime}ms`);

    console.log('[CASE_STUDY_SAVE] Starting revalidation...');
    const revalidateStartTime = Date.now();
    
    revalidatePath('/admin/case-studies');
    revalidatePath(`/case-study/${data.slug}`);
    
    const revalidateTime = Date.now() - revalidateStartTime;
    const totalTime = Date.now() - startTime;
    
    console.log(`[CASE_STUDY_SAVE] Revalidation completed in ${revalidateTime}ms`);
    console.log(`[CASE_STUDY_SAVE] ✅ Save operation completed successfully in ${totalTime}ms`);
    console.log(`[CASE_STUDY_SAVE] Performance breakdown: upsert=${upsertTime}ms, relationship=${relationshipTime}ms, revalidate=${revalidateTime}ms`);
    
    return { caseStudy: data, error: null };

  } catch (e: any) {
    const totalTime = Date.now() - startTime;
    console.error(`[CASE_STUDY_SAVE] ❌ Save operation failed after ${totalTime}ms:`, {
      error: e,
      message: e.message,
      stack: e.stack,
      caseStudyId: values.id,
      caseStudyTitle: values.title
    });
    return { caseStudy: null, error: e.message || 'An unknown error occurred' };
  }
}

export async function publishCaseStudy(id: string, slug: string) {
  const supabase = createServiceRoleSupabaseClient();
  const { data, error } = await supabase
    .from('case_studies')
    .update({ published: true, published_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error publishing case study:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/case-studies');
  revalidatePath(`/case-study/${slug}`);
  revalidatePath('/case-study'); // revalidate the listing page
  revalidatePath('/'); // revalidate homepage if it lists case studies

  return { success: true, data };
}

export async function unpublishCaseStudy(id: string, slug: string) {
  const supabase = createServiceRoleSupabaseClient();
  const { data, error } = await supabase
    .from('case_studies')
    .update({ published: false })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error unpublishing case study:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/case-studies');
  revalidatePath(`/case-study/${slug}`);
  revalidatePath('/case-study');
  revalidatePath('/');
  
  return { success: true, data };
}