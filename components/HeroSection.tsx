'use client';

import { motion, useReducedMotion } from 'framer-motion';
import MagneticButton from './MagneticButton';

const title = 'Know Every Risk Before You Sign.';

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const words = title.split(' ');

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

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { delay: 0.12 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const badgeVariants = {
    hidden: { opacity: 0, x: 24 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { delay: 0.4 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section className="relative min-h-screen overflow-hidden" id="hero">
      <div className="absolute inset-0 grid-float" />
      <div className="absolute inset-0 gold-radial" />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-24 lg:grid-cols-2">
        <motion.div
          className="space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="text-xs uppercase tracking-[0.4em] text-accent-gold"
            variants={fadeUpVariants}
            custom={0}
          >
            [ AI CONTRACT INTELLIGENCE ]
          </motion.div>
          <h1 className="font-display text-4xl leading-tight text-text-primary sm:text-5xl lg:text-6xl xl:text-7xl">
            {words.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                className="mr-3 inline-block"
                variants={wordVariants}
                custom={index}
                initial="hidden"
                animate="visible"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p
            className="max-w-xl text-base text-text-secondary md:text-lg"
            variants={fadeUpVariants}
            custom={2}
          >
            Upload any contract. Get instant clause analysis, risk scoring, missing clause detection, and negotiation suggestions powered by AI.
          </motion.p>
          <motion.div
            className="flex flex-wrap items-center gap-4"
            variants={fadeUpVariants}
            custom={3}
          >
            <MagneticButton
              href="#demo"
              className="rounded-full bg-accent-gold px-6 py-3 text-sm uppercase tracking-[0.25em] text-bg-primary shadow-gold"
            >
              Analyze Free
            </MagneticButton>
            <MagneticButton
              href="#how-it-works"
              className="rounded-full border border-border-gold px-6 py-3 text-sm uppercase tracking-[0.25em] text-text-primary hover:border-accent-gold-bright"
            >
              See How It Works
            </MagneticButton>
          </motion.div>
          <motion.div
            className="space-y-4"
            variants={fadeUpVariants}
            custom={4}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-text-secondary">
              Trusted by legal teams at 500+ companies
            </p>
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-10 w-16 rounded-md border border-border-gold/60 bg-bg-card/50"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="absolute -inset-6 rounded-lg bg-accent-gold/10 blur-2xl" />
          <div className="relative rounded-lg border border-border-gold bg-bg-card/90 p-6 card-glow">
            <div className="space-y-3">
              {[70, 90, 75, 60, 80, 65, 88].map((width, index) => (
                <div
                  key={index}
                  className="h-2 rounded-full bg-text-secondary/30"
                  style={{ width: `${width}%` }}
                />
              ))}
            </div>
            <motion.div
              className="absolute left-6 top-10 rounded-full border border-accent-red/60 bg-[#2b0d0d] px-3 py-1 text-xs uppercase tracking-[0.3em] text-accent-red"
              variants={badgeVariants}
              custom={1}
            >
              HIGH
            </motion.div>
            <motion.div
              className="absolute right-6 top-24 rounded-full border border-accent-amber/60 bg-[#2b1e0d] px-3 py-1 text-xs uppercase tracking-[0.3em] text-accent-amber"
              variants={badgeVariants}
              custom={2}
            >
              MEDIUM
            </motion.div>
            <motion.div
              className="absolute left-8 bottom-14 rounded-full border border-accent-green/60 bg-[#0d2b1e] px-3 py-1 text-xs uppercase tracking-[0.3em] text-accent-green"
              variants={badgeVariants}
              custom={3}
            >
              LOW
            </motion.div>
            <div className="mt-10 grid gap-3">
              {['Liability', 'Termination', 'Payment Terms'].map((label) => (
                <div key={label} className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-text-secondary">
                  <span>{label}</span>
                  <span className="h-px flex-1 bg-border-gold/40 mx-3" />
                  <span className="text-text-primary">Clause</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

