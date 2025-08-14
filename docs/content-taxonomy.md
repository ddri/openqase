# Content Taxonomy (v0.5.0)

This document defines the categorization system used across OpenQase for badges and filters. In v0.5.0, the taxonomy covers Algorithms, Personas, and Industries.

Alignment with data model (v0.5.0)
- Algorithms: use `use_cases` (string[]) and optionally surface `quantum_advantage` as a highlight
- Personas: use `role` (string) and `industry` (string[]) associations
- Industries: use `name` and optional `icon`; sectors are defined here for navigation and tagging

## Industries — Canonical Set and Sector Classification

Canonical industries (v0.5.0):

- Aerospace
- Agriculture
- AI and Machine Learning
- Automotive
- Chemical Manufacturing
- Climate and Environment
- Cybersecurity
- Defence
- Education
- Energy
- Finance
- Government and Public Sector
- Healthcare
- Logistics and Supply Chain
- Materials Science
- Pharmaceutical
- Retail
- Telecommunications

Sectors (for grouping/search facets):

- Financial Services
- Healthcare & Life Sciences
- Technology & Communications
- Energy & Utilities
- Industrial & Manufacturing
- Public Sector
- Consumer & Retail

## Personas — Expertise Classification

Used to describe audience roles for learning paths and to filter content by professional background. Canonical list of personas (14):

- Business Decision-Maker
- Cybersecurity Specialist
- Domain Expert
- Financial Services Specialist
- Government Representative
- Investment Professional
- Quantum Algorithm Developer
- Quantum Chemist
- Quantum Cloud and Platform Provider
- Quantum Educator
- Quantum Hardware Engineer
- Quantum Solutions Provider
- Software Engineer
- Systems Integration Engineer


## Algorithms — Canonical Set and Use Case Classification

Canonical algorithms (v0.5.0):

- Bernstein-Vazirani algorithm
- Deutsch-Jozsa Algorithm
- Grover's Algorithm
- Harrow-Hassidim-Lloyd (HHL)
- Quantum Amplitude Amplification (QAA)
- Quantum Annealing (QA)
- Quantum Approximate Optimization Algorithm (QAOA)
- Quantum Boltzmann Machines
- Quantum Counting Algorithm (QCA)
- Quantum Error Correction (QEC)
- Quantum Fourier Transform (QFT)
- Quantum Gradient Descent (QGD)
- Quantum K-Means Clustering
- Quantum Phase Estimation (QPE)
- Quantum Principal Component Analysis (QPCA)
- Quantum Support Vector Machine (QSVM)
- Quantum Walk Algorithm
- Shor's Algorithm
- Simon's Algorithm
- Variational Quantum Eigensolver (VQE)

Use case classification (stored in `use_cases`):

- Optimization
  - Portfolio Optimization
  - Route Planning
  - Resource Allocation
  - Supply Chain Optimization
  - Scheduling
  - Parameter Tuning
- Machine Learning
  - Classification
  - Clustering
  - Feature Selection
  - Pattern Recognition
  - Regression Analysis
  - Anomaly Detection
- Security & Cryptography
  - Quantum Key Distribution
  - Secure Communication
  - Encryption
  - Digital Signatures
  - Authentication
  - Privacy Protection
- Simulation & Modeling
  - Molecular Simulation
  - Financial Risk Modeling
  - Drug Discovery
  - Materials Science
  - Climate Modeling
  - Chemical Reactions
- Search & Information
  - Database Search
  - Information Retrieval
  - Content Matching
  - Data Mining
  - Knowledge Discovery
  - Graph Search

## Implementation Guidelines

### Badge Usage
- **Industries**: Use sector badges to show business domain relevance
- **Personas**: Use expertise badges to show relevant professional skills/roles
- **Algorithms**: Use use case badges to show practical applications

### SEO Benefits
- Structured categorization improves search engine discoverability
- Clear taxonomies help users find relevant content
- Consistent tagging supports content recommendation systems

### Content Creation
When creating new content:
1. Select appropriate primary category (sector/expertise/use case)
2. Add 2-5 relevant badges from the taxonomy
3. Ensure badges are specific and meaningful
4. Consider user search intent and discovery patterns

### Maintenance
- Review and update taxonomy quarterly
- Add new categories as quantum computing applications evolve
- Remove obsolete or unused categories
- Ensure consistency across all content types

## Future Considerations

### Emerging Sectors
- Quantum Computing as a Service (QCaaS)
- Quantum Internet & Networking
- Quantum Sensing & Metrology
- Quantum-Enhanced AI/ML

### Cross-Category Relationships
- Industries may relate to multiple sectors
- Personas may have expertise across multiple domains
- Algorithms may serve multiple use cases

### Scalability
- Taxonomy should accommodate new quantum computing developments
- Categories should remain manageable for user navigation
- Consider hierarchical structures for complex domains