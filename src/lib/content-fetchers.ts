import { createServerSupabaseClient, createServiceRoleSupabaseClient } from '@/lib/supabase-server';

// Define content types
export type ContentType = 'case_studies' | 'algorithms' | 'personas' | 'industries' | 'blog_posts';

// Define relationship mapping for each content type
const RELATIONSHIP_MAPS: Record<ContentType, string> = {
  case_studies: `
    *,
    case_study_industry_relations(industries(id, name, slug)),
    algorithm_case_study_relations(algorithms(id, name, slug, quantum_advantage)),
    case_study_persona_relations(personas(id, name, slug))
  `,
  algorithms: `
    *,
    algorithm_industry_relations(industries(id, name, slug)),
    persona_algorithm_relations(personas(id, name, slug)),
    algorithm_case_study_relations(case_studies(id, title, slug, description, published_at))
  `,
  personas: `
    *,
    persona_industry_relations(industries(id, name, slug)),
    persona_algorithm_relations(algorithms(id, name, slug)),
    case_study_persona_relations(case_studies(id, title, slug, description, published_at))
  `,
  industries: `
    *,
    algorithm_industry_relations(algorithms(id, name, slug, use_cases)),
    case_study_industry_relations(case_studies(id, title, slug, description, published_at)),
    persona_industry_relations(personas(id, name, slug))
  `,
  blog_posts: `
    *,
    blog_post_relations!blog_post_relations_blog_post_id_fkey(
      related_blog_post_id,
      related_blog_posts:blog_posts!blog_post_relations_related_blog_post_id_fkey(
        id, title, slug, description, published_at, author, category, tags
      )
    )
  `
};

/**
 * Unified function to fetch a single content item with all relationships
 * This replaces the complex API route patterns and N+1 query issues
 */
export async function getStaticContentWithRelationships<T>(
  contentType: ContentType,
  slug: string,
  options: { preview?: boolean } = {}
): Promise<T | null> {
  const supabase = createServiceRoleSupabaseClient();
  
  const selectQuery = RELATIONSHIP_MAPS[contentType];
  let query = supabase
    .from(contentType)
    .select(selectQuery)
    .eq('slug', slug);

  // Only filter by published status if not in preview mode
  if (!options.preview) {
    query = query.eq('published', true); // Re-enabled for runtime
  }

  const { data, error } = await query.single();

  if (error) {
    console.error(`Failed to fetch ${contentType} with slug "${slug}":`, error);
    return null;
  }

  return data as T;
}

/**
 * Unified function to fetch a list of content items
 * Used for generating static params and listing pages
 */
export async function getStaticContentList<T>(
  contentType: ContentType,
  options: { 
    preview?: boolean;
    limit?: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
    filters?: Record<string, any>;
  } = {}
): Promise<T[]> {
  const supabase = createServiceRoleSupabaseClient();
  
  let query = supabase
    .from(contentType)
    .select('*');

  // Apply published filter unless in preview mode
  if (!options.preview) {
    query = query.eq('published', true); // Re-enabled for runtime
  }

  // Apply additional filters
  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        query = query.in(key, value);
      } else {
        query = query.eq(key, value);
      }
    });
  }

  // Apply ordering
  const orderBy = options.orderBy || 'updated_at';
  const orderDirection = options.orderDirection || 'desc';
  query = query.order(orderBy, { ascending: orderDirection === 'asc' });

  // Apply limit
  if (options.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error(`Failed to fetch ${contentType} list:`, error);
    return [];
  }

  return (data as T[]) || [];
}

/**
 * Get related content for cross-references
 * Used to find content related through junction tables
 */
