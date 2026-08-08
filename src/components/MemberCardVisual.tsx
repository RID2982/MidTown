import React from 'react';
import { User, Mail, Check, CalendarDays, Target, UserCheck } from 'lucide-react';
import type { Member } from '../data/members';

// lucide-react in this project ships no brand/logo icons (Instagram,
// Facebook, etc. are all absent), so the glyph is a small inline SVG instead,
// sized and styled to match the surrounding lucide icons (stroke-based,
// currentColor, same 14/16px scale).
export const InstagramIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// Shared visual content of the "Natasha Romanoff" style card — photo panel,
// verified name, tagline and a stat strip mirroring the reference design.
// Used by both the home page leadership duo and the full roster page.
export const CardVisual: React.FC<{ member: Member }> = ({ member }) => {
  return (
    <div className="w-full h-full rounded-[2.5rem] bg-slate-900 border border-white/5 shadow-2xl relative overflow-hidden group">
      {/* Photo / illustration slot */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-slate-800 to-slate-950 flex flex-col items-center justify-center p-6 text-center select-none pb-48 transition-transform duration-500 group-hover:scale-105">
        <div className="w-24 h-24 rounded-full border border-dashed border-white/20 flex items-center justify-center text-white/50 mb-3 bg-white/5 shadow-inner transition-transform duration-500 group-hover:scale-90">
          <User size={36} className="opacity-40" />
        </div>
        <div className="text-[10px] text-white/30 font-sans tracking-wide uppercase font-semibold">
          {member.photoSlot}
        </div>
        
        {/* Crowdix Hover Floating Text Animation */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-theme-blue/15 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
          <span className="text-[8px] uppercase tracking-[0.2em] font-heading font-extrabold text-theme-blue">
            Midtown Leader
          </span>
        </div>
      </div>

      {/* Bottom overlay panel — frosted glass over the photo, matching the
          .glass-card treatment used elsewhere on the site (District stats,
          FAQ, Support form), adapted for a dark background: backdrop-blur
          lets the photo show through softened, with a gradient tint for
          text contrast rather than a flat opaque panel. */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-slate-950/80 via-slate-950/55 to-transparent backdrop-blur-xl border-t border-white/10 text-white flex flex-col gap-2.5 pt-28 z-10">
        <div className="flex items-center gap-1.5">
          <h4 className="text-lg font-heading font-extrabold tracking-wide truncate">
            {member.name}
          </h4>
          <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white shrink-0">
            <Check size={10} strokeWidth={4} />
          </div>
        </div>

        <div className="text-[10px] font-heading font-extrabold text-brand-gold uppercase tracking-wider -mt-1">
          {member.role}
        </div>

        <p className="text-xs text-white/60 font-sans leading-relaxed line-clamp-2 min-h-[32px]">
          {member.quote}
        </p>

        {/* Stat strip — mirrors the reference card's rating / earned / rate row */}
        <div className="flex items-center justify-between border-y border-white/10 py-3 my-1">
          <div className="flex-1 flex flex-col items-center gap-1 border-r border-white/10">
            <div className="flex items-center gap-1 text-white text-xs font-heading font-bold">
              <CalendarDays size={11} className="text-brand-gold" />
              <span>{member.term}</span>
            </div>
            <span className="text-[9px] text-white/40 uppercase tracking-wider font-sans">Term</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1 border-r border-white/10">
            <div className="flex items-center gap-1 text-white text-xs font-heading font-bold">
              <Target size={11} className="text-brand-gold" />
              <span>{member.projects}</span>
            </div>
            <span className="text-[9px] text-white/40 uppercase tracking-wider font-sans">Projects</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="flex items-center gap-1 text-white text-xs font-heading font-bold">
              <UserCheck size={11} className="text-brand-gold" />
              <span>{member.since}</span>
            </div>
            <span className="text-[9px] text-white/40 uppercase tracking-wider font-sans">Since</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Only wired up as a real mailto link once this member has an
              email on file — everyone else keeps the same look, inert. */}
          {member.email ? (
            <a
              href={`mailto:${member.email}`}
              className="flex-1 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-heading font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md cursor-pointer"
            >
              <Mail size={12} />
              <span>Get In Touch</span>
            </a>
          ) : (
            <button className="flex-1 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-heading font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md cursor-pointer">
              <Mail size={12} />
              <span>Get In Touch</span>
            </button>
          )}

          {/* Same treatment for Instagram — live link once a URL is on file. */}
          {member.instagram ? (
            <a
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on Instagram`}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0"
            >
              <InstagramIcon size={14} />
            </a>
          ) : (
            <span
              aria-hidden="true"
              className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/30 shrink-0"
            >
              <InstagramIcon size={14} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
