import BotonPositivo from "@/components/Form/ButtonCustom/BotonPositivo";
import InputCustom from "@/components/Form/InputCustom";
import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import useAuth from "hooks/useAuth";
import BotonNegativo from "@/components/Form/ButtonCustom/BotonNegativo";
import { updateEmailAPI } from "Services/UserService";

export default function EditEmailForm(props) {
  const { user, logout, setReloadUser } = props;
  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState(user.usuario);

  const formik = useFormik({
    initialValues: initialValues(usuario.email),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updateEmailAPI(usuario.uid, formData, logout);
      if (response?.ok) {
        setReloadUser(true);
        Swal.fire({
          text: "Datos modificados",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
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
          <h4 className="card-title">Editar E-mail</h4>
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
                        name="email"
                        placeholder="Tu nuevo E-mail"
                        labelText="E-mail"
                        type="email"
                        id="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={formik.errors.email}
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

function initialValues(email) {
  return {
    email: email || "",
  };
}

function validationSchema() {
  return {
    email: Yup.string()
      .email()
      .required("El e-mail es obligatorio, no puede quedar vacío"),
  };
}
