import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { DM_Mono, Playfair_Display } from 'next/font/google';

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
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmMono.variable}`}>
      <body className="bg-bg-primary text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}

