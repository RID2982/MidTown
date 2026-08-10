import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * A single marquee word. Plain strings take the row's styling; the object
 * form overrides it per word, so one row can alternate solid and outlined
 * text instead of every row being uniform.
 */
export type MarqueeItem = string | { text: string; outline?: boolean; bold?: boolean };

export interface MarqueeRow {
  items: MarqueeItem[];
  /** px/s base speed; sign sets base scroll direction */
  velocity: number;
  /** Default styling for items in this row that don't specify their own. */
  outline?: boolean;
}

const itemText = (item: MarqueeItem) => (typeof item === 'string' ? item : item.text);

// An item's own `outline` wins; `bold: true` is the explicit opposite of
// outlined. Otherwise it inherits the row default.
const itemOutlined = (item: MarqueeItem, rowOutline?: boolean) => {
  if (typeof item === 'string') return !!rowOutline;
  if (item.outline !== undefined) return item.outline;
  if (item.bold) return false;
  return !!rowOutline;
};

// Scroll-velocity-reactive marquee: rows drift continuously in their own
// base direction, speed up when the page is scrolled, and reverse when
// scrolling up — adapted from the reference site's VelocityMarquee.
// Transform-only (xPercent via one shared gsap ticker), so it stays cheap
// even with several rows on screen.
const COPIES = 4;

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const RowCopy: React.FC<{ items: MarqueeItem[]; outline?: boolean }> = ({ items, outline }) => (
  <span className="flex items-center shrink-0" aria-hidden="true">
    {items.map((item, i) => (
      <span key={i} className="flex items-center gap-6 px-6">
        <span
          className={`font-display uppercase text-3xl md:text-5xl whitespace-nowrap ${
            itemOutlined(item, outline) ? 'text-outline' : 'text-white'
          }`}
        >
          {itemText(item)}
        </span>
        <span className="text-brand-crimson text-2xl md:text-3xl">&#10022;</span>
      </span>
    ))}
  </span>
);

export const VelocityMarquee: React.FC<{ rows: MarqueeRow[]; className?: string }> = ({ rows, className = '' }) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const tracks = Array.from(root.querySelectorAll<HTMLElement>('[data-track]'));
    const state = tracks.map((track, i) => ({
      track,
      x: 0,
      base: rows[i]?.velocity ?? 40,
      copyPx: 1,
    }));

    const measure = () => {
      state.forEach((s) => {
        s.copyPx = Math.max(1, s.track.scrollWidth / COPIES);
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);

    const wrap = gsap.utils.wrap(-25, 0);
    let lastY = window.scrollY;
    let lastT = performance.now();
    let boost = 0;

    const tick = () => {
      const now = performance.now();
      const dt = Math.min((now - lastT) / 1000, 0.05);
      lastT = now;

      // Scroll velocity (px/s), heavily smoothed so direction flips settle
      // rather than flicker.
      const y = window.scrollY;
      const vRaw = dt > 0 ? (y - lastY) / dt : 0;
      lastY = y;
      boost += (gsap.utils.clamp(-3000, 3000, vRaw) - boost) * 0.1;

      const dirFromScroll = boost < -40 ? -1 : 1; // scrolling up reverses
      const accel = 1 + Math.min(Math.abs(boost) / 1400, 1.2); // at most ~2.2x

      state.forEach((s) => {
        const pxDelta = s.base * dirFromScroll * accel * dt;
        s.x -= (pxDelta / s.copyPx) * 25; // one copy = 25 xPercent of 4
        gsap.set(s.track, { xPercent: wrap(s.x) });
      });
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      ro.disconnect();
    };
  }, [rows]);

  return (
    <div ref={rootRef} className={className}>
      <p className="sr-only">{rows.flatMap((r) => r.items.map(itemText)).join(', ')}</p>
      {rows.map((row, i) => (
        <div key={i} className="overflow-hidden py-2">
          <div data-track className="flex w-max">
            {Array.from({ length: COPIES }).map((_, c) => (
              <RowCopy key={c} items={row.items} outline={row.outline} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
