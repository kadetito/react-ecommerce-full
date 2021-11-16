import React from "react";

import PropTypes from "prop-types";

export default function BotonVacio(props) {
  const { type, textButton, onClick, loading } = props;

  return (
    <>
      <div>
        <button onClick={onClick} type={type} className="btn">
          {textButton}
        </button>
      </div>
    </>
  );
}
BotonVacio.propTypes = {
  onClick: PropTypes.func,
  loading: PropTypes.bool,
};
