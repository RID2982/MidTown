import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const HOLD_MS = 5000; // how long each photo stays up
const FADE_S = 0.5; // crossfade duration between photos

/**
 * A project's photo box on its avenue page. With 2-3 real photos, it
 * auto-swipes between them like a phone gallery — a timed crossfade, not a
 * hard cut, and pauses on hover so you can actually read a photo you're
 * looking at. Falls back to the gradient placeholder when there are no
 * photos yet, and to a single static image when there's exactly one —
 * nothing to cycle to, so no timer, no dots, just the photo.
 */
export const ProjectGallery: React.FC<{
  images: string[] | undefined;
  /**
   * CSS object-position per photo, same index as images (e.g. 'top',
   * 'center', '50% 20%'). Optional — defaults to 'center'. A tall portrait
   * photo cropped into this box's 4:3 frame crops evenly top and bottom by
   * default, which can cut off heads; 'top' keeps the crop off the bottom
   * instead.
   */
  imagePositions?: string[];
  alt: string;
  category: string;
  gradientClass: string;
  alignments?: {
    xOffset?: number;
    yOffset?: number;
    zoomScale?: number;
  }[];
}> = ({ images, imagePositions, alt, category, gradientClass, alignments }) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = images?.length ?? 0;
  const reducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (count < 2 || paused || reducedMotion.current) return;
    const id = setInterval(() => setActive((i) => (i + 1) % count), HOLD_MS);
    return () => clearInterval(id);
  }, [count, paused]);

  if (!images || count === 0) {
    return (
      <div
        className={`w-full aspect-[4/3] rounded-[2rem] bg-gradient-to-br ${gradientClass} shadow-lg flex items-center justify-center p-8`}
      >
        <span className="text-white/80 font-heading font-extrabold text-sm uppercase tracking-widest text-center">
          {category}
        </span>
      </div>
    );
  }

  if (count === 1) {
    const alignment = alignments?.[0];
    const x = alignment?.xOffset ?? 0;
    const y = alignment?.yOffset ?? 0;
    const zoom = alignment?.zoomScale ?? 1;
    return (
      <img
        src={images[0]}
        alt={alt}
        style={{
          objectPosition: imagePositions?.[0] ?? 'center',
          transform: `translate(${x}%, ${y}%) scale(${zoom})`,
        }}
        className="w-full aspect-[4/3] rounded-[2rem] shadow-lg object-cover"
      />
    );
  }

  const alignment = alignments?.[active];
  const activeX = alignment?.xOffset ?? 0;
  const activeY = alignment?.yOffset ?? 0;
  const activeZoom = alignment?.zoomScale ?? 1;

  return (
    <div
      className="relative w-full aspect-[4/3] rounded-[2rem] shadow-lg overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync">
        <motion.img
          key={active}
          src={images[active]}
          alt={alt}
          style={{
            objectPosition: imagePositions?.[active] ?? 'center',
            transform: `translate(${activeX}%, ${activeY}%) scale(${activeZoom})`,
          }}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_S, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      {/* Position dots — also a manual swipe: click one to jump there and
          restart the hold from that photo. */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show photo ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === active ? 'w-5 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
