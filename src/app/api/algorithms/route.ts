import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { createServiceClient } from '@/utils/supabase/service-role';
import type { Database } from '@/types/supabase';

type Tables = Database['public']['Tables']
type AlgorithmRow = Tables['algorithms']['Row']
type AlgorithmInsert = Tables['algorithms']['Insert']
type AlgorithmUpdate = Tables['algorithms']['Update']

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeUnpublished = searchParams.get('includeUnpublished') === 'true';
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const slug = searchParams.get('slug');
    
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    // Use createClient to get authenticated client
    const supabase = await createClient();
    
    // If a specific slug is requested, fetch that algorithm with its relationships
    if (slug) {
      const { data: algorithm, error } = await supabase
        .from('algorithms')
        .select('*')
        .eq('slug', slug)
        .single();
        
      if (error || !algorithm) {
        return NextResponse.json(
          { error: 'Algorithm not found' },
          { status: 404 }
        );
      }
      
      // Fetch related case studies from the junction table
      // Use service role client for junction table operations to bypass RLS
      const serviceClient = createServiceClient();
      const { data: relations, error: relationsError } = await serviceClient
        .from('algorithm_case_study_relations')
        .select(`
          case_study_id,
          case_studies:case_studies(id, slug, title)
        `)
        .eq('algorithm_id', algorithm.id);
        
      if (!relationsError && relations) {
        // Extract the case study information
        const relatedCaseStudies = relations.map(relation => relation.case_studies);
        (algorithm as any).related_case_studies = relatedCaseStudies;
      }
      
      return NextResponse.json(algorithm);
    }
    
    // Otherwise, fetch the paginated list of algorithms
    let query = supabase
      .from('algorithms')
      .select('*', { count: 'exact' })
      .order('name')
      .range(from, to);
    
    if (!includeUnpublished) {
      query = query.eq('published', true);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching algorithms:', error);
      return NextResponse.json(
        { error: 'Failed to fetch algorithms' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      items: data || [],
      metadata: {
        total: count || 0,
        page,
        pageSize,
        totalPages: Math.ceil((count || 0) / pageSize)
      }
    });
  } catch (error) {
    console.error('Algorithms API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const supabase = await createClient();

    // Get form data
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string || null;
    const main_content = formData.get('main_content') as string || null;
    const published = formData.get('published') === 'on';
    
    console.log('Published value from form:', formData.get('published'));
    console.log('Interpreted published value:', published);
    
    console.log('Published value from form:', formData.get('published'));
    console.log('Interpreted published value:', published);
    console.log('API received published value:', formData.get('published'), 'interpreted as:', published);
    
    // Process array fields
    const use_cases = (formData.get('use_cases') as string)
      ?.split(',')
      .map((s) => s.trim())
      .filter(Boolean) || null;
    
    // Get relationship data (for future implementation)
    const relatedCaseStudies = formData.getAll('related_case_studies[]') as string[];
    const relatedIndustries = formData.getAll('related_industries[]') as string[];

    // Prepare the data object
    const baseData: AlgorithmInsert = {
      name,
      slug,
      description,
      main_content,
      published,
      use_cases
    };

    let result;
    if (id) {
      // Update existing algorithm
      console.log('Updating algorithm with data:', { ...baseData, published });
      
      // Log the exact data being sent to the database
      console.log('Exact update data being sent to database:', {
        ...baseData,
        updated_at: new Date().toISOString(),
        published: published // Explicitly log the published flag
      });
      
      const { data: updatedData, error } = await supabase
        .from('algorithms')
        .update({
          ...baseData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select('*')
        .single();
        
      if (error) {
        console.error('Error updating algorithm:', error);
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }
      
      console.log('Updated algorithm data:', updatedData);
      result = updatedData;
      
      // Handle relationships with case studies using the junction table
      if (relatedCaseStudies.length > 0) {
        console.log('Updating case study relationships for algorithm:', id);
        
        // First, delete existing relationships for this algorithm
        // Use service role client for junction table operations to bypass RLS
        const serviceClient = createServiceClient();
        const { error: deleteError } = await serviceClient
          .from('algorithm_case_study_relations')
          .delete()
          .eq('algorithm_id', id);
          
        if (deleteError) {
          console.error('Error deleting existing case study relationships:', deleteError);
        }
        
        // Then, insert new relationships
        const relationInserts = [];
        for (const caseStudySlug of relatedCaseStudies) {
          // Get the case study ID from the slug
          const { data: caseStudyData, error: caseStudyError } = await supabase
            .from('case_studies')
            .select('id')
            .eq('slug', caseStudySlug)
            .single();
            
          if (caseStudyError || !caseStudyData) {
            console.error(`Error finding case study with slug ${caseStudySlug}:`, caseStudyError);
            continue;
          }
          
          relationInserts.push({
            algorithm_id: id,
            case_study_id: caseStudyData.id
          });
        }
        
        if (relationInserts.length > 0) {
          // Use service role client for junction table operations to bypass RLS
          const serviceClient = createServiceClient();
          const { error: insertError } = await serviceClient
            .from('algorithm_case_study_relations')
            .insert(relationInserts);
            
          if (insertError) {
            console.error('Error inserting case study relationships:', insertError);
          } else {
            console.log(`Successfully inserted ${relationInserts.length} case study relationships`);
          }
        }
      }
      
      // Store the related case studies in the result for the client
      (result as any).related_case_studies = relatedCaseStudies;
      (result as any).related_industries = relatedIndustries;
    } else {
      // Create new algorithm
      console.log('Inserting new algorithm with data:', { ...baseData, published });
      
      // Double-check the published value
      console.log('Final published value before insert:', baseData.published);
      
      // Log the exact data being sent to the database
      console.log('Exact insert data being sent to database:', {
        ...baseData,
        published: published // Explicitly log the published flag
      });
      
      const { data: insertedData, error } = await supabase
        .from('algorithms')
        .insert({
          ...baseData,
        })
        .select('*')
        .single();
        
      if (error) {
        console.error('Error inserting algorithm:', error);
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }
      
      console.log('Inserted algorithm data:', insertedData);
      result = insertedData;
      
      // Handle relationships with case studies using the junction table
      if (relatedCaseStudies.length > 0 && insertedData) {
        console.log('Creating case study relationships for new algorithm:', insertedData.id);
        
        // Insert new relationships
        const relationInserts = [];
        for (const caseStudySlug of relatedCaseStudies) {
          // Get the case study ID from the slug
          const { data: caseStudyData, error: caseStudyError } = await supabase
            .from('case_studies')
            .select('id')
            .eq('slug', caseStudySlug)
            .single();
            
          if (caseStudyError || !caseStudyData) {
            console.error(`Error finding case study with slug ${caseStudySlug}:`, caseStudyError);
            continue;
          }
          
          relationInserts.push({
            algorithm_id: insertedData.id,
            case_study_id: caseStudyData.id
          });
        }
        
        if (relationInserts.length > 0) {
          // Use service role client for junction table operations to bypass RLS
          const serviceClient = createServiceClient();
          const { error: insertError } = await serviceClient
            .from('algorithm_case_study_relations')
            .insert(relationInserts);
            
          if (insertError) {
            console.error('Error inserting case study relationships:', insertError);
          } else {
            console.log(`Successfully inserted ${relationInserts.length} case study relationships`);
          }
        }
      }
      
      // Store the related case studies in the result for the client
      (result as any).related_case_studies = relatedCaseStudies;
      (result as any).related_industries = relatedIndustries;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error handling algorithm submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Algorithm ID is required' },
        { status: 400 }
      );
    }
    
    const supabase = await createClient();
    
    // Check if the algorithm exists
    const { data: algorithm, error: fetchError } = await supabase
      .from('algorithms')
      .select('id')
      .eq('id', id)
      .single();
      
    if (fetchError || !algorithm) {
      return NextResponse.json(
        { error: 'Algorithm not found' },
        { status: 404 }
      );
    }
    
    // First delete the relationships in the junction table
    // Use service role client for junction table operations to bypass RLS
    const serviceClient = createServiceClient();
    const { error: relDeleteError } = await serviceClient
      .from('algorithm_case_study_relations')
      .delete()
      .eq('algorithm_id', id);
      
    if (relDeleteError) {
      console.error('Error deleting algorithm relationships:', relDeleteError);
      // Continue with deletion even if relationship deletion fails
    }
    
    // Then delete the algorithm
    const { error: deleteError } = await supabase
      .from('algorithms')
      .delete()
      .eq('id', id);
      
    if (deleteError) {
      return NextResponse.json(
        { error: deleteError.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting algorithm:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}