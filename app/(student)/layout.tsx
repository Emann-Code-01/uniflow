'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Home, Calendar, Activity, Users, Bell } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      setUser(session.user);
    };

    checkUser();
  }, [router]);

  const navItems = [
    { label: 'Home', icon: Home, href: '/dashboard' },
    { label: 'Timetable', icon: Calendar, href: '/timetable' },
    { label: 'Pulse', icon: Activity, href: '/pulse' },
    { label: 'Buddies', icon: Users, href: '/buddies' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Nav */}
      <header className="top-nav">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="UniFlow" width={32} height={32} className="h-8" />
          <div>
            <div className="font-semibold text-lg">UniFlow</div>
            <div className="text-xs text-(--color-text-muted) -mt-1!">AAUA</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="btn-icon">
            <Bell className="w-5 h-5" />
          </button>
          <div className="avatar">
            {user?.email?.[0]?.toUpperCase() || 'S'}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 page-content pb-20!">
        {children}
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="bottom-nav md:hidden">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="bottom-nav__item"
          >
            <item.icon className="bottom-nav__icon" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}