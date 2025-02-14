import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const contentDir = join(dirname(__dirname), 'content');

async function loadContent(type) {
  const dir = join(contentDir, type);
  const files = await readdir(dir);
  const content = {};
  
  for (const file of files) {
    if (file.endsWith('.json')) {
      const data = JSON.parse(await readFile(join(dir, file), 'utf-8'));
      content[data.slug] = data;
    }
  }
  
  return content;
}

async function verifyLearningPaths() {
  console.log('Verifying learning path relationships...\n');
  
  const personas = await loadContent('persona');
  const industries = await loadContent('industry');
  const algorithms = await loadContent('algorithm');
  const caseStudies = await loadContent('case-study');
  
  console.log('Checking case study references:');
  for (const [slug, study] of Object.entries(caseStudies)) {
    console.log(`\nCase Study: ${study.title}`);
    
    // Check personas
    console.log('Personas:');
    for (const personaSlug of study.personas) {
      if (personas[personaSlug]) {
        console.log(`✓ ${personaSlug} exists`);
      } else {
        console.log(`✗ ${personaSlug} not found in personas`);
      }
    }
    
    // Check industries
    console.log('\nIndustries:');
    for (const industrySlug of study.industries) {
      if (industries[industrySlug]) {
        console.log(`✓ ${industrySlug} exists`);
      } else {
        console.log(`✗ ${industrySlug} not found in industries`);
      }
    }
    
    // Check algorithms
    console.log('\nAlgorithms:');
    for (const algoSlug of study.algorithms) {
      if (algorithms[algoSlug]) {
        console.log(`✓ ${algoSlug} exists`);
      } else {
        console.log(`✗ ${algoSlug} not found in algorithms`);
      }
    }
  }
}

verifyLearningPaths().catch(console.error);