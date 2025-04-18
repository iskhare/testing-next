"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { ensureUserExists, updateUserLogin } from '@/lib/userService';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Step 1: Create Supabase Auth account
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;

      const currentUser = data.user || data.session?.user;
      if (!currentUser) {
        throw new Error("Signup did not return a valid user. Please try again.");
      }
      
      // Step 2: Create custom user record and track login
      try {
        // First ensure the user exists in our custom table
        await ensureUserExists(email, name, currentUser.id);
        
        // Then try to record the login (non-blocking)
        try {
          await updateUserLogin(currentUser.id, email, name);
        } catch (loginErr) {
          console.warn('Login recording failed, but continuing:', loginErr);
        }
      } catch (userErr) {
        console.error('Error creating user profile:', userErr);
        // Still allow signup but show warning
        setError("Account created, but there was an issue with your user profile. Some features may be limited.");
      }

      // Navigate to dashboard regardless
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || "An error occurred during signup.");
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
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-300">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-brand-accent hover:text-accent-400">
            Sign in
          </Link>
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
              {error}
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-brand-secondary">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-accent focus:ring-brand-accent"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-secondary">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
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
                  name="password"
                  type="password"
                  autoComplete="new-password"
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
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}