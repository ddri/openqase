export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_preferences: {
        Row: {
          id: string
          theme_preference: string
          ui_preferences: Json
          email_preferences: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          theme_preference?: string
          ui_preferences?: Json
          email_preferences?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          theme_preference?: string
          ui_preferences?: Json
          email_preferences?: Json
          created_at?: string
          updated_at?: string
        }
      }
      case_studies: {
        Row: {
          id: string
          slug: string
          title: string
          description: string | null
          content: string | null
          partner_companies: string[]
          quantum_companies: string[]
          url: string | null
          algorithms: string[]
          industries: string[]
          personas: string[]
          qubits_used: number | null
          quantum_hardware: string[]
          classical_hardware: string[]
          published: boolean
          featured: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description?: string | null
          content?: string | null
          partner_companies?: string[]
          quantum_companies?: string[]
          url?: string | null
          algorithms?: string[]
          industries?: string[]
          personas?: string[]
          qubits_used?: number | null
          quantum_hardware?: string[]
          classical_hardware?: string[]
          published?: boolean
          featured?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description?: string | null
          content?: string | null
          partner_companies?: string[]
          quantum_companies?: string[]
          url?: string | null
          algorithms?: string[]
          industries?: string[]
          personas?: string[]
          qubits_used?: number | null
          quantum_hardware?: string[]
          classical_hardware?: string[]
          published?: boolean
          featured?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      algorithms: {
        Row: {
          id: string
          slug: string
          name: string
          description: string | null
          prerequisites: string[]
          use_cases: string[]
          published: boolean
          created_at: string
          updated_at: string
          mdx_content: string | null
          key_applications: string[] | null
          ts_content: unknown
        }
        Insert: {
          id?: string
          slug: string
          name: string
          description?: string | null
          prerequisites?: string[]
          use_cases?: string[]
          published?: boolean
          created_at?: string
          updated_at?: string
          mdx_content?: string | null
          key_applications?: string[] | null
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          description?: string | null
          prerequisites?: string[]
          use_cases?: string[]
          published?: boolean
          created_at?: string
          updated_at?: string
          mdx_content?: string | null
          key_applications?: string[] | null
        }
      }
      industries: {
        Row: {
          id: string
          slug: string
          name: string
          description: string | null
          icon: string | null
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          description?: string | null
          icon?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          description?: string | null
          icon?: string | null
          created_at?: string
        }
      }
      personas: {
        Row: {
          id: string
          slug: string
          name: string
          description: string | null
          role: string | null
          industry: string[]
          key_interests: string[]
          technical_level: string | null
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          description?: string | null
          role?: string | null
          industry?: string[]
          key_interests?: string[]
          technical_level?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          description?: string | null
          role?: string | null
          industry?: string[]
          key_interests?: string[]
          technical_level?: string | null
          created_at?: string
        }
      }
      blog_posts: {
        Row: BlogPost
        Insert: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export interface Algorithm {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  use_cases: string[] | null;
  published: boolean;
  created_at: string;
  updated_at: string;
  mdx_content: string | null;
  prerequisites: string[] | null;
  key_applications: string[] | null;
}

export interface Industry {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
  created_at: string;
  mdx_content: string | null;
  sector: string | null;
  key_applications: {
    title: string;
    description: string;
    examples: string[];
  }[] | null;
}

export interface Persona {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  role: string | null;
  industry: string[] | null;
  key_interests: string[] | null;
  technical_level: string | null;
  created_at: string;
  mdx_content: string | null;
  expertise: string[] | null;
  persona_type: string | null;
  related_case_studies: string[] | null;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  content: string | null;
  partner_companies: string[] | null;
  quantum_companies: string[] | null;
  url: string | null;
  algorithms: string[] | null;
  industries: string[] | null;
  personas: string[] | null;
  quantum_hardware: string[] | null;
  classical_hardware: string[] | null;
  published: boolean;
  featured: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  mdx_content: string | null;
  difficulty: string | null;
  tags: string[] | null;
  metrics: {
    [key: string]: string | number;
  } | null;
}

export interface UserPreferences {
  id: string;
  theme_preference: string;
  ui_preferences: {
    sidebar_collapsed: boolean;
    code_font_size: string;
  };
  email_preferences: {
    product_updates: boolean;
    newsletter: boolean;
    case_study_alerts: boolean;
  };
  created_at: string;
  updated_at: string;
}

export interface CaseStudyRelation {
  id: string;
  case_study_id: string;
  related_case_study_id: string;
  relation_type: string;
  created_at: string;
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  description: string | null
  content: string | null
  category: string
  published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
} 