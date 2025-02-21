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

// Difficulty levels
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

// Persona types
export interface Persona extends BaseContent {
  type: PersonaType;
  role: string;
  expertise: string[];
  relatedCaseStudies: string[]; // IDs of related case studies
  challenges?: string[];        // Optional: specific challenges this persona faces
  learningPath?: string[];     // Optional: recommended learning sequence
}

// Industry types
export interface Industry extends BaseContent {
  type: PersonaType;
  sector: string;
  keyApplications: string[];
  relatedCaseStudies: string[];
  challenges: string[];        // Industry-specific challenges
  opportunities: string[];     // Quantum computing opportunities in this industry
  marketSize?: string;        // Optional: market size/potential
}

// Algorithm types
export interface Algorithm extends BaseContent {
  type: 'Technical';
  complexity: DifficultyLevel;  // Changed to use shared DifficultyLevel type
  applications: string[];
  prerequisites: string[];
  relatedCaseStudies: string[];
  technicalDetails?: {         // Optional technical specifics
    quantumCircuit?: string;   // Circuit description or reference
    classicalComplexity: string;
    quantumAdvantage: string;
  };
  implementationGuide?: {      // Optional implementation details
    framework: string;
    codeExample?: string;
    considerations: string[];
  };
}

// Case Study type
export interface CaseStudy extends BaseContent {
  content: string;             // Main content in markdown
  personas: string[];         // IDs of related personas
  industries: string[];       // IDs of related industries
  algorithms: string[];       // IDs of related algorithms
  difficulty: DifficultyLevel;
  tags: string[];
  implementation?: {          // Optional implementation details
    codeRepo?: string;
    framework: string;
    requirements: string[];
  };
  results?: {                // Optional results section
    metrics: Record<string, number>;
    conclusions: string[];
  };
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

// Content relationships (new)
export interface ContentRelationship {
  sourceId: string;
  sourceType: ContentType;
  targetId: string;
  targetType: ContentType;
  relationshipType: 'related' | 'prerequisite' | 'implementation';
}

// Content metadata and stats (new)
export interface ContentMetadata {
  totalCaseStudies: number;
  personaStats: {
    technical: number;
    nonTechnical: number;
  };
  industryStats: Record<string, number>;  // industry -> number of case studies
  algorithmStats: {
    byComplexity: Record<DifficultyLevel, number>;
    totalImplementations: number;
  };
}