// Script to import live data from production API to local database
const { createClient } = require('@supabase/supabase-js');
const https = require('https');

// Production API base URL (update this to your actual production URL)
const PRODUCTION_URL = 'https://openqase.vercel.app'; // or whatever your production URL is

// Local Supabase configuration
const localUrl = 'http://127.0.0.1:54321';
const localServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const supabase = createClient(localUrl, localServiceKey);

async function fetchData(endpoint) {
  let allItems = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const url = `${PRODUCTION_URL}/api/${endpoint}?page=${page}&pageSize=50`;
    console.log(`Fetching from: ${url}`);
    
    const data = await new Promise((resolve, reject) => {
      https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed);
          } catch (error) {
            reject(error);
          }
        });
      }).on('error', reject);
    });

    if (data.items) {
      allItems = allItems.concat(data.items);
    }
    
    if (data.pagination) {
      totalPages = data.pagination.totalPages;
      console.log(`   Page ${page}/${totalPages} - got ${data.items?.length || 0} items`);
    }
    
    page++;
  }

  return { items: allItems, totalItems: allItems.length };
}

async function populateJunctionTables() {
  console.log('🔗 Populating junction tables from relationship arrays...\n');

  try {
    // Get all case studies with their relationship arrays
    console.log('📊 Processing case study relationships...');
    const { data: caseStudies } = await supabase
      .from('case_studies')
      .select('id, partner_companies, quantum_companies, quantum_hardware, quantum_software');

    if (!caseStudies || caseStudies.length === 0) {
      console.log('No case studies found to process.');
      return;
    }

    // Get all industries to map company names to industry IDs
    const { data: industries } = await supabase
      .from('industries')
      .select('id, name, slug');

    // Get all algorithms to map algorithm names to algorithm IDs
    const { data: algorithms } = await supabase
      .from('algorithms')
      .select('id, name, slug');

    // Create company-to-industry mapping
    const companyToIndustryMap = {
      // Aerospace
      'Boeing': 'Aerospace',
      'Airbus': 'Aerospace',
      'Lockheed Martin': 'Aerospace',
      'Rolls Royce': 'Aerospace',
      
      // Automotive
      'Daimler': 'Automotive',
      'Mercedes-Benz': 'Automotive',
      'BMW': 'Automotive',
      'Volkswagen': 'Automotive',
      'Ford': 'Automotive',
      'General Motors': 'Automotive',
      'Toyota': 'Automotive',
      
      // Energy
      'ExxonMobil': 'Energy',
      'Shell': 'Energy',
      'BP': 'Energy',
      'Chevron': 'Energy',
      'ConocoPhillips': 'Energy',
      
      // Finance
      'HSBC': 'Finance',
      'JPMorgan': 'Finance',
      'Goldman Sachs': 'Finance',
      'Morgan Stanley': 'Finance',
      'Bank of America': 'Finance',
      'Wells Fargo': 'Finance',
      
      // Healthcare/Pharmaceutical
      'Pfizer': 'Pharmaceutical',
      'Johnson & Johnson': 'Pharmaceutical',
      'Merck': 'Pharmaceutical',
      'Novartis': 'Pharmaceutical',
      'Roche': 'Pharmaceutical',
      
      // Retail
      'Pattison': 'Retail',
      'Walmart': 'Retail',
      'Amazon': 'Retail',
      
      // Telecommunications
      'Verizon': 'Telecommunications',
      'AT&T': 'Telecommunications',
      
      // Technology/AI
      'IBM': 'AI and Machine Learning',
      'Google': 'AI and Machine Learning',
      'Microsoft': 'AI and Machine Learning',
      'Amazon': 'AI and Machine Learning'
    };

    // Create quantum company-to-algorithm mapping
    const quantumCompanyToAlgorithmMap = {
      'D-Wave': 'Quantum Annealing',
      'IBM': 'Variational Quantum Eigensolver (VQE)',
      'Google': 'Quantum Approximate Optimization Algorithm (QAOA)',
      'Quantinuum': 'Quantum Chemistry Simulation',
      'IonQ': 'Quantum Machine Learning',
      'Rigetti': 'Quantum Approximate Optimization Algorithm (QAOA)',
      'Microsoft': 'Quantum Error Correction',
      'Classiq': 'Quantum Circuit Design',
      'QCWare': 'Quantum Monte Carlo'
    };

    let relationshipCount = 0;

    // Process each case study
    for (const caseStudy of caseStudies) {
      const caseStudyId = caseStudy.id;

      // Process partner companies -> map to industries
      if (caseStudy.partner_companies && caseStudy.partner_companies.length > 0) {
        for (const companyName of caseStudy.partner_companies) {
          if (typeof companyName === 'string' && companyName.trim() !== '') {
            const industryName = companyToIndustryMap[companyName.trim()];
            if (industryName) {
              const matchingIndustry = industries?.find(industry => 
                industry.name === industryName
              );

              if (matchingIndustry) {
                // Create case study -> industry relationship
                const { error } = await supabase
                  .from('case_study_industry_relations')
                  .upsert({
                    case_study_id: caseStudyId,
                    industry_id: matchingIndustry.id
                  }, { onConflict: 'case_study_id,industry_id' });

                if (!error) {
                  relationshipCount++;
                  console.log(`   ✅ Linked case study ${caseStudyId} to industry ${matchingIndustry.name} (via ${companyName})`);
                } else {
                  console.log(`   ⚠️ Failed to link ${companyName} to ${industryName}: ${error.message}`);
                }
              }
            } else {
              console.log(`   ⚠️ No industry mapping found for company: ${companyName}`);
            }
          }
        }
      }

      // Process quantum companies -> map to algorithms
      if (caseStudy.quantum_companies && caseStudy.quantum_companies.length > 0) {
        for (const companyName of caseStudy.quantum_companies) {
          if (typeof companyName === 'string' && companyName.trim() !== '') {
            const algorithmName = quantumCompanyToAlgorithmMap[companyName.trim()];
            if (algorithmName) {
              const matchingAlgorithm = algorithms?.find(algorithm => 
                algorithm.name === algorithmName
              );

              if (matchingAlgorithm) {
                // Create case study -> algorithm relationship
                const { error } = await supabase
                  .from('algorithm_case_study_relations')
                  .upsert({
                    algorithm_id: matchingAlgorithm.id,
                    case_study_id: caseStudyId
                  }, { onConflict: 'algorithm_id,case_study_id' });

                if (!error) {
                  relationshipCount++;
                  console.log(`   ✅ Linked case study ${caseStudyId} to algorithm ${matchingAlgorithm.name} (via ${companyName})`);
                } else {
                  console.log(`   ⚠️ Failed to link ${companyName} to ${algorithmName}: ${error.message}`);
                }
              }
            } else {
              console.log(`   ⚠️ No algorithm mapping found for quantum company: ${companyName}`);
            }
          }
        }
      }
    }

    console.log(`\n🔗 Created ${relationshipCount} junction table relationships`);

  } catch (error) {
    console.error('❌ Junction table population failed:', error.message);
    throw error;
  }
}

