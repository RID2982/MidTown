import React, { useEffect, useRef } from 'react';
import { HeartHandshake, Scale } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import clubLogo from '../assets/1.svg';
import { SectionHeading } from './SectionHeading';

gsap.registerPlugin(ScrollTrigger, SplitText);

const ROTARACT_PRAYER = [
  [
    'O God!',
    'Our Almighty Father',
    'and Ruler of the Universe.',
    'We thank Thee',
    'for the inspiration You have given us',
    'for the Rotaract Movement',
    'based upon service to mankind.',
    'We humbly beg You',
    'to continue Thy grace',
    'to enable us',
    'to do our service,',
    'to ourselves',
    'and to our neighbours',
    'and to the honour',
    'and glory of Thy Holy Name.',
  ],
];

const FOUR_WAY_TEST = [
  'Is it the TRUTH?',
  'Is it FAIR to all concerned?',
  'Will it build GOODWILL and BETTER FRIENDSHIPS?',
  'Will it be BENEFICIAL to all concerned?',
];

// Tailwind's compiler only picks up class names it can see literally in
// source — a template literal like `from-${tint}` never resolves to real
// CSS. So each tint is its own set of fully-spelled-out class strings,
// looked up by key, rather than assembled at runtime.
const TINTS = {
  crimson: {
    badge: 'bg-gradient-to-br from-brand-crimson to-red-800',
    glow: 'bg-brand-crimson/20',
    chip: 'bg-brand-crimson/10 text-brand-crimson',
  },
  navy: {
    badge: 'bg-gradient-to-br from-brand-navy to-theme-dark',
    glow: 'bg-brand-navy/20',
    chip: 'bg-brand-navy/10 text-brand-navy',
  },
} as const;

export const RotaractValues: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 40,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="values" className="w-full max-w-[1550px] mx-auto px-6 md:px-12 py-24 relative z-10 bg-white overflow-hidden">
      {/* A plain white section can't show a glass effect — glass only reads
          as glass with something colourful blurring through it. This soft
          gradient wash plus three glow blobs behind the cards is that
          backdrop, kept subtle enough not to fight the copy. */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-secondary/70 via-white to-theme-blue/20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-brand-crimson/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[26rem] h-[26rem] bg-brand-gold/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-brand-navy/10 rounded-full blur-[100px] pointer-events-none" />

      <SectionHeading
        number="03"
        label="What Guides Us"
        titleTop="Our creed,"
        titleBottom="our"
        accent="compass"
        description="A prayer for why we serve, and a test for how we serve — the two texts every Rotaractor carries."
        titleRef={titleRef}
        className="mb-16 relative z-10"
      />

      {/* Two glass panels side by side rather than stacked full-width bars —
          reads as a matched pair of creeds instead of one long scroll, and
          keeps the Prayer's shorter lines from stranding a wall of empty
          space beside them the way a wide single-column bar did. */}
      <div ref={cardsRef} className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <div className="glass-card group relative overflow-hidden p-8 md:p-10 flex flex-col gap-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-20px_rgba(225,29,72,0.25)]">
          {/* Club's own Rotaract emblem, watermarked into the corner — the
              same asset already used in the District section, at low
              opacity so it reads as a background texture rather than
              competing with the text. */}
          <img
            src={clubLogo}
            alt=""
            aria-hidden="true"
            className="absolute -bottom-8 -right-8 w-48 h-48 object-contain opacity-[0.05] pointer-events-none select-none"
          />
          <div className={`absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl ${TINTS.crimson.glow} pointer-events-none transition-opacity duration-500 opacity-60 group-hover:opacity-100`} />

          <div className="relative z-10 flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl ${TINTS.crimson.badge} text-white flex items-center justify-center shadow-[0_16px_32px_-12px_rgba(225,29,72,0.55)] shrink-0`}>
              <HeartHandshake size={26} strokeWidth={1.75} />
            </div>
            <h3 className="font-heading font-extrabold text-xl md:text-2xl text-theme-dark">
              The Rotaract Prayer
            </h3>
          </div>

          <div className="relative z-10 flex flex-col gap-4">
            {ROTARACT_PRAYER.map((stanza, i) => (
              <p key={i} className="text-xs md:text-sm text-text-muted font-sans leading-relaxed italic">
                {stanza.map((line, j) => (
                  <React.Fragment key={j}>
                    {line}
                    {j < stanza.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            ))}
          </div>
        </div>

        <div className="glass-card group relative overflow-hidden p-8 md:p-10 flex flex-col gap-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-20px_rgba(30,41,59,0.3)]">
          <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl ${TINTS.navy.glow} pointer-events-none transition-opacity duration-500 opacity-60 group-hover:opacity-100`} />

          <div className="relative z-10 flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl ${TINTS.navy.badge} text-white flex items-center justify-center shadow-[0_16px_32px_-12px_rgba(30,41,59,0.55)] shrink-0`}>
              <Scale size={26} strokeWidth={1.75} />
            </div>
            <h3 className="font-heading font-extrabold text-xl md:text-2xl text-theme-dark">
              The Four-Way Test
            </h3>
          </div>

          <p className="relative z-10 text-xs md:text-sm text-text-muted font-sans leading-relaxed">
            Of the things we think, say, or do:
          </p>
          <ol className="relative z-10 flex flex-col gap-4">
            {FOUR_WAY_TEST.map((line, i) => (
              <li key={line} className="flex items-start gap-4">
                <span className={`shrink-0 w-8 h-8 rounded-full font-heading font-extrabold text-xs flex items-center justify-center ${TINTS.navy.chip}`}>
                  {i + 1}
                </span>
                <span className="text-sm md:text-base text-theme-dark font-heading font-bold leading-snug pt-1">
                  {line}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
