import React from 'react';
import { User, Check } from 'lucide-react';
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
    <article className="w-full h-full rounded-[2.5rem] bg-slate-900 relative overflow-hidden group shadow-[0_24px_60px_-18px_rgba(0,0,0,0.75)]">
      {/* Photo / illustration slot */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-slate-800 to-slate-950 flex flex-col items-center justify-center p-6 text-center select-none pb-48 transition-transform duration-500 group-hover:scale-105">
        {member.photo ? (
          // Photos are cropped to head-and-torso before being added (see
          // the note on Member.photo), so object-top reliably keeps the
          // face in the strip above this card's frosted info panel.
          // object-center for everyone — a per-person position override
          // doesn't scale past the one photo it was tuned against. Photos
          // are cropped to a centred head-and-torso portrait before being
          // added (see the note on Member.photo), which is what actually
          // makes a single rule work for the whole roster.
          <img
            src={member.photo}
            alt={`${member.name}, ${member.role}`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              objectPosition: 'center',
              transform: `translate(${member.xOffset || 0}%, ${member.yOffset || 0}%) scale(${member.zoomScale || 1})`,
            }}
            loading="lazy"
          />
        ) : (
          <>
            <div className="w-24 h-24 rounded-full border border-dashed border-white/20 flex items-center justify-center text-white/50 mb-3 bg-white/5 shadow-inner transition-transform duration-500 group-hover:scale-90">
              <User size={36} className="opacity-40" />
            </div>
            <div className="text-[10px] text-white/30 font-sans tracking-wide uppercase font-semibold">
              {member.photoSlot}
            </div>
          </>
        )}

      </div>

      {/* Vignette — darkens the card's edges inward so the subject is
          framed by falloff rather than by a hard border line. */}
      <div
        className="absolute inset-0 pointer-events-none z-5"
        style={{
          background:
            'radial-gradient(120% 85% at 50% 38%, transparent 45%, rgba(2,6,23,0.35) 78%, rgba(2,6,23,0.7) 100%)',
        }}
      />

      {/* Readability gradient — no backdrop-filter, so it darkens for text
          contrast without smearing the photo. Weighted strongly enough to
          carry white text over a BRIGHT photo: this subject is lit against
          a white backdrop, and at larger card sizes (phones) the text
          block lands on that bright area rather than on his suit. */}
      <div className="absolute bottom-0 left-0 w-full h-[62%] bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent pointer-events-none z-5" />

      {/* Blur, masked to fade out going up: solid over the name/content
          block at the bottom, gone by the halfway mark so the face stays
          sharp. Every stop of the previous mask sat at 0%, which made the
          whole layer transparent — the blur was never actually visible. */}
      <div
        className="absolute bottom-0 left-0 w-full h-[55%] backdrop-blur-md pointer-events-none z-5"
        style={{
          WebkitMaskImage: 'linear-gradient(to top, #000 0%, #000 42%, transparent 100%)',
          maskImage: 'linear-gradient(to top, #000 0%, #000 42%, transparent 100%)',
        }}
      />

      {/* Info panel */}
      {/* No border-t: the blur/gradient falloff above already separates
          this from the photo, and a hard rule cut across it. */}
      <div className="absolute bottom-0 left-0 w-full p-5 text-white flex flex-col gap-2 z-10">
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
      </div>
    </article>
  );
};
