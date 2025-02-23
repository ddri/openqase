import { compileMDX } from 'next-mdx-remote/rsc';
import { promises as fs } from 'fs';
import path from 'path';
import { cache } from 'react';
import matter from 'gray-matter';
import type { BaseContent, ContentType, Persona, Industry, Algorithm, CaseStudy } from '@/lib/types';

const CONTENT_DIR = path.join(process.cwd(), 'content');

type ContentTypeMap = {
  'persona': Persona;
  'industry': Industry;
  'algorithm': Algorithm;
  'case-study': CaseStudy;
}

// Directory to content type mapping
const DIR_TO_TYPE: Record<string, ContentType> = {
  'personas': 'persona',
  'industries': 'industry',
  'algorithms': 'algorithm',
  'case-studies': 'case-study'
};

// Cache the content loading to improve performance
export const loadContentByType = cache(async <T extends ContentType>(
  type: T
): Promise<Record<string, ContentTypeMap[T]>> => {
  // Map content type to directory name
  const dirName = Object.entries(DIR_TO_TYPE).find(([_, t]) => t === type)?.[0];
  if (!dirName) {
    throw new Error(`Invalid content type: ${type}`);
  }

  const contentPath = path.join(CONTENT_DIR, dirName);
  const contentMap: Record<string, ContentTypeMap[T]> = {};

  try {
    const files = await fs.readdir(contentPath);
    
    // Process all MDX files in parallel
    const contentPromises = files
      .filter(file => file.endsWith('.mdx'))
      .map(async (file) => {
        const filePath = path.join(contentPath, file);
        const source = await fs.readFile(filePath, 'utf-8');
        
        // Parse frontmatter and content
        const { data, content: mdxContent } = matter(source);
        
        // Add type if not present
        if (!data.type) {
          data.type = type;
        }
        
        // Compile MDX content
        await compileMDX({
          source: mdxContent,
          options: { parseFrontmatter: true }
        });

        // Validate required fields based on content type
        validateContentFields(data, type);

        // Create the content object with the raw MDX content
        const contentObj = {
          ...data,
          type,
          rawContent: mdxContent,
          lastModified: new Date(data.lastUpdated).toISOString()
        };

        return {
          slug: data.slug,
          // Cast the content object to the correct type
          content: contentObj as unknown as ContentTypeMap[T]
        };
      });

    const contents = await Promise.all(contentPromises);
    
    // Build the content map
    contents.forEach(({ slug, content }) => {
      contentMap[slug] = content;
    });

    return contentMap;
  } catch (error) {
    console.error(`Error loading ${type} content:`, error);
    throw new Error(`Failed to load ${type} content`);
  }
});

// Validate required fields for each content type
function validateContentFields(data: any, type: ContentType) {
  const requiredFields = new Set([
    'title',
    'slug',
    'description',
    'lastUpdated'
  ]);

  // Add type-specific required fields
  switch (type) {
    case 'algorithm':
      requiredFields.add('complexity');
      requiredFields.add('applications');
      requiredFields.add('prerequisites');
      break;
    case 'case-study':
      requiredFields.add('personas');
      requiredFields.add('industries');
      requiredFields.add('algorithms');
      requiredFields.add('metrics');
      break;
    case 'industry':
      requiredFields.add('sector');
      requiredFields.add('keyApplications');
      break;
    case 'persona':
      requiredFields.add('role');
      requiredFields.add('expertise');
      break;
  }

  const missingFields = Array.from(requiredFields)
    .filter(field => !data[field]);

  if (missingFields.length > 0) {
    throw new Error(
      `Missing required fields for ${type}: ${missingFields.join(', ')}`
    );
  }
}

export const loadAllContent = cache(async () => {
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
});

export const loadContentBySlug = cache(async <T extends ContentType>(
  type: T,
  slug: string
): Promise<ContentTypeMap[T] | null> => {
  const contentMap = await loadContentByType(type);
  return contentMap[slug] || null;
});