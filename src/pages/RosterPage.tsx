import { motion } from 'framer-motion';
import { MEMBERS } from '../data/members';
import { CardVisual } from '../components/MemberCardVisual';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { VelocityMarquee } from '../components/VelocityMarquee';

const MARQUEE_ROWS = [
  { items: [{ text: 'President', bold: true }, { text: 'Vice President', outline: true }, { text: 'Secretary', bold: true }, { text: 'Treasurer', outline: true }, { text: 'Sergeant at Arms', bold: true }, { text: 'Club Service Director', outline: true }, { text: 'Community Service Director', bold: true }, { text: 'Professional Service Director', outline: true }, { text: 'International Service Director', bold: true }, { text: 'Public Image Director', outline: true }, { text: 'Project Chairs', bold: true }, { text: 'Committee Chairs', outline: true }, { text: 'Event Chairs', bold: true }, { text: 'Proud Rotaract Members', outline: true }], velocity: 45 }
];

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
    <div className="bg-bg-primary text-text-primary min-h-screen relative font-sans selection:bg-brand-crimson selection:text-text-primary">
      {/* The real site Header, not a bespoke lookalike — its nav Links all
          point to "/#section" and HomePage's useHashScroll handles getting
          there and scrolling correctly from any page, including this one. */}
      <Header />

      {/* pt-28 clears the fixed Header (it's out of normal document flow) */}
      <section className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 pt-28 pb-16 relative z-10">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-crimson/5 rounded-full blur-3xl pointer-events-none" />

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

        {/* Full-bleed dark strip, broken out of this section's max-w
            container. Speed reacts to how fast you're actually scrolling —
            try it. */}
        <VelocityMarquee
          rows={MARQUEE_ROWS}
          className="w-screen relative left-1/2 -translate-x-1/2 bg-theme-dark py-6 mb-16"
        />

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
