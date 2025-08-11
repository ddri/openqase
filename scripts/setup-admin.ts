#!/usr/bin/env tsx

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'
import * as readline from 'readline'

// Load .env.local file
config({ path: resolve(process.cwd(), '.env.local') })

interface AdminCredentials {
  email: string
  password: string
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validatePassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' }
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' }
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' }
  }
  if (!/(?=.*\d)/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' }
  }
  return { valid: true }
}

function createReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
}

function prompt(question: string): Promise<string> {
  const rl = createReadlineInterface()
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

function promptPassword(question: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = createReadlineInterface()
    const stdin = process.stdin
    
    // Hide input
    stdin.setRawMode(true)
    rl.question(question, () => {})
    
    let password = ''
    stdin.on('data', (buffer) => {
      const char = buffer.toString()
      
      switch (char) {
        case '\n':
        case '\r':
        case '\u0004': // Ctrl+D
          stdin.setRawMode(false)
          rl.close()
          console.log() // New line
          resolve(password)
          break
        case '\u0003': // Ctrl+C
          console.log('\n^C')
          process.exit(1)
          break
        default:
          password += char
          process.stdout.write('*')
          break
      }
    })
  })
}

async function getAdminCredentials(): Promise<AdminCredentials> {
  console.log('🔧 OpenQase Admin Setup')
  console.log('=======================\n')

  // Try environment variables first
  const envEmail = process.env.ADMIN_EMAIL
  const envPassword = process.env.ADMIN_PASSWORD

  let email = envEmail
  let password = envPassword

  // Prompt for email if not in environment
  if (!email) {
    while (!email || !validateEmail(email)) {
      email = await prompt('Admin email address: ')
      if (!validateEmail(email)) {
        console.log('❌ Please enter a valid email address')
        email = ''
      }
    }
  } else {
    console.log(`📧 Using admin email from environment: ${email}`)
  }

  // Prompt for password if not in environment
  if (!password) {
    console.log('\n📝 Password requirements:')
    console.log('  • At least 8 characters')
    console.log('  • At least one uppercase letter')
    console.log('  • At least one lowercase letter')
    console.log('  • At least one number\n')

    while (!password) {
      password = await promptPassword('Admin password: ')
      const validation = validatePassword(password)
      
      if (!validation.valid) {
        console.log(`❌ ${validation.message}`)
        password = ''
      }
    }
  } else {
    console.log('🔑 Using admin password from environment')
  }

  return { email, password }
}

async function checkEnvironment() {
  console.log('🔍 Checking environment configuration...')

  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY'
  ]

  const missing = requiredEnvVars.filter(varName => !process.env[varName])

  if (missing.length > 0) {
    console.log('❌ Missing required environment variables:')
    missing.forEach(varName => console.log(`   - ${varName}`))
    console.log('\nPlease ensure your .env.local file is properly configured.')
    console.log('See the installation documentation for details.')
    process.exit(1)
  }

  console.log('✅ Environment configuration looks good\n')
}

async function testDatabaseConnection(supabase: any) {
  console.log('🔌 Testing database connection...')
  
  try {
    const { error } = await supabase.from('user_preferences').select('id').limit(1)
    if (error && !error.message.includes('JWT')) {
      throw error
    }
    console.log('✅ Database connection successful\n')
  } catch (error) {
    console.log('❌ Database connection failed')
    console.log('Please ensure Supabase is running and configured correctly.')
    console.log(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    process.exit(1)
  }
}

async function checkExistingAdmin(supabase: any, email: string): Promise<boolean> {
  console.log('👤 Checking for existing admin user...')
  
  try {
    // Try to sign in to see if user exists
    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email,
      password: 'dummy-password-for-check'
    })
    
    // If we get a user back or password error, user exists
    if (user || (error && error.message.includes('Invalid login credentials'))) {
      return true
    }
    
    return false
  } catch {
    return false
  }
}

async function createAdminUser(supabase: any, credentials: AdminCredentials) {
  console.log('👤 Creating admin user account...')
  
  try {
    // First, try to sign up the user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password
    })

    if (signUpError) {
      // If user already exists, try to sign in instead
      if (signUpError.message.includes('already registered')) {
        console.log('🔄 User already exists, attempting to sign in...')
        
        const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password
        })
        
        if (signInError) {
          if (signInError.message.includes('Invalid login credentials')) {
            console.log('❌ User exists but password is incorrect.')
            console.log('Please use the correct password or update the existing user.')
            process.exit(1)
          }
          throw signInError
        }
        
        return user
      } else {
        throw signUpError
      }
    }

    console.log('✅ Admin user account created')
    return signUpData.user
  } catch (error) {
    console.log('❌ Failed to create admin user')
    throw error
  }
}

async function setAdminRole(supabase: any, userId: string) {
  console.log('🛡️ Setting admin role...')
  
  try {
    const { error } = await supabase
      .from('user_preferences')
      .upsert({
        id: userId,
        role: 'admin'
      })

    if (error) throw error
    
    console.log('✅ Admin role set successfully')
  } catch (error) {
    console.log('❌ Failed to set admin role')
    throw error
  }
}

async function setupAdmin() {
  try {
    // Check environment
    await checkEnvironment()

    // Initialize Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Test database connection
    await testDatabaseConnection(supabase)

    // Get admin credentials
    const credentials = await getAdminCredentials()

    // Check if admin already exists
    const adminExists = await checkExistingAdmin(supabase, credentials.email)
    
    if (adminExists) {
      const answer = await prompt('\n⚠️  Admin user may already exist. Continue anyway? (y/N): ')
      if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
        console.log('Setup cancelled.')
        process.exit(0)
      }
    }

    // Create admin user
    const user = await createAdminUser(supabase, credentials)
    
    if (!user) {
      throw new Error('Failed to create or retrieve admin user')
    }

    // Set admin role
    await setAdminRole(supabase, user.id)

    // Success message
    console.log('\n🎉 Admin setup completed successfully!')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`📧 Admin email: ${credentials.email}`)
    console.log('🌐 Admin panel: http://localhost:3000/admin')
    console.log('📚 Next steps:')
    console.log('   1. Start your development server: npm run dev')
    console.log('   2. Visit /admin to access the admin panel')
    console.log('   3. Sign in with the credentials you just created')

  } catch (error) {
    console.log('\n💥 Admin setup failed')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━')
    
    if (error instanceof Error) {
      // Don't expose sensitive error details
      const safeMessage = error.message.includes('password') 
        ? 'Authentication error - please check your credentials'
        : error.message
      console.log(`Error: ${safeMessage}`)
    } else {
      console.log('An unexpected error occurred')
    }
    
    console.log('\nTroubleshooting:')
    console.log('• Ensure Supabase is running: supabase start')
    console.log('• Check your .env.local configuration')
    console.log('• Verify database migrations are applied')
    console.log('• See installation documentation for help')
    
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  setupAdmin()
} 