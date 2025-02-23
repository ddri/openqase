import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {
  Algorithm,
  CaseStudy,
  Industry,
  Persona,
  ValidationResult,
  ValidationError,
  ContentType
} from './types';

interface ContentPaths {
  algorithms: Set<string>;
  caseStudies: Set<string>;
  industries: Set<string>;
  personas: Set<string>;
}

// Cache content paths to avoid repeated filesystem access
let contentPathsCache: ContentPaths | null = null;

async function getContentPaths(): Promise<ContentPaths> {
  if (contentPathsCache) {
    return contentPathsCache;
  }

  const contentDir = path.join(process.cwd(), 'content');
  const paths: ContentPaths = {
    algorithms: new Set(),
    caseStudies: new Set(),
    industries: new Set(),
    personas: new Set(),
  };

  // Load all content paths
  for (const type of ['algorithms', 'case-studies', 'industries', 'personas']) {
    const dir = path.join(contentDir, type);
    try {
      const files = await fs.readdir(dir);
      const slugs = files
        .filter(f => f.endsWith('.mdx'))
        .map(f => f.replace('.mdx', ''));
      
      // Map directory names to content types
      const key = type === 'case-studies' ? 'caseStudies' : type;
      slugs.forEach(slug => paths[key as keyof ContentPaths].add(slug));
    } catch (error) {
      console.error(`Error reading ${type} directory:`, error);
    }
  }

  contentPathsCache = paths;
  return paths;
}

async function validateAlgorithm(content: Algorithm, filePath: string): Promise<ValidationError[]> {
  const errors: ValidationError[] = [];
  const paths = await getContentPaths();

  // Validate related case studies exist
  for (const study of content.relatedCaseStudies) {
    if (!paths.caseStudies.has(study)) {
      errors.push({
        path: filePath,
        message: `Referenced case study "${study}" does not exist`
      });
    }
  }

  // Validate complexity format
  if (!content.complexity.match(/O\([^)]+\)/)) {
    errors.push({
      path: filePath,
      message: 'Complexity should be in Big O notation, e.g., O(n)'
    });
  }

  return errors;
}

async function validateCaseStudy(content: CaseStudy, filePath: string): Promise<ValidationError[]> {
  const errors: ValidationError[] = [];
  const paths = await getContentPaths();

  // Validate referenced content exists
  for (const persona of content.personas) {
    if (!paths.personas.has(persona)) {
      errors.push({
        path: filePath,
        message: `Referenced persona "${persona}" does not exist`
      });
    }
  }

  for (const industry of content.industries) {
    if (!paths.industries.has(industry)) {
      errors.push({
        path: filePath,
        message: `Referenced industry "${industry}" does not exist`
      });
    }
  }

  for (const algorithm of content.algorithms) {
    if (!paths.algorithms.has(algorithm)) {
      errors.push({
        path: filePath,
        message: `Referenced algorithm "${algorithm}" does not exist`
      });
    }
  }

  // Validate metrics
  if (!content.metrics || Object.keys(content.metrics).length === 0) {
    errors.push({
      path: filePath,
      message: 'Case study must include at least one metric'
    });
  }

  return errors;
}

async function validateIndustry(content: Industry, filePath: string): Promise<ValidationError[]> {
  const errors: ValidationError[] = [];
  const paths = await getContentPaths();

  // Validate related case studies
  for (const study of content.relatedCaseStudies) {
    if (!paths.caseStudies.has(study)) {
      errors.push({
        path: filePath,
        message: `Referenced case study "${study}" does not exist`
      });
    }
  }

  // Validate applications
  if (!content.keyApplications || content.keyApplications.length === 0) {
    errors.push({
      path: filePath,
      message: 'Industry must include at least one key application'
    });
  }

  return errors;
}

async function validatePersona(content: Persona, filePath: string): Promise<ValidationError[]> {
  const errors: ValidationError[] = [];
  const paths = await getContentPaths();

  // Validate related case studies
  for (const study of content.relatedCaseStudies) {
    if (!paths.caseStudies.has(study)) {
      errors.push({
        path: filePath,
        message: `Referenced case study "${study}" does not exist`
      });
    }
  }

  // Validate expertise
  if (!content.expertise || content.expertise.length === 0) {
    errors.push({
      path: filePath,
      message: 'Persona must include at least one area of expertise'
    });
  }

  return errors;
}

export async function validateContent(type: ContentType, filePath: string): Promise<ValidationResult> {
  try {
    const content = matter(await fs.readFile(filePath, 'utf-8')).data;
    let errors: ValidationError[] = [];

    // Validate common fields
    if (!content.title || typeof content.title !== 'string') {
      errors.push({ path: filePath, message: 'Missing or invalid title' });
    }
    if (!content.description || typeof content.description !== 'string') {
      errors.push({ path: filePath, message: 'Missing or invalid description' });
    }
    if (!content.lastUpdated || isNaN(new Date(content.lastUpdated).getTime())) {
      errors.push({ path: filePath, message: 'Missing or invalid lastUpdated date' });
    }

    // Type-specific validation
    switch (type) {
      case 'algorithm':
        errors = errors.concat(await validateAlgorithm(content as Algorithm, filePath));
        break;
      case 'case-study':
        errors = errors.concat(await validateCaseStudy(content as CaseStudy, filePath));
        break;
      case 'industry':
        errors = errors.concat(await validateIndustry(content as Industry, filePath));
        break;
      case 'persona':
        errors = errors.concat(await validatePersona(content as Persona, filePath));
        break;
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  } catch (error) {
    return {
      isValid: false,
      errors: [{
        path: filePath,
        message: `Failed to validate content: ${error instanceof Error ? error.message : 'Unknown error'}`
      }]
    };
  }
}

export async function validateAllContent(): Promise<ValidationResult> {
  const contentDir = path.join(process.cwd(), 'content');
  const errors: ValidationError[] = [];

  // Clear the cache before full validation
  contentPathsCache = null;

  const contentTypes = {
    'algorithms': 'algorithm',
    'case-studies': 'case-study',
    'industries': 'industry',
    'personas': 'persona'
  } as const;

  for (const [dir, type] of Object.entries(contentTypes)) {
    const typeDir = path.join(contentDir, dir);
    try {
      const files = await fs.readdir(typeDir);
      for (const file of files) {
        if (file.endsWith('.mdx')) {
          const result = await validateContent(type, path.join(typeDir, file));
          errors.push(...result.errors);
        }
      }
    } catch (error) {
      errors.push({
        path: typeDir,
        message: `Failed to read directory: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}