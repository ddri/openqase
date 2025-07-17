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

export type ContentType = 'algorithm' | 'case-study' | 'industry' | 'persona' | 'blog-post';
export type MaturityLevel = 'Emerging' | 'Growing' | 'Established';

// ============================================================================
// Database Type Aliases
// ============================================================================

export type DbPersona = Database['public']['Tables']['personas']['Row'];
export type DbCaseStudy = Database['public']['Tables']['case_studies']['Row'];
export type DbAlgorithm = Database['public']['Tables']['algorithms']['Row'];
export type DbIndustry = Database['public']['Tables']['industries']['Row'];
export type DbBlogPost = Database['public']['Tables']['blog_posts']['Row'];

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
  blog_posts?: string[];
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
  year: number;
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

export interface BlogPost extends BaseContent {
  type: 'blog-post';
  content: string | null;
  author: string | null;
  category: string | null;
  tags: string[] | null;
  featured_image: string | null;
  featured: boolean | null;
  published: boolean | null;
  published_at: string | null;
}

// ============================================================================
// Enriched Content Types (with relationships)
// ============================================================================

export interface EnrichedBlogPost extends BlogPost {
  blog_post_relations?: {
    related_blog_post_id: string;
    related_blog_posts: {
      id: string;
      title: string;
      slug: string;
      description: string | null;
      published_at: string | null;
      author: string | null;
      category: string | null;
      tags: string[] | null;
    };
  }[];
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
  blog_post: ContentMap<BlogPost>;
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

export function isBlogPost(content: BaseContent): content is BlogPost {
  return content.type === 'blog-post';
}