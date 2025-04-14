import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Parse command line arguments
const isDryRun = process.argv.includes('--dry-run');
const contentTypes = ['algorithm', 'industry', 'persona', 'case-study'];

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface ContentFile {
  slug: string;
  frontmatter: Record<string, any>;
  content: string;
}

interface MigrationResult {
  success: boolean;
  type: string;
  slug: string;
  error?: any;
}

interface MigrationError {
  message: string;
}

async function readMDXFiles(contentType: string): Promise<ContentFile[]> {
  const contentDir = path.join(process.cwd(), 'content', contentType);
  
  try {
    const files = await fs.readdir(contentDir);
    const mdxFiles = files.filter(file => file.endsWith('.mdx'));
    
    console.log(`Found ${mdxFiles.length} ${contentType} files to migrate`);
    
    return Promise.all(
      mdxFiles.map(async (file) => {
        try {
          const filePath = path.join(contentDir, file);
          const fileContent = await fs.readFile(filePath, 'utf8');
          const { data: frontmatter, content } = matter(fileContent);
          const slug = file.replace('.mdx', '');

          return {
            slug,
            frontmatter,
            content: content.trim(),
          };
        } catch (error) {
          console.error(`Error reading ${file}:`, error);
          throw error;
        }
      })
    );
  } catch (error) {
    console.error(`Error reading ${contentType} directory:`, error);
    return [];
  }
}

