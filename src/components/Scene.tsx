import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Scene: React.FC<{
  children: React.ReactNode;
  zIndex: number;
  bg: string;
  /** For a section that drives its own scroll-scrubbed animation (an arc
   * of cards, a deck) instead of the default "pan tall content into view"
   * behavior — e.g. MemberShowcase. Reserves `runwayVh` viewport-heights
   * of pure scroll distance and reports progress (0..1 across it) to
   * `onScrub` every tick, instead of translating the content. */
  runwayVh?: number;
  onScrub?: (progress: number) => void;
}> = ({ children, zIndex, bg, runwayVh, onScrub }) => {
  const holdRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [runway, setRunway] = useState(0);

  useLayoutEffect(() => {
    const hold = holdRef.current;
    const inner = innerRef.current;
    if (!hold || !inner) return;

    const mm = gsap.matchMedia();

    // A scrub-driven scene (the Members arc) runs at EVERY width — phones
    // get the same animation as desktop, just sized down by the section
    // itself. Only the "pan tall content into view" behaviour below is
    // desktop-only, since on a phone that content is meant to reflow into
    // normal document scrolling instead.
    if (onScrub) {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const extra = Math.max(1, (runwayVh ?? 0) * window.innerHeight);
        setRunway(extra);

        let st: ScrollTrigger | null = null;

        // The runway div is rendered from `runway` state, so it does not
        // exist in the DOM until the next React render. Creating the
        // ScrollTrigger before then makes it measure a document still
        // missing this scene's scroll distance, which offsets its start —
        // the visible symptom was the first card never getting its centred
        // moment while the section was actually pinned. Wait a frame, then
        // create it and refresh so positions are measured post-layout.
        const raf = requestAnimationFrame(() => {
          st = ScrollTrigger.create({
            trigger: hold,
            start: 'top top',
            end: () => `+=${extra}`,
            scrub: true,
            toggleClass: { targets: hold, className: 'is-pinned' },
            invalidateOnRefresh: true,
            onUpdate: (self) => onScrub(self.progress),
          });
          ScrollTrigger.refresh();
        });

        return () => {
          cancelAnimationFrame(raf);
          st?.kill();
        };
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        setRunway(0);
        onScrub(1); // resting layout, no scroll-driven motion
      });

      return () => mm.revert();
    }

    mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      let tween: gsap.core.Tween | null = null;

      const measure = () => Math.max(0, inner.scrollHeight - window.innerHeight);

      // The runway div (sized from `runway` state) has to exist in the DOM
      // — and be measured by ScrollTrigger — before the tween's scroll
      // distance is correct, hence the rAF: let the state-driven re-render
      // land first.
      setRunway(measure());
      const raf = requestAnimationFrame(() => {
        const extra = measure();
        setRunway(extra);

        tween = gsap.fromTo(
          inner,
          { y: 0 },
          {
            y: -extra,
            ease: 'none',
            scrollTrigger: {
              trigger: hold,
              start: 'top top',
              end: () => `+=${Math.max(extra, 1)}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      // Content like an accordion animates height over many frames (Framer
      // Motion's `height: 'auto'` tween), which fires the ResizeObserver on
      // nearly every frame. Calling ScrollTrigger.refresh() that often mid-
      // scroll is what caused the pin to visibly stick/stutter — debounce
      // so refresh only runs once the resize has settled.
      let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
      const ro = new ResizeObserver(() => {
        setRunway(measure());
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => ScrollTrigger.refresh(), 200);
      });
      ro.observe(inner);

      return () => {
        cancelAnimationFrame(raf);
        if (resizeTimeout) clearTimeout(resizeTimeout);
        ro.disconnect();
        tween?.scrollTrigger?.kill();
        tween?.kill();
        gsap.set(inner, { y: 0 });
      };
    });

    mm.add('(max-width: 900px), (prefers-reduced-motion: reduce)', () => {
      setRunway(0);
      gsap.set(inner, { y: 0, clearProps: 'transform' });
    });

    return () => mm.revert();
  }, [onScrub, runwayVh]);

  // A scrub-driven scene keeps its pinned frame on phones too, so the
  // animation runs there as well — see the .scene-hold-pinned note in
  // index.css.
  const pinned = onScrub ? ' scene-hold-pinned' : '';

  return (
    <div className="relative mobile-scene-wrapper">
      <div ref={holdRef} className={`scene-hold${pinned} ${bg}`} style={{ zIndex }}>
        <div ref={innerRef} className="scene-hold-inner">
          {children}
        </div>
      </div>
      {runway > 0 && (
        <div
          className={`scene-runway${onScrub ? ' scene-runway-pinned' : ''}`}
          style={{ height: runway }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};
