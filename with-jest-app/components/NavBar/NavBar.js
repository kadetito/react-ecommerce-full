import React, { useState } from "react";
import { Container, Form, Navbar } from "react-bootstrap";
import BotonSearch from "../Form/ButtonCustom/BotonSearch";
import InputCustom from "../Form/InputCustom";
import Navegacion from "./Navegacion";

export default function NavBar() {
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState({});

  const getSearch = (event) => {
    event.preventDefault();
    setErrors({});
    try {
      setErrors(errors);
      console.log(event);
    } catch (error) {}
  };

  return (
    <Navbar className="navbar__global" sticky="top" expand="sm">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Navegacion />
          <Form onSubmit={getSearch} className="d-flex">
            <InputCustom
              type="search"
              id="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <BotonSearch
              labelText="Buscar"
              type="submit"
              id="sendBusqueda"
              name="sendBusqueda"
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
