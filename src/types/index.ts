// Base content type
export interface BaseContent {
  id: string;
  title: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// Exported type definition for PersonaType
export type PersonaType = 'Technical' | 'Persona';

// Content type definition for the loader
export type ContentType = 'persona' | 'industry' | 'algorithm' | 'case-study';

// Persona types
export interface Persona extends BaseContent {
  type: PersonaType;
  role: string;
  expertise: string[];
  relatedCaseStudies: string[]; // IDs of related case studies
}

// Industry types
export interface Industry extends BaseContent {
  type: PersonaType;
  sector: string;
  keyApplications: string[];
  relatedCaseStudies: string[];
}

// Algorithm types
export interface Algorithm extends BaseContent {
  type: 'Technical';
  complexity: string;
  applications: string[];
  prerequisites: string[];
  relatedCaseStudies: string[];
}

// Case Study type
export interface CaseStudy extends BaseContent {
  content: string;
  personas: string[]; // IDs of related personas
  industries: string[]; // IDs of related industries
  algorithms: string[]; // IDs of related algorithms
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
}

// Quantum Stack item type
export interface StackItem {
  id: string;
  title: string;
  description: string;
  details: {
    overview: string;
    examples?: string[];
    additionalInfo?: string;
  };
}