// vendors
import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

const Menu = () => {
  const token = sessionStorage.getItem('token');
  const user = jwt.decode(token)?.user;

  const handleCloseSession = () => {
    sessionStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Link 
          underline="none" 
          color="inherit" 
          to="/" 
          component={RouterLink}
          sx={{ flexGrow: 1 }}
        >
          Inicio
        </Link>
        <Link 
          underline="none" 
          color="inherit" 
          to="projects" 
          component={RouterLink}
          sx={{ flexGrow: 0.5 }}
        >
          Projectos
        </Link>
        <Link 
          underline="none" 
          color="inherit" 
          to="users" 
          component={RouterLink}
          sx={{ flexGrow: 0.5 }}
        >
          Usuarios
        </Link>
        <Button 
          to="users/login" 
          component={RouterLink}
          color="inherit"
        >
          Login
        </Button>
        <Button 
          to="users/signup" 
          component={RouterLink}
          color="inherit"
        >
          Regístrate
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;