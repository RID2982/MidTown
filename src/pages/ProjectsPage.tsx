import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS_DATA, AVENUES, avenueToSlug } from '../data/projects';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const AVENUE_DESCRIPTIONS: Record<string, string> = {
  'Club Service': 'Fellowship, internal growth, and the projects that keep the club itself running strong.',
  'Community Service': 'Blood drives, environment work, and welfare projects for Salem’s wider community.',
  'Professional Service': 'Skill-building, career readiness, and literacy programs for students and young professionals.',
  'International Service': 'Building ties and joint initiatives with Rotaract clubs beyond Salem.',
  'Public Image': 'Telling the story of what the club does, and why it matters.',
};

// Hub page: one entry per avenue of service, each linking to its own
// dedicated /projects/:avenue page (see AvenuePage.tsx) — replaces the old
// single filterable listing.
export const ProjectsPage: React.FC = () => {
  const completedCount = PROJECTS_DATA.filter((p) => p.status === 'Completed').length;

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen relative font-sans selection:bg-brand-crimson selection:text-text-primary">
      <Header />

      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-28 pb-16 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto relative">
          <span className="text-brand-crimson text-xs uppercase font-heading font-extrabold tracking-widest mb-3">
            Impact Tracker
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight">
            Our <span className="bg-gradient-to-r from-brand-crimson to-red-800 bg-clip-text text-transparent">Avenues of Service</span>
          </h1>
          <p className="text-text-muted font-sans text-sm md:text-base mt-4 leading-relaxed">
            {completedCount} of {PROJECTS_DATA.length} projects completed — browse by avenue to see the full story.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {AVENUES.map((avenue) => {
            const count = PROJECTS_DATA.filter((p) => p.avenue === avenue).length;
            return (
              <Link
                key={avenue}
                to={`/projects/${avenueToSlug(avenue)}`}
                className="group flex flex-col justify-between gap-8 rounded-3xl border border-black/5 bg-bg-secondary hover-beige-gradient p-8 transition-all duration-300 shadow-sm"
              >
                <div className="flex flex-col gap-2">
                  <h2 className="font-heading font-extrabold text-xl md:text-2xl text-theme-dark">
                    {avenue}
                  </h2>
                  <p className="text-xs md:text-sm text-text-muted font-sans leading-relaxed">
                    {AVENUE_DESCRIPTIONS[avenue]}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[10px] font-heading font-extrabold uppercase tracking-widest text-text-muted">
                  <span>{count} project{count === 1 ? '' : 's'}</span>
                  <span className="flex items-center gap-1 text-brand-crimson group-hover:translate-x-0.5 transition-transform">
                    View
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
};
