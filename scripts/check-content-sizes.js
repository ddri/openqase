#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkContentSizes() {
  console.log('🔍 Checking content sizes that might cause slow rendering...\n');
  
  // Check personas
  const { data: personas } = await supabase
    .from('personas')
    .select('slug, name, main_content, recommended_reading')
    .eq('published', true);
    
  console.log('📄 Persona Content Sizes:');
  personas?.forEach(p => {
    const mainSize = p.main_content ? p.main_content.length : 0;
    const readingSize = p.recommended_reading ? p.recommended_reading.length : 0;
    const totalSize = mainSize + readingSize;
    
    console.log(`- ${p.slug}:`);
    console.log(`  Main: ${Math.round(mainSize/1024)}KB (${mainSize.toLocaleString()} chars)`);
    console.log(`  Reading: ${Math.round(readingSize/1024)}KB (${readingSize.toLocaleString()} chars)`);
    console.log(`  Total: ${Math.round(totalSize/1024)}KB`);
    
    if (totalSize > 100000) {
      console.log(`  ⚠️  LARGE CONTENT - This could cause slow rendering!`);
    }
    console.log('');
  });
  
  // Check case studies
  const { data: caseStudies } = await supabase
    .from('case_studies')
    .select('slug, title, main_content')
    .eq('published', true)
    .limit(5);
    
  console.log('\n📋 Case Study Content Sizes (first 5):');
  caseStudies?.forEach(cs => {
    const size = cs.main_content ? cs.main_content.length : 0;
    console.log(`- ${cs.slug}: ${Math.round(size/1024)}KB (${size.toLocaleString()} chars)`);
    
    if (size > 100000) {
      console.log(`  ⚠️  LARGE CONTENT - This could cause slow rendering!`);
    }
  });
  
  // Summary
  const allContent = [...(personas || []), ...(caseStudies || [])];
  const largeSizes = allContent.filter(item => {
    const size = item.main_content ? item.main_content.length : 0;
    return size > 50000; // 50KB+
  });
  
  console.log('\n📊 SUMMARY:');
  console.log(`Total items checked: ${allContent.length}`);
  console.log(`Items with large content (>50KB): ${largeSizes.length}`);
  
  if (largeSizes.length > 0) {
    console.log('\n🚨 POTENTIAL PERFORMANCE ISSUE:');
    console.log('Large content items that could cause slow rendering:');
    largeSizes.forEach(item => {
      const size = item.main_content ? item.main_content.length : 0;
      console.log(`- ${item.slug || item.title}: ${Math.round(size/1024)}KB`);
    });
    
    console.log('\n💡 RECOMMENDATIONS:');
    console.log('1. Consider lazy loading large content');
    console.log('2. Implement content pagination');
    console.log('3. Use virtual scrolling for large text');
    console.log('4. Consider server-side markdown rendering with caching');
  } else {
    console.log('✅ No unusually large content found');
  }
}

checkContentSizes().catch(console.error); 