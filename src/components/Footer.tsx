import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Globe } from 'lucide-react';
import { InstagramIcon } from './MemberCardVisual';

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
    <footer className="bg-theme-dark text-white border-t border-white/10 py-20 px-6 relative overflow-hidden z-10">
      {/* Decorative vertical lines */}
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-5 z-0 px-12 max-w-[1550px] mx-auto">
        <div className="w-[1px] h-full bg-white" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white" />
      </div>

      {/* Huge Outline Watermark "Midtown" in background (adapted from "Crowdix") */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center select-none pointer-events-none z-0 overflow-hidden">
        <p className="watermark-text text-outline opacity-40">
          Midtown
        </p>
      </div>

      <div className="w-full max-w-[1550px] mx-auto relative z-10 flex flex-col gap-16">
        {/* Widget Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Widget 1: About Salem Midtown */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <h4 className="font-display text-2xl uppercase tracking-wider text-theme-blue">
              Rotaract Salem Midtown
            </h4>
            <p className="text-xs text-white/50 font-sans leading-relaxed max-w-sm">
              Sponsored by the Rotary Club of Salem Midtown • District 2982. Guided by our motto "Dream to Deserve", we mobilize local youth for regional welfare.
            </p>
            {CLUB_EMAIL && (
              <a href={`mailto:${CLUB_EMAIL}`} className="text-xs text-brand-crimson hover:underline font-sans mt-2">
                {CLUB_EMAIL}
              </a>
            )}
          </div>

          {/* Widget 2: Quick Links */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h5 className="font-heading font-extrabold text-xs uppercase tracking-widest text-theme-blue/70">
              Quick Links
            </h5>
            <div className="flex flex-col gap-2.5">
              <Link to="/#home" className="text-xs text-white/60 hover:text-white transition-colors font-sans">Home</Link>
              <Link to="/#district" className="text-xs text-white/60 hover:text-white transition-colors font-sans">RID 2982</Link>
              <Link to="/#about" className="text-xs text-white/60 hover:text-white transition-colors font-sans">Our Club</Link>
              <Link to="/#projects" className="text-xs text-white/60 hover:text-white transition-colors font-sans">Projects</Link>
              <Link to="/#team" className="text-xs text-white/60 hover:text-white transition-colors font-sans">Members</Link>
            </div>
          </div>

          {/* Widget 3: Social Newsletter Widget */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h5 className="font-heading font-extrabold text-xs uppercase tracking-widest text-theme-blue/70">
              Connect With Us
            </h5>
            <p className="text-xs text-white/50 font-sans leading-relaxed">
              Reach out to our club directors or follow us on our channels to get involved in our next project.
            </p>
            
            <div className="flex items-center gap-3 mt-2">
              {FOOTER_LINKS.map(({ key, label, icon: Icon, href }) =>
                href ? (
                  <a
                    key={key}
                    href={href}
                    target={key === 'email' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-brand-crimson/50 hover:text-brand-crimson flex items-center justify-center text-white/60 transition-colors shadow-sm cursor-pointer"
                  >
                    <Icon size={14} />
                  </a>
                ) : (
                  <span
                    key={key}
                    aria-hidden="true"
                    title={`${label} coming soon`}
                    className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/20"
                  >
                    <Icon size={14} />
                  </span>
                )
              )}
            </div>
          </div>

        </div>

        {/* Bottom copyright strip */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-white/40 font-sans tracking-wide uppercase">
          <p>© Copyright 2026 Rotaract Club of Salem Midtown. All rights reserved.</p>
          <p>
            District 2982 • Sponsored by{' '}
            <a
              href="https://district2982.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-theme-blue hover:text-brand-crimson transition-colors underline"
            >
              Rotary Club of Salem Midtown
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
