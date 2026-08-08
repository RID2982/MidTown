import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FEATURED_PROJECTS } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { useScrollSkew } from '../hooks/useScrollSkew';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const cardVariants = {
  hidden: { y: 30 },
  visible: {
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const }
  }
};

export const Projects: React.FC = () => {
  const headingRef = useScrollSkew<HTMLHeadingElement>();

  return (
    <section id="projects" className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 py-20 relative z-10 bg-white">
      <div className="absolute top-10 right-10 w-96 h-96 bg-brand-navy/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Block */}
      <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
        <span className="text-brand-crimson text-xs uppercase font-heading font-extrabold tracking-widest mb-3">
          Impact Tracker
        </span>
        <h2 ref={headingRef} className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight overflow-hidden pb-1">
          <motion.span
            initial={{ y: 24 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="block"
          >
            Our Club <span className="bg-gradient-to-r from-brand-crimson to-red-800 bg-clip-text text-transparent">Projects</span>
          </motion.span>
        </h2>
        <p className="text-text-muted font-sans text-sm md:text-base mt-4 leading-relaxed">
          From basic health support to green environment drives, we aim to translate club fellowship into life-changing community service.
        </p>
      </div>

      {/* Major projects only — the full registry lives on its own page */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
      >
        {FEATURED_PROJECTS.map((project) => (
          <motion.div key={project.title} variants={cardVariants}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>

      <div className="flex justify-center mt-12">
        <Link
          to="/projects"
          className="px-8 py-4 rounded-full bg-gradient-to-r from-brand-crimson to-red-800 hover:from-brand-crimson/95 hover:to-red-755 text-white font-heading font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300"
        >
          View All Projects
        </Link>
      </div>
    </section>
  );
};
