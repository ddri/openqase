// Ghost-style automatic schema generation
// Uses existing content data to generate SEO schema markup

interface BaseContent {
  title?: string;
  name?: string;
  description?: string;
  published_at?: string;
  updated_at?: string;
  slug?: string;
}

interface CaseStudy extends BaseContent {
  id: string;
  title: string;
  description: string;
  published_at: string;
  slug: string;
  year?: number;
}

interface LearningContent extends BaseContent {
  id: string;
  name: string;
  description: string;
  slug: string;
}

// Organization schema - site-wide authority
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "OpenQase",
    "description": "Quantum computing business applications platform providing real-world case studies and learning paths",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://openqase.com",
    "foundingDate": "2024",
    "areaServed": "Worldwide",
    "knowsAbout": [
      "Quantum Computing",
      "Business Applications", 
      "Case Studies",
      "Quantum Algorithms",
      "Industry Applications"
    ],
    "sameAs": []
  };
}

// Case study article schema - auto-generated from case study data
export function getCaseStudySchema(caseStudy: CaseStudy) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://openqase.com";
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": caseStudy.title,
    "description": caseStudy.description,
    "url": `${baseUrl}/case-study/${caseStudy.slug}`,
    "datePublished": caseStudy.published_at,
    "dateModified": caseStudy.updated_at || caseStudy.published_at,
    "author": {
      "@type": "Organization",
      "name": "OpenQase"
    },
    "publisher": {
      "@type": "Organization", 
      "name": "OpenQase",
      "url": baseUrl
    },
    "about": [
      "Quantum Computing",
      "Business Applications",
      "Case Study"
    ],
    "articleSection": "Case Studies",
    "inLanguage": "en-US"
  };
}

// Learning path course schema - for personas, industries, algorithms
export function getCourseSchema(content: LearningContent, courseType: 'persona' | 'industry' | 'algorithm') {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://openqase.com";
  
  const courseTypeLabels = {
    persona: "Role-Based Learning Path",
    industry: "Industry-Specific Learning Path", 
    algorithm: "Algorithm-Focused Learning Path"
  };
  
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": content.name,
    "description": content.description,
    "url": `${baseUrl}/paths/${courseType}/${content.slug}`,
    "courseMode": "online",
    "educationalLevel": "Professional",
    "audience": {
      "@type": "Audience",
      "audienceType": "Business Professionals"
    },
    "provider": {
      "@type": "Organization",
      "name": "OpenQase",
      "url": baseUrl
    },
    "about": [
      "Quantum Computing",
      courseTypeLabels[courseType]
    ],
    "inLanguage": "en-US",
    "isAccessibleForFree": true
  };
}

// FAQ schema for landing page - helps with "People Also Ask" results
export function getFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is quantum computing for business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Quantum computing for business focuses on practical applications that solve real-world problems like optimization, security, and machine learning, rather than theoretical quantum physics."
        }
      },
      {
        "@type": "Question", 
        "name": "How do companies use quantum algorithms?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Companies like HSBC, Google, and Mitsui use quantum algorithms for portfolio optimization, cybersecurity, fraud detection, and supply chain optimization."
        }
      },
      {
        "@type": "Question",
        "name": "What industries benefit from quantum computing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Financial services, healthcare, energy, manufacturing, and logistics are leading adopters of quantum computing for business optimization and security applications."
        }
      }
    ]
  };
}

// Breadcrumb schema for navigation clarity
export function getBreadcrumbSchema(breadcrumbs: Array<{name: string, url: string}>) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://openqase.com";
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${baseUrl}${crumb.url}`
    }))
  };
}