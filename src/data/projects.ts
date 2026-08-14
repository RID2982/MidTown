import karpomKarpippomPhoto from '../assets/Projects/july_Month/karpom-Karpippom/karpom-karpippom.jpg';
import karpomKarpippomSpeaker1 from '../assets/Projects/july_Month/karpom-Karpippom/speaker-1.jpg';
import karpomKarpippomSpeaker2 from '../assets/Projects/july_Month/karpom-Karpippom/speaker-2.jpg';
import anboduPoster from '../assets/Projects/july_Month/Annapurana_day/anbodu-poster.jpg';
import anboduPhoto2 from '../assets/Projects/july_Month/Annapurana_day/anbodu-2.jpg';

// The 5 avenues match the real Avenue Director roster in data/members.ts —
// not the 4 mentioned verbally when this was requested (Professional
// Service was almost certainly just dropped in dictation, not excluded on
// purpose), so project categorization stays consistent with the board.
export type Avenue = 'Club Service' | 'Community Service' | 'Professional Service' | 'International Service' | 'Public Image';

export const AVENUES: Avenue[] = ['Club Service', 'Community Service', 'Professional Service', 'International Service', 'Public Image'];

// URL-friendly slug for each avenue's dedicated /projects/:slug page.
export const avenueToSlug = (avenue: Avenue): string => avenue.toLowerCase().replace(/ /g, '-');

export const slugToAvenue = (slug: string): Avenue | undefined =>
  AVENUES.find((avenue) => avenueToSlug(avenue) === slug);

// URL-friendly slug for a single project's anchor on its avenue page —
// there's no dedicated one-project-per-page route, so "View Project"
// deep-links to `/projects/:avenueSlug#<this>` and AvenuePage scrolls to
// the matching project on load (see AvenuePage.tsx).
export const projectToSlug = (title: string): string =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export interface Project {
  title: string;
  category: string;
  avenue: Avenue;
  date: string;
  description: string;
  status: 'Completed' | 'In Progress';
  featured: boolean;
  /** Board colour in the stacked deck — one curated colour per project. */
  color: string;
  /** Which text colour that board needs. 'dark' = dark ink on a light board. */
  fg: 'light' | 'dark';
  /**
   * Real event photos, imported from src/assets/Projects/. Up to 3 — with
   * 2 or more, the avenue detail page auto-swipes between them like a
   * phone gallery (see ProjectGallery.tsx). Optional; absent or empty
   * falls back to a solid gradient tile, the same way a member card falls
   * back to a labelled placeholder frame while its photo is pending.
   */
  images?: string[];
  /**
   * CSS object-position per photo, same index/order as images (e.g. 'top',
   * 'center', '50% 20%'). Optional, defaults to 'center' per photo — set
   * only for a photo whose subject gets cropped awkwardly by the gallery's
   * fixed 4:3 frame (see ProjectGallery.tsx).
   */
  imagePositions?: string[];
}

// Only real, confirmed events live here now — the earlier placeholder
// projects (Blood Donation Camp, Sapling Campaign, Computer Literacy,
// Polio Drive, Resume Workshop) were seed/mock data from before the club
// had real project details, and were removed rather than kept as fake
// history once real ones existed to replace them. Midtown Fellowship &
// Sports Meet (Club Service) is untouched — it wasn't part of this cleanup.
export const PROJECTS_DATA: Project[] = [
  {
    title: 'Anbodu (அன்போடு)',
    category: 'Food Donation Drive',
    avenue: 'Community Service',
    date: 'July 2026',
    description: '20 Rotaractors from Salem Midtown came together for Anbodu (அன்போடு — "with love"), handing out food and water directly to people in need across the city — a small, personal effort built on the idea that nourishing a life starts with sharing what you have.',
    status: 'Completed',
    featured: true,
    color: '#b45309',
    fg: 'light',
    images: [anboduPoster, anboduPhoto2],
  },
  {
    title: '"கற்போம் கற்பிப்போம்"',
    category: 'Public Speaking Workshop',
    avenue: 'Professional Service',
    date: 'July 2026',
    description: 'Rtr. Sunil Vickas S led an engaging session on Effective Public Speaking and Time Management for 200+ students, transforming the audience from passive listeners into active participants. Through interactive discussions, practical insights, and real-world guidance, the session encouraged students to communicate with confidence and manage their time effectively—making it one of the club’s most impactful and engaging outreach sessions.',
    status: 'Completed',
    featured: true,
    color: '#0891b2',
    fg: 'light',
    images: [karpomKarpippomPhoto, karpomKarpippomSpeaker1, karpomKarpippomSpeaker2],
  },
  {
    title: 'Midtown Fellowship & Sports Meet',
    category: 'Club Service',
    avenue: 'Club Service',
    date: 'November 2026',
    description: 'Fostered inter-club relations and internal fellowship through friendly volleyball and cricket tournaments.',
    status: 'In Progress',
    featured: false,
    color: '#f59e0b',
    fg: 'dark',
  },
];

// The home page shows only these — the full list per avenue lives on each
// /projects/:slug page, reachable from the header's Projects dropdown.
export const FEATURED_PROJECTS = PROJECTS_DATA.filter((p) => p.featured);
