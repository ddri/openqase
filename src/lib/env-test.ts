import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local file specifically
config({ path: resolve(process.cwd(), '.env.local') })

console.log('Environment variables from .env.local:')
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) 