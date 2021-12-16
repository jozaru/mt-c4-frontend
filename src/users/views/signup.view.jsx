// vendors
import React, {useState } from "react";
import { useMutation, useQuery, gql } from '@apollo/client';
import { Formik } from "formik";
import * as Yup from 'yup';
import Box from "@mui/material/Box";
import Collapse from '@mui/material/Collapse';
import Alert from "@mui/material/Alert";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import { Link } from 'react-router-dom';

const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      _id
    }
  }
`;

const ROLES = gql `
  query Query {
    roles {
      code
      value
    }
  }
`;

const initialValues = {
  email: '',
  documentId: '',
  name: '',
  lastName: '',
  role: '',
  password: ''
};

const validationSchema = Yup.object({
  email: Yup.string().email('Correo inválido').required('Campo requerido'),
  documentId: Yup.number('Ingresa solo números').required('Campo requerido'),
  name: Yup.string().required('Campo requerido'),
  lastName: Yup.string().required('Campo requerido'),
  role: Yup.string().required('Campo requerido'),
  password: Yup.string().required('Campo requerido'),
})

const SignUp = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [register] = useMutation(REGISTER);
  const { data, loading: loadingRoles } = useQuery(ROLES);

  return (
    <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
      <Box gridColumn="2 / span 2">
        <Collapse in={error}>
          <Alert severity="error" onClose={() => setError(false)} sx={{ mt: 2 }}>
            Error regitrando el usuario
          </Alert>
        </Collapse>
        <Collapse in={success}>
          <Alert severity="success" onClose={() => setSuccess(false)} sx={{ mt: 2 }}>
            Usuario creado con éxito. Haz click <Link className="alert-link" to="/">aquí</Link> para iniciar session
          </Alert>
        </Collapse>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            register({
              variables: {
                input: {
                  ...values,
                }
              }
            })
            .then(() => {
              setError(false);
              setSuccess(true);
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
                error={touched.documentId && !!errors.documentId}
                fullWidth
                helperText={touched.documentId && errors.documentId}
                label="Documento de identidad"
                margin="normal"
                variant="outlined"
                {...getFieldProps('documentId')}
              />
              <TextField
                error={touched.name && !!errors.name}
                fullWidth
                helperText={touched.name && errors.name}
                label="Nombre"
                margin="normal"
                variant="outlined"
                {...getFieldProps('name')}
              />
              <TextField
                error={touched.lastName && !!errors.lastName}
                fullWidth
                helperText={touched.lastName && errors.lastName}
                label="Apellido"
                margin="normal"
                variant="outlined"
                {...getFieldProps('lastName')}
              />
              <FormControl fullWidth sx={{ mt: 2, mb: 1 }}>
                <InputLabel id="role-label">Rol</InputLabel>
                <Select
                  labelId="role-label"
                  id="role-select"
                  label="Rol"
                  {...getFieldProps('role')}
                >
                  {!loadingRoles && data.roles.map(({ code, value}, index) => <MenuItem key={index} value={code}>{value}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField
                error={touched.password && !!errors.password}
                fullWidth
                helperText={touched.password && errors.password}
                label="Contraseña"
                margin="normal"
                variant="outlined"
                type="password"
                {...getFieldProps('password')}
              />
              <Button type="submit" variant="contained" sx={{ mt: 1 }}>Enviar</Button>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default SignUp;