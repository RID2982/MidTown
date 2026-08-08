import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LEADERS } from '../data/members';
import type { Member } from '../data/members';
import { CardVisual } from './MemberCardVisual';

// Leadership duo — President + Secretary, always visible. Cards sit directly
// on the section background, no bordered/shadowed frame around them.
const LeadershipDuo: React.FC<{ members: Member[] }> = ({ members }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
    {members.map((member, index) => (
      <motion.div
        key={member.name}
        initial={{ y: 40 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.12 }}
        className="w-full h-[440px] md:h-[480px] hover:scale-[1.02] transition-transform duration-300"
      >
        <CardVisual member={member} />
      </motion.div>
    ))}
  </div>
);

export const TeamSlider: React.FC = () => {
  return (
    <section id="team" className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 py-20 relative z-10 bg-bg-secondary">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-crimson/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">

        {/* Left Column: Title */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="text-brand-crimson text-xs uppercase font-heading font-extrabold tracking-widest">
            Salem Midtown Board
          </div>

          <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight overflow-hidden pb-1">
            <motion.span
              initial={{ y: 24 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
              className="block"
            >
              Our Club <span className="bg-gradient-to-r from-brand-crimson to-red-800 bg-clip-text text-transparent">Members</span>
            </motion.span>
          </h2>

          <motion.div
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-6 mt-2"
          >
            <p className="text-sm italic text-text-muted font-sans leading-relaxed">
              "Alone we can do so little; together we can do so much. Leadership is the capacity to translate vision into reality."
            </p>
            <div className="text-[10px] uppercase font-bold text-brand-gold mt-4 text-right">
              — Rotaract Core Values
            </div>
          </motion.div>

          <p className="text-xs md:text-sm text-text-muted font-sans leading-relaxed">
            Meet our President and Secretary here — the rest of the board is one click away.
          </p>

          <Link
            to="/roster"
            className="self-start mt-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand-crimson to-red-800 hover:from-brand-crimson/95 hover:to-red-755 text-white font-heading font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300"
          >
            View Full Roster
          </Link>
        </div>

        {/* Right Column: Leadership duo */}
        <div className="lg:col-span-8 w-full">
          <LeadershipDuo members={LEADERS} />
        </div>
      </div>
    </section>
  );
};
