-- This SQL script sets up the admin user for local development
-- Run this script against your local Supabase instance

-- First, check if the user exists
DO $$
DECLARE
    user_exists BOOLEAN;
    user_id UUID;
BEGIN
    -- Check if user exists
    SELECT EXISTS (
        SELECT 1 FROM auth.users WHERE email = 'davedri@gmail.com'
    ) INTO user_exists;

    IF user_exists THEN
        -- Get the user ID
        SELECT id INTO user_id FROM auth.users WHERE email = 'davedri@gmail.com';
        
        -- Update user preferences to set admin role
        INSERT INTO public.user_preferences (id, role)
        VALUES (user_id, 'admin')
        ON CONFLICT (id) 
        DO UPDATE SET role = 'admin';
        
        RAISE NOTICE 'Admin role set for existing user: davedri@gmail.com';
    ELSE
        RAISE NOTICE 'User davedri@gmail.com does not exist. Please create the user first.';
    END IF;
END $$;

-- Instructions for creating a user if it doesn't exist:
/*
-- Create a new user with password 'password'
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    uuid_generate_v4(),
    'authenticated',
    'authenticated',
    'davedri@gmail.com',
    crypt('password', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    now(),
    now(),
    '',
    '',
    '',
    ''
);

-- Get the user ID
DO $$
DECLARE
    user_id UUID;
BEGIN
    SELECT id INTO user_id FROM auth.users WHERE email = 'davedri@gmail.com';
    
    -- Set admin role
    INSERT INTO public.user_preferences (id, role)
    VALUES (user_id, 'admin');
    
    RAISE NOTICE 'Admin user created: davedri@gmail.com with password: password';
END $$;
*/