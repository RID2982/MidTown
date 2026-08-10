import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

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
      {/* Background Radial Glow Grid */}
      <div className="absolute inset-0 bg-radial-[circle_at_20%_20%] from-brand-crimson/10 via-transparent to-transparent z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-[circle_at_80%_80%] from-brand-gold/10 via-transparent to-transparent z-0 pointer-events-none" />

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
