// src/app/api/admin/algorithm/route.ts
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { Algorithm } from '@/lib/types';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'algorithm');

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function readAlgorithmList(): Promise<Algorithm[]> {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    const algorithmList = await Promise.all(
      files
        .filter(file => file.endsWith('.json'))
        .map(async file => {
          const content = await fs.readFile(path.join(CONTENT_DIR, file), 'utf-8');
          return JSON.parse(content) as Algorithm;
        })
    );
    return algorithmList;
  } catch (error) {
    console.error('Error reading algorithm list:', error);
    return [];
  }
}

export async function GET() {
  try {
    await fs.mkdir(CONTENT_DIR, { recursive: true });
    const algorithmList = await readAlgorithmList();
    return NextResponse.json(algorithmList);
  } catch (error) {
    console.error('Error fetching algorithm list:', error);
    return NextResponse.json(
      { error: 'Failed to fetch algorithm list' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await fs.mkdir(CONTENT_DIR, { recursive: true });
    const algorithm = await request.json();
    
    if (!algorithm.title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    if (!algorithm.slug) {
      algorithm.slug = createSlug(algorithm.title);
    }

    if (!algorithm.id) {
      const algorithmList = await readAlgorithmList();
      const maxId = Math.max(...algorithmList.map((a: Algorithm) => parseInt(a.id, 10)), 0);
      algorithm.id = (maxId + 1).toString();
    }

    const now = new Date().toISOString();
    const completeAlgorithm: Algorithm = {
      id: algorithm.id,
      title: algorithm.title,
      slug: algorithm.slug,
      type: 'algorithm',
      complexity: algorithm.complexity || 'Beginner',
      description: algorithm.description || '',
      applications: algorithm.applications || [],
      prerequisites: algorithm.prerequisites || [],
      relatedCaseStudies: algorithm.relatedCaseStudies || [],
      keywords: algorithm.keywords || [],
      lastUpdated: now,
      rawContent: algorithm.rawContent || ''
    };

    await fs.writeFile(
      path.join(CONTENT_DIR, `${completeAlgorithm.slug}.json`),
      JSON.stringify(completeAlgorithm, null, 2)
    );

    return NextResponse.json(completeAlgorithm);
  } catch (error) {
    console.error('Error saving algorithm:', error);
    return NextResponse.json(
      { error: 'Failed to save algorithm' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const algorithm = await request.json();
    
    if (!algorithm.title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    algorithm.updatedAt = new Date().toISOString();

    const existingFiles = await fs.readdir(CONTENT_DIR);
    const oldFile = existingFiles.find(file => {
      const content = require(path.join(CONTENT_DIR, file));
      return content.id === params.id;
    });
    
    if (oldFile && oldFile !== `${algorithm.slug}.json`) {
      await fs.unlink(path.join(CONTENT_DIR, oldFile));
    }

    await fs.writeFile(
      path.join(CONTENT_DIR, `${algorithm.slug}.json`),
      JSON.stringify(algorithm, null, 2)
    );

    return NextResponse.json(algorithm);
  } catch (error) {
    console.error('Error updating algorithm:', error);
    return NextResponse.json(
      { error: 'Failed to update algorithm' },
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
        { error: 'Algorithm not found' },
        { status: 404 }
      );
    }

    await fs.unlink(path.join(CONTENT_DIR, fileToDelete));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting algorithm:', error);
    return NextResponse.json(
      { error: 'Failed to delete algorithm' },
      { status: 500 }
    );
  }
}