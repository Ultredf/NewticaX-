import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { BottomNav } from '@/components/layout/bottomnav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NewticaX - Modern News Platform',
  description: 'Your modern news platform built with Next.js, Express, and MongoDB.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {children}
        <BottomNav />
        <Toaster />
      </body>
    </html>
  );
}
