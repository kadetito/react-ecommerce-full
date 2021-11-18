import BotonPositivo from "@/components/Form/ButtonCustom/BotonPositivo";
import InputCustom from "@/components/Form/InputCustom";
import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "hooks/useAuth";
import { newAddressAPI, updateAddressesAPI } from "Services/AddressService";
import Swal from "sweetalert2";

export default function AddressForm(props) {
  const { setShowModal, setReloadAddresses, newAddress, address } = props;
  const [loading, setLoading] = useState(false);
  const { auth, logout } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      newAddress ? createAddress(formData) : updateAddress(formData);
    },
  });

  const createAddress = async (formData) => {
    setLoading(true);
    const response = await newAddressAPI(formData, auth.idUser, logout);
    if (response?.ok) {
      //setReloadUser(true);
      Swal.fire({
        text: "Dirección añadida",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      formik.resetForm();
      setReloadAddresses(true);
      setShowModal(false);
    } else {
      Swal.fire({
        text: response.msg,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    setLoading(false);
  };

  const updateAddress = async (formData) => {
    setLoading(true);
    const formDataTemp = {
      ...formData,
      user: auth.idUser,
    };
    const response = await updateAddressesAPI(
      address._id,
      formDataTemp,
      logout
    );

    if (response?.ok) {
      //setReloadUser(true);
      Swal.fire({
        text: "Dirección Modificada",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      formik.resetForm();
      setReloadAddresses(true);
      setShowModal(false);
    } else {
      Swal.fire({
        text: response.msg,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    setLoading(false);
  };

  return (
    <Form onSubmit={formik.handleSubmit} className="formulario__global">
      <Row>
        <Col>
          <InputCustom
            labelText="Título de la dirección"
            type="text"
            name="title"
            id="title"
            placeholder="Escribe el identificador de esta dirección"
            onChange={formik.handleChange}
            value={formik.values.title}
            error={formik.errors.title}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <InputCustom
            labelText="Nombre y apellidos"
            type="text"
            name="name"
            id="name"
            placeholder="Escribe el nombre y apellidos del titular de la dirección"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.errors.name}
          />
        </Col>
        <Col>
          <InputCustom
            labelText="Dirección"
            type="text"
            name="address"
            id="address"
            placeholder="Escribe la dirección"
            onChange={formik.handleChange}
            value={formik.values.address}
            error={formik.errors.address}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <InputCustom
            labelText="Localidad"
            type="text"
            name="city"
            id="city"
            placeholder="Escribe la ciudad/localidad"
            onChange={formik.handleChange}
            value={formik.values.city}
            error={formik.errors.city}
          />
        </Col>
        <Col>
          <InputCustom
            labelText="Estado/Provincia/región"
            type="text"
            name="state"
            id="state"
            placeholder="Estado/Provincia/región"
            onChange={formik.handleChange}
            value={formik.values.state}
            error={formik.errors.state}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <InputCustom
            labelText="Código Postal"
            type="text"
            name="postalcode"
            id="postalcode"
            placeholder="Escribe el código postal"
            onChange={formik.handleChange}
            value={formik.values.postalcode}
            error={formik.errors.postalcode}
          />
        </Col>
        <Col>
          <InputCustom
            labelText="Teléfono"
            type="text"
            name="phone"
            id="phone"
            placeholder="Escribe el teléfono de contacto"
            onChange={formik.handleChange}
            value={formik.values.phone}
            error={formik.errors.phone}
          />
        </Col>
      </Row>
      <Row>
        <Col className="text-center mt-3 mb-5">
          <BotonPositivo
            type="submit"
            loading={loading}
            textButton={newAddress ? "Crear dirección" : "Modificar dirección"}
          />
        </Col>
      </Row>
    </Form>
  );
}

function initialValues(address) {
  return {
    title: address?.title || null,
    name: address?.name || null,
    address: address?.address || null,
    city: address?.city || null,
    state: address?.state || null,
    postalcode: address?.postalcode || null,
    phone: address?.phone || null,
  };
}

function validationSchema() {
  return {
    title: Yup.string().required("campo obligatorio"),
    name: Yup.string().required("campo obligatorio"),
    address: Yup.string().required("campo obligatorio"),
    city: Yup.string().required("campo obligatorio"),
    state: Yup.string().required("campo obligatorio"),
    postalcode: Yup.string().required("campo obligatorio"),
    phone: Yup.string().required("campo obligatorio"),
  };
}
