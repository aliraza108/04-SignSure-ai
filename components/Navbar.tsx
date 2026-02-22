'use client';

import { useEffect, useState } from 'react';
import MagneticButton from './MagneticButton';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Risk Demo', href: '#demo' },
  { label: 'Pricing', href: '#pricing' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-border-gold backdrop-blur transition-colors duration-300 ${
        scrolled ? 'bg-bg-primary/90' : 'bg-bg-primary/60'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border-gold bg-bg-card">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3L19 6V12C19 16.418 15.866 20.09 12 21C8.134 20.09 5 16.418 5 12V6L12 3Z"
                stroke="#c9a84c"
                strokeWidth="1.4"
              />
              <path
                d="M9 12.5L11.2 14.7L15 10.2"
                stroke="#c9a84c"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="font-display text-xl tracking-wide">SignSure</span>
        </a>

        <div className="hidden items-center gap-6 text-sm uppercase tracking-[0.2em] text-text-secondary md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-text-primary">
              {link.label}
            </a>
          ))}
        </div>

        <MagneticButton
          href="#demo"
          className="rounded-full border border-accent-gold px-5 py-2 text-sm uppercase tracking-[0.2em] text-accent-gold transition-colors hover:bg-accent-gold hover:text-bg-primary"
        >
          Analyze a Contract
        </MagneticButton>
      </div>
    </nav>
  );
}

