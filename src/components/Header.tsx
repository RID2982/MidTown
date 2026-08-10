import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoMark from '../assets/2.svg';
const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'district', label: 'RID 2982' },
  { id: 'about', label: 'Our Club' },
  { id: 'projects', label: 'Projects' },
  { id: 'team', label: 'Club Members' },
  { id: 'support', label: 'Support' },
];

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');

  // Scroll-spy: highlight whichever section is currently centered in the
  // viewport, rather than just reacting to clicks.
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const desktopLinkClass = (id: string) =>
    `nav-pill relative flex flex-col items-center justify-center h-6 shrink-0 overflow-hidden rounded-full px-3 -mx-3 font-heading text-xs font-bold uppercase tracking-wider transition-colors duration-300 hover:text-white focus-visible:text-white ${
      activeId === id ? 'text-theme-blue' : 'text-white/60'
    }`;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-theme-dark/90 backdrop-blur-md border-b border-white/10 px-6 py-4">
      <div className="w-full max-w-[1550px] mx-auto grid grid-cols-3 items-center">
        {/* Left Col: Desktop Navigation Menu. shrink-0 on each link plus a
            tighter gap keeps every label (notably "Club Members" and
            "RID 2982") fully on-screen at desktop widths instead of being
            silently compressed and clipped by the link's own overflow-hidden
            (needed for the hover text-swap effect) — flex items shrink below
            their content width by default, and getBoundingClientRect() on
            the clipped element doesn't reveal that visually. */}
        <nav className="hidden md:flex items-center gap-5 justify-start">
          {NAV_ITEMS.map((item) => (
            <Link key={item.id} to={`/#${item.id}`} className={desktopLinkClass(item.id)}>
              <span className="menu-link-container h-5 overflow-hidden">
                <span className="menu-link-text block h-5 shrink-0 transition-transform duration-300">{item.label}</span>
                <span className="menu-link-text block h-5 shrink-0 text-white transition-transform duration-300">{item.label}</span>
              </span>
            </Link>
          ))}
        </nav>

        {/* Center Col: Club Logo (full lockup, unaltered — not cropped) */}
        <Link to="/" className="flex justify-start md:justify-center items-center">
          <img src={logoMark} alt="Rotaract Club of Salem Midtown" className="h-16 w-auto object-contain shrink-0" />
        </Link>

        {/* Right Col: CTA Button & Mobile Trigger */}
        <div className="flex justify-end items-center gap-4">
          <Link
            to="/#support"
            className="hidden sm:inline-flex px-6 py-2.5 rounded-full font-heading font-extrabold text-[11px] uppercase tracking-wider bg-gradient-to-r from-brand-crimson to-red-800 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Get Support
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex md:hidden items-center justify-center w-10 h-10 rounded-full border border-white/10 text-white hover:text-brand-crimson transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-theme-dark/95 border-b border-white/10 backdrop-blur-2xl p-6 flex flex-col gap-3 md:hidden shadow-lg animate-fade-in">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              to={`/#${item.id}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block font-heading text-sm font-bold uppercase tracking-wider py-3 border-b border-white/5 transition-colors ${
                activeId === item.id ? 'text-brand-crimson' : 'text-white/70 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/#support"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full text-center py-3.5 mt-2 rounded-xl font-heading font-extrabold text-xs uppercase tracking-wider bg-gradient-to-r from-brand-crimson to-red-700 text-white shadow-md transition-all duration-200"
          >
            Get Support
          </Link>
        </div>
      )}
    </header>
  );
};

