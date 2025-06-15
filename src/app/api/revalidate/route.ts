import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Verify the request is authorized (you should add proper auth)
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.REVALIDATION_TOKEN}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { type, slug } = body;

    switch (type) {
      case 'persona':
        // Revalidate specific persona page
        if (slug) {
          revalidatePath(`/paths/persona/${slug}`);
        }
        // Revalidate persona listing page
        revalidatePath('/paths/persona');
        break;
        
      case 'industry':
        // Revalidate specific industry page
        if (slug) {
          revalidatePath(`/paths/industry/${slug}`);
        }
        // Revalidate industry listing page
        revalidatePath('/paths/industry');
        break;
        
      case 'algorithm':
        // Revalidate specific algorithm page
        if (slug) {
          revalidatePath(`/paths/algorithm/${slug}`);
        }
        // Revalidate algorithm listing page
        revalidatePath('/paths/algorithm');
        break;
        
      case 'case-study':
        // Revalidate all learning path pages since case studies appear on them
        revalidatePath('/case-study/[slug]', 'page');
        revalidatePath('/paths/persona/[slug]', 'page');
        revalidatePath('/paths/industry/[slug]', 'page');
        revalidatePath('/paths/algorithm/[slug]', 'page');
        break;
        
      case 'all-personas':
        // Revalidate all persona pages
        revalidatePath('/paths/persona/[slug]', 'page');
        revalidatePath('/paths/persona');
        break;

      case 'all-industries':
        // Revalidate all industry pages
        revalidatePath('/paths/industry/[slug]', 'page');
        revalidatePath('/paths/industry');
        break;
        
      case 'all-algorithms':
        // Revalidate all algorithm pages
        revalidatePath('/paths/algorithm/[slug]', 'page');
        revalidatePath('/paths/algorithm');
        break;
        
      default:
        return NextResponse.json({ message: 'Invalid type' }, { status: 400 });
    }

    return NextResponse.json({ 
      message: 'Revalidation triggered successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Error triggering revalidation' }, 
      { status: 500 }
    );
  }
} 