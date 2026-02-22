'use client';

import type { HTMLMotionProps } from 'framer-motion';
import type { MouseEvent, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import MagneticButton from './MagneticButton';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

type InstallLinkButtonProps = {
  href: string;
  className?: string;
  children: ReactNode;
} & Omit<
  HTMLMotionProps<'a'>,
  'href' | 'className' | 'children' | 'onClick' | 'ref'
>;

export default function InstallLinkButton({
  href,
  className,
  children,
  download,
  ...rest
}: InstallLinkButtonProps) {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleClick = async (event: MouseEvent<HTMLElement>) => {
    if (download) return;
    if (!installEvent) return;
    event.preventDefault();
    await installEvent.prompt();
    await installEvent.userChoice;
    setInstallEvent(null);
  };

  return (
    <MagneticButton
      href={href}
      className={className}
      onClick={handleClick}
      download={download}
      {...rest}
    >
      {children}
    </MagneticButton>
  );
}
