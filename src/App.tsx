import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { RosterPage } from './pages/RosterPage';
import { ProjectsPage } from './pages/ProjectsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/roster" element={<RosterPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
