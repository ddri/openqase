import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function verifyMigration() {
  console.log('Verifying migration...\n');

  // Check algorithms
  const { data: algorithms, error: algoError } = await supabase
    .from('algorithms')
    .select('*');
  
  if (algoError) {
    console.error('Error fetching algorithms:', algoError);
  } else {
    console.log(`Algorithms: ${algorithms?.length} records`);
    console.log('Sample algorithm:', algorithms?.[0]?.name);
  }

  // Check industries
  const { data: industries, error: indError } = await supabase
    .from('industries')
    .select('*');
  
  if (indError) {
    console.error('Error fetching industries:', indError);
  } else {
    console.log(`\nIndustries: ${industries?.length} records`);
    console.log('Sample industry:', industries?.[0]?.name);
  }

  // Check personas
  const { data: personas, error: persError } = await supabase
    .from('personas')
    .select('*');
  
  if (persError) {
    console.error('Error fetching personas:', persError);
  } else {
    console.log(`\nPersonas: ${personas?.length} records`);
    console.log('Sample persona:', personas?.[0]?.name);
  }

  // Check case studies
  const { data: caseStudies, error: csError } = await supabase
    .from('case_studies')
    .select('*');
  
  if (csError) {
    console.error('Error fetching case studies:', csError);
  } else {
    console.log(`\nCase Studies: ${caseStudies?.length} records`);
    console.log('Sample case study:', caseStudies?.[0]?.title);
  }
}

verifyMigration().catch(console.error); 