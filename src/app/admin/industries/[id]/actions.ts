'use server';

import { createServiceRoleSupabaseClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';

export async function saveIndustry(values: any): Promise<any> {
  try {
    const supabase = createServiceRoleSupabaseClient();
    const { data, error } = await supabase
      .from('industries')
      .upsert({
        id: values.id,
        name: values.name,
        slug: values.slug,
        description: values.description,
        main_content: values.main_content,
        icon: values.icon,
        published: values.published,
      })
      .select()
      .single();
    
    if (error) {
      console.error("Error saving industry:", error);
      throw new Error(error.message || "Failed to save industry");
    }
    
    revalidatePath('/admin/industries');
    
    // Return the saved data
    return data;
  } catch (error: any) {
    console.error("Error saving industry:", error);
    throw new Error(error.message || "Failed to save industry");
  }
}

export async function publishIndustry(id: string): Promise<void> {
  try {
    const supabase = createServiceRoleSupabaseClient();
    const { error } = await supabase
      .from('industries')
      .update({ published: true })
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    revalidatePath('/admin/industries');
  } catch (error: any) {
    console.error("Error publishing industry:", error);
    throw new Error(error.message || "Failed to publish industry");
  }
}

export async function unpublishIndustry(id: string): Promise<void> {
  try {
    const supabase = createServiceRoleSupabaseClient();
    const { error } = await supabase
      .from('industries')
      .update({ published: false })
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    revalidatePath('/admin/industries');
  } catch (error: any) {
    console.error("Error unpublishing industry:", error);
    throw new Error(error.message || "Failed to unpublish industry");
  }
}