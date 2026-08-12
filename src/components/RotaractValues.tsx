import React, { useEffect, useRef } from 'react';
import { HeartHandshake, Scale } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { SectionHeading } from './SectionHeading';

gsap.registerPlugin(ScrollTrigger, SplitText);

const ROTARACT_PRAYER = [
  [
    'Oh Lord and giver of all good,',
    'We thank Thee for our daily food.',
    'May Rotaract friends and Rotaract ways',
    'Help us to serve Thee all our days.',
  ],
  [
    'Inspire Rotaractors, Lord, we ask,',
    'To live as we profess,',
    'To dignify our daily task,',
    'And serve in selflessness.',
  ],
  [
    'For fellowship which here we share,',
    'We offer thanks to Thee.',
    'We pray that it will be our care',
    'To spread it bounteously.',
  ],
];

const FOUR_WAY_TEST = [
  'Is it the TRUTH?',
  'Is it FAIR to all concerned?',
  'Will it build GOODWILL and BETTER FRIENDSHIPS?',
  'Will it be BENEFICIAL to all concerned?',
];

// Tailwind's compiler only picks up class names it can see literally in
// source — a template literal like `bg-${tint}/10` never resolves to real
// CSS. So each tint is its own set of fully-spelled-out class strings,
// looked up by key, rather than assembled at runtime.
const TINTS = {
  crimson: {
    wash: 'bg-brand-crimson/[0.07]',
    ring1: 'border-brand-crimson/10',
    ring2: 'border-brand-crimson/15',
    core: 'bg-brand-crimson/10',
    highlight: 'bg-brand-crimson/20',
    badge: 'bg-brand-crimson',
  },
  navy: {
    wash: 'bg-brand-navy/[0.07]',
    ring1: 'border-brand-navy/10',
    ring2: 'border-brand-navy/15',
    core: 'bg-brand-navy/10',
    highlight: 'bg-brand-navy/20',
    badge: 'bg-brand-navy',
  },
} as const;

/**
 * The panel standing in for a real illustration. No illustration asset
 * exists for this section (and copying one from another club's site isn't
 * something to do — see the conversation this came from), so this is a
 * built-from-scratch decorative graphic: concentric rings plus a soft
 * radial highlight behind the icon fake a bit of depth/dimensionality
 * without needing an actual 3D render or an external image. Sized to fill
 * its column rather than sit as a small badge, so it reads as a real
 * illustration slot, not an icon with empty space around it.
 */
const IllustrationPanel: React.FC<{
  icon: React.ReactNode;
  tint: keyof typeof TINTS;
}> = ({ icon, tint }) => {
  const t = TINTS[tint];
  return (
    <div
      className={`relative w-full aspect-square md:aspect-auto md:h-full min-h-[220px] rounded-[2rem] overflow-hidden ${t.wash} flex items-center justify-center shrink-0`}
    >
      {/* Concentric rings, largest to smallest, each a bit more opaque —
          the closest thing to "depth" achievable with flat shapes. */}
      <div className={`absolute w-[85%] aspect-square rounded-full border ${t.ring1}`} />
      <div className={`absolute w-[62%] aspect-square rounded-full border ${t.ring2}`} />
      <div className={`absolute w-[40%] aspect-square rounded-full ${t.core}`} />
      {/* Off-center highlight blob, so the panel doesn't read as perfectly
          flat/symmetrical. */}
      <div className={`absolute top-[15%] left-[20%] w-24 h-24 rounded-full ${t.highlight} blur-2xl`} />

      <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-3xl ${t.badge} text-white flex items-center justify-center shadow-[0_20px_45px_-15px_rgba(0,0,0,0.35)]`}>
        {icon}
      </div>
    </div>
  );
};

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
    <section id="values" className="w-full max-w-[1550px] mx-auto px-6 md:px-12 py-24 relative z-10 bg-white">
      <div className="absolute top-10 right-10 w-96 h-96 bg-brand-crimson/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <SectionHeading
        number="03"
        label="What Guides Us"
        titleTop="Our creed,"
        titleBottom="our"
        accent="compass"
        description="A prayer for why we serve, and a test for how we serve — the two texts every Rotaractor carries."
        titleRef={titleRef}
        className="mb-16"
      />

      {/* Prayer first, Four-Way Test after — each its own full-width panel
          rather than a side-by-side grid, so they read as two separate
          things to sit with in turn, not one glanceable comparison. Both
          use the same illustration-left / content-right layout (the
          Prayer's illustration specifically pinned to the left, per the
          request this came from). */}
      <div ref={cardsRef} className="flex flex-col gap-8">
        <div className="rounded-2xl border border-black/5 bg-bg-secondary p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-stretch">
          <div className="md:col-span-5 md:order-1">
            <IllustrationPanel icon={<HeartHandshake size={40} strokeWidth={1.75} />} tint="crimson" />
          </div>
          <div className="md:col-span-7 md:order-2 flex flex-col gap-6 justify-center">
            <h3 className="font-heading font-extrabold text-xl md:text-2xl text-theme-dark">
              The Rotaract Prayer
            </h3>
            <div className="flex flex-col gap-4">
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
        </div>

        <div className="rounded-2xl border border-black/5 bg-theme-blue/20 p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-stretch">
          <div className="md:col-span-5 md:order-1">
            <IllustrationPanel icon={<Scale size={40} strokeWidth={1.75} />} tint="navy" />
          </div>
          <div className="md:col-span-7 md:order-2 flex flex-col gap-6 justify-center">
            <h3 className="font-heading font-extrabold text-xl md:text-2xl text-theme-dark">
              The Four-Way Test
            </h3>
            <p className="text-xs md:text-sm text-text-muted font-sans leading-relaxed">
              Of the things we think, say, or do:
            </p>
            <ol className="flex flex-col gap-4">
              {FOUR_WAY_TEST.map((line, i) => (
                <li key={line} className="flex items-start gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-brand-crimson/10 text-brand-crimson font-heading font-extrabold text-xs flex items-center justify-center">
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
      </div>
    </section>
  );
};
