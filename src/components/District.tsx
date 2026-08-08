import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import clubLogo from '../assets/1.svg';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const District: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // No opacity, and a small px offset rather than a full-height mask —
      // see the note in ClubAbout.tsx: ScrollTrigger only fires on a real
      // scroll event, so a static capture (or GSAP failing to load) would
      // otherwise leave this permanently invisible.
      if (titleRef.current) {
        const split = new SplitText(titleRef.current, { type: 'lines,words' });

        gsap.from(split.words, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 24,
          stagger: 0.03,
          duration: 1,
          ease: 'power3.out',
        });
      }

      // Left Column Fade in
      if (leftColRef.current) {
        gsap.from(leftColRef.current.children, {
          scrollTrigger: {
            trigger: leftColRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 40,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      // Right Column scale & lift
      if (rightColRef.current) {
        gsap.from(rightColRef.current, {
          scrollTrigger: {
            trigger: rightColRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          scale: 0.95,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="district" className="w-full max-w-[1550px] mx-auto px-6 md:px-12 py-24 relative z-10 bg-white">
      {/* Background soft glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-theme-blue/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header Block matching Crowdix overview subtitle/title layout */}
      <div className="flex flex-col items-center text-center mb-20 max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-theme-dark" />
          <span className="text-theme-dark text-[10px] md:text-xs uppercase tracking-widest font-heading font-extrabold">
            Rotary District Hierarchy
          </span>
        </div>
        <h2 
          ref={titleRef} 
          className="text-4xl md:text-6xl font-display uppercase tracking-tight text-theme-dark"
        >
          Rotary District <span className="text-sweep">2982</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Column: District info & feature cards */}
        <div ref={leftColRef} className="lg:col-span-7 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <span className="text-brand-crimson text-xs uppercase font-heading font-extrabold tracking-widest">
              Service Above Self
            </span>
            <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-theme-dark leading-tight">
              Empowering regional clubs to create sustainable local change.
            </h3>
          </div>
          
          <p className="text-text-muted font-sans text-sm md:text-base leading-relaxed">
            Rotary District 2982 is a network of Rotary and Rotaract clubs spanning Salem, Namakkal, Dharmapuri, and Krishnagiri in Tamil Nadu. Think of it as the regional umbrella that connects clubs like ours to a much larger family — one that shares resources, coordinates large-scale service projects, and helps young leaders like our members grow through structured training and mentorship.
          </p>

          {/* Mini Accent Feature Cards styled like overview blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
            <div className="rounded-2xl border border-black/5 bg-bg-secondary p-6 hover-beige-gradient transition-all duration-300">
              <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-brand-gold block mb-2">Leadership</span>
              <p className="text-xs text-text-muted font-sans leading-relaxed">
                Structured leadership summits, district assemblies, and officer training modules to empower young professionals.
              </p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-bg-secondary p-6 hover-beige-gradient transition-all duration-300">
              <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-brand-crimson block mb-2">Impact</span>
              <p className="text-xs text-text-muted font-sans leading-relaxed">
                Coordinating massive blood drives, environmental campaigns, and health screening services across the state.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Rotaract emblem card */}
        <div className="lg:col-span-5 w-full">
          <div
            ref={rightColRef}
            className="w-full rounded-[2.5rem] bg-gradient-to-br from-theme-blue/30 via-white to-white border border-theme-blue/40 shadow-xl flex flex-col items-center justify-center text-center p-12 gap-6"
          >
            <img src={clubLogo} alt="Rotaract Club of Salem Midtown Logo" className="w-full max-w-[320px] h-auto object-contain hover:scale-105 transition-transform duration-500" />
            <span className="text-xs text-text-muted font-sans leading-relaxed max-w-xs block border-t border-black/5 pt-6">
              Part of Rotary International District 2982 — service above self, together.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
