import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { MEMBERS } from '../data/members';
import { CardVisual } from '../components/MemberCardVisual';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

// No opacity in "hidden" — see the note in the other section components:
// whileInView never fires without a real scroll event, so gating on
// opacity: 0 would leave cards permanently invisible in a static capture.
const cardVariants = {
  hidden: { y: 30 },
  visible: {
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export const RosterPage: React.FC = () => {
  return (
    <div className="flex flex-col bg-bg-primary text-text-primary min-h-screen relative font-sans selection:bg-brand-crimson selection:text-text-primary">
      {/* The real site Header, not a bespoke lookalike — its nav Links all
          point to "/#section" and HomePage's useHashScroll handles getting
          there and scrolling correctly from any page, including this one. */}
      <Header />

      {/* pt-28 clears the fixed Header (it's out of normal document flow) */}
      <section className="flex-grow w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 pt-28 pb-16 relative z-10">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-crimson/5 rounded-full blur-3xl pointer-events-none" />

        <Link
          to="/#team"
          className="relative inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-text-muted hover:text-brand-crimson transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          Back
        </Link>

        <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto relative">
          <span className="text-brand-crimson text-xs uppercase font-heading font-extrabold tracking-widest mb-3">
            Salem Midtown Board
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight">
            Full Club <span className="bg-gradient-to-r from-brand-crimson to-red-800 bg-clip-text text-transparent">Roster</span>
          </h1>
          <p className="text-text-muted font-sans text-sm md:text-base mt-4 leading-relaxed">
            Every office bearer, avenue director, and project chair leading Salem Midtown for the 2026-27 term.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center relative">
          {MEMBERS.map((member, index) => (
            <motion.div
              key={member.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={cardVariants}
              transition={{ delay: (index % 4) * 0.08 }}
              className="w-full max-w-[300px] h-[460px] hover:scale-[1.02] transition-transform duration-300"
            >
              <CardVisual member={member} />
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};
