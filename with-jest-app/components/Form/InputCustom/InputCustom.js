import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
export default function InputCustom(props) {
  const { labelText, type, value, name, id, onChange, error } = props;

  return (
    <div className="formulario__input-container">
      {labelText !== undefined && (
        <label
          htmlFor={id}
          className={classNames("form-label", { "text-danger": error })}
        >
          {labelText}
        </label>
      )}
      <input
        autoComplete="off"
        className={classNames("form-control", { "is-invalid": error })}
        type={type}
        value={value}
        name={name}
        id={id}
        placeholder={labelText}
        onChange={onChange}
      />
      <p className="error-input">{error}</p>
    </div>
  );
}
InputCustom.propTypes = {
  labelText: PropTypes.string,

  onChange: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.string,
};
