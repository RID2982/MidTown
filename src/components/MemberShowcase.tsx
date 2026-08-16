import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { SHOWCASE_MEMBERS, BOARD_HISTORY, BOARD_TERMS } from '../data/members';
import { MemberWorkCard } from './MemberWorkCard';
import { SectionHeading } from './SectionHeading';

gsap.registerPlugin(ScrollTrigger, SplitText);

const pad = (n: number) => String(n).padStart(2, '0');

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
  const sectionRef = useRef<HTMLElement>(null);

  const handleDotClick = (i: number) => {
    const st = ScrollTrigger.getAll().find(
      (s) => s.trigger === sectionRef.current?.closest('.scene-hold')
    );
    if (st) {
      const scrollPos = st.start + (i / (N - 1)) * (st.end - st.start);
      window.scrollTo({ top: scrollPos, behavior: 'smooth' });
    }
  };

  // Board-of-directors year picker. Only one term exists today
  // (BOARD_TERMS has one entry), but the roster/N below are already
  // derived from the selection rather than hardcoded, so adding a prior
  // year to data/members.ts's BOARD_HISTORY is enough to make it real —
  // no further changes needed here.
  const [selectedTerm, setSelectedTerm] = useState(BOARD_TERMS[0]);
  const [isTermOpen, setIsTermOpen] = useState(false);
  const roster = BOARD_HISTORY[selectedTerm] ?? SHOWCASE_MEMBERS;
  const N = roster.length;

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

  React.useEffect(() => {
    // Baseline layout, in case Scene hasn't scrubbed yet (e.g. the section
    // mounts already in view, or the board term just changed). Same maths
    // as render(0).
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
  }, [roster]);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="w-full h-full flex flex-col justify-center px-6 md:px-12 pt-12 md:pt-20 pb-4 md:pb-5 [@media(max-height:560px)]:pt-8 [@media(max-height:560px)]:pb-2 relative overflow-hidden"
    >
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-crimson/5 rounded-full blur-3xl pointer-events-none" />

      {/* z-60 sits well above any card (cards top out at 50) so the header
          can never be visually crossed by one, even with the slight
          vertical bleed 3D rotation causes on the outer cards. */}
      <SectionHeading
        number="06"
        label="Salem Midtown Board"
        titleTop="The people,"
        titleBottom="behind the"
        accent="work"
        description="Our Club Admin, President, Secretary, and Treasurer — see the full board, all avenue directors included, on the club roster."
        descriptionClassName="hidden md:block"
        titleRef={titleRef}
        className="mb-4 shrink-0 z-60"
      />

      {/* Board-year picker — swaps which term's roster the arc below
          shows. Single option today (only 2026-27 exists), but the
          dropdown and the roster/N it drives are real, not decorative.
          Resizing this row changes the section's vertical overhead — see
          the height-budget comment on the stage div below if you do. */}
      <div className="flex justify-center mb-2 md:mb-4 shrink-0 relative z-60">
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsTermOpen((open) => !open)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/10 bg-white font-heading font-extrabold text-[10px] uppercase tracking-widest text-theme-dark hover:border-brand-crimson/40 transition-colors cursor-pointer"
          >
            <span>Board {selectedTerm}</span>
            <ChevronDown size={12} className={`transition-transform duration-200 ${isTermOpen ? 'rotate-180' : ''}`} />
          </button>
          {isTermOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-40 rounded-2xl border border-black/10 bg-white shadow-lg p-1.5 flex flex-col gap-1 z-70">
              {BOARD_TERMS.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setSelectedTerm(term);
                    setIsTermOpen(false);
                  }}
                  className={`px-4 py-2 rounded-xl text-left text-xs font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    term === selectedTerm ? 'bg-brand-crimson/10 text-brand-crimson' : 'text-text-muted hover:bg-black/5'
                  }`}
                >
                  {term}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

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
          // Explicit clamp rather than h-full/max-h: a percentage height
          // inside a flex-1 parent doesn't resolve reliably (it collapsed
          // the cards to zero height). The subtracted value is this
          // section's fixed vertical overhead — header + board-year picker
          // + counter + button + padding — so the card takes the rest of
          // the screen, never more than the 600px reference size and never
          // so little that it's unusable.
          //
          // FRAGILE, READ BEFORE EDITING THIS SECTION'S CHROME: that
          // overhead is a hand-counted number, not something the browser
          // derives on its own. It previously went stale exactly once
          // already — adding the board-year picker below without bumping
          // it caused the stage to overclaim height and pushed "View All
          // Members" (and everything after it) out of the clipped/pinned
          // .scene-hold, invisible with no error. Add/remove/resize any
          // sibling of the stage (SectionHeading, the picker, the counter
          // row, the button) and this number needs to move with it.
          //
          // This section keeps Scene's "pinned" clipping behaviour at
          // every width (see Scene.tsx's scene-hold-pinned — it's how the
          // arc animation runs on phones too), so on a short landscape-
          // phone viewport there's no scroll-to-reveal fallback for
          // anything that doesn't fit; the [@media(max-height)] variant
          // drops the floor further so the stage actually shrinks to fit
          // instead of getting clipped.
          className="relative w-[78vw] max-w-sm h-[clamp(260px,calc(100vh-360px),600px)] [@media(max-height:560px)]:h-[clamp(130px,calc(100vh-230px),400px)]"
          style={{ transformStyle: 'preserve-3d', pointerEvents: 'none' }}
        >
          {roster.map((member, i) => (
            <div
              key={`${member.name}-${i}`}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: 50 - i, pointerEvents: 'auto' }}
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
      <div className="flex items-center justify-center gap-5 mt-3 md:mt-5 shrink-0 relative z-60">
        <span ref={counterRef} className="font-heading font-extrabold text-xs text-theme-dark tabular-nums">
          {`01 / ${pad(N)}`}
        </span>
        <div className="flex items-center gap-2.5">
          {roster.map((member, i) => (
            <button
              key={`${member.name}-${i}`}
              type="button"
              onClick={() => handleDotClick(i)}
              className="p-1 cursor-pointer focus:outline-none flex items-center justify-center"
              aria-label={`Go to member ${i + 1}`}
            >
              <span
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                className={`w-1.5 h-1.5 rounded-full bg-brand-crimson transition-opacity duration-300 ${i === 0 ? 'opacity-100' : 'opacity-30'}`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-3 md:mt-4 shrink-0 relative z-60">
        <Link
          to="/roster"
          // Leave a "#team" return address on this page before leaving it —
          // see the matching comment on Projects.tsx's "View Project" link.
          onClick={() => window.history.replaceState(null, '', '/#team')}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-brand-crimson to-red-800 text-white font-heading font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-brand-crimson/10 hover:shadow-xl hover:shadow-brand-crimson/25 hover:-translate-y-0.5 transition-all duration-300"
        >
          View All Members
        </Link>
      </div>
    </section>
  );
});

MemberShowcase.displayName = 'MemberShowcase';
