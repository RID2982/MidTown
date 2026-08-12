import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { FEATURED_PROJECTS, avenueToSlug, projectToSlug } from '../data/projects';
import { SectionHeading } from './SectionHeading';

gsap.registerPlugin(ScrollTrigger, SplitText);

const N = FEATURED_PROJECTS.length;
const pad = (n: number) => String(n).padStart(2, '0');

/* Stack geometry, from the reference site's Experience deck: waiting
 * boards recede UP-and-BACK along a diagonal, and a passed board exits
 * DOWN + back + blur rather than simply disappearing. */
const DEPTH = 3; // how many boards stay visible behind the active one
const UP = 74; // px each waiting board rises — this is what exposes its strip
const RIGHT = 26; // px lateral drift, so the stack reads as a diagonal
const BACK = 96; // px of Z recession per step

// Phones can't spare 74px per step without the stack running off the top,
// so the same geometry is scaled down rather than switched off.
const narrow = () => window.innerWidth < 768;
const geom = () => (narrow() ? { up: 40, right: 12, back: 60 } : { up: UP, right: RIGHT, back: BACK });

export interface ProjectsHandle {
  render: (progress01: number) => void;
}

export const Projects = forwardRef<ProjectsHandle>((_props, ref) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const boardRefs = useRef<(HTMLElement | null)[]>([]);
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const tintRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(-1);

  // The scroll-overlap deck, explained plainly: Scene hands this a raw 0..1
  // scroll fraction across the WHOLE runway, regardless of how many boards
  // there are — so it's rescaled here into `p`, a fractional board index
  // (e.g. p=1.5 means "halfway between board 1 and board 2"), by
  // multiplying by (N - 1). Skipping that rescale was a real bug: with it
  // missing, `p` topped out at 1 no matter how many boards existed, so
  // anything beyond board index 1 could never become active — the deck
  // would visibly hand off to the next page section after only ~2 boards,
  // regardless of N. For every board `i`, `d = i - p` is simply "how many
  // boards away from the front is this one, and in which direction" — d=0
  // is the board currently front-and-center, d>0 are boards still waiting
  // their turn (stacked up-and-back behind it), and d<0 are boards that
  // have already had their turn (sliding away down and out). Scrolling
  // just changes `p`, which changes every board's `d`, which is why the
  // whole deck appears to advance smoothly — nothing here is a timed
  // animation, every frame is a pure function of scroll position.
  const place = React.useCallback((progress01: number) => {
    const { up, right, back } = geom();
    const p = gsap.utils.clamp(0, N - 1, progress01 * (N - 1));

    boardRefs.current.forEach((b, i) => {
      if (!b) return;
      const d = i - p;

      // Cull anything far behind or already gone past — keeps the DOM cheap
      // and stops stale boards ghosting at the edges.
      if (d > DEPTH + 0.6 || d < -1.1) {
        b.style.visibility = 'hidden';
        return;
      }
      b.style.visibility = 'visible';

      if (d >= 0) {
        // Still to come: stacked up-and-back behind the active board.
        const k = Math.min(d, DEPTH);
        b.style.transform =
          `translate3d(${(k * right).toFixed(1)}px, ${(-k * up).toFixed(1)}px, ${(-k * back).toFixed(1)}px)` +
          ` scale(${(1 - k * 0.028).toFixed(3)})`;
        b.style.opacity = String(Math.max(0, 1 - k * 0.16));
        b.style.filter = k > 1.2 ? `blur(${Math.min(3, (k - 1.2) * 1.2).toFixed(2)}px)` : '';
        b.style.zIndex = String(200 - Math.round(k * 10));
      } else {
        // Passed: travels down and back out of the stack, blurring as it goes.
        const t = Math.min(1, -d / 1.1);
        b.style.transform =
          `translate3d(${(-t * 40).toFixed(1)}px, ${(t * 230).toFixed(1)}px, ${(-t * 320).toFixed(1)}px)` +
          ` scale(${(1 - t * 0.06).toFixed(3)})`;
        b.style.opacity = String(Math.max(0, 1 - t * 1.35));
        b.style.filter = t > 0.25 ? `blur(${((t - 0.25) * 5).toFixed(2)}px)` : '';
        b.style.zIndex = '210';
      }
    });

    const active = Math.round(gsap.utils.clamp(0, N - 1, p));
    if (active === activeRef.current) return;
    activeRef.current = active;

    boardRefs.current.forEach((b, i) => b?.classList.toggle('is-active', i === active));
    navRefs.current.forEach((nv, i) => {
      if (!nv) return;
      nv.classList.toggle('opacity-100', i === active);
      nv.classList.toggle('opacity-40', i !== active);
    });
    if (counterRef.current) counterRef.current.textContent = `${pad(active + 1)} / ${pad(N)}`;
    // Whole-section wash in the active board's colour, at low alpha.
    if (tintRef.current) tintRef.current.style.background = `${FEATURED_PROJECTS[active].color}12`;
  }, []);

  useImperativeHandle(ref, () => ({ render: place }), [place]);

  React.useEffect(() => {
    place(0); // resting layout before the first scrub

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const split = new SplitText(titleRef.current, { type: 'lines,words' });
        gsap.from(split.words, {
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          y: 24,
          stagger: 0.03,
          duration: 1,
          ease: 'power3.out',
        });
      }
    });
    return () => ctx.revert();
  }, [place]);

  return (
    <section
      id="projects"
      className="w-full h-full flex flex-col justify-center px-6 md:px-12 pt-20 pb-5 relative overflow-hidden"
    >
      <div ref={tintRef} className="absolute inset-0 pointer-events-none transition-colors duration-700" aria-hidden="true" />

      <SectionHeading
        number="05"
        label="Impact Tracker"
        titleTop="Selected projects,"
        titleBottom="built for"
        accent="impact"
        description="A few of our highlighted projects — blood drives, tree plantations, skill workshops — each driven end-to-end by one of our five avenues of service."
        titleRef={titleRef}
        className="mb-4 shrink-0 z-60"
      />

      {/* Stage — perspective lives on the wrapper, the tilt on the stage,
          so the boards inherit one shared 3D space. */}
      <div
        className="flex-1 min-h-0 flex items-center justify-center relative"
        style={{ perspective: '1900px', perspectiveOrigin: '50% 46%' }}
      >
        <div
          className="relative w-full max-w-[1180px]"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(6deg)',
            height: 'clamp(260px, calc(100vh - 380px), 520px)',
          }}
        >
          {FEATURED_PROJECTS.map((project, i) => (
            <article
              key={project.title}
              ref={(el) => {
                boardRefs.current[i] = el;
              }}
              className={`deck-board absolute inset-x-0 bottom-0 rounded-2xl overflow-hidden shadow-[0_30px_70px_-25px_rgba(0,0,0,0.5)] ${
                project.fg === 'dark' ? 'text-slate-950' : 'text-white'
              }`}
              style={{
                height: '100%',
                background: project.color,
                zIndex: 200 - i,
                willChange: 'transform, opacity',
              }}
            >
              {/* Identity strip — the only part a waiting board shows. */}
              <div
                className={`h-[50px] shrink-0 flex items-center gap-3 px-5 md:px-8 text-[10px] md:text-xs font-heading font-extrabold uppercase tracking-widest border-b ${
                  project.fg === 'dark' ? 'border-black/10' : 'border-white/15'
                }`}
              >
                <span className="opacity-70">{project.date}</span>
                <span className="opacity-40">/</span>
                <span className="truncate">{project.category}</span>
                <span
                  className={`ml-auto shrink-0 px-2.5 py-1 rounded-full text-[9px] ${
                    project.fg === 'dark' ? 'bg-black/10' : 'bg-white/15'
                  }`}
                >
                  {project.status}
                </span>
              </div>

              {/* Full write-up — revealed only on the active board (see the
                  .deck-detail rules in index.css). */}
              <div className="deck-detail h-[calc(100%-50px)] px-5 md:px-8 py-5 md:py-7 grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-4 md:gap-10">
                <div className="flex flex-col min-h-0">
                  <h3 className="font-heading font-extrabold text-xl md:text-3xl leading-tight">
                    {project.title}
                  </h3>
                  <p
                    className={`mt-3 text-xs md:text-sm leading-relaxed line-clamp-4 ${
                      project.fg === 'dark' ? 'text-slate-950/70' : 'text-white/75'
                    }`}
                  >
                    {project.description}
                  </p>

                  <Link
                    to={`/projects/${avenueToSlug(project.avenue)}#${projectToSlug(project.title)}`}
                    className={`mt-auto self-start inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full font-heading font-extrabold text-[10px] md:text-xs uppercase tracking-widest transition-transform duration-300 hover:-translate-y-0.5 ${
                      project.fg === 'dark'
                        ? 'bg-slate-950 text-white'
                        : 'bg-white text-slate-950'
                    }`}
                  >
                    <span>View Project</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>

                <div className="hidden md:flex flex-col gap-4">
                  <div>
                    <p className={`text-[10px] font-heading font-extrabold uppercase tracking-widest ${project.fg === 'dark' ? 'text-slate-950/50' : 'text-white/50'}`}>
                      Avenue
                    </p>
                    <p className="mt-1 text-sm font-heading font-bold">{project.avenue}</p>
                  </div>
                  <div>
                    <p className={`text-[10px] font-heading font-extrabold uppercase tracking-widest ${project.fg === 'dark' ? 'text-slate-950/50' : 'text-white/50'}`}>
                      Status
                    </p>
                    <p className="mt-1 text-sm font-heading font-bold">{project.status}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Counter + colour-dot legend, mirroring the Members section's
          counter/dots so both scroll-driven sections read the same way. */}
      <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-2 mt-5 shrink-0 relative z-60">
        <span ref={counterRef} className="font-heading font-extrabold text-xs text-theme-dark tabular-nums">
          {`01 / ${pad(N)}`}
        </span>
        <div className="flex items-center gap-3 flex-wrap justify-center">
          {FEATURED_PROJECTS.map((project, i) => (
            <button
              key={project.title}
              type="button"
              ref={(el) => {
                navRefs.current[i] = el;
              }}
              className={`flex items-center gap-1.5 text-[10px] font-heading font-extrabold uppercase tracking-widest text-theme-dark transition-opacity duration-300 ${
                i === 0 ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <i className="w-2 h-2 rounded-full shrink-0" style={{ background: project.color }} />
              <span className="hidden sm:inline">{project.category}</span>
            </button>
          ))}
        </div>
      </div>

    </section>
  );
});

Projects.displayName = 'Projects';
