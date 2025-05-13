'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Bookmark, User } from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();
  
  // Hide on login, register pages
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }
  
  return (
    <div className="block lg:hidden fixed bottom-0 left-0 right-0 z-20 bg-white border-t shadow-lg">
      <div className="flex justify-around items-center">
        <NavItem 
          href="/" 
          icon={<Home size={20} />} 
          label="Beranda" 
          isActive={pathname === '/'} 
        />
        <NavItem 
          href="/search" 
          icon={<Search size={20} />} 
          label="Cari" 
          isActive={pathname === '/search'} 
        />
        <NavItem 
          href="/saved" 
          icon={<Bookmark size={20} />} 
          label="Simpan" 
          isActive={pathname === '/saved'} 
        />
        <NavItem 
          href="/profile" 
          icon={<User size={20} />} 
          label="Profil" 
          isActive={pathname === '/profile'} 
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
        isActive ? 'text-blue-600' : 'text-gray-500'
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
}
