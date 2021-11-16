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
              <NavDropdown.Item className="links" to="/orders">
                Mis pedidos
              </NavDropdown.Item>
              <NavDropdown.Item className="links" href="/wishlist">
                Mis favoritos
              </NavDropdown.Item>
              <NavDropdown.Item className="links" href="/account">
                Mi Perfil
              </NavDropdown.Item>
              <NavDropdown.Item className="links" href="/cart">
                Carrito
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
