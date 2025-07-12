#!/usr/bin/env node

/**
 * Test script for newsletter service integration
 * Usage: node scripts/test-newsletter.js
 */

async function testNewsletterServices() {
  console.log('🔍 Testing Newsletter Service Integration...\n');

  // Check environment variables
  console.log('📋 Environment Check:');
  console.log(`  RESEND_API_KEY: ${process.env.RESEND_API_KEY ? '✅ Set' : '❌ Missing'}`);
  console.log(`  BEEHIIV_API_KEY: ${process.env.BEEHIIV_API_KEY ? '✅ Set' : '❌ Missing'}`);
  console.log(`  BEEHIIV_PUBLICATION_ID: ${process.env.BEEHIIV_PUBLICATION_ID ? '✅ Set' : '❌ Missing'}`);
  console.log('');

  // Test API endpoint
  const testEmail = `test+${Date.now()}@openqase.com`;
  console.log(`🧪 Testing API endpoint with: ${testEmail}`);

  try {
    const response = await fetch('http://localhost:3001/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testEmail,
        source: 'integration_test'
      })
    });

    const result = await response.json();
    
    console.log(`  Status: ${response.status} ${response.ok ? '✅' : '❌'}`);
    console.log(`  Response: ${JSON.stringify(result, null, 2)}`);

    if (response.ok) {
      console.log('\n🎉 Integration test successful!');
      
      if (process.env.BEEHIIV_API_KEY && process.env.BEEHIIV_PUBLICATION_ID) {
        console.log('📧 Check your Beehiiv dashboard for the new subscriber');
        console.log('📊 Check server logs for service-specific success messages');
      } else {
        console.log('⚠️  Add Beehiiv credentials to enable dual service');
      }
    } else {
      console.log('\n❌ Integration test failed');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }

  console.log('\n🔧 To add Beehiiv integration:');
  console.log('1. Get API key from Beehiiv Settings → Integrations → API');
  console.log('2. Add to .env.local:');
  console.log('   BEEHIIV_API_KEY=your_api_key');
  console.log('   BEEHIIV_PUBLICATION_ID=your_publication_id');
  console.log('3. Restart dev server: npm run dev');
  console.log('4. Run this test again');
}

// Import environment variables if running locally
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env.local' });
}

testNewsletterServices(); 