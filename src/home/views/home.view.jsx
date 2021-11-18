// vendors
import React from "react";
import { Link } from 'react-router-dom';

// assets
import logo from 'assets/logo.svg';

const Home = () => {
  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <Link to="projects">{'Go to projects'}</Link>
    </>
  );
};

export default Home;
