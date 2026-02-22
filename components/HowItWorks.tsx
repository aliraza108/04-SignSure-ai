'use client';

import { motion, useReducedMotion } from 'framer-motion';

const steps = [
  {
    title: 'Upload Your Contract',
    description:
      'Drop in a PDF or TXT file and the system prepares it for clause-level analysis instantly.',
  },
  {
    title: 'AI Reads Every Clause',
    description:
      'Our models scan each line, identifying obligations, liabilities, and critical omissions.',
  },
  {
    title: 'Risk Analysis Generated',
    description:
      'Every clause receives a LOW, MEDIUM, or HIGH risk rating with plain English context.',
  },
  {
    title: 'Act on Insights',
    description:
      'Export negotiation-ready recommendations and share the report with your team.',
  },
];

const clauseRows = ['Payment Terms', 'Termination', 'Liability', 'Confidentiality', 'Renewal', 'Penalties'];

export default function HowItWorks() {
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
    <section className="relative bg-bg-secondary py-24" id="how-it-works">
      <div className="absolute inset-y-12 left-1/2 hidden w-px -translate-x-1/2 border-l border-dashed border-border-gold/60 lg:block" />
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
          Four Steps to Clarity
        </motion.h2>
        <motion.p
          className="mt-4 text-center text-sm uppercase tracking-[0.3em] text-text-secondary"
          variants={fadeUpVariants}
          custom={1}
        >
          The contract review flow, accelerated by intelligence.
        </motion.p>

        <div className="mt-16 space-y-16">
          {steps.map((step, index) => {
            const isEven = index % 2 === 1;
            return (
              <motion.div
                key={step.title}
                variants={fadeUpVariants}
                custom={index + 2}
                className={`grid items-center gap-10 lg:grid-cols-2 ${isEven ? 'lg:text-right' : ''}`}
              >
                <div className={`${isEven ? 'lg:order-2' : ''}`}>
                  <div className="relative">
                    <div className="absolute -top-10 left-0 font-display text-7xl text-border-gold/30">
                      {index + 1}
                    </div>
                    <h3 className="relative font-display text-2xl text-text-primary">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-sm text-text-secondary">
                      {step.description}
                    </p>
                  </div>
                </div>
                <div className={`${isEven ? 'lg:order-1' : ''}`}>
                  {index === 0 && (
                    <div className="relative overflow-hidden rounded-md border border-border-gold bg-bg-card/70 p-6">
                      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 180" preserveAspectRatio="none">
                        <rect
                          x="6"
                          y="6"
                          width="388"
                          height="168"
                          rx="12"
                          ry="12"
                          fill="none"
                          stroke="rgba(201,168,76,0.45)"
                          strokeWidth="1.2"
                          className="border-dash"
                        />
                      </svg>
                      <div className="relative flex h-32 flex-col items-center justify-center gap-3">
                        <div className="float-slow flex h-12 w-12 items-center justify-center rounded-full border border-border-gold bg-bg-secondary">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M6 4H14L18 8V20H6V4Z" stroke="#c9a84c" strokeWidth="1.4" />
                            <path d="M14 4V8H18" stroke="#c9a84c" strokeWidth="1.4" />
                            <path d="M8.5 13H15.5" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" />
                          </svg>
                        </div>
                        <p className="text-xs uppercase tracking-[0.3em] text-text-secondary">
                          Drop PDF
                        </p>
                      </div>
                    </div>
                  )}
                  {index === 1 && (
                    <div className="relative overflow-hidden rounded-md border border-border-gold bg-bg-card/70 p-6">
                      <div className="relative h-32 space-y-2">
                        {Array.from({ length: 6 }).map((_, row) => (
                          <div key={row} className="h-2 rounded-full bg-text-secondary/30" style={{ width: `${60 + row * 6}%` }} />
                        ))}
                        <div className="scan-line absolute inset-0" />
                      </div>
                      <p className="mt-4 text-xs uppercase tracking-[0.3em] text-text-secondary">
                        Scanning clauses
                      </p>
                    </div>
                  )}
                  {index === 2 && (
                    <div className="relative overflow-hidden rounded-md border border-border-gold bg-bg-card/70 p-6">
                      <div className="sweep-glow" />
                      <motion.div
                        className="space-y-3"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                          hidden: {},
                          visible: {
                            transition: prefersReducedMotion
                              ? { duration: 0 }
                              : { staggerChildren: 0.12 },
                          },
                        }}
                      >
                        {clauseRows.map((row, rowIndex) => (
                          <motion.div
                            key={row}
                            variants={{
                              hidden: { opacity: 0, y: 10 },
                              visible: { opacity: 1, y: 0 },
                            }}
                            className="flex items-center justify-between rounded-md border border-border-gold/40 px-3 py-2 text-xs uppercase tracking-[0.25em]"
                          >
                            <span>{row}</span>
                            <span
                              className={`rounded-full px-3 py-1 text-[10px] tracking-[0.3em] ${
                                rowIndex % 3 === 0
                                  ? 'border border-accent-red/50 text-accent-red'
                                  : rowIndex % 3 === 1
                                  ? 'border border-accent-amber/50 text-accent-amber'
                                  : 'border border-accent-green/50 text-accent-green'
                              }`}
                            >
                              {rowIndex % 3 === 0 ? 'HIGH' : rowIndex % 3 === 1 ? 'MEDIUM' : 'LOW'}
                            </span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  )}
                  {index === 3 && (
                    <div className="rounded-md border border-border-gold bg-bg-card/70 p-6">
                      <motion.ul
                        className="space-y-3"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                          hidden: {},
                          visible: {
                            transition: prefersReducedMotion
                              ? { duration: 0 }
                              : { staggerChildren: 0.12 },
                          },
                        }}
                      >
                        {[
                          'Shorten indemnity window to 18 months.',
                          'Cap liability at 1.5x contract value.',
                          'Add mutual termination with 30-day notice.',
                        ].map((item) => (
                          <motion.li
                            key={item}
                            variants={{
                              hidden: { opacity: 0, x: -12 },
                              visible: { opacity: 1, x: 0 },
                            }}
                            className="text-sm text-text-secondary"
                          >
                            <span className="mr-2 text-accent-gold">&bull;</span>
                            {item}
                          </motion.li>
                        ))}
                      </motion.ul>
                      <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-text-secondary">
                        Negotiation suggestions
                        <span className="typing-caret" />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

