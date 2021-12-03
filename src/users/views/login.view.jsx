// vendors
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { Formik } from "formik";
import * as Yup from 'yup';
import Alert from 'react-bootstrap/Alert';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const initialValues = {
  email: '',
  password: ''
};

const validationSchema = Yup.object({
  email: Yup.string().email('Correo inválido').required('Campo requerido'),
  password: Yup.string().required('Campo requerido'),
})

const Login = () => {
  const [error, setError] = useState(false);
  const [login] = useMutation(LOGIN);
  const navigate = useNavigate();

  return (
    <Row className="mt-3 justify-content-center">
      <Col lg="5">
        <Alert dismissible variant="danger" onClose={() => setError(false)} show={error}>
          Usuario o clave inválidas
        </Alert>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
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
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Correo</Form.Label>
                <Form.Control 
                  name="email" 
                  type="email" 
                  placeholder="Ingresa tu correo" 
                  isInvalid={touched.email && !!errors.email}
                  {...getFieldProps('email')}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formtPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control 
                  name="password"
                  type="password"
                  placeholder="Contraseña" 
                  isInvalid={touched.password && !!errors.password}
                  {...getFieldProps('password')}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit">Ingresar</Button>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  );
};

export default Login;