import BotonPositivo from "@/components/Form/ButtonCustom/BotonPositivo";
import InputCustom from "@/components/Form/InputCustom";
import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import useAuth from "hooks/useAuth";
import BotonNegativo from "@/components/Form/ButtonCustom/BotonNegativo";
import { updateUserAPI } from "Services/UserService";

export default function EditNameForm(props) {
  const { user, logout, setReloadUser } = props;
  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState(user.usuario);

  const formik = useFormik({
    initialValues: initialValues(usuario.name, usuario.lastname),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updateUserAPI(usuario.uid, formData, logout);
      if (response?.ok) {
        setReloadUser(true);
        Swal.fire({
          text: "Datos modificados",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
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
    <>
      <div className="card text-left">
        <div className="card-body">
          <h4 className="card-title">Editar nombre</h4>
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
                        name="name"
                        placeholder="Tu nuevo nombre"
                        labelText="Nombre"
                        type="text"
                        id="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        error={formik.errors.name}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <InputCustom
                        name="lastname"
                        placeholder="Tus nuevos apellidos"
                        labelText="Apellidos"
                        type="text"
                        id="lastname"
                        onChange={formik.handleChange}
                        value={formik.values.lastname}
                        error={formik.errors.lastname}
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

function initialValues(name, lastname) {
  return {
    name: name || "",
    lastname: lastname || "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required(
      "El nombre es obligatorio, no puede quedar vacío"
    ),
    lastname: Yup.string().required(
      "Los apellidos son obligatorios, no pueden quedar vacíos"
    ),
  };
}
