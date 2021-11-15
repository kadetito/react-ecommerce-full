import React from "react";
import PropTypes from "prop-types";

export default function BotonSearch(props) {
  const { labelText, type, name, id, onClick } = props;

  return (
    <div>
      <button
        className="btn btn-secondary"
        type={type}
        name={name}
        id={id}
        onClick={onClick}
      >
        {labelText}
      </button>
    </div>
  );
}

BotonSearch.propTypes = {
  labelText: PropTypes.string,

  onClick: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.string,
};
