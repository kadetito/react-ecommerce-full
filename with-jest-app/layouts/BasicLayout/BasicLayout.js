import Footer from "@/components/Footer";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../../components/Header";

export default function BasicLayout(props) {
  const { children } = props;
  return (
    <Container fluid className="general__global">
      <Row>
        <Col className="m-0 p-0">
          <Header />
        </Col>
      </Row>
      <Row>
        <Col>{children}</Col>
      </Row>
      <Row>
        <Col className="m-0 p-0">
          <Footer />
        </Col>
      </Row>
    </Container>
  );
}
