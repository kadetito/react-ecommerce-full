import React, { useState } from "react";
import BotonPositivo from "@/components/Form/ButtonCustom/BotonPositivo";
import BotonNegativo from "@/components/Form/ButtonCustom/BotonNegativo";
import InputCustom from "@/components/Form/InputCustom";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUsuarioAPI, resetPasswordAPI } from "Services/UserService";
import Swal from "sweetalert2";
import useAuth from "hooks/useAuth";

export default function LoginForm(props) {
  const { showRegisterForm, onCloseModal } = props;
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await loginUsuarioAPI(formData);
      if (response?.ok) {
        login(response.token);
        Swal.fire({
          text: "Acceso permitido",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
        onCloseModal();
      } else {
        Swal.fire({
          text: response.msg,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
      setLoading(false);
    },
  });

  const resetPasswrod = () => {
    formik.setErrors({});
    const validateEmail = Yup.string().email().required();
    if (!validateEmail.isValidSync(formik.values.email)) {
      formik.setErrors({ email: true });
    } else {
      resetPasswordAPI(formik.values.email); //TODO IN BACKEND
    }
  };

  return (
    <Container fluid="sm">
      <Row>
        <Col>Login</Col>
        <Col>
          <Form onSubmit={formik.handleSubmit} className="formulario__global">
            <Row>
              <Col>
                <InputCustom
                  onChange={formik.handleChange}
                  labelText="E-mail"
                  type="email"
                  name="email"
                  id="email"
                  error={formik.errors.email}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <InputCustom
                  onChange={formik.handleChange}
                  labelText="Password"
                  type="password"
                  name="password"
                  id="password"
                  error={formik.errors.password}
                />
              </Col>
            </Row>
            <div className="mt-5 d-flex justify-content-between">
              <div>
                <BotonNegativo
                  onClick={showRegisterForm}
                  type="button"
                  textButton="Crear una cuenta"
                />
              </div>
              <div>
                <BotonPositivo
                  type="submit"
                  textButton="Identificarse"
                  loading={loading}
                />
              </div>
            </div>
            <div className="mt-3 d-flex justify-content-center">
              <div>
                <button onClick={resetPasswrod} type="button" className="btn">
                  ¿Has olvidado la contraseña?
                </button>
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

function initialValues() {
  return {
    email: "",
    password: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string()
      .email()
      .required("El e-mail es obligatorio y debe ser válido"),
    password: Yup.string().required("El password es obligatorio"),
  };
}
