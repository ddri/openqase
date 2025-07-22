'use server';

import { createServiceRoleSupabaseClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';
import { Database } from '@/types/supabase';

// Define a type for the expected structure of the returned persona data
type PersonaData = Database['public']['Tables']['personas']['Row'] | null;

export async function savePersona(values: any): Promise<any> {
  try {
    
    const supabase = createServiceRoleSupabaseClient();
    
    // Store the original industry array
    const industryIds = values.industry || [];
    
    // Remove industry from values to avoid storing it directly in the persona record
    const personaValues = { ...values };
    delete personaValues.industry;
    
    // Upsert the persona
    const { data, error } = await supabase
      .from('personas')
      .upsert({
        id: personaValues.id,
        name: personaValues.name,
        slug: personaValues.slug,
        description: personaValues.description,
        expertise: personaValues.expertise,
        main_content: personaValues.main_content,
        recommended_reading: personaValues.recommended_reading,
        published: personaValues.published,
      })
      .select()
      .single<PersonaData>();
    
    if (error) {
      console.error("Error saving persona:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      throw new Error(error.message || "Failed to save persona");
    }
    
    if (!data?.id) {
      throw new Error("Failed to save persona - no ID returned from database");
    }

    // Handle industry relationships (delete and re-create)
    let industryError = await supabase
      .from('persona_industry_relations')
      .delete()
      .eq('persona_id', data.id);

    if (industryError && industryError.error) {
        console.error("Error deleting industry relationships:", industryError.error);
        throw new Error(industryError.error.message || "Failed to delete industry relationships");
    }

    if (industryIds.length > 0 && data && data.id) {
      for (const industryId of industryIds) {
          let insertError = await supabase
              .from('persona_industry_relations')
              .insert({ persona_id: data.id, industry_id: industryId });

          if (insertError && insertError.error) {
              console.error("Error inserting industry relationship:", insertError.error);
              throw new Error(insertError.error.message || "Failed to insert industry relationship");
          }
      }
    }
    
    revalidatePath('/admin/personas');
    revalidatePath('/paths/persona');
    if (data?.slug) {
      revalidatePath(`/paths/persona/${data.slug}`);
    }
    
    // Return the saved data
    return data;
  } catch (error: any) {
    console.error("Error saving persona:", error);
    console.error("Error stack:", error.stack);
    throw new Error(error.message || "Failed to save persona");
  }
}

export async function publishPersona(id: string): Promise<void> {
  try {
    const supabase = createServiceRoleSupabaseClient();
    const { error } = await supabase
      .from('personas')
      .update({ published: true })
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    revalidatePath('/admin/personas');
  } catch (error: any) {
    console.error("Error publishing persona:", error);
    throw new Error(error.message || "Failed to publish persona");
  }
}

export async function unpublishPersona(id: string): Promise<void> {
  try {
    const supabase = createServiceRoleSupabaseClient();
    const { error } = await supabase
      .from('personas')
      .update({ published: false })
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    revalidatePath('/admin/personas');
  } catch (error: any) {
    console.error("Error unpublishing persona:", error);
    throw new Error(error.message || "Failed to unpublish persona");
  }
}