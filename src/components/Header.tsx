import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-5 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-text-primary/5 py-4 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-[1800px] mx-auto flex justify-between items-center px-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 font-heading font-bold text-lg text-text-primary tracking-wide">
          <div className="w-9 h-9 rounded-full border border-dashed border-brand-crimson bg-brand-crimson/5 flex items-center justify-center">
            <span className="text-brand-crimson text-xs font-bold font-heading">SM</span>
          </div>
          <span>Salem Midtown</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 font-heading text-sm font-semibold text-text-muted">
            <li>
              <a href="#home" className="hover:text-brand-crimson transition-colors duration-200">
                Home
              </a>
            </li>
            <li>
              <a href="#district" className="hover:text-brand-crimson transition-colors duration-200">
                RID 2982
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-brand-crimson transition-colors duration-200">
                Our Club
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:text-brand-crimson transition-colors duration-200">
                Projects
              </a>
            </li>
            <li>
              <a href="#team" className="hover:text-brand-crimson transition-colors duration-200">
                Leadership
              </a>
            </li>
            <li>
              <a href="#support" className="hover:text-brand-crimson transition-colors duration-200">
                Support
              </a>
            </li>
          </ul>
        </nav>

        {/* Header Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#support"
            className="px-5 py-2.5 rounded-full text-xs font-heading font-bold border border-text-primary/5 hover:border-brand-crimson/20 bg-text-primary/2 hover:bg-brand-crimson/5 text-text-primary hover:text-brand-crimson transition-all duration-200"
          >
            Get Support
          </a>
        </div>

        {/* Mobile Nav Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="block md:hidden text-text-primary hover:text-brand-crimson transition-colors"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 border-b border-text-primary/5 backdrop-blur-2xl p-6 flex flex-col gap-6 md:hidden shadow-lg">
          <ul className="flex flex-col gap-4 font-heading text-base font-bold text-text-muted">
            <li>
              <a
                href="#home"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-brand-crimson block transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#district"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-brand-crimson block transition-colors"
              >
                RID 2982
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-brand-crimson block transition-colors"
              >
                Our Club
              </a>
            </li>
            <li>
              <a
                href="#references"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-brand-crimson block transition-colors"
              >
                References
              </a>
            </li>
            <li>
              <a
                href="#team"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-brand-crimson block transition-colors"
              >
                Leadership
              </a>
            </li>
            <li>
              <a
                href="#support"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-brand-crimson block transition-colors"
              >
                Support
              </a>
            </li>
          </ul>
          <a
            href="#support"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full text-center py-3.5 rounded-2xl font-heading font-bold bg-gradient-to-r from-brand-crimson to-red-700 hover:from-brand-crimson/95 hover:to-red-650 text-text-primary text-sm shadow-md shadow-brand-crimson/20 transition-all duration-200"
          >
            Get Support
          </a>
        </div>
      )}
    </header>
  );
};
