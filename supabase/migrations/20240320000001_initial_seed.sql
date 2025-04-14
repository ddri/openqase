-- Seed Industries
insert into industries (name, slug, description, icon) values
    ('Finance', 'finance', 'Financial services and banking sector', 'bank'),
    ('Healthcare', 'healthcare', 'Healthcare and life sciences', 'hospital'),
    ('Manufacturing', 'manufacturing', 'Industrial and manufacturing processes', 'industry'),
    ('Energy', 'energy', 'Energy and utilities sector', 'flash');

-- Seed Personas
insert into personas (name, slug, description, role, industry, key_interests, technical_level) values
    (
        'Quantum Researcher',
        'quantum-researcher',
        'Academic or industry researcher focused on quantum computing',
        'Researcher',
        array['healthcare', 'finance'],
        array['algorithms', 'optimization', 'simulation'],
        'expert'
    ),
    (
        'Business Analyst',
        'business-analyst',
        'Business professional interested in quantum computing applications',
        'Analyst',
        array['finance', 'manufacturing'],
        array['use-cases', 'business-impact', 'roi'],
        'beginner'
    );

-- Seed Algorithms
insert into algorithms (name, slug, description, use_cases, quantum_advantage, published) values
    (
        'Quantum Fourier Transform',
        'qft',
        'A quantum algorithm that efficiently analyzes periodic patterns in data, fundamental to many quantum applications',
        array['financial modeling', 'signal processing', 'cryptography'],
        'Enables significantly faster analysis of periodic data patterns compared to classical methods',
        true
    ),
    (
        'VQE',
        'variational-quantum-eigensolver',
        'A hybrid quantum-classical algorithm that finds optimal solutions for complex molecular and optimization problems',
        array['drug discovery', 'materials science', 'financial portfolio optimization'],
        'Can solve certain molecular chemistry problems more efficiently than classical computers',
        true
    );

-- Seed Case Studies
insert into case_studies (
    title,
    slug,
    description,
    partner_companies,
    quantum_companies,
    algorithms,
    industries,
    personas,
    quantum_hardware,
    published,
    published_at
) values (
    'Drug Discovery Optimization Collaboration',
    'drug-discovery-optimization-2024',
    'A collaborative effort between multiple pharmaceutical companies and quantum hardware providers to accelerate drug discovery pipeline',
    array['Merck', 'Pfizer', 'AstraZeneca'],
    array['IBM Quantum', 'D-Wave', 'Rigetti'],
    array['vqe', 'qft'],
    array['healthcare', 'manufacturing'],
    array['quantum-researcher', 'business-analyst'],
    array['IBM Eagle 127-qubit processor', 'D-Wave Advantage 5000-qubit system', 'Rigetti 80Q Aspen-M-2'],
    true,
    now()
); 