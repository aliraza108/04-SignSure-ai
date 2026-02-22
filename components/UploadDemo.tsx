'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import { analyzeContract } from '../lib/api';
import type { ClauseKey, ContractReport, RiskLevel } from '../lib/types';
import { useDragDrop } from '../hooks/useDragDrop';
import { useCountUp } from '../hooks/useCountUp';

const riskColor: Record<RiskLevel, { bg: string; text: string; border: string }> = {
  LOW: { bg: '#0d2b1e', text: '#4caf7d', border: '#4caf7d33' },
  MEDIUM: { bg: '#2b1e0d', text: '#e09b35', border: '#e09b3533' },
  HIGH: { bg: '#2b0d0d', text: '#e05252', border: '#e0525233' },
};

const clauseLabels: Record<ClauseKey, string> = {
  payment_terms: 'Payment Terms',
  termination: 'Termination',
  liability: 'Liability',
  confidentiality: 'Confidentiality',
  renewal: 'Renewal',
  penalties: 'Penalties',
};

const clauseOrder: ClauseKey[] = [
  'payment_terms',
  'termination',
  'liability',
  'confidentiality',
  'renewal',
  'penalties',
];

const overallScoreMap: Record<RiskLevel, number> = {
  LOW: 25,
  MEDIUM: 60,
  HIGH: 90,
};

