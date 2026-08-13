import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { RosterPage } from './pages/RosterPage';
import { AvenuePage } from './pages/AvenuePage';

// React Router's client-side navigation keeps whatever scrollY the browser
// was already at — it does NOT reset to the top the way a real page load
// would. On this site that's especially visible: HomePage is one very tall
// pinned-section page, so clicking e.g. "View All Members" while scrolled
// deep into it landed on /roster already scrolled just as far down, which
// read as the new page opening from its bottom rather than its top. Skipped
// when a hash is present — HomePage's own useSettleThenHashScroll already
// resets to top before scrolling to the anchor, so doing it here too would
// just race it.
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Checked twice on purpose: `hash` from useLocation() can still read ""
    // on the very first render right after a POP (browser back/forward) —
    // the actual URL already has the hash, react-router just hasn't caught
    // up to it in this render yet. Trusting only the stale "" here fired an
    // unwanted scrollTo(0, 0) that raced HomePage's own hash-restore scroll
    // (the two fought over scroll position, and the hash-restore scroll
    // usually lost, stranding the page a couple hundred px from the top
    // instead of at the section it was supposed to land on). Reading the
    // real, current window.location.hash is the one check that can't be
    // stale, since it runs after commit rather than from render-time props.
    if (hash || window.location.hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/roster" element={<RosterPage />} />
        <Route path="/projects/:avenueSlug" element={<AvenuePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
