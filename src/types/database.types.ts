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
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
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
          id: string
        }
        Insert: {
          algorithm_id?: string | null
          case_study_id?: string | null
          created_at?: string | null
          id?: string
        }
        Update: {
          algorithm_id?: string | null
          case_study_id?: string | null
          created_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "algorithm_case_study_relations_algorithm_id_fkey"
            columns: ["algorithm_id"]
            isOneToOne: false
            referencedRelation: "algorithms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "algorithm_case_study_relations_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "case_studies"
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
            referencedRelation: "algorithms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "algorithm_industry_relations_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
        ]
      }
      algorithms: {
        Row: {
          academic_references: string | null
          created_at: string | null
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
          created_at?: string | null
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
          created_at?: string | null
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
          id: string
          related_blog_post_id: string | null
          relation_type: string
        }
        Insert: {
          blog_post_id?: string | null
          created_at?: string | null
          id?: string
          related_blog_post_id?: string | null
          relation_type: string
        }
        Update: {
          blog_post_id?: string | null
          created_at?: string | null
          id?: string
          related_blog_post_id?: string | null
          relation_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_relations_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_relations_related_blog_post_id_fkey"
            columns: ["related_blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author: string | null
          category: string | null
          content: string | null
          created_at: string | null
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
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
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
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
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
          created_at: string | null
          description: string | null
          id: string
          main_content: string | null
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
        }
        Insert: {
          academic_references?: string | null
          algorithms?: string[] | null
          created_at?: string | null
          description?: string | null
          id?: string
          main_content?: string | null
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
        }
        Update: {
          academic_references?: string | null
          algorithms?: string[] | null
          created_at?: string | null
          description?: string | null
          id?: string
          main_content?: string | null
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
        }
        Relationships: []
      }
      case_study_industry_relations: {
        Row: {
          case_study_id: string | null
          created_at: string | null
          id: string
          industry_id: string | null
        }
        Insert: {
          case_study_id?: string | null
          created_at?: string | null
          id?: string
          industry_id?: string | null
        }
        Update: {
          case_study_id?: string | null
          created_at?: string | null
          id?: string
          industry_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "case_study_industry_relations_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_industry_relations_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
        ]
      }
      case_study_persona_relations: {
        Row: {
          case_study_id: string | null
          created_at: string | null
          id: string
          persona_id: string | null
        }
        Insert: {
          case_study_id?: string | null
          created_at?: string | null
          id?: string
          persona_id?: string | null
        }
        Update: {
          case_study_id?: string | null
          created_at?: string | null
          id?: string
          persona_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "case_study_persona_relations_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_persona_relations_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "personas"
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
            referencedRelation: "case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_relations_related_case_study_id_fkey"
            columns: ["related_case_study_id"]
            isOneToOne: false
            referencedRelation: "case_studies"
            referencedColumns: ["id"]
          },
        ]
      }
      industries: {
        Row: {
          created_at: string | null
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
          created_at?: string | null
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
          created_at?: string | null
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
            referencedRelation: "algorithms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "persona_algorithm_relations_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "personas"
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
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "persona_industry_relations_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "personas"
            referencedColumns: ["id"]
          },
        ]
      }
      personas: {
        Row: {
          created_at: string | null
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
          created_at?: string | null
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
          created_at?: string | null
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
      [_ in never]: never
    }
    Functions: {
      setup_admin_role: {
        Args: { admin_email: string }
        Returns: undefined
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never 