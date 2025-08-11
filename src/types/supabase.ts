export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      algorithm_case_study_relations: {
        Row: {
          algorithm_id: string | null
          case_study_id: string | null
          created_at: string | null
          deleted_at: string | null
          id: string
        }
        Insert: {
          algorithm_id?: string | null
          case_study_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
        }
        Update: {
          algorithm_id?: string | null
          case_study_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "algorithm_case_study_relations_algorithm_id_fkey"
            columns: ["algorithm_id"]
            isOneToOne: false
            referencedRelation: "admin_algorithms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "algorithm_case_study_relations_algorithm_id_fkey"
            columns: ["algorithm_id"]
            isOneToOne: false
            referencedRelation: "algorithms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "algorithm_case_study_relations_algorithm_id_fkey"
            columns: ["algorithm_id"]
            isOneToOne: false
            referencedRelation: "public_algorithms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "algorithm_case_study_relations_algorithm_id_fkey"
            columns: ["algorithm_id"]
            isOneToOne: false
            referencedRelation: "trash_algorithms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "algorithm_case_study_relations_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "admin_case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "algorithm_case_study_relations_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "all_case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "algorithm_case_study_relations_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "algorithm_case_study_relations_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "public_case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "algorithm_case_study_relations_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "trash_case_studies"
            referencedColumns: ["id"]
          },
        ]
      }
      algorithm_industry_relations: {
        Row: {
          algorithm_id: string | null
          created_at: string | null
          id: string
          industry_id: string | null
        }
        Insert: {
          algorithm_id?: string | null
          created_at?: string | null
          id?: string
          industry_id?: string | null
        }
        Update: {
          algorithm_id?: string | null
          created_at?: string | null
          id?: string
          industry_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "algorithm_industry_relations_algorithm_id_fkey"
            columns: ["algorithm_id"]
            isOneToOne: false
            referencedRelation: "admin_algorithms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "algorithm_industry_relations_algorithm_id_fkey"
            columns: ["algorithm_id"]
            isOneToOne: false
            referencedRelation: "algorithms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "algorithm_industry_relations_algorithm_id_fkey"
            columns: ["algorithm_id"]
            isOneToOne: false
            referencedRelation: "public_algorithms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "algorithm_industry_relations_algorithm_id_fkey"
            columns: ["algorithm_id"]
            isOneToOne: false
            referencedRelation: "trash_algorithms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "algorithm_industry_relations_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "admin_industries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "algorithm_industry_relations_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "algorithm_industry_relations_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "public_industries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "algorithm_industry_relations_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "trash_industries"
            referencedColumns: ["id"]
          },
        ]
      }
      algorithms: {
        Row: {
          academic_references: string | null
          archived_at: string | null
          archived_by: string | null
          content_status: string | null
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          id: string
          is_system_record: boolean | null
          main_content: string | null
          name: string
          published: boolean | null
          published_at: string | null
          quantum_advantage: string | null
          slug: string
          steps: string | null
          ts_content: unknown | null
          updated_at: string | null
          use_cases: string[] | null
        }
        Insert: {
          academic_references?: string | null
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: string
          is_system_record?: boolean | null
          main_content?: string | null
          name: string
          published?: boolean | null
          published_at?: string | null
          quantum_advantage?: string | null
          slug: string
          steps?: string | null
          ts_content?: unknown | null
          updated_at?: string | null
          use_cases?: string[] | null
        }
        Update: {
          academic_references?: string | null
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: string
          is_system_record?: boolean | null
          main_content?: string | null
          name?: string
          published?: boolean | null
          published_at?: string | null
          quantum_advantage?: string | null
          slug?: string
          steps?: string | null
          ts_content?: unknown | null
          updated_at?: string | null
          use_cases?: string[] | null
        }
        Relationships: []
      }
      blog_post_relations: {
        Row: {
          blog_post_id: string | null
          created_at: string | null
          deleted_at: string | null
          id: string
          related_blog_post_id: string | null
          relation_type: string
        }
        Insert: {
          blog_post_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          related_blog_post_id?: string | null
          relation_type: string
        }
        Update: {
          blog_post_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          related_blog_post_id?: string | null
          relation_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_relations_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "admin_blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_relations_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "all_blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_relations_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_relations_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "public_blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_relations_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "trash_blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_relations_related_blog_post_id_fkey"
            columns: ["related_blog_post_id"]
            isOneToOne: false
            referencedRelation: "admin_blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_relations_related_blog_post_id_fkey"
            columns: ["related_blog_post_id"]
            isOneToOne: false
            referencedRelation: "all_blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_relations_related_blog_post_id_fkey"
            columns: ["related_blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_relations_related_blog_post_id_fkey"
            columns: ["related_blog_post_id"]
            isOneToOne: false
            referencedRelation: "public_blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_relations_related_blog_post_id_fkey"
            columns: ["related_blog_post_id"]
            isOneToOne: false
            referencedRelation: "trash_blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          archived_at: string | null
          archived_by: string | null
          author: string | null
          category: string | null
          content: string | null
          content_status: string | null
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          featured: boolean | null
          featured_image: string | null
          id: string
          published: boolean | null
          published_at: string | null
          slug: string
          tags: string[] | null
          title: string
          ts_content: unknown | null
          updated_at: string | null
        }
        Insert: {
          archived_at?: string | null
          archived_by?: string | null
          author?: string | null
          category?: string | null
          content?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          featured?: boolean | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          slug: string
          tags?: string[] | null
          title: string
          ts_content?: unknown | null
          updated_at?: string | null
        }
        Update: {
          archived_at?: string | null
          archived_by?: string | null
          author?: string | null
          category?: string | null
          content?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          featured?: boolean | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          ts_content?: unknown | null
          updated_at?: string | null
        }
        Relationships: []
      }
      case_studies: {
        Row: {
          academic_references: string | null
          algorithms: string[] | null
          archived_at: string | null
          archived_by: string | null
          content_status: string | null
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          featured: boolean | null
          id: string
          import_batch_id: string | null
          import_batch_name: string | null
          import_source: string | null
          import_timestamp: string | null
          main_content: string | null
          original_qookie_id: string | null
          original_qookie_slug: string | null
          partner_companies: string[] | null
          published: boolean | null
          published_at: string | null
          quantum_companies: string[] | null
          quantum_hardware: string[] | null
          quantum_software: string[] | null
          resource_links: Json | null
          slug: string
          title: string
          updated_at: string | null
          year: number | null
        }
        Insert: {
          academic_references?: string | null
          algorithms?: string[] | null
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          import_batch_id?: string | null
          import_batch_name?: string | null
          import_source?: string | null
          import_timestamp?: string | null
          main_content?: string | null
          original_qookie_id?: string | null
          original_qookie_slug?: string | null
          partner_companies?: string[] | null
          published?: boolean | null
          published_at?: string | null
          quantum_companies?: string[] | null
          quantum_hardware?: string[] | null
          quantum_software?: string[] | null
          resource_links?: Json | null
          slug: string
          title: string
          updated_at?: string | null
          year?: number | null
        }
        Update: {
          academic_references?: string | null
          algorithms?: string[] | null
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          import_batch_id?: string | null
          import_batch_name?: string | null
          import_source?: string | null
          import_timestamp?: string | null
          main_content?: string | null
          original_qookie_id?: string | null
          original_qookie_slug?: string | null
          partner_companies?: string[] | null
          published?: boolean | null
          published_at?: string | null
          quantum_companies?: string[] | null
          quantum_hardware?: string[] | null
          quantum_software?: string[] | null
          resource_links?: Json | null
          slug?: string
          title?: string
          updated_at?: string | null
          year?: number | null
        }
        Relationships: []
      }
      case_study_industry_relations: {
        Row: {
          case_study_id: string | null
          created_at: string | null
          deleted_at: string | null
          id: string
          industry_id: string | null
        }
        Insert: {
          case_study_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          industry_id?: string | null
        }
        Update: {
          case_study_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          industry_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "case_study_industry_relations_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "admin_case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_industry_relations_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "all_case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_industry_relations_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_industry_relations_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "public_case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_industry_relations_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "trash_case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_industry_relations_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "admin_industries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_industry_relations_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_industry_relations_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "public_industries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_industry_relations_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "trash_industries"
            referencedColumns: ["id"]
          },
        ]
      }
      case_study_persona_relations: {
        Row: {
          case_study_id: string | null
          created_at: string | null
          deleted_at: string | null
          id: string
          persona_id: string | null
        }
        Insert: {
          case_study_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          persona_id?: string | null
        }
        Update: {
          case_study_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          persona_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "case_study_persona_relations_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "admin_case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_persona_relations_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "all_case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_persona_relations_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_persona_relations_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "public_case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_persona_relations_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "trash_case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_persona_relations_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "admin_personas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_persona_relations_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "personas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_persona_relations_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "public_personas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_persona_relations_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "trash_personas"
            referencedColumns: ["id"]
          },
        ]
      }
      case_study_relations: {
        Row: {
          case_study_id: string | null
          created_at: string | null
          id: string
          related_case_study_id: string | null
          relation_type: string
        }
        Insert: {
          case_study_id?: string | null
          created_at?: string | null
          id?: string
          related_case_study_id?: string | null
          relation_type: string
        }
        Update: {
          case_study_id?: string | null
          created_at?: string | null
          id?: string
          related_case_study_id?: string | null
          relation_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_study_relations_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "admin_case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_relations_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "all_case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_relations_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_relations_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "public_case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_relations_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "trash_case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_relations_related_case_study_id_fkey"
            columns: ["related_case_study_id"]
            isOneToOne: false
            referencedRelation: "admin_case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_relations_related_case_study_id_fkey"
            columns: ["related_case_study_id"]
            isOneToOne: false
            referencedRelation: "all_case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_relations_related_case_study_id_fkey"
            columns: ["related_case_study_id"]
            isOneToOne: false
            referencedRelation: "case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_relations_related_case_study_id_fkey"
            columns: ["related_case_study_id"]
            isOneToOne: false
            referencedRelation: "public_case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_relations_related_case_study_id_fkey"
            columns: ["related_case_study_id"]
            isOneToOne: false
            referencedRelation: "trash_case_studies"
            referencedColumns: ["id"]
          },
        ]
      }
      deletion_audit_log: {
        Row: {
          action: string
          content_id: string
          content_title: string | null
          content_type: string
          id: string
          metadata: Json | null
          performed_at: string | null
          performed_by: string
          reason: string | null
        }
        Insert: {
          action: string
          content_id: string
          content_title?: string | null
          content_type: string
          id?: string
          metadata?: Json | null
          performed_at?: string | null
          performed_by: string
          reason?: string | null
        }
        Update: {
          action?: string
          content_id?: string
          content_title?: string | null
          content_type?: string
          id?: string
          metadata?: Json | null
          performed_at?: string | null
          performed_by?: string
          reason?: string | null
        }
        Relationships: []
      }
      deletion_config: {
        Row: {
          archive_retention_days: number | null
          auto_cleanup_enabled: boolean | null
          content_type: string
          created_at: string | null
          id: string
          soft_delete_retention_days: number | null
          updated_at: string | null
        }
        Insert: {
          archive_retention_days?: number | null
          auto_cleanup_enabled?: boolean | null
          content_type: string
          created_at?: string | null
          id?: string
          soft_delete_retention_days?: number | null
          updated_at?: string | null
        }
        Update: {
          archive_retention_days?: number | null
          auto_cleanup_enabled?: boolean | null
          content_type?: string
          created_at?: string | null
          id?: string
          soft_delete_retention_days?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      industries: {
        Row: {
          archived_at: string | null
          archived_by: string | null
          content_status: string | null
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          icon: string | null
          id: string
          is_system_record: boolean | null
          main_content: string | null
          name: string
          published: boolean | null
          published_at: string | null
          slug: string
          ts_content: unknown | null
          updated_at: string | null
        }
        Insert: {
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_system_record?: boolean | null
          main_content?: string | null
          name: string
          published?: boolean | null
          published_at?: string | null
          slug: string
          ts_content?: unknown | null
          updated_at?: string | null
        }
        Update: {
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_system_record?: boolean | null
          main_content?: string | null
          name?: string
          published?: boolean | null
          published_at?: string | null
          slug?: string
          ts_content?: unknown | null
          updated_at?: string | null
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          created_at: string | null
          email: string
          id: string
          metadata: Json | null
          status: string
          subscription_date: string | null
          unsubscribe_token: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          metadata?: Json | null
          status?: string
          subscription_date?: string | null
          unsubscribe_token?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          metadata?: Json | null
          status?: string
          subscription_date?: string | null
          unsubscribe_token?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      persona_algorithm_relations: {
        Row: {
          algorithm_id: string
          created_at: string
          persona_id: string
        }
        Insert: {
          algorithm_id: string
          created_at?: string
          persona_id: string
        }
        Update: {
          algorithm_id?: string
          created_at?: string
          persona_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "persona_algorithm_relations_algorithm_id_fkey"
            columns: ["algorithm_id"]
            isOneToOne: false
            referencedRelation: "admin_algorithms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "persona_algorithm_relations_algorithm_id_fkey"
            columns: ["algorithm_id"]
            isOneToOne: false
            referencedRelation: "algorithms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "persona_algorithm_relations_algorithm_id_fkey"
            columns: ["algorithm_id"]
            isOneToOne: false
            referencedRelation: "public_algorithms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "persona_algorithm_relations_algorithm_id_fkey"
            columns: ["algorithm_id"]
            isOneToOne: false
            referencedRelation: "trash_algorithms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "persona_algorithm_relations_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "admin_personas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "persona_algorithm_relations_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "personas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "persona_algorithm_relations_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "public_personas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "persona_algorithm_relations_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "trash_personas"
            referencedColumns: ["id"]
          },
        ]
      }
      persona_industry_relations: {
        Row: {
          created_at: string | null
          id: string
          industry_id: string | null
          persona_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          industry_id?: string | null
          persona_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          industry_id?: string | null
          persona_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "persona_industry_relations_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "admin_industries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "persona_industry_relations_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "persona_industry_relations_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "public_industries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "persona_industry_relations_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "trash_industries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "persona_industry_relations_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "admin_personas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "persona_industry_relations_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "personas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "persona_industry_relations_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "public_personas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "persona_industry_relations_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "trash_personas"
            referencedColumns: ["id"]
          },
        ]
      }
      personas: {
        Row: {
          archived_at: string | null
          archived_by: string | null
          content_status: string | null
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          expertise: string[] | null
          id: string
          is_system_record: boolean | null
          main_content: string | null
          name: string
          published: boolean | null
          published_at: string | null
          recommended_reading: string | null
          slug: string
          ts_content: unknown | null
          updated_at: string | null
        }
        Insert: {
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          expertise?: string[] | null
          id?: string
          is_system_record?: boolean | null
          main_content?: string | null
          name: string
          published?: boolean | null
          published_at?: string | null
          recommended_reading?: string | null
          slug: string
          ts_content?: unknown | null
          updated_at?: string | null
        }
        Update: {
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          expertise?: string[] | null
          id?: string
          is_system_record?: boolean | null
          main_content?: string | null
          name?: string
          published?: boolean | null
          published_at?: string | null
          recommended_reading?: string | null
          slug?: string
          ts_content?: unknown | null
          updated_at?: string | null
        }
        Relationships: []
      }
      stack_layers: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          order_index: number
          parent_layer_id: string | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          order_index: number
          parent_layer_id?: string | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          order_index?: number
          parent_layer_id?: string | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stack_layers_parent_layer_id_fkey"
            columns: ["parent_layer_id"]
            isOneToOne: false
            referencedRelation: "stack_layers"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          created_at: string | null
          email_preferences: Json | null
          id: string
          role: string | null
          theme_preference: string | null
          ui_preferences: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email_preferences?: Json | null
          id: string
          role?: string | null
          theme_preference?: string | null
          ui_preferences?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email_preferences?: Json | null
          id?: string
          role?: string | null
          theme_preference?: string | null
          ui_preferences?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      admin_algorithms: {
        Row: {
          academic_references: string | null
          archived_at: string | null
          archived_by: string | null
          content_status: string | null
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          id: string | null
          is_system_record: boolean | null
          main_content: string | null
          name: string | null
          published: boolean | null
          published_at: string | null
          quantum_advantage: string | null
          slug: string | null
          steps: string | null
          ts_content: unknown | null
          updated_at: string | null
          use_cases: string[] | null
        }
        Insert: {
          academic_references?: string | null
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: string | null
          is_system_record?: boolean | null
          main_content?: string | null
          name?: string | null
          published?: boolean | null
          published_at?: string | null
          quantum_advantage?: string | null
          slug?: string | null
          steps?: string | null
          ts_content?: unknown | null
          updated_at?: string | null
          use_cases?: string[] | null
        }
        Update: {
          academic_references?: string | null
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: string | null
          is_system_record?: boolean | null
          main_content?: string | null
          name?: string | null
          published?: boolean | null
          published_at?: string | null
          quantum_advantage?: string | null
          slug?: string | null
          steps?: string | null
          ts_content?: unknown | null
          updated_at?: string | null
          use_cases?: string[] | null
        }
        Relationships: []
      }
      admin_blog_posts: {
        Row: {
          archived_at: string | null
          archived_by: string | null
          author: string | null
          category: string | null
          content: string | null
          content_status: string | null
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          featured: boolean | null
          featured_image: string | null
          id: string | null
          published: boolean | null
          published_at: string | null
          slug: string | null
          tags: string[] | null
          title: string | null
          ts_content: unknown | null
          updated_at: string | null
        }
        Insert: {
          archived_at?: string | null
          archived_by?: string | null
          author?: string | null
          category?: string | null
          content?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          featured?: boolean | null
          featured_image?: string | null
          id?: string | null
          published?: boolean | null
          published_at?: string | null
          slug?: string | null
          tags?: string[] | null
          title?: string | null
          ts_content?: unknown | null
          updated_at?: string | null
        }
        Update: {
          archived_at?: string | null
          archived_by?: string | null
          author?: string | null
          category?: string | null
          content?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          featured?: boolean | null
          featured_image?: string | null
          id?: string | null
          published?: boolean | null
          published_at?: string | null
          slug?: string | null
          tags?: string[] | null
          title?: string | null
          ts_content?: unknown | null
          updated_at?: string | null
        }
        Relationships: []
      }
      admin_case_studies: {
        Row: {
          academic_references: string | null
          algorithms: string[] | null
          archived_at: string | null
          archived_by: string | null
          content_status: string | null
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          featured: boolean | null
          id: string | null
          import_batch_id: string | null
          import_batch_name: string | null
          import_source: string | null
          import_timestamp: string | null
          main_content: string | null
          original_qookie_id: string | null
          original_qookie_slug: string | null
          partner_companies: string[] | null
          published: boolean | null
          published_at: string | null
          quantum_companies: string[] | null
          quantum_hardware: string[] | null
          quantum_software: string[] | null
          resource_links: Json | null
          slug: string | null
          title: string | null
          updated_at: string | null
          year: number | null
        }
        Insert: {
          academic_references?: string | null
          algorithms?: string[] | null
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string | null
          import_batch_id?: string | null
          import_batch_name?: string | null
          import_source?: string | null
          import_timestamp?: string | null
          main_content?: string | null
          original_qookie_id?: string | null
          original_qookie_slug?: string | null
          partner_companies?: string[] | null
          published?: boolean | null
          published_at?: string | null
          quantum_companies?: string[] | null
          quantum_hardware?: string[] | null
          quantum_software?: string[] | null
          resource_links?: Json | null
          slug?: string | null
          title?: string | null
          updated_at?: string | null
          year?: number | null
        }
        Update: {
          academic_references?: string | null
          algorithms?: string[] | null
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string | null
          import_batch_id?: string | null
          import_batch_name?: string | null
          import_source?: string | null
          import_timestamp?: string | null
          main_content?: string | null
          original_qookie_id?: string | null
          original_qookie_slug?: string | null
          partner_companies?: string[] | null
          published?: boolean | null
          published_at?: string | null
          quantum_companies?: string[] | null
          quantum_hardware?: string[] | null
          quantum_software?: string[] | null
          resource_links?: Json | null
          slug?: string | null
          title?: string | null
          updated_at?: string | null
          year?: number | null
        }
        Relationships: []
      }
      admin_industries: {
        Row: {
          archived_at: string | null
          archived_by: string | null
          content_status: string | null
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          icon: string | null
          id: string | null
          is_system_record: boolean | null
          main_content: string | null
          name: string | null
          published: boolean | null
          published_at: string | null
          slug: string | null
          ts_content: unknown | null
          updated_at: string | null
        }
        Insert: {
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string | null
          is_system_record?: boolean | null
          main_content?: string | null
          name?: string | null
          published?: boolean | null
          published_at?: string | null
          slug?: string | null
          ts_content?: unknown | null
          updated_at?: string | null
        }
        Update: {
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string | null
          is_system_record?: boolean | null
          main_content?: string | null
          name?: string | null
          published?: boolean | null
          published_at?: string | null
          slug?: string | null
          ts_content?: unknown | null
          updated_at?: string | null
        }
        Relationships: []
      }
      admin_personas: {
        Row: {
          archived_at: string | null
          archived_by: string | null
          content_status: string | null
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          expertise: string[] | null
          id: string | null
          is_system_record: boolean | null
          main_content: string | null
          name: string | null
          published: boolean | null
          published_at: string | null
          recommended_reading: string | null
          slug: string | null
          ts_content: unknown | null
          updated_at: string | null
        }
        Insert: {
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          expertise?: string[] | null
          id?: string | null
          is_system_record?: boolean | null
          main_content?: string | null
          name?: string | null
          published?: boolean | null
          published_at?: string | null
          recommended_reading?: string | null
          slug?: string | null
          ts_content?: unknown | null
          updated_at?: string | null
        }
        Update: {
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          expertise?: string[] | null
          id?: string | null
          is_system_record?: boolean | null
          main_content?: string | null
          name?: string | null
          published?: boolean | null
          published_at?: string | null
          recommended_reading?: string | null
          slug?: string | null
          ts_content?: unknown | null
          updated_at?: string | null
        }
        Relationships: []
      }
      all_blog_posts: {
        Row: {
          archived_at: string | null
          archived_by: string | null
          author: string | null
          category: string | null
          content: string | null
          content_status: string | null
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          effective_status: string | null
          featured: boolean | null
          featured_image: string | null
          id: string | null
          published: boolean | null
          published_at: string | null
          slug: string | null
          tags: string[] | null
          title: string | null
          ts_content: unknown | null
          updated_at: string | null
        }
        Insert: {
          archived_at?: string | null
          archived_by?: string | null
          author?: string | null
          category?: string | null
          content?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          effective_status?: never
          featured?: boolean | null
          featured_image?: string | null
          id?: string | null
          published?: boolean | null
          published_at?: string | null
          slug?: string | null
          tags?: string[] | null
          title?: string | null
          ts_content?: unknown | null
          updated_at?: string | null
        }
        Update: {
          archived_at?: string | null
          archived_by?: string | null
          author?: string | null
          category?: string | null
          content?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          effective_status?: never
          featured?: boolean | null
          featured_image?: string | null
          id?: string | null
          published?: boolean | null
          published_at?: string | null
          slug?: string | null
          tags?: string[] | null
          title?: string | null
          ts_content?: unknown | null
          updated_at?: string | null
        }
        Relationships: []
      }
      all_case_studies: {
        Row: {
          academic_references: string | null
          algorithms: string[] | null
          archived_at: string | null
          archived_by: string | null
          content_status: string | null
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          effective_status: string | null
          featured: boolean | null
          id: string | null
          import_batch_id: string | null
          import_batch_name: string | null
          import_source: string | null
          import_timestamp: string | null
          main_content: string | null
          original_qookie_id: string | null
          original_qookie_slug: string | null
          partner_companies: string[] | null
          published: boolean | null
          published_at: string | null
          quantum_companies: string[] | null
          quantum_hardware: string[] | null
          quantum_software: string[] | null
          resource_links: Json | null
          slug: string | null
          title: string | null
          updated_at: string | null
          year: number | null
        }
        Insert: {
          academic_references?: string | null
          algorithms?: string[] | null
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          effective_status?: never
          featured?: boolean | null
          id?: string | null
          import_batch_id?: string | null
          import_batch_name?: string | null
          import_source?: string | null
          import_timestamp?: string | null
          main_content?: string | null
          original_qookie_id?: string | null
          original_qookie_slug?: string | null
          partner_companies?: string[] | null
          published?: boolean | null
          published_at?: string | null
          quantum_companies?: string[] | null
          quantum_hardware?: string[] | null
          quantum_software?: string[] | null
          resource_links?: Json | null
          slug?: string | null
          title?: string | null
          updated_at?: string | null
          year?: number | null
        }
        Update: {
          academic_references?: string | null
          algorithms?: string[] | null
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          effective_status?: never
          featured?: boolean | null
          id?: string | null
          import_batch_id?: string | null
          import_batch_name?: string | null
          import_source?: string | null
          import_timestamp?: string | null
          main_content?: string | null
          original_qookie_id?: string | null
          original_qookie_slug?: string | null
          partner_companies?: string[] | null
          published?: boolean | null
          published_at?: string | null
          quantum_companies?: string[] | null
          quantum_hardware?: string[] | null
          quantum_software?: string[] | null
          resource_links?: Json | null
          slug?: string | null
          title?: string | null
          updated_at?: string | null
          year?: number | null
        }
        Relationships: []
      }
      public_algorithms: {
        Row: {
          academic_references: string | null
          archived_at: string | null
          archived_by: string | null
          content_status: string | null
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          id: string | null
          is_system_record: boolean | null
          main_content: string | null
          name: string | null
          published: boolean | null
          published_at: string | null
          quantum_advantage: string | null
          slug: string | null
          steps: string | null
          ts_content: unknown | null
          updated_at: string | null
          use_cases: string[] | null
        }
        Insert: {
          academic_references?: string | null
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: string | null
          is_system_record?: boolean | null
          main_content?: string | null
          name?: string | null
          published?: boolean | null
          published_at?: string | null
          quantum_advantage?: string | null
          slug?: string | null
          steps?: string | null
          ts_content?: unknown | null
          updated_at?: string | null
          use_cases?: string[] | null
        }
        Update: {
          academic_references?: string | null
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: string | null
          is_system_record?: boolean | null
          main_content?: string | null
          name?: string | null
          published?: boolean | null
          published_at?: string | null
          quantum_advantage?: string | null
          slug?: string | null
          steps?: string | null
          ts_content?: unknown | null
          updated_at?: string | null
          use_cases?: string[] | null
        }
        Relationships: []
      }
      public_blog_posts: {
        Row: {
          archived_at: string | null
          archived_by: string | null
          author: string | null
          category: string | null
          content: string | null
          content_status: string | null
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          featured: boolean | null
          featured_image: string | null
          id: string | null
          published: boolean | null
          published_at: string | null
          slug: string | null
          tags: string[] | null
          title: string | null
          ts_content: unknown | null
          updated_at: string | null
        }
        Insert: {
          archived_at?: string | null
          archived_by?: string | null
          author?: string | null
          category?: string | null
          content?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          featured?: boolean | null
          featured_image?: string | null
          id?: string | null
          published?: boolean | null
          published_at?: string | null
          slug?: string | null
          tags?: string[] | null
          title?: string | null
          ts_content?: unknown | null
          updated_at?: string | null
        }
        Update: {
          archived_at?: string | null
          archived_by?: string | null
          author?: string | null
          category?: string | null
          content?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          featured?: boolean | null
          featured_image?: string | null
          id?: string | null
          published?: boolean | null
          published_at?: string | null
          slug?: string | null
          tags?: string[] | null
          title?: string | null
          ts_content?: unknown | null
          updated_at?: string | null
        }
        Relationships: []
      }
      public_case_studies: {
        Row: {
          academic_references: string | null
          algorithms: string[] | null
          archived_at: string | null
          archived_by: string | null
          content_status: string | null
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          featured: boolean | null
          id: string | null
          import_batch_id: string | null
          import_batch_name: string | null
          import_source: string | null
          import_timestamp: string | null
          main_content: string | null
          original_qookie_id: string | null
          original_qookie_slug: string | null
          partner_companies: string[] | null
          published: boolean | null
          published_at: string | null
          quantum_companies: string[] | null
          quantum_hardware: string[] | null
          quantum_software: string[] | null
          resource_links: Json | null
          slug: string | null
          title: string | null
          updated_at: string | null
          year: number | null
        }
        Insert: {
          academic_references?: string | null
          algorithms?: string[] | null
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string | null
          import_batch_id?: string | null
          import_batch_name?: string | null
          import_source?: string | null
          import_timestamp?: string | null
          main_content?: string | null
          original_qookie_id?: string | null
          original_qookie_slug?: string | null
          partner_companies?: string[] | null
          published?: boolean | null
          published_at?: string | null
          quantum_companies?: string[] | null
          quantum_hardware?: string[] | null
          quantum_software?: string[] | null
          resource_links?: Json | null
          slug?: string | null
          title?: string | null
          updated_at?: string | null
          year?: number | null
        }
        Update: {
          academic_references?: string | null
          algorithms?: string[] | null
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string | null
          import_batch_id?: string | null
          import_batch_name?: string | null
          import_source?: string | null
          import_timestamp?: string | null
          main_content?: string | null
          original_qookie_id?: string | null
          original_qookie_slug?: string | null
          partner_companies?: string[] | null
          published?: boolean | null
          published_at?: string | null
          quantum_companies?: string[] | null
          quantum_hardware?: string[] | null
          quantum_software?: string[] | null
          resource_links?: Json | null
          slug?: string | null
          title?: string | null
          updated_at?: string | null
          year?: number | null
        }
        Relationships: []
      }
      public_industries: {
        Row: {
          archived_at: string | null
          archived_by: string | null
          content_status: string | null
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          icon: string | null
          id: string | null
          is_system_record: boolean | null
          main_content: string | null
          name: string | null
          published: boolean | null
          published_at: string | null
          slug: string | null
          ts_content: unknown | null
          updated_at: string | null
        }
        Insert: {
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string | null
          is_system_record?: boolean | null
          main_content?: string | null
          name?: string | null
          published?: boolean | null
          published_at?: string | null
          slug?: string | null
          ts_content?: unknown | null
          updated_at?: string | null
        }
        Update: {
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string | null
          is_system_record?: boolean | null
          main_content?: string | null
          name?: string | null
          published?: boolean | null
          published_at?: string | null
          slug?: string | null
          ts_content?: unknown | null
          updated_at?: string | null
        }
        Relationships: []
      }
      public_personas: {
        Row: {
          archived_at: string | null
          archived_by: string | null
          content_status: string | null
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          expertise: string[] | null
          id: string | null
          is_system_record: boolean | null
          main_content: string | null
          name: string | null
          published: boolean | null
          published_at: string | null
          recommended_reading: string | null
          slug: string | null
          ts_content: unknown | null
          updated_at: string | null
        }
        Insert: {
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          expertise?: string[] | null
          id?: string | null
          is_system_record?: boolean | null
          main_content?: string | null
          name?: string | null
          published?: boolean | null
          published_at?: string | null
          recommended_reading?: string | null
          slug?: string | null
          ts_content?: unknown | null
          updated_at?: string | null
        }
        Update: {
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          expertise?: string[] | null
          id?: string | null
          is_system_record?: boolean | null
          main_content?: string | null
          name?: string | null
          published?: boolean | null
          published_at?: string | null
          recommended_reading?: string | null
          slug?: string | null
          ts_content?: unknown | null
          updated_at?: string | null
        }
        Relationships: []
      }
      trash_algorithms: {
        Row: {
          academic_references: string | null
          archived_at: string | null
          archived_by: string | null
          content_status: string | null
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          id: string | null
          is_system_record: boolean | null
          main_content: string | null
          name: string | null
          published: boolean | null
          published_at: string | null
          quantum_advantage: string | null
          slug: string | null
          steps: string | null
          ts_content: unknown | null
          updated_at: string | null
          use_cases: string[] | null
        }
        Insert: {
          academic_references?: string | null
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: string | null
          is_system_record?: boolean | null
          main_content?: string | null
          name?: string | null
          published?: boolean | null
          published_at?: string | null
          quantum_advantage?: string | null
          slug?: string | null
          steps?: string | null
          ts_content?: unknown | null
          updated_at?: string | null
          use_cases?: string[] | null
        }
        Update: {
          academic_references?: string | null
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: string | null
          is_system_record?: boolean | null
          main_content?: string | null
          name?: string | null
          published?: boolean | null
          published_at?: string | null
          quantum_advantage?: string | null
          slug?: string | null
          steps?: string | null
          ts_content?: unknown | null
          updated_at?: string | null
          use_cases?: string[] | null
        }
        Relationships: []
      }
      trash_blog_posts: {
        Row: {
          archived_at: string | null
          archived_by: string | null
          author: string | null
          category: string | null
          content: string | null
          content_status: string | null
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          featured: boolean | null
          featured_image: string | null
          id: string | null
          published: boolean | null
          published_at: string | null
          slug: string | null
          tags: string[] | null
          title: string | null
          ts_content: unknown | null
          updated_at: string | null
        }
        Insert: {
          archived_at?: string | null
          archived_by?: string | null
          author?: string | null
          category?: string | null
          content?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          featured?: boolean | null
          featured_image?: string | null
          id?: string | null
          published?: boolean | null
          published_at?: string | null
          slug?: string | null
          tags?: string[] | null
          title?: string | null
          ts_content?: unknown | null
          updated_at?: string | null
        }
        Update: {
          archived_at?: string | null
          archived_by?: string | null
          author?: string | null
          category?: string | null
          content?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          featured?: boolean | null
          featured_image?: string | null
          id?: string | null
          published?: boolean | null
          published_at?: string | null
          slug?: string | null
          tags?: string[] | null
          title?: string | null
          ts_content?: unknown | null
          updated_at?: string | null
        }
        Relationships: []
      }
      trash_case_studies: {
        Row: {
          academic_references: string | null
          algorithms: string[] | null
          archived_at: string | null
          archived_by: string | null
          content_status: string | null
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          featured: boolean | null
          id: string | null
          import_batch_id: string | null
          import_batch_name: string | null
          import_source: string | null
          import_timestamp: string | null
          main_content: string | null
          original_qookie_id: string | null
          original_qookie_slug: string | null
          partner_companies: string[] | null
          published: boolean | null
          published_at: string | null
          quantum_companies: string[] | null
          quantum_hardware: string[] | null
          quantum_software: string[] | null
          resource_links: Json | null
          slug: string | null
          title: string | null
          updated_at: string | null
          year: number | null
        }
        Insert: {
          academic_references?: string | null
          algorithms?: string[] | null
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string | null
          import_batch_id?: string | null
          import_batch_name?: string | null
          import_source?: string | null
          import_timestamp?: string | null
          main_content?: string | null
          original_qookie_id?: string | null
          original_qookie_slug?: string | null
          partner_companies?: string[] | null
          published?: boolean | null
          published_at?: string | null
          quantum_companies?: string[] | null
          quantum_hardware?: string[] | null
          quantum_software?: string[] | null
          resource_links?: Json | null
          slug?: string | null
          title?: string | null
          updated_at?: string | null
          year?: number | null
        }
        Update: {
          academic_references?: string | null
          algorithms?: string[] | null
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string | null
          import_batch_id?: string | null
          import_batch_name?: string | null
          import_source?: string | null
          import_timestamp?: string | null
          main_content?: string | null
          original_qookie_id?: string | null
          original_qookie_slug?: string | null
          partner_companies?: string[] | null
          published?: boolean | null
          published_at?: string | null
          quantum_companies?: string[] | null
          quantum_hardware?: string[] | null
          quantum_software?: string[] | null
          resource_links?: Json | null
          slug?: string | null
          title?: string | null
          updated_at?: string | null
          year?: number | null
        }
        Relationships: []
      }
      trash_industries: {
        Row: {
          archived_at: string | null
          archived_by: string | null
          content_status: string | null
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          icon: string | null
          id: string | null
          is_system_record: boolean | null
          main_content: string | null
          name: string | null
          published: boolean | null
          published_at: string | null
          slug: string | null
          ts_content: unknown | null
          updated_at: string | null
        }
        Insert: {
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string | null
          is_system_record?: boolean | null
          main_content?: string | null
          name?: string | null
          published?: boolean | null
          published_at?: string | null
          slug?: string | null
          ts_content?: unknown | null
          updated_at?: string | null
        }
        Update: {
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string | null
          is_system_record?: boolean | null
          main_content?: string | null
          name?: string | null
          published?: boolean | null
          published_at?: string | null
          slug?: string | null
          ts_content?: unknown | null
          updated_at?: string | null
        }
        Relationships: []
      }
      trash_personas: {
        Row: {
          archived_at: string | null
          archived_by: string | null
          content_status: string | null
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          expertise: string[] | null
          id: string | null
          is_system_record: boolean | null
          main_content: string | null
          name: string | null
          published: boolean | null
          published_at: string | null
          recommended_reading: string | null
          slug: string | null
          ts_content: unknown | null
          updated_at: string | null
        }
        Insert: {
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          expertise?: string[] | null
          id?: string | null
          is_system_record?: boolean | null
          main_content?: string | null
          name?: string | null
          published?: boolean | null
          published_at?: string | null
          recommended_reading?: string | null
          slug?: string | null
          ts_content?: unknown | null
          updated_at?: string | null
        }
        Update: {
          archived_at?: string | null
          archived_by?: string | null
          content_status?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          expertise?: string[] | null
          id?: string | null
          is_system_record?: boolean | null
          main_content?: string | null
          name?: string | null
          published?: boolean | null
          published_at?: string | null
          recommended_reading?: string | null
          slug?: string | null
          ts_content?: unknown | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      archive_content: {
        Args: {
          archived_by_user?: string
          content_id: string
          table_name: string
        }
        Returns: boolean
      }
      recover_content: {
        Args: {
          content_id: string
          recovered_by_user?: string
          table_name: string
        }
        Returns: boolean
      }
      setup_admin_role: {
        Args: { admin_email: string }
        Returns: undefined
      }
      soft_delete_content: {
        Args: {
          content_id: string
          deleted_by_user?: string
          table_name: string
        }
        Returns: boolean
      }
      verify_initial_setup: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

