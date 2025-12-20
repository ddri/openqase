-- Supabase Seed File
-- This file is automatically run by Supabase CLI during setup
-- Contains example data for open source contributors
-- Replace with your own data for local development

-- TEMPORARILY DISABLED - Real data will be restored from production backup
-- Uncomment below if you need sample data for a fresh setup

/* DISABLED FOR DATA RESTORE

-- Example: Industries
INSERT INTO industries (name, slug, description, icon, published) VALUES
('Quantum Computing', 'quantum-computing', 'Companies developing quantum computing hardware and software', '⚛️', true),
('Financial Services', 'financial-services', 'Banks, investment firms, and fintech companies', '💰', true),
('Healthcare', 'healthcare', 'Pharmaceutical, medical device, and healthcare technology companies', '🏥', true),
('Manufacturing', 'manufacturing', 'Industrial manufacturing and supply chain companies', '🏭', true);

-- Example: Personas
INSERT INTO personas (name, slug, description, expertise, published) VALUES
('Quantum Researcher', 'quantum-researcher', 'Academic or industry researcher focused on quantum algorithms', ARRAY['quantum algorithms', 'research', 'mathematics'], true),
('Technology Executive', 'technology-executive', 'CTO, CISO, or technology leader evaluating quantum solutions', ARRAY['technology strategy', 'digital transformation', 'innovation'], true),
('Data Scientist', 'data-scientist', 'Professional working with machine learning and data analytics', ARRAY['machine learning', 'data analysis', 'statistics'], true),
('Business Analyst', 'business-analyst', 'Professional analyzing business processes and requirements', ARRAY['business analysis', 'process optimization', 'requirements gathering'], true);

-- Example: Algorithms
INSERT INTO algorithms (name, slug, description, use_cases, quantum_advantage, published) VALUES
('Quantum Phase Estimation', 'quantum-phase-estimation', 'Algorithm for estimating eigenvalues of unitary operators', ARRAY['chemistry', 'optimization', 'machine learning'], 'Exponential speedup for eigenvalue estimation', true),
('Grover''s Algorithm', 'grovers-algorithm', 'Quantum search algorithm for unstructured databases', ARRAY['search', 'optimization', 'cryptography'], 'Quadratic speedup over classical search', true),
('Quantum Fourier Transform', 'quantum-fourier-transform', 'Quantum version of the discrete Fourier transform', ARRAY['signal processing', 'cryptography', 'simulation'], 'Exponential speedup for certain applications', true);

-- Example: Case Studies
INSERT INTO case_studies (title, slug, description, main_content, partner_companies, quantum_companies, published) VALUES
('Quantum Machine Learning in Drug Discovery', 'quantum-ml-drug-discovery', 'How quantum algorithms are accelerating pharmaceutical research', 'This case study explores the application of quantum machine learning algorithms in drug discovery processes...', ARRAY['PharmaCorp', 'BioTech Inc'], ARRAY['IBM Quantum', 'Google Quantum AI'], true),
('Quantum Optimization for Supply Chain', 'quantum-optimization-supply-chain', 'Optimizing logistics and supply chain operations with quantum computing', 'This case study examines how quantum optimization algorithms can improve supply chain efficiency...', ARRAY['LogiCorp', 'Global Supply'], ARRAY['D-Wave Systems', 'Rigetti Computing'], true);

-- Example: Blog Posts
INSERT INTO blog_posts (title, slug, description, content, author, published) VALUES
('Getting Started with Quantum Computing', 'getting-started-quantum-computing', 'A beginner''s guide to quantum computing concepts', 'Quantum computing represents a fundamental shift in how we process information...', 'OpenQase Team', true),
('The Future of Quantum Algorithms', 'future-quantum-algorithms', 'Emerging trends in quantum algorithm development', 'As quantum hardware continues to advance, new algorithmic approaches are emerging...', 'OpenQase Team', true);

-- Note: This is example data for open source contributors
-- For local development with real data, replace this file with your own content
-- The private-data/ folder contains production data that should not be committed

END OF DISABLED SECTION */