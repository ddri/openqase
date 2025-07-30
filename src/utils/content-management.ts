import { createBrowserSupabaseClient } from '@/lib/supabase-browser';
import { createServiceRoleSupabaseClient } from '@/lib/supabase';
import { PostgrestError } from '@supabase/supabase-js';

/**
 * Content types supported by the CMS
 */
export type ContentType = 'algorithms' | 'personas' | 'industries' | 'case_studies' | 'blog_posts';

/**
 * Configuration for a relationship between content types
 */
export type RelationshipConfig = {
  junctionTable: string;
  contentIdField: string;
  relatedIdField: string;
  relatedTable: string;
};

/**
 * Fetches content items with optional filtering
 */
export async function fetchContentItems({
  contentType,
  includeUnpublished = false,
  page = 1,
  pageSize = 10,
  filters = {},
  searchQuery,
  searchFields,
  orderBy = 'updated_at',
  orderDirection = 'desc'
}: {
  contentType: ContentType;
  includeUnpublished?: boolean;
  page?: number;
  pageSize?: number;
  filters?: Record<string, any>;
  searchQuery?: string;
  searchFields?: string[];
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}) {
  const supabase = await createServiceRoleSupabaseClient();
  
  // Apply direct filters to the main table
  let query = supabase
    .from(contentType)
    .select('*', { count: 'exact' });
  
  // Apply published filter if not including unpublished
  if (!includeUnpublished) {
    query = query.eq('published', true);
  }
  
  // Apply direct filters
  Object.entries(filters).forEach(([key, value]) => {
    // Skip relationship filters, we'll handle them separately
    if (!['industries', 'algorithms', 'personas', 'related_posts'].includes(key)) {
      if (Array.isArray(value)) {
        query = query.in(key, value);
      } else if (value !== undefined && value !== null) {
        query = query.eq(key, value);
      }
    }
  });

  // Apply search filters
  if (searchQuery && searchFields && searchFields.length > 0) {
    // Create OR conditions for each search field
    const searchConditions = searchFields.map(field => `${field}.ilike.%${searchQuery}%`).join(',');
    query = query.or(searchConditions);
  }
  
  // Apply ordering
  query = query.order(orderBy, { ascending: orderDirection === 'asc' });
  
  // Apply pagination
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  
  // Execute query with pagination
  const { data, error, count } = await query.range(from, to);
  
  return { data, error, count, page, pageSize };
}

/**
 * Fetches a single content item by ID or slug
 */
export async function fetchContentItem({
  contentType,
  identifier,
  identifierType = 'slug',
  includeUnpublished = false,
  includeRelationships = []
}: {
  contentType: ContentType;
  identifier: string;
  identifierType?: 'id' | 'slug';
  includeUnpublished?: boolean;
  includeRelationships?: Array<{
    relationshipConfig: RelationshipConfig;
    fields?: string;
  }>;
}) {
  const supabase = await createServiceRoleSupabaseClient();
  
  let query = supabase
    .from(contentType)
    .select('*')
    .eq(identifierType, identifier);
  
  if (!includeUnpublished) {
    query = query.eq('published', true);
  }
  
  const { data: item, error } = await query.single();
  
  if (error || !item) {
    return { data: null, error: error || new Error('Item not found') };
  }
  
  // Fetch relationships if requested
  if (includeRelationships.length > 0 && item) {
    const serviceClient = await createServiceRoleSupabaseClient();
    
    for (const relationship of includeRelationships) {
      const { relationshipConfig, fields = '*' } = relationship;
      const { junctionTable, contentIdField, relatedIdField, relatedTable } = relationshipConfig;
      
      const { data: relations, error: relationsError } = await serviceClient
        .from(junctionTable as any)
        .select(`
          ${relatedIdField},
          ${relatedTable}:${relatedTable}(${fields})
        `)
        .eq(contentIdField, item.id);
        
      if (!relationsError && relations) {
        // Extract the related items
        const relatedItems = relations.map(relation => relation[relatedTable as keyof typeof relation]);
        (item as any)[`related_${relatedTable}`] = relatedItems;
      }
    }
  }
  
  return { data: item, error: null };
}

/**
 * Creates or updates a content item
 */
