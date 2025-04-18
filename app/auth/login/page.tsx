import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from './supabase';
import { updateUserLogin, ensureUserExists } from './userService';
import { useAuthStore } from '../../store/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();

  useEffect(() => {
    // Check for message from location state
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Step 1: Authenticate with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) throw error;

      const currentUser = data.user || data.session?.user;
      if (!currentUser) {
        throw new Error("User not found. Please check your credentials.");
      }
      
      // Step 2: Handle custom user record and login tracking
      // Try to record everything but don't prevent login if it fails
      try {
        // Sync the user record first
        await ensureUserExists(
          email, 
          currentUser.user_metadata?.full_name || '', 
          currentUser.id
        );
        
        // Try to record login but don't block if it fails
        await updateUserLogin(
          currentUser.id,
          email, 
          currentUser.user_metadata?.full_name
        );
      } catch (userErr) {
        console.error('User profile error:', userErr);
        // Show warning but don't block login
        setMessage("Login successful, but there was an issue with your user profile.");
      }
      
      // Update auth store
      login(
        {
          id: currentUser.id,
          email: currentUser.email || email,
          name: currentUser.user_metadata?.full_name || ''
        },
        data.session?.access_token || ''
      );
      
      // Navigate to dashboard regardless of profile status
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'An error occurred during login.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-primary flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-gray-200/80 p-3 rounded-lg">
            <img className="h-12 w-auto" src="/logo.svg" alt="Nimbic AI" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Welcome to Nimbic AI
        </h2>
        <p className="mt-2 text-center text-sm text-gray-300">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-brand-accent hover:text-accent-400">
            Create one
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {message && (
            <div className="mb-4 p-3 bg-blue-50 text-blue-600 rounded-md text-sm">
              {message}
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Email/Password Sign In Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-secondary">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-accent focus:ring-brand-accent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-brand-secondary">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-accent focus:ring-brand-accent"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-brand-accent px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}