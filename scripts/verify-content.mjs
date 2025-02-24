import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const contentDir = join(dirname(__dirname), 'content');

async function validateContent() {
  console.log('Starting content verification...');
  let hasErrors = false;

  try {
    // Load all content
    const contentTypes = ['algorithm', 'persona', 'case-study'];
    const content = {};

    for (const type of contentTypes) {
      content[type] = {};
      const dir = join(contentDir, type);
      try {
        const files = await readdir(dir);
        for (const file of files) {
          if (file.endsWith('.json')) {
            const data = JSON.parse(await readFile(join(dir, file), 'utf-8'));
            content[type][file.replace('.json', '')] = data;
          }
        }
        console.log(`✓ Loaded ${Object.keys(content[type]).length} ${type} files`);
      } catch (error) {
        console.error(`✗ Error loading ${type} directory:`, error.message);
        hasErrors = true;
      }
    }

    // Verify relationships
    for (const [type, items] of Object.entries(content)) {
      console.log(`\nVerifying ${type} relationships...`);
      
      for (const [slug, data] of Object.entries(items)) {
        // Check related case studies
        if (data.relatedCaseStudies) {
          for (const caseStudyId of data.relatedCaseStudies) {
            if (!content['case-study'][caseStudyId]) {
              console.error(`✗ ${type}/${slug}: Referenced case study '${caseStudyId}' not found`);
              hasErrors = true;
            }
          }
        }

        // Check persona references in case studies
        if (type === 'case-study' && data.personas) {
          for (const personaId of data.personas) {
            if (!content.persona[personaId]) {
              console.error(`✗ ${type}/${slug}: Referenced persona '${personaId}' not found`);
              hasErrors = true;
            }
          }
        }

        // Check algorithm references in case studies
        if (type === 'case-study' && data.algorithms) {
          for (const algorithmId of data.algorithms) {
            if (!content.algorithm[algorithmId]) {
              console.error(`✗ ${type}/${slug}: Referenced algorithm '${algorithmId}' not found`);
              hasErrors = true;
            }
          }
        }
      }
    }

    if (hasErrors) {
      console.error('\n❌ Content verification failed. Please fix the errors above.');
      process.exit(1);
    } else {
      console.log('\n✅ All content verified successfully!');
    }

  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

validateContent();