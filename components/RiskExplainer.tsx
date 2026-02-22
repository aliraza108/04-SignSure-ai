'use client';

import { motion, useReducedMotion } from 'framer-motion';

const risks = [
  {
    level: 'LOW RISK',
    color: '#4caf7d',
    description: 'Standard clause with no unusual terms. Proceed with standard review.',
  },
  {
    level: 'MEDIUM RISK',
    color: '#e09b35',
    description: 'Clause contains terms that warrant attention. Consider requesting modifications.',
  },
  {
    level: 'HIGH RISK',
    color: '#e05252',
    description: 'Clause poses significant legal or financial exposure. Legal review strongly recommended.',
  },
];

export default function RiskExplainer() {
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
    <section className="bg-bg-secondary py-24" id="risk-levels">
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
          Understanding Risk Levels
        </motion.h2>
        <motion.p
          className="mt-4 text-center text-sm uppercase tracking-[0.3em] text-text-secondary"
          variants={fadeUpVariants}
          custom={1}
        >
          A consistent scale for every clause.
        </motion.p>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {risks.map((risk, index) => (
            <motion.div
              key={risk.level}
              variants={fadeUpVariants}
              custom={index + 2}
              className="relative rounded-md border border-border-gold bg-bg-card/70 p-6"
            >
              <motion.span
                className="absolute left-0 top-0 h-full w-1"
                style={{ backgroundColor: risk.color }}
                animate={prefersReducedMotion ? undefined : { opacity: [0.4, 1, 0.4] }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
                }
              />
              <h3 className="font-display text-2xl text-text-primary">{risk.level}</h3>
              <p className="mt-3 text-sm text-text-secondary">{risk.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

