# Architecture

A map of this codebase, written to be read once. If you're new to this
project (or coming back after a break), start here before diving into
individual files.

## What this is

A single-page React + TypeScript site for Rotaract Club of Salem Midtown,
built with Vite and styled with Tailwind CSS v4. It's a client-rendered
app (`react-router-dom`) with 4 routes, no backend — all content lives in
plain TypeScript data files, and the "forms" on the site either link out
(mailto, Google Form) or are currently decorative until wired to a real
destination.

## Folder structure

```
landing_page/
├── src/
│   ├── main.tsx          # Entry point — mounts <App /> into the DOM
│   ├── App.tsx            # Routes: which page renders for which URL
│   ├── index.css          # Tailwind import + global styles + the Scene
│   │                       #   stacking CSS (see "Scroll-stacking" below)
│   ├── pages/              # One file per ROUTE (see Routes table below)
│   ├── components/         # Everything a page is built from — sections,
│   │                       #   cards, shared UI. Nothing in here owns a
│   │                       #   route; pages assemble components.
│   ├── data/                # Plain content: the project list, the member
│   │                       #   roster, the avenues of service. Edit these
│   │                       #   files to change what the site SAYS, not the
│   │                       #   component files, wherever possible.
│   └── assets/              # Images/SVGs, imported directly where used
├── ARCHITECTURE.md          # This file
└── package.json
```

## Routes

| Path | Page | What's there |
|---|---|---|
| `/` | `pages/HomePage.tsx` | The whole one-page site: Hero, District, Values, About, Projects, Members, FAQ, Support, Footer |
| `/roster` | `pages/RosterPage.tsx` | Full member roster (all 19), one card each |
| `/projects/:avenueSlug` | `pages/AvenuePage.tsx` | Every project under one avenue — reached via the header's Projects dropdown, not a separate hub page |

`App.tsx` is the only place these routes are declared — it's a short
file, worth reading first.

## Key pattern #1: the home page's scroll-stacking illusion

`HomePage.tsx` renders its 8 sections wrapped in `Scene.tsx`, each given
an ascending `zIndex`. `Scene` uses CSS `position: sticky` so, as you
scroll, each section stays pinned full-screen until the *next* section
rises up and covers it — that's the "cards stacking on top of each
other" effect you see scrolling down the home page. The mechanics live
in `Scene.tsx` + the `.scene-hold` / `.scene-runway` rules in
`index.css` (both have detailed comments explaining the sticky/pin
trick and why it only works as one shared stack, not nested).

Two variants:
- **Default ("pan tall content")** — most sections (District, Values,
  About, FAQ, Support). If a section's content is taller than one
  screen, `Scene` scrolls it upward internally so nothing gets clipped.
- **Scroll-scrub** — `Projects` and `MemberShowcase` opt into this by
  passing `onScrub` to `Scene`. Instead of panning content, `Scene`
  hands the section a raw 0→1 scroll progress number every frame, and
  the section animates itself (see pattern #2).

## Key pattern #2: scroll-scrub sections drive their own animation

`Projects.tsx` and `MemberShowcase.tsx` don't use CSS transitions or
Framer Motion for their headline animation — they expose an imperative
`render(progress: number)` method (via `useImperativeHandle` +
`forwardRef`) that `HomePage.tsx` calls every scroll tick through
`Scene`'s `onScrub`. Inside `render`, GSAP sets `transform`/`opacity`
directly per card based on how far each card is from the "active"
position. This is what makes the Projects deck and the Members arc feel
hand-animated rather than CSS-eased — every frame is calculated from
scroll position, not from a timer.

If you're trying to understand *why* a section "feels different" from
a plain fade-in, this is almost certainly why — check for `onScrub` in
`HomePage.tsx` to see which sections use it.

## Key pattern #3: `SectionHeading` + the page-order numbering

Every section on the home page uses the shared `SectionHeading`
component for its "01 — Label / Big Title" header block. The `number`
prop is literally just a string, but it's meant to always match the
section's position on the page — the convention is documented in
`SectionHeading.tsx`'s own comment. If you add, remove, or reorder a
home-page section, the numbers on every section AFTER it need to shift
too (grep for `number="0` across `src/components/` to find them all).

## Key pattern #4: data files, not hardcoded content

- `data/projects.ts` — the `Project` type, the 5 `Avenue`s, and
  `PROJECTS_DATA` (every project). `FEATURED_PROJECTS` filters to the
  ones flagged `featured: true` — that's what the home page shows;
  each `/projects/:slug` page shows everything for that avenue.
- `data/members.ts` — the `Member` type and `MEMBERS` (the full
  roster). `SHOWCASE_MEMBERS` is the first 10 (home page arc).
  `BOARD_HISTORY` maps a Rotary year (`'2026-27'`) to a roster array —
  currently only one year exists; adding a prior year here is enough to
  make it show up in the home page's board-year dropdown, no component
  changes needed.

Component files read from these; they don't define content inline.
When the club's roster, project list, or avenues change, edit the data
file — the UI updates itself.

## Key pattern #5: "teaser on home, full detail on its own page"

Both Projects and Members follow the same shape: a curated/limited set
shown on the home page (with its own animation, per pattern #2), plus a
"View All" link to a dedicated page with the complete list
(`/projects/:slug`, `/roster`). If you're adding a new
section that has "a few here, all of them elsewhere," this is the
existing pattern to copy rather than inventing a new one.

## Key pattern #6: null-placeholder constants for content not ready yet

Some content depends on something the club hasn't provided yet (a
Google Form link, a confirmed social URL). Rather than leaving a broken
link or commenting code out, these are declared as a typed constant set
to `null` at the top of the component (e.g. `CLUB_EMAIL`,
`INSTAGRAM_URL` in `Footer.tsx`; `JOIN_FORM_URL` in `Support.tsx`), and
the JSX branches on whether it's set — rendering a real link when
present, a visibly-inert "coming soon" placeholder when not. Filling in
the value later is a one-line change with no UI logic to touch.

## Shared UI components (not full sections)

- `SectionHeading.tsx` — the numbered header block (pattern #3).
- `MemberCardVisual.tsx` (`CardVisual`) — the actual member card
  design (photo, name, role, quote); both `MemberWorkCard.tsx` (home
  arc) and `RosterPage.tsx` (full roster) render it. Also exports
  `InstagramIcon`, a hand-drawn SVG glyph reused by `Footer.tsx` since
  `lucide-react` ships no brand icons.

## Running it

```
npm run dev      # local dev server
npm run build     # tsc -b type-check, then production build
npm run lint      # oxlint
npm run preview   # preview a production build locally
```
