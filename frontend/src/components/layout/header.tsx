'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, Moon, Sun } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  // Set mounted to true after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Categories for navigation
  const categories = [
    { id: 'trending', label: 'Trending' },
    { id: 'hiburan', label: 'Hiburan' },
    { id: 'politik', label: 'Politik' },
    { id: 'sport', label: 'Sport' },
    { id: 'teknologi', label: 'Teknologi' },
    { id: 'pendidikan', label: 'Pendidikan' },
    { id: 'ekonomi', label: 'Ekonomi' },
    { id: 'kesehatan', label: 'Kesehatan' },
  ];

  // Check if we're on home or news page to show categories
  const showCategories = pathname === '/' || pathname.startsWith('/news');

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto">
        {/* Main header with logo and actions */}
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="text-xl font-bold text-blue-600">
            <span className="hidden sm:inline">NewticaX</span>
            <span className="sm:hidden">NX</span>
          </Link>

          <div className="flex items-center space-x-3">
            {/* Notification Icon */}
            {isAuthenticated && (
              <Button variant="ghost" size="icon" className="text-gray-600">
                <Bell size={20} />
              </Button>
            )}

            {/* Theme toggle */}
            {mounted && (
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-gray-600">
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </Button>
            )}

            {/* User Menu or Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2"
                  aria-label="User menu"
                  aria-expanded={isMenuOpen}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user?.name ? getInitials(user.name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-xl z-20">
                    <div className="px-4 py-2 text-sm text-gray-500 border-b">
                      <span className="font-medium">{user?.name}</span>
                      <div className="text-xs">{user?.email}</div>
                    </div>
                    <Link 
                      href="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button asChild variant="outline" size="sm" className="hidden sm:flex">
                  <Link href="/login">Masuk</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/register">Daftar</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Categories navigation */}
        {showCategories && (
          <div className="border-t overflow-x-auto scrollbar-hide">
            <nav className="flex space-x-2 p-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={category.id === 'trending' ? '/' : `/category/${category.id}`}
                  className={`px-3 py-1 whitespace-nowrap rounded-md text-sm font-medium ${
                    pathname === '/' && category.id === 'trending' ||
                    pathname === `/category/${category.id}`
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
