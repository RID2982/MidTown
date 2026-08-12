
import React from 'react';

/**
 * The shared section header used across the whole page: a numbered eyebrow
 * with a short rule, a bold two-line heading whose last word is an italic
 * accent, and an optional description column set opposite it.
 *
 * Numbers run in page order — Hero is 01 (it's the hero, so it carries no
 * header block of its own), District 02, RotaractValues 03, About 04,
 * Projects 05, Members 06, FAQ 07, Support 08 — so the number doubles as a
 * "where am I" cue while scrolling.
 */
export const SectionHeading: React.FC<{
  /** Two-digit section number, e.g. "02" */
  number: string;
  /** Small uppercase eyebrow label */
  label: string;
  /** First line of the heading */
  titleTop: string;
  /** Second line, before the italic accent word */
  titleBottom: string;
  /** The italic accent word that closes the heading */
  accent: string;
  /** Optional description, set opposite the heading */
  description?: string;
  /** For the SplitText reveal each section runs on its own title */
  titleRef?: React.Ref<HTMLHeadingElement>;
  /** Light-on-dark variant, for sections on a dark background */
  dark?: boolean;
  /** Wrapper overrides — mainly bottom margin, which varies by section */
  className?: string;
  /** Description paragraph class overrides */
  descriptionClassName?: string;
}> = ({
  number,
  label,
  titleTop,
  titleBottom,
  accent,
  description,
  titleRef,
  dark = false,
  className = '',
  descriptionClassName = '',
}) => (
  <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-3 relative ${className}`}>
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-3">
        <span className="text-brand-crimson font-heading font-extrabold text-xs">{number}</span>
        <span
          className={`text-xs uppercase tracking-widest font-heading font-extrabold ${
            dark ? 'text-white/50' : 'text-text-muted'
          }`}
        >
          {label}
        </span>
        <span className="w-10 h-px bg-brand-crimson" />
      </div>
      <h2
        ref={titleRef}
        className={`text-2xl md:text-3xl lg:text-4xl font-heading font-extrabold leading-[0.95] ${
          dark ? 'text-white' : 'text-theme-dark'
        }`}
      >
        {titleTop}
        <br />
        {titleBottom} <em className="italic text-brand-crimson font-normal">{accent}</em>.
      </h2>
    </div>

    {description && (
      <p
        className={`max-w-xs text-xs md:text-sm font-sans leading-relaxed md:text-right ${
          dark ? 'text-white/60' : 'text-text-muted'
        } ${descriptionClassName}`}
      >
        {description}
      </p>
    )}
  </div>
);
