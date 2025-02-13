import { z } from 'zod';
import { promises as fs } from 'fs';
import path from 'path';

// Base schema for all content
const baseSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

// Algorithm-specific schema
const algorithmSchema = baseSchema.extend({
  type: z.literal('Technical'),
  complexity: z.string(),
  applications: z.array(z.string()),
  prerequisites: z.array(z.string()),
  relatedCaseStudies: z.array(z.string())
});

// Case study schema
const caseStudySchema = baseSchema.extend({
  content: z.string(),
  personas: z.array(z.string()),
  industries: z.array(z.string()),
  algorithms: z.array(z.string()),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  tags: z.array(z.string())
});

// Persona schema
const personaSchema = baseSchema.extend({
  type: z.enum(['Technical', 'Persona']),
  role: z.string(),
  expertise: z.array(z.string()),
  relatedCaseStudies: z.array(z.string())
});

async function validateContentDirectory(dirPath: string, schema: z.ZodSchema) {
  const files = await fs.readdir(dirPath);
  let isValid = true;

  for (const file of files) {
    if (file.endsWith('.json')) {
      const filePath = path.join(dirPath, file);
      const content = await fs.readFile(filePath, 'utf-8');
      
      try {
        const parsed = JSON.parse(content);
        schema.parse(parsed);
        console.log(`✅ ${file} is valid`);
      } catch (error) {
        console.error(`❌ ${file} validation failed:`, error);
        isValid = false;
      }
    }
  }

  return isValid;
}

async function validateAllContent() {
  const contentRoot = path.join(process.cwd(), 'content');
  let isValid = true;

  // Validate algorithms
  isValid = await validateContentDirectory(
    path.join(contentRoot, 'algorithm'),
    algorithmSchema
  ) && isValid;

  // Validate case studies
  isValid = await validateContentDirectory(
    path.join(contentRoot, 'case-study'),
    caseStudySchema
  ) && isValid;

  // Validate personas
  isValid = await validateContentDirectory(
    path.join(contentRoot, 'persona'),
    personaSchema
  ) && isValid;

  return isValid;
}

// Run validation if this file is executed directly
if (require.main === module) {
  validateAllContent()
    .then(isValid => {
      if (isValid) {
        console.log('✨ All content is valid!');
        process.exit(0);
      } else {
        console.error('❌ Content validation failed');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('Error validating content:', error);
      process.exit(1);
    });
}

export const schemas = {
  algorithm: algorithmSchema,
  caseStudy: caseStudySchema,
  persona: personaSchema
};