import { supabase } from './supabase';

/**
 * Comprehensive user management function
 * - Ensures synchronization between Supabase Auth and custom users table
 * - Handles the peculiar schema with both id and user_id fields
 */
export const ensureUserExists = async (email, name, authUserId) => {
  console.log('Ensuring user exists:', { email, authUserId });
  
  try {
    // STEP 1: Check if user exists by auth ID (stored in user_id field)
    const { data: userByAuthId, error: authIdError } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', authUserId)
      .maybeSingle();
      
    if (authIdError) {
      console.error('Error checking for user by auth ID:', authIdError);
    }
    
    // STEP 2: Check if user exists by email as backup
    const { data: userByEmail, error: emailError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();
      
    if (emailError) {
      console.error('Error checking for user by email:', emailError);
    }
    
    const existingUser = userByAuthId || userByEmail;
    
    if (existingUser) {
      // User exists - update to ensure consistency
      console.log('User exists - updating record:', existingUser.id);
      
      const { data, error } = await supabase
        .from('users')
        .update({
          user_id: authUserId, // Ensure auth ID is stored correctly
          email: email, // Ensure email is up to date
          full_name: name || existingUser.full_name || email.split('@')[0],
          last_login: new Date().toISOString(),
          login_count: (existingUser.login_count || 0) + 1
        })
        .eq('id', existingUser.id) // Update by primary key
        .select();
        
      if (error) {
        console.error('Error updating user:', error);
        throw error;
      }
      
      console.log('User updated successfully');
      return data?.[0] || existingUser;
    } else {
      // No user found - create new record
      console.log('Creating new user with auth ID:', authUserId);
      
      const { data, error } = await supabase
        .from('users')
        .insert([{
          // NOTE: id will be auto-generated as UUID by Supabase
          user_id: authUserId, // Store auth user ID here
          email: email,
          full_name: name || email.split('@')[0],
          login_count: 1,
          last_login: new Date().toISOString()
        }])
        .select();
        
      if (error) {
        console.error('Error creating user:', error);
        throw error;
      }
      
      console.log('User created successfully:', data?.[0]?.id);
      return data?.[0];
    }
  } catch (err) {
    console.error('Error in ensureUserExists:', err);
    throw err;
  }
};

/**
 * Get user by ID - checks both primary key and auth ID fields
 */
export const getUserById = async (userId) => {
  // First try to find by primary key
  const { data: userByPrimaryKey, error: pkError } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
    
  if (pkError) {
    console.warn('Error checking by primary key:', pkError);
  }
  
  if (userByPrimaryKey) {
    return userByPrimaryKey;
  }
  
  // If not found, try by auth user ID
  const { data: userByAuthId, error: authError } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
    
  if (authError) {
    console.warn('Error checking by auth ID:', authError);
  }
  
  return userByAuthId;
};

/**
 * Get user by email
 */
export const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .maybeSingle();
    
  if (error) {
    console.error('Error getting user by email:', error);
  }
  
  return data;
};

/**
 * Record a login event
 * Carefully handles the foreign key relationships
 */
export const updateUserLogin = async (authUserId, email, name) => {
  try {
    console.log('Recording login for auth user ID:', authUserId);
    
    // STEP 1: Ensure user exists and get their database record
    const user = await ensureUserExists(email, name, authUserId);
    
    if (!user) {
      console.error('Failed to get/create user record');
      return null;
    }
    
    console.log('Found user record with ID:', user.id);
    
    // STEP 2: Insert login record using the database ID (primary key)
    // CRITICAL: We must use the database primary key ID, not the auth user ID
    // for the foreign key constraint to work
    const { data: loginData, error: loginError } = await supabase
      .from('logins')
      .insert([{
        user_id: user.id, // Use the database ID (primary key)
        login_time: new Date().toISOString(),
        ip_address: 'unknown', // Simplified - can be enhanced later
        user_agent: navigator.userAgent || 'unknown'
      }]);
      
    if (loginError) {
      console.error('Error recording login:', loginError);
      throw new Error('Failed to record login: ' + loginError.message);
    }
    
    console.log('Login recorded successfully');
    return loginData;
  } catch (err) {
    console.error('Error in updateUserLogin:', err);
    throw err;
  }
};