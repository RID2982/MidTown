import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { FEATURED_PROJECTS, avenueToSlug } from '../data/projects';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const Projects: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // No opacity, and a small px offset rather than a full-height mask —
      // see the note in ClubAbout.tsx.
      if (titleRef.current) {
        const split = new SplitText(titleRef.current, { type: 'lines,words' });

        gsap.from(split.words, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 24,
          stagger: 0.03,
          duration: 1,
          ease: 'power3.out',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // Reveal cards on scroll into view — mount-once, not tied to any filter
  // state now that this section always shows the fixed FEATURED_PROJECTS
  // list (see data/projects.ts: "The home page shows only these").
  useEffect(() => {
    if (!cardsContainerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(cardsContainerRef.current!.children, {
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 30,
        stagger: 0.12,
        duration: 0.6,
        ease: 'power2.out',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="w-full max-w-[1550px] mx-auto px-6 md:px-12 py-24 relative z-10 bg-white">
      <div className="absolute top-10 right-10 w-96 h-96 bg-theme-blue/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header Block matching Crowdix Agenda title layout */}
      <div className="flex flex-col items-center text-center gap-3 mb-16 max-w-2xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-crimson" />
          <span className="text-brand-crimson text-[10px] md:text-xs uppercase tracking-widest font-heading font-extrabold">
            Impact Tracker
          </span>
        </div>
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-display uppercase tracking-tight text-theme-dark"
        >
          Our Project <span className="text-sweep">Lineup</span>
        </h2>
      </div>

      {/* Event Cards List (Vertical List of Horizontal Cards matching Crowdix Event Cards) */}
      <div
        ref={cardsContainerRef}
        className="flex flex-col gap-6 max-w-5xl mx-auto min-h-[300px]"
      >
        {FEATURED_PROJECTS.map((project, index) => {
          // Select placeholder gradients based on index
          const gradients = [
            'from-[#e11d48]/20 to-[#9f1239]/20 border-brand-crimson/10 text-brand-crimson',
            'from-[#d97706]/20 to-[#92400e]/20 border-brand-gold/10 text-brand-gold',
            'from-brand-navy/20 to-text-primary/20 border-brand-navy/10 text-brand-navy'
          ];
          const gradClass = gradients[index % gradients.length];

          return (
            <div 
              key={project.title}
              className="flex flex-col md:flex-row items-stretch gap-6 md:gap-8 rounded-3xl border border-black/5 bg-bg-secondary hover-beige-gradient p-6 transition-all duration-300 shadow-sm"
            >
              {/* Left Side: Date Box (matches event-time-box) */}
              <div className="flex md:flex-col justify-between md:justify-center items-start md:w-[180px] shrink-0 border-b md:border-b-0 md:border-r border-black/5 pb-4 md:pb-0 md:pr-6 gap-2">
                <span className="font-heading font-extrabold text-theme-dark text-xs uppercase tracking-wider">
                  Project Date
                </span>
                <span className="font-display text-2xl text-brand-crimson uppercase leading-none">
                  {project.date}
                </span>
              </div>

              {/* Center Side: Image placeholder box (matches event-image-box) */}
              <div className="w-full md:w-[150px] aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden shrink-0 relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${gradClass} flex items-center justify-center font-heading font-extrabold text-xs uppercase tracking-wider`}>
                  {project.category}
                </div>
              </div>

              {/* Right Side: Content & Actions */}
              <div className="flex-grow flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="inline-block px-3 py-1 bg-brand-navy/5 border border-brand-navy/10 rounded-full text-[9px] font-heading font-extrabold uppercase tracking-wider text-brand-navy">
                      {project.category}
                    </span>
                    <span className={`text-[10px] font-heading font-extrabold uppercase tracking-wider ${
                      project.status === 'Completed' ? 'text-green-600' : 'text-orange-500'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <h3 className="font-heading font-extrabold text-lg md:text-xl text-theme-dark leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs md:text-sm text-text-muted font-sans leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex justify-end pt-2">
                  <Link
                    to={`/projects/${avenueToSlug(project.avenue)}`}
                    className="flex items-center gap-1.5 text-[10px] font-heading font-extrabold uppercase tracking-widest text-brand-crimson hover:opacity-80 transition-opacity"
                  >
                    <span>View Project</span>
                    <ArrowUpRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Roster Redirect Link */}
      <div className="flex justify-center mt-16">
        <Link
          to="/projects"
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-brand-crimson to-red-800 hover:from-brand-crimson/95 hover:to-red-755 text-white font-heading font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-brand-crimson/20 hover:shadow-xl hover:shadow-brand-crimson/30 hover:-translate-y-0.5 transition-all duration-300"
        >
          View All Projects
        </Link>
      </div>
    </section>
  );
};
