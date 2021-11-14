import React from "react";

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
