/**
 * API Route Template
 * 
 * This is a template for creating standardized API routes for content types.
 * Copy this file to create new API routes for different content types.
 * 
 * Usage:
 * 1. Copy this file to src/app/api/[contentType]/route.ts
 * 2. Replace [CONTENT_TYPE] with the actual content type (e.g., 'algorithms')
 * 3. Update the RELATIONSHIP_CONFIG to match the content type's relationships
 * 4. Customize the extractFormData function for the content type's specific fields
 */

import { NextRequest, NextResponse } from 'next/server';
import { 
  fetchContentItems, 
  fetchContentItem, 
  saveContentItem, 
  deleteContentItem,
  updatePublishedStatus,
  ContentType,
  RELATIONSHIP_CONFIGS
} from '@/utils/content-management';

// Define the content type for this API route
const CONTENT_TYPE: ContentType = '[CONTENT_TYPE]' as ContentType; // Replace with actual content type

// Define relationship configurations for this content type
const RELATIONSHIP_CONFIG: Record<string, any> = {
  // Example: For algorithms, uncomment and customize:
  // caseStudies: RELATIONSHIP_CONFIGS.algorithms.caseStudies
};

/**
 * Extract form data for this content type
 * Customize this function based on the content type's fields
 */
function extractFormData(formData: FormData): Record<string, any> {
  // Example for algorithms:
  // const name = formData.get('name') as string;
  // const slug = formData.get('slug') as string;
  // const description = formData.get('description') as string || null;
  // const mainContent = formData.get('main_content') as string || null;
  // const published = formData.get('published') === 'on';
  // const quantumAdvantage = formData.get('quantum_advantage') as string || null;
  
  // // Handle array fields
  // const useCasesString = formData.get('use_cases') as string;
  // const useCases = useCasesString ? useCasesString.split(',').map(item => item.trim()) : [];
  
  // return {
  //   name,
  //   slug,
  //   description,
  //   main_content: mainContent,
  //   published,
  //   quantum_advantage: quantumAdvantage,
  //   use_cases: useCases.length > 0 ? useCases : null
  // };
  
  // Replace with actual form data extraction
  return {};
}

/**
 * Extract relationships from form data
 * Customize this function based on the content type's relationships
 */
function extractRelationships(formData: FormData): Array<{
  relationshipConfig: any;
  relatedIds: string[];
}> {
  const relationships: Array<{
    relationshipConfig: any;
    relatedIds: string[];
  }> = [];
  
  // Example for algorithms:
  // const relatedCaseStudies = formData.getAll('related_case_studies[]') as string[];
  // if (relatedCaseStudies.length > 0) {
  //   relationships.push({
  //     relationshipConfig: RELATIONSHIP_CONFIGS.algorithms.caseStudies,
  //     relatedIds: relatedCaseStudies
  //   });
  // }
  
  // Replace with actual relationship extraction
  return relationships;
}

/**
 * GET handler for fetching content items
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const includeUnpublished = searchParams.get('includeUnpublished') === 'true';
    
    // Handle single item request
    if (slug) {
      const { data, error } = await fetchContentItem({
        contentType: CONTENT_TYPE,
        identifier: slug,
        identifierType: 'slug',
        includeUnpublished,
        includeRelationships: Object.values(RELATIONSHIP_CONFIG).map(config => ({
          relationshipConfig: config as any,
          fields: 'id, slug, name, title' // Adjust fields as needed
        }))
      });
      
      if (error || !data) {
        return NextResponse.json(
          { error: `${CONTENT_TYPE} not found` },
          { status: 404 }
        );
      }
      
      return NextResponse.json(data);
    }
    
    // Handle list request
    const filters: Record<string, any> = {};
    
    // Add custom filters based on search params
    // Example:
    // if (searchParams.has('category')) {
    //   filters.category = searchParams.get('category');
    // }
    
    const { data, error, count } = await fetchContentItems({
      contentType: CONTENT_TYPE,
      includeUnpublished,
      page,
      pageSize,
      filters,
      orderBy: 'updated_at',
      orderDirection: 'desc'
    });
    
    if (error) {
      return NextResponse.json(
        { error: `Error fetching ${CONTENT_TYPE}` },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      items: data,
      pagination: {
        page,
        pageSize,
        totalItems: count,
        totalPages: Math.ceil((count || 0) / pageSize)
      }
    });
  } catch (error) {
    console.error(`Error in ${CONTENT_TYPE} GET handler:`, error);
    return NextResponse.json(
      { error: `Failed to fetch ${CONTENT_TYPE}` },
      { status: 500 }
    );
  }
}

/**
 * POST handler for creating or updating content items
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Get form data
    const id = formData.get('id') as string || null;
    const data = extractFormData(formData);
    const relationships = extractRelationships(formData);
    
    // Save the content item
    const { data: savedItem, error } = await saveContentItem({
      contentType: CONTENT_TYPE,
      data,
      id,
      relationships
    });
    
    if (error || !savedItem) {
      return NextResponse.json(
        { error: `Failed to save ${CONTENT_TYPE}` },
        { status: 500 }
      );
    }
    
    return NextResponse.json(savedItem);
  } catch (error) {
    console.error(`Error in ${CONTENT_TYPE} POST handler:`, error);
    return NextResponse.json(
      { error: `Failed to save ${CONTENT_TYPE}` },
      { status: 500 }
    );
  }
}

/**
 * DELETE handler for removing content items
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }
    
    const { success, error } = await deleteContentItem({
      contentType: CONTENT_TYPE,
      id,
      relationshipConfigs: Object.values(RELATIONSHIP_CONFIG) as any[]
    });
    
    if (!success) {
      return NextResponse.json(
        { error: `Failed to delete ${CONTENT_TYPE}` },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error in ${CONTENT_TYPE} DELETE handler:`, error);
    return NextResponse.json(
      { error: `Failed to delete ${CONTENT_TYPE}` },
      { status: 500 }
    );
  }
}

/**
 * PATCH handler for updating published status
 */
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();
    const { published } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }
    
    if (published === undefined) {
      return NextResponse.json(
        { error: 'Published status is required' },
        { status: 400 }
      );
    }
    
    const { data, error } = await updatePublishedStatus({
      contentType: CONTENT_TYPE,
      id,
      published
    });
    
    if (error) {
      return NextResponse.json(
        { error: `Failed to update published status for ${CONTENT_TYPE}` },
        { status: 500 }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error in ${CONTENT_TYPE} PATCH handler:`, error);
    return NextResponse.json(
      { error: `Failed to update ${CONTENT_TYPE}` },
      { status: 500 }
    );
  }
}