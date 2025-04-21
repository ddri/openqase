import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local file
config({ path: resolve(process.cwd(), '.env.local') })

const ADMIN_EMAIL = 'davedri@gmail.com'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
}
if (!process.env.ADMIN_PASSWORD) {
  throw new Error('Missing env.ADMIN_PASSWORD')
}

async function setupAdmin() {
  console.log('Starting admin setup...')
  
  // Initialize Supabase client with anon key for local development
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  try {
    // First sign in
    const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD!
    })
    
    if (signInError) throw signInError
    if (!user) throw new Error('No user found after sign in')

    // Update user preferences with admin role
    const { error: updateError } = await supabase
      .from('user_preferences')
      .upsert({
        id: user.id,
        role: 'admin'
      })

    if (updateError) throw updateError

    console.log('✅ Admin setup completed successfully!')
    console.log('You can now access admin features at /admin')

  } catch (error) {
    console.error('❌ Error setting up admin:', error)
    if (error instanceof Error) {
      console.error('Error details:', error.message)
    }
    process.exit(1)
  }
}

setupAdmin() 