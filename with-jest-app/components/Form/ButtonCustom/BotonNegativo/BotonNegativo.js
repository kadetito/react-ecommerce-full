import React from "react";
import { Spinner } from "react-bootstrap";
import PropTypes from "prop-types";

export default function BotonNegativo(props) {
  const { type, textButton, onClick, loading } = props;

  return (
    <>
      <div>
        <button onClick={onClick} type={type} className="btn btn-primary">
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

BotonNegativo.propTypes = {
  textButton: PropTypes.string,

  onClick: PropTypes.func,
  loading: PropTypes.bool,
};