async function importData() {
  console.log('🚀 Starting live data import...\n');

  try {
    // Fetch and import personas
    console.log('📋 Importing personas...');
    const personasData = await fetchData('personas');
    if (personasData.items && personasData.items.length > 0) {
      // Remove auto-generated columns
      const cleanPersonas = personasData.items.map(item => {
        const { ts_content, ...cleanItem } = item;
        return cleanItem;
      });
      
      const { error: personasError } = await supabase
        .from('personas')
        .upsert(cleanPersonas, { onConflict: 'id' });
      
      if (personasError) throw personasError;
      console.log(`✅ Imported ${cleanPersonas.length} personas`);
    }

    // Fetch and import algorithms
    console.log('🔬 Importing algorithms...');
    const algorithmsData = await fetchData('algorithms');
    if (algorithmsData.items && algorithmsData.items.length > 0) {
      const cleanAlgorithms = algorithmsData.items.map(item => {
        const { ts_content, ...cleanItem } = item;
        return cleanItem;
      });
      
      const { error: algorithmsError } = await supabase
        .from('algorithms')
        .upsert(cleanAlgorithms, { onConflict: 'id' });
      
      if (algorithmsError) throw algorithmsError;
      console.log(`✅ Imported ${cleanAlgorithms.length} algorithms`);
    }

    // Fetch and import case studies
    console.log('📚 Importing case studies...');
    const caseStudiesData = await fetchData('case-studies');
    if (caseStudiesData.items && caseStudiesData.items.length > 0) {
      const cleanCaseStudies = caseStudiesData.items.map(item => {
        const { ts_content, ...cleanItem } = item;
        return cleanItem;
      });
      
      const { error: caseStudiesError } = await supabase
        .from('case_studies')
        .upsert(cleanCaseStudies, { onConflict: 'id' });
      
      if (caseStudiesError) throw caseStudiesError;
      console.log(`✅ Imported ${cleanCaseStudies.length} case studies`);
    }

    // Fetch and import industries
    console.log('🏭 Importing industries...');
    const industriesData = await fetchData('industries');
    if (industriesData.items && industriesData.items.length > 0) {
      const cleanIndustries = industriesData.items.map(item => {
        const { ts_content, ...cleanItem } = item;
        return cleanItem;
      });
      
      const { error: industriesError } = await supabase
        .from('industries')
        .upsert(cleanIndustries, { onConflict: 'id' });
      
      if (industriesError) throw industriesError;
      console.log(`✅ Imported ${cleanIndustries.length} industries`);
    }

    // Try to import blog posts
    console.log('📝 Importing blog posts...');
    try {
      const blogData = await fetchData('blog-posts');
      if (blogData.items && blogData.items.length > 0) {
        const cleanBlogPosts = blogData.items.map(item => {
          const { ts_content, ...cleanItem } = item;
          return cleanItem;
        });
        
        const { error: blogError } = await supabase
          .from('blog_posts')
          .upsert(cleanBlogPosts, { onConflict: 'id' });
        
        if (blogError) throw blogError;
        console.log(`✅ Imported ${cleanBlogPosts.length} blog posts`);
      }
    } catch (blogError) {
      console.log('⚠️  Blog posts endpoint not available, skipping...');
    }

    // Now populate junction tables from relationship arrays
    await populateJunctionTables();

    console.log('\n🎉 Live data import completed successfully!');
    console.log('Refresh your admin dashboard to see the imported content.');
    
  } catch (error) {
    console.error('❌ Import failed:', error.message);
    process.exit(1);
  }
}

importData(); 