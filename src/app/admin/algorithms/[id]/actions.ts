'use server';

import { createServiceRoleSupabaseClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';

export async function saveAlgorithm(values: any): Promise<any> {
  try {
    const supabase = createServiceRoleSupabaseClient();
    const { data, error } = await supabase
      .from('algorithms')
      .upsert({
        id: values.id,
        name: values.name,
        slug: values.slug,
        description: values.description,
        main_content: values.main_content,
        quantum_advantage: values.quantum_advantage,
        use_cases: values.use_cases,
        published: values.published,
      })
      .select()
      .single();
    
    if (error) {
      console.error("Error saving algorithm:", error);
      throw new Error(error.message || "Failed to save algorithm");
    }
    
    // Handle case study relationships (delete and re-create)
    let caseStudyError = await supabase
      .from('algorithm_case_study_relations' as any)
      .delete()
      .eq('algorithm_id', data?.id);

    if (caseStudyError && caseStudyError.error) {
        console.error("Error deleting case study relationships:", caseStudyError.error);
        throw new Error(caseStudyError.error.message || "Failed to delete case study relationships");
    }

    // If there are related case studies
    if (values.related_case_studies && values.related_case_studies.length > 0) {
        // First, get the case study IDs from their slugs if needed
        let caseStudyIds = values.related_case_studies;
        
        // If the first item looks like a slug (not a UUID), fetch the IDs
        if (caseStudyIds[0] && typeof caseStudyIds[0] === 'string' &&
            !caseStudyIds[0].match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
            
            const { data: caseStudies, error: fetchError } = await supabase
                .from('case_studies')
                .select('id, slug')
                .in('slug', caseStudyIds);
                
            if (fetchError) {
                console.error("Error fetching case studies by slug:", fetchError);
                throw new Error(fetchError.message || "Failed to fetch case studies");
            }
            
            // Map slugs to IDs
            caseStudyIds = caseStudies.map(cs => cs.id);
        }
        
        // Insert relationships with proper IDs
        for (const caseStudyId of caseStudyIds) {
            let insertError = await supabase
                .from('algorithm_case_study_relations' as any)
                .insert({ algorithm_id: data?.id, case_study_id: caseStudyId });

            if (insertError && insertError.error) {
                console.error("Error inserting case study relationship:", insertError.error);
                throw new Error(insertError.error.message || "Failed to insert case study relationship");
            }
        }
    }

    // Handle industry relationships (delete and re-create)
    let industryError = await supabase
      .from('algorithm_industry_relations' as any)
      .delete()
      .eq('algorithm_id', data?.id);

    if (industryError && industryError.error) {
        console.error("Error deleting industry relationships:", industryError.error);
        throw new Error(industryError.error.message || "Failed to delete industry relationships");
    }

    // If there are related industries
    if (values.related_industries && values.related_industries.length > 0) {
        // First, get the industry IDs from their slugs if needed
        let industryIds = values.related_industries;
        
        // If the first item looks like a slug (not a UUID), fetch the IDs
        if (industryIds[0] && typeof industryIds[0] === 'string' &&
            !industryIds[0].match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
            
            const { data: industries, error: fetchError } = await supabase
                .from('industries')
                .select('id, slug')
                .in('slug', industryIds);
                
            if (fetchError) {
                console.error("Error fetching industries by slug:", fetchError);
                throw new Error(fetchError.message || "Failed to fetch industries");
            }
            
            // Map slugs to IDs
            industryIds = industries.map(ind => ind.id);
        }
        
        // Insert relationships with proper IDs
        for (const industryId of industryIds) {
            let insertError = await supabase
                .from('algorithm_industry_relations' as any)
                .insert({ algorithm_id: data?.id, industry_id: industryId });

            if (insertError && insertError.error) {
                console.error("Error inserting industry relationship:", insertError.error);
                throw new Error(insertError.error.message || "Failed to insert industry relationship");
            }
        }
    }
    
    revalidatePath('/admin/algorithms');
    
    // Return the saved data
    return data;
  } catch (error: any) {
    console.error("Error saving algorithm:", error);
    throw new Error(error.message || "Failed to save algorithm");
  }
}

export async function publishAlgorithm(id: string): Promise<void> {
  try {
    const supabase = createServiceRoleSupabaseClient();
    const { error } = await supabase
      .from('algorithms')
      .update({ published: true })
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    revalidatePath('/admin/algorithms');
  } catch (error: any) {
    console.error("Error publishing algorithm:", error);
    throw new Error(error.message || "Failed to publish algorithm");
  }
}

export async function unpublishAlgorithm(id: string): Promise<void> {
  try {
    const supabase = createServiceRoleSupabaseClient();
    const { error } = await supabase
      .from('algorithms')
      .update({ published: false })
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    revalidatePath('/admin/algorithms');
  } catch (error: any) {
    console.error("Error unpublishing algorithm:", error);
    throw new Error(error.message || "Failed to unpublish algorithm");
  }
}