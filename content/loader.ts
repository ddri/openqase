// content/loader.ts
import { promises as fs } from 'fs';
import path from 'path';
import { BaseContent, ContentType } from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export async function loadContentByType(type: ContentType): Promise<Record<string, BaseContent>> {
  const contentPath = path.join(CONTENT_DIR, type);
  const contentMap: Record<string, BaseContent> = {};

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

export async function loadAllContent(): Promise<{
  personas: Record<string, BaseContent>;
  industries: Record<string, BaseContent>;
  algorithms: Record<string, BaseContent>;
  caseStudies: Record<string, BaseContent>;
}> {
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

export async function loadContentBySlug(type: ContentType, slug: string): Promise<BaseContent | null> {
  const contentMap = await loadContentByType(type);
  return contentMap[slug] || null;
}