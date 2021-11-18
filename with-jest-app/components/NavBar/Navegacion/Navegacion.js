import React, { useEffect, useState } from "react";
import { Nav, NavDropdown, Button, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { getCategoriasAPI } from "Services/CategoriasService";
import { map } from "lodash";

export default function Navegacion() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getCategoriasAPI();

      setCategorias(response.categorias || []);
    })();
  }, []);

  return (
    <>
      <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }}>
        <Nav.Link href="#action1">Home</Nav.Link>
        <Nav.Link href="#action2">Link</Nav.Link>
        <NavDropdown
          size="lg"
          align="start"
          title="Colección 2021"
          id="navbarScrollingDropdown"
        >
          <NavDropdown.Header>Colección 2021</NavDropdown.Header>

          {map(categorias, (categoria) => (
            <NavDropdown.Item
              href={`/categorias/${categoria.url}`}
              key={categoria._id}
            >
              <FontAwesomeIcon size="xs" icon={faCaretRight} />
              {categoria.nombre}
            </NavDropdown.Item>
          ))}

          <NavDropdown.Divider />
          <NavDropdown.Item href="#action5">
            Something else here
          </NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#" disabled>
          Link
        </Nav.Link>
      </Nav>
    </>
  );
}