function ClauseCard({
  clauseKey,
  summary,
  risk,
  explanation,
  index,
}: {
  clauseKey: ClauseKey;
  summary: string;
  risk: RiskLevel;
  explanation?: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const safeExplanation =
    explanation || 'No additional plain English explanation was provided.';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
      }
      className="rounded-md border border-border-gold bg-bg-card/80 p-4"
    >
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-[0.3em] text-text-secondary">
          {clauseLabels[clauseKey]}
        </div>
        <span
          className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.3em]"
          style={{
            backgroundColor: riskColor[risk].bg,
            color: riskColor[risk].text,
            border: `1px solid ${riskColor[risk].border}`,
          }}
        >
          {risk}
        </span>
      </div>
      <p className="mt-3 text-sm text-text-secondary">{summary}</p>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-accent-gold"
      >
        Plain English
        <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>?</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-3 text-sm text-text-primary">{safeExplanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function UploadDemo() {
  const prefersReducedMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [report, setReport] = useState<ContractReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback((files: File[]) => {
    const nextFile = files[0];
    if (!nextFile) return;
    const maxSize = 10 * 1024 * 1024;
    const isPdf = nextFile.type === 'application/pdf' || nextFile.name.endsWith('.pdf');
    const isTxt = nextFile.type === 'text/plain' || nextFile.name.endsWith('.txt');

    if (!isPdf && !isTxt) {
      setError('Unsupported format. Please upload a PDF or TXT file.');
      setFile(null);
      return;
    }
    if (nextFile.size > maxSize) {
      setError('File exceeds 10MB. Please upload a smaller contract.');
      setFile(null);
      return;
    }

    setError(null);
    setReport(null);
    setFile(nextFile);
  }, []);

  const { isDragging, bind } = useDragDrop(handleFiles);

  const handleAnalyze = async () => {
    if (!file) {
      setError('Select a contract file before analyzing.');
      return;
    }

    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeoutMs = 70000;
    const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

    try {
      const data = await analyzeContract(file, { signal: controller.signal });
      setReport(data);
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        setError(`Analysis timed out after ${Math.round(timeoutMs / 1000)} seconds. Please try again.`);
      } else {
        setError((err as Error).message || 'Analysis failed.');
      }
    } finally {
      window.clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setReport(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleBrowse = () => inputRef.current?.click();

  const exportReport = () => {
    if (!report) return;
    const payload = {
      overall_risk: report.overall_risk,
      risk_scores: report.risk_scores,
      clause_analysis: report.clause_analysis,
      missing_clauses: report.missing_clauses,
      negotiation_suggestions: report.negotiation_suggestions,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `signsure-report-${Date.now()}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const clauseEntries = useMemo(() => {
    if (!report) return [] as Array<[ClauseKey, string]>;
    return clauseOrder.map((key) => [key, report.clause_analysis[key]]);
  }, [report]);

  const scoreTarget = report ? overallScoreMap[report.overall_risk] : 0;
  const score = useCountUp(scoreTarget, Boolean(report), 900);

  return (
    <section className="bg-bg-primary py-24" id="demo">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="font-display text-4xl text-text-primary">Try It Now</h2>
          <p className="mt-4 text-sm uppercase tracking-[0.3em] text-text-secondary">
            Upload a contract and watch the intelligence unfold.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr,1.4fr]">
          <div className="rounded-md border border-border-gold bg-bg-card/70 p-6">
            <div
              {...bind}
              onClick={handleBrowse}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleBrowse();
                }
              }}
              role="button"
              tabIndex={0}
              className={`relative flex min-h-[300px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md border px-6 text-center transition-all ${
                isDragging
                  ? 'border-solid border-accent-gold bg-accent-gold/10 shadow-glow'
                  : 'border-dashed border-border-gold/70 upload-pulse'
              }`}
            >
              {!isDragging && (
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="none">
                  <rect
                    x="6"
                    y="6"
                    width="388"
                    height="288"
                    rx="18"
                    ry="18"
                    fill="none"
                    stroke="rgba(201,168,76,0.55)"
                    strokeWidth="1.2"
                    className="border-dash"
                  />
                </svg>
              )}
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-border-gold bg-bg-secondary">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 3H14L19 8V21H6V3Z"
                    stroke="#c9a84c"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M14 3V8H19"
                    stroke="#c9a84c"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M9 14L11 16L15 12"
                    stroke="#c9a84c"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="font-display text-xl">Drop your contract here</p>
                <p className="mt-2 text-sm text-text-secondary">or click to browse</p>
              </div>
              <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-text-secondary">
                <span>PDF</span>
                <span className="h-px w-6 bg-border-gold/40" />
                <span>TXT</span>
                <span className="h-px w-6 bg-border-gold/40" />
                <span>Max 10MB</span>
              </div>
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.txt"
                className="hidden"
                onChange={(event) => handleFiles(Array.from(event.target.files || []))}
              />
            </div>

            {file && (
              <div className="mt-4 flex items-center justify-between rounded-md border border-border-gold/50 bg-bg-secondary/60 px-4 py-2 text-sm">
                <span className="truncate">{file.name}</span>
                <button type="button" onClick={handleRemove} className="text-accent-gold">
                  Remove
                </button>
              </div>
            )}

            <div className="mt-6">
              <MagneticButton
                className={`w-full rounded-full px-6 py-3 text-sm uppercase tracking-[0.25em] transition-colors ${
                  loading
                    ? 'bg-accent-gold/60 text-bg-primary'
                    : 'bg-accent-gold text-bg-primary'
                } ${!file || loading ? 'cursor-not-allowed opacity-70' : ''}`}
                onClick={handleAnalyze}
                disabled={!file || loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    Analyzing
                    <span className="dots" />
                  </span>
                ) : (
                  'Analyze Contract'
                )}
              </MagneticButton>
              {loading && (
                <div className="mt-3 h-1 w-full rounded-full bg-border-gold/30 progress-bar" />
              )}
            </div>

            {error && (
              <div className="mt-4 rounded-md border border-accent-red/60 bg-[#2b0d0d] px-4 py-3 text-sm text-accent-red">
                {error}
              </div>
            )}
          </div>

          <div className="rounded-md border border-border-gold bg-bg-card/70 p-6">
            {!report && !loading && (
              <div className="space-y-6">
                <div className="shimmer h-6 w-1/2 rounded-md" />
                <div className="shimmer h-24 rounded-md" />
                <div className="shimmer h-24 rounded-md" />
                <div className="text-sm uppercase tracking-[0.3em] text-text-secondary">
                  Your analysis will appear here
                </div>
              </div>
            )}

            <AnimatePresence>
              {report && (
                <motion.div
                  key="report"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4 }}
                  className="space-y-8"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [0.5, 1.05, 1], opacity: 1 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 260, damping: 20 }
                    }
                    className="mx-auto flex w-fit flex-col items-center gap-2 rounded-full px-6 py-3 text-xs uppercase tracking-[0.4em]"
                    style={{
                      backgroundColor: riskColor[report.overall_risk].bg,
                      color: riskColor[report.overall_risk].text,
                      border: `1px solid ${riskColor[report.overall_risk].border}`,
                    }}
                  >
                    Overall Risk
                    <span className="font-display text-2xl tracking-[0.3em]">
                      {report.overall_risk}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.4em]">
                      Risk Score {score} / 100
                    </span>
                  </motion.div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    {clauseEntries.map(([key, summary], index) => (
                      <ClauseCard
                        key={key}
                        clauseKey={key}
                        summary={summary}
                        risk={report.risk_scores[key]}
                        explanation={report.explanations?.[key]}
                        index={index}
                      />
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs uppercase tracking-[0.3em] text-text-secondary">
                      Missing Clauses
                    </div>
                    {report.missing_clauses.length ? (
                      <div className="flex flex-wrap gap-2">
                        {report.missing_clauses.map((clause) => (
                          <span
                            key={clause}
                            className="rounded-full border border-accent-red/60 bg-[#2b0d0d] px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-accent-red"
                          >
                            ! {clause}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="rounded-full border border-accent-green/50 bg-[#0d2b1e] px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-accent-green">
                        No missing critical clauses
                      </span>
                    )}
                  </div>

                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: prefersReducedMotion
                          ? { duration: 0 }
                          : { staggerChildren: 0.06 },
                      },
                    }}
                  >
                    <div className="text-xs uppercase tracking-[0.3em] text-text-secondary">
                      Negotiation Suggestions
                    </div>
                    <motion.ol className="mt-3 space-y-2 text-sm text-text-secondary">
                      {report.negotiation_suggestions.map((item, index) => (
                        <motion.li
                          key={item}
                          variants={{
                            hidden: { opacity: 0, y: 10 },
                            visible: { opacity: 1, y: 0 },
                          }}
                          className="flex items-start gap-3"
                        >
                          <span className="text-accent-gold">{index + 1}.</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </motion.ol>
                  </motion.div>

                  <div className="pt-2">
                    <MagneticButton
                      className="rounded-full border border-border-gold px-6 py-3 text-xs uppercase tracking-[0.3em] text-text-primary"
                      onClick={exportReport}
                    >
                      Download Report
                    </MagneticButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

