import { createClient } from '@supabase/supabase-js';

// Ensure the required environment variables are present.
if (!import.meta.env.VITE_SUPABASE_URL) {
  throw new Error('Missing VITE_SUPABASE_URL environment variable');
}
if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable');
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Initializing Supabase client with:', {
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey,
});

// Create the Supabase client without the extra global headers since
// supabase-js automatically attaches the API key to each request.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Test the connection
supabase.auth.getSession().then(({ data: { session }, error }) => {
  console.log('Supabase connection test:', { session, error });
});

// Auth helper functions
export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Sign in error:', error);
    }
    return { data, error };
  } catch (err) {
    console.error('Unexpected error during sign in:', err);
    throw err;
  }
};

export const signUp = async (email: string, password: string, name?: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      console.error('Sign up error:', error);
    }
    return { data, error };
  } catch (err) {
    console.error('Unexpected error during sign up:', err);
    throw err;
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};
