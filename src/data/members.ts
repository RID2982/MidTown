
export interface Member {
  name: string;
  role: string;
  /** Label shown in the placeholder frame while `photo` is absent. */
  photoSlot: string;
  /**
   * Real headshot URL hosted on Google Drive CDN. Set it per-person as
   * photos come in — the card renders the photo when present and falls
   * back to the labelled placeholder frame when it isn't, so the roster
   * can be filled in one member at a time without any UI change.
   */
  photo?: string;
  /**
   * Custom horizontal translation offset as percentage of the card width (e.g. -5 for -5%).
   * Defaults to 0 if not specified.
   */
  xOffset?: number;
  /**
   * Custom vertical translation offset as percentage of the card height (e.g. -10 for -10%).
   * Defaults to 0 if not specified.
   */
  yOffset?: number;
  /**
   * Custom zoom scale factor for the headshot image (e.g. 1.1, 1.2).
   * Defaults to 1 (no zoom) if not specified.
   */
  zoomScale?: number;
  quote: string;
}

// Real 2026-27 office bearer roster, from the club's installation ceremony invite.
export const MEMBERS: Member[] = [
  {
    name: 'Rtr. IPP Agasra',
    role: 'Club Admin',
    photoSlot: 'Club Admin Headshot',
    photo: 'https://lh3.googleusercontent.com/d/1A7wLx6SAUhzXpfwbzNkGEDd4TMV_KEgS',
    zoomScale: 1.25,
    yOffset: 0,
    quote: 'Overseeing club administration, directory database, and ensuring smooth operation of all avenues of service.',
  },
  {
    name: 'Rtr. V. A. Vinodhan',
    role: 'President',
    photoSlot: 'President Headshot',
    photo: 'https://lh3.googleusercontent.com/d/1LW38k-hBXouxADUvaTKiE2bfDF8Dqkj0',
    zoomScale: 1.7,
    yOffset: -16,
    quote: "Leading with empathy and vision to drive Midtown's milestones and community service.",
  },
  {
    name: 'Rtr. K. Atshaya',
    role: 'Secretary',
    photoSlot: 'Secretary Headshot',
    photo: 'https://lh3.googleusercontent.com/d/1SEmLY8WK8iOi5o-nI8ExNZKVV5C5R2l5',
    zoomScale: 1.2,
    yOffset: 10,
    quote: 'Streamlining operations, communication, and district reporting for seamless execution.',
  },
  {
    name: 'Rtr. A. Abdul Ameer',
    role: 'Treasurer',
    photoSlot: 'Treasurer Headshot',
    photo: 'https://lh3.googleusercontent.com/d/1bMRoy4uAJ6Ap9hfv6yXEBguGXowxIahJ',
    zoomScale: 1,
    quote: 'Managing club budget, financial transparency, and community service fund allocations.',
  },
  {
    name: 'Rtr. K. Prasannavengat',
    role: 'Vice President',
    photo: 'https://lh3.googleusercontent.com/d/1dmFq-i-F5NTKggW6kRUe1G2P10eDRqTS',
    zoomScale: 1.3,
    xOffset: -5,
    yOffset: 15,
    photoSlot: 'VP Headshot',
    quote: 'Supporting project execution and coordinating avenues of service across Salem.',
  },

  {
    name: 'Rtr. S. Seshathri',
    role: 'Sergeant at Arms',
    photoSlot: 'Sergeant at Arms Headshot',
    photo: 'https://lh3.googleusercontent.com/d/1bYBhFCB4eKInx_kpx5GoDkvqceYe6lve',
    zoomScale: 1.15,
    xOffset: 6,
    yOffset: 6,
    quote: 'Upholding meeting discipline and keeping every club gathering running smoothly.',
  },
  {
    name: 'Rtr. Naga Gayathiri',
    role: 'Avenue Director, Club Service',
    photoSlot: 'Director Headshot',
    photo: 'https://lh3.googleusercontent.com/d/1Vm9GsWmJME7cU-RdEjcIpvsiDjl-6ME-',
    zoomScale: 1.0,
    yOffset: -2,
    quote: 'Fostering internal fellowship, member onboarding, and inter-district collaborations.',
  },
  {
    name: 'Rtr. R. Jeevitha',
    role: 'Avenue Director, Community Service',
    photoSlot: 'Director Headshot',
    photo: 'https://lh3.googleusercontent.com/d/1jgYnmMFP3aVtyBmN4568rZr3T18EYVIN',
    zoomScale: 1.6,
    xOffset: 6,
    quote: 'Driving blood camps, sapling drives, and direct medical aid to public schools.',
  },
  {
    name: 'Rtr. K. Nandhini',
    role: 'Avenue Director, Professional Service',
    photoSlot: 'Director Headshot',
    photo: 'https://lh3.googleusercontent.com/d/196NKeyKpqz7CcqoySkRKBs4_Ua0SfI_c',
    quote: 'Coordinating computer literacy campaigns and career placement guides for youth.',
  },
  {
    name: 'Rtr. D. Sudharshun',
    role: 'Avenue Director, International Service',
    photoSlot: 'Director Headshot',
    photo: 'https://lh3.googleusercontent.com/d/1F_gw9uho4T5Np16iDgFxfb1hZlQFlMEx',
    zoomScale: 1.05,
    yOffset: -15,
    quote: 'Connecting Midtown Rotaractors with global youth networks and cross-border projects.',
  },
    {
    name: 'Rtr. R. Sri Visaha',
    role: 'Learning Facilitator',
    photoSlot: 'Project Chair Headshot',
    photo: 'https://lh3.googleusercontent.com/d/1W_G2biONKaDGCLpNZqAL8feqblVw2CwZ',
    quote: 'Designing workshops and training sessions that build skills across the membership.',
  },
  {
    name: 'Rtr. T. Sandhiya',
    role: 'Avenue Director, Public Image',
    photoSlot: 'Director Headshot',
    photo: 'https://lh3.googleusercontent.com/d/1GzV5SUt-dBYTwWc_w-B8QfXWXXkeKcg4',
    quote: "Shaping the club's voice across social media, press, and public storytelling.",
  },
  {
    name: 'Rtr. Vaishnavi Kumaresan',
    role: 'Club Website Management',
    photoSlot: 'Member Headshot',
    photo: 'https://lh3.googleusercontent.com/d/1GGpSTQAeIsBrxZa8ZUB1JHHnnGd65a4b',
    quote: 'Keeping the digital doors open and the website running smoothly.',
  },
  {
    name: 'Rtr. B. Mukesh',
    role: 'Sport Chair',
    photoSlot: 'Project Chair Headshot',
    photo: 'https://lh3.googleusercontent.com/d/1jpYpnrwFqJFunTrORqcjlS9LO3l_u94L',
    zoomScale: 1.6,
    yOffset: 25,
    quote: 'Organizing fellowship tournaments and sports meets that keep the club active and united.',
  },

  {
    name: 'Rtr. V. R. Dhyaneshwar',
    role: 'Membership Chair',
    photoSlot: 'Project Chair Headshot',
    photo: 'https://lh3.googleusercontent.com/d/1fQhfZYTNIfhX5w0V84jEELIP_7sHV1_B',
    zoomScale: 1.35,
    xOffset: -8,
    yOffset: 15,
    quote: 'Leading recruitment drives and welcoming new Rotaractors into the Midtown family.',
  },
  {
    name: 'Rtr. R. M. Girish Gowtham',
    role: 'District Priority Projects',
    photoSlot: 'Project Chair Headshot',
    photo: 'https://lh3.googleusercontent.com/d/1PP_BiPRY7s_LCn1ssvJQgqhIGdWv_7i5',
    zoomScale: 2.1,
    xOffset: -5,
    yOffset: -20,
    quote: "Aligning Midtown's initiatives with District 2982's flagship priority projects.",
  },
  {
    name: 'Rtr. Aiswaryaa Mohanraj',
    role: 'Legal Awareness & Advocacy Chair',
    photoSlot: 'Legal Awareness & Advocacy Chair',
    photo: 'https://lh3.googleusercontent.com/d/1LXCAQ8twavKKxexWZvUhHyaWhdK_Cu_7',
    zoomScale: 1,
    yOffset: -10,
    quote: 'Organising awareness campaigns on law, rights and safety.',
  },
  {
    name: 'Rtr. Sasidharan',
    role: 'Proud Rotaract Member',
    photoSlot: 'Member Headshot',
    photo: 'https://lh3.googleusercontent.com/d/1sIXfS84DZktEfpzLvsdQcmhAetgIfo6g',
    zoomScale: 1.4,
    quote: 'Proud to serve, connect and create a positive impact through Rotaract.',
  },
  {
    name: 'Rtr. M. Gokulakrishnan',
    role: 'Proud Rotaract Member',
    photoSlot: 'Member Headshot',
    photo: 'https://lh3.googleusercontent.com/d/1zJc9LaF_vObdbVOqHnoTUpUwwumY7nCj',
    zoomScale: 1.4,
    xOffset: -9,
    yOffset: 20,
    quote: 'Proud to serve, connect and create a positive impact through Rotaract.',
  },
  {
    name: 'Rtr. P. Tharanidharan',
    role: 'Proud Rotaract Member',
    photoSlot: 'Proud Rotaract Member',
    photo: 'https://lh3.googleusercontent.com/d/1Hlv0liGw7rMyfvk5r8Qdyz5K1s1LylEi',
    zoomScale: 1.4,
    xOffset: -5,
    quote: 'Proud to serve, connect and create a positive impact through Rotaract.',
  },

];

// Home-page arc showcase: just the top 3 office bearers — President,
// Secretary, Treasurer. Everyone else (VP, Sergeant at Arms, the 5 Avenue
// Directors, project chairs, general members) is still real data in
// MEMBERS and shown on the full roster ("View All Members" on the home
// page links to /roster). Filtered by role name rather than sliced by
// position, so this stays correct even if MEMBERS is reordered.
const SHOWCASE_ROLES = ['Club Admin', 'President', 'Secretary', 'Treasurer'];
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
