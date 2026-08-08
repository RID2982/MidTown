import React from 'react';
import { motion } from 'framer-motion';
import { useScrollSkew } from '../hooks/useScrollSkew';

export const ClubAbout: React.FC = () => {
  const headingRef = useScrollSkew<HTMLHeadingElement>();

  // Note: these variants intentionally never set opacity in the "hidden"
  // state. whileInView only fires on a real scroll/intersection event — a
  // one-shot "capture entire page" screenshot tool never scrolls, so it
  // never fires. Content gated behind opacity: 0 would render permanently
  // invisible in that case; animating only position keeps it always legible
  // while still playing the slide-in motion for real visitors.
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  // Small px offset, not a full-height mask: a masked 100% slide-up clips
  // the text entirely whenever whileInView never fires (see note above) —
  // for headings that's a missing title, not just a static card, so it's
  // worth trading the wipe-reveal flourish for guaranteed legibility.
  const revealVariants = {
    hidden: { y: 24 },
    visible: {
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const itemVariants = {
    hidden: { y: 30 },
    visible: {
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const }
    }
  };

  return (
    <section id="about" className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 py-20 relative z-10 bg-white">
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-brand-crimson/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Title block */}
      <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
        <span className="text-brand-crimson text-xs uppercase font-heading font-extrabold tracking-widest mb-3">
          Rotaract Salem Midtown History
        </span>
        <h2 ref={headingRef} className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight overflow-hidden pb-1">
          <motion.span
            initial={{ y: 24 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="block"
          >
            About Our <span className="bg-gradient-to-r from-brand-crimson to-red-800 bg-clip-text text-transparent">Midtown Club</span>
          </motion.span>
        </h2>
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
      >
        {/* Left: About Text */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <motion.div variants={itemVariants} className="text-brand-crimson text-xs uppercase font-heading font-bold tracking-widest">
            Sponsored by Rotary Club of Salem Midtown
          </motion.div>
          
          <div className="overflow-hidden pb-1">
            <motion.h3 variants={revealVariants} className="text-xl md:text-3xl font-heading font-bold text-text-primary">
              Dream to Deserve
            </motion.h3>
          </div>
          
          <motion.p variants={itemVariants} className="text-text-muted font-sans text-sm md:text-base leading-relaxed">
            Chartered to mobilize Salem's youth, our club serves as a platform for college students, young working professionals, and entrepreneurs to grow as leaders, coordinate community service, and build international ties.
          </motion.p>
          <motion.p variants={itemVariants} className="text-text-muted font-sans text-sm md:text-base leading-relaxed">
            Through targeted social development efforts (blood donation drives, environment initiatives, computer literacy campaigns, and public speaking modules), we aim to translate club fellowship into life-changing service.
          </motion.p>
          
          {/* Avenue Objectives — staggered floating tag pills */}
          <motion.ul variants={containerVariants} className="flex flex-wrap gap-3 mt-6">
            <motion.li variants={itemVariants} className="flex items-center gap-2 pl-3 pr-4 py-2 rounded-full bg-brand-crimson/5 border border-brand-crimson/10 text-sm font-heading font-semibold text-text-primary w-fit">
              <span className="w-2 h-2 rounded-full bg-brand-crimson shadow-md shadow-brand-crimson/50 shrink-0" />
              <span>Club Service & Fellowship</span>
            </motion.li>
            <motion.li variants={itemVariants} className="flex items-center gap-2 pl-3 pr-4 py-2 rounded-full bg-brand-crimson/5 border border-brand-crimson/10 text-sm font-heading font-semibold text-text-primary w-fit">
              <span className="w-2 h-2 rounded-full bg-brand-crimson shadow-md shadow-brand-crimson/50 shrink-0" />
              <span>Community Development</span>
            </motion.li>
            <motion.li variants={itemVariants} className="flex items-center gap-2 pl-3 pr-4 py-2 rounded-full bg-brand-crimson/5 border border-brand-crimson/10 text-sm font-heading font-semibold text-text-primary w-fit">
              <span className="w-2 h-2 rounded-full bg-brand-crimson shadow-md shadow-brand-crimson/50 shrink-0" />
              <span>Professional Growth</span>
            </motion.li>
            <motion.li variants={itemVariants} className="flex items-center gap-2 pl-3 pr-4 py-2 rounded-full bg-brand-crimson/5 border border-brand-crimson/10 text-sm font-heading font-semibold text-text-primary w-fit">
              <span className="w-2 h-2 rounded-full bg-brand-crimson shadow-md shadow-brand-crimson/50 shrink-0" />
              <span>International Service</span>
            </motion.li>
          </motion.ul>
        </div>
        
        {/* Right: Group Photo Placeholder */}
        <div className="lg:col-span-5 w-full">
          <motion.div 
            variants={itemVariants}
            className="w-full aspect-[4/3] rounded-3xl border border-dashed border-text-primary/10 bg-white hover-beige-gradient flex flex-col items-center justify-center text-center p-6 transition-all duration-300 shadow-sm"
          >
            <span className="text-text-muted text-sm font-heading font-bold mb-2">Club Group Photo Slot</span>
            <span className="text-xs text-text-muted/65 font-sans">Place your final group photo or club logo file here</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
