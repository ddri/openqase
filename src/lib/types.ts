// Base content interface that all content types extend from
export interface BaseContent {
  title: string;
  type: ContentType;
  slug: string;
  description: string;
  lastUpdated: string;
}

// Valid content types
export type ContentType = 'algorithm' | 'case-study' | 'industry' | 'persona';

// Layer type for architectural components
export type Layer = 1 | 2 | 3 | 4 | 5;

// Application example type used in several content types
export interface Application {
  title: string;
  description: string;
  examples: string[];
}

// Related content references
export interface RelatedContent {
  algorithms?: string[];
  caseStudies?: string[];
}

// Algorithm-specific interface
export interface Algorithm extends BaseContent {
  complexity: string;
  applications: string[];
  prerequisites: string[];
  relatedCaseStudies: string[];
  keywords: string[];
}

// Case study specific interface
export interface CaseStudy extends BaseContent {
  personas: string[];
  industries: string[];
  algorithms: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  metrics: {
    [key: string]: string | number;
  };
  technologies: string[];
}

// Industry specific interface
export interface Industry extends BaseContent {
  sector: string;
  keyApplications: Application[];
  relatedCaseStudies: string[];
  color?: string;
  layer?: Layer;
  applications?: Application[];
  relatedContent?: RelatedContent;
}

// Persona specific interface
export interface Persona extends BaseContent {
  role: string;
  expertise: string[];
  relatedCaseStudies: string[];
  keywords: string[];
}

// Type guard functions to check content types
export function isAlgorithm(content: BaseContent): content is Algorithm {
  return 'complexity' in content && 'prerequisites' in content;
}

export function isCaseStudy(content: BaseContent): content is CaseStudy {
  return 'difficulty' in content && 'metrics' in content;
}

export function isIndustry(content: BaseContent): content is Industry {
  return 'sector' in content && 'keyApplications' in content;
}

export function isPersona(content: BaseContent): content is Persona {
  return 'role' in content && 'expertise' in content;
}

// Utility type for content maps
export type ContentMap<T extends BaseContent> = {
  [slug: string]: T;
};

// Type for the complete content store
export interface ContentStore {
  algorithms: ContentMap<Algorithm>;
  caseStudies: ContentMap<CaseStudy>;
  industries: ContentMap<Industry>;
  personas: ContentMap<Persona>;
}

// Validation interfaces
export interface ValidationError {
  path: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}