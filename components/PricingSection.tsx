'use client';

import { motion, useReducedMotion } from 'framer-motion';
import MagneticButton from './MagneticButton';

const tiers = [
  {
    name: 'Starter',
    price: 'Free',
    features: ['3 contracts / month', 'Basic analysis', 'Email summary'],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$29/mo',
    features: ['Unlimited contracts', 'Full analysis + export', 'Priority processing'],
    cta: 'Get Pro',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: ['Unlimited contracts', 'API access + team', 'Dedicated success'],
    cta: 'Contact Us',
    highlighted: false,
  },
];

export default function PricingSection() {
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
    <section className="bg-bg-secondary py-24" id="pricing">
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
          Pricing Built for Every Team
        </motion.h2>
        <motion.p
          className="mt-4 text-center text-sm uppercase tracking-[0.3em] text-text-secondary"
          variants={fadeUpVariants}
          custom={1}
        >
          Start free, scale with confidence.
        </motion.p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              variants={fadeUpVariants}
              custom={index + 2}
              className={`relative rounded-md border border-border-gold bg-bg-card/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold ${
                tier.highlighted ? 'scale-[1.02] border-accent-gold' : ''
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-6 rounded-full border border-accent-gold/70 bg-bg-primary px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-accent-gold">
                  Most Popular
                </div>
              )}
              <h3 className="font-display text-2xl text-text-primary">{tier.name}</h3>
              <div className="mt-4 font-display text-3xl text-accent-gold">{tier.price}</div>
              <ul className="mt-6 space-y-2 text-sm text-text-secondary">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="text-accent-gold">&bull;</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <MagneticButton
                className="mt-8 w-full rounded-full border border-border-gold px-6 py-3 text-xs uppercase tracking-[0.3em] text-text-primary"
              >
                {tier.cta}
              </MagneticButton>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

