// src/components/layout/header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  Bell, 
  Search, 
  Menu, 
  X,
  Moon,
  Sun,
  Globe
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, logout, language, setLanguage } = useAuthStore();

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      setIsSearchOpen(false);
      setSearchValue('');
    }
  };

  // Handle scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on pathname change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Get user initials for avatar
  const getInitials = (name: string = '') => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Handle language toggle
  const toggleLanguage = () => {
    setLanguage(language === 'ENGLISH' ? 'INDONESIAN' : 'ENGLISH');
  };

  return (
    <header className={`sticky top-0 z-40 w-full transition-all ${
      isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm' : 'bg-white dark:bg-gray-900'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              NewticaX
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/trending">Trending</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/category/technology">Technology</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/category/business">Business</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/category/sports">Sports</Link>
            </Button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Search */}
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="relative md:w-80">
                <Input
                  type="search"
                  placeholder="Search articles..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pr-8"
                  autoFocus
                />
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="absolute right-0 top-0" 
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <Button size="icon" variant="ghost" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
              </Button>
            )}

            {/* Language Toggle */}
            <Button size="icon" variant="ghost" onClick={toggleLanguage} title={`Switch to ${language === 'ENGLISH' ? 'Indonesian' : 'English'}`}>
              <Globe className="h-5 w-5" />
            </Button>

            {/* Theme Toggle */}
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* User Menu */}
            {isAuthenticated ? (
              <>
                <Button size="icon" variant="ghost" className="hidden md:flex">
                  <Bell className="h-5 w-5" />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.image || ''} alt={user?.name || ''} />
                        <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/bookmarks">Bookmarks</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/profile">Profile</Link>
                      </DropdownMenuItem>
                      {user?.role === 'ADMIN' && (
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard/admin">Admin</Link>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => logout()}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild className="hidden md:inline-flex">
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/register">Sign up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button 
              size="icon" 
              variant="ghost" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-3 space-y-1">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/trending">Trending</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/category/technology">Technology</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/category/business">Business</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/category/sports">Sports</Link>
            </Button>
            
            {!isAuthenticated && (
              <>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button variant="default" className="w-full justify-start" asChild>
                  <Link href="/register">Sign up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

// src/components/layout/bottom-nav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Bookmark, User } from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();
  
  // Hide on login and register pages
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }
  
  // Hide on dashboard pages (where sidebar is present)
  if (pathname.startsWith('/dashboard')) {
    return null;
  }
  
  return (
    <div className="block md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t shadow-lg">
      <div className="flex justify-around items-center">
        <NavItem 
          href="/" 
          icon={<Home size={20} />} 
          label="Home" 
          isActive={pathname === '/'} 
        />
        <NavItem 
          href="/search" 
          icon={<Search size={20} />} 
          label="Search" 
          isActive={pathname === '/search'} 
        />
        <NavItem 
          href="/dashboard/bookmarks" 
          icon={<Bookmark size={20} />} 
          label="Bookmarks" 
          isActive={pathname === '/dashboard/bookmarks'} 
        />
        <NavItem 
          href="/dashboard/profile" 
          icon={<User size={20} />} 
          label="Profile" 
          isActive={pathname === '/dashboard/profile'} 
        />
      </div>
    </div>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

function NavItem({ href, icon, label, isActive }: NavItemProps) {
  return (
    <Link 
      href={href} 
      className={`flex flex-col items-center justify-center py-2 w-full ${
        isActive ? 'text-blue-600' : 'text-gray-500 dark:text-gray-400'
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
}

// src/components/layout/footer.tsx
export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">NewticaX</h3>
            <p className="text-gray-400">
              Your modern news platform with personalized content and multilingual support.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="/category/politics" className="text-gray-400 hover:text-white transition-colors">Politics</a></li>
              <li><a href="/category/business" className="text-gray-400 hover:text-white transition-colors">Business</a></li>
              <li><a href="/category/technology" className="text-gray-400 hover:text-white transition-colors">Technology</a></li>
              <li><a href="/category/sports" className="text-gray-400 hover:text-white transition-colors">Sports</a></li>
              <li><a href="/category/entertainment" className="text-gray-400 hover:text-white transition-colors">Entertainment</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-2">Subscribe to Newsletter</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent w-full"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} NewticaX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// src/components/layout/dashboard-sidebar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Bookmark, 
  Settings, 
  Users, 
  FileText, 
  Globe,
  RefreshCw,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-white dark:bg-gray-800 shadow-md"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-white dark:bg-gray-800 shadow-md transform transition-transform duration-300 ease-in-out 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 lg:static lg:z-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b">
            <Link href="/" className="text-xl font-bold text-blue-600" onClick={closeSidebar}>
              NewticaX
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <div className="space-y-1">
              <NavItem
                href="/dashboard"
                icon={<LayoutDashboard size={20} />}
                label="Dashboard"
                isActive={pathname === '/dashboard'}
                onClick={closeSidebar}
              />
              <NavItem
                href="/dashboard/bookmarks"
                icon={<Bookmark size={20} />}
                label="Bookmarks"
                isActive={pathname === '/dashboard/bookmarks'}
                onClick={closeSidebar}
              />
              <NavItem
                href="/dashboard/profile"
                icon={<Settings size={20} />}
                label="Profile Settings"
                isActive={pathname === '/dashboard/profile'}
                onClick={closeSidebar}
              />
            </div>

            {/* Admin Section */}
            {isAdmin && (
              <div className="mt-6">
                <div
                  className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                  onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                >
                  <span>Admin</span>
                  {adminMenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </div>
                
                {adminMenuOpen && (
                  <div className="pl-4 mt-1 space-y-1">
                    <NavItem
                      href="/dashboard/admin"
                      icon={<LayoutDashboard size={18} />}
                      label="Admin Dashboard"
                      isActive={pathname === '/dashboard/admin'}
                      onClick={closeSidebar}
                    />
                    <NavItem
                      href="/dashboard/admin/articles"
                      icon={<FileText size={18} />}
                      label="Articles"
                      isActive={pathname === '/dashboard/admin/articles' || 
                                pathname.startsWith('/dashboard/admin/articles/')}
                      onClick={closeSidebar}
                    />
                    <NavItem
                      href="/dashboard/admin/users"
                      icon={<Users size={18} />}
                      label="Users"
                      isActive={pathname === '/dashboard/admin/users'}
                      onClick={closeSidebar}
                    />
                    <NavItem
                      href="/dashboard/admin/sync"
                      icon={<RefreshCw size={18} />}
                      label="Sync News"
                      isActive={pathname === '/dashboard/admin/sync'}
                      onClick={closeSidebar}
                    />
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* User Info */}
          <div className="p-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/logout" onClick={closeSidebar}>
                  <LogOut size={18} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

function NavItem({ href, icon, label, isActive, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
        isActive
          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

// src/components/layout/dashboard-header.tsx
'use client';

import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Moon, Sun, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

export function DashboardHeader() {
  const router = useRouter();
  const { user, logout, language, setLanguage } = useAuthStore();
  const { theme, setTheme } = useTheme();

  // Get user initials for avatar
  const getInitials = (name: string = '') => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Handle language toggle
  const toggleLanguage = () => {
    setLanguage(language === 'ENGLISH' ? 'INDONESIAN' : 'ENGLISH');
  };

  // Handle logout
  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
         // src/components/layout/dashboard-header.tsx (continued)
          <div className="lg:w-64">
            {/* This space is for the sidebar on large screens */}
            <h1 className="text-xl font-bold text-blue-600 lg:hidden">NewticaX</h1>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Button size="icon" variant="ghost">
              <Bell className="h-5 w-5" />
            </Button>

            {/* Language Toggle */}
            <Button size="icon" variant="ghost" onClick={toggleLanguage} title={`Switch to ${language === 'ENGLISH' ? 'Indonesian' : 'English'}`}>
              <Globe className="h-5 w-5" />
            </Button>

            {/* Theme Toggle */}
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.image || ''} alt={user?.name || ''} />
                    <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/')}>
                  Back to Homepage
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}