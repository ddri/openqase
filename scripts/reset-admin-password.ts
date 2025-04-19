import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'
import { randomBytes } from 'crypto'

// Load .env.local file
config({ path: resolve(process.cwd(), '.env.local') })

const ADMIN_EMAIL = 'davedri@gmail.com'

// Check required environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing env.SUPABASE_SERVICE_ROLE_KEY')
}

// Get password from command line or generate a random one
const providedPassword = process.argv[2]
const password = providedPassword || randomBytes(12).toString('hex')

async function resetAdminPassword() {
  console.log(`Starting password reset for admin user: ${ADMIN_EMAIL}`)
  
  // Initialize Supabase admin client with service role key
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )

  try {
    // Check if user exists
    const { data: userData, error: userError } = await supabase.auth.admin.getUserByEmail(ADMIN_EMAIL)

    if (userError) {
      throw new Error(`Error checking user: ${userError.message}`)
    }

    if (!userData?.user) {
      console.log(`User ${ADMIN_EMAIL} not found. Creating new user...`)
      
      // Create user if not exists
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: password,
        email_confirm: true
      })
      
      if (createError) throw createError
      
      console.log(`✅ New admin user created: ${ADMIN_EMAIL}`)
      
      // Set admin role for new user
      const { error: roleError } = await supabase
        .from('user_preferences')
        .upsert({
          id: newUser.user.id,
          role: 'admin'
        })
        
      if (roleError) throw roleError
      
    } else {
      // Update password for existing user
      const { error: updateError } = await supabase.auth.admin.updateUserById(
        userData.user.id,
        { password: password }
      )
      
      if (updateError) throw updateError
      
      console.log(`✅ Password updated for existing user: ${ADMIN_EMAIL}`)
    }

    // Display password information
    if (providedPassword) {
      console.log(`✅ Password has been set to: ${password}`)
    } else {
      console.log(`✅ Generated new random password: ${password}`)
    }
    
    console.log('You can now log in with these credentials at /auth')

  } catch (error) {
    console.error('❌ Error resetting admin password:', error)
    if (error instanceof Error) {
      console.error('Error details:', error.message)
    }
    process.exit(1)
  }
}

resetAdminPassword()