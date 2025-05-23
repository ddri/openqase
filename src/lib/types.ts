/**
 * Application-wide Type Definitions
 * 
 * This file contains application-specific types and interfaces that are used across the application.
 * It serves as a central location for shared types that are not directly from the database schema.
 * Database types are imported from '@/types/supabase' when needed.
 */

import type { Database } from '@/types/supabase';

// ============================================================================
// Core Type Definitions
// ============================================================================

export type ContentType = 'algorithm' | 'case-study' | 'industry' | 'persona';
export type MaturityLevel = 'Emerging' | 'Growing' | 'Established';

// ============================================================================
// Database Type Aliases
// ============================================================================

export type DbPersona = Database['public']['Tables']['personas']['Row'];
export type DbCaseStudy = Database['public']['Tables']['case_studies']['Row'];
export type DbAlgorithm = Database['public']['Tables']['algorithms']['Row'];
export type DbIndustry = Database['public']['Tables']['industries']['Row'];

// ============================================================================
// Base Interfaces
// ============================================================================

export interface BaseContent {
  type: ContentType;
  id: string;
  slug: string;
  title: string;
  description: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface Application {
  title: string;
  description: string;
  examples: string[];
}

export interface RelatedContent {
  algorithms?: string[];
  case_studies?: string[];
  industries?: string[];
  personas?: string[];
}

// ============================================================================
// Content Type Interfaces
// ============================================================================

export interface CaseStudy extends BaseContent {
  type: 'case-study';
  main_content: string | null;
  partner_companies: string[];
  quantum_companies: string[];
  url: string | null;
  algorithms: string[];
  industries: string[];
  personas: string[];
  quantum_hardware: string[];
  quantum_software: string[];
  published: boolean | null;
  published_at: string | null;
  lastUpdated: string | null;
}

export interface Algorithm extends BaseContent {
  type: 'algorithm';
  prerequisites: string[];
  use_cases: string[];
  published: boolean;
}

export interface Industry extends BaseContent {
  type: 'industry';
  icon: string | null;
}

export interface Persona extends BaseContent {
  type: 'persona';
  role: string | null;
  industry: string[];
}

// ============================================================================
// Content Store Types
// ============================================================================

export interface ContentMap<T extends BaseContent> {
  [slug: string]: T;
}

export interface ContentStore {
  algorithm: ContentMap<Algorithm>;
  case_study: ContentMap<CaseStudy>;
  industry: ContentMap<Industry>;
  persona: ContentMap<Persona>;
}

// ============================================================================
// Component Props Types
// ============================================================================

export interface LearningPathLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

// ============================================================================
// Type Guards
// ============================================================================

export function isCaseStudy(content: BaseContent): content is CaseStudy {
  return content.type === 'case-study';
}

export function isAlgorithm(content: BaseContent): content is Algorithm {
  return content.type === 'algorithm';
}

export function isIndustry(content: BaseContent): content is Industry {
  return content.type === 'industry';
}

export function isPersona(content: BaseContent): content is Persona {
  return content.type === 'persona';
}