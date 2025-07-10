'use server';

import { createServiceRoleSupabaseClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';

export async function saveCaseStudy(values: any): Promise<any> {
  try {
    // --- START OF DEBUG LOGS ---
    // console.log('saveCaseStudy received values:', JSON.stringify(values, null, 2));
    // const notApplicableStates = values.notApplicableStates || {}; 
    // console.log('Admin save: notApplicableStates:', notApplicableStates);
    // console.log('Admin save: values.industries:', values.industries);
    // console.log('Admin save: values.algorithms:', values.algorithms);
    // console.log('Admin save: values.personas:', values.personas);
    // --- END OF DEBUG LOGS ---

    const supabase = createServiceRoleSupabaseClient();
    
    const notApplicableStates = values.notApplicableStates || {};

    // Upsert the main case study data
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

    if (error || !data) {
      console.error("Error upserting case study:", error);
      throw new Error(error?.message || "Failed to save case study data.");
    }

    // Handle industry relationships (delete and re-create)
    let industryDelError = await supabase
      .from('case_study_industry_relations' as any)
      .delete()
      .eq('case_study_id', data?.id);

    if (industryDelError && industryDelError.error) {
        console.error("Error deleting industry relationships:", industryDelError.error);
        // Consider if you want to throw or just log, depending on desired transactionality
    }

    if (!notApplicableStates.industries && values.industries && Array.isArray(values.industries) && values.industries.length > 0) {
      // Batch insert all industry relations at once
      const industryRelations = values.industries.map(industryId => ({
        case_study_id: data.id,
        industry_id: industryId
      }));
      
      const { error: industryRelError } = await supabase
        .from('case_study_industry_relations' as any)
        .insert(industryRelations);
        
      if (industryRelError) {
        console.error('Error inserting industry relations:', industryRelError);
      }
    } else if (notApplicableStates.industries) {
      // If "Not Applicable" is checked for industries, insert the N/A record
      const NOT_APPLICABLE_INDUSTRY_ID = '4cd2a6a0-6dc1-49ba-893c-f24eebaf384a';
      await supabase
        .from('case_study_industry_relations' as any)
        .insert({ case_study_id: data.id, industry_id: NOT_APPLICABLE_INDUSTRY_ID });
    }

    // Handle algorithm relationships (delete and re-create)
    let algorithmDelError = await supabase
        .from('algorithm_case_study_relations' as any)
        .delete()
        .eq('case_study_id', data?.id);

    if (algorithmDelError && algorithmDelError.error) {
        console.error("Error deleting algorithm relationships:", algorithmDelError.error);
    }

    if (!notApplicableStates.algorithms && values.algorithms && Array.isArray(values.algorithms) && values.algorithms.length > 0) {
      // Batch insert all algorithm relations at once
      const algorithmRelations = values.algorithms.map(algorithmId => ({
        case_study_id: data.id,
        algorithm_id: algorithmId
      }));
      
      const { error: algorithmRelError } = await supabase
        .from('algorithm_case_study_relations' as any)
        .insert(algorithmRelations);
        
      if (algorithmRelError) {
        console.error('Error inserting algorithm relations:', algorithmRelError);
      }
    } else if (notApplicableStates.algorithms) {
      const NOT_APPLICABLE_ALGORITHM_ID = '5bb7190e-d0df-46cc-a459-2eea19856fb1';
      await supabase
        .from('algorithm_case_study_relations' as any)
        .insert({ case_study_id: data.id, algorithm_id: NOT_APPLICABLE_ALGORITHM_ID });
    }

    // Handle persona relationships (delete and re-create)
    let personaDelError = await supabase
        .from('case_study_persona_relations' as any)
        .delete()
        .eq('case_study_id', data?.id);

    if (personaDelError && personaDelError.error) {
        console.error("Error deleting persona relationships:", personaDelError.error);
    }
    
    if (!notApplicableStates.personas && values.personas && Array.isArray(values.personas) && values.personas.length > 0) {
      // Batch insert all persona relations at once
      const personaRelations = values.personas.map(personaId => ({
        case_study_id: data.id,
        persona_id: personaId
      }));
      
      const { error: personaRelError } = await supabase
        .from('case_study_persona_relations' as any)
        .insert(personaRelations);
        
      if (personaRelError) {
        console.error('Error inserting persona relations:', personaRelError);
      }
    } else if (notApplicableStates.personas) {
      const NOT_APPLICABLE_PERSONA_ID = 'd1c1c7e7-2847-4bf3-b165-3bd84a99f3a6';
      await supabase
        .from('case_study_persona_relations' as any)
        .insert({ case_study_id: data.id, persona_id: NOT_APPLICABLE_PERSONA_ID });
    }

    revalidatePath('/admin/case-studies');
    revalidatePath(`/case-study/${data.slug}`);
    return { caseStudy: data, error: null };

  } catch (e: any) {
    console.error('Full error in saveCaseStudy:', e);
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