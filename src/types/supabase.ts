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
      algorithms: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          main_content: string | null
          name: string
          published: boolean | null
          quantum_advantage: string | null
          slug: string
          ts_content: unknown | null
          updated_at: string | null
          use_cases: string[] | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          main_content?: string | null
          name: string
          published?: boolean | null
          quantum_advantage?: string | null
          slug: string
          ts_content?: unknown | null
          updated_at?: string | null
          use_cases?: string[] | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          main_content?: string | null
          name?: string
          published?: boolean | null
          quantum_advantage?: string | null
          slug?: string
          ts_content?: unknown | null
          updated_at?: string | null
          use_cases?: string[] | null
        }
        Relationships: []
      }
      case_studies: {
        Row: {
          algorithms: string[] | null
          created_at: string | null
          description: string | null
          id: string
          industries: string[] | null
          main_content: string | null
          partner_companies: string[] | null
          personas: string[] | null
          published: boolean | null
          published_at: string | null
          quantum_companies: string[] | null
          quantum_hardware: string[] | null
          slug: string
          title: string
          updated_at: string | null
          url: string | null
        }
        Insert: {
          algorithms?: string[] | null
          created_at?: string | null
          description?: string | null
          id?: string
          industries?: string[] | null
          main_content?: string | null
          partner_companies?: string[] | null
          personas?: string[] | null
          published?: boolean | null
          published_at?: string | null
          quantum_companies?: string[] | null
          quantum_hardware?: string[] | null
          slug: string
          title: string
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          algorithms?: string[] | null
          created_at?: string | null
          description?: string | null
          id?: string
          industries?: string[] | null
          main_content?: string | null
          partner_companies?: string[] | null
          personas?: string[] | null
          published?: boolean | null
          published_at?: string | null
          quantum_companies?: string[] | null
          quantum_hardware?: string[] | null
          slug?: string
          title?: string
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
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
          main_content: string | null
          name: string
          slug: string
          ts_content: unknown | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          main_content?: string | null
          name: string
          slug: string
          ts_content?: unknown | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          main_content?: string | null
          name?: string
          slug?: string
          ts_content?: unknown | null
        }
        Relationships: []
      }
      personas: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          industry: string[] | null
          main_content: string | null
          name: string
          persona_type: string | null
          related_case_studies: string[] | null
          role: string | null
          slug: string
          ts_content: unknown | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          industry?: string[] | null
          main_content?: string | null
          name: string
          persona_type?: string | null
          related_case_studies?: string[] | null
          role?: string | null
          slug: string
          ts_content?: unknown | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          industry?: string[] | null
          main_content?: string | null
          name?: string
          persona_type?: string | null
          related_case_studies?: string[] | null
          role?: string | null
          slug?: string
          ts_content?: unknown | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
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

