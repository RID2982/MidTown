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
    if (hash) return;
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
