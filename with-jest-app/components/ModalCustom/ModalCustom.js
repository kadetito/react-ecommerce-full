import React from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";

export default function ModalCustom(props) {
  const { show, setShow, title, children, ...rest } = props;

  const onClose = () => setShow(false);

  return (
    <Modal
      show={show}
      size="lg"
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      className="basic__modal__general"
      {...rest}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <span>{title}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

ModalCustom.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.object,
};
