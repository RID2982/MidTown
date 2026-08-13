import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// The browser's own scroll restoration races our settle-then-scroll logic
// on back/forward navigation (HomePage's useSettleThenHashScroll) — it can
// jump to a stale scrollY the instant the page remounts, before our effect
// has measured anything, which briefly flashes whatever section happened
// to be at that old position. Taking manual control here means the only
// thing that ever moves scroll on navigation is our own code.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
