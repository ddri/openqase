# OpenQase Import Requirements

## What OpenQase Needs From Qookie

Based on OpenQase's actual production database schema, here's exactly what we need:

## Database Structure

### case_studies table (main table)
```sql
case_studies (
  id: uuid (auto-generated)
  slug: text (required, unique)
  title: text (required)
  description: text (optional)
  main_content: text (optional)
  partner_companies: text[] (array of company names)
  quantum_companies: text[] (array of company names)
  algorithms: text[] (array of algorithm names)
  quantum_hardware: text[] (array of hardware names)
  quantum_software: text[] (array of software names)
  year: smallint (required, defaults to current year)
  published: boolean (defaults to false)
  published_at: timestamp (optional)
  created_at: timestamp (auto-generated)
  updated_at: timestamp (auto-generated)
  academic_references: text (optional)
  resource_links: jsonb (defaults to empty array)
)
```

### Relationship Tables (for foreign key relationships)

**industries table:**
- We need industry slug values to match existing records
- Query needed: `SELECT slug, name FROM industries ORDER BY slug;`

**personas table:**
- We need persona slug values to match existing records  
- Query needed: `SELECT slug, name FROM personas ORDER BY slug;`

**algorithms table:**
- We need algorithm slug values to match existing records
- Query needed: `SELECT slug, name FROM algorithms ORDER BY slug;`

## Required JSON Format

```json
{
  "export_metadata": {
    "version": "1.0",
    "export_date": "ISO-8601 timestamp",
    "total_items": number
  },
  "case_studies": [
    {
      "slug": "unique-case-study-identifier",
      "title": "Case Study Title",
      "description": "Brief description",
      "main_content": "Full content in markdown or text",
      "partner_companies": ["Company Name 1", "Company Name 2"],
      "quantum_companies": ["Quantum Co 1", "Quantum Co 2"],
      "algorithms": ["algorithm-name-1", "algorithm-name-2"],
      "quantum_hardware": ["Hardware 1", "Hardware 2"],
      "quantum_software": ["Software 1", "Software 2"],
      "year": 2024,
      "academic_references": "Citation text",
      "resource_links": [
        {
          "title": "Link Title",
          "url": "https://example.com",
          "type": "documentation"
        }
      ],
      "industries": ["industry-slug-1", "industry-slug-2"],
      "personas": ["persona-slug-1", "persona-slug-2"]
    }
  ]
}
```

## Data Requirements

1. **slugs**: Must be lowercase, hyphenated, unique identifiers
2. **year**: Integer representing the year of the case study
3. **industries/personas**: Must use exact slug values from OpenQase database
4. **companies/hardware/software**: Plain text arrays, no specific format required
5. **algorithms**: Should match existing algorithm names where possible

## Valid Taxonomy Values

### Industries (use exact slug values)
- `aerospace` - Aerospace
- `agriculture` - Agriculture
- `ai-machine-learning` - AI and Machine Learning
- `automotive` - Automotive
- `chemical-manufacturing` - Chemical Manufacturing
- `climate-environment` - Climate and Environment
- `cybersecurity` - Cybersecurity
- `defence` - Defence
- `education` - Education
- `energy` - Energy
- `finance` - Finance
- `government-public-sector` - Government and Public Sector
- `healthcare` - Healthcare
- `logistics-supply-chain` - Logistics and Supply Chain
- `materials-science` - Materials Science
- `pharmaceutical` - Pharmaceutical
- `retail` - Retail
- `telecommunications` - Telecommunications

### Personas (use exact slug values)
- `business-decision-maker` - Business Decision-Maker
- `cybersecurity-specialist` - Cybersecurity Specialist
- `domain-expert` - Domain Expert
- `financial-services-specialist` - Financial Services Specialist
- `government-representative` - Government Representative
- `investment-professional` - Investment Professional
- `quantum-algorithm-developer` - Quantum Algorithm Developer
- `quantum-chemist` - Quantum Chemist
- `quantum-cloud-platform-provider` - Quantum Cloud and Platform Provider
- `quantum-educator` - Quantum Educator
- `quantum-hardware-engineer` - Quantum Hardware Engineer
- `quantum-solutions-provider` - Quantum Solutions Provider
- `software-engineer` - Software Engineer
- `systems-integration-engineer` - Systems Integration Engineer

### Algorithms (use exact slug values)
- `bernstein-vazirani-algorithm` - Bernstein-Vazirani algorithm
- `deutsch-jozsa` - Deutsch-Jozsa Algorithm
- `grovers-algorithm` - Grover's Algorithm
- `harrow-hassidim-lloyd` - Harrow-Hassidim-Lloyd (HHL)
- `quantum-amplitude-amplification` - Quantum Amplitude Amplification (QAA)
- `quantum-annealing` - Quantum Annealing (QA)
- `quantum-approximate-optimization-algorithm` - Quantum Approximate Optimization Algorithm (QAOA)
- `quantum-boltzmann-machines` - Quantum Boltzmann Machines
- `quantum-counting-algorithm` - Quantum Counting Algorithm (QCA)
- `quantum-error-correction` - Quantum Error Correction (QEC)
- `quantum-fourier-transform` - Quantum Fourier Transform (QFT)
- `quantum-gradient-descent` - Quantum Gradient Descent (QGD)
- `quantum-k-means-clustering` - Quantum K-Means Clustering
- `quantum-phase-estimation` - Quantum Phase Estimation (QPE)
- `quantum-principal-component-analysis` - Quantum Principal Component Analysis (QPCA)
- `quantum-support-vector-machine` - Quantum Support Vector Machine (QSVM)
- `quantum-walk-algorithm` - Quantum Walk Algorithm
- `shors-algorithm` - Shor's Algorithm
- `simons-algorithm` - Simon's Algorithm
- `variational-quantum-eigensolver` - Variational Quantum Eigensolver (VQE)