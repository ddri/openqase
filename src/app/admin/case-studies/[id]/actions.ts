'use server';

import { createServiceRoleSupabaseClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';

export async function saveCaseStudy(values: any): Promise<any> {
  try {
    const supabase = createServiceRoleSupabaseClient();
    
    // Extract not applicable states if present
    const notApplicableStates = values.notApplicableStates || {};
    
    const { data, error } = await supabase
      .from('case_studies')
      .upsert({
        id: values.id,
        title: values.title,
        slug: values.slug,
        description: values.description,
        main_content: values.main_content,
        partner_companies: values.partner_companies,
        quantum_companies: values.quantum_companies,
        quantum_hardware: values.quantum_hardware,
        published: values.published,
        academic_references: values.academic_references || null,
        resource_links: values.resource_links || null,
      })
      .select()
      .single();
    
    if (error) {
      console.error("Error saving case study:", error);
      throw new Error(error.message || "Failed to save case study");
    }
    
    // Handle industry relationships (delete and re-create)
    let industryError = await supabase
      .from('case_study_industry_relations' as any)
      .delete()
      .eq('case_study_id', data?.id);

    if (industryError && industryError.error) {
        console.error("Error deleting industry relationships:", industryError.error);
        throw new Error(industryError.error.message || "Failed to delete industry relationships");
    }

    // Only add relationships if not marked as N/A and there are items to add
    if (!notApplicableStates.industries && values.industries && Array.isArray(values.industries) && values.industries.length > 0) {
      for (const industryId of values.industries) {
          let insertError = await supabase
              .from('case_study_industry_relations' as any)
              .insert({ case_study_id: data?.id, industry_id: industryId });

          if (insertError && insertError.error) {
              console.error("Error inserting industry relationship:", insertError.error);
              throw new Error(insertError.error.message || "Failed to insert industry relationship");
          }
      }
    }

    // Handle algorithm relationships (delete and re-create)
    let algorithmError = await supabase
      .from('algorithm_case_study_relations' as any)
      .delete()
      .eq('case_study_id', data?.id);

    if (algorithmError && algorithmError.error) {
        console.error("Error deleting algorithm relationships:", algorithmError.error);
        throw new Error(algorithmError.error.message || "Failed to delete algorithm relationships");
    }

    // Only add relationships if not marked as N/A and there are items to add
    if (!notApplicableStates.algorithms && values.algorithms && Array.isArray(values.algorithms) && values.algorithms.length > 0) {
      for (const algorithmId of values.algorithms) {
          let insertError = await supabase
              .from('algorithm_case_study_relations' as any)
              .insert({ case_study_id: data?.id, algorithm_id: algorithmId });

          if (insertError && insertError.error) {
              console.error("Error inserting algorithm relationship:", insertError.error);
              throw new Error(insertError.error.message || "Failed to insert algorithm relationship");
          }
      }
    }
    
    // Handle persona relationships (delete and re-create)
    let personaError = await supabase
      .from('case_study_persona_relations' as any)
      .delete()
      .eq('case_study_id', data?.id);

    if (personaError && personaError.error) {
        console.error("Error deleting persona relationships:", personaError.error);
        throw new Error(personaError.error.message || "Failed to delete persona relationships");
    }

    // Only add relationships if not marked as N/A and there are items to add
    if (!notApplicableStates.personas && values.personas && Array.isArray(values.personas) && values.personas.length > 0) {
      for (const personaId of values.personas) {
          let insertError = await supabase
              .from('case_study_persona_relations' as any)
              .insert({ case_study_id: data?.id, persona_id: personaId });

          if (insertError && insertError.error) {
              console.error("Error inserting persona relationship:", insertError.error);
              throw new Error(insertError.error.message || "Failed to insert persona relationship");
          }
      }
    }
    
    revalidatePath('/admin/case-studies');
    
    // Return the saved data
    return data;
  } catch (error: any) {
    console.error("Error saving case study:", error);
    throw new Error(error.message || "Failed to save case study");
  }
}

export async function publishCaseStudy(id: string): Promise<void> {
  try {
    const supabase = createServiceRoleSupabaseClient();
    const { error } = await supabase
      .from('case_studies')
      .update({ published: true })
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    revalidatePath('/admin/case-studies');
  } catch (error: any) {
    console.error("Error publishing case study:", error);
    throw new Error(error.message || "Failed to publish case study");
  }
}

export async function unpublishCaseStudy(id: string): Promise<void> {
  try {
    const supabase = createServiceRoleSupabaseClient();
    const { error } = await supabase
      .from('case_studies')
      .update({ published: false })
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    revalidatePath('/admin/case-studies');
  } catch (error: any) {
    console.error("Error unpublishing case study:", error);
    throw new Error(error.message || "Failed to unpublish case study");
  }
}