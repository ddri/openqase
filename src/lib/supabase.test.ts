import { supabase } from './supabase'

async function testSupabaseConnection() {
  try {
    // Test the connection by checking auth configuration
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('❌ Connection test failed:', error.message)
      return false
    }
    
    console.log('✅ Successfully connected to Supabase!')
    console.log('Session:', data?.session ? 'Active' : 'None')
    return true
  } catch (err) {
    console.error('❌ Connection test failed:', err)
    return false
  }
}

// Run the test
testSupabaseConnection() 