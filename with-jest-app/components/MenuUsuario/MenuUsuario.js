import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Auth from "../../Auth";

import ModalCustom from "../ModalCustom";

export default function MenuUsuario() {
  const [showModal, setShowModal] = useState(false);
  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);
  const [user, setUser] = useState(undefined);
  const [titleModal, setTitleModal] = useState("Iniciar sesión");
  return (
    <>
      <MenuOptions onShowModal={onShowModal} />
      <ModalCustom show={showModal} setShow={setShowModal} title={titleModal}>
        <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
      </ModalCustom>
    </>
  );
}

function MenuCollections(props) {
  const { categorias } = props;
  return (
    <>
      {map(categorias, (categoria) => (
        <Nav.Link
          className="links"
          href={`/moda/${categoria.url}`}
          key={categoria.id}
        >
          {categoria.title}
        </Nav.Link>
      ))}
    </>
  );
}

function MenuOptions(props) {
  const { onShowModal, user, logout } = props;
  return (
    <>
      <button className="btn btn-secondary" type="button" onClick={onShowModal}>
        Menú usuario
      </button>
    </>
  );
}
