import { NextRequest, NextResponse } from 'next/server';
import {
  fetchContentItems,
  fetchContentItem,
  saveContentItem,
  deleteContentItem,
  updatePublishedStatus,
  RELATIONSHIP_CONFIGS
} from '@/utils/content-management';
import { createServiceRoleSupabaseClient } from '@/lib/supabase';

// Define the content type for this API route
const CONTENT_TYPE = 'case_studies';

// Define relationship configurations for case studies
const RELATIONSHIP_CONFIG = {
  algorithms: {
    junctionTable: 'case_study_algorithm_relations',
    contentIdField: 'case_study_id',
    relatedIdField: 'algorithm_id',
    relatedTable: 'algorithms'
  },
  industries: {
    junctionTable: 'case_study_industry_relations',
    contentIdField: 'case_study_id',
    relatedIdField: 'industry_id',
    relatedTable: 'industries'
  },
  personas: {
    junctionTable: 'case_study_persona_relations',
    contentIdField: 'case_study_id',
    relatedIdField: 'persona_id',
    relatedTable: 'personas'
  }
};

/**
 * GET handler for fetching case studies
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const includeUnpublished = searchParams.get('includeUnpublished') === 'true';
    
    // Handle single case study request
    if (slug) {
      const { data, error } = await fetchContentItem({
        contentType: CONTENT_TYPE as any,
        identifier: slug,
        identifierType: 'slug',
        includeUnpublished,
        includeRelationships: Object.values(RELATIONSHIP_CONFIG).map(config => ({
          relationshipConfig: config as any,
          fields: 'id, slug, name, title'
        }))
      });
      
      if (error || !data) {
        return NextResponse.json(
          { error: 'Case study not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(data);
    }
    
    // Handle list request
    const filters: Record<string, any> = {};
    
    // Add custom filters based on search params
    if (searchParams.has('algorithm')) {
      const algorithm = searchParams.get('algorithm');
      if (algorithm) {
        console.log('Handling algorithm filter for case studies:', algorithm);
        
        // Get the algorithm ID first
        const serviceClient = await createServiceRoleSupabaseClient();
        const { data: algorithmData, error: algorithmError } = await serviceClient
          .from('algorithms')
          .select('id, name')
          .eq('name', algorithm)
          .single();
        
        if (algorithmError || !algorithmData) {
          console.error('Error finding algorithm:', algorithmError);
          return NextResponse.json(
            { error: 'Algorithm not found' },
            { status: 404 }
          );
        }
        
        console.log('Found algorithm:', algorithmData);
        
        // Get case studies related to this algorithm using the junction table
        const { data: relations, error: relationsError } = await serviceClient
          .from('algorithm_case_study_relations')
          .select('case_study_id')
          .eq('algorithm_id', algorithmData.id);
          
        if (relationsError) {
          console.error('Error finding case study relations:', relationsError);
          return NextResponse.json(
            { error: 'Error fetching case studies' },
            { status: 500 }
          );
        }
        
        if (relations && relations.length > 0) {
          const caseStudyIds = relations.map((relation: any) => relation.case_study_id);
          console.log('Found case study IDs:', caseStudyIds);
          
          // If we already have an ID filter, we need to find the intersection
          if (filters.id) {
            filters.id = filters.id.filter((id: string) => caseStudyIds.includes(id));
          } else {
            filters.id = caseStudyIds;
          }
          
          // If the intersection is empty, return empty result
          if (filters.id.length === 0) {
            return NextResponse.json({
              items: [],
              pagination: {
                page,
                pageSize,
                totalItems: 0,
                totalPages: 0
              }
            });
          }
        } else {
          // No matching case studies, return empty result
          return NextResponse.json({
            items: [],
            pagination: {
              page,
              pageSize,
              totalItems: 0,
              totalPages: 0
            }
          });
        }
      }
    }
    
    if (searchParams.has('industry')) {
      const industry = searchParams.get('industry');
      if (industry) {
        console.log('Handling industry filter for case studies:', industry);
        
        // Get the industry ID first
        const serviceClient = await createServiceRoleSupabaseClient();
        const { data: industryData, error: industryError } = await serviceClient
          .from('industries')
          .select('id, name')
          .eq('name', industry)
          .single();
        
        if (industryError || !industryData) {
          console.error('Error finding industry:', industryError);
          return NextResponse.json(
            { error: 'Industry not found' },
            { status: 404 }
          );
        }
        
        console.log('Found industry:', industryData);
        
        // Get case studies related to this industry using the junction table
        const { data: relations, error: relationsError } = await serviceClient
          .from('case_study_industry_relations' as any)
          .select('case_study_id')
          .eq('industry_id', industryData.id);
          
        if (relationsError) {
          console.error('Error finding case study relations:', relationsError);
          return NextResponse.json(
            { error: 'Error fetching case studies' },
            { status: 500 }
          );
        }
        
        if (relations && relations.length > 0) {
          const caseStudyIds = relations.map((relation: any) => relation.case_study_id);
          console.log('Found case study IDs:', caseStudyIds);
          filters.id = caseStudyIds;
        } else {
          // No matching case studies, return empty result
          return NextResponse.json({
            items: [],
            pagination: {
              page,
              pageSize,
              totalItems: 0,
              totalPages: 0
            }
          });
        }
      }
    }
    
    if (searchParams.has('persona')) {
      const persona = searchParams.get('persona');
      if (persona) {
        console.log('Handling persona filter for case studies:', persona);
        
        // Get the persona ID first
        const serviceClient = await createServiceRoleSupabaseClient();
        const { data: personaData, error: personaError } = await serviceClient
          .from('personas')
          .select('id, name')
          .eq('name', persona)
          .single();
        
        if (personaError || !personaData) {
          console.error('Error finding persona:', personaError);
          return NextResponse.json(
            { error: 'Persona not found' },
            { status: 404 }
          );
        }
        
        console.log('Found persona:', personaData);
        
        // Get case studies related to this persona using the junction table
        const { data: relations, error: relationsError } = await serviceClient
          .from('case_study_persona_relations' as any)
          .select('case_study_id')
          .eq('persona_id', personaData.id);
          
        if (relationsError) {
          console.error('Error finding case study relations:', relationsError);
          return NextResponse.json(
            { error: 'Error fetching case studies' },
            { status: 500 }
          );
        }
        
        if (relations && relations.length > 0) {
          const caseStudyIds = relations.map((relation: any) => relation.case_study_id);
          console.log('Found case study IDs:', caseStudyIds);
          
          // If we already have an ID filter, we need to find the intersection
          if (filters.id) {
            filters.id = filters.id.filter((id: string) => caseStudyIds.includes(id));
          } else {
            filters.id = caseStudyIds;
          }
          
          // If the intersection is empty, return empty result
          if (filters.id.length === 0) {
            return NextResponse.json({
              items: [],
              pagination: {
                page,
                pageSize,
                totalItems: 0,
                totalPages: 0
              }
            });
          }
        } else {
          // No matching case studies, return empty result
          return NextResponse.json({
            items: [],
            pagination: {
              page,
              pageSize,
              totalItems: 0,
              totalPages: 0
            }
          });
        }
      }
    }
    
    const { data, error, count } = await fetchContentItems({
      contentType: CONTENT_TYPE as any,
      includeUnpublished,
      page,
      pageSize,
      filters,
      orderBy: 'updated_at',
      orderDirection: 'desc'
    });
    
    if (error) {
      return NextResponse.json(
        { error: 'Error fetching case studies' },
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
    console.error('Error in case studies GET handler:', error);
    return NextResponse.json(
      { error: 'Failed to fetch case studies' },
      { status: 500 }
    );
  }
}

/**
 * POST handler for creating or updating case studies
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Get form data
    const id = formData.get('id') as string || null;
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string || null;
    const main_content = formData.get('main_content') as string || null;
    const url = formData.get('url') as string || null;
    const published = formData.get('published') === 'on';
    
    // Handle array fields
    const partnerCompaniesString = formData.get('partner_companies') as string;
    const partnerCompanies = partnerCompaniesString ? 
      partnerCompaniesString.split(',').map(item => item.trim()).filter(Boolean) : 
      [];
    
    const quantumCompaniesString = formData.get('quantum_companies') as string;
    const quantumCompanies = quantumCompaniesString ? 
      quantumCompaniesString.split(',').map(item => item.trim()).filter(Boolean) : 
      [];
    
    const quantumHardwareString = formData.get('quantum_hardware') as string;
    const quantumHardware = quantumHardwareString ? 
      quantumHardwareString.split(',').map(item => item.trim()).filter(Boolean) : 
      [];
    
    const quantumSoftwareString = formData.get('quantum_software') as string;
    const quantumSoftware = quantumSoftwareString ? 
      quantumSoftwareString.split(',').map(item => item.trim()).filter(Boolean) : 
      [];
    
    // Handle relationships
    const algorithms = formData.getAll('algorithms[]') as string[];
    const industries = formData.getAll('industries[]') as string[];
    const personas = formData.getAll('personas[]') as string[];
    
    // Prepare the data object
    const data = {
      title,
      slug,
      description,
      main_content,
      url,
      partner_companies: partnerCompanies,
      quantum_companies: quantumCompanies,
      quantum_hardware: quantumHardware,
      quantum_software: quantumSoftware,
      published
    };
    
    // Prepare relationships
    const relationships = [];
    
    if (algorithms.length > 0) {
      relationships.push({
        relationshipConfig: RELATIONSHIP_CONFIG.algorithms as any,
        relatedIds: algorithms
      });
    }
    
    if (industries.length > 0) {
      relationships.push({
        relationshipConfig: RELATIONSHIP_CONFIG.industries as any,
        relatedIds: industries
      });
    }
    
    if (personas.length > 0) {
      relationships.push({
        relationshipConfig: RELATIONSHIP_CONFIG.personas as any,
        relatedIds: personas
      });
    }
    
    // Save the case study
    const { data: savedItem, error } = await saveContentItem({
      contentType: CONTENT_TYPE as any,
      data,
      id,
      relationships
    });
    
    if (error || !savedItem) {
      return NextResponse.json(
        { error: 'Failed to save case study' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(savedItem);
  } catch (error) {
    console.error('Error in case studies POST handler:', error);
    return NextResponse.json(
      { error: 'Failed to save case study' },
      { status: 500 }
    );
  }
}

/**
 * DELETE handler for removing case studies
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
    
    const relationshipConfigs = Object.values(RELATIONSHIP_CONFIG);
    
    const { success, error } = await deleteContentItem({
      contentType: CONTENT_TYPE as any,
      id,
      relationshipConfigs: relationshipConfigs as any[]
    });
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete case study' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in case studies DELETE handler:', error);
    return NextResponse.json(
      { error: 'Failed to delete case study' },
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
      contentType: CONTENT_TYPE as any,
      id,
      published
    });
    
    if (error) {
      return NextResponse.json(
        { error: 'Failed to update published status for case study' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in case studies PATCH handler:', error);
    return NextResponse.json(
      { error: 'Failed to update case study' },
      { status: 500 }
    );
  }
}