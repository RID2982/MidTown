import karpomKarpippomPhoto from '../assets/Projects/july_Month/karpom-Karpippom/karpom-karpippom.jpg';
import karpomKarpippomSpeaker1 from '../assets/Projects/july_Month/karpom-Karpippom/speaker-1.jpg';
import karpomKarpippomSpeaker2 from '../assets/Projects/july_Month/karpom-Karpippom/speaker-2.jpg';

import anboduPoster from '../assets/Projects/july_Month/Annapurana_day/anbodu-poster.jpg';
import anboduPhoto2 from '../assets/Projects/july_Month/Annapurana_day/anbodu-2.jpg';

import humansOfRotaractBanner from '../assets/Projects/july_Month/Humans of Rotaract/banner.jpg';
import humansOfRotaractLiveSession from '../assets/Projects/july_Month/Humans of Rotaract/live-session.jpg';
import humansOfRotaractCertificate from '../assets/Projects/july_Month/Humans of Rotaract/certificate.jpg';
import humansOfRotaractBadge from '../assets/Projects/july_Month/Humans of Rotaract/image.png';

// Waste Management Imports
import wasteManagement1 from '../assets/Projects/july_Month/waste Management/2.png';
import wasteManagement2 from '../assets/Projects/july_Month/waste Management/Screenshot 2026-07-02 182459.png';

// Teach One Inspire One Imports
import teachOneInspireOne1 from '../assets/Projects/july_Month/Teachone inspireone/3.png';
import teachOneInspireOne2 from '../assets/Projects/july_Month/Teachone inspireone/5.png';
import teachOneInspireOne3 from '../assets/Projects/july_Month/Teachone inspireone/WhatsApp Image 2026-08-03 at 9.48.23 PM.jpeg';

// Maitri 10.0 Imports
import maitri1 from '../assets/Projects/july_Month/Maitri 10.0/IMG-20260722-WA0031.jpg';
import maitri2 from '../assets/Projects/july_Month/Maitri 10.0/Screenshot 2026-07-31 212229.png';
import maitri3 from '../assets/Projects/july_Month/Maitri 10.0/Screenshot 2026-07-31 204155.jpeg';

// Catalyst Imports
import catalyst1 from '../assets/Projects/August_month/catalyst/catalyst.jpg';
import catalyst2 from '../assets/Projects/August_month/catalyst/catalyst 2.jpg';
import catalystDream from '../assets/Projects/August_month/catalyst/Dream T Deserve..jpg';

// Letter Exchange Imports
import letterExchange1 from '../assets/Projects/August_month/Letter Exchang/Letter_Heads_20260804_181654_0000_page-0001.jpg';
import letterExchange2 from '../assets/Projects/August_month/Letter Exchang/Salemmidtwon_page-0001.jpg';

