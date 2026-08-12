import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import clubGroupPhoto from '../assets/club-group-photo.jpg';
import { SectionHeading } from './SectionHeading';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const ClubAbout: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
    const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Scroll Trigger. No opacity, and a small px offset rather than
      // a full-height mask: whileInView/ScrollTrigger only fires on a real
      // scroll event, so a one-shot full-page capture (or the GSAP bundle
      // failing to load) would otherwise leave this permanently invisible —
      // see the same note in the other section components.
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

      // Left Column elements stagger
      if (leftColRef.current) {
        gsap.from(leftColRef.current.children, {
          scrollTrigger: {
            trigger: leftColRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 40,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      // Right Column Photo Slot Reveal
      if (rightColRef.current) {
        gsap.from(rightColRef.current, {
          scrollTrigger: {
            trigger: rightColRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          scale: 0.95,
          y: 45,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      // Body-copy blur reveal: each word sharpens into focus and settles
      // upward as it scrolls into view, instead of the block just sliding
      // up as one piece (which the leftColRef stagger above still also
      // does — the two compose fine since one targets the paragraph as a
      // whole and this targets the individual words inside it). This is
      // our own build of a blur-wipe text reveal, not copied code.
      paragraphRefs.current.forEach((p) => {
        if (!p) return;
        const split = new SplitText(p, { type: 'words' });
        gsap.from(split.words, {
          scrollTrigger: {
            trigger: p,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 10,
          filter: 'blur(6px)',
          stagger: 0.02,
          duration: 0.6,
          ease: 'power2.out',
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="w-full max-w-[1550px] mx-auto px-6 md:px-12 py-24 relative z-10 bg-white">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-brand-crimson/5 rounded-full blur-3xl pointer-events-none" />

      <SectionHeading
        number="04"
        label="Rotaract Salem Midtown History"
        titleTop="About our"
        titleBottom="Midtown"
        accent="club"
        description="Chartered to mobilize Salem's youth — students, young professionals and entrepreneurs growing as leaders together."
        titleRef={titleRef}
        className="mb-16"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Column: About text and structured features */}
        <div ref={leftColRef} className="lg:col-span-7 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-brand-crimson text-xs uppercase font-heading font-extrabold tracking-widest">
              Sponsored by Rotary Club of Salem Midtown
            </span>
            <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-theme-dark leading-tight">
              Dream to Deserve
            </h3>
            <span className="text-text-muted text-xs font-sans">
              Club ID 8826803 &middot; Chartered November 5, 2024
            </span>
          </div>

          <p
            ref={(el) => {
              paragraphRefs.current[0] = el;
            }}
            className="text-text-muted font-sans text-sm md:text-base leading-relaxed"
          >
            Chartered to mobilize Salem's youth, our club serves as a platform for college students, young working professionals, and entrepreneurs to grow as leaders, coordinate community service, and build international ties.
          </p>

          <p
            ref={(el) => {
              paragraphRefs.current[1] = el;
            }}
            className="text-text-muted font-sans text-sm md:text-base leading-relaxed"
          >
            Through targeted social development efforts (blood donation drives, environment initiatives, computer literacy campaigns, and public speaking modules), we aim to translate club fellowship into life-changing service.
          </p>

          {/* Structured list cards (Avenues of Service) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
            <div className="rounded-2xl border border-black/5 bg-theme-blue/20 p-6 hover-beige-gradient transition-all duration-300">
              <h4 className="text-sm font-heading font-extrabold uppercase tracking-wider text-brand-crimson mb-2">Club Service & Fellowship</h4>
              <p className="text-xs text-text-muted font-sans leading-relaxed">
                Fostering strong interpersonal relationships and networking ties among Salem's young leaders.
              </p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-theme-blue/20 p-6 hover-beige-gradient transition-all duration-300">
              <h4 className="text-sm font-heading font-extrabold uppercase tracking-wider text-brand-navy mb-2">Community Development</h4>
              <p className="text-xs text-text-muted font-sans leading-relaxed">
                Implementing local welfare projects, blood donation camps, and literacy campaigns.
              </p>
            </div>
          </div>

          {/* Badges for other avenues */}
          <div className="flex flex-wrap gap-3 mt-2">
            <span className="px-4 py-2 rounded-full border border-black/5 bg-bg-secondary font-heading font-extrabold text-[10px] uppercase tracking-wider text-text-primary">
              Professional Growth
            </span>
            <span className="px-4 py-2 rounded-full border border-black/5 bg-bg-secondary font-heading font-extrabold text-[10px] uppercase tracking-wider text-text-primary">
              International Service
            </span>
            <span className="px-4 py-2 rounded-full border border-black/5 bg-bg-secondary font-heading font-extrabold text-[10px] uppercase tracking-wider text-text-primary">
              Public Image
            </span>
          </div>
        </div>

        {/* Right Column: Club Group Photo */}
        <div className="lg:col-span-5 w-full">
          <div
            ref={rightColRef}
            className="w-full aspect-[4/3] rounded-[2.5rem] border border-black/10 overflow-hidden shadow-[0_20px_45px_-15px_rgba(225,29,72,0.45)] hover:shadow-[0_25px_55px_-15px_rgba(225,29,72,0.6)] transition-all duration-500 hover:scale-[1.01]"
          >
            <img
              src={clubGroupPhoto}
              alt="Rotaract Club of Salem Midtown members and guests at a club installation event"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
