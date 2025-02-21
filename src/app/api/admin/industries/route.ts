// src/app/api/admin/industries/route.ts
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { Industry, PersonaType } from '@/types';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'industry');

type IndustryInput = Partial<Industry>;

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function readIndustries(): Promise<Industry[]> {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    const industries = await Promise.all(
      files
        .filter(file => file.endsWith('.json'))
        .map(async file => {
          const content = await fs.readFile(path.join(CONTENT_DIR, file), 'utf-8');
          return JSON.parse(content) as Industry;
        })
    );
    return industries;
  } catch (error) {
    console.error('Error reading industries:', error);
    return [];
  }
}

export async function GET() {
  try {
    await fs.mkdir(CONTENT_DIR, { recursive: true });
    const industries = await readIndustries();
    return NextResponse.json(industries);
  } catch (error) {
    console.error('Error fetching industries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch industries' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await fs.mkdir(CONTENT_DIR, { recursive: true });
    
    const industryInput: IndustryInput = await request.json();
    
    if (!industryInput.title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // Generate new industry with proper types
    const now = new Date().toISOString();
    const industry: Industry = {
      id: industryInput.id || String(Date.now()),
      title: industryInput.title,
      slug: industryInput.slug || createSlug(industryInput.title),
      description: industryInput.description || '',
      type: industryInput.type || 'Technical',
      sector: industryInput.sector || '',
      keyApplications: industryInput.keyApplications || [],
      relatedCaseStudies: industryInput.relatedCaseStudies || [],
      challenges: industryInput.challenges || [],
      opportunities: industryInput.opportunities || [],
      marketSize: industryInput.marketSize,
      createdAt: industryInput.createdAt || now,
      updatedAt: now
    };

    await fs.writeFile(
      path.join(CONTENT_DIR, `${industry.slug}.json`),
      JSON.stringify(industry, null, 2)
    );

    return NextResponse.json(industry);
  } catch (error) {
    console.error('Error saving industry:', error);
    return NextResponse.json(
      { error: 'Failed to save industry' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const industryInput: IndustryInput = await request.json();
    
    if (!industryInput.title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // Ensure required arrays exist
    const industry: Industry = {
      ...industryInput as Industry,
      updatedAt: new Date().toISOString(),
      keyApplications: industryInput.keyApplications || [],
      relatedCaseStudies: industryInput.relatedCaseStudies || [],
      challenges: industryInput.challenges || [],
      opportunities: industryInput.opportunities || []
    };

    const existingFiles = await fs.readdir(CONTENT_DIR);
    const oldFile = existingFiles.find(file => {
      const content = require(path.join(CONTENT_DIR, file));
      return content.id === params.id;
    });
    
    if (oldFile && oldFile !== `${industry.slug}.json`) {
      await fs.unlink(path.join(CONTENT_DIR, oldFile));
    }

    await fs.writeFile(
      path.join(CONTENT_DIR, `${industry.slug}.json`),
      JSON.stringify(industry, null, 2)
    );

    return NextResponse.json(industry);
  } catch (error) {
    console.error('Error updating industry:', error);
    return NextResponse.json(
      { error: 'Failed to update industry' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    const fileToDelete = files.find(file => {
      const content = require(path.join(CONTENT_DIR, file));
      return content.id === params.id;
    });

    if (!fileToDelete) {
      return NextResponse.json(
        { error: 'Industry not found' },
        { status: 404 }
      );
    }

    await fs.unlink(path.join(CONTENT_DIR, fileToDelete));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting industry:', error);
    return NextResponse.json(
      { error: 'Failed to delete industry' },
      { status: 500 }
    );
  }
}