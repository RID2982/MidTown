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
}

export const PROJECTS_DATA: Project[] = [
  {
    title: 'Midtown Blood Donation Camp',
    category: 'Community Service',
    avenue: 'Community Service',
    date: 'July 2026',
    description: 'Coordinated with Salem Government Hospital to collect 120+ units of blood for emergency reserves.',
    status: 'Completed',
    featured: true,
    color: '#1d4ed8',
    fg: 'light',
  },
  {
    title: 'Green Salem Sapling Campaign',
    category: 'Environment',
    avenue: 'Community Service',
    date: 'August 2026',
    description: 'Planted 500 native tree saplings along Salem bypass roads to foster urban forestation.',
    status: 'Completed',
    featured: true,
    color: '#059669',
    fg: 'light',
  },
  {
    title: 'Government School Computer Literacy',
    category: 'Professional Service',
    avenue: 'Professional Service',
    date: 'September 2026',
    description: 'Conducted basic computing, spreadsheet, and safe internet seminars for 80+ high school children.',
    status: 'Completed',
    featured: true,
    color: '#6d28d9',
    fg: 'light',
  },
  {
    title: 'Polio Vaccination Support Drive',
    category: 'Medical Aid',
    avenue: 'Community Service',
    date: 'October 2026',
    description: 'Partnered with Salem Primary Health Center to administer polio vaccine drops at local transit hubs.',
    status: 'Completed',
    featured: false,
    color: '#e11d48',
    fg: 'light',
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
  {
    title: 'Skill Development & Resume Workshop',
    category: 'Professional Development',
    avenue: 'Professional Service',
    date: 'December 2026',
    description: 'Organized career counselling, mock interviews, and resume reviews for local final-year graduates.',
    status: 'In Progress',
    featured: false,
    color: '#0f172a',
    fg: 'light',
  },
];

// The home page shows only these — the full list lives on the /projects page.
export const FEATURED_PROJECTS = PROJECTS_DATA.filter((p) => p.featured);
