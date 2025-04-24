'use server';

import { createServiceRoleSupabaseClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';

export async function saveCaseStudy(values: any): Promise<void> {
  try {
    const supabase = createServiceRoleSupabaseClient();
    const { data, error } = await supabase
      .from('case_studies')
      .upsert({
        id: values.id,
        title: values.title,
        slug: values.slug,
        description: values.description,
        main_content: values.main_content,
        partner_companies: values.partner_companies,
        quantum_hardware: values.quantum_hardware,
        published: values.published,
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

    for (const industryId of values.industries) {
        let insertError = await supabase
            .from('case_study_industry_relations' as any)
            .insert({ case_study_id: data?.id, industry_id: industryId });

        if (insertError && insertError.error) {
            console.error("Error inserting industry relationship:", insertError.error);
            throw new Error(insertError.error.message || "Failed to insert industry relationship");
        }
    }

    // Handle algorithm relationships (delete and re-create)
    let algorithmError = await supabase
      .from('case_study_algorithm_relations' as any)
      .delete()
      .eq('case_study_id', data?.id);

    if (algorithmError && algorithmError.error) {
        console.error("Error deleting algorithm relationships:", algorithmError.error);
        throw new Error(algorithmError.error.message || "Failed to delete algorithm relationships");
    }

    for (const algorithmId of values.algorithms) {
        let insertError = await supabase
            .from('case_study_algorithm_relations' as any)
            .insert({ case_study_id: data?.id, algorithm_id: algorithmId });

        if (insertError && insertError.error) {
            console.error("Error inserting algorithm relationship:", insertError.error);
            throw new Error(insertError.error.message || "Failed to insert algorithm relationship");
        }
    }
    
    revalidatePath('/admin/case-studies');
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