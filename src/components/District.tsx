import React from 'react';
import { motion } from 'framer-motion';
import { CountUp } from './CountUp';

export const District: React.FC = () => {
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

  const cardVariants = {
    hidden: { y: 30 },
    visible: {
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const }
    }
  };

  return (
    <section id="district" className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 py-20 -mt-12 md:-mt-16 rounded-t-[3rem] relative z-10 bg-white">
      <div className="absolute top-10 left-10 w-96 h-96 bg-brand-navy/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Title block */}
      <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
        <span className="text-brand-crimson text-xs uppercase font-heading font-extrabold tracking-widest mb-3">
          Rotary International District Hierarchy
        </span>
        <h2 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight overflow-hidden pb-1">
          <motion.span
            initial={{ y: 24 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="block"
          >
            Rotary District <span className="bg-gradient-to-r from-brand-crimson to-red-800 bg-clip-text text-transparent">2982</span>
          </motion.span>
        </h2>
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
      >
        {/* Left Column: District Info */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="overflow-hidden pb-1">
            <motion.h3 
              variants={revealVariants}
              className="text-xl md:text-3xl font-heading font-bold text-brand-gold"
            >
              Service Above Self
            </motion.h3>
          </div>
          <motion.p variants={cardVariants} className="text-text-muted font-sans text-sm md:text-base leading-relaxed">
            Rotary District 2982 operates as a powerhouse of service in Tamil Nadu, India, coordinating projects and fostering fellowship across Salem, Namakkal, Dharmapuri, and Krishnagiri. Under the guidance of District Governor <strong>Rtn. Chinniah Senthil Kumar</strong> (RY 2026–27), we coordinate youth networks to drive community welfare.
          </motion.p>
          <motion.p variants={cardVariants} className="text-text-muted font-sans text-sm md:text-base leading-relaxed">
            We foster dynamic projects focusing on basic education, environmental preservation, disease prevention, and youth development. Our joint efforts bring together community-based and institutional Rotaract clubs to build local leaders.
          </motion.p>
        </div>
        
        {/* Right Column: Statistics Grid */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <motion.div 
            variants={cardVariants}
            className="glass-card hover-beige-gradient rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-sm"
          >
            <CountUp to={2982} duration={1.2} className="text-4xl font-heading font-extrabold text-brand-crimson mb-2" />
            <span className="text-xs text-text-muted uppercase tracking-wider font-bold font-heading">District ID</span>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="glass-card hover-beige-gradient rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-sm"
          >
            <CountUp to={1.2} duration={1.2} decimals={1} suffix="M+" className="text-4xl font-heading font-extrabold text-brand-crimson mb-2" />
            <span className="text-xs text-text-muted uppercase tracking-wider font-bold font-heading">Global Network</span>
          </motion.div>
          
          <motion.div 
            variants={cardVariants}
            className="glass-card hover-beige-gradient rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-sm sm:col-span-2"
          >
            <span className="text-lg font-heading font-bold text-text-primary mb-1">Rtn. C. Senthil Kumar</span>
            <span className="text-[10px] text-brand-gold uppercase tracking-wider font-extrabold font-heading">District Governor (RY 2026-27)</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
