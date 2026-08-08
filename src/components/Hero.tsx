import React from 'react';
import { motion } from 'framer-motion';
import clubLogo from '../assets/club-logo.png';

export const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const }
    }
  };

  const revealVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const }
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 py-32 md:py-48 bg-white">
      {/* Soft Faded Red Gradients for Depth */}
      <div className="absolute inset-0 bg-radial-[circle_at_20%_30%] from-brand-crimson/5 via-transparent to-transparent z-0 opacity-70" />
      <div className="absolute inset-0 bg-radial-[circle_at_80%_70%] from-brand-navy/5 via-transparent to-transparent z-0 opacity-70" />

      {/* Club logo watermark — 30% opacity per request, fades in then holds a
          slow, subtle breathing scale loop. Decorative only (aria-hidden). */}
      <motion.img
        src={clubLogo}
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 0.3, scale: [0.97, 1.03, 0.97] }}
        transition={{
          opacity: { duration: 1.5, ease: 'easeOut' },
          scale: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] md:w-[1040px] max-w-[90vw] pointer-events-none select-none z-0"
      />

      {/* Rounded panel seam — a soft tinted shelf that the next section's
          rounded top tucks over, instead of a hard section boundary */}
      <div className="absolute bottom-0 left-0 right-0 h-20 md:h-28 rounded-t-[3rem] bg-gradient-to-t from-brand-crimson/[0.06] via-brand-gold/[0.03] to-transparent pointer-events-none" />
      
      {/* Content Wrapper */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[1800px] mx-auto text-center relative z-10 flex flex-col items-center px-4"
      >
        {/* District Badge */}
        <motion.div 
          variants={badgeVariants}
          className="inline-flex items-center px-4.5 py-2 rounded-full border border-text-primary/5 bg-white text-[10px] md:text-xs font-heading font-extrabold uppercase tracking-wider text-brand-gold mb-8 shadow-sm hover:shadow-md transition-all duration-300"
        >
          Rotary International District 2982
        </motion.div>
        
        {/* Main Header Title (Scroll-Reveal mask shift) */}
        <h1 className="text-5xl md:text-8xl font-heading font-extrabold tracking-tight leading-[1.02] text-text-primary mb-8 max-w-5xl">
          <span className="block overflow-hidden pb-1">
            <motion.span variants={revealVariants} className="block">
              Rotaract Club of
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-1 mt-1">
            <motion.span 
              variants={revealVariants} 
              className="block bg-gradient-to-r from-brand-crimson via-red-600 to-red-800 bg-clip-text text-transparent relative"
            >
              Salem Midtown
            </motion.span>
          </span>
        </h1>
        
        {/* Subtitle */}
        <motion.p 
          variants={fadeUpVariants}
          className="text-base md:text-xl text-text-muted font-sans font-normal max-w-2xl leading-relaxed mb-12"
        >
          Dream to Deserve — Empowering young professionals, nurturing lifelong fellowship, and driving impactful community service in Salem.
        </motion.p>
        
        {/* Call to Actions */}
        <motion.div 
          variants={fadeUpVariants}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#about"
            className="w-full sm:w-auto px-8 py-4 rounded-full font-heading font-bold text-sm bg-gradient-to-r from-brand-crimson to-red-800 hover:from-brand-crimson/95 hover:to-red-750 text-white shadow-lg shadow-brand-crimson/25 hover:shadow-xl hover:shadow-brand-crimson/30 hover:-translate-y-0.5 transition-all duration-300 text-center"
          >
            Explore Our Club
          </a>
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-4 rounded-full font-heading font-bold text-sm bg-white hover:bg-bg-secondary border border-text-primary/5 hover:border-text-primary/15 text-text-primary shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-center"
          >
            Club Projects
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
