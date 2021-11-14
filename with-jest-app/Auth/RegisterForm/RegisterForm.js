import BotonPositivo from "@/components/Form/ButtonCustom/BotonPositivo";
import BotonNegativo from "@/components/Form/ButtonCustom/BotonNegativo";
import InputCustom from "@/components/Form/InputCustom";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { registroUsuarioAPI } from "Services/UserService";
import Swal from "sweetalert2";

export default function RegisterForm(props) {
  const { showLoginForm } = props;
  const [loading, setLoading] = useState(false);

  function showLogin() {
    console.log("object");
    showLoginForm();
  }
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await registroUsuarioAPI(formData);
      if (response?.ok) {
        Swal.fire({
          text: "El usuario ha sido creado, en unos segundos podrá acceder al login",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
        showLoginForm();
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

  return (
    <Form onSubmit={formik.handleSubmit} className="formulario__global">
      <Row>
        <Col>
          <InputCustom
            onChange={formik.handleChange}
            labelText="Nombre"
            type="text"
            name="name"
            id="name"
            error={formik.errors.name}
          />
        </Col>
        <Col>
          <InputCustom
            onChange={formik.handleChange}
            labelText="Apellidos"
            type="text"
            name="lastname"
            id="lastname"
            error={formik.errors.lastname}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <InputCustom
            onChange={formik.handleChange}
            labelText="Nombre de usuario"
            type="text"
            name="username"
            id="username"
            error={formik.errors.username}
          />
        </Col>
        <Col>
          <InputCustom
            onChange={formik.handleChange}
            labelText="Correo electrónico"
            type="text"
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
            labelText="Contraseña"
            type="password"
            name="password"
            id="password"
            error={formik.errors.password}
          />
        </Col>
        <Col></Col>
      </Row>
      <div className="mt-5 d-flex justify-content-between">
        <div>
          <BotonPositivo
            onClick={showLoginForm}
            type="button"
            textButton="Iniciar sesión"
          />
        </div>
        <div>
          <BotonNegativo
            type="submit"
            textButton="Registrar usuario"
            loading={loading}
          />
        </div>
      </div>
    </Form>
  );
}

function initialValues() {
  return {
    name: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required("El nombre es obligatorio"),
    lastname: Yup.string().required("El apellido es obligatorio"),
    email: Yup.string()
      .email()
      .required("El e-mail es obligatorio y debe ser válido"),
    username: Yup.string().required("El nombre de usuario es obligatorio"),
    password: Yup.string().required("El password es obligatorio"),
  };
}
