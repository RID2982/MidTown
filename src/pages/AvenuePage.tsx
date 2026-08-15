import { useEffect } from 'react';
import { Navigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA, AVENUES, avenueToSlug, slugToAvenue, projectToSlug } from '../data/projects';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ProjectGallery } from '../components/ProjectGallery';

// Placeholder visual per project until real event photos are available —
// same gradient-tile approach used on the home page's featured list.
const GRADIENTS = [
  'from-[#e11d48] to-[#9f1239]',
  'from-brand-navy to-text-primary',
  'from-[#d97706] to-[#92400e]',
  'from-[#059669] to-[#065f46]',
  'from-[#2563eb] to-[#1e40af]',
];

// One dedicated page per avenue of service — matches the pattern on the
// reference club site (each avenue gets its own /projects/:slug page with a
// numbered, large-format list) instead of a single page with filter pills.
export const AvenuePage: React.FC = () => {
  const { avenueSlug } = useParams<{ avenueSlug: string }>();
  const { hash } = useLocation();
  const avenue = avenueSlug ? slugToAvenue(avenueSlug) : undefined;

  // "View Project" on the home page deep-links here with a #project-slug
  // hash so it lands on that one project, not just the avenue in general —
  // but react-router doesn't scroll to a hash on route change the way a
  // real page load would (same gap HomePage's own hook exists for), so
  // this does it manually. No settle-polling needed here unlike that hook:
  // this page has plain document flow, nothing pinned/async-measuring.
  useEffect(() => {
    if (!hash) return;
    const raf = requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => cancelAnimationFrame(raf);
  }, [hash]);

  if (!avenue) {
    return <Navigate to="/#projects" replace />;
  }

  const avenueProjects = PROJECTS_DATA.filter((p) => p.avenue === avenue);
  const currentIndex = AVENUES.indexOf(avenue);
  const prevAvenue = AVENUES[(currentIndex - 1 + AVENUES.length) % AVENUES.length];
  const nextAvenue = AVENUES[(currentIndex + 1) % AVENUES.length];

  return (
    <div className="flex flex-col bg-bg-primary text-text-primary min-h-screen relative font-sans selection:bg-brand-crimson selection:text-text-primary">
      <Header />

      <section className="flex-grow w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-28 pb-16 relative z-10">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-text-muted hover:text-brand-crimson transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          Back to Projects
        </Link>

        <div className="flex flex-col items-start text-left mb-16 max-w-3xl">
          <span className="text-brand-crimson text-xs uppercase font-heading font-extrabold tracking-widest mb-3">
            Avenue of Service
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight text-theme-dark">
            {avenue}
          </h1>
        </div>

        {avenueProjects.length === 0 && (
          <p className="text-text-muted font-sans text-sm mb-12">
            No {avenue} projects published yet — check back soon.
          </p>
        )}

        <div className="flex flex-col gap-20">
          {avenueProjects.map((project, index) => {
            const reversed = index % 2 === 1;
            return (
              <div
                key={project.title}
                id={projectToSlug(project.title)}
                className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-14 scroll-mt-24`}
              >
                <div className="w-full md:w-1/2 shrink-0">
                  <ProjectGallery
                    images={project.images}
                    imagePositions={project.imagePositions}
                    alt={project.title}
                    category={project.category}
                    gradientClass={GRADIENTS[index % GRADIENTS.length]}
                    alignments={project.alignments}
                  />
                </div>
                <div className="w-full md:w-1/2 flex flex-col gap-3">
                  <span className="text-brand-crimson text-xs font-heading font-extrabold uppercase tracking-widest">
                    {String(index + 1).padStart(2, '0')} &middot; {project.avenue}
                  </span>
                  <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-theme-dark leading-tight">
                    {project.title}
                  </h2>
                  <p className="text-sm md:text-base text-text-muted font-sans leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs font-heading font-bold uppercase tracking-wider text-text-muted">
                    <span>{project.date}</span>
                    <span className={project.status === 'Completed' ? 'text-green-600' : 'text-orange-500'}>
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Avenue-to-avenue navigation — the header's Projects dropdown lists
            all 5, but this keeps browsing possible without going back up to
            the nav each time. */}
        <div className="flex justify-between items-center mt-24 pt-8 border-t border-black/5">
          <Link
            to={`/projects/${avenueToSlug(prevAvenue)}`}
            className="text-xs font-heading font-extrabold uppercase tracking-widest text-text-muted hover:text-brand-crimson transition-colors"
          >
            &larr; {prevAvenue}
          </Link>
          <Link
            to={`/projects/${avenueToSlug(nextAvenue)}`}
            className="text-xs font-heading font-extrabold uppercase tracking-widest text-text-muted hover:text-brand-crimson transition-colors"
          >
            {nextAvenue} &rarr;
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};
