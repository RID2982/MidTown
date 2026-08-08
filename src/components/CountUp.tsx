import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

interface CountUpProps {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

// Animates a number counting up to its target once scrolled into view.
// Defaults to the final formatted value (not "0") so that if the
// IntersectionObserver behind useInView never fires — a one-shot full-page
// screenshot never scrolls, same failure mode documented elsewhere in this
// codebase for whileInView — the number is still correct, just unanimated.
export const CountUp: React.FC<CountUpProps> = ({
  to,
  duration = 1.4,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState(to.toFixed(decimals));

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => setDisplay(value.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [isInView, to, duration, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};
