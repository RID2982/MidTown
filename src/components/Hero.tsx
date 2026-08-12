import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import clubGroupPhoto from '../assets/club-group-photo.jpg';

gsap.registerPlugin(SplitText);

export const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Everything here runs on mount (no ScrollTrigger gate), so it always
    // fires for a real page load — no invisible-content risk the way a
    // scroll-gated reveal would have. Safe to keep the full mask/opacity
    // treatment, matching how the rest of the site treats mount-triggered
    // animations (see Hero's original note, preserved from earlier in the
    // project: this is the one place a dramatic reveal doesn't need the
    // defensive position-only treatment).
    const ctx = gsap.context(() => {
      // 1. Text Reveal Animation with SplitText
      if (titleRef.current) {
        const split = new SplitText(titleRef.current, { type: 'lines,words' });
        gsap.set(split.lines, { overflow: 'hidden' });

        gsap.from(split.words, {
          y: '100%',
          opacity: 0,
          stagger: 0.05,
          duration: 1.2,
          ease: 'power4.out',
        });
      }

      // Fade up elements
      gsap.from('.hero-fade-up', {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        delay: 0.6,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="min-h-screen bg-theme-dark text-white flex flex-col justify-between relative overflow-hidden pt-36 pb-16 px-6">
      {/* Full-bleed club photo — real members, not a stock/borrowed image.
          Source is 1600x1200 (4:3) with the ceiling/room filling its top
          third and the group standing in the lower two-thirds, so on a
          much-wider-than-4:3 viewport (min-h-screen means object-cover has
          to crop hard vertically) the anchor has to favour the BOTTOM of
          the photo — object-top here would keep the empty ceiling and cut
          the people off entirely, which is exactly backwards. This anchor
          is percentage-based, so it recalculates correctly at every
          viewport size, phone included — no separate mobile crop needed.
          Swap in a wider panoramic shot here if one becomes available for
          a tighter crop that needs less cropping to begin with. */}
      <img
        src={clubGroupPhoto}
        alt="Rotaract Club of Salem Midtown members"
        className="absolute inset-0 w-full h-full object-cover object-bottom z-0"
      />

      {/* Dark scrim over the photo so the white title/text stays readable
          at every viewport width — strongest at the very top/bottom where
          text sits, slightly lighter through the middle so the photo still
          reads as a photo rather than a flat colour. */}
      <div className="absolute inset-0 bg-gradient-to-b from-theme-dark/90 via-theme-dark/75 to-theme-dark/90 z-0" />

      {/* Brand-colour glow, kept subtle over the scrim for continuity with
          the rest of the site's palette. */}
      <div className="absolute inset-0 bg-radial-[circle_at_20%_20%] from-brand-crimson/15 via-transparent to-transparent z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-[circle_at_80%_80%] from-brand-gold/15 via-transparent to-transparent z-0 pointer-events-none" />

      <div className="w-full max-w-[1550px] mx-auto z-10 flex flex-col items-center flex-grow justify-center gap-2">
        {/* Subtitle */}
        <p className="hero-fade-up text-center font-heading text-theme-blue text-[10px] md:text-xs uppercase tracking-[0.6em] max-w-xl pl-4">
          Rotary International District 2982
        </p>

        {/* Script line, tucked tight against the subtitle above and the
            display title below per the sketch — not its own animation
            group, so it stays visually attached to the subtitle rather
            than floating in the gap. */}
        <p className="hero-fade-up text-center font-script text-white text-2xl md:text-2xl -mb-2 md:-mb-4">
          Rotaract Club of
        </p>

        {/* Display Title */}
        <h1
          ref={titleRef}
          className="text-center font-display text-[11vw] leading-[0.95] text-white uppercase tracking-tight max-w-5xl z-10"
        >
          Salem <span className="text-sweep">Midtown</span>
        </h1>

        {/* Action Buttons */}
        <div className="hero-fade-up flex flex-col sm:flex-row items-center gap-4 mt-2">
          <a
            href="#about"
            className="px-8 py-3.5 rounded-full font-heading font-extrabold text-xs uppercase tracking-wider bg-gradient-to-r from-brand-crimson to-red-800 text-white shadow-lg shadow-brand-crimson/25 hover:shadow-xl hover:shadow-brand-crimson/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            Explore Our Club
          </a>
          <a
            href="#projects"
            className="px-8 py-3.5 rounded-full font-heading font-extrabold text-xs uppercase tracking-wider border border-white/20 hover:border-white/40 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
          >
            Club Projects
          </a>
        </div>
      </div>
    </section>
  );
};