export async function getRelatedContent<T>(
  sourceContentType: ContentType,
  sourceId: string,
  targetContentType: ContentType,
  options: { preview?: boolean; limit?: number } = {}
): Promise<T[]> {
  const supabase = createServiceRoleSupabaseClient();
  
  // Define junction table mappings
  const junctionTableMap: Record<string, { table: string; sourceField: string; targetField: string }> = {
    'case_studies->algorithms': {
      table: 'algorithm_case_study_relations',
      sourceField: 'case_study_id',
      targetField: 'algorithm_id'
    },
    'algorithms->case_studies': {
      table: 'algorithm_case_study_relations',
      sourceField: 'algorithm_id', 
      targetField: 'case_study_id'
    },
    'case_studies->industries': {
      table: 'case_study_industry_relations',
      sourceField: 'case_study_id',
      targetField: 'industry_id'
    },
    'case_studies->personas': {
      table: 'case_study_persona_relations',
      sourceField: 'case_study_id',
      targetField: 'persona_id'
    },
    'blog_posts->blog_posts': {
      table: 'blog_post_relations',
      sourceField: 'blog_post_id',
      targetField: 'related_blog_post_id'
    },
    // Add more mappings as needed
  };

  const relationKey = `${sourceContentType}->${targetContentType}`;
  const junctionConfig = junctionTableMap[relationKey];

  if (!junctionConfig) {
    console.warn(`No junction table mapping found for ${relationKey}`);
    return [];
  }

  // First, get the related IDs from the junction table
  const { data: relations, error: relationsError } = await supabase
    .from(junctionConfig.table as any)
    .select(junctionConfig.targetField)
    .eq(junctionConfig.sourceField, sourceId);

  if (relationsError || !relations || relations.length === 0) {
    return [];
  }

  const relatedIds = relations.map((rel: any) => rel[junctionConfig.targetField]);

  // Then fetch the actual content items
  let query = supabase
    .from(targetContentType)
    .select('*')
    .in('id', relatedIds);

  if (!options.preview) {
    query = query.eq('published', true);
  }

  if (options.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error(`Failed to fetch related ${targetContentType}:`, error);
    return [];
  }

  return (data as T[]) || [];
}

/**
 * Build-time safe content fetching using service role client
 * Used for generateStaticParams and other build-time operations
 */
export async function getBuildTimeContentList<T>(
  contentType: ContentType,
  options: { 
    limit?: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
    filters?: Record<string, any>;
  } = {}
): Promise<T[]> {
  const supabase = createServiceRoleSupabaseClient();
  
  let query = supabase
    .from(contentType)
    .select('*');
    // .eq('published', true); // TEMPORARILY DISABLED: Only published content at build time

  // Apply additional filters
  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        query = query.in(key, value);
      } else {
        query = query.eq(key, value);
      }
    });
  }

  // Apply ordering
  const orderBy = options.orderBy || 'updated_at';
  const orderDirection = options.orderDirection || 'desc';
  query = query.order(orderBy, { ascending: orderDirection === 'asc' });

  // Apply limit
  if (options.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error(`Failed to fetch ${contentType} list at build time:`, error);
    return [];
  }

  return (data as T[]) || [];
}

/**
 * Generate static parameters for all published content of a given type
 * Used in generateStaticParams functions
 */
export async function generateStaticParamsForContentType(
  contentType: ContentType
): Promise<{ slug: string }[]> {
  const content = await getBuildTimeContentList<{ slug: string }>(contentType);
  
  return content.map(({ slug }) => ({ slug }));
}

/**
 * Batch fetch multiple content types for homepage/overview pages
 */
export async function batchFetchContent<T>(
  contentTypes: ContentType[],
  options: { preview?: boolean; limit?: number } = {}
): Promise<Record<ContentType, T[]>> {
  const results = await Promise.all(
    contentTypes.map(async (contentType) => {
      const data = await getStaticContentList<T>(contentType, options);
      return [contentType, data] as const;
    })
  );

  return Object.fromEntries(results) as Record<ContentType, T[]>;
}

/**
 * Search content across multiple types
 * Simple implementation for basic search functionality
 */
export async function searchContent<T>(
  contentTypes: ContentType[],
  searchTerm: string,
  options: { preview?: boolean; limit?: number } = {}
): Promise<{ contentType: ContentType; items: T[] }[]> {
  const supabase = createServiceRoleSupabaseClient();
  
  const results = await Promise.all(
    contentTypes.map(async (contentType) => {
      let query = supabase
        .from(contentType)
        .select('*')
        .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,main_content.ilike.%${searchTerm}%`);

      if (!options.preview) {
        query = query.eq('published', true);
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error(`Search failed for ${contentType}:`, error);
        return { contentType, items: [] };
      }

      return { contentType, items: (data as T[]) || [] };
    })
  );

  return results;
} 