import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// A small, self-contained signature touch used on section headings sitewide:
// the element skews slightly based on how fast the page is scrolling, then
// eases back level once scrolling settles. Purely additive — it targets its
// own element (never the one Framer Motion's `y` reveal already animates),
// so the two libraries never fight over the same `transform` property.
export function useScrollSkew<T extends HTMLElement>(maxSkew = 6) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const proxy = { skew: 0 };
    const clamp = gsap.utils.clamp(-maxSkew, maxSkew);
    let resetTween: gsap.core.Tween | null = null;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom+=100',
      end: 'bottom top-=100',
      onUpdate: (self) => {
        const skew = clamp(self.getVelocity() / -300);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          resetTween?.kill();
          resetTween = gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: 'power3.out',
            onUpdate: () => gsap.set(el, { skewY: proxy.skew }),
          });
        }
      },
    });

    return () => {
      resetTween?.kill();
      trigger.kill();
      gsap.set(el, { skewY: 0 });
    };
  }, [maxSkew]);

  return ref;
}
