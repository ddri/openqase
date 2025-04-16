-- Create function to set up admin role
CREATE OR REPLACE FUNCTION setup_admin_role(admin_email text)
RETURNS void AS $$
BEGIN
  -- Insert or update user preferences with admin role
  INSERT INTO user_preferences (id, role)
  SELECT au.id, 'admin'
  FROM auth.users au
  WHERE au.email = admin_email
  ON CONFLICT (id) DO UPDATE
  SET role = 'admin';
END;
$$ LANGUAGE plpgsql; 