export async function saveContentItem({
  contentType,
  data,
  id = null,
  relationships = []
}: {
  contentType: ContentType;
  data: Record<string, any>;
  id?: string | null;
  relationships?: Array<{
    relationshipConfig: RelationshipConfig;
    relatedIds: string[];
  }>;
}) {
  const serviceClient = await createServiceRoleSupabaseClient();
  let result;
  
  // Prepare the data with updated timestamp
  const itemData = {
    ...data,
    updated_at: new Date().toISOString()
  };
  
  // Create or update the content item
  if (id) {
    // Update existing item
    result = await serviceClient
      .from(contentType)
      .update(itemData as any)
      .eq('id', id)
      .select('*')
      .single();
  } else {
    // Create new item
    result = await serviceClient
      .from(contentType)
      .insert(itemData as any)
      .select('*')
      .single();
  }
  
  const { data: savedItem, error } = result;
  
  if (error || !savedItem) {
    return { data: null, error: error || new Error('Failed to save item') };
  }
  
  // Handle relationships if provided
  if (relationships.length > 0 && savedItem) {
    for (const relationship of relationships) {
      const { relationshipConfig, relatedIds } = relationship;
      const { junctionTable, contentIdField, relatedIdField } = relationshipConfig;
      
      // First delete existing relationships
      const { error: deleteError } = await serviceClient
        .from(junctionTable as any)
        .delete()
        .eq(contentIdField, savedItem.id);
        
      if (deleteError) {
        console.error(`Error deleting existing relationships in ${junctionTable}:`, deleteError);
      }
      
      // Then insert new relationships
      if (relatedIds.length > 0) {
        const relationInserts = relatedIds.map(relatedId => ({
          [contentIdField]: savedItem.id,
          [relatedIdField]: relatedId
        }));
        
        const { error: insertError } = await serviceClient
          .from(junctionTable as any)
          .insert(relationInserts as any);
          
        if (insertError) {
          console.error(`Error inserting relationships in ${junctionTable}:`, insertError);
        }
      }
    }
  }
  
  return { data: savedItem, error: null };
}

/**
 * Deletes a content item and its relationships
 */
export async function deleteContentItem({
  contentType,
  id,
  relationshipConfigs = []
}: {
  contentType: ContentType;
  id: string;
  relationshipConfigs?: RelationshipConfig[];
}) {
  const serviceClient = await createServiceRoleSupabaseClient();
  
  // First delete relationships in junction tables
  for (const config of relationshipConfigs) {
    const { junctionTable, contentIdField } = config;
    
    const { error: relDeleteError } = await serviceClient
      .from(junctionTable as any)
      .delete()
      .eq(contentIdField, id);
      
    if (relDeleteError) {
      console.error(`Error deleting relationships in ${junctionTable}:`, relDeleteError);
      // Continue with deletion even if relationship deletion fails
    }
  }
  
  // Then delete the content item
  const { error: deleteError } = await serviceClient
    .from(contentType)
    .delete()
    .eq('id', id);
    
  return { success: !deleteError, error: deleteError };
}

/**
 * Updates the published status of a content item
 */
export async function updatePublishedStatus({
  contentType,
  id,
  published
}: {
  contentType: ContentType;
  id: string;
  published: boolean;
}) {
  const serviceClient = await createServiceRoleSupabaseClient();
  
  const updateData: Record<string, any> = {
    published,
    updated_at: new Date().toISOString()
  };
  
  // If publishing, set published_at timestamp
  if (published) {
    updateData.published_at = new Date().toISOString();
  }
  
  const { data, error } = await serviceClient
    .from(contentType)
    .update(updateData)
    .eq('id', id)
    .select('*')
    .single();
    
  return { data, error };
}

/**
 * Converts a slug to an ID for a content type
 */
export async function slugToId({
  contentType,
  slug
}: {
  contentType: ContentType;
  slug: string;
}) {
  const supabase = await createServiceRoleSupabaseClient();
  
  const { data, error } = await supabase
    .from(contentType)
    .select('id')
    .eq('slug', slug)
    .single();
    
  if (error || !data) {
    return { id: null, error: error || new Error(`${contentType} with slug ${slug} not found`) };
  }
  
  return { id: data.id, error: null };
}

/**
 * Relationship configurations for different content types
 */
export const RELATIONSHIP_CONFIGS = {
  algorithms: {
    caseStudies: {
      junctionTable: 'algorithm_case_study_relations',
      contentIdField: 'algorithm_id',
      relatedIdField: 'case_study_id',
      relatedTable: 'case_studies'
    },
    industries: {
      junctionTable: 'algorithm_industry_relations',
      contentIdField: 'algorithm_id',
      relatedIdField: 'industry_id',
      relatedTable: 'industries'
    }
  },
  caseStudies: {
    algorithms: {
      junctionTable: 'algorithm_case_study_relations',
      contentIdField: 'case_study_id',
      relatedIdField: 'algorithm_id',
      relatedTable: 'algorithms'
    },
    relatedCaseStudies: {
      junctionTable: 'case_study_relations',
      contentIdField: 'case_study_id',
      relatedIdField: 'related_case_study_id',
      relatedTable: 'case_studies'
    }
  },
  blogPosts: {
    relatedBlogPosts: {
      junctionTable: 'blog_post_relations',
      contentIdField: 'blog_post_id',
      relatedIdField: 'related_blog_post_id',
      relatedTable: 'blog_posts'
    }
  }
};