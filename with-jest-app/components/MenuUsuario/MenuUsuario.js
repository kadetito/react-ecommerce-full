import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Auth from "../../Auth";
import { Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import ModalCustom from "../ModalCustom";
import { getMeAPI } from "Services/UserService";
import useAuth from "hooks/useAuth";

export default function MenuUsuario() {
  const [showModal, setShowModal] = useState(false);
  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);
  const [titleModal, setTitleModal] = useState("Iniciar sesión");
  const [user, setUser] = useState(undefined);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getMeAPI(logout);
      setUser(response);
    })();
  }, [auth]);

  return (
    <>
      {user !== undefined ? (
        <MenuOptions user={user} onShowModal={onShowModal} logout={logout} />
      ) : (
        <button onClick={onShowModal} className="links">
          Login
        </button>
      )}
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
  const usere = user.usuario;
  console.log(user);
  const titleProfile = `Hola, ${usere.name}  ${usere.lastname}`;
  return (
    <>
      <div className="d-flex justify-content-end">
        {user && (
          <>
            <NavDropdown title={titleProfile} id="basic-nav-dropdown">
              <NavDropdown.Item href="/orders">
                <a className="links">Mis pedidos</a>
              </NavDropdown.Item>
              <NavDropdown.Item href="/wishlist">
                <a className="links">Mis favoritos</a>
              </NavDropdown.Item>
              <NavDropdown.Item href="/account">
                <a className="links">Mi Perfil</a>
              </NavDropdown.Item>
              <NavDropdown.Item href="/cart">
                <a className="links">Carrito</a>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <button className="links" onClick={logout}>
                  Logout
                </button>
              </NavDropdown.Item>
            </NavDropdown>{" "}
            <Nav.Item className="center-nav" href="/cart">
              <a className="links">Carrito</a>
            </Nav.Item>
          </>
        )}
      </div>
    </>
  );
}

MenuOptions.propTypes = {
  onShowModal: PropTypes.func.isRequired,
  user: PropTypes.object,
  logout: PropTypes.func,
};
