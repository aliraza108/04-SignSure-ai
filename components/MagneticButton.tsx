'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import type {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  PropsWithChildren,
  MouseEvent,
} from 'react';
import { useRef } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
};

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

type MagneticButtonProps = PropsWithChildren<(ButtonProps | AnchorProps)> & {
  className?: string;
};

export default function MagneticButton({
  children,
  className,
  href,
  ...rest
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 12, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 150, damping: 12, mass: 0.2 });

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    const limit = 8;
    x.set(Math.max(Math.min(offsetX / 6, limit), -limit));
    y.set(Math.max(Math.min(offsetY / 6, limit), -limit));
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const motionProps = {
    ref: (node: HTMLElement | null) => {
      ref.current = node;
    },
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    style: prefersReducedMotion ? undefined : { x: springX, y: springY },
    whileHover: { scale: prefersReducedMotion ? 1 : 1.02 },
    whileTap: { scale: prefersReducedMotion ? 1 : 0.98 },
    className,
  } as const;

  if (href) {
    return (
      <motion.a href={href} {...(rest as AnchorProps)} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" {...(rest as ButtonProps)} {...motionProps}>
      {children}
    </motion.button>
  );
}

