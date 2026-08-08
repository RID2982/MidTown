import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { LEADERS } from '../data/members';
import type { Member } from '../data/members';

gsap.registerPlugin(ScrollTrigger, SplitText);

const MemberCard: React.FC<{ member: Member }> = ({ member }) => (
  <div className="flex flex-col gap-4 group w-full">
    {/* Rectangular Image Container (matches Webflow speaker team-image-box) */}
    <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-gradient-to-b from-brand-navy to-text-primary border border-black/5 shadow-md">
      {/* Photo Placeholder */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 transition-transform duration-500 group-hover:scale-105">
        <div className="w-16 h-16 rounded-full border border-dashed border-white/20 flex items-center justify-center text-white/40 mb-3 bg-white/5 shadow-inner">
          <User size={28} className="opacity-40" />
        </div>
        <span className="text-[10px] text-white/30 uppercase tracking-widest font-heading font-extrabold">
          {member.photoSlot}
        </span>
      </div>

      {/* Floating Detail Overlay on Hover (matches Webflow team-float-text-box) */}
      <div className="absolute inset-0 bg-theme-dark/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
        <div className="scale-0 group-hover:scale-100 transition-transform duration-350 border border-white/20 bg-white/5 px-4 py-2.5 rounded-full">
          <p className="text-[9px] uppercase tracking-[0.15em] font-heading font-extrabold text-theme-blue text-center max-w-[140px] truncate-3-lines">
            "{member.quote || 'Active Member'}"
          </p>
        </div>
      </div>
    </div>

    {/* Content: Name & Role/Designation (matches team-content) */}
    <div className="flex flex-col gap-1 pl-1">
      <h3 className="font-heading font-extrabold text-lg text-theme-dark tracking-wide transition-colors duration-300 group-hover:text-brand-crimson">
        {member.name}
      </h3>
      <p className="text-xs text-text-muted font-sans font-semibold uppercase tracking-wider">
        {member.role}
      </p>
    </div>
  </div>
);

const LeadershipDuo: React.FC<{ members: Member[] }> = ({ members }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
    {members.map((member) => (
      <MemberCard key={member.name} member={member} />
    ))}
  </div>
);

export const TeamSlider: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

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

      // Left Column elements stagger reveal
      if (leftColRef.current) {
        gsap.from(leftColRef.current.children, {
          scrollTrigger: {
            trigger: leftColRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 40,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      // Right Column cards fade-in
      if (rightColRef.current) {
        gsap.from(rightColRef.current, {
          scrollTrigger: {
            trigger: rightColRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 50,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="team" className="w-full max-w-[1550px] mx-auto px-6 md:px-12 py-24 relative z-10 bg-bg-secondary rounded-[3rem]">
      {/* Background Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-crimson/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative">
        {/* Left Column: Heading and Description styled like Crowdix partners left panel */}
        <div ref={leftColRef} className="lg:col-span-4 flex flex-col gap-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-crimson" />
            <span className="text-brand-crimson text-[10px] md:text-xs uppercase tracking-widest font-heading font-extrabold">
              Salem Midtown Board
            </span>
          </div>

          <h2 
            ref={titleRef} 
            className="text-4xl md:text-5xl font-display uppercase tracking-tight text-theme-dark"
          >
            Meet Our <span className="text-sweep">Club Members</span>
          </h2>

          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <p className="text-sm italic text-text-muted font-sans leading-relaxed">
              "Alone we can do so little; together we can do so much. Leadership is the capacity to translate vision into reality."
            </p>
            <div className="text-[10px] uppercase font-bold text-brand-gold mt-4 text-right">
              — Rotaract Core Values
            </div>
          </div>

          <p className="text-xs md:text-sm text-text-muted font-sans leading-relaxed">
            Meet our President and Secretary here — the rest of our dedicated board is one click away.
          </p>

          <Link
            to="/roster"
            className="self-start mt-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-brand-crimson to-red-800 text-white font-heading font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-brand-crimson/10 hover:shadow-xl hover:shadow-brand-crimson/25 hover:-translate-y-0.5 transition-all duration-300"
          >
            View Full Roster
          </Link>
        </div>

        {/* Right Column: Leadership duo */}
        <div ref={rightColRef} className="lg:col-span-8 w-full">
          <LeadershipDuo members={LEADERS} />
        </div>
      </div>
    </section>
  );
};
