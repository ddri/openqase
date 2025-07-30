#!/usr/bin/env tsx

/**
 * Test script for importing a single case study from Qookie JSON export
 * Validates our mapping strategy before batch processing
 */

import { config } from 'dotenv';
import { createServiceRoleSupabaseClient } from '@/lib/supabase-server';
import fs from 'fs';
import path from 'path';

// Load environment variables
config({ path: '.env.local' });

// Type definitions for Qookie JSON structure
interface QookieAdvancedMetadata {
  algorithms: string[];
  industries: string[];
  personas: string[];
  confidence_score: number;
  analysis_notes: string;
  _analyzed: boolean;
  _analyzedAt: string;
}

interface QookieReference {
  title: string;
  authors?: string[];
  journal?: string;
  year?: string;
  url?: string;
  citation?: string;
  source?: string;
  type?: string;
  date?: string;
  description?: string;
}

interface QookieCaseStudy {
  title: string;
  summary: string;
  introduction: string;
  challenge: string;
  solution: string;
  implementation: string;
  results_and_business_impact: string;
  future_directions: string;
  advancedMetadata: QookieAdvancedMetadata;
  references: QookieReference[];
  furtherReading: QookieReference[];
}

// Utility function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// Entity matching functions
async function findMatchingEntities(entityType: 'algorithms' | 'industries' | 'personas', names: string[]) {
  const supabase = createServiceRoleSupabaseClient();
  const results = {
    exact: [] as any[],
    fuzzy: [] as any[],
    unmatched: [] as string[]
  };

  // Get all entities of this type for matching
  const { data: existingEntities, error } = await supabase
    .from(entityType)
    .select('id, name, slug');

  if (error) {
    console.error(`Error fetching ${entityType}:`, error);
    return results;
  }

  for (const name of names) {
    // Try exact match first (case-insensitive)
    let matched = existingEntities?.find(entity => 
      entity.name.toLowerCase() === name.toLowerCase()
    );

    if (matched) {
      results.exact.push({ ...matched, originalName: name });
      continue;
    }

    // Try fuzzy match (contains or partial match)
    matched = existingEntities?.find(entity => 
      entity.name.toLowerCase().includes(name.toLowerCase()) ||
      name.toLowerCase().includes(entity.name.toLowerCase())
    );

    if (matched) {
      results.fuzzy.push({ ...matched, originalName: name });
      continue;
    }

    // No match found
    results.unmatched.push(name);
  }

  return results;
}

// Check for duplicate case studies
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

