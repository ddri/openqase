-- Add role field to user_preferences
ALTER TABLE user_preferences
ADD COLUMN role text DEFAULT 'user';

-- Update RLS policies for user_preferences
DROP POLICY IF EXISTS "Users can view own preferences" ON user_preferences;
DROP POLICY IF EXISTS "Users can update own preferences" ON user_preferences;

-- Create new policies
CREATE POLICY "Users can view own preferences"
    ON user_preferences FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own preferences"
    ON user_preferences FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Admins can manage all preferences"
    ON user_preferences FOR ALL
    USING (role = 'admin');

-- Set admin role for admin@admin.com
UPDATE user_preferences
SET role = 'admin'
WHERE id IN (
    SELECT id FROM auth.users WHERE email = 'admin@admin.com'
); 