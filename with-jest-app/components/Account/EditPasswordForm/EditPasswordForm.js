import BotonPositivo from "@/components/Form/ButtonCustom/BotonPositivo";
import InputCustom from "@/components/Form/InputCustom";
import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import useAuth from "hooks/useAuth";
import BotonNegativo from "@/components/Form/ButtonCustom/BotonNegativo";
import { updatePasswordAPI } from "Services/UserService";

export default function EditPasswordForm(props) {
  const { user, logout } = props;
  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState(user.usuario);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updatePasswordAPI(
        usuario.uid,
        formData.password,
        logout
      );
      if (response?.ok) {
        Swal.fire({
          text: "Datos modificados, un momento",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          logout();
        }, 3000);
      } else if (!response.ok || response?.statusCode === 400) {
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
    <>
      <div className="card text-left">
        <div className="card-body">
          <h4 className="card-title">Editar Password</h4>
          <div className="card-text mt-4">
            <Row>
              <Col>
                <Form
                  onSubmit={formik.handleSubmit}
                  className="formulario__global"
                >
                  <Row>
                    <Col>
                      <InputCustom
                        name="password"
                        placeholder="Escribe el nuevo password"
                        labelText="Nuevo password"
                        type="password"
                        id="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={formik.errors.password}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <InputCustom
                        name="repeatpassword"
                        placeholder="Escribe el password de nuevo"
                        labelText="Repite password"
                        type="password"
                        id="repeatpassword"
                        onChange={formik.handleChange}
                        value={formik.values.repeatpassword}
                        error={formik.errors.repeatpassword}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center">
                      <BotonNegativo
                        type="button"
                        onClick={formik.handleReset}
                        textButton="Reset"
                      />
                    </Col>
                    <Col className="text-center">
                      <BotonPositivo
                        type="submit"
                        textButton="Modificar"
                        loading={loading}
                      />
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

function initialValues() {
  return {
    password: "",
    repeatpassword: "",
  };
}

function validationSchema() {
  return {
    password: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 carácteres!")
      .max(50, "La contraseña no debe tener más de 50 carácteres!")
      .required("Password es un campo requerido")
      .oneOf([Yup.ref("repeatpassword")], "Los passwords no coinciden"),
    repeatpassword: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 carácteres!")
      .max(50, "La contraseña no debe tener más de 50 carácteres!")
      .required("Debe repetir el mismo password")
      .oneOf([Yup.ref("password")], "Los passwords no coinciden"),
  };
}
