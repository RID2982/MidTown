import { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS_DATA, AVENUES, type Avenue } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

// No opacity in "hidden" — see the note in the other page/section
// components: whileInView never fires without a real scroll event, so
// gating on opacity: 0 would leave cards permanently invisible in a static
// capture.
const cardVariants = {
  hidden: { y: 30 },
  visible: {
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export const ProjectsPage: React.FC = () => {
  const [activeAvenue, setActiveAvenue] = useState<Avenue | 'All'>('All');
  const completedCount = PROJECTS_DATA.filter((p) => p.status === 'Completed').length;
  const visibleProjects = activeAvenue === 'All' ? PROJECTS_DATA : PROJECTS_DATA.filter((p) => p.avenue === activeAvenue);

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen relative font-sans selection:bg-brand-crimson selection:text-text-primary">
      {/* The real site Header, not a bespoke lookalike — its nav Links all
          point to "/#section" and HomePage's useHashScroll handles getting
          there and scrolling correctly from any page, including this one. */}
      <Header />

      {/* pt-28 clears the fixed Header (it's out of normal document flow) */}
      <section className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 pt-28 pb-16 relative z-10">
        <div className="absolute top-10 right-10 w-96 h-96 bg-brand-navy/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto relative">
          <span className="text-brand-crimson text-xs uppercase font-heading font-extrabold tracking-widest mb-3">
            Impact Tracker
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight">
            All Club <span className="bg-gradient-to-r from-brand-crimson to-red-800 bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="text-text-muted font-sans text-sm md:text-base mt-4 leading-relaxed">
            {completedCount} of {PROJECTS_DATA.length} projects completed — every initiative Salem Midtown has run this term.
          </p>
        </div>

        {/* Avenue filter */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12 relative">
          {(['All', ...AVENUES] as const).map((avenue) => (
            <button
              key={avenue}
              onClick={() => setActiveAvenue(avenue)}
              className={`px-4 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeAvenue === avenue
                  ? 'bg-gradient-to-r from-brand-crimson to-red-800 text-white shadow-md shadow-brand-crimson/25'
                  : 'bg-white border border-text-primary/10 text-text-muted hover:border-brand-crimson/30 hover:text-brand-crimson'
              }`}
            >
              {avenue}
            </button>
          ))}
        </div>

        {visibleProjects.length === 0 && (
          <p className="text-center text-text-muted font-sans text-sm mb-12">
            No {activeAvenue} projects yet — check back soon.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto relative">
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={cardVariants}
              transition={{ delay: (index % 3) * 0.08 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};
