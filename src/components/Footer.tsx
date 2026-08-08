import React from 'react';
import { Mail, Globe } from 'lucide-react';
import { InstagramIcon } from './MemberCardVisual';

// All three are pending — not yet provided. Intentionally not fabricating a
// plausible-looking handle/URL/address here: a wrong or made-up one would
// actively mislead a visitor trying to reach the club, which is worse than
// just rendering the icon inert until the real value arrives.
const CLUB_EMAIL: string | null = null;
const INSTAGRAM_URL: string | null = null;
const WEBSITE_URL: string | null = null;

const FOOTER_LINKS = [
  { key: 'instagram', label: 'Instagram', icon: InstagramIcon, href: INSTAGRAM_URL },
  { key: 'website', label: 'Website', icon: Globe, href: WEBSITE_URL },
  { key: 'email', label: 'Email', icon: Mail, href: CLUB_EMAIL ? `mailto:${CLUB_EMAIL}` : null },
];

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

      <div className="flex items-center justify-center gap-3 mt-5">
        {FOOTER_LINKS.map(({ key, label, icon: Icon, href }) =>
          href ? (
            <a
              key={key}
              href={href}
              target={key === 'email' ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 rounded-full bg-white border border-text-primary/10 hover:border-brand-crimson/30 hover:text-brand-crimson flex items-center justify-center text-text-muted transition-colors shadow-sm cursor-pointer"
            >
              <Icon size={14} />
            </a>
          ) : (
            <span
              key={key}
              aria-hidden="true"
              title={`${label} coming soon`}
              className="w-9 h-9 rounded-full bg-white/50 border border-text-primary/5 flex items-center justify-center text-text-muted/30"
            >
              <Icon size={14} />
            </span>
          )
        )}
      </div>
    </footer>
  );
};
