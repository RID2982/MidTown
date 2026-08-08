import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { District } from '../components/District';
import { ClubAbout } from '../components/ClubAbout';
import { Projects } from '../components/Projects';
import { TeamSlider } from '../components/TeamSlider';
import { FAQ } from '../components/FAQ';
import { Support } from '../components/Support';
import { Footer } from '../components/Footer';

// Header's nav links always point to "/#section" (via React Router's Link),
// so they work identically whether you're already on the home page or
// navigating in from /roster or /projects. React Router doesn't scroll to a
// URL hash the way plain <a href="#..."> navigation does (it's just a
// client-side history push), so this fills that gap — and accounts for the
// fixed header's height, which a native anchor scroll wouldn't either.
const HEADER_OFFSET = 96;

function useHashScroll() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  }, [hash]);
}

export const HomePage: React.FC = () => {
  useHashScroll();

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen relative font-sans selection:bg-brand-crimson selection:text-text-primary">
      {/* Background radial overlays */}
      <div className="radial-glow top-[10%] left-[5%]" />
      <div className="radial-glow-2 top-[40%] right-[5%]" />
      <div className="radial-glow bottom-[15%] left-[20%]" />

      {/* Floating Header */}
      <Header />

      {/* Hero Banner */}
      <Hero />

      {/* RID 2982 details */}
      <District />

      {/* Salem Midtown club about details */}
      <ClubAbout />

      {/* Club Projects Timeline & Progress Bar */}
      <Projects />

      {/* Leadership board carousel slider */}
      <TeamSlider />

      {/* Frequently asked questions */}
      <FAQ />

      {/* Support ticketing desk */}
      <Support />

      {/* Footer copyright section */}
      <Footer />
    </div>
  );
};
