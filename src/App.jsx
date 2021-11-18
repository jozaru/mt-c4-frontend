// vendors
import { Route, Routes } from 'react-router-dom';

// styles
import 'styles/App.scss';

// views
import Home from 'home/views/home.view';
import Projects from 'projects/views/projects.view';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
