'use client';

import { motion, useReducedMotion } from 'framer-motion';
import InstallLinkButton from './InstallLinkButton';
import MagneticButton from './MagneticButton';

const storeStats = [
  { label: 'Rating', value: '4.9', sub: '2.1k reviews' },
  { label: 'Downloads', value: '50K+', sub: 'monthly' },
  { label: 'Size', value: '38 MB', sub: 'lightweight' },
  { label: 'Rated', value: '4+', sub: 'everyone' },
];

const storeBadges = ["Editors' Choice", 'Top Productivity', 'Verified Security'];

const quickWins = [
  {
    title: 'Camera Scan',
    description: 'Capture pages fast and auto-clean text.',
  },
  {
    title: 'Clause Alerts',
    description: 'Get instant risk flags as you scroll.',
  },
  {
    title: 'Team Sync',
    description: 'Share notes with counsel in seconds.',
  },
];

const qrPattern = [
  1, 1, 1, 0, 1,
  1, 0, 1, 0, 1,
  1, 1, 0, 1, 1,
  0, 1, 0, 1, 0,
  1, 1, 1, 0, 1,
];

export default function MobileAppSection() {
  const prefersReducedMotion = useReducedMotion();
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section id="mobile-app" className="relative overflow-hidden bg-bg-primary py-24">
      <div className="absolute inset-0 gradient-shift opacity-35" />
      <div className="absolute inset-0 gold-radial opacity-70" />
      <motion.div
        className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          className="order-1"
          variants={fadeUpVariants}
          custom={0}
        >
          <div className="relative rounded-3xl border border-border-gold/60 bg-bg-card/90 p-6 shadow-gold">
            <div className="absolute -right-4 -top-4 rounded-full border border-[#2d6a4f] bg-[#0f1f16] px-4 py-2 text-[0.6rem] uppercase tracking-[0.35em] text-[#6ee7b7]">
              Google Play
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border-gold/70 bg-bg-primary">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
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
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.35em] text-text-secondary">
                  SignSure Labs
                </div>
                <h2 className="font-display text-3xl text-text-primary">SignSure</h2>
                <div className="mt-1 text-xs uppercase tracking-[0.3em] text-accent-gold">
                  Contract Risk Intelligence
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {storeStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border-gold/40 bg-bg-primary/70 p-3 text-center">
                  <div className="text-xs uppercase tracking-[0.3em] text-text-secondary">
                    {stat.label}
                  </div>
                  <div className="mt-2 text-lg font-semibold text-text-primary">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[0.6rem] uppercase tracking-[0.3em] text-text-secondary">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {storeBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-[#2d6a4f] bg-[#0f1f16] px-3 py-1 text-[0.6rem] uppercase tracking-[0.3em] text-[#6ee7b7]"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <InstallLinkButton
                href="/downloads/signsure-app.apk"
                download="signsure-app.apk"
                className="rounded-full bg-[#2d6a4f] px-6 py-3 text-xs uppercase tracking-[0.35em] text-white shadow-[0_0_20px_rgba(45,106,79,0.35)]"
              >
                Install
              </InstallLinkButton>
              <MagneticButton
                href="/download"
                className="rounded-full border border-border-gold/60 bg-bg-primary/70 px-6 py-3 text-xs uppercase tracking-[0.35em] text-text-primary"
              >
                Add to Wishlist
              </MagneticButton>
            </div>

            <div className="mt-4 text-[0.6rem] uppercase tracking-[0.35em] text-text-secondary">
              Also available on iOS - Add to Home Screen
            </div>

            <div className="mt-6 rounded-2xl border border-border-gold/40 bg-bg-primary/60 p-4">
              <div className="text-xs uppercase tracking-[0.3em] text-text-secondary">
                About this app
              </div>
              <p className="mt-2 text-sm text-text-secondary">
                Scan contracts, flag risk clauses, and sync advisories with your legal team in minutes.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="order-2 space-y-8"
          variants={fadeUpVariants}
          custom={1}
        >
          <div className="text-xs uppercase tracking-[0.4em] text-accent-gold">
            [ MOBILE APP ]
          </div>
          <div className="space-y-4">
            <h2 className="font-display text-4xl text-text-primary">
              Highlighted in the store. Ready to install on day one.
            </h2>
            <p className="text-base text-text-secondary">
              A Play Store-grade experience that keeps contract intelligence in
              your pocket - scan, review, and share wherever the deal happens.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {quickWins.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-border-gold/60 bg-bg-card/70 p-4"
              >
                <div className="text-xs uppercase tracking-[0.3em] text-accent-gold">
                  {item.title}
                </div>
                <p className="mt-3 text-sm text-text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-border-gold/60 bg-bg-card/80 px-4 py-4 text-xs uppercase tracking-[0.35em] text-text-secondary">
            <div className="grid h-16 w-16 grid-cols-5 gap-1 rounded-xl border border-border-gold/40 bg-bg-primary p-2">
              {qrPattern.map((cell, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-[2px] ${
                    cell === 1 ? 'bg-accent-gold' : 'bg-bg-primary/60'
                  }`}
                />
              ))}
            </div>
            <div>
              Scan to install
              <div className="mt-2 text-[0.6rem] tracking-[0.4em] text-text-secondary">
                or email yourself a link
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
