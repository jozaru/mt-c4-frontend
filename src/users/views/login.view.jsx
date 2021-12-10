// vendors
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { Formik } from "formik";
import * as Yup from 'yup';
import Box from "@mui/material/Box";
import Collapse from '@mui/material/Collapse';
import Alert from "@mui/material/Alert";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Correo inválido').required('Campo requerido'),
  password: Yup.string().required('Campo requerido'),
});

const Login = () => {
  const [error, setError] = useState(false);
  const [login] = useMutation(LOGIN);
  const navigate = useNavigate();

  return (
    <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
      <Box gridColumn="2 / span 2">
        <Collapse in={error}>
          <Alert severity="error" onClose={() => setError(false)} sx={{ mt: 2 }}>
            Usuario o clave inválidas
          </Alert>
        </Collapse>
      </Box>
      <Box gridColumn="2 / span 2">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={values => {
            login({
              variables: {
                ...values,
              }
            })
            .then(response => {
              setError(false);
              sessionStorage.setItem('token', response.data.login);
              navigate('/');
            })
            .catch(() => setError(true));
          }}
        >
          {({
            handleSubmit,
            getFieldProps,
            errors,
            touched
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                error={touched.email && !!errors.email}
                fullWidth
                helperText={touched.email && errors.email}
                label="Correo"
                margin="normal"
                variant="outlined"
                {...getFieldProps('email')}
              />
              <TextField
                error={touched.password && !!errors.password}
                fullWidth
                helperText={touched.password && errors.password}
                label="Contraseña"
                margin="dense"
                type="password"
                variant="outlined"
                {...getFieldProps('password')}
              />
              <Button type="submit" variant="contained" sx={{ mt: 1 }} >Ingresar</Button>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;