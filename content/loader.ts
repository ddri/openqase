import { promises as fs } from 'fs';
import path from 'path';
import type { BaseContent, ContentType, Persona, Industry, Algorithm, CaseStudy } from '@/types';

const CONTENT_DIR = path.join(process.cwd(), 'content');

type ContentTypeMap = {
  'persona': Persona;
  'industry': Industry;
  'algorithm': Algorithm;
  'case-study': CaseStudy;
}

export async function loadContentByType<T extends ContentType>(
  type: T
): Promise<Record<string, ContentTypeMap[T]>> {
  const contentPath = path.join(CONTENT_DIR, type);
  const contentMap: Record<string, ContentTypeMap[T]> = {};

  try {
    const files = await fs.readdir(contentPath);
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(contentPath, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const parsed = JSON.parse(content);
        contentMap[parsed.slug] = parsed;
      }
    }

    return contentMap;
  } catch (error) {
    console.error(`Error loading ${type} content:`, error);
    return {};
  }
}

export async function loadAllContent() {
  const [personas, industries, algorithms, caseStudies] = await Promise.all([
    loadContentByType('persona'),
    loadContentByType('industry'),
    loadContentByType('algorithm'),
    loadContentByType('case-study'),
  ]);

  return {
    personas,
    industries,
    algorithms,
    caseStudies,
  };
}

export async function loadContentBySlug<T extends ContentType>(
  type: T,
  slug: string
): Promise<ContentTypeMap[T] | null> {
  const contentMap = await loadContentByType(type);
  return contentMap[slug] || null;
}