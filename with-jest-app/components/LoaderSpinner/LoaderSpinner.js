import React from "react";
import { Spinner } from "react-bootstrap";

const LoaderSpinner = () => {
  return (
    <div className="loading__global">
      <Spinner animation="border" role="status" />
      <h5>Cargando...</h5>
    </div>
  );
};

export default LoaderSpinner;
