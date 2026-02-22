import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { DM_Mono, Playfair_Display } from 'next/font/google';
import PWARegister from '../components/PWARegister';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dmmono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SignSure - AI Contract Risk Intelligence',
  description:
    'AI-powered contract risk intelligence for instant clause analysis, risk scoring, missing clause detection, and negotiation suggestions.',
  manifest: '/manifest.json',
  themeColor: '#0a0a0b',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'SignSure',
  },
  icons: {
    icon: '/icons/icon-192.svg',
    shortcut: '/icons/icon-192.svg',
    apple: '/icons/icon-192.svg',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmMono.variable}`}>
      <body className="bg-bg-primary text-text-primary antialiased">
        <PWARegister />
        {children}
      </body>
    </html>
  );
}

