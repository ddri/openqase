'use server';

import { createServiceRoleSupabaseClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';

export async function saveBlogPost(values: any): Promise<any> {
  try {
    const supabase = createServiceRoleSupabaseClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .upsert({
        id: values.id,
        title: values.title,
        slug: values.slug,
        description: values.description,
        content: values.content,
        author: values.author,
        featured_image: values.featured_image,
        category: values.category,
        tags: values.tags,
        published: values.published,
        featured: values.featured,
        published_at: values.published_at,
      })
      .select()
      .single();
    
    if (error) {
      console.error("Error saving blog post:", error);
      throw new Error(error.message || "Failed to save blog post");
    }
    
    // Handle related posts relationships (delete and re-create)
    let relatedPostsError = await supabase
      .from('blog_post_relations' as any)
      .delete()
      .eq('blog_post_id', data?.id);

    if (relatedPostsError && relatedPostsError.error) {
        console.error("Error deleting related posts relationships:", relatedPostsError.error);
        throw new Error(relatedPostsError.error.message || "Failed to delete related posts relationships");
    }

    for (const relatedPostId of values.related_posts) {
        let insertError = await supabase
            .from('blog_post_relations' as any)
            .insert({ blog_post_id: data?.id, related_blog_post_id: relatedPostId, relation_type: 'related' });

        if (insertError && insertError.error) {
            console.error("Error inserting related post relationship:", insertError.error);
            throw new Error(insertError.error.message || "Failed to insert related post relationship");
        }
    }
    
    revalidatePath('/admin/blog');
    
    // Return the saved data
    return data;
  } catch (error: any) {
    console.error("Error saving blog post:", error);
    throw new Error(error.message || "Failed to save blog post");
  }
}

export async function publishBlogPost(id: string): Promise<void> {
  try {
    const supabase = createServiceRoleSupabaseClient();
    const { error } = await supabase
      .from('blog_posts')
      .update({ published: true })
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    revalidatePath('/admin/blog');
  } catch (error: any) {
    console.error("Error publishing blog post:", error);
    throw new Error(error.message || "Failed to publish blog post");
  }
}

export async function unpublishBlogPost(id: string): Promise<void> {
  try {
    const supabase = createServiceRoleSupabaseClient();
    const { error } = await supabase
      .from('blog_posts')
      .update({ published: false })
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    revalidatePath('/admin/blog');
  } catch (error: any) {
    console.error("Error unpublishing blog post:", error);
    throw new Error(error.message || "Failed to unpublish blog post");
  }
}