async function migrateAlgorithms(): Promise<MigrationResult[]> {
  const results: MigrationResult[] = [];
  const algorithms = await readMDXFiles('algorithm');
  
  for (const algo of algorithms) {
    try {
      if (isDryRun) {
        results.push({
          success: true,
          type: 'algorithm',
          slug: algo.slug
        });
        continue;
      }

      const { error } = await supabase
        .from('algorithms')
        .upsert({
          slug: algo.slug,
          name: algo.frontmatter.title,
          description: algo.frontmatter.description,
          use_cases: algo.frontmatter.use_cases,
          quantum_advantage: algo.frontmatter.quantum_advantage,
          published: true,
          mdx_content: algo.content,
          prerequisites: algo.frontmatter.prerequisites,
          key_applications: algo.frontmatter.key_applications,
        });

      results.push({
        success: !error,
        type: 'algorithm',
        slug: algo.slug,
        error: error?.message
      });

      if (error) {
        console.error(`Error migrating algorithm ${algo.slug}:`, error);
      } else {
        console.log(`Migrated algorithm: ${algo.slug}`);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      results.push({
        success: false,
        type: 'algorithm',
        slug: algo.slug,
        error: errorMessage
      });
      console.error(`Error migrating algorithm ${algo.slug}:`, errorMessage);
    }
  }
  return results;
}

async function migrateIndustries(): Promise<MigrationResult[]> {
  const results: MigrationResult[] = [];
  const industries = await readMDXFiles('industry');
  
  for (const industry of industries) {
    try {
      if (isDryRun) {
        results.push({
          success: true,
          type: 'industry',
          slug: industry.slug
        });
        continue;
      }

      const { error } = await supabase
        .from('industries')
        .upsert({
          slug: industry.slug,
          name: industry.frontmatter.title,
          description: industry.frontmatter.description,
          icon: industry.frontmatter.icon,
          mdx_content: industry.content,
          key_applications: industry.frontmatter.key_applications,
        });

      results.push({
        success: !error,
        type: 'industry',
        slug: industry.slug,
        error: error?.message
      });

      if (error) {
        console.error(`Error migrating industry ${industry.slug}:`, error);
      } else {
        console.log(`Migrated industry: ${industry.slug}`);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      results.push({
        success: false,
        type: 'industry',
        slug: industry.slug,
        error: errorMessage
      });
      console.error(`Error migrating industry ${industry.slug}:`, errorMessage);
    }
  }
  return results;
}

async function migratePersonas(): Promise<MigrationResult[]> {
  const results: MigrationResult[] = [];
  const personas = await readMDXFiles('persona');
  
  for (const persona of personas) {
    try {
      if (isDryRun) {
        results.push({
          success: true,
          type: 'persona',
          slug: persona.slug
        });
        continue;
      }

      const { error } = await supabase
        .from('personas')
        .upsert({
          slug: persona.slug,
          name: persona.frontmatter.title,
          description: persona.frontmatter.description,
          role: persona.frontmatter.role,
          industry: persona.frontmatter.industry,
          key_interests: persona.frontmatter.key_interests,
          technical_level: persona.frontmatter.technical_level,
          mdx_content: persona.content,
          expertise: persona.frontmatter.expertise,
          persona_type: persona.frontmatter.personaType,
          related_case_studies: persona.frontmatter.relatedCaseStudies,
        });

      results.push({
        success: !error,
        type: 'persona',
        slug: persona.slug,
        error: error?.message
      });

      if (error) {
        console.error(`Error migrating persona ${persona.slug}:`, error);
      } else {
        console.log(`Migrated persona: ${persona.slug}`);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      results.push({
        success: false,
        type: 'persona',
        slug: persona.slug,
        error: errorMessage
      });
      console.error(`Error migrating persona ${persona.slug}:`, errorMessage);
    }
  }
  return results;
}

async function migrateCaseStudies(): Promise<MigrationResult[]> {
  const results: MigrationResult[] = [];
  const caseStudies = await readMDXFiles('case-study');
  
  for (const study of caseStudies) {
    try {
      if (isDryRun) {
        results.push({
          success: true,
          type: 'case-study',
          slug: study.slug
        });
        continue;
      }

      const { error } = await supabase
        .from('case_studies')
        .upsert({
          slug: study.slug,
          title: study.frontmatter.title,
          description: study.frontmatter.description,
          partner_companies: study.frontmatter.partner_companies,
          quantum_companies: study.frontmatter.quantum_companies,
          url: study.frontmatter.url,
          algorithms: study.frontmatter.algorithms,
          industries: study.frontmatter.industries,
          personas: study.frontmatter.personas,
          quantum_hardware: study.frontmatter.quantum_hardware,
          published: true,
          mdx_content: study.content,
          difficulty: study.frontmatter.difficulty,
          tags: study.frontmatter.tags,
          metrics: study.frontmatter.metrics,
          technologies: study.frontmatter.technologies,
        });

      results.push({
        success: !error,
        type: 'case-study',
        slug: study.slug,
        error: error?.message
      });

      if (error) {
        console.error(`Error migrating case study ${study.slug}:`, error);
      } else {
        console.log(`Migrated case study: ${study.slug}`);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      results.push({
        success: false,
        type: 'case-study',
        slug: study.slug,
        error: errorMessage
      });
      console.error(`Error migrating case study ${study.slug}:`, errorMessage);
    }
  }
  return results;
}

async function main() {
  const allResults: MigrationResult[] = [];
  
  try {
    console.log(`Starting content migration... ${isDryRun ? '(DRY RUN)' : ''}`);
    
    // Count total files to migrate
    let totalFiles = 0;
    for (const type of contentTypes) {
      const files = await readMDXFiles(type);
      totalFiles += files.length;
    }
    
    console.log(`Total files to migrate: ${totalFiles}`);
    
    if (isDryRun) {
      // Still collect results in dry run mode
      allResults.push(...await migrateAlgorithms());
      allResults.push(...await migrateIndustries());
      allResults.push(...await migratePersonas());
      allResults.push(...await migrateCaseStudies());
      
      console.log('\nDry run completed. No changes were made to the database.');
    } else {
      // Perform actual migration
      allResults.push(...await migrateAlgorithms());
      allResults.push(...await migrateIndustries());
      allResults.push(...await migratePersonas());
      allResults.push(...await migrateCaseStudies());
    }
    
    // Report results
    const successful = allResults.filter(r => r.success).length;
    const failed = allResults.filter(r => !r.success).length;
    
    console.log('\nMigration Summary:');
    console.log(`Successfully migrated: ${successful}`);
    console.log(`Failed to migrate: ${failed}`);
    
    if (failed > 0) {
      console.log('\nFailed items:');
      allResults.filter(r => !r.success).forEach(r => {
        console.log(`- ${r.type}/${r.slug}: ${r.error}`);
      });
    }
    
    console.log('\nContent migration completed!');
  } catch (error) {
    console.error('Fatal error during migration:', error);
    process.exit(1);
  }
}

// Only run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
} 