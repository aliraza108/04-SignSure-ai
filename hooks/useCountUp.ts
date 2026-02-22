import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export function useCountUp(
  target: number,
  start: boolean,
  duration = 1200
): number {
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) {
      setValue(0);
      return;
    }
    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    let raf = 0;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const nextValue = Math.round(progress * target);
      setValue(nextValue);
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [duration, prefersReducedMotion, start, target]);

  return value;
}

