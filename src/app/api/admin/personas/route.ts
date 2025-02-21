// src/app/api/admin/personas/route.ts
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { Persona } from '@/types';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'persona');

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function readPersonas(): Promise<Persona[]> {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    const personas = await Promise.all(
      files
        .filter(file => file.endsWith('.json'))
        .map(async file => {
          const content = await fs.readFile(path.join(CONTENT_DIR, file), 'utf-8');
          return JSON.parse(content) as Persona;
        })
    );
    return personas;
  } catch (error) {
    console.error('Error reading personas:', error);
    return [];
  }
}

export async function GET() {
  try {
    await fs.mkdir(CONTENT_DIR, { recursive: true });
    const personas = await readPersonas();
    return NextResponse.json(personas);
  } catch (error) {
    console.error('Error fetching personas:', error);
    return NextResponse.json(
      { error: 'Failed to fetch personas' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await fs.mkdir(CONTENT_DIR, { recursive: true });
    const persona = await request.json();
    
    if (!persona.title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    if (!persona.slug) {
      persona.slug = createSlug(persona.title);
    }

    if (!persona.id) {
      const personas = await readPersonas();
      const maxId = Math.max(...personas.map(p => parseInt(p.id, 10)), 0);
      persona.id = (maxId + 1).toString();
    }

    const now = new Date().toISOString();
    const completePersona: Persona = {
      id: persona.id,
      title: persona.title,
      slug: persona.slug,
      type: persona.type || 'Technical',
      description: persona.description || '',
      role: persona.role || '',
      expertise: persona.expertise || [],
      relatedCaseStudies: persona.relatedCaseStudies || [],
      createdAt: persona.createdAt || now,
      updatedAt: now
    };

    await fs.writeFile(
      path.join(CONTENT_DIR, `${completePersona.slug}.json`),
      JSON.stringify(completePersona, null, 2)
    );

    return NextResponse.json(completePersona);
  } catch (error) {
    console.error('Error saving persona:', error);
    return NextResponse.json(
      { error: 'Failed to save persona' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const persona = await request.json();
    
    if (!persona.title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    persona.updatedAt = new Date().toISOString();

    const existingFiles = await fs.readdir(CONTENT_DIR);
    const oldFile = existingFiles.find(file => {
      const content = require(path.join(CONTENT_DIR, file));
      return content.id === params.id;
    });
    
    if (oldFile && oldFile !== `${persona.slug}.json`) {
      await fs.unlink(path.join(CONTENT_DIR, oldFile));
    }

    await fs.writeFile(
      path.join(CONTENT_DIR, `${persona.slug}.json`),
      JSON.stringify(persona, null, 2)
    );

    return NextResponse.json(persona);
  } catch (error) {
    console.error('Error updating persona:', error);
    return NextResponse.json(
      { error: 'Failed to update persona' },
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
        { error: 'Persona not found' },
        { status: 404 }
      );
    }

    await fs.unlink(path.join(CONTENT_DIR, fileToDelete));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting persona:', error);
    return NextResponse.json(
      { error: 'Failed to delete persona' },
      { status: 500 }
    );
  }
}