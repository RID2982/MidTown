import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { RosterPage } from './pages/RosterPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AvenuePage } from './pages/AvenuePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/roster" element={<RosterPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:avenueSlug" element={<AvenuePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
