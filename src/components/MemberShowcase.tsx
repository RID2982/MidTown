import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { SHOWCASE_MEMBERS } from '../data/members';
import { MemberWorkCard } from './MemberWorkCard';
import { SectionHeading } from './SectionHeading';

gsap.registerPlugin(ScrollTrigger, SplitText);

const pad = (n: number) => String(n).padStart(2, '0');
const N = SHOWCASE_MEMBERS.length;

// px between card centres on the arc. A fixed 370 pushed neighbouring
// cards clean off a phone screen, so it scales with the viewport and only
// reaches the desktop value once there's room for it.
const spread = () => Math.min(370, Math.max(150, window.innerWidth * 0.62));

// The 3D rotation and depth falloff are also eased back on small screens:
// at phone width the same angles read as extreme rather than as depth.
const isNarrow = () => window.innerWidth < 640;

export interface MemberShowcaseHandle {
  render: (progress01: number) => void;
}

/**
 * Home-page leadership highlight — a Work-style coverflow arc, driven by
 * Scene's onScrub (see Scene.tsx): the center card sits frontal, neighbours
 * rotate away and recede, while a counter + dots track position. Full
 * roster lives on /roster — this is the "featured on home, full detail
 * elsewhere" pattern already used for Projects.
 */
export const MemberShowcase = forwardRef<MemberShowcaseHandle>((_props, ref) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useImperativeHandle(ref, () => ({
    render(progress01: number) {
      const p = gsap.utils.clamp(0, N - 1, progress01 * (N - 1));
      const sp = spread();
      const narrow = isNarrow();

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const d = i - p;
        const ad = Math.abs(d);

        gsap.set(card, {
          x: d * sp,
          y: Math.min(ad * ad * (narrow ? 5 : 8), narrow ? 55 : 90),
          rotationY: gsap.utils.clamp(-32, 32, -d * (narrow ? 7 : 11)),
          scale: 1 - Math.min(ad * (narrow ? 0.12 : 0.09), 0.45),
          autoAlpha: ad <= 2 ? 1 : Math.max(0.5, 1 - (ad - 2) * 0.25),
          zIndex: Math.round(50 - ad * 10),
        });
      });

      const active = Math.round(p);
      if (counterRef.current) counterRef.current.textContent = `${pad(active + 1)} / ${pad(N)}`;
      dotRefs.current.forEach((dot, i) => dot?.classList.toggle('opacity-100', i === active));
    },
  }));

  React.useEffect(() => {
    // Baseline layout, in case Scene hasn't scrubbed yet (e.g. the section
    // mounts already in view). Same maths as render(0).
    const sp = spread();
    const narrow = isNarrow();
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const d = i;
      gsap.set(card, {
        x: d * sp,
        rotationY: gsap.utils.clamp(-32, 32, -d * (narrow ? 7 : 11)),
        scale: 1 - Math.min(d * (narrow ? 0.12 : 0.09), 0.45),
        autoAlpha: d <= 2 ? 1 : Math.max(0.5, 1 - (d - 2) * 0.25),
        zIndex: Math.round(50 - d * 10),
      });
    });

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const split = new SplitText(titleRef.current, { type: 'lines,words' });
        gsap.from(split.words, {
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          y: 24,
          stagger: 0.03,
          duration: 1,
          ease: 'power3.out',
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="team" className="w-full h-full flex flex-col justify-center px-6 md:px-12 pt-20 pb-5 relative overflow-hidden">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-crimson/5 rounded-full blur-3xl pointer-events-none" />

      {/* z-60 sits well above any card (cards top out at 50) so the header
          can never be visually crossed by one, even with the slight
          vertical bleed 3D rotation causes on the outer cards. */}
      <SectionHeading
        number="05"
        label="Salem Midtown Board"
        titleTop="The people,"
        titleBottom="behind the"
        accent="work"
        description="President to Avenue Directors — ten leaders, one board, driving every avenue of service forward."
        titleRef={titleRef}
        className="mb-4 shrink-0 z-60"
      />

      {/* Desktop: arc coverflow, driven by Scene's scroll-scrub. The stage
          takes whatever vertical space is left after the header and the
          counter/button rows (flex-1 + min-h-0), and the card fills it up
          to a 600px cap — that 600px matches the reference site's real
          card proportions (300x470 scaled to our 384px width), but it has
          to be a CAP rather than a fixed height: on a short laptop screen
          a hard 600px overflowed the one-screen Scene hold and pushed the
          "View All Members" button out of sight below the fold. */}
      {/* One arc at every width — phones get the same coverflow, sized
          down (see spread()/isNarrow()), rather than a separate swipe row
          that behaved nothing like the desktop section. */}
      <div className="flex flex-1 min-h-0 items-center justify-center relative" style={{ perspective: '1400px' }}>
        <div
          className="relative w-[78vw] max-w-sm"
          style={{
            transformStyle: 'preserve-3d',
            // Explicit clamp rather than h-full/max-h: a percentage height
            // inside a flex-1 parent doesn't resolve reliably (it collapsed
            // the cards to zero height). The subtracted value is this
            // section's fixed vertical overhead — header + counter + button
            // + padding — so the card takes the rest of the screen, never
            // more than the 600px reference size and never so little that
            // it's unusable.
            height: 'clamp(300px, calc(100vh - 300px), 600px)',
          }}
        >
          {SHOWCASE_MEMBERS.map((member, i) => (
            <div
              key={member.name}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: 50 - i }}
            >
              <MemberWorkCard member={member} />
            </div>
          ))}
        </div>
      </div>

      {/* Counter + dots and the button both shrink-0, so the flexible
          card stage above yields space to them rather than the other way
          round — the button must never be the thing that gets pushed off
          the bottom of the held screen. */}
      <div className="flex items-center justify-center gap-5 mt-5 shrink-0 relative z-60">
        <span ref={counterRef} className="font-heading font-extrabold text-xs text-theme-dark tabular-nums">
          {`01 / ${pad(N)}`}
        </span>
        <div className="flex items-center gap-2.5">
          {SHOWCASE_MEMBERS.map((member, i) => (
            <span
              key={member.name}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              className={`w-1.5 h-1.5 rounded-full bg-brand-crimson transition-opacity duration-300 ${i === 0 ? 'opacity-100' : 'opacity-30'}`}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4 shrink-0 relative z-60">
        <Link
          to="/roster"
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-brand-crimson to-red-800 text-white font-heading font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-brand-crimson/10 hover:shadow-xl hover:shadow-brand-crimson/25 hover:-translate-y-0.5 transition-all duration-300"
        >
          View All Members
        </Link>
      </div>
    </section>
  );
});

MemberShowcase.displayName = 'MemberShowcase';
