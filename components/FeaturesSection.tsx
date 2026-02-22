'use client';

import { motion, useReducedMotion } from 'framer-motion';

const features = [
  {
    title: 'Clause Detection',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 4H14L20 10V20H4V4Z" stroke="currentColor" strokeWidth="1.4" />
        <path d="M14 4V10H20" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7 14H16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    description:
      'Automatically identifies payment terms, termination conditions, liability limits, confidentiality, renewal terms, and penalties.',
  },
  {
    title: 'Risk Scoring',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 4L19 7V12C19 16 16 19 12 20C8 19 5 16 5 12V7L12 4Z" stroke="currentColor" strokeWidth="1.4" />
        <path d="M9 12.5L11.2 14.7L15 10.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    description:
      'Every clause rated LOW / MEDIUM / HIGH with clear reasoning. Know your exposure before signing.',
  },
  {
    title: 'Missing Clause Alerts',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 3L21 19H3L12 3Z" stroke="currentColor" strokeWidth="1.4" />
        <path d="M12 9V13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="12" cy="16.5" r="1" fill="currentColor" />
      </svg>
    ),
    description:
      "Flags legally important clauses that are absent from your contract protecting you from what isn't there.",
  },
  {
    title: 'Plain English Translation',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M5 5H14L19 10V19H5V5Z" stroke="currentColor" strokeWidth="1.4" />
        <path d="M9 13H15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M9 16H13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    description:
      'Dense legal language decoded into clear, actionable summaries any stakeholder can understand.',
  },
  {
    title: 'Negotiation Suggestions',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M7 7H17V17H7V7Z" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4 12H7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M17 12H20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M12 4V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    description:
      'Specific, actionable recommendations for improving unfavorable terms before you sign.',
  },
  {
    title: 'Overall Risk Rating',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M5 19V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M12 19V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M19 19V13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    description:
      'A single decisive risk score LOW, MEDIUM, or HIGH for fast executive decision making.',
  },
];

export default function FeaturesSection() {
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
    <section className="bg-bg-primary py-24" id="features">
      <motion.div
        className="mx-auto max-w-6xl px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-center font-display text-4xl text-text-primary"
          variants={fadeUpVariants}
          custom={0}
        >
          Complete Contract Intelligence
        </motion.h2>
        <motion.p
          className="mt-4 text-center text-sm uppercase tracking-[0.3em] text-text-secondary"
          variants={fadeUpVariants}
          custom={1}
        >
          Six dimensions of risk, analyzed instantly.
        </motion.p>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeUpVariants}
              custom={index + 2}
              className="group rounded-md border border-border-gold bg-bg-card/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-gold hover:shadow-gold"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border-gold/60 text-accent-gold transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </span>
                <h3 className="font-display text-xl text-text-primary">
                  {feature.title}
                </h3>
              </div>
              <p className="mt-4 text-sm text-text-secondary">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

