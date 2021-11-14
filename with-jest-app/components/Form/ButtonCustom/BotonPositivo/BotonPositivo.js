import React from "react";
import { Spinner } from "react-bootstrap";

export default function BotonPositivo(props) {
  const { type, textButton, onClick, loading } = props;

  return (
    <>
      <div>
        <button onClick={onClick} type={type} className="btn btn-secondary">
          {loading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            textButton
          )}
        </button>
      </div>
    </>
  );
}
