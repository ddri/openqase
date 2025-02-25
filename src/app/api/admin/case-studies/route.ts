// src/app/api/admin/case-study/route.ts
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { CaseStudy } from '@/lib/types';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'case-study');

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function readCaseStudyList(): Promise<CaseStudy[]> {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    const caseStudyList = await Promise.all(
      files
        .filter(file => file.endsWith('.json'))
        .map(async file => {
          const content = await fs.readFile(path.join(CONTENT_DIR, file), 'utf-8');
          return JSON.parse(content) as CaseStudy;
        })
    );
    return caseStudyList;
  } catch (error) {
    console.error('Error reading case study list:', error);
    return [];
  }
}

// Helper to validate relationships exist
async function validateRelationships(caseStudy: CaseStudy): Promise<string[]> {
  const errors: string[] = [];
  
  try {
    // Check persona references
    for (const personaId of caseStudy.persona) {
      const personaPath = path.join(process.cwd(), 'content', 'persona', `${personaId}.json`);
      try {
        await fs.access(personaPath);
      } catch {
        errors.push(`Referenced persona ${personaId} does not exist`);
      }
    }

    // Check industry references
    for (const industryId of caseStudy.industry) {
      const industryPath = path.join(process.cwd(), 'content', 'industry', `${industryId}.json`);
      try {
        await fs.access(industryPath);
      } catch {
        errors.push(`Referenced industry ${industryId} does not exist`);
      }
    }

    // Check algorithm references
    for (const algorithmId of caseStudy.algorithm) {
      const algorithmPath = path.join(process.cwd(), 'content', 'algorithm', `${algorithmId}.json`);
      try {
        await fs.access(algorithmPath);
      } catch {
        errors.push(`Referenced algorithm ${algorithmId} does not exist`);
      }
    }
  } catch (error) {
    console.error('Error validating relationships:', error);
  }

  return errors;
}

export async function GET() {
  try {
    await fs.mkdir(CONTENT_DIR, { recursive: true });
    const caseStudyList = await readCaseStudyList();
    return NextResponse.json(caseStudyList);
  } catch (error) {
    console.error('Error fetching case study list:', error);
    return NextResponse.json(
      { error: 'Failed to fetch case study list' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await fs.mkdir(CONTENT_DIR, { recursive: true });
    const caseStudy = await request.json();
    
    if (!caseStudy.title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // Validate relationships
    const relationshipErrors = await validateRelationships(caseStudy);
    if (relationshipErrors.length > 0) {
      return NextResponse.json(
        { error: 'Invalid relationships', details: relationshipErrors },
        { status: 400 }
      );
    }

    if (!caseStudy.slug) {
      caseStudy.slug = createSlug(caseStudy.title);
    }

    if (!caseStudy.id) {
      const caseStudyList = await readCaseStudyList();
      const maxId = Math.max(...caseStudyList.map((cs: CaseStudy) => parseInt(cs.id, 10)), 0);
      caseStudy.id = (maxId + 1).toString();
    }

    const now = new Date().toISOString();
    const completeCaseStudy: CaseStudy = {
      id: caseStudy.id,
      title: caseStudy.title,
      slug: caseStudy.slug,
      description: caseStudy.description || '',
      type: 'case-study',
      persona: caseStudy.persona || [],
      industry: caseStudy.industry || [],
      algorithm: caseStudy.algorithm || [],
      difficulty: caseStudy.difficulty || 'Beginner',
      tags: caseStudy.tags || [],
      metrics: caseStudy.metrics || {},
      technologies: caseStudy.technologies || [],
      rawContent: caseStudy.rawContent || '',
      lastUpdated: now,
      createdAt: caseStudy.createdAt || now,
      updatedAt: now
    };

    await fs.writeFile(
      path.join(CONTENT_DIR, `${completeCaseStudy.slug}.json`),
      JSON.stringify(completeCaseStudy, null, 2)
    );

    return NextResponse.json(completeCaseStudy);
  } catch (error) {
    console.error('Error saving case study:', error);
    return NextResponse.json(
      { error: 'Failed to save case study' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const caseStudy = await request.json();
    
    if (!caseStudy.title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // Validate relationships
    const relationshipErrors = await validateRelationships(caseStudy);
    if (relationshipErrors.length > 0) {
      return NextResponse.json(
        { error: 'Invalid relationships', details: relationshipErrors },
        { status: 400 }
      );
    }

    caseStudy.updatedAt = new Date().toISOString();

    const existingFiles = await fs.readdir(CONTENT_DIR);
    const oldFile = existingFiles.find(file => {
      const content = require(path.join(CONTENT_DIR, file));
      return content.id === params.id;
    });
    
    if (oldFile && oldFile !== `${caseStudy.slug}.json`) {
      await fs.unlink(path.join(CONTENT_DIR, oldFile));
    }

    await fs.writeFile(
      path.join(CONTENT_DIR, `${caseStudy.slug}.json`),
      JSON.stringify(caseStudy, null, 2)
    );

    return NextResponse.json(caseStudy);
  } catch (error) {
    console.error('Error updating case study:', error);
    return NextResponse.json(
      { error: 'Failed to update case study' },
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
        { error: 'Case study not found' },
        { status: 404 }
      );
    }

    await fs.unlink(path.join(CONTENT_DIR, fileToDelete));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting case study:', error);
    return NextResponse.json(
      { error: 'Failed to delete case study' },
      { status: 500 }
    );
  }
}