#!/usr/bin/env tsx

/**
 * Batch import script for processing multiple Qookie case study JSON files
 * Generates comprehensive report before database changes
 */

import { config } from 'dotenv';
import { createServiceRoleSupabaseClient } from '@/lib/supabase-server';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { importCaseStudy } from './import-case-study-test';

// Load environment variables
config({ path: '.env.local' });

// Type definitions
interface BatchImportResult {
  filePath: string;
  fileName: string;
  status: 'success' | 'duplicate' | 'error' | 'skipped';
  title?: string;
  slug?: string;
  duplicateInfo?: any[];
  entityMatches?: {
    algorithms: { exact: number; fuzzy: number; unmatched: string[] };
    industries: { exact: number; fuzzy: number; unmatched: string[] };
    personas: { exact: number; fuzzy: number; unmatched: string[] };
  };
  contentStats?: {
    descriptionLength: number;
    mainContentLength: number;
    referencesCount: number;
  };
  error?: string;
}

interface BatchReport {
  totalFiles: number;
  processed: number;
  successful: number;
  duplicates: number;
  errors: number;
  results: BatchImportResult[];
  entitySummary: {
    allUnmatchedAlgorithms: Set<string>;
    allUnmatchedIndustries: Set<string>;
    allUnmatchedPersonas: Set<string>;
    totalAlgorithmMatches: number;
    totalIndustryMatches: number;
    totalPersonaMatches: number;
  };
}

// Utility functions from single case study test
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function findMatchingEntities(entityType: 'algorithms' | 'industries' | 'personas', names: string[]) {
  const supabase = createServiceRoleSupabaseClient();
  const results = {
    exact: [] as any[],
    fuzzy: [] as any[],
    unmatched: [] as string[]
  };

  const { data: existingEntities, error } = await supabase
    .from(entityType)
    .select('id, name, slug');

  if (error) {
    console.error(`Error fetching ${entityType}:`, error);
    return results;
  }

  for (const name of names) {
    let matched = existingEntities?.find(entity => 
      entity.name.toLowerCase() === name.toLowerCase()
    );

    if (matched) {
      results.exact.push({ ...matched, originalName: name });
      continue;
    }

    matched = existingEntities?.find(entity => 
      entity.name.toLowerCase().includes(name.toLowerCase()) ||
      name.toLowerCase().includes(entity.name.toLowerCase())
    );

    if (matched) {
      results.fuzzy.push({ ...matched, originalName: name });
      continue;
    }

    results.unmatched.push(name);
  }

  return results;
}

async function checkForDuplicates(title: string, slug: string) {
  const supabase = createServiceRoleSupabaseClient();
  
  // Check for duplicate titles and slugs separately to avoid SQL parsing issues
  const { data: titleDuplicates, error: titleError } = await supabase
    .from('case_studies')
    .select('id, title, slug')
    .ilike('title', `%${title}%`);

  const { data: slugDuplicates, error: slugError } = await supabase
    .from('case_studies')
    .select('id, title, slug')
    .eq('slug', slug);

  if (titleError || slugError) {
    console.error('Error checking for duplicates:', titleError || slugError);
    return { hasDuplicates: false, duplicates: [] };
  }

  const allDuplicates = [
    ...(titleDuplicates || []),
    ...(slugDuplicates || [])
  ];

  // Remove duplicates by ID
  const uniqueDuplicates = allDuplicates.filter((item, index, self) => 
    index === self.findIndex(t => t.id === item.id)
  );

  return { 
    hasDuplicates: uniqueDuplicates.length > 0, 
    duplicates: uniqueDuplicates
  };
}

function buildMainContent(caseStudy: any): string {
  return `## Introduction
${caseStudy.introduction}

## Challenge
${caseStudy.challenge}

## Solution
${caseStudy.solution}

## Implementation
${caseStudy.implementation}

## Results and Business Impact
${caseStudy.results_and_business_impact}

## Future Directions
${caseStudy.future_directions}`;
}

function buildReferences(caseStudy: any): any[] {
  const allReferences = [
    ...(caseStudy.references || []),
    ...(caseStudy.furtherReading || [])
  ];
  
  return allReferences;
}

