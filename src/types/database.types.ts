export interface Database {
  public: {
    Tables: {
      personas: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          role: string | null;
          industry_focus: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['personas']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['personas']['Insert']>;
      };
    };
  };
} 