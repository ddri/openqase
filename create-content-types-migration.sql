-- Migration: Create 4 new content types for quantum ecosystem
-- This converts static tag fields to full content types with relationships

-- Enable uuid extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. QUANTUM SOFTWARE TABLE
CREATE TABLE quantum_software (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  main_content TEXT,
  website_url TEXT,
  documentation_url TEXT,
  github_url TEXT,
  vendor TEXT,
  license_type TEXT,
  pricing_model TEXT,
  supported_hardware TEXT[],
  programming_languages TEXT[],
  is_system_record BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  deleted_by UUID,
  ts_content TSVECTOR GENERATED ALWAYS AS (
    to_tsvector('english', COALESCE(description, '') || ' ' || COALESCE(main_content, ''))
  ) STORED
);

-- 2. QUANTUM HARDWARE TABLE
CREATE TABLE quantum_hardware (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  main_content TEXT,
  vendor TEXT,
  technology_type TEXT, -- superconducting, trapped-ion, neutral-atom, etc.
  qubit_count INTEGER,
  connectivity TEXT,
  gate_fidelity NUMERIC,
  coherence_time TEXT,
  availability TEXT, -- cloud, on-premise, research-only
  access_model TEXT,
  website_url TEXT,
  documentation_url TEXT,
  is_system_record BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  deleted_by UUID,
  ts_content TSVECTOR GENERATED ALWAYS AS (
    to_tsvector('english', COALESCE(description, '') || ' ' || COALESCE(main_content, ''))
  ) STORED
);

-- 3. QUANTUM COMPANIES TABLE
CREATE TABLE quantum_companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  main_content TEXT,
  company_type TEXT, -- hardware, software, consulting, research
  founded_year INTEGER,
  headquarters TEXT,
  website_url TEXT,
  linkedin_url TEXT,
  funding_stage TEXT,
  key_products TEXT[],
  key_partnerships TEXT[],
  is_system_record BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  deleted_by UUID,
  ts_content TSVECTOR GENERATED ALWAYS AS (
    to_tsvector('english', COALESCE(description, '') || ' ' || COALESCE(main_content, ''))
  ) STORED
);

-- 4. PARTNER COMPANIES TABLE
CREATE TABLE partner_companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  main_content TEXT,
  industry TEXT,
  company_size TEXT,
  headquarters TEXT,
  website_url TEXT,
  linkedin_url TEXT,
  partnership_type TEXT, -- technology, research, commercial
  quantum_initiatives TEXT,
  is_system_record BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  deleted_by UUID,
  ts_content TSVECTOR GENERATED ALWAYS AS (
    to_tsvector('english', COALESCE(description, '') || ' ' || COALESCE(main_content, ''))
  ) STORED
);

-- CREATE INDEXES
CREATE INDEX quantum_software_slug_idx ON quantum_software(slug);
CREATE INDEX quantum_software_ts_content_idx ON quantum_software USING gin(ts_content);

CREATE INDEX quantum_hardware_slug_idx ON quantum_hardware(slug);
CREATE INDEX quantum_hardware_ts_content_idx ON quantum_hardware USING gin(ts_content);

CREATE INDEX quantum_companies_slug_idx ON quantum_companies(slug);
CREATE INDEX quantum_companies_ts_content_idx ON quantum_companies USING gin(ts_content);

CREATE INDEX partner_companies_slug_idx ON partner_companies(slug);
CREATE INDEX partner_companies_ts_content_idx ON partner_companies USING gin(ts_content);

-- CREATE JUNCTION TABLES FOR CASE STUDY RELATIONSHIPS
CREATE TABLE case_study_quantum_software_relations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_study_id UUID REFERENCES case_studies(id) ON DELETE CASCADE,
  quantum_software_id UUID REFERENCES quantum_software(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(case_study_id, quantum_software_id)
);

CREATE TABLE case_study_quantum_hardware_relations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_study_id UUID REFERENCES case_studies(id) ON DELETE CASCADE,
  quantum_hardware_id UUID REFERENCES quantum_hardware(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(case_study_id, quantum_hardware_id)
);

CREATE TABLE case_study_quantum_company_relations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_study_id UUID REFERENCES case_studies(id) ON DELETE CASCADE,
  quantum_company_id UUID REFERENCES quantum_companies(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(case_study_id, quantum_company_id)
);

CREATE TABLE case_study_partner_company_relations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_study_id UUID REFERENCES case_studies(id) ON DELETE CASCADE,
  partner_company_id UUID REFERENCES partner_companies(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(case_study_id, partner_company_id)
);

-- CREATE INTER-RELATIONSHIPS BETWEEN CONTENT TYPES (as requested)
CREATE TABLE quantum_company_software_relations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quantum_company_id UUID REFERENCES quantum_companies(id) ON DELETE CASCADE,
  quantum_software_id UUID REFERENCES quantum_software(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(quantum_company_id, quantum_software_id)
);

CREATE TABLE quantum_company_hardware_relations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quantum_company_id UUID REFERENCES quantum_companies(id) ON DELETE CASCADE,
  quantum_hardware_id UUID REFERENCES quantum_hardware(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(quantum_company_id, quantum_hardware_id)
);

-- CREATE UPDATE TRIGGERS (following existing pattern)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_quantum_software_updated_at BEFORE UPDATE ON quantum_software FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quantum_hardware_updated_at BEFORE UPDATE ON quantum_hardware FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quantum_companies_updated_at BEFORE UPDATE ON quantum_companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_partner_companies_updated_at BEFORE UPDATE ON partner_companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- CREATE RLS POLICIES (following existing pattern)
ALTER TABLE quantum_software ENABLE ROW LEVEL SECURITY;
ALTER TABLE quantum_hardware ENABLE ROW LEVEL SECURITY;
ALTER TABLE quantum_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_companies ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can view published quantum_software" ON quantum_software FOR SELECT USING (published = true);
CREATE POLICY "Public can view published quantum_hardware" ON quantum_hardware FOR SELECT USING (published = true);
CREATE POLICY "Public can view published quantum_companies" ON quantum_companies FOR SELECT USING (published = true);
CREATE POLICY "Public can view published partner_companies" ON partner_companies FOR SELECT USING (published = true);

-- Junction tables RLS (public read)
ALTER TABLE case_study_quantum_software_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_study_quantum_hardware_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_study_quantum_company_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_study_partner_company_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE quantum_company_software_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE quantum_company_hardware_relations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view quantum_software relations" ON case_study_quantum_software_relations FOR SELECT USING (true);
CREATE POLICY "Public can view quantum_hardware relations" ON case_study_quantum_hardware_relations FOR SELECT USING (true);
CREATE POLICY "Public can view quantum_company relations" ON case_study_quantum_company_relations FOR SELECT USING (true);
CREATE POLICY "Public can view partner_company relations" ON case_study_partner_company_relations FOR SELECT USING (true);
CREATE POLICY "Public can view company-software relations" ON quantum_company_software_relations FOR SELECT USING (true);
CREATE POLICY "Public can view company-hardware relations" ON quantum_company_hardware_relations FOR SELECT USING (true);