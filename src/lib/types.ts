// Type definitions
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type ContentType = 'algorithm' | 'case-study' | 'industry' | 'persona' | 'blog';
export type MaturityLevel = 'Emerging' | 'Growing' | 'Established';

// Common interfaces
export interface Application {
  title: string;
  description: string;
  examples: string[];
}

export interface RelatedContent {
  algorithms?: string[];
  caseStudies?: string[];
  industries?: string[];
  personas?: string[];
}

// Base content interface that all content types extend from
export interface BaseContent {
  id: string;
  title: string;
  type: ContentType;
  slug: string;
  description: string;
  lastUpdated: string;
  difficulty: DifficultyLevel;
  keywords?: string[];
  relatedContent?: RelatedContent;
}

// Algorithm-specific interface
export interface Algorithm extends BaseContent {
  applications: string[];
  prerequisites?: string[];
  implementation?: {
    steps: string[];
    requirements: string[];
    considerations: string[];
  };
}

// Case study specific interface
export interface CaseStudy extends BaseContent {
  industry: string[];
  technologies?: string[];
  metrics?: Record<string, string>;
  outcomes?: {
    challenges: string[];
    solutions: string[];
    results: string[];
  };
}

// Industry specific interface
export interface Industry extends BaseContent {
  sector: string;
  keyApplications: string[];
}

// Persona specific interface
export interface Persona extends BaseContent {
  role: string;
  expertise: string[];
  goals?: string[];
  challenges?: string[];
  learningPath?: {
    prerequisites: string[];
    recommendations: string[];
  };
}

// Blog post specific interface
export interface BlogPost {
  title: string;
  description: string;
  date: string;
  category: string;
  published: boolean;
  slug: string;
}

// Type guard functions to check content types
export function isAlgorithm(content: BaseContent): content is Algorithm {
  return content.type === 'algorithm';
}

export function isCaseStudy(content: BaseContent): content is CaseStudy {
  return content.type === 'case-study';
}

export function isIndustry(content: BaseContent): content is Industry {
  return content.type === 'industry';
}

export function isPersona(content: BaseContent): content is Persona {
  return content.type === 'persona';
}

export function isBlogPost(content: any): content is BlogPost {
  return content && 'title' in content && 'date' in content && 'category' in content;
}

// Type for content maps
export type ContentMap<T> = { [slug: string]: T };

// Type for the complete content store
export interface ContentStore {
  algorithm: ContentMap<Algorithm>;
  caseStudy: ContentMap<CaseStudy>;
  industry: ContentMap<Industry>;
  persona: ContentMap<Persona>;
  blog: ContentMap<BlogPost>;
}