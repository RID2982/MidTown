import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
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
  const completedCount = PROJECTS_DATA.filter((p) => p.status === 'Completed').length;

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen relative font-sans selection:bg-brand-crimson selection:text-text-primary">
      {/* Minimal top bar — same purpose-built pattern as the roster page,
          since the site Header's nav links are in-page anchors that only
          resolve on the home page. */}
      <header className="w-full border-b border-text-primary/5 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="w-full max-w-[1800px] mx-auto flex items-center justify-between px-6 md:px-12 lg:px-16 py-5">
          <Link to="/" className="flex items-center gap-3 font-heading font-bold text-lg text-text-primary tracking-wide">
            <div className="w-9 h-9 rounded-full border border-dashed border-brand-crimson bg-brand-crimson/5 flex items-center justify-center">
              <span className="text-brand-crimson text-xs font-bold font-heading">SM</span>
            </div>
            <span>Salem Midtown</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-heading font-bold border border-text-primary/5 hover:border-brand-crimson/20 bg-text-primary/2 hover:bg-brand-crimson/5 text-text-primary hover:text-brand-crimson transition-all duration-200"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      <section className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 py-16 relative z-10">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto relative">
          {PROJECTS_DATA.map((project, index) => (
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