// Cloves Project Imports
import cloves1 from '../assets/Projects/August_month/cloves/Untitled design (1).png';
import cloves2 from '../assets/Projects/August_month/cloves/image.png';

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
  alignments?: {
    xOffset?: number;
    yOffset?: number;
    zoomScale?: number;
  }[];
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
    title: 'Waste Management Initiative',
    category: 'Eco-Sustainability Campaign',
    avenue: 'International Service',
    date: 'July 2026',
    description: 'Dedicated to fostering global ecological practices, this initiative brought together members to implement modern waste segregation, recycling awareness, and eco-friendly waste management solutions to protect our community and environment.',
    status: 'Completed',
    featured: false,
    color: '#047857',
    fg: 'light',
    images: [wasteManagement1, wasteManagement2],
  },
  {
    title: 'Humans of Rotaract — Every Badge Has a Story',
    category: 'Inter-Club Collaboration',
    avenue: 'International Service',
    date: 'July 2026',
    description: 'Salem Midtown joined "Humans of Rotaract — Every Badge Has a Story," a flagship International Service initiative hosted by the Rotaract Club of St. Ann’s College for Women (RID 3150), alongside clubs from Bangalore, Presidency University, Arka Jain University, and Biratnagar, Nepal. Over a live storytelling session, members traded stories instead of statistics — strengthening inter-district and international friendships one badge at a time. "Connecting through stories, not just service."',
    status: 'Completed',
    featured: true,
    color: '#4338ca',
    fg: 'light',
    images: [humansOfRotaractBanner, humansOfRotaractCertificate, humansOfRotaractLiveSession, humansOfRotaractBadge],
  },
  {
    title: 'Teach One, Inspire One',
    category: 'Educational Mentorship',
    avenue: 'International Service',
    date: 'July 2026',
    description: 'An educational and vocational mentorship drive aimed at empowering underprivileged youth. Through hands-on skill development workshops, personality training, and career guidance sessions, the project inspired students to pursue higher learning and self-reliance.',
    status: 'Completed',
    featured: false,
    color: '#7c3aed',
    fg: 'light',
    images: [teachOneInspireOne1, teachOneInspireOne2, teachOneInspireOne3],
  },
  {
    title: 'Maitri 10.0',
    category: 'International Cultural Exchange',
    avenue: 'International Service',
    date: 'July 2026',
    description: 'Celebrating bilateral relations and cross-border fellowship, Maitri 10.0 connected Rotaractors from different districts and countries for a rich cultural exchange. Members shared local customs, service histories, and collaborated on prospective joint international projects.',
    status: 'Completed',
    featured: false,
    color: '#db2777',
    fg: 'light',
    images: [maitri1, maitri2, maitri3],
  },
  {
    title: 'Catalyst',
    category: 'District Officers Training Seminar',
    avenue: 'Club Service',
    date: 'August 2026',
    description: 'Hosted by the Rotaract Club of Salem Midtown, Catalyst served as the District Officers Training Seminar (including PETS, SETS, and COTS). The training event brought together Presidents-elect, Secretaries-elect, and Club Officers from across District 2982 to equip them with leadership skills, operational guidelines, and strategic planning tools for the upcoming Rotaract year under the theme "Dream To Deserve".',
    status: 'Completed',
    featured: true,
    color: '#be123c',
    fg: 'light',
    images: [catalyst1, catalyst2, catalystDream],
  },
  {
    title: 'International Letterhead Exchange',
    category: 'Club Twinning & Partnership',
    avenue: 'International Service',
    date: 'August 2026',
    description: 'To strengthen global ties and build international fellowship, the Rotaract Club of Salem Midtown formalised a partnership with the Rotaract Club of Kandy Metropolitan (RID 3220, Sri Lanka). The clubs exchanged official letterheads, symbolizing a mutual commitment to collaborate on international service projects, share cultural insights, and support each other’s club development throughout the 2026-27 tenure.',
    status: 'Completed',
    featured: false,
    color: '#2563eb',
    alignments: [
      { xOffset: 5, yOffset: 0, zoomScale: 1 },
      { xOffset: 0, yOffset: 0, zoomScale: 1 }
    ],
    fg: 'light',
    images: [letterExchange1, letterExchange2],
  },
  {
    title: 'CLOVES Syndrome Awareness',
    category: 'Healthcare Advocacy',
    avenue: 'International Service',
    date: 'August 2026',
    description: 'In a collaborative effort with the Rotaract Club of Nagpur West Illumin8 (RID 3030), the Rotaract Club of Salem Midtown participated in a joint digital campaign to mark CLOVES Syndrome Awareness Day. The project focused on educating the community about this extremely rare congenital disorder, promoting early identification, and advocating for support and inclusivity for affected individuals and their families.',
    status: 'Completed',
    featured: false,
    color: '#0d9488',
    fg: 'light',
    images: [cloves1, cloves2],
  }
];

// The home page shows only these — the full list per avenue lives on each
// /projects/:slug page, reachable from the header's Projects dropdown.
export const FEATURED_PROJECTS = [
  PROJECTS_DATA.find((p) => p.title === '"கற்போம் கற்பிப்போம்"'),
  PROJECTS_DATA.find((p) => p.title === 'Humans of Rotaract — Every Badge Has a Story'),
  PROJECTS_DATA.find((p) => p.title === 'Anbodu (அன்போடு)'),
  PROJECTS_DATA.find((p) => p.title === 'Catalyst'),
  PROJECTS_DATA.find((p) => p.title === 'International Letterhead Exchange'),
].filter((p): p is Project => !!p);
