import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Crown, Globe2, CalendarDays, Ticket, ArrowUpRight } from 'lucide-react';
import chessEventPosterFile from '../assets/announcements/chess-event-poster.jpg';

gsap.registerPlugin(ScrollTrigger);

// ── SETTING UP THE NEXT ANNOUNCEMENT ────────────────────────────────────
// One event lives here at a time — this whole section, plus its later life
// as a past project (see data/projects.ts, which reads CURRENT_ANNOUNCEMENT
// directly), is driven entirely by the object below. When this event is
// done and a new one needs announcing:
//   1. Drop the new poster into src/assets/announcements/ (compress it —
//      the club's raw exports run several MB, a ~1200px-wide JPEG at
//      q80-85 is plenty for the card size this renders at) and import it
//      below. Leave `poster: null` for the themed placeholder if the art
//      isn't ready yet.
//   2. Fill in the copy, dates, and the registration form URL — `formUrl`
//      can stay `null` until the form exists; the button shows "Coming
//      Soon" automatically (same pattern as Support.tsx's JOIN_FORM_URL).
//   3. Set `endDate` to when this announcement should stop showing on the
//      homepage and instead appear as a past project under `pastProject`
//      — pick whichever avenue (see AVENUES in data/projects.ts) fits.
// Nothing else needs touching: HomePage.tsx and data/projects.ts both just
// react to isAnnouncementLive().
const CURRENT_ANNOUNCEMENT = {
  eyebrow: 'Registrations Open',
  titleNative: 'சதுரங்க வேட்டை',
  titleAccent: 'Chess Event',
  description:
    'Rotaract Club of Salem Midtown presents சதுரங்க வேட்டை, an online chess tournament open to everyone. Registrations are live now for the League Stage — sign up, get matched, and start playing.',
  mode: 'League Stage · Online',
  startLabel: 'September 11, 2026',
  fee: '₹99',
  poster: chessEventPosterFile as string | null,
  formUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSdaKO8Mj2wVtZF31EntDrCuCMVfmdsSpJomxXBKpzmm7Gb4rA/viewform' as
      | string
      | null,
  // Only the online League Stage is announced here per the club's request —
  // the offline knockout rounds (Quarter/Semi/Finals) aren't mentioned
  // until their own announcement goes out.
  endDate: new Date('2026-09-14T00:00:00+05:30'),
  // Where this event lands once it's done — data/projects.ts appends this
  // (with `poster` above as its photo) to the named avenue's project list
  // the moment endDate passes, so it never needs a manual follow-up edit.
  pastProject: {
    title: 'சதுரங்க வேட்டை — Chess Event',
    category: 'Chess Tournament',
    avenue: 'Club Service',
    description:
      'Rotaract Club of Salem Midtown hosted சதுரங்க வேட்டை, a chess tournament open to all — an online League Stage followed by Quarter-Final, Semi-Final and Final rounds, bringing members and the wider community together over the board.',
  },
};

export { CURRENT_ANNOUNCEMENT };
export const isAnnouncementLive = () => new Date() < CURRENT_ANNOUNCEMENT.endDate;

