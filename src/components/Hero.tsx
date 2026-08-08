import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import clubLogo from '../assets/club-logo.png';
import { PROJECTS_DATA } from '../data/projects';

gsap.registerPlugin(SplitText);

// Real project titles/categories, not invented event names — pairs each
// actual project with a fixed accent gradient for visual variety in the
// carousel. Deriving from PROJECTS_DATA (rather than a hand-typed list)
// means this can never drift out of sync with the real project registry.
const CAROUSEL_GRADIENTS = [
  'from-[#e11d48] to-[#9f1239]',
  'from-brand-navy to-text-primary',
  'from-[#d97706] to-[#92400e]',
  'from-[#059669] to-[#065f46]',
  'from-[#2563eb] to-[#1e40af]',
  'from-[#7c3aed] to-[#5b21b6]',
];

const CAROUSEL_ITEMS = PROJECTS_DATA.map((project, index) => ({
  title: project.title,
  category: project.category,
  gradient: CAROUSEL_GRADIENTS[index % CAROUSEL_GRADIENTS.length],
}));

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

      {/* Decorative lines behind hero content */}
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-5 z-0 px-12 max-w-[1550px] mx-auto">
        <div className="w-[1px] h-full bg-white" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white" />
      </div>

      <div className="w-full max-w-[1550px] mx-auto z-10 flex flex-col items-center flex-grow justify-center gap-12">
        {/* Subtitle */}
        <p className="hero-fade-up text-center font-heading text-theme-blue text-[10px] md:text-xs uppercase tracking-[0.6em] max-w-xl pl-4 mb-2">
          Rotary International District 2982
        </p>

        {/* Display Title */}
        <h1 
          ref={titleRef} 
          className="text-center font-display text-[11vw] leading-[0.95] text-white uppercase tracking-tight max-w-5xl z-10"
        >
          Salem <span className="text-sweep">Midtown</span>
        </h1>

        {/* Flat auto-scrolling project strip — replaces the previous 3D
            rotating carousel with a simpler, flatter sliding row per your
            sketch. Pure CSS animation (index.css: .animate-marquee), not
            GSAP-driven, so it's guaranteed to run regardless of GSAP's own
            mount timing. Pauses on hover/focus to read a card. */}
        <div className="hero-fade-up relative w-full max-w-2xl z-10 mt-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-theme-dark to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-theme-dark to-transparent z-10" />
          <div className="overflow-hidden">
            <div
              className="flex gap-5 w-max animate-marquee"
              style={{ animationDuration: `${CAROUSEL_ITEMS.length * 5}s` }}
            >
              {[...CAROUSEL_ITEMS, ...CAROUSEL_ITEMS].map((item, index) => (
                <div
                  key={index}
                  className={`w-[190px] h-[230px] shrink-0 rounded-2xl border border-white/10 bg-gradient-to-br ${item.gradient} p-6 flex flex-col justify-between shadow-xl transition-transform duration-300 hover:scale-[1.03]`}
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-widest text-theme-blue/70 font-heading font-extrabold">
                      {item.category}
                    </span>
                    <h3 className="font-heading font-extrabold text-sm leading-tight mt-1 text-white">
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={clubLogo} alt="" className="w-5 h-5 object-contain opacity-50" />
                    <span className="text-[8px] text-white/50 tracking-wider font-sans uppercase">Midtown</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

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
