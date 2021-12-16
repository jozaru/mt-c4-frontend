// vendors
import React from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

const NoAccess = () => {
  return (
    <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
      <Box gridColumn="2 / span 2">
        <Alert variant="warning">
          No tienes acceso a este recurso
        </Alert>
      </Box>
    </Box>
  )
};

export default NoAccess;