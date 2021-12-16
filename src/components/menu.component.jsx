// vendors
import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from "@mui/material/Box";
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
        <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={2}>
          <Link 
            underline="none" 
            color="inherit" 
            to="/" 
            component={RouterLink}
          >
            Inicio
          </Link>
          <Link 
            underline="none" 
            color="inherit" 
            to="projects" 
            component={RouterLink}
          >
            Projectos
          </Link>
          <Link 
            underline="none" 
            color="inherit" 
            to="users" 
            component={RouterLink}
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;