// Process a single case study file
async function processCaseStudyFile(filePath: string): Promise<BatchImportResult> {
  const fileName = path.basename(filePath);
  const result: BatchImportResult = {
    filePath,
    fileName,
    status: 'error'
  };

  try {
    // Read and parse JSON
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const caseStudy = JSON.parse(fileContent);

    // Validate required fields
    if (!caseStudy.title || !caseStudy.summary || !caseStudy.advancedMetadata) {
      result.error = 'Missing required fields (title, summary, or advancedMetadata)';
      return result;
    }

    result.title = caseStudy.title;
    result.slug = generateSlug(caseStudy.title);

    // Check for duplicates
    const { hasDuplicates, duplicates } = await checkForDuplicates(result.title, result.slug);
    if (hasDuplicates) {
      result.status = 'duplicate';
      result.duplicateInfo = duplicates;
      return result;
    }

    // Entity matching
    const algorithmMatches = await findMatchingEntities('algorithms', caseStudy.advancedMetadata.algorithms || []);
    const industryMatches = await findMatchingEntities('industries', caseStudy.advancedMetadata.industries || []);
    const personaMatches = await findMatchingEntities('personas', caseStudy.advancedMetadata.personas || []);

    result.entityMatches = {
      algorithms: {
        exact: algorithmMatches.exact.length,
        fuzzy: algorithmMatches.fuzzy.length,
        unmatched: algorithmMatches.unmatched
      },
      industries: {
        exact: industryMatches.exact.length,
        fuzzy: industryMatches.fuzzy.length,
        unmatched: industryMatches.unmatched
      },
      personas: {
        exact: personaMatches.exact.length,
        fuzzy: personaMatches.fuzzy.length,
        unmatched: personaMatches.unmatched
      }
    };

    // Content stats
    const mainContent = buildMainContent(caseStudy);
    const references = buildReferences(caseStudy);

    result.contentStats = {
      descriptionLength: caseStudy.summary.length,
      mainContentLength: mainContent.length,
      referencesCount: references.length
    };

    result.status = 'success';
    return result;

  } catch (error) {
    result.error = error instanceof Error ? error.message : String(error);
    return result;
  }
}

// Find all JSON files in directory
function findJsonFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    throw new Error(`Directory not found: ${directory}`);
  }

  const files = fs.readdirSync(directory);
  return files
    .filter(file => file.endsWith('.json'))
    .map(file => path.join(directory, file))
    .sort();
}

// Generate comprehensive report
function generateReport(results: BatchImportResult[]): BatchReport {
  const report: BatchReport = {
    totalFiles: results.length,
    processed: results.length,
    successful: 0,
    duplicates: 0,
    errors: 0,
    results,
    entitySummary: {
      allUnmatchedAlgorithms: new Set<string>(),
      allUnmatchedIndustries: new Set<string>(),
      allUnmatchedPersonas: new Set<string>(),
      totalAlgorithmMatches: 0,
      totalIndustryMatches: 0,
      totalPersonaMatches: 0
    }
  };

  results.forEach(result => {
    switch (result.status) {
      case 'success':
        report.successful++;
        break;
      case 'duplicate':
        report.duplicates++;
        break;
      case 'error':
        report.errors++;
        break;
    }

    // Aggregate entity matching data
    if (result.entityMatches) {
      const { algorithms, industries, personas } = result.entityMatches;
      
      // Track all unmatched entities
      algorithms.unmatched.forEach(alg => report.entitySummary.allUnmatchedAlgorithms.add(alg));
      industries.unmatched.forEach(ind => report.entitySummary.allUnmatchedIndustries.add(ind));
      personas.unmatched.forEach(per => report.entitySummary.allUnmatchedPersonas.add(per));

      // Count total matches
      report.entitySummary.totalAlgorithmMatches += algorithms.exact + algorithms.fuzzy;
      report.entitySummary.totalIndustryMatches += industries.exact + industries.fuzzy;
      report.entitySummary.totalPersonaMatches += personas.exact + personas.fuzzy;
    }
  });

  return report;
}

