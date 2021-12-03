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
import Users from 'users/views/users.view';
import Login from 'users/views/login.view';

function App() {
  return (
    <>
      <Menu />
      <Container>
        <Routes>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="users">
            <Route index element={<Users />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
