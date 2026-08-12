import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import logoMark from '../assets/2.svg';
import { AVENUES, avenueToSlug } from '../data/projects';
// "Support" isn't in this list — it had its own nav pill AND the "Get
// Support" CTA button right next to it, both going to the same section.
// The CTA alone covers it; NAV_ITEMS also doubles as the scroll-spy list
// (below), so removing it here removes the duplicate from both the
// desktop nav and the mobile drawer in one place.
const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'district', label: 'RID 2982' },
  { id: 'values', label: 'Our Values' },
  { id: 'about', label: 'Our Club' },
  { id: 'projects', label: 'Projects' },
  { id: 'team', label: 'Club Members' },
];

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProjectsOpen, setIsMobileProjectsOpen] = useState(false);
  const [isDesktopProjectsOpen, setIsDesktopProjectsOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const desktopProjectsRef = useRef<HTMLDivElement>(null);

  // The desktop "Projects" flyout is normally group-hover only, which
  // works for a mouse but is unreachable on a touch device at md+ width
  // (a tablet in portrait, for instance — it's the same md breakpoint
  // that switches from the mobile drawer to this desktop nav, and touch
  // doesn't hover). The chevron below is a real tap target that toggles
  // isDesktopProjectsOpen alongside the hover behaviour, so both work;
  // this just closes it again on an outside tap, since it no longer
  // closes itself the way a pure :hover flyout would.
  useEffect(() => {
    if (!isDesktopProjectsOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!desktopProjectsRef.current?.contains(e.target as Node)) {
        setIsDesktopProjectsOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [isDesktopProjectsOpen]);

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

  // Condense the header pill slightly once the page has scrolled — keeps it
  // feeling like part of the page rather than a static floating panel.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const desktopLinkClass = (id: string) =>
    `nav-pill relative flex flex-col items-center justify-center h-6 shrink-0 overflow-hidden rounded-full px-3 -mx-3 font-heading text-xs font-bold uppercase tracking-wider transition-colors duration-300 hover:text-white focus-visible:text-white ${
      activeId === id ? 'nav-pill-active text-white' : 'text-white/60'
    }`;

  return (
    <header className="fixed top-4 left-0 w-full z-100 px-4 md:px-6">
      <div
        className={`w-full max-w-[1300px] mx-auto grid grid-cols-3 items-center rounded-full bg-theme-dark/90 backdrop-blur-md border border-white/10 shadow-lg shadow-black/20 px-6 transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-3'
        }`}
      >
        {/* Left Col: Club Logo (full lockup, unaltered — not cropped) */}
        <Link to="/" className="flex justify-start items-center">
          <img
            src={logoMark}
            alt="Rotaract Club of Salem Midtown"
            className={`w-auto object-contain shrink-0 transition-all duration-300 ${isScrolled ? 'h-10' : 'h-12'}`}
          />
        </Link>

        {/* Center Col: Desktop Navigation Menu. shrink-0 on each link plus a
            tighter gap keeps every label (notably "Club Members" and
            "RID 2982") fully on-screen at desktop widths instead of being
            silently compressed and clipped by the link's own overflow-hidden
            (needed for the pink select-fill effect). Selection is shown by
            the pink background fill alone (.nav-pill::before) — no text
            motion. */}
        <nav className="hidden md:flex items-center gap-5 justify-center">
          {NAV_ITEMS.map((item) =>
            item.id === 'projects' ? (
              // Hover-revealed on a mouse, and ALSO tap-toggled via the
              // chevron button for touch devices at this width (see
              // isDesktopProjectsOpen above) — avenues jump straight to
              // their dedicated /projects/:slug page rather than the
              // /projects hub. Clicking the "Projects" label itself still
              // scrolls to the on-page section like every other nav item;
              // it's a separate element from the chevron now specifically
              // so tapping the chevron doesn't also navigate away.
              <div key={item.id} ref={desktopProjectsRef} className="relative group">
                <div className={`${desktopLinkClass(item.id)} flex-row! gap-1`}>
                  <Link to={`/#${item.id}`} className="h-5 flex items-center">
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsDesktopProjectsOpen((open) => !open)}
                    aria-label="Toggle avenues list"
                    className="h-5 flex items-center cursor-pointer"
                  >
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-200 group-hover:rotate-180 ${isDesktopProjectsOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                    isDesktopProjectsOpen
                      ? 'opacity-100 visible translate-y-0'
                      : 'opacity-0 invisible -translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'
                  }`}
                >
                  <div className="w-56 rounded-2xl bg-theme-dark/95 backdrop-blur-md border border-white/10 shadow-lg p-2 flex flex-col gap-1">
                    {AVENUES.map((avenue) => (
                      <Link
                        key={avenue}
                        to={`/projects/${avenueToSlug(avenue)}`}
                        onClick={() => setIsDesktopProjectsOpen(false)}
                        className="px-4 py-2.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        {avenue}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={item.id} to={`/#${item.id}`} className={desktopLinkClass(item.id)}>
                <span className="h-5 flex items-center">{item.label}</span>
              </Link>
            )
          )}
        </nav>

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

      {/* Mobile Drawer. It's a descendant of the `fixed` header, so it's
          pinned to the viewport rather than part of the scrollable
          document — with the "Projects" avenues expanded plus the CTA,
          this can run past 400px tall, so on a short/landscape phone
          viewport it needs its own scroll rather than letting content
          render below the visible screen with no way to reach it. */}
      {isMobileMenuOpen && (
        <div className="absolute top-[calc(100%+8px)] left-4 right-4 md:left-6 md:right-6 max-h-[calc(100svh-6rem)] overflow-y-auto rounded-3xl bg-theme-dark/95 border border-white/10 backdrop-blur-2xl p-6 flex flex-col gap-3 md:hidden shadow-lg animate-fade-in">
          {NAV_ITEMS.map((item) =>
            item.id === 'projects' ? (
              // No hover on touch devices, so "Projects" expands its avenue
              // list in place via a separate chevron button — the label
              // itself still navigates to the on-page section.
              <div key={item.id} className="border-b border-white/5">
                <div className="flex items-center justify-between py-3">
                  <Link
                    to={`/#${item.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-heading text-sm font-bold uppercase tracking-wider transition-colors ${
                      activeId === item.id ? 'text-brand-crimson' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsMobileProjectsOpen((open) => !open)}
                    aria-label="Toggle avenues list"
                    className="p-2 -m-2 text-white/50 hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${isMobileProjectsOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
                {isMobileProjectsOpen && (
                  <div className="flex flex-col gap-1 pb-3 pl-4">
                    {AVENUES.map((avenue) => (
                      <Link
                        key={avenue}
                        to={`/projects/${avenueToSlug(avenue)}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="py-2 text-xs font-heading font-bold uppercase tracking-wider text-white/60 hover:text-white transition-colors"
                      >
                        {avenue}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
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
            )
          )}
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