// Print detailed report
function printReport(report: BatchReport) {
  console.log('\n🎯 BATCH IMPORT ANALYSIS REPORT');
  console.log('================================');
  
  console.log(`\n📊 Overview:`);
  console.log(`   Total files processed: ${report.totalFiles}`);
  console.log(`   ✅ Ready for import: ${report.successful}`);
  console.log(`   ⚠️  Duplicates found: ${report.duplicates}`);
  console.log(`   ❌ Errors encountered: ${report.errors}`);

  if (report.successful > 0) {
    const successfulResults = report.results.filter(r => r.status === 'success');
    const totalContent = successfulResults.reduce((sum, r) => sum + (r.contentStats?.mainContentLength || 0), 0);
    const totalReferences = successfulResults.reduce((sum, r) => sum + (r.contentStats?.referencesCount || 0), 0);
    const avgContentLength = Math.round(totalContent / successfulResults.length);
    const avgReferences = Math.round(totalReferences / successfulResults.length);

    console.log(`\n📝 Content Quality:`);
    console.log(`   Average content length: ${avgContentLength.toLocaleString()} chars`);
    console.log(`   Average references per case study: ${avgReferences}`);
    console.log(`   Total references: ${totalReferences}`);
  }

  console.log(`\n🔗 Entity Relationship Summary:`);
  console.log(`   Algorithm matches: ${report.entitySummary.totalAlgorithmMatches}`);
  console.log(`   Industry matches: ${report.entitySummary.totalIndustryMatches}`);
  console.log(`   Persona matches: ${report.entitySummary.totalPersonaMatches}`);

  console.log(`\n🔍 Unique Unmatched Entities:`);
  console.log(`   Algorithms (${report.entitySummary.allUnmatchedAlgorithms.size}):`);
  Array.from(report.entitySummary.allUnmatchedAlgorithms).slice(0, 10).forEach(alg => {
    console.log(`      • ${alg}`);
  });
  if (report.entitySummary.allUnmatchedAlgorithms.size > 10) {
    console.log(`      ... and ${report.entitySummary.allUnmatchedAlgorithms.size - 10} more`);
  }

  console.log(`\n   Industries (${report.entitySummary.allUnmatchedIndustries.size}):`);
  Array.from(report.entitySummary.allUnmatchedIndustries).slice(0, 10).forEach(ind => {
    console.log(`      • ${ind}`);
  });
  if (report.entitySummary.allUnmatchedIndustries.size > 10) {
    console.log(`      ... and ${report.entitySummary.allUnmatchedIndustries.size - 10} more`);
  }

  console.log(`\n   Personas (${report.entitySummary.allUnmatchedPersonas.size}):`);
  Array.from(report.entitySummary.allUnmatchedPersonas).slice(0, 10).forEach(per => {
    console.log(`      • ${per}`);
  });
  if (report.entitySummary.allUnmatchedPersonas.size > 10) {
    console.log(`      ... and ${report.entitySummary.allUnmatchedPersonas.size - 10} more`);
  }

  if (report.duplicates > 0) {
    console.log(`\n⚠️  Duplicate Case Studies:`);
    report.results.filter(r => r.status === 'duplicate').forEach(result => {
      console.log(`   • ${result.fileName}: "${result.title}"`);
      result.duplicateInfo?.forEach(dup => {
        console.log(`     Conflicts with: ${dup.title} (${dup.slug})`);
      });
    });
  }

  if (report.errors > 0) {
    console.log(`\n❌ Files with Errors:`);
    report.results.filter(r => r.status === 'error').forEach(result => {
      console.log(`   • ${result.fileName}: ${result.error}`);
    });
  }

  console.log('\n📋 Next Steps:');
  if (report.successful > 0) {
    console.log(`   1. Review unmatched entities above`);
    console.log(`   2. Consider creating missing entities in database`);
    console.log(`   3. Run with --commit flag to import ${report.successful} case studies`);
    console.log(`\n   Command: tsx scripts/import-case-studies-batch.ts <directory> --commit`);
  } else {
    console.log(`   ❌ No case studies ready for import`);
    console.log(`   📝 Fix errors and duplicates before proceeding`);
  }
}