// Main content concatenation with proper headings
function buildMainContent(caseStudy: QookieCaseStudy): string {
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

// Combine references and further reading
function buildReferences(caseStudy: QookieCaseStudy): QookieReference[] {
  const allReferences = [
    ...(caseStudy.references || []),
    ...(caseStudy.furtherReading || [])
  ];
  
  return allReferences;
}

// Main import function
async function importCaseStudy(jsonFilePath: string, dryRun: boolean = true) {
  console.log('🔍 Starting case study import test...');
  console.log(`📄 File: ${jsonFilePath}`);
  console.log(`🚫 Dry run: ${dryRun ? 'YES (no database changes)' : 'NO (will modify database)'}`);
  console.log('');

  // 1. Read and parse JSON file
  let caseStudy: QookieCaseStudy;
  try {
    const fileContent = fs.readFileSync(jsonFilePath, 'utf-8');
    caseStudy = JSON.parse(fileContent);
    console.log('✅ JSON file parsed successfully');
  } catch (error) {
    console.error('❌ Failed to parse JSON file:', error);
    return;
  }

  // 2. Generate slug and check for duplicates
  const slug = generateSlug(caseStudy.title);
  console.log(`📝 Generated slug: ${slug}`);

  const { hasDuplicates, duplicates } = await checkForDuplicates(caseStudy.title, slug);
  if (hasDuplicates) {
    console.log('⚠️  DUPLICATE DETECTED:');
    duplicates.forEach(dup => console.log(`   - ${dup.title} (${dup.slug})`));
    console.log('❌ Skipping import due to duplicate');
    return;
  }
  console.log('✅ No duplicates found');

  // 3. Entity matching
  console.log('\n🔗 Entity Matching:');
  
  const algorithmMatches = await findMatchingEntities('algorithms', caseStudy.advancedMetadata.algorithms);
  console.log(`   Algorithms: ${algorithmMatches.exact.length} exact, ${algorithmMatches.fuzzy.length} fuzzy, ${algorithmMatches.unmatched.length} unmatched`);
  if (algorithmMatches.unmatched.length > 0) {
    console.log(`      Unmatched: ${algorithmMatches.unmatched.join(', ')}`);
  }

  const industryMatches = await findMatchingEntities('industries', caseStudy.advancedMetadata.industries);
  console.log(`   Industries: ${industryMatches.exact.length} exact, ${industryMatches.fuzzy.length} fuzzy, ${industryMatches.unmatched.length} unmatched`);
  if (industryMatches.unmatched.length > 0) {
    console.log(`      Unmatched: ${industryMatches.unmatched.join(', ')}`);
  }

  const personaMatches = await findMatchingEntities('personas', caseStudy.advancedMetadata.personas);
  console.log(`   Personas: ${personaMatches.exact.length} exact, ${personaMatches.fuzzy.length} fuzzy, ${personaMatches.unmatched.length} unmatched`);
  if (personaMatches.unmatched.length > 0) {
    console.log(`      Unmatched: ${personaMatches.unmatched.join(', ')}`);
  }

  // 4. Build case study data
  const mainContent = buildMainContent(caseStudy);
  const references = buildReferences(caseStudy);

  const caseStudyData = {
    title: caseStudy.title,
    slug: slug,
    description: caseStudy.summary,
    main_content: mainContent,
    references: references.length > 0 ? references : null,
    published: false, // Start as unpublished for review
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  console.log('\n📊 Import Summary:');
  console.log(`   Title: ${caseStudyData.title}`);
  console.log(`   Slug: ${caseStudyData.slug}`);
  console.log(`   Description length: ${caseStudyData.description.length} chars`);
  console.log(`   Main content length: ${caseStudyData.main_content.length} chars`);
  console.log(`   References: ${references.length} items`);
  console.log(`   Algorithm relations: ${algorithmMatches.exact.length + algorithmMatches.fuzzy.length}`);
  console.log(`   Industry relations: ${industryMatches.exact.length + industryMatches.fuzzy.length}`);
  console.log(`   Persona relations: ${personaMatches.exact.length + personaMatches.fuzzy.length}`);

  if (dryRun) {
    console.log('\n🚫 DRY RUN - No database changes made');
    console.log('✅ Validation complete - ready for actual import');
    return;
  }

  // 5. Insert case study and create relationships
  console.log('\n💾 Inserting into database...');
  const supabase = createServiceRoleSupabaseClient();

  try {
    // Insert case study
    const { data: insertedCaseStudy, error: insertError } = await supabase
      .from('case_studies')
      .insert(caseStudyData)
      .select('id')
      .single();

    if (insertError) {
      console.error('❌ Failed to insert case study:', insertError);
      return;
    }

    const caseStudyId = insertedCaseStudy.id;
    console.log(`✅ Case study inserted with ID: ${caseStudyId}`);

    // Insert algorithm relationships
    const allAlgorithms = [...algorithmMatches.exact, ...algorithmMatches.fuzzy];
    if (allAlgorithms.length > 0) {
      const algorithmRelations = allAlgorithms.map(alg => ({
        case_study_id: caseStudyId,
        algorithm_id: alg.id
      }));

      const { error: algError } = await supabase
        .from('algorithm_case_study_relations')
        .insert(algorithmRelations);

      if (algError) {
        console.error('❌ Failed to insert algorithm relations:', algError);
      } else {
        console.log(`✅ Inserted ${algorithmRelations.length} algorithm relations`);
      }
    }

    // Insert industry relationships
    const allIndustries = [...industryMatches.exact, ...industryMatches.fuzzy];
    if (allIndustries.length > 0) {
      const industryRelations = allIndustries.map(ind => ({
        case_study_id: caseStudyId,
        industry_id: ind.id
      }));

      const { error: indError } = await supabase
        .from('case_study_industry_relations')
        .insert(industryRelations);

      if (indError) {
        console.error('❌ Failed to insert industry relations:', indError);
      } else {
        console.log(`✅ Inserted ${industryRelations.length} industry relations`);
      }
    }

    // Insert persona relationships
    const allPersonas = [...personaMatches.exact, ...personaMatches.fuzzy];
    if (allPersonas.length > 0) {
      const personaRelations = allPersonas.map(per => ({
        case_study_id: caseStudyId,
        persona_id: per.id
      }));

      const { error: perError } = await supabase
        .from('case_study_persona_relations')
        .insert(personaRelations);

      if (perError) {
        console.error('❌ Failed to insert persona relations:', perError);
      } else {
        console.log(`✅ Inserted ${personaRelations.length} persona relations`);
      }
    }

    console.log('\n🎉 Case study import completed successfully!');
    console.log(`📝 View at: /admin/case-studies/${caseStudyId}`);

  } catch (error) {
    console.error('❌ Database operation failed:', error);
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const filePath = args[0];
  const dryRun = !args.includes('--commit');

  if (!filePath) {
    console.error('Usage: tsx scripts/import-case-study-test.ts <json-file-path> [--commit]');
    console.error('');
    console.error('Examples:');
    console.error('  tsx scripts/import-case-study-test.ts /path/to/case-study.json');
    console.error('  tsx scripts/import-case-study-test.ts /path/to/case-study.json --commit');
    process.exit(1);
  }

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    process.exit(1);
  }

  await importCaseStudy(filePath, dryRun);
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

export { importCaseStudy };