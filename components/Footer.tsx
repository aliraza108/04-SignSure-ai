import Link from 'next/link';

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'API', href: '#demo' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/raza-abro/' },
      { label: 'GitHub', href: 'https://github.com/aliraza108' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-bg-secondary">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
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
            <span className="font-display text-xl">SignSure</span>
          </div>
          <p className="text-sm text-text-secondary">
            AI-powered contract intelligence.
          </p>
          <div className="text-xs uppercase tracking-[0.3em] text-text-secondary">
            Contact
          </div>
          <div className="space-y-2 text-sm text-text-primary">
            <a href="mailto:razaabro.dev@gmail.com" className="block hover:text-accent-gold">
              razaabro.dev@gmail.com
            </a>
            <a
              href="https://wa.me/923453808400"
              className="block text-text-primary hover:text-accent-gold"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp: +92 345 380 8400
            </a>
          </div>
          <div className="text-xs uppercase tracking-[0.3em] text-text-secondary">
            Developer
          </div>
          <p className="text-sm text-text-primary">Ali Raza</p>
        </div>

        {footerLinks.map((section) => (
          <div key={section.title} className="space-y-3 text-sm">
            <div className="text-xs uppercase tracking-[0.3em] text-text-secondary">
              {section.title}
            </div>
            {section.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-text-primary hover:text-accent-gold"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="border-t border-border-gold/40">
        <div className="mx-auto flex flex-col items-center justify-between gap-4 px-6 py-6 text-xs uppercase tracking-[0.3em] text-text-secondary md:flex-row">
          <span>&copy; 2025 SignSure. Built with AI.</span>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/aliraza_ai"
              className="text-text-secondary hover:text-accent-gold"
              aria-label="X (Twitter)"
              target="_blank"
              rel="noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 4L20 20M4 20L20 4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </a>
            <a
              href="https://github.com/aliraza108"
              className="text-text-secondary hover:text-accent-gold"
              aria-label="GitHub"
              target="_blank"
              rel="noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 19C4.5 20.5 4.5 16.5 2.5 16M15.5 22V18.5C15.5 17.4 15.6 16.8 14.9 16.1C18 15.7 21.2 14.6 21.2 9.6C21.2 8.3 20.7 7.1 19.9 6.2C20.2 5.3 20.1 4.2 19.8 3.2C19.8 3.2 18.7 2.9 16.1 4.6C14.1 4.1 11.9 4.1 9.9 4.6C7.3 2.9 6.2 3.2 6.2 3.2C5.9 4.2 5.8 5.3 6.1 6.2C5.3 7.1 4.8 8.3 4.8 9.6C4.8 14.6 8 15.7 11.1 16.1C10.4 16.8 10.5 17.4 10.5 18.5V22"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61576883505330"
              className="text-text-secondary hover:text-accent-gold"
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14 8H16.5V5H14C11.8 5 10 6.8 10 9V11H7.5V14H10V19H13V14H15.5L16 11H13V9C13 8.4 13.4 8 14 8Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/raza-abro/"
              className="text-text-secondary hover:text-accent-gold"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 10V17"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <circle cx="7" cy="7" r="1.5" fill="currentColor" />
                <path
                  d="M11 17V10H14.5C16.4 10 17 11.4 17 13V17"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/aliraza.xyz/"
              className="text-text-secondary hover:text-accent-gold"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

