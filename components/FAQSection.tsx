'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

const faqs = [
  {
    question: 'What file formats are supported?',
    answer: 'PDF and TXT files up to 10MB are supported for instant analysis.',
  },
  {
    question: 'How accurate is the AI risk analysis?',
    answer: 'SignSure highlights clause-level risks with supporting rationale so legal teams can validate quickly.',
  },
  {
    question: 'Is my contract data kept private?',
    answer: 'Files are processed securely for analysis and are not used to train public models.',
  },
  {
    question: 'What types of contracts work best?',
    answer: 'Vendor, employment, SaaS, partnership, and procurement agreements are ideal use cases.',
  },
  {
    question: 'How long does analysis take?',
    answer: 'Most contracts are analyzed in under 10 seconds depending on length and complexity.',
  },
  {
    question: 'Can I use the API directly?',
    answer: 'Yes. Enterprise plans include API access for automated contract workflows.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="rounded-md border border-border-gold bg-bg-card/70">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-sm uppercase tracking-[0.3em] text-text-primary">
          {question}
        </span>
        <span
          className={`ml-4 text-accent-gold transition-transform ${open ? 'rotate-180' : ''}`}
        >
          ?
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
            className="overflow-hidden px-5 pb-4 text-sm text-text-secondary"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
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
    <section className="bg-bg-primary py-24" id="faq">
      <motion.div
        className="mx-auto max-w-4xl px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-center font-display text-4xl text-text-primary"
          variants={fadeUpVariants}
          custom={0}
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          className="mt-4 text-center text-sm uppercase tracking-[0.3em] text-text-secondary"
          variants={fadeUpVariants}
          custom={1}
        >
          Clear answers to critical details.
        </motion.p>
        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => (
            <motion.div key={faq.question} variants={fadeUpVariants} custom={index + 2}>
              <FAQItem {...faq} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

