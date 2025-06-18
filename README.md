# OpenQase

OpenQase is a curation of quantum computing business case studies. The resource is organized by multiple contexts to showcase case studies, quantum algorithms, and associated research papers relevant to industry or user persona.

## Overview

OpenQase provides:
- **Algorithms**: Detailed explanations of quantum algorithms and their applications
- **Case Studies**: Real-world implementations and business impact
- **Industry Focus**: Industry-specific applications and use cases
- **Personas**: Role-based learning paths and resources

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org) 15.x with App Router
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) for consistent design
- **Content**: MDX-based content management
- **Styling**: Tailwind CSS for responsive design
- **Deployment**: Vercel

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/openqase.git
cd openqase
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Content Management

Content is managed through MDX files organized in the following structure:
```
content/
├── algorithm/     # Quantum algorithms
├── case-study/    # Real-world implementations
├── industry/      # Industry applications
└── persona/       # Role-based learning paths
```

Each content type follows a specific frontmatter structure.