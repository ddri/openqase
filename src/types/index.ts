// src/types/index.ts

// Base content type
interface BaseContent {
    id: string;
    title: string;
    slug: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }
  
  // Persona types
  export interface Persona extends BaseContent {
    type: 'Technical' | 'Persona';
    role: string;
    expertise: string[];
    relatedCaseStudies: string[]; // IDs of related case studies
  }
  
  // Industry types
  export interface Industry extends BaseContent {
    type: 'Technical' | 'Persona';
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