// Save report to file
function saveReportToFile(report: BatchReport, outputPath: string) {
  const reportData = {
    generatedAt: new Date().toISOString(),
    summary: {
      totalFiles: report.totalFiles,
      successful: report.successful,
      duplicates: report.duplicates,
      errors: report.errors
    },
    entitySummary: {
      ...report.entitySummary,
      allUnmatchedAlgorithms: Array.from(report.entitySummary.allUnmatchedAlgorithms),
      allUnmatchedIndustries: Array.from(report.entitySummary.allUnmatchedIndustries),
      allUnmatchedPersonas: Array.from(report.entitySummary.allUnmatchedPersonas)
    },
    detailedResults: report.results
  };

  fs.writeFileSync(outputPath, JSON.stringify(reportData, null, 2));
  console.log(`\n💾 Detailed report saved to: ${outputPath}`);
}

// Main batch processing function
async function processBatch(directory: string, commit: boolean = false) {
  console.log('🔍 Starting batch case study analysis...');
  console.log(`📁 Directory: ${directory}`);
  console.log(`🚫 Commit mode: ${commit ? 'YES (will import to database)' : 'NO (analysis only)'}`);
  console.log('');

  // Find all JSON files
  const jsonFiles = findJsonFiles(directory);
  console.log(`📄 Found ${jsonFiles.length} JSON files`);

  if (jsonFiles.length === 0) {
    console.log('❌ No JSON files found in directory');
    return;
  }

  // Process each file
  console.log('\n⚡ Processing files...');
  const results: BatchImportResult[] = [];
  
  for (let i = 0; i < jsonFiles.length; i++) {
    const filePath = jsonFiles[i];
    const fileName = path.basename(filePath);
    
    process.stdout.write(`\r   Processing ${i + 1}/${jsonFiles.length}: ${fileName.slice(0, 50)}...`);
    
    const result = await processCaseStudyFile(filePath);
    results.push(result);
    
    // Brief pause to avoid overwhelming the database
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  
  console.log('\n✅ Analysis complete!');

  // Generate and display report
  const report = generateReport(results);
  printReport(report);

  // Save detailed report
  const reportPath = path.join(process.cwd(), `batch-import-report-${Date.now()}.json`);
  saveReportToFile(report, reportPath);

  // If commit mode and successful cases exist, proceed with import
  if (commit && report.successful > 0) {
    // Generate batch ID for this import run
    const batchId = randomUUID();
    const timestamp = new Date().toISOString();
    
    console.log('\n🚀 Starting database import...');
    console.log(`📦 Batch ID: ${batchId}`);
    console.log(`⏰ Started: ${timestamp}`);
    
    const successfulFiles = results
      .filter(r => r.status === 'success')
      .map(r => r.filePath);

    let imported = 0;
    for (const filePath of successfulFiles) {
      try {
        process.stdout.write(`\r   Importing ${imported + 1}/${successfulFiles.length}...`);
        await importCaseStudy(filePath, false, batchId); // false = not dry run, pass batch ID
        imported++;
      } catch (error) {
        console.error(`\n❌ Failed to import ${path.basename(filePath)}:`, error);
      }
    }

    console.log(`\n🎉 Import completed! ${imported}/${successfulFiles.length} case studies imported successfully.`);
    console.log(`📦 Batch ID: ${batchId} (save this for rollback if needed)`);
    console.log(`🔍 View imported case studies: SELECT * FROM case_studies WHERE import_batch_id = '${batchId}';`);
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const directory = args[0];
  const commit = args.includes('--commit');

  if (!directory) {
    console.error('Usage: tsx scripts/import-case-studies-batch.ts <directory> [--commit]');
    console.error('');
    console.error('Examples:');
    console.error('  tsx scripts/import-case-studies-batch.ts /path/to/json/files');
    console.error('  tsx scripts/import-case-studies-batch.ts /path/to/json/files --commit');
    console.error('');
    console.error('Options:');
    console.error('  --commit    Actually import to database (default: analysis only)');
    process.exit(1);
  }

  try {
    await processBatch(directory, commit);
  } catch (error) {
    console.error('❌ Batch processing failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

export { processBatch };