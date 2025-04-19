-- This SQL script verifies and sets the admin role for davedri@gmail.com
-- Run this in your Supabase SQL editor or any PostgreSQL client

-- Step 1: Find the user ID for davedri@gmail.com
SELECT id AS user_id, email
FROM auth.users
WHERE email = 'davedri@gmail.com';

-- Step 2: Check if user has admin role
SELECT up.id, up.role
FROM public.user_preferences up
JOIN auth.users u ON up.id = u.id
WHERE u.email = 'davedri@gmail.com';

-- Step 3: Set admin role if not already set
INSERT INTO public.user_preferences (id, role)
SELECT id, 'admin' FROM auth.users WHERE email = 'davedri@gmail.com'
ON CONFLICT (id)
DO UPDATE SET role = 'admin'
RETURNING id, role;

-- Step 4: Verify the user now has admin role
SELECT u.id, u.email, up.role
FROM auth.users u
JOIN public.user_preferences up ON u.id = up.id
WHERE u.email = 'davedri@gmail.com';