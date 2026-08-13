import { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { District } from '../components/District';
import { Scene } from '../components/Scene';
import { RotaractValues } from '../components/RotaractValues';
import { ClubAbout } from '../components/ClubAbout';
import { Projects, type ProjectsHandle } from '../components/Projects';
import { MemberShowcase, type MemberShowcaseHandle } from '../components/MemberShowcase';
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

// Stashed by the inline script in index.html on a hard load with a hash
// already in the URL (e.g. opening /#about directly) — see that script's
// comment for why the browser's own native fragment jump can't be trusted
// on this page and gets pre-empted before it fires.
declare global {
  interface Window {
    __pendingHash?: string;
  }
}

/**
 * Two things have to happen after the page's layout settles, and they have
 * to happen IN THIS ORDER — which is why they share one hook rather than
 * living in two that would race:
 *
 * 1. Refresh every ScrollTrigger. Each Scene measures its own scroll
 *    runway asynchronously (see Scene.tsx), and every runway shifts the
 *    document position of the scenes after it, so a trigger created while
 *    earlier scenes were still measuring is anchored to a stale position.
 *    (Symptom: the Members arc started a full card in, so its first member
 *    never got a centred moment while the section was actually pinned.) A
 *    Scene can't fix this alone — it can't know when the OTHER scenes have
 *    finished — so they're all refreshed together, once.
 *
 * 2. Then, if the URL carries a hash, scroll to it. ScrollTrigger.refresh()
 *    can itself move the scroll position, so doing this first would have
 *    the scroll immediately undone.
 *
 * Both wait on the same signal: the document height going quiet. Polling
 * for that beats a fixed delay, which would be fragile across devices and
 * section counts.
 */
function useSettleThenHashScroll() {
  const { hash: routerHash } = useLocation();
  // On the very first render after a hard load, react-router's own hash is
  // whatever index.html's inline script left behind — which is nothing,
  // since that script strips it before React (and thus the router) ever
  // sees it. The stashed value fills that gap for this one case; every
  // later hash change (clicking a nav link) already comes through
  // react-router normally and doesn't need it.
  const hash = routerHash || window.__pendingHash || '';

  useEffect(() => {
    let cancelled = false;
    let lastHeight = -1;
    let stableFrames = 0;
    let attempts = 0;
    const MAX_ATTEMPTS = 180; // ~3s at 60fps, safety cutoff

    const tick = () => {
      if (cancelled) return;
      attempts += 1;
      const height = document.body.scrollHeight;
      stableFrames = height === lastHeight ? stableFrames + 1 : 0;
      lastHeight = height;

      if (stableFrames < 5 && attempts < MAX_ATTEMPTS) {
        requestAnimationFrame(tick);
        return;
      }

      ScrollTrigger.refresh();

      if (!hash) return;
      const el = document.getElementById(hash.slice(1));
      if (!el) return;

      // Consumed — clear the stashed value so it can't leak into some
      // later effect run that has a genuinely empty hash (e.g. clicking
      // the logo back home). The hash stays in the URL itself, on purpose:
      // Back from a child page (an avenue page, /roster) is supposed to
      // return to the section you were on, not the hero — see the comment
      // on the "View Project" / "View All Members" links, which are what
      // actually guarantee that hash is there to return to.
      window.__pendingHash = undefined;

      // Every measurement of a position:sticky section is relative to
      // wherever it's CURRENTLY stuck — getBoundingClientRect() and
      // offsetTop alike both report a stuck section at the viewport top
      // rather than at its real place in the document, and the browser's
      // own native fragment jump has usually already moved scrollY by now
      // too. Both are only trustworthy from an unstuck page, so: reset to
      // the top first (instantly, before paint), let layout settle one
      // frame with nothing stuck, and only then measure and scroll.
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

      requestAnimationFrame(() => {
        if (cancelled) return;

        // Landing on a section this deep isn't just one measurement: with
        // 6+ Scenes all mounting at once, each one's own ResizeObserver can
        // still be settling and calling ScrollTrigger.refresh() on its own
        // schedule for a bit after ours already ran. A refresh mid-flight
        // silently aborts the browser's in-progress smooth scroll — no
        // error, no jump, it just stops wherever it happened to be
        // (observed: stalling around 100–150px into an 800+ vh page and
        // never resuming). Checked every 120ms rather than every frame —
        // often enough to catch a stall quickly, seldom enough that it
        // doesn't cut the animation off before it's had a chance to build
        // any speed.
        let elapsed = 0;
        const CHECK_MS = 120;
        const MAX_MS = 6000;
        const settle = () => {
          if (cancelled) return;
          const top = Math.max(0, el.getBoundingClientRect().top - HEADER_OFFSET);
          if (Math.abs(window.scrollY - top) < 2 || elapsed >= MAX_MS) return;
          window.scrollTo({ top, behavior: 'smooth' });
          elapsed += CHECK_MS;
          setTimeout(settle, CHECK_MS);
        };
        settle();
      });
    };

    const raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [hash]);
}

export const HomePage: React.FC = () => {
  useSettleThenHashScroll();
  const memberShowcaseRef = useRef<MemberShowcaseHandle>(null);
  const scrubMemberShowcase = useCallback((p: number) => memberShowcaseRef.current?.render(p), []);
  const projectsRef = useRef<ProjectsHandle>(null);
  const scrubProjects = useCallback((p: number) => projectsRef.current?.render(p), []);

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen relative font-sans selection:bg-brand-crimson selection:text-text-primary">
      {/* Background radial overlays */}
      <div className="radial-glow top-[10%] left-[5%]" />
      <div className="radial-glow-2 top-[40%] right-[5%]" />
      <div className="radial-glow bottom-[15%] left-[20%]" />

      {/* Floating Header */}
      <Header />

      {/* Sticky-overlap stack: each section is a full screen that stays
          pinned until fully read, then the next one rises and covers it
          (see Scene.tsx). Sections taller than one screen reveal their
          own rest via a scroll-driven internal pan across a dedicated
          runway — never a nested scrollbar, never a static overlap that
          hides part of the content before you get to it. Stops after
          Support: Footer is the page's plain resting state, not another
          frame to cover or be covered. */}
      <div className="relative">
        <Scene zIndex={10} bg="bg-theme-dark">
          <Hero />
        </Scene>
        <Scene zIndex={20} bg="bg-white">
          <District />
        </Scene>
        <Scene zIndex={25} bg="bg-white">
          <RotaractValues />
        </Scene>
        <Scene zIndex={30} bg="bg-white">
          <ClubAbout />
        </Scene>
        <Scene zIndex={40} bg="bg-white" runwayVh={3.5} onScrub={scrubProjects}>
          <Projects ref={projectsRef} />
        </Scene>
        <Scene
          zIndex={50}
          bg="bg-bg-secondary"
          runwayVh={3.5}
          onScrub={scrubMemberShowcase}
        >
          <MemberShowcase ref={memberShowcaseRef} />
        </Scene>
        <Scene zIndex={60} bg="bg-white">
          <FAQ />
        </Scene>
        <Scene zIndex={70} bg="bg-theme-dark">
          <Support />
        </Scene>
      </div>

      {/* Footer copyright section — plain flow, the page's resting state */}
      <Footer />
    </div>
  );
};
