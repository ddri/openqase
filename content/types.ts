// content/types.ts

// Base type for all content
export interface BaseContent {
    id: string;
    title: string;
    slug: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }
  
  // Types for specific content
  export interface Persona extends BaseContent {
    type: 'Technical' | 'Persona';
    role: string;
    expertise: string[];
    relatedCaseStudies: string[];
  }
  
  export interface Industry extends BaseContent {
    sector: string;
    keyApplications: string[];
    relatedCaseStudies: string[];
  }
  
  export interface Algorithm extends BaseContent {
    type: 'Technical';
    complexity: string;
    applications: string[];
    prerequisites: string[];
    relatedCaseStudies: string[];
  }
  
  export interface CaseStudy extends BaseContent {
    content: string;
    personas: string[];
    industries: string[];
    algorithms: string[];
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    tags: string[];
  }
  
  // Utilities for content relationships
  export type ContentType = 'persona' | 'industry' | 'algorithm' | 'case-study';
  
  // Utility to get related content
  export function getRelatedContent<T extends BaseContent>(
    content: T,
    relatedIds: string[],
    contentMap: Record<string, BaseContent>
  ): BaseContent[] {
    return relatedIds
      .map(id => contentMap[id])
      .filter((item): item is BaseContent => item !== undefined);
  }
  
  // Type guard utilities
  export function isPersona(content: BaseContent): content is Persona {
    return 'role' in content;
  }
  
  export function isIndustry(content: BaseContent): content is Industry {
    return 'sector' in content;
  }
  
  export function isAlgorithm(content: BaseContent): content is Algorithm {
    return 'complexity' in content;
  }
  
  export function isCaseStudy(content: BaseContent): content is CaseStudy {
    return 'difficulty' in content;
  }
  
  // Utility to generate static paths
  export function generateStaticPaths(contentMap: Record<string, BaseContent>) {
    return {
      paths: Object.keys(contentMap).map(slug => ({
        params: { slug }
      })),
      fallback: false
    };
  }