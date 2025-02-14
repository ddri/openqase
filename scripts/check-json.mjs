import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const contentDir = join(dirname(__dirname), 'content');

async function checkJsonFiles() {
  const personaDir = join(contentDir, 'persona');
  const files = await readdir(personaDir);
  
  for (const file of files) {
    if (file.endsWith('.json')) {
      try {
        const content = await readFile(join(personaDir, file), 'utf-8');
        console.log(`Checking ${file}...`);
        console.log(content);
        JSON.parse(content); // This will throw if JSON is invalid
        console.log(`✓ ${file} is valid JSON`);
      } catch (error) {
        console.error(`✗ ${file} has invalid JSON:`, error.message);
      }
    }
  }
}

checkJsonFiles().catch(console.error);