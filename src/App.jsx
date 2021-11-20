// vendors
import { Route, Routes } from 'react-router-dom';

// styles
import 'styles/App.scss';

// views
import Home from 'home/views/home.view';
import Projects from 'projects/views/projects.view';
import SignUp from 'users/views/signup.view';
import Menu from 'components/menu.component';

function App() {
  return (
    <>
      <Menu />
      <div className="container">
        <Routes>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="users">
            <Route path="signup" element={<SignUp />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
