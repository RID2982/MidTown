export interface Member {
  name: string;
  role: string;
  photoSlot: string;
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
    quote: "Leading with empathy and vision to drive Midtown's milestones and community service.",
    term: '2026-27',
    projects: '15+',
    since: '2021',
  },
  {
    name: 'Rtr. K. Atshaya',
    role: 'Secretary',
    photoSlot: 'Secretary Headshot',
    quote: 'Streamlining operations, communication, and district reporting for seamless execution.',
    term: '2026-27',
    projects: '10+',
    since: '2022',
  },
  {
    name: 'Rtr. K. Prasannavengat',
    role: 'Vice President',
    photoSlot: 'VP Headshot',
    quote: 'Supporting project execution and coordinating avenues of service across Salem.',
    term: '2026-27',
    projects: '9+',
    since: '2022',
  },
  {
    name: 'Rtr. A. Abdul Ameer',
    role: 'Treasurer',
    photoSlot: 'Treasurer Headshot',
    quote: 'Managing club budget, financial transparency, and community service fund allocations.',
    term: '2026-27',
    projects: '8+',
    since: '2023',
  },
  {
    name: 'Rtr. S. Seshathri',
    role: 'Sergeant at Arms',
    photoSlot: 'Sergeant at Arms Headshot',
    quote: 'Upholding meeting discipline and keeping every club gathering running smoothly.',
    term: '2026-27',
    projects: '5+',
    since: '2023',
  },
  {
    name: 'Rtr. Naga Gayathiri',
    role: 'Avenue Director, Club Service',
    photoSlot: 'Director Headshot',
    quote: 'Fostering internal fellowship, member onboarding, and inter-district collaborations.',
    term: '2026-27',
    projects: '6+',
    since: '2023',
  },
  {
    name: 'Rtr. R. Jeevitha',
    role: 'Avenue Director, Community Service',
    photoSlot: 'Director Headshot',
    quote: 'Driving blood camps, sapling drives, and direct medical aid to public schools.',
    term: '2026-27',
    projects: '7+',
    since: '2024',
  },
  {
    name: 'Rtr. K. Nandhini',
    role: 'Avenue Director, Professional Service',
    photoSlot: 'Director Headshot',
    quote: 'Coordinating computer literacy campaigns and career placement guides for youth.',
    term: '2026-27',
    projects: '5+',
    since: '2024',
  },
  {
    name: 'Rtr. D. Sudharshun',
    role: 'Avenue Director, International Service',
    photoSlot: 'Director Headshot',
    quote: 'Connecting Midtown Rotaractors with global youth networks and cross-border projects.',
    term: '2026-27',
    projects: '4+',
    since: '2024',
  },
  {
    name: 'Rtr. T. Sandhiya',
    role: 'Avenue Director, Public Image',
    photoSlot: 'Director Headshot',
    quote: "Shaping the club's voice across social media, press, and public storytelling.",
    term: '2026-27',
    projects: '4+',
    since: '2024',
  },
  {
    name: 'Rtr. B. Mukesh',
    role: 'Sport Chair',
    photoSlot: 'Project Chair Headshot',
    quote: 'Organizing fellowship tournaments and sports meets that keep the club active and united.',
    term: '2026-27',
    projects: '3+',
    since: '2024',
  },
  {
    name: 'Rtr. R. Sri Visaha',
    role: 'Learning Facilitator',
    photoSlot: 'Project Chair Headshot',
    quote: 'Designing workshops and training sessions that build skills across the membership.',
    term: '2026-27',
    projects: '3+',
    since: '2024',
  },
  {
    name: 'Rtr. V. R. Dhyaneshwar',
    role: 'Membership Chair',
    photoSlot: 'Project Chair Headshot',
    quote: 'Leading recruitment drives and welcoming new Rotaractors into the Midtown family.',
    term: '2026-27',
    projects: '3+',
    since: '2024',
  },
  {
    name: 'Rtr. R. M. Girish Gowtham',
    role: 'District Priority Projects',
    photoSlot: 'Project Chair Headshot',
    quote: "Aligning Midtown's initiatives with District 2982's flagship priority projects.",
    term: '2026-27',
    projects: '3+',
    since: '2024',
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
