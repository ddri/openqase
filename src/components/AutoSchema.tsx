// Auto-inject schema markup Ghost-style
// Invisible to content creators, automatic for developers

import { 
  getOrganizationSchema, 
  getCaseStudySchema, 
  getCourseSchema, 
  getFAQSchema,
  getBreadcrumbSchema 
} from '@/lib/schema';

interface AutoSchemaProps {
  type: 'organization' | 'case-study' | 'course' | 'faq' | 'breadcrumb';
  data?: any;
  courseType?: 'persona' | 'industry' | 'algorithm';
  breadcrumbs?: Array<{name: string, url: string}>;
}

export function AutoSchema({ type, data, courseType, breadcrumbs }: AutoSchemaProps) {
  let schema;
  
  switch (type) {
    case 'organization':
      schema = getOrganizationSchema();
      break;
    case 'case-study':
      if (!data) return null;
      schema = getCaseStudySchema(data);
      break;
    case 'course':
      if (!data || !courseType) return null;
      schema = getCourseSchema(data, courseType);
      break;
    case 'faq':
      schema = getFAQSchema();
      break;
    case 'breadcrumb':
      if (!breadcrumbs) return null;
      schema = getBreadcrumbSchema(breadcrumbs);
      break;
    default:
      return null;
  }
  
  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ 
        __html: JSON.stringify(schema, null, 2) 
      }}
    />
  );
}

// Convenience wrapper for multiple schemas on one page
interface MultiSchemaProps {
  schemas: Array<{
    type: AutoSchemaProps['type'];
    data?: any;
    courseType?: AutoSchemaProps['courseType'];
    breadcrumbs?: AutoSchemaProps['breadcrumbs'];
  }>;
}

export function MultiSchema({ schemas }: MultiSchemaProps) {
  return (
    <>
      {schemas.map((schemaProps, index) => (
        <AutoSchema key={index} {...schemaProps} />
      ))}
    </>
  );
}