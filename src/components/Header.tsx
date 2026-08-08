import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoMark from '../assets/logo-mark.png';

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
    `px-4 py-2 rounded-full font-heading text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
      activeId === id
        ? 'bg-gradient-to-r from-brand-crimson to-red-800 text-white shadow-md shadow-brand-crimson/25'
        : 'text-text-muted hover:text-brand-crimson'
    }`;

  const mobileLinkClass = (id: string) =>
    `block font-heading text-base font-bold rounded-2xl px-4 py-3 transition-colors ${
      activeId === id
        ? 'bg-gradient-to-r from-brand-crimson to-red-800 text-white'
        : 'text-text-muted hover:text-brand-crimson'
    }`;

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-4">
      <div className="w-full max-w-[1800px] mx-auto flex justify-between items-center gap-4">
        {/* Logo — its own floating pill, separate from the nav */}
        <div className="flex items-center gap-2.5 pl-3 pr-5 py-2 rounded-full bg-white/90 backdrop-blur-xl border border-text-primary/5 shadow-sm">
          <img src={logoMark} alt="Rotary International emblem" className="w-8 h-8 object-contain shrink-0" />
          <span className="font-heading font-bold text-base text-text-primary tracking-wide whitespace-nowrap">
            Rotaract club of Salem Midtown
          </span>
        </div>

        {/* Nav — a second, separate floating pill */}
        <nav className="hidden md:flex items-center gap-1 px-2 py-2 rounded-full bg-white/90 backdrop-blur-xl border border-text-primary/5 shadow-sm">
          {NAV_ITEMS.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={desktopLinkClass(item.id)}>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Nav Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex md:hidden items-center justify-center w-11 h-11 rounded-full bg-white/90 backdrop-blur-xl border border-text-primary/5 shadow-sm text-text-primary hover:text-brand-crimson transition-colors cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="mt-3 w-full max-w-[1800px] mx-auto bg-white/95 border border-text-primary/5 backdrop-blur-2xl rounded-3xl p-6 flex flex-col gap-3 md:hidden shadow-lg">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileLinkClass(item.id)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#support"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full text-center py-3.5 mt-1 rounded-2xl font-heading font-bold bg-gradient-to-r from-brand-crimson to-red-700 hover:from-brand-crimson/95 hover:to-red-650 text-white text-sm shadow-md shadow-brand-crimson/20 transition-all duration-200"
          >
            Get Support
          </a>
        </div>
      )}
    </header>
  );
};
