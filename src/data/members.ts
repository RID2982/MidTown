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
}

// Real 2026-27 office bearer roster, from the club's installation ceremony
// invite. Photos are still pending — real headshots will replace the
// placeholder photo slots once provided. The 5 additional members mentioned
// separately are not yet included; their names/photos haven't been sent.
//
// Cards intentionally show only photo + name + role + quote — no contact
// links or stats. Member.email/instagram and the per-member term/projects/
// since stats existed here before but were never rendered on any card
// (confirmed unused), and were removed rather than kept as dead data.
export const MEMBERS: Member[] = [
  {
    name: 'Rtr. V. A. Vinodhan',
    role: 'President',
    photoSlot: 'President Headshot',
    photo: vinodhanPhoto,
    quote: "Leading with empathy and vision to drive Midtown's milestones and community service.",
  },
  {
    name: 'Rtr. K. Atshaya',
    role: 'Secretary',
    photoSlot: 'Secretary Headshot',
    quote: 'Streamlining operations, communication, and district reporting for seamless execution.',
  },
  {
    name: 'Rtr. K. Prasannavengat',
    role: 'Vice President',
    photoSlot: 'VP Headshot',
    quote: 'Supporting project execution and coordinating avenues of service across Salem.',
  },
  {
    name: 'Rtr. A. Abdul Ameer',
    role: 'Treasurer',
    photoSlot: 'Treasurer Headshot',
    quote: 'Managing club budget, financial transparency, and community service fund allocations.',
  },
  {
    name: 'Rtr. S. Seshathri',
    role: 'Sergeant at Arms',
    photoSlot: 'Sergeant at Arms Headshot',
    quote: 'Upholding meeting discipline and keeping every club gathering running smoothly.',
  },
  {
    name: 'Rtr. Naga Gayathiri',
    role: 'Avenue Director, Club Service',
    photoSlot: 'Director Headshot',
    quote: 'Fostering internal fellowship, member onboarding, and inter-district collaborations.',
  },
  {
    name: 'Rtr. R. Jeevitha',
    role: 'Avenue Director, Community Service',
    photoSlot: 'Director Headshot',
    quote: 'Driving blood camps, sapling drives, and direct medical aid to public schools.',
  },
  {
    name: 'Rtr. K. Nandhini',
    role: 'Avenue Director, Professional Service',
    photoSlot: 'Director Headshot',
    quote: 'Coordinating computer literacy campaigns and career placement guides for youth.',
  },
  {
    name: 'Rtr. D. Sudharshun',
    role: 'Avenue Director, International Service',
    photoSlot: 'Director Headshot',
    quote: 'Connecting Midtown Rotaractors with global youth networks and cross-border projects.',
  },
  {
    name: 'Rtr. T. Sandhiya',
    role: 'Avenue Director, Public Image',
    photoSlot: 'Director Headshot',
    quote: "Shaping the club's voice across social media, press, and public storytelling.",
  },
  {
    name: 'Rtr. B. Mukesh',
    role: 'Sport Chair',
    photoSlot: 'Project Chair Headshot',
    quote: 'Organizing fellowship tournaments and sports meets that keep the club active and united.',
  },
  {
    name: 'Rtr. R. Sri Visaha',
    role: 'Learning Facilitator',
    photoSlot: 'Project Chair Headshot',
    quote: 'Designing workshops and training sessions that build skills across the membership.',
  },
  {
    name: 'Rtr. V. R. Dhyaneshwar',
    role: 'Membership Chair',
    photoSlot: 'Project Chair Headshot',
    quote: 'Leading recruitment drives and welcoming new Rotaractors into the Midtown family.',
  },
  {
    name: 'Rtr. R. M. Girish Gowtham',
    role: 'District Priority Projects',
    photoSlot: 'Project Chair Headshot',
    quote: "Aligning Midtown's initiatives with District 2982's flagship priority projects.",
  },
  // Reserved slots for 5 more members, names/photos pending.
  {
    name: 'Rtr. Member 1',
    role: 'Proud Rotaract Member',
    photoSlot: 'Member Headshot',
    quote: 'Profile details coming soon.',
  },
  {
    name: 'Rtr. Member 2',
    role: 'Proud Rotaract Member',
    photoSlot: 'Member Headshot',
    quote: 'Profile details coming soon.',
  },
  {
    name: 'Rtr. Member 3',
    role: 'Proud Rotaract Member',
    photoSlot: 'Member Headshot',
    quote: 'Profile details coming soon.',
  },
  {
    name: 'Rtr. Member 4',
    role: 'Proud Rotaract Member',
    photoSlot: 'Member Headshot',
    quote: 'Profile details coming soon.',
  },
  {
    name: 'Rtr. Member 5',
    role: 'Proud Rotaract Member',
    photoSlot: 'Member Headshot',
    quote: 'Profile details coming soon.',
  },
];

// Home-page arc showcase: just the top 3 office bearers — President,
// Secretary, Treasurer. Everyone else (VP, Sergeant at Arms, the 5 Avenue
// Directors, project chairs, general members) is still real data in
// MEMBERS and shown on the full roster ("View All Members" on the home
// page links to /roster). Filtered by role name rather than sliced by
// position, so this stays correct even if MEMBERS is reordered.
const SHOWCASE_ROLES = ['President', 'Secretary', 'Treasurer'];
export const SHOWCASE_MEMBERS = MEMBERS.filter((m) => SHOWCASE_ROLES.includes(m.role));

// Board rosters by Rotary year, for the "Board of Directors" year dropdown
// on the home page. Only 2026-27 has a real roster today — add a new entry
// here (an array of Member objects, same shape as SHOWCASE_MEMBERS) once a
// prior year's names/roles are available. No component code needs to
// change to pick up a newly added year; the dropdown reads its option list
// straight from this object's keys.
export const BOARD_HISTORY: Record<string, Member[]> = {
  '2026-27': SHOWCASE_MEMBERS,
};

export const BOARD_TERMS = Object.keys(BOARD_HISTORY);
