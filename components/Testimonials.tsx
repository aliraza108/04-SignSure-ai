'use client';

import { motion, useReducedMotion } from 'framer-motion';

const testimonials = [
  {
    quote: 'Saved our legal team 4 hours per contract review.',
    name: 'Sarah K., General Counsel',
  },
  {
    quote: 'Caught a liability clause that would have cost us $200K.',
    name: 'Marcus T., CEO',
  },
  {
    quote: 'The missing clause detection alone is worth it.',
    name: 'Priya M., Contract Manager',
  },
  {
    quote: 'Finally, AI that speaks legal fluently.',
    name: 'James R., Corporate Attorney',
  },
  {
    quote: 'We use SignSure before every vendor agreement.',
    name: 'Lisa C., COO',
  },
  {
    quote: 'The negotiation suggestions are genuinely actionable.',
    name: 'David W., Procurement Lead',
  },
];

export default function Testimonials() {
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
    <section className="bg-bg-primary py-24" id="testimonials">
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
          Trusted by Modern Legal Teams
        </motion.h2>
        <motion.p
          className="mt-4 text-center text-sm uppercase tracking-[0.3em] text-text-secondary"
          variants={fadeUpVariants}
          custom={1}
        >
          Real results from real contracts.
        </motion.p>
      </motion.div>
      <div className="mt-12 overflow-hidden">
        <div className="marquee flex w-max gap-6 px-6">
          {[...testimonials, ...testimonials].map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="w-72 shrink-0 rounded-md border border-border-gold bg-bg-card/70 px-6 py-5"
            >
              <p className="font-display text-lg italic text-text-primary">
                "{item.quote}"
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.3em] text-text-secondary">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

