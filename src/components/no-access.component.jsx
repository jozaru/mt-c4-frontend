// vendors
import React from "react";
import Alert from 'react-bootstrap/Alert';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const NoAccess = () => {
  return (
    <Row className="mt-3 justify-content-center">
      <Col lg="5">
        <Alert variant="warning">
          No tienes acceso a este recurso
        </Alert>
      </Col>
    </Row>
  )
};

export default NoAccess;