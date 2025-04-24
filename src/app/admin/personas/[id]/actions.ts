'use server';

import { createServiceRoleSupabaseClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';

export async function savePersona(values: any): Promise<any> {
  try {
    console.log("Saving persona with values:", JSON.stringify(values, null, 2));
    
    const supabase = createServiceRoleSupabaseClient();
    const { data, error } = await supabase
      .from('personas')
      .upsert({
        id: values.id,
        name: values.name,
        slug: values.slug,
        description: values.description,
        role: values.role,
        industry: values.industry,
        published: values.published,
      })
      .select()
      .single();
    
    if (error) {
      console.error("Error saving persona:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      throw new Error(error.message || "Failed to save persona");
    }
    
    console.log("Persona saved successfully:", JSON.stringify(data, null, 2));
    revalidatePath('/admin/personas');
    
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