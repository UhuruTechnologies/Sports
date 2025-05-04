-- Create admin user
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, role)
VALUES (
  'admin@mdisells.com',
  crypt('Carsareveryfast123!@#', gen_salt('bf')),
  NOW(),
  'authenticated'
)
ON CONFLICT (email) DO NOTHING;

-- Create admin profile
INSERT INTO public.profiles (id, username, full_name, is_admin, created_at, updated_at)
SELECT 
  id,
  'admin',
  'Administrator',
  true,
  NOW(),
  NOW()
FROM auth.users
WHERE email = 'admin@mdisells.com'
ON CONFLICT (id) DO UPDATE SET is_admin = true;

-- Grant necessary permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO authenticated; 