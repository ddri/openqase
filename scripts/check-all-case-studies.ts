import { createClient } from '@supabase/supabase-js';

const PROD_URL = 'https://lsxpumoaowwzqzmypopd.supabase.co';
const PROD_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzeHB1bW9hb3d3enF6bXlwb3BkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMDY2NjEsImV4cCI6MjA1OTY4MjY2MX0.eLornQbRXQf3gQ2gyR__fP0THP5Q1evp0C5r0OjGjOc';

const supabase = createClient(PROD_URL, PROD_ANON_KEY);

async function checkAllCaseStudies() {
  // Get all case studies regardless of published status
  const { data, error } = await supabase
    .from('case_studies')
    .select('id, title, slug, published, deleted_at, main_content')
    .order('title');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('=== ALL CASE STUDIES ===');
  console.log('Total in database:', data?.length);

  const published = data?.filter(cs => cs.published === true && cs.deleted_at === null) || [];
  const drafts = data?.filter(cs => cs.published === false && cs.deleted_at === null) || [];
  const deleted = data?.filter(cs => cs.deleted_at !== null) || [];

  console.log('\nBreakdown:');
  console.log('  Published:', published.length);
  console.log('  Drafts (unpublished):', drafts.length);
  console.log('  Soft-deleted:', deleted.length);

  // Analyze drafts
  if (drafts.length > 0) {
    console.log('\n=== DRAFT CASE STUDIES ===');

    const draftsWithContent = drafts.filter(cs => cs.main_content && cs.main_content.length > 100);
    const draftsNoContent = drafts.filter(cs => !cs.main_content || cs.main_content.length <= 100);

    console.log(`\nDrafts with substantial content (>100 chars): ${draftsWithContent.length}`);
    console.log(`Drafts with little/no content: ${draftsNoContent.length}`);

    console.log('\n--- Drafts WITH Content (ready to publish?) ---');
    draftsWithContent.slice(0, 20).forEach((cs, i) => {
      console.log(`${i+1}. ${cs.title || '(no title)'}`);
      console.log(`   Slug: ${cs.slug || '(no slug)'}`);
      console.log(`   Content: ${cs.main_content?.length || 0} chars`);
    });

    if (draftsWithContent.length > 20) {
      console.log(`... and ${draftsWithContent.length - 20} more with content`);
    }

    console.log('\n--- Drafts WITHOUT Content (stubs) ---');
    draftsNoContent.slice(0, 10).forEach((cs, i) => {
      console.log(`${i+1}. ${cs.title || '(no title)'}`);
      console.log(`   Slug: ${cs.slug || '(no slug)'}`);
    });

    if (draftsNoContent.length > 10) {
      console.log(`... and ${draftsNoContent.length - 10} more stubs`);
    }
  }

  // Show deleted
  if (deleted.length > 0) {
    console.log('\n=== SOFT-DELETED CASE STUDIES ===');
    deleted.forEach((cs, i) => {
      console.log(`${i+1}. ${cs.title || '(no title)'}`);
      console.log(`   Deleted at: ${cs.deleted_at}`);
    });
  }
}

checkAllCaseStudies();
