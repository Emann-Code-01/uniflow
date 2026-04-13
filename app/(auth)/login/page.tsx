'use client';

import { useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { UserRole } from '@/types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { AuthError } from '@supabase/supabase-js';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState(''); // matric_number or staff_id or email
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const supabase = createClient();

      // For now, we'll use email/password auth (you can switch to magic link or custom later)
      // In real implementation, we'll link matric/staff_id to Supabase auth
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: identifier.includes('@') ? identifier : `${identifier.toLowerCase()}@uniflow.aaua.edu.ng`,
        password,
      });

      if (signInError) throw signInError;

      // After successful auth, we'll redirect based on role (handled in middleware later)
      // For now, simple redirect to dashboard
      if (role === 'student') {
        router.push('/dashboard');
      } else if (role === 'lecturer') {
        router.push('/lecturer/dashboard');
      } else {
        router.push('/admin/dashboard');
      }

    } catch (err: AuthError | unknown) {
      setError(err instanceof Error ? err.message : 'Invalid login credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--color-bg-page) p-6!">
      <div className="w-full max-w-md">
        {/* Logo Header */}
        <div className="text-center mb-10!">
          <div className="mx-auto! mb-4! flex justify-center">
            <Image src="/logo.svg" alt="UniFlow Logo" width={48} height={48} className="h-12" />
          </div>
          <h1 className="text-3xl font-bold text-(--color-text-primary)">Welcome to UniFlow</h1>
          <p className="text-(--color-text-secondary) mt-2!">
            AAUA Campus Timetable &amp; Real-time Pulse
          </p>
        </div>

        <div className="card p-8!">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Role Selector */}
            <div>
              <label className="form-label">I am a</label>
              <div className="grid grid-cols-3 gap-2 mt-2!">
                {(['student', 'lecturer', 'admin'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-3! text-sm font-medium rounded-xl transition-all cursor-pointer ${role === r
                      ? 'bg-(--color-primary) text-white shadow-md'
                      : 'bg-(--color-bg-surface) text-(--color-text-secondary) hover:bg-(--color-border-default)'
                      }`}
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Identifier */}
            <div className="form-group">
              <label className="form-label">
                {role === 'student' ? 'Matric Number' : role === 'lecturer' ? 'Staff ID' : 'Email or Admin ID'}
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={role === 'student' ? "e.g. 220000001" : "e.g. STAFF001 or admin@uniflow.aaua.edu.ng"}
                className="form-input"
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="form-input"
                required
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm my-3! bg-red-50 p-3! rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-block text-base py-3.5! mt-3!"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6! text-center text-sm text-(--color-text-muted)]">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-(--color-primary)] hover:underline">
              Contact Admin
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-(--color-text-muted)] mt-8!">
          Powered by UniFlow • AAUA Pilot
        </p>
      </div>
    </div>
  );
}