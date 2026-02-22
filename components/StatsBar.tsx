'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { useCountUp } from '../hooks/useCountUp';

const stats = [
  { value: 6, label: 'Clause Types Analyzed', prefix: '', suffix: '' },
  { value: 10, label: 'Average Analysis Time', prefix: '< ', suffix: 's' },
  { value: 3, label: 'Risk Levels Detected', prefix: '', suffix: ' Risk' },
  { value: 100, label: 'AI-Powered', prefix: '', suffix: '%' },
];

function StatItem({
  value,
  label,
  prefix,
  suffix,
  inView,
}: {
  value: number;
  label: string;
  prefix: string;
  suffix: string;
  inView: boolean;
}) {
  const count = useCountUp(value, inView, 1200);
  return (
    <>
      <div className="font-display text-3xl text-accent-gold sm:text-4xl">
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="mt-2 text-xs uppercase tracking-[0.3em] text-text-secondary">
        {label}
      </div>
    </>
  );
}

export default function StatsBar() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });

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
    <section className="bg-bg-secondary py-14" id="stats">
      <motion.div
        ref={ref}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 text-center md:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {stats.map((stat, index) => (
          <motion.div key={stat.label} variants={fadeUpVariants} custom={index}>
            <StatItem {...stat} inView={inView} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

