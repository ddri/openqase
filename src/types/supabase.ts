export interface UserPreferences {
  id: string;
  theme_preference: string | null;
  ui_preferences: Record<string, any> | null;
  email_preferences: Record<string, any> | null;
  role: 'user' | 'admin';
  created_at: string | null;
  updated_at: string | null;
}

export interface Database {
  public: {
    Tables: {
      case_studies: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          main_content: string | null;
          url: string | null;
          published: boolean;
          published_at: string | null;
          lastUpdated: string;
          partner_companies: string[];
          quantum_companies: string[];
          quantum_hardware: string[];
          industries: string[];
          algorithms: string[];
          personas: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['case_studies']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['case_studies']['Insert']>;
      };
      industries: {
        Row: {
          slug: string;
          name: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['industries']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['industries']['Insert']>;
      };
      algorithms: {
        Row: {
          slug: string;
          name: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['algorithms']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['algorithms']['Insert']>;
      };
      personas: {
        Row: {
          slug: string;
          name: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['personas']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['personas']['Insert']>;
      };
      user_preferences: {
        Row: UserPreferences;
        Insert: Omit<UserPreferences, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['user_preferences']['Insert']>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
