// Headshots live in src/assets/members/, resized to ~1200px on the long
// edge — camera originals are multi-megabyte and would dominate page
// weight for a card that renders a few hundred pixels wide.
import vinodhanPhoto from '../assets/members/vinodhan.jpg';

export interface Member {
  name: string;
  role: string;
  /** Label shown in the placeholder frame while `photo` is absent. */
  photoSlot: string;
  /**
   * Real headshot, imported from src/assets/members/. Set it per-person as
   * photos come in — the card renders the photo when present and falls
   * back to the labelled placeholder frame when it isn't, so the roster
   * can be filled in one member at a time without any UI change.
   *
   * Crop to HEAD AND TORSO in portrait (~3:4) before adding, and keep it
   * around 600-900px wide. Both cards use object-cover/object-top, and the
   * roster card hides its lower half under a frosted info panel — so a
   * full-body or landscape shot leaves the subject small, low, and
   * partly behind that panel.
   */
  photo?: string;
  quote: string;
  term: string;
  projects: string;
  since: string;
  // Both pending — populated once the real values are provided. Only set
  // for the people who actually have one (see PRESIDENT/SECRETARY/IST email
  // note below); the card UI adapts per-member based on whether these exist.
  email?: string;
  instagram?: string;
}

// Real 2026-27 office bearer roster, from the club's installation ceremony
// invite. Photos are still pending — real headshots will replace the
// placeholder photo slots once provided. The 5 additional members mentioned
// separately are not yet included; their names/photos haven't been sent.
export const MEMBERS: Member[] = [
  {
    name: 'Rtr. V. A. Vinodhan',
    role: 'President',
    photoSlot: 'President Headshot',
    photo: vinodhanPhoto,
    quote: "Leading with empathy and vision to drive Midtown's milestones and community service.",
    term: '2026-27',
    projects: '15+',
    since: '2021',
    email: 'vinovb21@gmail.com',
    instagram: 'https://instagram.com/vinodhan07',
  },
  {
    name: 'Rtr. K. Atshaya',
    role: 'Secretary',
    photoSlot: 'Secretary Headshot',
    quote: 'Streamlining operations, communication, and district reporting for seamless execution.',
    term: '2026-27',
    projects: '10+',
    since: '2022',
    email: 'atshaya.k@example.com',
    instagram: 'https://instagram.com/atshaya_k',
  },
  {
    name: 'Rtr. K. Prasannavengat',
    role: 'Vice President',
    photoSlot: 'VP Headshot',
    quote: 'Supporting project execution and coordinating avenues of service across Salem.',
    term: '2026-27',
    projects: '9+',
    since: '2022',
    email: 'prasannavengat.k@example.com',
    instagram: 'https://instagram.com/prasannavengat_k',
  },
  {
    name: 'Rtr. A. Abdul Ameer',
    role: 'Treasurer',
    photoSlot: 'Treasurer Headshot',
    quote: 'Managing club budget, financial transparency, and community service fund allocations.',
    term: '2026-27',
    projects: '8+',
    since: '2023',
    email: 'abdulameer.a@example.com',
    instagram: 'https://instagram.com/abdulameer_a',
  },
  {
    name: 'Rtr. S. Seshathri',
    role: 'Sergeant at Arms',
    photoSlot: 'Sergeant at Arms Headshot',
    quote: 'Upholding meeting discipline and keeping every club gathering running smoothly.',
    term: '2026-27',
    projects: '5+',
    since: '2023',
    email: 'seshathri.s@example.com',
    instagram: 'https://instagram.com/seshathri_s',
  },
  {
    name: 'Rtr. Naga Gayathiri',
    role: 'Avenue Director, Club Service',
    photoSlot: 'Director Headshot',
    quote: 'Fostering internal fellowship, member onboarding, and inter-district collaborations.',
    term: '2026-27',
    projects: '6+',
    since: '2023',
    email: 'nagagayathiri@example.com',
    instagram: 'https://instagram.com/naga_gayathiri',
  },
  {
    name: 'Rtr. R. Jeevitha',
    role: 'Avenue Director, Community Service',
    photoSlot: 'Director Headshot',
    quote: 'Driving blood camps, sapling drives, and direct medical aid to public schools.',
    term: '2026-27',
    projects: '7+',
    since: '2024',
    email: 'jeevitha.r@example.com',
    instagram: 'https://instagram.com/jeevitha_r',
  },
  {
    name: 'Rtr. K. Nandhini',
    role: 'Avenue Director, Professional Service',
    photoSlot: 'Director Headshot',
    quote: 'Coordinating computer literacy campaigns and career placement guides for youth.',
    term: '2026-27',
    projects: '5+',
    since: '2024',
    email: 'nandhini.k@example.com',
    instagram: 'https://instagram.com/nandhini_k',
  },
  {
    name: 'Rtr. D. Sudharshun',
    role: 'Avenue Director, International Service',
    photoSlot: 'Director Headshot',
    quote: 'Connecting Midtown Rotaractors with global youth networks and cross-border projects.',
    term: '2026-27',
    projects: '4+',
    since: '2024',
    email: 'sudharshun.d@example.com',
    instagram: 'https://instagram.com/sudharshun_d',
  },
  {
    name: 'Rtr. T. Sandhiya',
    role: 'Avenue Director, Public Image',
    photoSlot: 'Director Headshot',
    quote: "Shaping the club's voice across social media, press, and public storytelling.",
    term: '2026-27',
    projects: '4+',
    since: '2024',
    email: 'sandhiya.t@example.com',
    instagram: 'https://instagram.com/sandhiya_t',
  },
  {
    name: 'Rtr. B. Mukesh',
    role: 'Sport Chair',
    photoSlot: 'Project Chair Headshot',
    quote: 'Organizing fellowship tournaments and sports meets that keep the club active and united.',
    term: '2026-27',
    projects: '3+',
    since: '2024',
    email: 'mukesh.b@example.com',
    instagram: 'https://instagram.com/mukesh_b',
  },
  {
    name: 'Rtr. R. Sri Visaha',
    role: 'Learning Facilitator',
    photoSlot: 'Project Chair Headshot',
    quote: 'Designing workshops and training sessions that build skills across the membership.',
    term: '2026-27',
    projects: '3+',
    since: '2024',
    email: 'srivisaha.r@example.com',
    instagram: 'https://instagram.com/srivisaha_r',
  },
  {
    name: 'Rtr. V. R. Dhyaneshwar',
    role: 'Membership Chair',
    photoSlot: 'Project Chair Headshot',
    quote: 'Leading recruitment drives and welcoming new Rotaractors into the Midtown family.',
    term: '2026-27',
    projects: '3+',
    since: '2024',
    email: 'dhyaneshwar.vr@example.com',
    instagram: 'https://instagram.com/dhyaneshwar_vr',
  },
  {
    name: 'Rtr. R. M. Girish Gowtham',
    role: 'District Priority Projects',
    photoSlot: 'Project Chair Headshot',
    quote: "Aligning Midtown's initiatives with District 2982's flagship priority projects.",
    term: '2026-27',
    projects: '3+',
    since: '2024',
    email: 'girishgowtham.rm@example.com',
    instagram: 'https://instagram.com/girishgowtham_rm',
  },
  // Reserved slots for 5 more members, names/photos pending. Stats use "—"
  // instead of a fabricated number, since — unlike the office bearers above,
  // whose stats are placeholder-styled but attached to a real named person —
  // there's no real person here yet to attach even a placeholder claim to.
  {
    name: 'Rtr. Member 1',
    role: 'Proud Rotaract Member',
    photoSlot: 'Member Headshot',
    quote: 'Profile details coming soon.',
    term: '2026-27',
    projects: '—',
    since: '—',
  },
  {
    name: 'Rtr. Member 2',
    role: 'Proud Rotaract Member',
    photoSlot: 'Member Headshot',
    quote: 'Profile details coming soon.',
    term: '2026-27',
    projects: '—',
    since: '—',
  },
  {
    name: 'Rtr. Member 3',
    role: 'Proud Rotaract Member',
    photoSlot: 'Member Headshot',
    quote: 'Profile details coming soon.',
    term: '2026-27',
    projects: '—',
    since: '—',
  },
  {
    name: 'Rtr. Member 4',
    role: 'Proud Rotaract Member',
    photoSlot: 'Member Headshot',
    quote: 'Profile details coming soon.',
    term: '2026-27',
    projects: '—',
    since: '—',
  },
  {
    name: 'Rtr. Member 5',
    role: 'Proud Rotaract Member',
    photoSlot: 'Member Headshot',
    quote: 'Profile details coming soon.',
    term: '2026-27',
    projects: '—',
    since: '—',
  },
];

// President + Secretary are shown separately as the static leadership duo
// on the home page.
export const LEADERS = MEMBERS.slice(0, 2);

// Home-page arc showcase: the first 10 entries in MEMBERS as-is — President,
// Secretary, VP, Treasurer, Sergeant at Arms, then the 5 Avenue Directors.
// Skips the project-chair roles so the featured set stays to the club's
// primary leadership + service-avenue structure. Full roster (all 19) lives
// on /roster.
export const SHOWCASE_MEMBERS = MEMBERS.slice(0, 10);
