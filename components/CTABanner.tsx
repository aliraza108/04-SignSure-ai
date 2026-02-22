'use client';

import { motion, useReducedMotion } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function CTABanner() {
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
    <section className="gradient-shift py-20" id="cta">
      <motion.div
        className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          className="font-display text-4xl text-text-primary"
          variants={fadeUpVariants}
          custom={0}
        >
          Don't sign another contract blind.
        </motion.h2>
        <motion.p
          className="text-sm uppercase tracking-[0.3em] text-text-secondary"
          variants={fadeUpVariants}
          custom={1}
        >
          Upload your first contract free. No account required.
        </motion.p>
        <motion.div variants={fadeUpVariants} custom={2}>
          <MagneticButton
            href="#demo"
            className="rounded-full bg-accent-gold px-8 py-4 text-sm uppercase tracking-[0.35em] text-bg-primary shadow-gold"
          >
            Analyze Now
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}

