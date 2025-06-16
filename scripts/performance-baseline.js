#!/usr/bin/env node

/**
 * Performance Baseline Script
 * Measures current database query performance to establish baseline metrics
 */

import { createClient } from '@supabase/supabase-js';
import { performance } from 'perf_hooks';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function measureQuery(name, queryFn) {
  console.log(`\n🔍 Testing: ${name}`);
  const start = performance.now();
  
  try {
    const result = await queryFn();
    const end = performance.now();
    const duration = Math.round(end - start);
    
    console.log(`✅ ${name}: ${duration}ms (${result.data?.length || 0} records)`);
    if (result.error) {
      console.log(`❌ Error: ${result.error.message}`);
    }
    
    return { name, duration, recordCount: result.data?.length || 0, error: result.error };
  } catch (error) {
    const end = performance.now();
    const duration = Math.round(end - start);
    console.log(`❌ ${name}: ${duration}ms (ERROR: ${error.message})`);
    return { name, duration, recordCount: 0, error: error.message };
  }
}

async function runPerformanceBaseline() {
  console.log('🚀 OpenQase Performance Baseline Test');
  console.log('=====================================');
  
  const results = [];

  // Test 1: Basic content queries
  results.push(await measureQuery(
    'All Published Case Studies',
    () => supabase.from('case_studies').select('*').eq('published', true)
  ));

  results.push(await measureQuery(
    'All Published Algorithms',
    () => supabase.from('algorithms').select('*').eq('published', true)
  ));

  results.push(await measureQuery(
    'All Published Industries',
    () => supabase.from('industries').select('*').eq('published', true)
  ));

  results.push(await measureQuery(
    'All Published Personas',
    () => supabase.from('personas').select('*').eq('published', true)
  ));

  // Test 2: Count queries (used in admin dashboard)
  results.push(await measureQuery(
    'Case Studies Count',
    () => supabase.from('case_studies').select('id', { count: 'exact', head: true })
  ));

  results.push(await measureQuery(
    'Algorithms Count',
    () => supabase.from('algorithms').select('id', { count: 'exact', head: true })
  ));

  // Test 3: Junction table queries
  results.push(await measureQuery(
    'Case Study Industry Relations',
    () => supabase.from('case_study_industry_relations').select('*')
  ));

  results.push(await measureQuery(
    'Algorithm Case Study Relations',
    () => supabase.from('algorithm_case_study_relations').select('*')
  ));

  // Test 4: Complex queries with joins (potential N+1 issues)
  results.push(await measureQuery(
    'Case Studies with Industry Relations',
    () => supabase
      .from('case_studies')
      .select(`
        *,
        case_study_industry_relations(
          industry_id,
          industries(name)
        )
      `)
      .eq('published', true)
      .limit(10)
  ));

  // Test 5: Single record queries (slug-based)
  results.push(await measureQuery(
    'Single Case Study by Slug',
    () => supabase
      .from('case_studies')
      .select('*')
      .eq('slug', 'quantinuum-google-deepmind-circuit-optimisation')
      .single()
  ));

  // Summary
  console.log('\n📊 PERFORMANCE BASELINE SUMMARY');
  console.log('================================');
  
  const totalQueries = results.length;
  const successfulQueries = results.filter(r => !r.error).length;
  const averageTime = Math.round(
    results.filter(r => !r.error).reduce((sum, r) => sum + r.duration, 0) / successfulQueries
  );
  const slowestQuery = results.reduce((max, r) => r.duration > max.duration ? r : max);
  const fastestQuery = results.filter(r => !r.error).reduce((min, r) => r.duration < min.duration ? r : min);

  console.log(`Total Queries: ${totalQueries}`);
  console.log(`Successful: ${successfulQueries}`);
  console.log(`Failed: ${totalQueries - successfulQueries}`);
  console.log(`Average Time: ${averageTime}ms`);
  console.log(`Fastest: ${fastestQuery.name} (${fastestQuery.duration}ms)`);
  console.log(`Slowest: ${slowestQuery.name} (${slowestQuery.duration}ms)`);

  // Identify performance concerns
  console.log('\n⚠️  PERFORMANCE CONCERNS');
  console.log('========================');
  
  const slowQueries = results.filter(r => r.duration > 100);
  if (slowQueries.length > 0) {
    console.log('Queries taking >100ms:');
    slowQueries.forEach(q => {
      console.log(`  - ${q.name}: ${q.duration}ms`);
    });
  } else {
    console.log('✅ All queries under 100ms - Good performance!');
  }

  const errorQueries = results.filter(r => r.error);
  if (errorQueries.length > 0) {
    console.log('\nQueries with errors:');
    errorQueries.forEach(q => {
      console.log(`  - ${q.name}: ${q.error}`);
    });
  }

  console.log('\n🎯 NEXT STEPS');
  console.log('=============');
  console.log('1. Add indexes for slow queries');
  console.log('2. Optimize RLS policies');
  console.log('3. Review junction table usage');
  console.log('4. Implement query caching');
  
  return results;
}

// Run the baseline test
runPerformanceBaseline()
  .then(() => {
    console.log('\n✅ Baseline test complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Baseline test failed:', error);
    process.exit(1);
  }); 