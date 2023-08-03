import React from "react";
import { Alert, Button } from "react-bootstrap";

const ErrorMessage = ({ message, onClose }) => {
  return (
    <Alert variant="danger" onClose={onClose} dismissible>
      <Alert.Heading>Error!</Alert.Heading>
      <p>{message}</p>
      <Button onClick={onClose} variant="danger">
        Close
      </Button>
    </Alert>
  );
};

export default ErrorMessage;
