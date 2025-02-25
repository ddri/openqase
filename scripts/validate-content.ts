#!/usr/bin/env node
import { validateAllContent } from '../src/lib/validation';

async function main() {
  console.log('Validating content...');
  
  try {
    const result = await validateAllContent();
    
    if (!result.isValid) {
      console.error('\nContent validation failed:');
      result.errors.forEach(error => {
        console.error(`\n${error.path}:`);
        console.error(`  ${error.message}`);
      });
      process.exit(1);
    }
    
    console.log('\n✓ Content validation passed');
  } catch (error) {
    console.error('\nValidation failed:', error);
    process.exit(1);
  }
}

main();