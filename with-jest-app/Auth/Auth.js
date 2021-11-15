import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import PropTypes from "prop-types";

export default function Auth(props) {
  const { onCloseModal, setTitleModal } = props;
  const [showLogin, setShowLogin] = useState(true);

  const showLoginForm = () => {
    setTitleModal("Iniciar sesión");
    setShowLogin(true);
  };
  const showRegisterForm = () => {
    setTitleModal("Registrar usuario");
    setShowLogin(false);
  };
  return showLogin ? (
    <LoginForm
      showRegisterForm={showRegisterForm}
      onCloseModal={onCloseModal}
    />
  ) : (
    <RegisterForm showLoginForm={showLoginForm} />
  );
}

Auth.propTypes = {
  onCloseModal: PropTypes.func,
  setTitleModal: PropTypes.func,
};