export const Announcement: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement & HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // The CTA gets its own tween rather than joining contentRef's
      // stagger group as its last child — grouped with the rest, it
      // reliably stayed pinned at its "from" state (opacity 0) forever,
      // every other sibling animating in fine. Root cause didn't reduce to
      // anything simpler than "don't stagger this one with the rest", so
      // it's animated independently instead, delayed to land after them.
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
          y: 24,
          opacity: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power3.out',
        });
      }
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
          y: 24,
          opacity: 0,
          duration: 0.6,
          delay: 0.4,
          ease: 'power3.out',
        });
      }
      if (posterRef.current) {
        gsap.from(posterRef.current, {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
          scale: 0.82,
          y: 50,
          rotate: -6,
          opacity: 0,
          duration: 0.9,
          delay: 0.45,
          ease: 'back.out(1.7)',
        });
      }
    });
    return () => ctx.revert();
  }, []);

  const { eyebrow, titleNative, titleAccent, description, mode, startLabel, fee, poster, formUrl } =
    CURRENT_ANNOUNCEMENT;

  return (
    <section ref={sectionRef} id="announcement" className="w-full bg-white relative overflow-hidden pt-28 md:pt-32">
      {/* Ticker banner — a continuous "UPCOMING EVENT" scroll, bordered top
          and bottom like a stock-ticker strip, so the announcement reads as
          live/current the instant it's scrolled into view. Sits below the
          top padding above so it clears the floating header instead of
          being cut off behind it (same clearance Hero's own content uses).
          Alternating crimson/gold instead of a flat black ticker — keeps it
          on-brand rather than reading like a stock-market feed. */}
      <div className="w-full border-y-2 border-brand-crimson py-2.5 overflow-hidden">
        <div className="flex whitespace-nowrap marquee-track">
          {[0, 1].map((rep) => (
            <div key={rep} className="flex shrink-0" aria-hidden={rep === 1}>
              {Array.from({ length: 8 }).map((_, i) => (
                <span
                  key={i}
                  className={`font-heading font-extrabold text-lg md:text-2xl uppercase tracking-tight px-4 ${
                    i % 2 === 0 ? 'text-brand-crimson' : 'text-brand-gold'
                  }`}
                >
                  Upcoming Event *
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,320px)_1fr] gap-10 md:gap-16 items-center">
          {/* Poster */}
          <div
            ref={posterRef}
            className="w-full max-w-xs mx-auto md:mx-0 aspect-3/4 rounded-[1.75rem] border border-black/10 overflow-hidden shadow-[0_20px_45px_-15px_rgba(225,29,72,0.35)]"
          >
            {poster ? (
              <img
                src={poster}
                alt={`${titleNative} — ${titleAccent} poster, Rotaract Club of Salem Midtown`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-theme-dark to-brand-crimson text-white text-center px-6 relative">
                <Crown size={40} className="text-brand-gold" />
                <div>
                  <p className="font-script text-lg leading-tight">{titleNative}</p>
                  <p className="font-heading font-extrabold text-2xl uppercase tracking-wide leading-tight mt-1">
                    {titleAccent}
                  </p>
                </div>
                <span className="absolute bottom-4 right-4 text-[9px] font-heading font-extrabold uppercase tracking-widest text-white/50">
                  Poster coming soon
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col gap-5">
            <div ref={contentRef} className="flex flex-col gap-5">
              <span className="text-brand-crimson text-xs uppercase font-heading font-extrabold tracking-widest">
                {eyebrow}
              </span>
              <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-theme-dark leading-[0.95]">
                {titleNative} — <span className="italic text-brand-crimson font-normal">{titleAccent}</span>
              </h2>
              <p className="text-text-muted font-sans text-sm md:text-base leading-relaxed max-w-2xl">
                {description}
              </p>

              <div className="flex flex-wrap gap-x-8 gap-y-4 mt-1">
                <div className="flex items-center gap-2.5">
                  <Globe2 size={18} className="text-brand-crimson shrink-0" />
                  <div>
                    <p className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-text-muted">Mode</p>
                    <p className="text-sm font-heading font-bold text-theme-dark">{mode}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <CalendarDays size={18} className="text-brand-crimson shrink-0" />
                  <div>
                    <p className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-text-muted">Starts</p>
                    <p className="text-sm font-heading font-bold text-theme-dark">{startLabel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Ticket size={18} className="text-brand-crimson shrink-0" />
                  <div>
                    <p className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-text-muted">Registration Fee</p>
                    <p className="text-sm font-heading font-bold text-theme-dark">{fee}</p>
                  </div>
                </div>
              </div>
            </div>

            {formUrl ? (
              <a
                ref={ctaRef}
                href={formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 self-start inline-flex items-center gap-1.5 px-7 py-3.5 rounded-full font-heading font-extrabold text-xs uppercase tracking-wider bg-gradient-to-r from-brand-crimson to-red-800 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Register Now</span>
                <ArrowUpRight size={14} />
              </a>
            ) : (
              <span
                ref={ctaRef}
                title="Registration form link coming soon"
                className="mt-2 self-start px-7 py-3.5 rounded-full font-heading font-extrabold text-xs uppercase tracking-wider border border-black/10 bg-bg-secondary text-text-muted"
              >
                Registration Form Coming Soon
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
