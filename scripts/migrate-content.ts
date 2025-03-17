import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { v4 as uuidv4 } from 'uuid';

interface ContentMigrationConfig {
  type: 'algorithm' | 'case-study' | 'industry' | 'persona';
  sourceDir: string;
  defaultDifficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const configs: ContentMigrationConfig[] = [
  {
    type: 'algorithm',
    sourceDir: 'src/content/algorithms',
    defaultDifficulty: 'Intermediate'
  },
  {
    type: 'case-study',
    sourceDir: 'src/content/case-studies',
    defaultDifficulty: 'Intermediate'
  },
  {
    type: 'industry',
    sourceDir: 'src/content/industries',
    defaultDifficulty: 'Beginner'
  },
  {
    type: 'persona',
    sourceDir: 'src/content/personas',
    defaultDifficulty: 'Intermediate'
  }
];

async function migrateContent() {
  for (const config of configs) {
    console.log(`\nMigrating ${config.type} content...`);
    
    try {
      const files = await fs.readdir(config.sourceDir);
      const mdxFiles = files.filter(file => file.endsWith('.mdx'));
      
      for (const file of mdxFiles) {
        const filePath = path.join(config.sourceDir, file);
        const content = await fs.readFile(filePath, 'utf8');
        const { data: frontmatter, content: markdown } = matter(content);
        
        // Generate new frontmatter based on content type
        const newFrontmatter = await generateNewFrontmatter(frontmatter, config);
        
        // Combine new frontmatter with existing content
        const newContent = matter.stringify(markdown, newFrontmatter);
        
        // Create backup of original file
        const backupPath = filePath + '.backup';
        await fs.writeFile(backupPath, content);
        
        // Write updated content
        await fs.writeFile(filePath, newContent);
        
        console.log(`✓ Migrated ${file}`);
      }
    } catch (error) {
      console.error(`Error migrating ${config.type} content:`, error);
    }
  }
}

async function generateNewFrontmatter(
  original: Record<string, any>,
  config: ContentMigrationConfig
): Promise<Record<string, any>> {
  const base = {
    id: original.id || uuidv4(),
    title: original.title || 'Untitled',
    type: config.type,
    slug: original.slug || slugify(original.title),
    description: original.description || '',
    lastUpdated: original.lastUpdated || new Date().toISOString().split('T')[0],
    difficulty: original.difficulty || config.defaultDifficulty,
    keywords: original.keywords || [],
    relatedContent: {
      algorithms: original.relatedAlgorithms || [],
      caseStudies: original.relatedCaseStudies || [],
      industries: original.relatedIndustries || [],
      personas: original.relatedPersonas || []
    }
  };

  // Add type-specific fields
  switch (config.type) {
    case 'algorithm':
      return {
        ...base,
        complexity: original.complexity || 'O(n)',
        applications: migrateApplications(original.applications),
        prerequisites: original.prerequisites || [],
        implementation: {
          steps: original.implementationSteps || [],
          requirements: original.implementationRequirements || [],
          considerations: original.implementationConsiderations || []
        }
      };

    case 'case-study':
      return {
        ...base,
        industry: original.industry || [],
        technologies: original.technologies || [],
        metrics: original.metrics || {},
        outcomes: {
          challenges: original.challenges || [],
          solutions: original.solutions || [],
          results: original.results || []
        }
      };

    case 'industry':
      return {
        ...base,
        sector: original.sector || 'Other',
        applications: migrateApplications(original.applications),
        challenges: original.challenges || [],
        opportunities: original.opportunities || [],
        maturityLevel: original.maturityLevel || 'Emerging'
      };

    case 'persona':
      return {
        ...base,
        role: original.role || 'Undefined Role',
        expertise: original.expertise || [],
        goals: original.goals || [],
        challenges: original.challenges || [],
        learningPath: {
          prerequisites: original.prerequisites || [],
          recommendations: original.recommendations || []
        }
      };

    default:
      return base;
  }
}

function migrateApplications(applications: any[] | undefined): any[] {
  if (!applications) return [];
  
  return applications.map(app => {
    if (typeof app === 'string') {
      return {
        title: app,
        description: '',
        examples: []
      };
    }
    return {
      title: app.title || 'Untitled Application',
      description: app.description || '',
      examples: app.examples || []
    };
  });
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .trim();
}

// Run migration
migrateContent().then(() => {
  console.log('\nMigration completed!');
  console.log('Please review the changes and delete .backup files if satisfied.');
}).catch(error => {
  console.error('Migration failed:', error);
}); 