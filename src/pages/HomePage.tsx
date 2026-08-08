import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { District } from '../components/District';
import { ClubAbout } from '../components/ClubAbout';
import { Projects } from '../components/Projects';
import { TeamSlider } from '../components/TeamSlider';
import { FAQ } from '../components/FAQ';
import { Support } from '../components/Support';
import { Footer } from '../components/Footer';

export const HomePage: React.FC = () => {
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
