// vendors
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

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
      <Container>
        <Routes>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="users">
            <Route path="signup" element={<SignUp />} />
          </Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
