// Real headshots, bundled with the app (src/assets/members/ — tracked in
// git now that the repo is private, so there's no longer a reason to keep
// them out of it via an external link). Vite fingerprints these on build
// like any other imported asset.
import vinodhanPhoto from '../assets/members/vinodhan.jpg';
import atshayaPhoto from '../assets/members/atshaya.jpg';
import dhyaneshPhoto from '../assets/members/dhyanesh.jpg';
import girishPhoto from '../assets/members/girish.jpg';
import jeevithaPhoto from '../assets/members/jeevitha.jpg';
import mukeshPhoto from '../assets/members/mukesh.jpg';
import nagaGayathriPhoto from '../assets/members/nagagayathri.jpg';
import sandhiyaPhoto from '../assets/members/sandhiya.jpg';
import seshaPhoto from '../assets/members/sesha.jpg';
import nandhiniPhoto from '../assets/members/nandhini-photo.jpg';
import sriVisahaPhoto from '../assets/members/srivisaha.jpg';
import sudharvkPhoto from '../assets/members/sudharvk-photo.jpg';
import prasannavengatPhoto from '../assets/members/prasannavengat.jpg';
import abdulameerPhoto from '../assets/members/abdulameer.jpg';
import sasidharanPhoto from '../assets/members/sasidharan.jpg';
import aiswaryaaPhoto from '../assets/members/aiswaryaa.jpg';
import GokulPhoto from '../assets/members/gokul.jpg';

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
    zoomScale: 1.7,
    yOffset: -16,
    quote: "Leading with empathy and vision to drive Midtown's milestones and community service.",
  },
  {
    name: 'Rtr. K. Atshaya',
    role: 'Secretary',
    photoSlot: 'Secretary Headshot',
    photo: atshayaPhoto,
    zoomScale: 1.2,
    yOffset: 10,
    quote: 'Streamlining operations, communication, and district reporting for seamless execution.',
  },
    {
    name: 'Rtr. A. Abdul Ameer',
    role: 'Treasurer',
    photoSlot: 'Treasurer Headshot',
    photo: abdulameerPhoto,
    zoomScale: 1,
    quote: 'Managing club budget, financial transparency, and community service fund allocations.',
  },
  {
    name: 'Rtr. K. Prasannavengat',
    role: 'Vice President',
    photo: prasannavengatPhoto,
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
    photo: seshaPhoto,
    zoomScale: 1.15,
    xOffset: 6,
    yOffset: 6,
    quote: 'Upholding meeting discipline and keeping every club gathering running smoothly.',
  },
  {
    name: 'Rtr. Naga Gayathiri',
    role: 'Avenue Director, Club Service',
    photoSlot: 'Director Headshot',
    photo: nagaGayathriPhoto,
    zoomScale: 1.0,
    yOffset: -2,
    quote: 'Fostering internal fellowship, member onboarding, and inter-district collaborations.',
  },
  {
    name: 'Rtr. R. Jeevitha',
    role: 'Avenue Director, Community Service',
    photoSlot: 'Director Headshot',
    photo: jeevithaPhoto,
    zoomScale: 1.6,
    xOffset: 6,
    quote: 'Driving blood camps, sapling drives, and direct medical aid to public schools.',
  },
  {
    name: 'Rtr. K. Nandhini',
    role: 'Avenue Director, Professional Service',
    photoSlot: 'Director Headshot',
    photo: nandhiniPhoto,
    quote: 'Coordinating computer literacy campaigns and career placement guides for youth.',
  },
  {
    name: 'Rtr. D. Sudharshun',
    role: 'Avenue Director, International Service',
    photoSlot: 'Director Headshot',
    photo: sudharvkPhoto,
    zoomScale: 1.05,
    yOffset: -15,
    quote: 'Connecting Midtown Rotaractors with global youth networks and cross-border projects.',
  },
    {
    name: 'Rtr. R. Sri Visaha',
    role: 'Learning Facilitator',
    photoSlot: 'Project Chair Headshot',
    photo: sriVisahaPhoto,
    quote: 'Designing workshops and training sessions that build skills across the membership.',
  },
  {
    name: 'Rtr. T. Sandhiya',
    role: 'Avenue Director, Public Image',
    photoSlot: 'Director Headshot',
    photo: sandhiyaPhoto,
    quote: "Shaping the club's voice across social media, press, and public storytelling.",
  },
  {
    name: 'Rtr. B. Mukesh',
    role: 'Sport Chair',
    photoSlot: 'Project Chair Headshot',
    photo: mukeshPhoto,
    zoomScale: 1.6,
    yOffset: 25,
    quote: 'Organizing fellowship tournaments and sports meets that keep the club active and united.',
  },

  {
    name: 'Rtr. V. R. Dhyaneshwar',
    role: 'Membership Chair',
    photoSlot: 'Project Chair Headshot',
    photo: dhyaneshPhoto,
    zoomScale: 1.35,
    xOffset: -8,
    yOffset: 15,
    quote: 'Leading recruitment drives and welcoming new Rotaractors into the Midtown family.',
  },
  {
    name: 'Rtr. R. M. Girish Gowtham',
    role: 'District Priority Projects',
    photoSlot: 'Project Chair Headshot',
    photo: girishPhoto,
    zoomScale: 2.1,
    xOffset: -5,
    yOffset: -20,
    quote: "Aligning Midtown's initiatives with District 2982's flagship priority projects.",
  },
  {
    name: 'Rtr. Aiswaryaa Mohanraj',
    role: 'Legal Awareness & Advocacy Chair',
    photoSlot: 'Member Headshot',
    photo : aiswaryaaPhoto,
    zoomScale:1,
    yOffset: -10,
    quote: 'Organising awareness campaigns on law, rights and safety.',
  },
  {
    name: 'Rtr. Sasidharan',
    role: 'Proud Rotaract Member',
    photoSlot: 'Member Headshot',
    photo: sasidharanPhoto,
    zoomScale: 1.4,
    quote: 'Proud to serve, connect and create a positive impact through Rotaract.',
  },
  {
    name: 'Rtr. M. Gokulakrishnan',
    role: 'Proud Rotaract Member',
    photoSlot: 'Member Headshot',
    photo : GokulPhoto,
    zoomScale : 1.4,
    xOffset: -10,
    yOffset: 20,
    quote: 'Proud to serve, connect and create a positive impact through Rotaract.',
  },
  {
    name: 'Proud Rotaract Member',
    role: 'Club Member',
    photoSlot: 'Member Headshot',
    quote: 'Proud to serve, connect and create a positive impact through Rotaract.',
  },
  {
    name: 'Proud Rotaract Member',
    role: 'Club member',
    photoSlot: 'Member Headshot',
    quote: 'Proud to serve, connect and create a positive impact through Rotaract.',
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
