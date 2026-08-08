import React from 'react';
import { Mail } from 'lucide-react';

// Club contact email is pending — not yet provided. Intentionally not
// fabricating a plausible-looking address here: a wrong or made-up email
// would actively mislead anyone trying to reach the club, which is worse
// than just marking it as coming soon.
const CLUB_EMAIL: string | null = null;

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-text-primary/5 py-12 px-6 text-center text-sm text-text-muted bg-bg-secondary relative z-10">
      <p className="font-sans">
        Rotaract Club of Salem Midtown &copy; 2026. All rights reserved.
      </p>
      <p className="font-sans text-xs text-text-muted/65 mt-2">
        Sponsored by the{' '}
        <a
          href="https://district2982.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-primary hover:text-brand-crimson transition-colors underline"
        >
          Rotary Club of Salem Midtown
        </a>{' '}
        • District 2982
      </p>
      <p className="font-sans text-xs text-text-muted/65 mt-3 flex items-center justify-center gap-1.5">
        <Mail size={12} className="shrink-0" />
        {CLUB_EMAIL ? (
          <a href={`mailto:${CLUB_EMAIL}`} className="text-text-primary hover:text-brand-crimson transition-colors underline">
            {CLUB_EMAIL}
          </a>
        ) : (
          <span className="italic">Club email coming soon</span>
        )}
      </p>
    </footer>
  );
};
