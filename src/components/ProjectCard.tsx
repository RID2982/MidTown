import React from 'react';
import { ArrowUpRight, Calendar } from 'lucide-react';
import type { Project } from '../data/projects';

// Shared project card visual — used by both the home page's featured
// projects and the full /projects listing page.
export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="glass-card hover-beige-gradient rounded-3xl p-6 flex flex-col justify-between shadow-sm h-full">
    <div>
      <div className="flex justify-between items-start mb-4">
        <span className="inline-block px-3 py-1 bg-brand-gold/5 border border-brand-gold/10 rounded-full text-[10px] font-heading font-extrabold uppercase tracking-wider text-brand-gold">
          {project.category}
        </span>
        <span
          className={`inline-flex items-center gap-1 text-[10px] font-heading font-extrabold uppercase tracking-wider ${
            project.status === 'Completed' ? 'text-green-600' : 'text-orange-500 animate-pulse'
          }`}
        >
          {project.status}
        </span>
      </div>

      <h3 className="text-lg font-heading font-bold text-text-primary mb-2">
        {project.title}
      </h3>
      <p className="text-xs text-text-muted font-sans leading-relaxed mb-6">
        {project.description}
      </p>
    </div>

    <div className="flex items-center justify-between border-t border-text-primary/5 pt-4 text-[10px] text-text-muted font-heading font-bold">
      <span className="flex items-center gap-1.5">
        <Calendar size={12} className="opacity-50" />
        <span>{project.date}</span>
      </span>
      <span className="flex items-center gap-1 text-brand-crimson group cursor-pointer">
        <span>View Details</span>
        <ArrowUpRight size={12} className="transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </div>
  </div>
);
