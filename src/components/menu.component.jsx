// vendors
import React from "react";
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link className="nav-link" to="/">{'Inicio'}</Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/projects">{'Projectos'}</Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/users/signup">{'Regístrate'}</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;